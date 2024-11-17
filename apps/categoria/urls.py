from django.urls import path

from .views import *

urlpatterns = [
    path('lista',ListCategoriasVista.as_view())
]