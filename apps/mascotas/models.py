from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from apps.categoria.models import Categoria

def mascota_foto_directorio(instance, filename):
    return 'mascotas/{0}/{1}'.format(instance.nombre, filename)

def registro_veterinario_directorio(instance, filename):
    return 'mascotas/{0}/registros_veterinarios/{1}'.format(instance.nombre, filename)

class Mascotas(models.Model):
    nombre = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True)
    foto = models.ImageField(upload_to=mascota_foto_directorio, max_length=500)
    descripcion = models.TextField(max_length=255)
    contenido = RichTextField()
    color = models.CharField(max_length=50)
    disponible = models.BooleanField(default=True)
    vistas = models.IntegerField(default=0, blank=True)
    publicacion = models.DateTimeField(default=timezone.now)
    registro_veterinario = models.FileField(upload_to=registro_veterinario_directorio, blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)  # Caracter del perro: tranquilos, juguetones, serios

    # Nuevos campos para el recomendador
    vivienda = models.CharField(
        max_length=50,
        choices=[
            ('patio', 'Casa con patio'),
            ('sinPatio', 'Casa sin patio'),
            ('departamento', 'Departamento')
        ],
        default='patio'
    )
    tiempo_cuidado = models.CharField(
        max_length=50,
        choices=[
            ('poco', 'Menos de 1 hora'),
            ('medio', 'Entre 1 y 3 horas'),
            ('mucho', 'Más de 3 horas')
        ],
        default='medio'
    )
    niños = models.BooleanField(default=False)  # Apto para casas con niños
    actividad = models.CharField(
        max_length=50,
        choices=[
            ('activa', 'Activa'),
            ('tranquila', 'Tranquila')
        ],
        default='activa'
    )
    experiencia = models.CharField(
        max_length=50,
        choices=[
            ('principiante', 'Principiante'),
            ('intermedio', 'Intermedio'),
            ('experto', 'Experto')
        ],
        default='principiante'
    )
    tamano = models.CharField(
        max_length=50,
        choices=[
            ('pequeño', 'Pequeño'),
            ('mediano', 'Mediano'),
            ('grande', 'Grande')
        ],
        default='mediano'
    )

    class Meta:
        ordering = ('publicacion',)

    def __str__(self):
        return self.nombre

    def get_conteo_vista(self):
        vistas = ViewCount.objects.filter(mascotas=self).count()
        return vistas

class ViewCount(models.Model):
    mascotas = models.ForeignKey(Mascotas, related_name='conteo_vistas_mascotas', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"
