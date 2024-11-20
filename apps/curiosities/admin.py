from django.contrib import admin
from .models import Curiosity, Tip, Comment


@admin.register(Curiosity)
class CuriosityAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "imagen",
    )  # Mostrar título, descripción e imagen
    search_fields = (
        "title",
        "description",
    )  # Permitir búsqueda por título y descripción
    list_filter = ("title",)  # Filtro por título para facilitar la búsqueda


@admin.register(Tip)
class TipAdmin(admin.ModelAdmin):
    list_display = ("title", "content")  # Mostrar título y contenido del tip
    search_fields = ("title", "content")  # Permitir búsqueda por título y contenido


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "content",
        "curiosity",
    )  # Mostrar contenido del comentario y la curiosidad a la que pertenece
    search_fields = ("content",)  # Permitir búsqueda por contenido
    list_filter = ("curiosity",)  # Filtro por curiosidad para facilitar la búsqueda
