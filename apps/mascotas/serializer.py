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

class MascotaListaSerializer(serializers.ModelSerializer): 
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
           'registro_veterinario',
           'categoria'
        ]


class MascotaSerializerCrear(serializers.ModelSerializer):
    categoria = serializers.IntegerField(write_only=True)  # Para recibir el ID de la categoría

    class Meta:
        model = Mascotas
        fields = [
            'id',
            'nombre',
            'slug',
            'foto',
            'descripcion',
            'contenido',
            'color',
            'disponible',
            'registro_veterinario',
            'categoria',  # Se usa para asignar la categoría por ID
        ]

    def validate_categoria(self, value):
        try:
            Categoria.objects.get(id=value)
        except Categoria.DoesNotExist:
            raise serializers.ValidationError("Categoría no válida.")
        return value
    
    def create(self, validated_data):
        categoria = validated_data.pop('categoria', None)
        try:
            categoria = Categoria.objects.get(id=categoria)
        except Categoria.DoesNotExist:
            raise serializers.ValidationError({"categoria": "Categoría no válida."})
        
        return Mascotas.objects.create(categoria=categoria, **validated_data)
    
    def update(self, instance, validated_data):
        categoria_id = validated_data.pop('categoria', None)
        if categoria_id:
            try:
                instance.categoria = Categoria.objects.get(id=categoria_id)
            except Categoria.DoesNotExist:
                raise serializers.ValidationError({"categoria": "Categoría no válida."})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance