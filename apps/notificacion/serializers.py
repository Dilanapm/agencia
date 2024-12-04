from rest_framework import serializers
from apps.notificacion.models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'form_data', 'is_read', 'created_at' , 'notification_type']
