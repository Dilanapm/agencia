
from django.contrib import admin
from django.contrib.auth.models import Group
from django.utils.html import format_html
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone', 'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_active')
    search_fields = ('username', 'email', 'full_name')
    ordering = ('username',)

    # Limit access based on user permissions
    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser or request.user.role == 'Administrador'
    
    def has_add_permission(self, request):
        return request.user.is_superuser or request.user.role == 'Administrador'
    
    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser or request.user.role == 'Administrador'
    
    def has_delete_permission(self, request, obj=None):
        # Solo los súperusuarios pueden eliminar usuarios
        return request.user.is_superuser
    
    def get_actions(self, request):
        actions = super().get_actions(request)
        # Elimina la acción de "eliminar seleccionados"
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
    

# Optional: Unregister the default 'Group' model from admin if it's not needed
admin.site.unregister(Group)

# Customization to add a link to the frontend
admin.site.site_header = format_html(
    'Django Admin - <a href="http://localhost:3000/" style="color: white; font-weight: bold;" target="_blank">Volver al Frontend</a>'
)