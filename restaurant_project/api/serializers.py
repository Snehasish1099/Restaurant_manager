from rest_framework import serializers
from .models import Restaurant, MenuItem, Order, Review
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth import get_user_model

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

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)