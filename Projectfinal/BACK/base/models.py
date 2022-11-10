from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body=models.TextField(null=True)
 
class Pita(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body=models.TextField(null=True)

class Category(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    desc = models.TextField(null=True)

class Product(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    cat_id=models.ForeignKey(Category,on_delete=models.SET_NULL, null=True)
    price = models.SmallIntegerField()
    desc = models.TextField(null=True)
    title=models.CharField(max_length=100, null=True)
    content=models.TextField(null=True)
    image=models.ImageField(upload_to='Posted_Images', null=True)
    def __str__(self):
        return self.title
    
class Order(models.Model):
    # desc=models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
    # price=models.ForeignKey(Product, on_delete=models.CASCADE,null=True)
    _id=models.AutoField(primary_key=True,editable=False)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    createdTime=models.DateTimeField(auto_now_add=True)
    total=models.IntegerField()

class Order_det(models.Model):
    _id=models.AutoField(primary_key=True,editable=False)
    order_id=models.ForeignKey(Order,on_delete=models.CASCADE, null=True)
    prod_id=models.ForeignKey(Product,on_delete=models.SET_NULL, null=True)
    amount=models.IntegerField()
    total=models.IntegerField()
   
    # def __str__(self):
    #     return self.desc

