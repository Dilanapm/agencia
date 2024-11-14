from rest_framework import serializers
from .models import *

class CategoriaSerializer(serializers.ModelSerializer): # el serializador agarra la informacion de categoria

    class Meta:
        model=Categoria
        fields=[
            'id',
           'name',
           'slug',
           'vistas',
        ]