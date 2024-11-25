from rest_framework import serializers
from .models import UserProfile
from apps.users.utils.validators import is_valid_password, validate_gmail_email
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'phone', 'full_name', 'role', 'is_active', 'is_staff', 'is_superuser', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)  # Usa set_password para guardar correctamente
        instance.save()
        return instance

    def update(self, instance, validated_data):
        request = self.context.get('request', None)  # Recupera el request desde el contexto
        # Validación de contraseña
        # Validación de contraseña
        password = validated_data.get('password', None)
        re_password = self.context.get('request', {}).data.get('re_password', None)
        if password:
            is_valid, message = is_valid_password(password, re_password)
            if not is_valid:
                raise serializers.ValidationError({"password": message})
            instance.set_password(password)
        
        # Validación de correo
        email = validated_data.get('email', None)
        if email:
            is_valid, message = validate_gmail_email(email)
            if not is_valid:
                raise serializers.ValidationError({"email": message})
            email = email.lower()
            if UserProfile.objects.filter(email=email).exclude(id=instance.id).exists():
                raise serializers.ValidationError({"email": "El correo ya está registrado con otro usuario."})
            instance.email = email
            
        # Validación y actualización del campo 'is_active'
        is_active = validated_data.get('is_active', None)
        if is_active is not None:
            if request and not request.user.is_superuser:
                raise serializers.ValidationError({"is_active": "No tienes permiso para modificar el estado de esta cuenta."})
            instance.is_active = is_active




        # Validación del campo 'role'
        new_role = validated_data.get('role', None)
        if new_role and request and not request.user.is_superuser:
            # Solo los administradores pueden modificar el rol
            raise serializers.ValidationError({"role": "No tienes permiso para modificar el rol de usuario."})

        # Actualización de otros campos
        instance.phone = validated_data.get('phone', instance.phone)
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.save()
        return instance