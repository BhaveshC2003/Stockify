from django.urls import path
from . import views

urlpatterns = [
    path('search', views.StockSearch.as_view(), name='search'),
]