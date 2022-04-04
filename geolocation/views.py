from django.shortcuts import render
from rest_framework.views import APIView
from geolocation.hazards import get_seisimic_zone_ca_info
from geolocation.hazards import get_fire_hazard_zones_ca
from geolocation.hazards import get_fema_flood_zones_national
from geolocation.hazards import get_floodplains_ca
from django.contrib.auth.models import User
from accounts.models import UserHistory

# from geolocation.building_footprints import get_building_footprints
from geolocation.addressing import get_slope_of_property
from rest_framework.response import Response


import requests
from rest_framework import status


class SeisimicInfo(APIView):
    def get(self, request, address_slug, username):
        api_name = "SEISMIC"
        address = address_slug.replace("+", " ")
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")
        data = get_seisimic_zone_ca_info(address)
        b = UserHistory(user=user, api_name=api_name, address=address)
        b.save()
        return Response(data)


class HillsideInfo(APIView):
    def get(self, request, address_slug, username):
        api_name = "HILLSIDE"
        address = address_slug.replace("+", " ")
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")
        data = get_slope_of_property(address)
        b = UserHistory(user=user, api_name=api_name, address=address)
        b.save()
        return Response(data)


class MapboxBuildingFootprints(APIView):
    def get(self, request, address_slug, username):
        address = address_slug.replace("+", " ")
        api_name = "BF_MAPBOX"
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/get_mapbox_building_footprints",
            params={"address": address},
        )
        if r.status_code == 200:
            b = UserHistory(user=user, api_name=api_name, address=address)
            b.save()
            return Response(r.json())
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class FloodPlainInfo(APIView):
    def get(self, request, address_slug, username):
        api_name = "FLOOD"
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")
        address = address_slug.replace("+", " ")
        data = get_floodplains_ca(address)
        b = UserHistory(user=user, api_name=api_name, address=address)
        b.save()
        return Response(data)


class FemaFloodZonesInfo(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        data = get_fema_flood_zones_national(address)
        return Response(data)


class FireHazardInfo(APIView):
    def get(self, request, address_slug, username):
        api_name = "FIRE"
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")
        address = address_slug.replace("+", " ")
        data = get_fire_hazard_zones_ca(address)
        b = UserHistory(user=user, api_name=api_name, address=address)
        b.save()
        return Response(data)
