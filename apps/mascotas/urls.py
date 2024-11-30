from django.urls import path

from .views import *

urlpatterns = [
    #Ruta para ver la lista de mascotas
    path('lista/', MascotaVistaLista.as_view(), name='mascota-lista'),
    #Ruta para crear mascota
    path('crear/', MascotaCrearVista.as_view(), name='mascota-crear'), 
    path('categorias/', CategoriaPredefinidaVista.as_view(), name='categorias'),
    path('actualizar/<int:pk>/', MascotaActualizarVista.as_view(), name='mascota-actualizar'),
]