from django.urls import include, path
from rest_framework import routers
from .views import ProductsListView

urlpatterns = [
    path('products', ProductsListView.as_view()),
]
