from django.views import generic
from .models import Post
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView

# def test1(request):
#    text = """<h1>Testing done, everything is okay at blog !</h1>"""
#    return HttpResponse(text)  

class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by('-created_on')
    template_name = 'post_list.html'


class PostDetail(generic.DetailView):
    model = Post
    template_name = 'post_detail.html'