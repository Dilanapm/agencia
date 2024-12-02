from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Curiosity, Tip, Comment
from .serializer import CuriositySerializer, TipSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name='dispatch')
class CuriosityComments(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden comentar
    http_method_names = ['get', 'post']  # Permitir solo GET y POST

    BAD_WORDS = ["mala", "palabra1", "insulto", "niggas", "nigga"]  # Lista de palabras prohibidas
    
    def contains_bad_words(self, content):
        """
        Verifica si el contenido contiene palabras prohibidas.
        """
        for bad_word in self.BAD_WORDS:
            if bad_word in content.lower():
                return True
        return False
    
    def post(self, request, id):
        print(f"Debug: Se recibió un POST para la curiosidad {id}")
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            content = serializer.validated_data.get("content", "")
            if self.contains_bad_words(content):
                print("Debug: Comentario contiene malas palabras.")
                return Response(
                    {"error": "Tu comentario contiene palabras no permitidas."},
                    status=400,
                )
            serializer.save(curiosity_id=id, user=request.user)
            print("Debug: Comentario guardado exitosamente")
            return Response(serializer.data, status=201)
        print("Debug: Errores de validación", serializer.errors)
        return Response(serializer.errors, status=400)
    
    def get(self, request, id):
        comments = Comment.objects.filter(curiosity_id=id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
class CuriosityList(APIView):
    permission_classes=[AllowAny]
    def get(self, request):
        curiosities = Curiosity.objects.all()
        serializer = CuriositySerializer(curiosities, many=True)
        return Response(serializer.data)

class TipList(APIView):
    permission_classes = [AllowAny]  # Permitir acceso a cualquiera

    def get(self, request):
        tips = Tip.objects.all()
        serializer = TipSerializer(tips, many=True)
        return Response(serializer.data)



