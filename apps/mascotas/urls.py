from django.urls import path

from .views import *

urlpatterns = [
    #Ruta para ver la lista de mascotas
    path('lista/', MascotaVistaLista.as_view(), name='mascota-lista'),
    #Ruta para crear mascota
    path('crear/', MascotaCrearVista.as_view(), name='mascota-crear'), 
    path('categorias/', CategoriaPredefinidaVista.as_view(), name='categorias'),
    #Ruta para actualizar mascota
    path('actualizar/<int:pk>/', MascotaActualizarVista.as_view(), name='mascota-actualizar'),
    #Ruta para detalles de mascota x
    path('detalle/<int:pk>/', DetalleMascotaView.as_view(), name='detalle-mascota'),
] 