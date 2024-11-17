from rest_framework.views import APIView
from  rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Mascotas, ViewCount
from apps.categoria.models import Categoria

from .serializer import MascotaSerializer, MascotaListaSerializer

class MascotaVistaLista(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,format=None):
        if Mascotas.objects.all().exists():
            mascotas = Mascotas.objects.all()
            serializer = MascotaListaSerializer(mascotas,many=True)
            return Response({'mascotas': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'no se encuentra mascota'}, status=status.HTTP_404_NOT_FOUND)