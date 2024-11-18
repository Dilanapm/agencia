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
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        re_password = request.data.get('re_password')  # Nueva variable

        # Validar que todos los campos estén presentes
        if not username or not email or not password or not re_password:
            return Response(
                {"error": "Todos los campos son obligatorios"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar que las contraseñas coincidan
        if password != re_password:
            return Response(
                {"error": "Las contraseñas no coinciden"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar duplicidad de nombre de usuario
        if UserProfile.objects.filter(username=username).exists():
            return Response(
                {"error": "El nombre de usuario ya está en uso"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar duplicidad de email
        if UserProfile.objects.filter(email=email).exists():
            return Response(
                {"error": "El correo ya está en uso"},
                status=status.HTTP_400_BAD_REQUEST
            )

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
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Validación de campos
        if not username or not password:
            return Response({"error": "Se requieren todos los campos"}, status=status.HTTP_400_BAD_REQUEST)

        # Autenticar al usuario
        user = authenticate(username=username, password=password)
        if user is None:
            # Comprobar si el usuario existe pero la contraseña es incorrecta
            if UserProfile.objects.filter(username=username).exists():
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
   
        
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

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

class UpdateDeleteUserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]  

    def put(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para actualizar usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().put(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if request.user.role != 'Administrador':
            return Response({'error': 'No tiene permiso para eliminar usuarios.'}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)