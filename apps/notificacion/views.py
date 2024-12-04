from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from apps.notificacion.models import Notification
from apps.users.models import UserProfile
from apps.notificacion.serializers import NotificationSerializer
class SendAdoptionRequestView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden enviar solicitudes

    def post(self, request):
        adoptante = request.user  # Usuario autenticado (adoptante)
        form_data = request.data.get('form_data')  # Datos del formulario
        form_data['adoptante_user'] = adoptante.username
        # Buscar al cuidador en la base de datos (puedes personalizar cómo seleccionarlo)
        cuidador = UserProfile.objects.filter(role="Cuidador").first()

        if not cuidador:
            return Response({"error": "No hay cuidadores disponibles en este momento."}, status=status.HTTP_404_NOT_FOUND)

        # Crear la notificación
        notification = Notification.objects.create(
            user=cuidador,
            role=cuidador.role,
            title=f"Solicitud de adopción de {adoptante.username}",
            message=f"¡Hey! {adoptante.username} te ha enviado una solicitud de adopción.",
            notification_type="Solicitud de Adopción",
            form_data={**form_data, "adoptante_user": adoptante.username}
        )

        return Response(
            {"message": "Solicitud enviada exitosamente.", "notification_id": notification.id}, 
            status=status.HTTP_201_CREATED
        )

class ListUserNotificationsView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def get(self, request):
        user = request.user  # Usuario autenticado
        if user.role != "Cuidador":
            return Response({"error": "No tienes permiso para ver estas notificaciones."}, status=403)

        # Obtener notificaciones del cuidador
        notifications = Notification.objects.filter(user=user).order_by('-created_at')

        # Serializar las notificaciones
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=200)
    
class ListUnreadNotificationsView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder
    def get(self, request):
        user = request.user  # Usuario autenticado

        # Verificar que el usuario sea cuidador
        if user.role != "Cuidador":
            return Response({"error": "No tienes permiso para ver estas notificaciones."}, status=403)

        # Filtrar notificaciones no leídas del usuario
        unread_notifications = Notification.objects.filter(user=user, is_read=False).order_by('-created_at')

        # Serializar las notificaciones
        serializer = NotificationSerializer(unread_notifications, many=True)
        return Response(serializer.data, status=200)


class MarkAllNotificationsAsReadView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    def post(self, request):
        user = request.user

        # Verificar que el usuario sea cuidador
        if user.role != "Cuidador":
            return Response({"error": "No tienes permiso para realizar esta acción."}, status=403)

        # Marcar todas las notificaciones como leídas
        Notification.objects.filter(user=user, is_read=False).update(is_read=True)
        return Response({"message": "Todas las notificaciones se marcaron como leídas."}, status=200)


class RespondAdoptionRequestView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    def post(self, request, notification_id):
        user = request.user  # Usuario autenticado (cuidador)

        # Validar que el usuario sea cuidador
        if user.role != "Cuidador":
            return Response({"error": "No tienes permiso para realizar esta acción."}, status=403)

        # Obtener la notificación original
        try:
            notification = Notification.objects.get(id=notification_id, user=user)
        except Notification.DoesNotExist:
            return Response({"error": "Notificación no encontrada o no tienes permiso para acceder a ella."}, status=404)

        # Obtener al adoptante directamente de los datos de la notificación
        adoptante = notification.form_data.get("adoptante_user")
        try:
            adoptante_user = UserProfile.objects.get(username=adoptante)
        except UserProfile.DoesNotExist:
            return Response({"error": "El adoptante asociado a la solicitud no existe."}, status=404)

        # Obtener la decisión del cuidador
        decision = request.data.get('decision')  # "aceptar" o "rechazar"
        if decision not in ["aceptar", "rechazar"]:
            return Response({"error": "Debes proporcionar una decisión válida: 'aceptar' o 'rechazar'."}, status=400)

        # Generar la notificación de respuesta
        if decision == "aceptar":
            message = (
                f"Felicidades, tu solicitud fue aceptada por {user.username}. "
                f"Puedes chatear con ella mediante WhatsApp mostrándole un screenshot del mensaje de aprobación."
            )
        else:
            message = "Lastimosamente no calificas para poder adoptar al perrito."

        response_notification = Notification.objects.create(
            user=adoptante_user,
            role=adoptante_user.role,
            title="Respuesta a tu solicitud de adopción",
            message=message,
            notification_type="Respuesta a Solicitud",
            parent_notification=notification,  # Relacionamos con la solicitud original
        )

        # Marcar la notificación original como leída
        notification.is_read = True
        notification.save()

        return Response(
            {
                "message": f"Tu decisión de '{decision}' fue registrada.",
                "response_notification_id": response_notification.id,
            },
            status=200,
        )

class ListAdoptanteNotificationsView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def get(self, request):
        user = request.user  # Usuario autenticado

        # Validar que el usuario sea adoptante
        if user.role != "Adoptante":
            return Response({"error": "No tienes permiso para ver estas notificaciones."}, status=403)

        # Filtrar notificaciones del adoptante (puedes ajustar este filtro según necesidades)
        notifications = Notification.objects.filter(user=user).order_by('-created_at')

        # Serializar las notificaciones
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=200)
    
class ListAdoptanteUnreadNotificationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role != "Adoptante":
            return Response({"error": "No tienes permiso para ver estas notificaciones."}, status=403)

        # Filtrar solo notificaciones no leídas
        notifications = Notification.objects.filter(user=user, is_read=False).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=200)
    
class MarkAllNotAdoptant(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados

    def post(self, request):
        user = request.user

        # Verificar que el usuario sea cuidador
        if user.role != "Adoptante":
            return Response({"error": "No tienes permiso para realizar esta acción."}, status=403)

        # Marcar todas las notificaciones como leídas
        Notification.objects.filter(user=user, is_read=False).update(is_read=True)
        return Response({"message": "Todas las notificaciones se marcaron como leídas."}, status=200)

class MarkNotificationAsReadView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def put(self, request, notification_id):
        user = request.user

        try:
            # Buscar la notificación por ID y validar que pertenezca al usuario autenticado
            notification = Notification.objects.get(id=notification_id, user=user)
        except Notification.DoesNotExist:
            return Response({"error": "Notificación no encontrada o no tienes permiso para acceder a ella."}, status=404)

        # Marcar la notificación como leída
        notification.is_read = True
        notification.save()

        return Response({"message": "Notificación marcada como leída.", "notification_id": notification.id}, status=200)