from django.db import models
from apps.users.models import UserProfile  # Importa el modelo de usuario

def curiosidad_imagen_directorio(instance, filename):
    return "curiosidades/{0}/{1}".format(instance.title, filename)


class Curiosity(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    imagen = models.ImageField(
        upload_to=curiosidad_imagen_directorio, blank=True, null=True
    )

    def __str__(self):
        return self.title


class Tip(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    content = models.TextField()
    curiosity = models.ForeignKey(
        Curiosity, on_delete=models.CASCADE, related_name="comments"
    )
    user = models.ForeignKey(  # Relación con el modelo UserProfile
        UserProfile,
        on_delete=models.CASCADE,
        related_name="comments",
        null=True,
        blank=True
    )

    def __str__(self):
        return f"Comment by {self.user.username if self.user else 'Anonymous'} on {self.curiosity.title}"
