from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserProfileManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo de correo electrónico debe estar establecido')
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)  # Asegura que los usuarios sean activos
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)  # Superusuario también debe estar activo
        extra_fields.setdefault('role', 'Administrador')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)


class UserProfile(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    
    ROLE_CHOICES = (
        ('Administrador', 'Administrador'),
        ('Cuidador', 'Cuidador'),
        ('Adoptante', 'Adoptante')
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Adoptante')

    objects = UserProfileManager()  # Asigna el UserProfileManager

    def _str_(self):
        return self.username

    # Agrega related_name para evitar conflictos
    groups = models.ManyToManyField(
        'auth.Group',
        related_name="user_profile_groups",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups"
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name="user_profile_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions"
    )