from django.urls import path
from .views import (
    MascotaVistaLista,
    MascotaCrearVista,
    CategoriaPredefinidaVista,
    MascotaActualizarVista,
    MascotaRecomendadorVista  # Asegúrate de importar la vista
)

urlpatterns = [
    path('lista/', MascotaVistaLista.as_view(), name='mascota-lista'),
    path('crear/', MascotaCrearVista.as_view(), name='mascota-crear'),
    path('categorias/', CategoriaPredefinidaVista.as_view(), name='categorias'),
    path('actualizar/<int:pk>/', MascotaActualizarVista.as_view(), name='mascota-actualizar'),
    path('recomendar/', MascotaRecomendadorVista.as_view(), name='mascota-recomendar'),  # Define la ruta aquí
    
]
