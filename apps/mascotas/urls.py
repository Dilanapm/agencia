from django.urls import path

from .views import *

urlpatterns = [
    path('lista',MascotaVistaLista.as_view())
]