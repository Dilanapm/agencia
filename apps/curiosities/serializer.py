from rest_framework import serializers
from .models import Curiosity, Tip, Comment


class CuriositySerializer(serializers.ModelSerializer):
    class Meta:
        model = Curiosity
        fields = ["id", "title", "description", "image"]


# hola


class TipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tip
        fields = ["id", "title", "content"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "content", "curiosity"]
