from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Rutas para la API
    path('api/mascotas/', include('apps.mascotas.urls')), # Endpoints relacionados con masctoas
    path('api/categoria/', include('apps.categoria.urls')), # Endpoints relacionados con categorias
    path('api/users/', include('apps.users.urls')),  # Endpoints relacionados con usuarios
    
    # Rutas de ckeditor (editor de texto enriquecido)
    path('ckeditor/', include('ckeditor_uploader.urls')),

    # Rutas de administracion
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Redireccion al frontend react
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
