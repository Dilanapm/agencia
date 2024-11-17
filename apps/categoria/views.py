
from rest_framework.views import APIView
from  rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Categoria

# Create your views here.
class ListCategoriasVista(APIView):
    permission_classes =  (permissions.AllowAny,)

    #haciendo referencia a todos los modelos de categoria
    def get(self, request, format=None):
        if Categoria.objects.all().exists():
            categorias = Categoria.objects.all()
            result = []
            for categoria in categorias:
                if not categoria.parent:
                    item = {}
                    item['id']=categoria.id
                    item['name'] = categoria.name
                    item['slug'] = categoria.slug
                    item['vistas'] = categoria.vistas

                    item['sub_categoria'] = []
                    for sub_categoria in categorias:
                        sub_item = {}
                        if sub_categoria.parent and sub_categoria.parent.id == categoria.id:
                            sub_item['id']=sub_categoria.id
                            sub_item['name'] = sub_categoria.name
                            sub_item['slug'] = sub_categoria.slug
                            sub_item['vistas'] = sub_categoria.vistas

                            item['sub_categoria'].append(sub_item)
                    result.append(item)
                            
                    
                    
            return Response({'categoria':result}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'no se encontro categorias'}, status=status.HTTP_404_NOT_FOUND)