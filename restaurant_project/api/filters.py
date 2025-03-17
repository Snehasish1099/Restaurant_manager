import django_filters
from .models import Restaurant, MenuItem

print(django_filters.__version__, "# django_filter version")

class MenuItemFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains', field_name='name')
    description = django_filters.CharFilter(lookup_expr='icontains', field_name='description')
    max_price = django_filters.NumberFilter(lookup_expr='gte', field_name='price')
    min_price = django_filters.NumberFilter(lookup_expr='lte', field_name='price')

    class Meta:
        model = MenuItem
        fields = ['name', 'description', 'price']
        

class RestaurantFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains', field_name='name')
    address = django_filters.CharFilter(lookup_expr='icontains', field_name='address')
    
    class Meta:
        model = Restaurant
        fields = ['name', 'address']