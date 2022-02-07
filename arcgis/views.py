from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from django.http import JsonResponse
import pymongo 



def service_mapper(request):
   text = """<h1>welcome to my app !</h1>"""
   return HttpResponse(text)

# def service_mapper(request, number):
#    text = "<h1>welcome to my app number %s!</h1>"% number
#    return HttpResponse(text)

# def service_mapper(request):
#    return render(request, "service_mapper.html")

class GisInfo(APIView):
    def get(self, request):
        client = pymongo.MongoClient("""mongodb://apoorv:M0ngoParce1n1@cluster0-shard-00-00.mpmef.mongodb.net:27017,
                cluster0-shard-00-01.mpmef.mongodb.net:27017,
              cluster0-shard-00-02.mpmef.mongodb.net:27017/myDB?ssl=true&replicaSet=atlas-7nzlgf-shard-0&authSource=admin&retryWrites=true&w=majority""")
        db_arcgis = client.arcgisLibrary
        r = {'message': 'Please use a correct California address'}
        result=db_arcgis.directories.insert_one(r)
        return JsonResponse(r)