from django.contrib import admin
from .models import Profile, MenuItem, Order, OrderItem, Restaurant, Review

# admin.site.register(Restaurant)
# admin.site.register(Review)
# admin.site.register(Profile)
# admin.site.register(MenuItem)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'address')
    search_fields = ('user__username', 'address')
    list_filter = ('address',)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'restaurant')
    search_fields = ('name', 'restaurant__name')
    list_filter = ('restaurant',)
    ordering = ('price',)

class OrderItemInline(admin.TabularInline):  # or admin.StackedInline
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'total_price', 'created_at')
    search_fields = ('customer__username',)
    list_filter = ('created_at',)
    inlines = [OrderItemInline]  # Show Order Items within Order
    ordering = ('-created_at',)

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'address')
    search_fields = ('name',)
    list_filter = ('address',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant', 'rating', 'created_at')
    search_fields = ('user__username', 'restaurant__name')
    list_filter = ('rating', 'created_at')
    ordering = ('-created_at',)
