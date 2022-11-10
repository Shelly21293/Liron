from urllib import response
from django.http import JsonResponse
from django.shortcuts import render
from .serializers import CategorySerializer, NoteSerializer, ProductSerializer
from .models import Order, Order_det, Category, Product, User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
# images
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    # signin
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.userName
        token['eeemail']= user.email
        token['staff']= user.is_staff
        # ...
        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
# Authentication code END

def index(r):
    return JsonResponse({'Server' : "running"})

# register
@api_view(['POST'])
def register(request):
    isStaff=request.data["staff"]
    User.objects.create_user(userName=request.data['userName'], email=request.data['email'], password=request.data['password'], is_staff=isStaff)
    print (request.data["userName"])
    print (request.data["email"])
    print (request.data["password"])
    return Response("routes")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    return response("")

    
# desc ,price,prodName,createdTime, _id
@api_view(['POST','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def products(request,id=-1):
    if request.method == 'POST': #method post add new row
        print(request.data['desc'])
        # print(request.data['price'])
        # print(request.data['cat_id'])
        # desc =request.data['desc']
        Product.objects.create(desc=request.data['desc'] ,price=request.data['price'])
        return JsonResponse({'POST':"Success"})

    if request.method == 'DELETE': #method delete a row
        temp= Product.objects.get(_id = id)
        temp.delete()
        return JsonResponse({'DELETE': id})

    if request.method == 'PUT': #method update a row
        temp=Product.objects.get(_id = id)
        print (temp)
        temp.price =request.data['price']
        temp.desc =request.data['desc']
        temp.save()
        return JsonResponse({'PUT': id})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    print('innnn')
    user=request.user
    print(user)
    notes=user.note_set.all()
    print(user.set_set)
    print(notes)
    serializer=NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOneNote(request):
    user=request.user
    notes=user.note_set.all()
    serializer=NoteSerializer(notes,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOneNote(request):
    user=request.user
    notes=user.note_set.get(id=id)
    serializer=NoteSerializer(notes,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNote(request):
    Serializer=NoteSerializer(data=request.data)
    if (Serializer.is_valid()):
        Serializer.save(user_id=request.user.id)
    else:
        return response("data was not created")
    
    return response("Category was created successfully")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCategory(request):
    Serializer=CategorySerializer(data=request.data)
    if (Serializer.is_valid()):
        Serializer.save()
    else:
        return response("data was not created")
    
    return response("Category was created successfully")

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
@permission_classes([IsAdminUser])
def addProduct(request):
    Serializer=ProductSerializer(data=request.data)
    if (Serializer.is_valid()):
        Serializer.save()
    else:
        return response("data was not created")
    
    return response("Product was created successfully")

@api_view(['GET'])
def getCategories(request):
    Categories=Category.objects.all()
    serializer=CategorySerializer(Categories,many=True)
    return Response(serializer.data)

# @api_view(['GET'])
# def getProducts(request, id=0):
#     if int(id)> 0:
#         products=Product.objects.filter(cat_id=int(id))
#     else:
#         products=Product.objects.all() 
#     serializer=ProductSerializer(products,many=True)
#     return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    print(request.data)
    orders=request.data
    # Create a single order
    newOrder= Order.objects.create(user_id=request.user,total=1)
    # Create new order details
    for x in orders:
        newProd=Product.objects.get(_id=int(x["_id"])) 
        total=newProd.price * x["amount"]
        Order_det.objects.create(order_id=newOrder, prod_id=newProd, amount=x["amount"], total=total)
    return response("Order was created successfully")
   

@api_view(['GET'])
def getProducts(request,id=-1):
    if request.method == 'GET':    
        if int(id) > -1: 
            if int(id)> Product.objects.count(): return JsonResponse({"Server: array out of range"})
            product= Product.objects.get(_id = id)
            return JsonResponse({
            "desc":product.desc,
            "price":product.price},safe=False)
        else: 
            res=[]
            for productObj in Product.objects.all(): 
                res.append({"desc":productObj.desc,
                "price":productObj.price,
                "id":productObj._id
                }) 
            return JsonResponse(res,safe=False) 


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addOrder(request):
#     if request.method=='POST':
#         Order.objects.create{desc=request.data[]}

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addFavorite(request):
#         Favorite.objects.create(movie_name=request.data['movie_name'] ,release_date=request.data['release_date'], user_id=request.data['user_id'])
#         return JsonResponse({'POST':"Success"})


# Create your views here.
def index(request):
    return HttpResponse("test")

 
# get all images from DB to user
@api_view(['GET'])
def getImages(request):
    res = []  # create an empty list
    for img in Product.objects.all():  # run on every row in the table...
        res.append({"title": img.title,
                    "content": img.content,
                    "image":str(img.image) })  # append row by to row to res list
    return JsonResponse(res, safe=False)  # return array as json response
 
# save image from user to DB
class APIViews(APIView):
    parser_class = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        api_serializer = ProductSerializer(data=request.data)
        if api_serializer.is_valid():  # the serializer check our data
            api_serializer.save()  # save to DB (path,str) and save the actual file to directory
            return Response(api_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', api_serializer.errors)
            return Response(api_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
