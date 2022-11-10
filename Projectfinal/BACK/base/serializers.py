from pyexpat import model
from unicodedata import category
from rest_framework.serializers import ModelSerializer
from .models import Category, Product
from .models import Note,Pita


class NoteSerializer(ModelSerializer):
    class meta:
        model= Note
        fields='__all__'


class PitaSerializer(ModelSerializer):
    class meta:
        model= Pita
        fields='__all__'

class ProductSerializer(ModelSerializer):
    class meta:
        model= Product
        fields='__all__'
       

class CategorySerializer(ModelSerializer):
    class meta:
        model= Category
        fields='__all__'

 
    



