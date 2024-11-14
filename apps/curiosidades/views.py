from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Curiosidades
from .serializers import CuriosidadesSerializer
import random

class RandomCuriosidadesView(APIView):
    def get(self, request, format=None):
        curiosidades = list(Curiosidades.objects.all())
        seleccion_aleatoria = random.sample(curiosidades, min(len(curiosidades), 5))
        serializer = CuriosidadesSerializer(seleccion_aleatoria, many=True)
        return Response(serializer.data)
