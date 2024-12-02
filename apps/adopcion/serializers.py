from rest_framework import serializers
from .models import Adopcion

class AdopcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adopcion
        fields = '__all__'
