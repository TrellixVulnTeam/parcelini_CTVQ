from django.urls import path
from . import views

urlpatterns = [
    path("api/get_parcel_info/<str:address_slug>", views.ParcelInfo.as_view()),
]
