from django.contrib.auth.models import User, Group
from .models import Product
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, GroupSerializer, ProductSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProductsListView(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:19]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
