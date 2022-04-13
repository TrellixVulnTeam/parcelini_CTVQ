from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from django.apps import apps

UserHistory = apps.get_model("accounts", "UserHistory")
from django.contrib.auth.models import User

# class UserHistoryView(APIView):
#     def get(self, request, username):
#         user_id = User.objects.get(username=username).id
#         history = UserHistory.objects.get(user_id=user_id)
