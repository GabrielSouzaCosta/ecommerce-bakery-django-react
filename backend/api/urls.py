from django.urls import include, path
from rest_framework import routers
<<<<<<< HEAD
from .views import ProductsListView, BreadsListView, SweetsListView, CoffeesListView, checkout
=======
from .views import ProductsListView, BreadsListView, SweetsListView, CoffeesListView
>>>>>>> dc58e33ca5d942e651929c64ae3263c4f9e3e295

urlpatterns = [
    path('products', ProductsListView.as_view()),
    path('breads', BreadsListView.as_view()),
    path('sweets', SweetsListView.as_view()),
<<<<<<< HEAD
    path('coffees', CoffeesListView.as_view()),
    path('checkout/', checkout)
=======
    path('coffees', CoffeesListView.as_view())
>>>>>>> dc58e33ca5d942e651929c64ae3263c4f9e3e295
]
