from django.urls import path
from .views import CuriosityList, TipList, CuriosityComments

urlpatterns = [
    path("api/curiosities/", CuriosityList.as_view(), name="curiosity-list"),
    path("api/tips/", TipList.as_view(), name="tip-list"),
    path(
        "api/curiosities/<int:id>/comments/",
        CuriosityComments.as_view(),
        name="curiosity-comments",
    ),
]
