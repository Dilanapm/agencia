from django.db import models
from django.utils.timezone import now
from apps.users.models import UserProfile

class Notification(models.Model):
    ROLE_CHOICES = (
        ('Adoptante', 'Adoptante'),
        ('Cuidador', 'Cuidador'),
    )

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="notifications")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, null=True, blank=True)
    title = models.CharField(max_length=255)  # Título de la notificación
    message = models.TextField()  # Mensaje completo
    is_read = models.BooleanField(default=False)  # Indica si fue leída
    created_at = models.DateTimeField(default=now)  # Fecha de creación
    notification_type = models.CharField(max_length=50, null=True, blank=True)  # Tipo de notificación
    link = models.URLField(null=True, blank=True)  # Enlace relacionado (opcional)
    form_data = models.JSONField(null=True, blank=True)  # Formulario enviado por el usuario
    parent_notification = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True, related_name="responses")  # Relaciona notificaciones de respuesta con la original
    def __str__(self):
        return f"Notificación para {self.user.username}: {self.title}"
