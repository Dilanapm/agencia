from django.db import models

# Create your models here.
class Categoria(models.Model):
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
    
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255,unique=True)

    vistas = models.IntegerField(default=0, blank=True)

    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name

    def get_conteo_vista(self):
        vistas = ViewCount.objects.filter(categoria=self).count()
        return vistas

class ViewCount(models.Model):
    categoria = models.ForeignKey(Categoria,related_name='conteo_vistas_categoria', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"