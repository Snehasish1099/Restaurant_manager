from django.contrib import admin
from .models import Customer, MenuItem, Order, Restaurant

# Register your models here.
admin.site.register(Customer)
admin.site.register(MenuItem)
admin.site.register(Order)
admin.site.register(Restaurant)
