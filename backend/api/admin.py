from django.contrib import admin
from .models import Product, Category, User, Order, OrderItem

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(User)
admin.site.register(OrderItem)
admin.site.register(Order)