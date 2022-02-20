from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from django.http import JsonResponse
import pymongo 
# from .models import Explore

def test(request):
   text = """<h1>Testing done, everything is okay !</h1>"""
   return HttpResponse(text)

def explore(request):
    return render(request, 'explore_all.html')

def get_data(request):
    # text = """<h1>Explore the data here !</h1>"""
    # return HttpResponse(text)
    client = pymongo.MongoClient("""mongodb://apoorv:M0ngoParce1n1@cluster0-shard-00-00.mpmef.mongodb.net:27017,
                cluster0-shard-00-01.mpmef.mongodb.net:27017,
              cluster0-shard-00-02.mpmef.mongodb.net:27017/myDB?ssl=true&replicaSet=atlas-7nzlgf-shard-0&authSource=admin&retryWrites=true&w=majority""")
    db = client.myDB
    result=db.counties.find()
    return render(request, 'get_data.html', {"data_list":result})

# class DataExplore(APIView):
#     def get(self, request):
#         # text = """<h1>Explore the data here !</h1>"""
#         # return HttpResponse(text)
#         client = pymongo.MongoClient("""mongodb://apoorv:M0ngoParce1n1@cluster0-shard-00-00.mpmef.mongodb.net:27017,
#                 cluster0-shard-00-01.mpmef.mongodb.net:27017,
#               cluster0-shard-00-02.mpmef.mongodb.net:27017/myDB?ssl=true&replicaSet=atlas-7nzlgf-shard-0&authSource=admin&retryWrites=true&w=majority""")
#         db = client.myDB
#         result=db.counties.find()
#         for x in result:
#             print(x)
#         return JsonResponse(result)
