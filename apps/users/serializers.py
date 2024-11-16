from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'phone', 'full_name', 'role', 'is_active', 'is_staff', 'is_superuser', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_active': {'read_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
        }

    def create(self, validated_data):
        # Extrae y elimina la contraseña de validated_data
        password = validated_data.pop('password', None)
        
        # Usa el método create_user del manager personalizado
        user = UserProfile.objects.create_user(
            password=password,
            **validated_data
        )
        return user

    def update(self, instance, validated_data):
        # Actualiza los campos del usuario
        instance.email = validated_data.get('email', instance.email)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.role = validated_data.get('role', instance.role)

        # Actualiza la contraseña si se proporciona
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance