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
from rest_framework.pagination import PageNumberPagination


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
        is_active = request.data.get('is_active')
        # Validación de campos
        if not username or not password:
            return Response({"error": "Se requieren todos los campos"}, status=status.HTTP_400_BAD_REQUEST)

        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        
        if user is None:
            print("Debug - Usuario no autenticado.")
            print(f"Username: {username}, Password: {password}")

            # Comprobar si el usuario existe pero la contraseña es incorrecta
            if is_active:
                return Response({'error': 'Este usuario tiene la cuenta desactivada por el administrador.'}, status=status.HTTP_403_FORBIDDEN)
        
            if UserProfile.objects.filter(username=username).exists():
                print("Debug - Usuario encontrado en la base de datos.")
                return Response({'error': 'Contraseña incorrecta.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'El usuario no existe.'}, status=status.HTTP_400_BAD_REQUEST)
        

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

class UserPagination(PageNumberPagination):
    page_size = 10  # Número de usuarios por página
    page_size_query_param = 'page_size'
    max_page_size = 50

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Solo usuarios autenticados
def list_users(request):
    user = request.user  # Usuario autenticado

    # Verifica si el usuario tiene el rol de "Administrador"
    if not hasattr(user, 'role') or user.role != 'Administrador':
        return Response(
            {"error": "No tienes permiso para acceder a esta información."},
            status=403
        )

    # Si es administrador, retorna la lista de usuarios
    users = UserProfile.objects.all()
    paginator = UserPagination()
    paginated_users = paginator.paginate_queryset(users, request)
    serializer = UserProfileSerializer(paginated_users, many=True)
    return paginator.get_paginated_response(serializer.data)

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para crear usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().post(request, *args, **kwargs)

class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Obtener la información del usuario autenticado.
        """
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """
        Actualizar información del usuario con validaciones detalladas.
        """
        user = request.user
        data = request.data
        errors = {}
        # Validar campos restringidos para usuarios no superusuarios
        restricted_fields = ["is_active", "is_staff", "is_superuser"]
        if not user.is_superuser:
            for field in restricted_fields:
                if field in data:
                    errors[field] = ["No tienes permiso para modificar este campo."]

        new_username = data.get("username", user.username).lower()
        if new_username != user.username and UserProfile.objects.filter(username=new_username).exists():
            errors["username"] = ["El nombre de usuario ya está en uso."]
           # Verificar si se intenta cambiar el rol
        if "role" in data and data["role"] != user.role:
            if not user.is_superuser:
                errors["role"] = ["No tienes permiso para cambiar tu rol."]

        

        # Validar correo si es proporcionado
        email = data.get('email', None)
        if email:
            is_valid, message = validate_gmail_email(email)
            if not is_valid:
                errors["email"] = [message]
            elif UserProfile.objects.filter(email=email).exclude(id=user.id).exists():
                errors["email"] = ["El correo ya está en uso."]

        # Validar número de teléfono
        phone = data.get('phone', None)
        if phone:
            if UserProfile.objects.filter(phone=phone).exclude(id=user.id).exists():
                errors["phone"] = ["El número de celular ya existe."]

        # Validar contraseñas si son proporcionadas
        password = data.get('password', None)
        re_password = data.get('re_password', None)
        if password or re_password:
            is_valid, message = is_valid_password(password, re_password)
            if not is_valid:
                errors["password"] = [message]
            else:
                user.set_password(password)  # Cambia la contraseña
                user.save()

        # Si hay errores, retornar la respuesta con los mismos
        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

       # Actualizar campos del usuario
        serializer = UserProfileSerializer(user, data=data, partial=True, context={'request': request})
        if serializer.is_valid():
            if new_username != user.username:
                user.username = new_username  # Asigna el nuevo nombre de usuario
            if password:  # Si hay una contraseña válida, cambiarla
                user.set_password(password)
            serializer.save()
            return Response({"message": "Información actualizada correctamente."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
        Eliminar la cuenta del usuario autenticado.
        """
        user = request.user
        # No permitir eliminar a un Administrador
        if user.role == "Administrador" or user.is_superuser:
            return Response({"error": "No puedes eliminar esta cuenta porque eres un administrador."}, status=status.HTTP_403_FORBIDDEN)
        user.delete()
        return Response({"message": "Cuenta eliminada exitosamente."}, status=status.HTTP_200_OK)





class UpdateDeleteUserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated] 
    def put(self, request,pk=None):   
        try:
            user = UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        
         # Verifica si el usuario es un administrador
        if user.role == "Administrador" or user.is_superuser:
            return Response({"error": "No puedes desactivar a un Administrador."}, status=status.HTTP_403_FORBIDDEN)
        
        
        
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
        
        # No permitir eliminar a un Administrador
        if user.role == "Administrador" or user.is_superuser:
            return Response({"error": "No puedes eliminar a un Administrador."}, status=status.HTTP_403_FORBIDDEN)
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