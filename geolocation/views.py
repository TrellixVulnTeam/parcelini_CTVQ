from django.shortcuts import render
from rest_framework.views import APIView
from geolocation.hazards import get_seisimic_zone_ca_info
from geolocation.hazards import get_fire_hazard_zones_ca
from geolocation.hazards import get_fema_flood_zones_national
from geolocation.hazards import get_floodplains_ca

# from geolocation.building_footprints import get_building_footprints
from geolocation.addressing import get_slope_of_property
from rest_framework.response import Response


import requests
from rest_framework import status


class SeisimicInfo(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        data = get_seisimic_zone_ca_info(address)
        return Response(data)


class HillsideInfo(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        data = get_slope_of_property(address)
        return Response(data)


class MapboxBuildingFootprints(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/get_mapbox_building_footprints",
            params={"address": address},
        )
        if r.status_code == 200:
            return Response(r.json())
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class FloodPlainInfo(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        data = get_floodplains_ca(address)
        return Response(data)


class FemaFloodZonesInfo(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        data = get_fema_flood_zones_national(address)
        return Response(data)


class FireHazardInfo(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        data = get_fire_hazard_zones_ca(address)
        return Response(data)
