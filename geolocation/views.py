from django.shortcuts import render
from rest_framework.views import APIView
from geolocation.hazards import get_seisimic_zone_ca_info
from geolocation.hazards import get_fire_hazard_zones_ca
from geolocation.hazards import get_fema_flood_zones_national
from geolocation.hazards import get_floodplains_ca
from geolocation.building_footprints import get_building_footprints
from geolocation.addressing import get_slope_of_property
from rest_framework.response import Response


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
        data = get_building_footprints(address)
        return Response(data)


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
