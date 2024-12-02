from django.contrib import admin
from .models import Adopcion

@admin.register(Adopcion)
class AdopcionAdmin(admin.ModelAdmin):
    list_display = ['nombre_completo', 'correo_electronico', 'tipo_mascota']
