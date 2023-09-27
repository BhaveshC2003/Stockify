from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication, BaseAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, WatchlistSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from . import generate_token
from .models import AppUser
import jwt
from stockify import settings
from .models import Watchlist
import requests
# Create your views here.


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)         #Allow anyone to register
    
    #authenticators = [MyAuthenticator()]
    
    def post(self,request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST) 


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self,request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request,user)
            user = AppUser.objects.get(email=data["email"])
            token = generate_token.generate_token({"user_id": user.user_id})
            response = Response({"success":True, "data":serializer.data}, status=status.HTTP_200_OK) 
            response.set_cookie("access_token", token)
            return response 


class UserLogout(APIView):
    # permission_classes = (permissions.AllowAny,)        
    # authentication_classes = ()
    permission_classes = (permissions.IsAuthenticated,) 
    authentication_classes = (SessionAuthentication,)                         
    def post(self,request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        logout(request)
        return response
    

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response({'user':serializer.data} , status=status.HTTP_200_OK)
    
class WatchlistView(APIView):
    permission_classes = (permissions.IsAuthenticated,) 
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        token = request.COOKIES.get("access_token")
        if not token:
            return Response({"success": False, "message": "Please login"}, status=status.HTTP_401_UNAUTHORIZED)
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user = AppUser.objects.get(user_id=decoded_data["user_id"])
        serializer = WatchlistSerializer(data={"user":user, "ticker": data["ticker"]})
        serializer.create(data={"user":user, "ticker": data["ticker"]})
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        ticker = request.GET.get("ticker")
        token = request.COOKIES["access_token"]
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        watchlist = WatchlistSerializer.delete(data={"user":decoded_data["user_id"], "ticker":ticker})
        return Response({"success":True, "message": f"Deleted {ticker}"})
    
    def get(self, request):
        token = request.COOKIES["access_token"]
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        queryset = Watchlist.objects.filter(user=decoded_data["user_id"])
        serializer = WatchlistSerializer(queryset, many=True)
        return Response({"success":True, "data":serializer.data})
        
    # {
    #     "email" : "rajas@gmail.com",
    #     "username" : "rajasbaadkar",
    #     "password" : "rajas123"
    # }


class WatchlistView(APIView):
    permission_classes = (permissions.IsAuthenticated,) 
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        token = request.COOKIES.get("access_token")
        if not token:
            return Response({"success": False, "message": "Please login"}, status=status.HTTP_401_UNAUTHORIZED)
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user = AppUser.objects.get(user_id=decoded_data["user_id"])
        serializer = WatchlistSerializer(data={"user":user, "ticker": data["ticker"]})
        serializer.create(data={"user":user, "ticker": data["ticker"]})
        return Response({"success": True}, status=status.HTTP_201_CREATED)
    
    def delete(self, request):
        ticker = request.GET.get("ticker")
        token = request.COOKIES["access_token"]
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        watchlist = WatchlistSerializer.delete(data={"user":decoded_data["user_id"], "ticker":ticker})
        return Response({"success":True, "message": f"Deleted {ticker}"})
    
    def get(self, request):
        token = request.COOKIES["access_token"]
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        queryset = Watchlist.objects.filter(user=decoded_data["user_id"])
        serializer = WatchlistSerializer(queryset, many=True)
        return Response({"success":True, "data":serializer.data})
        
class NewsView(APIView):
    permission_classes = (permissions.AllowAny,) 
    def get(self, request):
        sessions = requests.Session()
        headers = {
            "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
            "X-RapidAPI-Key": "4adc2061ddmshd49b7c703e14a69p15c9b1jsnfe9ddb7823de"
            }
        params = {
            "query": '["finance","stock market","economy"]',
            "lang": 'en',
            "type": 'video',
            "upload_date": 'month'
        }
        news_response = sessions.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=IJ9GT8ELNE4GDPON")
        videos_response = sessions.get("https://yt-api.p.rapidapi.com/search", headers=headers,params=params)
        return Response({"success":True, "videos":videos_response,"news":news_response})
