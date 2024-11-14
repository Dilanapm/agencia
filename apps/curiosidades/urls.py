from django.urls import path
from .views import RandomCuriosidadesView

urlpatterns = [
    path('api/curiosidades/random/', RandomCuriosidadesView.as_view(), name='random_curiosidades'),
]
