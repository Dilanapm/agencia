from rest_framework import serializers
from .models import *
from apps.categoria.serializer import CategoriaSerializer

class MascotaSerializer(serializers.ModelSerializer): # el serializador agarra la informacion de categoria
    categoria = CategoriaSerializer()
    class Meta:
        model=Mascotas
        fields=[
            'id',
           'nombre',
           'slug', 
           'foto',
           'descripcion',
           'contenido',
           'color',
           'disponible',
           'vistas',
           'publicacion',
           'registro_veterinario',
           'categoria'
        ]

class MascotaListaSerializer(serializers.ModelSerializer): # el serializador agarra la informacion de categoria
    categoria = CategoriaSerializer()
    class Meta:
        model=Mascotas
        fields=[
            'id',
           'nombre',
           'slug', 
           'foto',
           'descripcion',
           'color',
           'disponible',
           'vistas',
           'publicacion',
           'categoria'
        ]