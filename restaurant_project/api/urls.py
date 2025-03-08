from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuView, OrderView, RestaurantView, RegisterView, LoginView, UserProfileListView, UserDetailView, ReviewView

router = DefaultRouter()
router.register(r'menu', MenuView)
router.register(r'restaurants', RestaurantView)
router.register(r'orders', OrderView)
router.register(r'reviews', ReviewView)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserProfileListView.as_view(), name='registered_users'),
    path('users/<int:id>/', UserDetailView.as_view(), name='user-detail'),
]