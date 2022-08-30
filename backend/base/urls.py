from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes, name=""),
    path('users/', views.getUsers, name="users"),
    path('users/profile/', views.getUserProfile, name="users-profile"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
    # SIMPLEJWT Token URLs
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]