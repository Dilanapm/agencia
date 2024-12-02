from rest_framework import serializers
from .models import Curiosity, Tip, Comment
from apps.users.models import UserProfile


class CuriositySerializer(serializers.ModelSerializer):
    class Meta:
        model = Curiosity
        fields = ["id", "title", "description", "imagen"]


class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = ["id", "title", "content"]


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Muestra el username del usuario
    curiosity = serializers.PrimaryKeyRelatedField(read_only=True)  # Solo el ID de la curiosidad

    class Meta:
        model = Comment
        fields = ["id", "content", "curiosity", "user"]

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)
