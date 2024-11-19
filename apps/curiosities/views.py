from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Curiosity, Tip, Comment
from .serializer import CuriositySerializer, TipSerializer, CommentSerializer


class CuriosityList(APIView):
    def get(self, request):
        curiosities = Curiosity.objects.all()
        serializer = CuriositySerializer(curiosities, many=True)
        return Response(serializer.data)


class TipList(APIView):
    def get(self, request):
        tips = Tip.objects.all()
        serializer = TipSerializer(tips, many=True)
        return Response(serializer.data)


class CuriosityComments(APIView):
    def get(self, request, id):
        comments = Comment.objects.filter(curiosity_id=id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, id):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(curiosity_id=id)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
