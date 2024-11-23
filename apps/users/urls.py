from django.urls import path
from .views import (
    RegisterUserView,
    LoginUserView,
    UserDetailView,
    list_users,
    CreateUserView,
    UpdateDeleteUserView,
    GetCSRFToken,
    CheckAuthenticatedView,
    LogoutView
)
urlpatterns = [
    path('check-authenticated/', CheckAuthenticatedView.as_view(), name='check-authenticated'),
    path('register/', RegisterUserView.as_view(), name='register'),  # Registro de usuarios
    path('get-csrf-token/', GetCSRFToken.as_view(), name='get_csrf_token'), # Obtencion de Token CSRF
    path('login/', LoginUserView.as_view(), name='login'),  # Inicio de sesión
    path('logout/', LogoutView.as_view(), name='logout'), # cierre de sesion
    path('list/', list_users, name='user-list'),  # Lista de todos los usuarios 
    path('create/', CreateUserView.as_view(), name='user-create'),  # Creación de usuario
    path('me/', UserDetailView.as_view(), name='user-detail'),  # Detalle del usuario autenticado
    path('up-del-user/<int:pk>/', UpdateDeleteUserView.as_view(), name='user-update-delete'),  # Actualizar o eliminar usuario
]