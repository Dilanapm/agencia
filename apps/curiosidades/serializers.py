from rest_framework import serializers
from .models import Curiosidades

class CuriosidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curiosidades
        fields = ['id', 'titulo', 'descripcion', 'imagen', 'fecha_publicacion']
