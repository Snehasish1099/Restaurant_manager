from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from .models import Customer, MenuItem, Order, Restaurant
from .serializers import (
    CustomerSerializer, MenuItemSerializer, OrderSerializer, 
    RestaurantSerializer, UserSerializer
)


class StandardResponseMixin:
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {
                    "status": status.HTTP_404_NOT_FOUND,
                    "error": True,
                    "data": [],
                    "message": "No records found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "error": False,
                "data": serializer.data,
                "message": "Data retrieved successfully."
            },
            status=status.HTTP_200_OK
        )


# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


# User Login (Token-Based)
class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = self.get_serializer().validate(request.data)['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


# User Logout - Delete Token
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.auth.delete()  # Deletes the user's token
    return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)


# Viewsets
class CustomerView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


class MenuView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]


class RestaurantView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]


class OrderView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
