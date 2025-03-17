from django.contrib import admin
from .models import MenuItem, Order, Restaurant, Profile, Review, OrderItem

# Register your models here.
admin.site.register(Profile)
admin.site.register(MenuItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Restaurant)
admin.site.register(Review)
