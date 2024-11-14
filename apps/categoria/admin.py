from django.contrib import admin
from .models import *

# Register your models here.
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id','name',) # como quiero ver al administrador
    list_display_links = ('name',) # acceder a traves de dar click al nombre
    list_per_page = 25 #ver 25 de estas

admin.site.register(Categoria,CategoriaAdmin)