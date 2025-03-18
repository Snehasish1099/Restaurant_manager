import django_filters
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, status, serializers, filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .models import MenuItem, Order, Restaurant, Review
from .serializers import (
    MenuItemSerializer, OrderSerializer, 
    RestaurantSerializer, ProfileSerializer, ReviewSerializer
)
from .filters import MenuItemFilter, RestaurantFilter

class StandardResponseMixin:
    def format_response(self, data, message="Success", status_code=status.HTTP_200_OK, error=False):
        return Response(
            {
                "status": status_code,
                "error": error,
                "data": data,
                "message": message
            },
            status=status_code
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return self.format_response([], "No data found.", status.HTTP_404_NOT_FOUND, error=True)
        
        serializer = self.get_serializer(queryset, many=True)
        return self.format_response(serializer.data, "Data available.")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return self.format_response(serializer.data, "Data available.")
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return self.format_response(response.data, "Data created successfully.", status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return self.format_response(response.data, "Data updated successfully.", response.status_code)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return self.format_response(None, "Data deleted successfully.", status.HTTP_204_NO_CONTENT)

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
        return Response({"token": token.key, 'status': status.HTTP_200_OK, "userId": user.id}, status=status.HTTP_200_OK)


# User Logout - Delete Token
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        request.auth.delete()  # Deletes the token
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response({"error": "Invalid token or already logged out"}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileListView(StandardResponseMixin, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    
class UserDetailView(StandardResponseMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


# Viewsets
class MenuView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_class = MenuItemFilter
    
    search_fields = ['name', 'description']  
    ordering_fields = ['name', 'price']  
    ordering = ['name']
    
    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [AllowAny()]  
        return [IsAuthenticated()] 


class RestaurantView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    
    filterset_class = RestaurantFilter
    search_fields = ['name', 'address']
    
    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [AllowAny()]  
        return [IsAuthenticated()] 

class OrderView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user.id)
    

class ReviewView(StandardResponseMixin, viewsets.ModelViewSet):
    queryset = Review.objects.all().select_related('user', 'restaurant', 'menu_item')
    serializer_class = ReviewSerializer
    
    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [AllowAny()]  
        return [IsAuthenticated()] 

    def perform_create(self, serializer):
        if self.request.user and self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            raise serializers.ValidationError("User is not authenticated.")