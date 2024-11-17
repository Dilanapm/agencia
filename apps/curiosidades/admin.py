from django.contrib import admin
from .models import Curiosidades

@admin.register(Curiosidades)
class CuriosidadesAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'descripcion')
