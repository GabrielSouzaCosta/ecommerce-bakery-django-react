<<<<<<< HEAD
from django.conf import settings
from django.http import Http404
from django.shortcuts import render

from rest_framework import viewsets, permissions, authentication, status
=======
from unicodedata import category
from .models import Product
from rest_framework import viewsets, permissions
>>>>>>> dc58e33ca5d942e651929c64ae3263c4f9e3e295
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Product, Order, OrderItem, User
from .serializers import ProductSerializer, OrderSerializer

import stripe

class UserActivationView(APIView):
    def get (self, request, uid, token):
        protocol = 'https://' if request.is_secure() else 'http://'
        web_url = protocol + request.get_host()
        post_url = web_url + "/auth/users/activate/"
        post_data = {'uid': uid, 'token': token}
        result = requests.post(post_url, data = post_data)
        content = result.text()
        return Response(content)

class ProductsListView(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:19]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class SweetsListView(APIView):
    def get(self, request, format=None):
        sweets = Product.objects.filter(category=1)
        serializer = ProductSerializer(sweets, many=True)
        return Response(serializer.data)

class BreadsListView(APIView):
    def get(self, request, format=None):
        breads = Product.objects.filter(category=2)
        serializer = ProductSerializer(breads, many=True)
        return Response(serializer.data)

class CoffeesListView(APIView):
    def get(self, request, format=None):
        coffees = Product.objects.filter(category=3)
        serializer = ProductSerializer(coffees, many=True)
        return Response(serializer.data)
<<<<<<< HEAD

@api_view
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        stripe.api_key = settings.STRIPE_SECRET_KEY
        paid_amount = sum(item.get('quantity') * item.get('product').price for item in serializer.validated_data['items'])

        try:
            charge = stripe.Charge.create(
                amount=int(paid_amount * 100),
                currency='BRL',
                description="Charge from Bakey Heaven",
                source=serializer.validated_data['stripe_token']
            )

            serializer.save(user=request.user, paid_amount=paid_amount)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
=======
>>>>>>> dc58e33ca5d942e651929c64ae3263c4f9e3e295
