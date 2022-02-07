from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from arcgis import views

urlpatterns = [
    path('service_mapper', views.service_mapper),
    path("get_gis", views.GisInfo.as_view()),

]
