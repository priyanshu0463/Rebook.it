from django.urls import path,include
from django.contrib import admin
from . import views


urlpatterns=[
    path("delete/<str:title>",views.deleteRecord,name='deleterecord'),
    path("",views.fetch_book,name='fetch_book'),
    path("data/",views.getData,name='showdata'),
]