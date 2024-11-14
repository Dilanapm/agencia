from django.db import models
from django.utils import timezone

def curiosidad_imagen_directorio(instance, filename):
    return 'curiosidades/{0}/{1}'.format(instance.titulo, filename)

class Curiosidades(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True)  # opcional, para URLs amigables
    descripcion = models.TextField()  # descripción detallada
    imagen = models.ImageField(upload_to=curiosidad_imagen_directorio, blank=True, null=True)
    fecha_publicacion = models.DateTimeField(default=timezone.now)  # opcional, para orden cronológico

    def __str__(self):
        return self.titulo
