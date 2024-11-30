from django.db import models

class FormularioAdopcion(models.Model):
    nombre_completo = models.CharField(max_length=100)
    correo_electronico = models.EmailField()
    telefono = models.CharField(max_length=15)
    direccion = models.TextField()
    experiencia_con_mascotas = models.BooleanField()
    espacio_suficiente = models.BooleanField()
    motivo_adopcion = models.TextField()
    tipo_mascota = models.CharField(max_length=50, choices=[('Perro', 'Perro'), ('Gato', 'Gato')])
    identificacion_oficial = models.FileField(upload_to='documentos/identificacion/')
    comprobante_domicilio = models.FileField(upload_to='documentos/domicilio/')
    acepto_terminos = models.BooleanField(default=False)
    confirmacion = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre_completo
