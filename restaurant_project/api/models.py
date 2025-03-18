from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    def get_orders(self):
        return self.orders.all()

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    def get_menu(self):
        return self.menu_items.all()
    
    def average_rating(self):
        reviews = self.reviews.all()
        return round(sum(review.rating for review in reviews) / reviews.count(), 1) if reviews.exists() else 0.0


class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    restaurant = models.ForeignKey(Restaurant, related_name='menu_items', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    def average_rating(self):
        reviews = self.reviews.all()
        return round(sum(review.rating for review in reviews) / reviews.count(), 1) if reviews.exists() else 0.0

class Order(models.Model):
    customer = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    delivery_address = models.TextField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.pk} by {self.customer.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.menu_item} x {self.quantity}"
    
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    restaurant = models.ForeignKey(Restaurant, related_name='reviews', on_delete=models.CASCADE, null=True, blank=True)
    menu_item = models.ForeignKey(MenuItem, related_name='reviews', on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    review_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.review_text} - {self.user.username}"