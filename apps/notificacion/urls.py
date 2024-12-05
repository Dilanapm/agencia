from django.urls import path
from .views import CreateAdoptionNotificationView,ListUserNotificationsView, ListUnreadNotificationsView, MarkAllNotificationsAsReadView, RespondAdoptionRequestView, ListAdoptanteNotificationsView,ListAdoptanteUnreadNotificationsView, MarkAllNotAdoptant, MarkNotificationAsReadView, CheckUserNotificationsView, NotificationDetailView

urlpatterns = [
     path('adopcion/crear/', CreateAdoptionNotificationView.as_view(), name='crear-adopcion'),
    path('user-notifications/', ListUserNotificationsView.as_view(), name='user-notifications'),
    path('unread-notifications/', ListUnreadNotificationsView.as_view(), name='unread-notifications'),
    path('mark-all-as-read/', MarkAllNotificationsAsReadView.as_view(), name='mark-all-as-read'),
    path('respond-adoption-request/<int:notification_id>/', RespondAdoptionRequestView.as_view(), name='respond-adoption-request'),
    path('adoptante-notifications/', ListAdoptanteNotificationsView.as_view(), name='adoptante-notifications'),
    path('adoptante-unread-notifications/', ListAdoptanteUnreadNotificationsView.as_view(), name='adoptante-unread-notifications'),
    path('adoptante-mark-all-as-read/', MarkAllNotAdoptant.as_view(), name='adoptante-mark-all-as-read'),
    path('mark-as-read/<int:notification_id>/', MarkNotificationAsReadView.as_view(), name='mark-as-read'),
    path('check-notifications/', CheckUserNotificationsView.as_view(), name='check-notifications'),
    path('detalle/<int:notification_id>/', NotificationDetailView.as_view(), name='notification-detail'),
]
