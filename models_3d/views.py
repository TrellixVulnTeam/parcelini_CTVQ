from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
import json
from django.core.serializers import serialize
import requests
from accounts.permissions import HasUserAPIKey
from rest_framework import status
import pandas as pd
import ast
import time

url_prod = 'http://docke-loadb-xtssv7ml5qiq-424f3041ccea48d9.elb.us-east-1.amazonaws.com:5001'
url_local = 'http://localhost:5001'


def models(request):
    return render(request, "models.html")


def view_model(request, gisparcel_id):
    return render(request, 'view_model.html', {'gisparcel_id': gisparcel_id})


class Fetch_3d_Info(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, address_slug):

        url = url_prod + '/fetch_point_cloud/' + address_slug
        print(url)
        r = requests.get(url)
        if r.status_code == 200:
            print(r.text)
            return Response(r.text.strip())
        else:
            content = {'message': 'Please use a correct California address'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class Check_3d_Status(APIView):
    permission_classes = [HasUserAPIKey]

    def get(self, request, task_id):
        url = url_prod + '/check/' + task_id
        r = requests.get(url)
        if r.status_code == 200:
            return Response(r.text.strip())
        else:
            content = {'message': 'Something wrong with task id'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)


class Fetch_Model_Data(APIView):
    # permission_classes = [HasUserAPIKey]

    def get(self, request, gisparcel_id):
        url = url_prod + '/fetch_model_data/' + str(gisparcel_id)

        def call_api():
            r = requests.get(url)
            print(r.json())
            print(r.text)
            print(r.status_code)
            if r.json() == 'PENDING':
                time.sleep(5)
                call_api()
            else:
                return ast.literal_eval(r.json())

        try:
            data = call_api()
            print(data)
            df = pd.DataFrame(data)
            df['tree_potential'] = (df['HeightAboveGround'] > 2) & (
                df['Eigenvalue0'] > 0.001) & (df['Coplanar'] == 0) & (
                    df['NumberOfReturns'] - df['ReturnNumber'] >= 1) & (
                        df['Curvature'] > 0.001) & (df['Classification'] != 2)
            df['ground'] = (df['Classification'] == 2)
            df['other'] = ~df['ground'] & ~df['tree_potential']
            df['R'] = 0
            df['G'] = 0
            df['B'] = 0
            df.loc[df['tree_potential'], 'R'] = 40
            df.loc[df['tree_potential'], 'G'] = 184
            df.loc[df['tree_potential'], 'B'] = 79
            df.loc[df['ground'], 'R'] = 106
            df.loc[df['ground'], 'G'] = 109
            df.loc[df['ground'], 'B'] = 115
            df.loc[df['other'], 'R'] = 219
            df.loc[df['other'], 'G'] = 18
            df.loc[df['other'], 'B'] = 38
            spheres = df[['X', 'Y', 'Z', 'R', 'G', 'B']].to_numpy().tolist()
            # print(df)
            return Response(spheres)
        except:
            content = {'message': 'Error in Loading 3D data'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)