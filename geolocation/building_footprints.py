# import numpy as np
# from skimage.filters import threshold_otsu
# from skimage.io import imread, imshow
# from urllib import request
# from PIL import Image
# from skimage.filters import threshold_otsu
# from skimage.color import rgb2gray
# from shapely.geometry import shape
# import rasterio
# from rasterio import features
# import math
# import requests
# import json
# import os

# from geolocation.addressing import get_lat_lng_from_address
# from geolocation.parcel_info import get_parcel_info_ca_1

# # def get_lat_lng(address):
# # 	data_address = "https://protected-peak-85531.herokuapp.com/parcel_info"
# # 	params = {"address": address}
# # 	response = requests.post(data_address, data = params)
# # 	data = json.loads(response.text)
# # 	lat = data['latitude']
# # 	lng = data['longitude']
# # 	return float(lat),float(lng)


# # w = 500
# # h = 500
# # zoom = 19
# # lat = 36.6124960404037
# # lng = -121.832966616279


# def getPointLatLng(x, y, w, h, zoom, lat, lng):
#     parallelMultiplier = math.cos(lat * math.pi / 180)
#     degreesPerPixelX = 360 / math.pow(2, zoom + 8 + 1)
#     degreesPerPixelY = 360 / math.pow(2, zoom + 8 + 1) * parallelMultiplier
#     pointLat = lat - degreesPerPixelY * (y - h / 2)
#     pointLng = lng + degreesPerPixelX * (x - w / 2)
#     return (pointLat, pointLng)


# def get_polygons(lat, lng, zoom):
#     # MAPBOX_TOKEN = os.environ["MAPBOX_KEY"]
#     MAPBOX_TOKEN = "pk.eyJ1IjoiZGVmaW5lYXBvb3J2IiwiYSI6ImNqajJxa3hydTEyaDEza21oNTcxa3EycWgifQ.KAftKrevQpQzJia3xMKmTg"
#     link = (
#         "https://api.mapbox.com/styles/v1/defineapoorv/ck8ydrsux03mf1io57t6ap4zs/static/"
#         + str(lng)
#         + ","
#         + str(lat)
#         + ","
#         + str(zoom)
#         + "/800x800?access_token="
#         + MAPBOX_TOKEN
#     )
#     print(link)
#     print("!!" * 10)
#     request.urlretrieve(link, "map.png")
#     im = Image.open("map.png")
#     im_rgba = im.convert("RGBA")
#     background = Image.new("RGB", im_rgba.size, (255, 255, 255))
#     background.paste(im_rgba, mask=im_rgba.split()[3])  # 3 is the alpha channel
#     w, h = background.size
#     cropped = background.crop((50, 50, w - 50, h - 50))
#     cropped.save("foo.jpg", "JPEG", quality=100)
#     image = imread("foo.jpg")
#     image_gray = rgb2gray(image)
#     thresh = threshold_otsu(image_gray)
#     binary = image_gray > thresh
#     binary_int = binary.astype("int16")
#     polygons = list(rasterio.features.shapes(binary_int))
#     all_polygons = []
#     for polygon in polygons:
#         feature_geojson = {}
#         feature_geojson["type"] = "Feature"
#         coordinates = []
#         for x, y in polygon[0]["coordinates"][0]:
#             lati, longi = getPointLatLng(x, y, 700, 700, zoom, lat, lng)
#             coordinates.append([longi, lati])
#         polygon_geojson = {}
#         polygon_geojson["type"] = "Polygon"
#         polygon_geojson["coordinates"] = [coordinates]
#         feature_geojson["geometry"] = polygon_geojson
#         all_polygons.append(feature_geojson)
#     return all_polygons


# def get_building_footprints(address):
#     # lat,lng = get_lat_lng(address)
#     coords = get_lat_lng_from_address(address)
#     polygons = get_polygons(coords["lat"], coords["lng"], 19)
#     return polygons


# def find_interesection(address):
#     parcel_polygon = get_parcel_info_ca_1(address)
#     try:
#         footprints = get_building_footprints(address)
#     except:
#         footprints = []
#     intersecting_footprints = []
#     parcel_polygon_s = shape(parcel_polygon["features"][0]["geometry"])

#     for footprint in footprints:
#         footprint_polygon_s = shape(footprint["geometry"])
#         if parcel_polygon_s.intersects(footprint_polygon_s):
#             print("intersection")
#             print(
#                 parcel_polygon_s.intersection(footprint_polygon_s).area
#                 / footprint_polygon_s.area
#             )
#             if (
#                 parcel_polygon_s.intersection(footprint_polygon_s).area
#                 / footprint_polygon_s.area
#                 > 0.5
#             ):
#                 print("area greater")
#                 intersecting_footprints.append(footprint)

#     return footprint

#     # for footprint in footprints:

#     #   result = @connection.exec_query(query)
#     #   # puts result.first["st_intersects"]
#     #   # puts result.first["st_within"]
#     #   # puts result.first["intersection_area"]
#     #   # puts result.first["building_footprint_area"]
#     #   # puts "*"*1000
#     #   if result.first["st_intersects"] and not result.first["st_within"] and result.first["intersection_area"]/result.first["building_footprint_area"] > 0.5
#     #     intersecting_footprints << footprint
#     #   end
