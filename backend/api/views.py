from django.conf import settings
from django.http import Http404
from django.shortcuts import render

from rest_framework import viewsets, permissions, authentication, status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Product, Order, OrderItem, User
from .serializers import MyOrderSerializer, ProductSerializer, OrderSerializer

import stripe

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


@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    serializer = OrderSerializer(data=request.data)
    print(request.user)

    if serializer.is_valid():
        stripe.api_key = settings.STRIPE_SECRET_KEY
        paid_amount = sum(item.get('quantity') * item.get('product').price for item in serializer.validated_data['items'])

        payment_method_id = serializer.validated_data['payment_method_id']
        customer_data = stripe.Customer.list(email=serializer.validated_data['email']).data 
        

        if len(customer_data) == 0:
            customer = stripe.Customer.create(
                email=serializer.validated_data['email'], 
                payment_method=payment_method_id
                )
        else:
            customer = customer_data[0]
            extra_msg = "Customer already existed."

        stripe.PaymentIntent.create(
            customer=customer, 
            payment_method=payment_method_id,  
            currency='BRL',
            amount=int(paid_amount * 100),
            confirm=True)  

        serializer.save(user=request.user, paid_amount=paid_amount)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrdersList(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format='json'):
        orders = Order.objects.filter(user=request.user)
        serializer = MyOrderSerializer(orders, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def test_payment(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln', 
    payment_method_types=['card'],
    receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)