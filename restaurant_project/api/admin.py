from django.contrib import admin
from .models import Profile, MenuItem, Order, OrderItem, Restaurant, Review

admin.site.register(Restaurant)
admin.site.register(Review)
admin.site.register(Profile)
admin.site.register(MenuItem)

class OrderItemInline(admin.TabularInline):  # or admin.StackedInline
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'total_price', 'created_at')
    search_fields = ('customer__username',)
    inlines = [OrderItemInline]  # Show Order Items within Order
