from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from django.http import JsonResponse
from geocodio import GeocodioClient


def geolocation(request):
	client = GeocodioClient('05e962962a3da5a2a3356502a5596aa22c60a6a')
	location = client.geocode("1109 N Highland St, Arlington VA")
	return render(request, 'location.html',{'data':location})