from django.urls import path
from .views import (
    RegisterUserView,
    LoginUserView,
    list_users,
    CreateUserView,
    UserUpdateView,
    GetCSRFToken,
    CheckAuthenticatedView,
    UpdateDeleteUserView,
    LogoutView,
    PasswordResetConfirmView,
    PasswordResetRequestView
)
urlpatterns = [
    path('check-authenticated/', CheckAuthenticatedView.as_view(), name='check-authenticated'),
    path('register/', RegisterUserView.as_view(), name='register'),  # Registro de usuarios
    path('get-csrf-token/', GetCSRFToken.as_view(), name='get_csrf_token'), # Obtencion de Token CSRF
    path('login/', LoginUserView.as_view(), name='login'),  # Inicio de sesión
    path('logout/', LogoutView.as_view(), name='logout'), # cierre de sesion
    path('list/', list_users, name='user-list'),  # Lista de todos los usuarios 
    path('create/', CreateUserView.as_view(), name='user-create'),  # Creación de usuario
    path('me/', UserUpdateView.as_view(), name='user-up'),  # Detalle del usuario autenticado
    path('up-del-user/<int:pk>/', UpdateDeleteUserView.as_view(), name='user-update-delete'),  # Actualizar o eliminar usuario
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]