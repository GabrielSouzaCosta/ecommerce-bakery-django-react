from .models import Product
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProductSerializer

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
