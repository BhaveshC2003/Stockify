from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .scraper import scrap,get_data
from bs4 import BeautifulSoup

class StockSearch(APIView):
    permission_classes = (permissions.AllowAny,)  
    def get(self, request):
        data = request.GET.get('ticker')
        ticker, exchange = data.split(":")
        search_details = get_data(ticker=ticker,exchange=exchange)
        soup = BeautifulSoup(search_details.text, 'html.parser')
        scraped_data = scrap(soup)
        return Response({"success":True,"data":scraped_data})

