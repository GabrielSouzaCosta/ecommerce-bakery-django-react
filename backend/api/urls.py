from django.urls import include, path
from rest_framework import routers
from .views import ProductsListView, BreadsListView, SweetsListView, CoffeesListView

urlpatterns = [
    path('products', ProductsListView.as_view()),
    path('breads', BreadsListView.as_view()),
    path('sweets', SweetsListView.as_view()),
    path('coffees', CoffeesListView.as_view())
]
