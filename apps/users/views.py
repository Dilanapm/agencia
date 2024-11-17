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

User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]
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
@permission_classes([IsAuthenticated])
def list_users(request):
    if request.user.role == 'Administrador':
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data)
    return Response({'error': 'No tiene permiso para ver esta información.'}, status=403)

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