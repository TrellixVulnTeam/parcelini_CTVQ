from django.urls import path
from . import views


urlpatterns = [
    path("test",views.test),
    path("explore_all", views.explore),
    path("get_data", views.get_data),
    # path("get_data", views.DataExplore.as_view()),
]
