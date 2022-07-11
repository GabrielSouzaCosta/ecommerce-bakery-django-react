from django.urls import include, path
from rest_framework import routers
from .views import ProductsListView, BreadsListView, SweetsListView, CoffeesListView, checkout, test_payment

urlpatterns = [
    path('products', ProductsListView.as_view()),
    path('breads', BreadsListView.as_view()),
    path('sweets', SweetsListView.as_view()),
    path('coffees', CoffeesListView.as_view()),
    path('checkout/', checkout),
    path('test-payment/', test_payment),
]
