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
from django.contrib.auth.models import User

# from accounts.models import UserHistory


class ParcelInfo(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/parcel_info",
            params={"address": address},
        )
        if r.status_code == 200:
            return JsonResponse(r.json())
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class BasicInfo(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/parcel_info",
            params={"address": address},
        )
        data = {}
        if r.status_code == 200:
            all_data = r.json()
            data["neighborhood"] = all_data["neighborhoods"]
            data["area_sqft"] = all_data["gathered_sqft"]
            data["sold_price"] = all_data["gathered_sold_price"]
            data["year_built"] = all_data["gathered_year_built"]
            data["property_type"] = all_data["gathered_property_type"]
            data["estimated_value"] = all_data["gathered_estimated_value"]
            data["last_sold_date"] = all_data["gathered_sold_date"]
            data["beds"] = all_data["gathered_beds"]
            data["baths"] = all_data["gathered_baths"]
            data["floor_area_ratio"] = all_data["floor_area_ratio"]
            data["distance_from_coast"] = all_data["distance_from_coast_miles"]
            data["owner"] = all_data["owner"]
            data["assessor_id"] = all_data["parcel_id"]
            data["school_district"] = all_data["school_district"]
            data["latitude"] = all_data["latitude"]
            data["longitude"] = all_data["longitude"]
            return JsonResponse(data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class ZoningInfo(APIView):
    def get(self, request, address_slug, username):
        api_name = "ZONING_OLD"
        address = address_slug.replace("+", " ")
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/parcel_info",
            params={"address": address},
        )

        b = UserHistory(user=user, api_name=api_name, address=address)
        b.save()

        if r.status_code == 200:
            all_data = r.json()["zoning_details"]
            return JsonResponse(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class ParcelPolygon(APIView):
    def get(self, request, address_slug, username):
        address = address_slug.replace("+", " ")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/parcel_info",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = json.loads(r.json()["polygon_details"]["st_asgeojson"])
            return JsonResponse(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class BackyardPolygon(APIView):
    def get(self, request, address_slug, username):
        address = address_slug.replace("+", " ")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/get_backyard_polygon",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = r.json()
            return JsonResponse(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class HazardAnalysis(APIView):
    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.get(
            "https://protected-peak-85531.herokuapp.com/get_all_hazard_info",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = r.json()
            return JsonResponse(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class FrontStreet(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/get_front_street",
            params={"address": address},
        )
        data = {}
        if r.status_code == 200:
            all_data = r.json()
            data["name"] = all_data["name"]
            data["geometry"] = json.loads(all_data["geom"])
            return JsonResponse(data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class IsAtCulDeSac(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.get(
            "https://protected-peak-85531.herokuapp.com/is_at_cul_de_sac",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = r.json()
            # print(all_data)
            return Response(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class BackStreetOrAlleyPresent(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.get(
            "https://protected-peak-85531.herokuapp.com/back_road_or_alley_present",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = r.json()
            return Response(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class IsCornerLot(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.get(
            "https://protected-peak-85531.herokuapp.com/is_corner_lot",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = r.json()
            return Response(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class IsReversedCornerLot(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):
        address = address_slug.replace("+", " ")
        r = requests.get(
            "https://protected-peak-85531.herokuapp.com/is_reversed_corner_lot",
            params={"address": address},
        )
        if r.status_code == 200:
            all_data = r.json()
            return Response(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class ParcelSides(APIView):
    def get(self, request, address_slug, username):
        # address = address_slug.replace("+", " ")

        api_name = "PARCEL_SIDES"
        address = address_slug.replace("+", " ")
        try:
            user = User.objects.get(username=username)
        except:
            return Response("User does not exist")

        r = requests.post(
            "https://protected-peak-85531.herokuapp.com/get_all_color_coded_sides",
            params={"address": address},
        )

        if r.status_code == 200:
            b = UserHistory(user=user, api_name=api_name, address=address)
            b.save()
            all_data = r.json()
            return Response(all_data)
        else:
            content = {"message": "Please use a correct California address"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
