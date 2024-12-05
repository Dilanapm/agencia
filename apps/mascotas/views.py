from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser
from apps.categoria.serializer import CategoriaSerializer
from .models import Mascotas, ViewCount
from apps.categoria.models import Categoria
from .models import Mascotas
from .serializer import MascotaSerializer, MascotaListaSerializer, MascotaSerializerCrear
import logging

logger = logging.getLogger(__name__)


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

    def get(self, request, format=None):
        if Mascotas.objects.all().exists():
            mascotas = Mascotas.objects.all()
            serializer = MascotaListaSerializer(mascotas, many=True)
            return Response({'mascotas': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se encuentra mascota'}, status=status.HTTP_404_NOT_FOUND)


class MascotaCrearVista(APIView):
    permission_classes = [permissions.IsAuthenticated]
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
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return Response({'categorias': serializer.data}, status=status.HTTP_200_OK)


class MascotaRecomendadorVista(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        try:
            vivienda = request.GET.get('vivienda')
            tiempo_cuidado = request.GET.get('tiempo_cuidado')
            niños = request.GET.get('niños') == 'true'  # Procesamos el booleano
            actividad = request.GET.get('actividad')
            experiencia = request.GET.get('experiencia')
            tamano = request.GET.get('tamano')

            # Valida los parámetros antes de buscar
            if not all([vivienda, tiempo_cuidado, actividad, experiencia, tamano]):
                return Response(
                    {"error": "Faltan parámetros requeridos."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Filtra según los parámetros
            queryset = Mascotas.objects.filter(disponible=True)

            if vivienda:
                queryset = queryset.filter(vivienda__icontains=vivienda)
            if tiempo_cuidado:
                queryset = queryset.filter(tiempo_cuidado=tiempo_cuidado)
            if actividad:
                queryset = queryset.filter(actividad=actividad)
            if experiencia:
                queryset = queryset.filter(experiencia=experiencia)
            if tamano:
                queryset = queryset.filter(tamano=tamano)
            if niños is not None:
                queryset = queryset.filter(niños=niños)

            if queryset.exists():
                serializer = MascotaListaSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "No se encontraron mascotas que coincidan con tus preferencias."},
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception as e:
            return Response(
                {"error": f"Ocurrió un error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
