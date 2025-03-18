from rest_framework import serializers
from .models import Restaurant, MenuItem, Order, Review, OrderItem
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth import get_user_model
from django.db.models import Avg

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(source="profile.phone_number", required=True)
    address = serializers.CharField(source="profile.address", required=True)
    username = serializers.CharField()  # Override default to allow any characters

    class Meta:
        model = User
        fields = ['id', 'username', 'phone_number', 'address', 'password']
        
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Make fields optional during update
        if self.instance:
            self.fields['password'].required = False  # Password is only required on create
            self.fields['phone_number'].required = False
            self.fields['address'].required = False


    def create(self, validated_data):
        profile_data = validated_data.pop('profile')  # Extract profile fields
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)  # Create profile
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.username = validated_data.get('username', instance.username)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()

        # Update profile fields
        profile = instance.profile
        profile.phone_number = profile_data.get('phone_number', profile.phone_number)
        profile.address = profile_data.get('address', profile.address)
        profile.save()

        return instance


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'
        
class RestaurantSerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)
    class Meta:
        model = Restaurant
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    
    item_id = serializers.IntegerField(write_only=True)
    item_name = serializers.CharField(source='menu_item.name', read_only=True)
    item_price = serializers.DecimalField(source='menu_item.price', max_digits=10, decimal_places=2, read_only=True)
    quantity = serializers.IntegerField()
    
    class Meta:
        model = OrderItem
        fields = '__all__'
        extra_kwargs = {
            'menu_item': {'required': False},  # Ignore direct validation
            'order': {'required': False}  # Ignore direct validation
        }

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    delivery_address = serializers.CharField()
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
        
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        customer_id = validated_data.pop('customer')
        delivery_address = validated_data.pop('delivery_address')

        # Get or create user based on customer name
        customer = User.objects.get(id=customer_id)
        profile, _ = Profile.objects.get_or_create(user=customer, defaults={'address': delivery_address})
        
        order = Order.objects.create(
            customer=customer,
            delivery_address=delivery_address,
            total_price=0
        )

        total_price = 0
        for item_data in items_data:
            item_id = item_data['item_id']
            quantity = item_data['quantity']
            
            # Fetch item details from MenuItem
            try:
                menu_item = MenuItem.objects.get(id=item_id)
            except MenuItem.DoesNotExist:
                raise serializers.ValidationError(f"Menu item with id {item_id} does not exist.")

            total_price += menu_item.price * quantity
            OrderItem.objects.create(order=order, menu_item=menu_item, quantity=quantity)

        order.total_price = total_price
        order.save()
        return order

        
class ReviewSerializer(serializers.ModelSerializer):
    avg_menu_rating = serializers.SerializerMethodField()
    avg_restaurant_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = '__all__'
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = ProfileSerializer(instance.user).data
        if instance.restaurant:
            data['restaurant'] = RestaurantSerializer(instance.restaurant).data
        if instance.menu_item:
            data['menu_item'] = MenuItemSerializer(instance.menu_item).data
        return data
    
    def get_avg_menu_rating(self, obj):
        if obj.menu_item:
            avg = Review.objects.filter(menu_item=obj.menu_item).aggregate(Avg('rating'))
            return avg['rating__avg']
        return None
    
    def get_avg_restaurant_rating(self, obj):
        if obj.restaurant:
            avg = Review.objects.filter(restaurant=obj.restaurant).aggregate(Avg('rating'))
            return avg['rating__avg']
        return None