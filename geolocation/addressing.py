import requests
import math
from geopy import distance


API_KEY = "AIzaSyBZHQ97g5aU8A9tRKNYqcIQNx4FP4TpT0A"


def geocode_address(address):
    address = address.replace(" ", "+")
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}"
    r = requests.get(url)
    return r.json()


def get_lat_lng_from_address(address):
    geocoded_results = geocode_address(address)
    coords = geocoded_results["results"][0]["geometry"]["location"]
    return coords


def get_elevation_at_lat_lng(lat, lng):
    url = f"https://maps.googleapis.com/maps/api/elevation/json?locations={lat}%2C{lng}&key={API_KEY}"
    r = requests.get(url)
    return r.json()


def get_slope_of_property(address):
    geocoded_results = geocode_address(address)
    if "bounds" in geocoded_results["results"][0]["geometry"]:
        bounds = geocoded_results["results"][0]["geometry"]["bounds"]
    else:
        bounds = geocoded_results["results"][0]["geometry"]["viewport"]
    northeast = bounds["northeast"]
    southwest = bounds["southwest"]
    northeast_elevation = get_elevation_at_lat_lng(northeast["lat"], northeast["lng"])[
        "results"
    ][0]["elevation"]
    southwest_elevation = get_elevation_at_lat_lng(southwest["lat"], southwest["lng"])[
        "results"
    ][0]["elevation"]
    northeast_coord = (northeast["lat"], northeast["lng"])
    southwest_coord = (southwest["lat"], southwest["lng"])
    horizontal_length = distance.distance(northeast_coord, southwest_coord).m
    vertical_length = abs(northeast_elevation - southwest_elevation)
    angle_in_radians = math.atan(vertical_length / horizontal_length)
    angle_degrees = math.degrees(angle_in_radians)
    return angle_degrees


# def convert_lat_lng_spatial_reference(lat, lng, input_ref, output_ref):
#     inProj = Proj("epsg:" + str(input_ref))
#     outProj = Proj("epsg:" + str(output_ref))
#     lng, lat = transform(inProj, outProj, lng, lat)
#     return {"lat": lat, "lng": lng}
