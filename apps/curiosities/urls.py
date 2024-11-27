from django.urls import path
from .views import CuriosityList, TipList, CuriosityComments

urlpatterns = [
    path("curiosities-list/", CuriosityList.as_view(), name="curiosity-list"),
    path("tips/", TipList.as_view(), name="tip-list"),
    path("curiosities-comments/<int:id>/comments/", CuriosityComments.as_view(),
name="curiosity-comments",
    ),
]
