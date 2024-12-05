from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from apps.categoria.serializer import CategoriaSerializer
from apps.users.models import UserProfile
from .models import Mascotas, ViewCount
from apps.categoria.models import Categoria

from .serializer import MascotaSerializer, MascotaListaSerializer, MascotaSerializerCrear
from rest_framework.parsers import MultiPartParser, FormParser


class MascotaActualizarVista(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk, format=None):
        user = request.user

        # Verificar si el usuario tiene el rol Cuidador
        if user.role != 'Cuidador':
            return Response(
                {"error": "No tienes permiso para realizar esta acción."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Verificar si la mascota existe
        try:
            mascota = Mascotas.objects.get(pk=pk)
        except Mascotas.DoesNotExist:
            return Response(
                {"error": "Mascota no encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Actualizar la información de la mascota
        serializer = MascotaSerializerCrear(mascota, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Mascota actualizada con éxito.", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MascotaVistaLista(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,format=None):
        if Mascotas.objects.all().exists():
            mascotas = Mascotas.objects.all()
            serializer = MascotaListaSerializer(mascotas,many=True)
            return Response({'mascotas': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'no se encuentra mascota'}, status=status.HTTP_404_NOT_FOUND)
        
class MascotaCrearVista(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = request.user

        if user.role != 'Cuidador':
            return Response(
                {"error": "No tienes permiso para realizar esta acción."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = MascotaSerializerCrear(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Mascota registrada con éxito.", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoriaPredefinidaVista(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        categorias  = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response({'categorias': serializer.data}, status=status.HTTP_200_OK)