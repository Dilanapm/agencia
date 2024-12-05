from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import FileResponse
from django.conf import settings
import os

@api_view(["GET"])
def protected_media(request, path):
    # Permitir acceso público a las fotos de mascotas
    if path.startswith("mascotas/"):
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        if os.path.exists(file_path):
            # Determina el tipo de contenido (por ejemplo, imágenes JPG/PNG)
            content_type = "image/jpeg" if file_path.endswith(".jpg") else "application/octet-stream"
            return FileResponse(open(file_path, 'rb'), content_type=content_type)
        else:
            return Response({"detail": "Archivo no encontrado."}, status=404)

    # Requiere autenticación y permisos para otros archivos
    user = request.user if request.user.is_authenticated else None
    if not user or user.role not in ["Cuidador", "Administrador"]:
        return Response({"detail": "No tienes permiso para acceder a este archivo."}, status=403)

    # Ruta completa del archivo
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    
    # Verificar si el archivo existe
    if not os.path.exists(file_path):
        return Response({"detail": "Archivo no encontrado."}, status=404)
    
    # Enviar el archivo como respuesta
    return FileResponse(open(file_path, 'rb'), content_type='application/octet-stream')
