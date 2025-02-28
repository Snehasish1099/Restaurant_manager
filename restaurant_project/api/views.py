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
    RestaurantSerializer, ProfileSerializer
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
                    "message": "No data found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "error": False,
                "data": serializer.data,
                "message": "Data available."
            },
            status=status.HTTP_200_OK
        )


# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data["username"])
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"user": response.data, 'status': status.HTTP_201_CREATED, "token": token.key}, status=status.HTTP_201_CREATED)


# User Login (Token-Based)
class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)


# User Logout - Delete Token
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        request.auth.delete()  # Deletes the token
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response({"error": "Invalid token or already logged out"}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = [IsAuthenticated]
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'id'


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
