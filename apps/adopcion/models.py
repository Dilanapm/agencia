from django.db import models

class Adopcion(models.Model):
    nombre_completo = models.CharField(max_length=255)
    correo_electronico = models.EmailField()
    numero_telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    experiencia_mascotas = models.BooleanField()
    espacio_suficiente = models.BooleanField()
    motivo_adopcion = models.TextField()
    tipo_mascota = models.CharField(max_length=50, choices=[('Perro', 'Perro'), ('Gato', 'Gato')])
    identificacion_oficial = models.FileField(upload_to='documentos/')
    comprobante_domicilio = models.FileField(upload_to='documentos/')
    acepto_terminos = models.BooleanField()
    confirmo_veracidad = models.BooleanField()

    def __str__(self):
        return self.nombre_completo
