from django.urls import path
from .views import RegisterUserView, LoginUserView, UserDetailView, list_users, CreateUserView, UpdateDeleteUserView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),  # Registro de usuarios
    path('login/', LoginUserView.as_view(), name='login'),  # Inicio de sesión
    path('me/', UserDetailView.as_view(), name='detalle-usuario'),  # Detalle del usuario autenticado
    path('', list_users, name='list_users'),  # Lista de todos los usuarios para el administrador
    path('create/', CreateUserView.as_view(), name='crear-usuario'),  # Creación de usuario
    path('<int:pk>/', UpdateDeleteUserView.as_view(), name='user-update-delete'),  # Actualizar o eliminar usuario específico
]