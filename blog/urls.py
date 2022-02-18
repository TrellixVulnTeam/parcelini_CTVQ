from django.urls import path
from . import views

urlpatterns = [
    # path("test1",views.test1),
    path('blog', views.PostList.as_view()),
    path('blog/<slug:slug>/', views.PostDetail.as_view(), name='post_detail'),
]