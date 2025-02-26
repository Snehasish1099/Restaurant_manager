from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Customer, MenuItem, Order, Restaurant
from .serializers import CustomerSerializer, MenuItemSerializer, OrderSerializer, RestaurantSerializer, UserSerializer

from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status

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
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

# User Logout - Delete Token
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.auth.delete()  # Deletes the user's token
    return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)


# Create your views here.
class CustomerView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    
class MenuView(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticated]
    
class RestaurantView(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]
    
class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
