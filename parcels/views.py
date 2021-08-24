from django.shortcuts import render
from rest_framework.decorators import api_view
import json

from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.serializers import serialize
from rest_framework.permissions import (
    IsAdminUser,
    DjangoModelPermissionsOrAnonReadOnly,
    IsAuthenticated,
)
import requests
from accounts.permissions import HasUserAPIKey
from rest_framework import status




class ParcelInfo(APIView):
    permission_classes = [HasUserAPIKey]
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.post('https://protected-peak-85531.herokuapp.com/parcel_info', params={'address':address})
        if r.status_code == 200:
            return JsonResponse(r.json())
        else:
            content = {'message': 'Please use a correct California address'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)



# curl -H "Authorization: Api-Key IkoP9g2r.DFLr6CdVhM4uGtukRWxVH4ysDXPQ5UH" http://127.0.0.1:8000/get_parcel_info/210+Belmont+Ave,+Los+Angeles,+CA