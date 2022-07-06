from django.urls import include, path
from rest_framework import routers
from .views import UserViewSet, GroupViewSet, ProductsListView

urlpatterns = [
    path('products', ProductsListView.as_view()),
]
