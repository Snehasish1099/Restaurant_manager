from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username + ' Profile'

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    restaurant = models.ForeignKey(Restaurant, related_name='menu_items', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Order(models.Model):
    customer = models.ForeignKey(Customer, related_name='orders', on_delete=models.CASCADE)
    items = models.ManyToManyField(MenuItem, related_name='orders')
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.pk} by {self.customer.name}"