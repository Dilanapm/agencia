from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.contrib.auth import authenticate, get_user_model
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import AllowAny
from rest_framework import permissions
User = get_user_model()
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
import re # maneja expresiones regulares
from apps.users.utils.validators import is_valid_password, validate_gmail_email
from django.contrib.auth import logout
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Error verificando el estado de autenticación.'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie configurado correctamente' })


@method_decorator(csrf_protect, name='dispatch')
class RegisterUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        # Obtener datos del cuerpo de la solicitud
        username = request.data.get('username').strip().lower()
        phone = request.data.get('phone')
        email = request.data.get('email').lower().strip()
        password = request.data.get('password')
        re_password = request.data.get('re_password')  # Nueva variable para confirmacion de contraseña
        errors = {}

        # para celular
        # Validar duplicidad de numero
        if UserProfile.objects.filter(phone=phone).exists():
            errors["phone"] = ["El numero de celular ya existe."]


         # Validar que todos los campos estén presentes
        if not username:
            errors["username"] = ["El nombre de usuario es obligatorio."]
        if not email:
            errors["email"] = ["El correo electrónico es obligatorio."]
        if not password:
            errors["password"] = ["La contraseña es obligatoria."]
        if not re_password:
            errors["re_password"] = ["La confirmación de la contraseña es obligatoria."]
        

         # Validar que el nombre de usuario no tenga espacios internos
        if ' ' in username:
            errors["username"] = ["El nombre de usuario no debe contener espacios."]
        

        is_valid, message = is_valid_password(password,re_password)
        if not is_valid:
             errors["password"] = [message]
            
        # Validar duplicidad de nombre de usuario
        if UserProfile.objects.filter(username=username).exists():
            errors["username"] = ["El nombre de usuario ya está en uso."]
        
        # Validar formato y duplicidad de correo electronico
        is_valid, message = validate_gmail_email(email)
        if not is_valid:
            errors["email"] = [message]
        elif UserProfile.objects.filter(email=email).exists():
            errors["email"] = ["El correo ya está en uso."]

        # Si hay errores, devolverlos como respuesta
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        # Crear al usuario usando el serializador
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {"message": "Usuario registrado exitosamente"},
            status=status.HTTP_201_CREATED
        )
    def get(self, request, *args, **kwargs):
        return Response(
            {"error": "Método GET no permitido en este endpoint"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
    

class LoginUserView(APIView):
    permission_classes = [AllowAny]  # Permite el acceso a cualquier usuario para que inicie sesion
    def post(self, request):
        username = request.data.get('username').lower().strip()
        password = request.data.get('password')

        # Validación de campos
        if not username or not password:
            return Response({"error": "Se requieren todos los campos"}, status=status.HTTP_400_BAD_REQUEST)

        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        
        if user is None:
            print("Debug - Usuario no autenticado.")
            print(f"Username: {username}, Password: {password}")
            # Comprobar si el usuario existe pero la contraseña es incorrecta
            if UserProfile.objects.filter(username=username).exists():
                print("Debug - Usuario encontrado en la base de datos.")
                return Response({'error': 'Contraseña incorrecta.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'El usuario no existe.'}, status=status.HTTP_400_BAD_REQUEST)
        elif not user.is_active:
            return Response({'error': 'Este usuario está inactivo.'}, status=status.HTTP_403_FORBIDDEN)

        # Obtener o crear el token
        try:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'role': user.role}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error al crear o recuperar el token:", e)
            return Response({"error": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   

# cierre de sesion
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)  # Cierra la sesión del usuario
        return Response({"message": "Logout exitoso."}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_users(request):
    users = UserProfile.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data) 

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para crear usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().post(request, *args, **kwargs)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateDeleteUserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated] 
    def put(self, request,pk=None):   
        try:
            user = UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Eliminar cuenta
    def delete(self, request,pk=None):
        try:
            user = UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        # Lógica para administradores
        if request.user.is_staff:
            if request.user.id == user.id:
                return Response({"error": "No puedes desactivar tu propia cuenta."}, status=status.HTTP_403_FORBIDDEN)

            # Desactivar cuenta si es otro usuario
            user.is_active = False
            user.save()
            return Response({"message": f"La cuenta del usuario {user.username} ha sido desactivada con éxito."}, status=status.HTTP_200_OK)
        
        # Lógica para usuarios no administradores
        if request.user.id != user.id:
            return Response({"error": "No tienes permiso para eliminar esta cuenta."}, status=status.HTTP_403_FORBIDDEN)

        # Eliminar la propia cuenta
        user.delete()
        return Response({"message": "Tu cuenta ha sido eliminada con éxito."}, status=status.HTTP_200_OK)   