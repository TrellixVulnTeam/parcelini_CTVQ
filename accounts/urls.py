from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserKeyAPI
from knox import views as knox_views

from . import views

urlpatterns = [
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path("api/auth/user", UserAPI.as_view()),
    path("api/auth/userkey", UserKeyAPI.as_view()),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("api/<str:username>/usage", views.UserHistoryView.as_view()),
    path("api/<str:username>/user_addresses", views.UserAddressHistoryView.as_view()),
]
