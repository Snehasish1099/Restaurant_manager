from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerView, MenuView, OrderView, RestaurantView, RegisterView, logout_view, LoginView, UserProfileListView, UserDetailView

router = DefaultRouter()
router.register(r'customers', CustomerView)
router.register(r'menu', MenuView)
router.register(r'restaurants', RestaurantView)
router.register(r'orders', OrderView)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', logout_view, name='logout'),
    path('users/', UserProfileListView.as_view(), name='registered_users'),
    path('users/<int:id>/', UserDetailView.as_view(), name='user-detail')
]