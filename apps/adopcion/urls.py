from django.urls import path
from .views import AdopcionCreateAPIView

urlpatterns = [
    path('crear/', AdopcionCreateAPIView.as_view(), name='crear-adopcion'),
]
