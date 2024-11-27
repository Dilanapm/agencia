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

    def get(self, request, id):
        comments = Comment.objects.filter(curiosity_id=id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        print(f"Debug: Se recibió un POST para la curiosidad {id}")
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(curiosity_id=id, user=request.user)
            print("Debug: Comentario guardado exitosamente")
            return Response(serializer.data, status=201)
        print("Debug: Errores de validación", serializer.errors)
        return Response(serializer.errors, status=400)
    
class CuriosityList(APIView):
    permission_classes=[AllowAny]
    def get(self, request):
        curiosities = Curiosity.objects.all()
        serializer = CuriositySerializer(curiosities, many=True)
        return Response(serializer.data)

class TipList(APIView):
    def get(self, request):
        tips = Tip.objects.all()
        serializer = TipSerializer(tips, many=True)
        return Response(serializer.data)


