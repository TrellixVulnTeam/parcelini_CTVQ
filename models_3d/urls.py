from django.urls import path
from . import views

urlpatterns = [
    path("models", views.models),
    path("view_model/<int:gisparcel_id>", views.view_model),
    path("models/fetch_3d_model/<str:address_slug>",
         views.Fetch_3d_Info.as_view()),
    path("models/check_3d_status/<str:task_id>",
         views.Check_3d_Status.as_view()),
    path("models/fetch_model_data/<int:gisparcel_id>",
         views.Fetch_Model_Data.as_view()),
]
