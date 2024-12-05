from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Rutas para la API
    path('api/mascotas/', include('apps.mascotas.urls')),  # Endpoints relacionados con mascotas
    path('api/categoria/', include('apps.categoria.urls')),  # Endpoints relacionados con categorías
    path('api/users/', include('apps.users.urls')),  # Endpoints relacionados con usuarios
    path('api/mascotas/', include('apps.mascotas.urls')),  # Endpoints relacionados con mascotas

    
    # Rutas de ckeditor (editor de texto enriquecido)
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('api/curiosities/', include('apps.curiosities.urls')),  # Ruta para curiosidades

    # Rutas de administración
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Asegurar que solo las rutas que no pertenezcan a la API vayan al frontend React
urlpatterns += [
    re_path(r'^(?!api/).*$', TemplateView.as_view(template_name='index.html')),  # Redirige solo si no empieza con 'api/'
]
