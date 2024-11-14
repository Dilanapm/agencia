from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from apps.categoria.models import Categoria

def mascota_foto_directorio(instance, filename):
    return 'mascotas/{0}/{1}'.format(instance.nombre,filename)

def registro_veterinario_directorio(instance, filename):
    return 'mascotas/{0}/registros_veterinarios/{1}'.format(instance.nombre, filename)
# Create your models here.
class Mascotas(models.Model):
    nombre =            models.CharField(max_length=200)
    slug =              models.SlugField(max_length=255, unique=True)
    foto =              models.ImageField(upload_to=mascota_foto_directorio,max_length=500)
    descripcion =       models.TextField(max_length=255)
    contenido =         RichTextField()
    color =             models.CharField(max_length=50)
    disponible =        models.BooleanField(default=True)
    vistas =            models.IntegerField(default=0, blank=True)
    publicacion =       models.DateTimeField(default=timezone.now)
    registro_veterinario = models.FileField(upload_to=registro_veterinario_directorio, blank=True, null=True)
    categoria =         models.ForeignKey(Categoria, on_delete=models.PROTECT)

    class Meta:
        ordering = ('publicacion',)
    
    def __str__(self):
        return self.nombre

    def get_conteo_vista(self):
        vistas = ViewCount.objects.filter(mascotas=self).count()
        return vistas

class ViewCount(models.Model):
    mascotas = models.ForeignKey(Mascotas,related_name='conteo_vistas_mascotas', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"