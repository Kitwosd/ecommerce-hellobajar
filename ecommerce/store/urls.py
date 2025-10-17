from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
path('', views.home, name='home'),   
 path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.register, name='register'),
        path('fruits/', views.fruits, name='fruits'),
        path('veg/', views.veg, name='veg'),
        path('products/', views.products, name='products'),
        path('product_detail/', views.product_detail, name='product_detail'),
        path('product_detail1/', views.product_detail1, name='product_detail1'),
        path('product_detail2/', views.product_detail2, name='product_detail2'),

        path('flash_products/', views.flash_products, name='flash_products'),
        path('cart/', views.cart, name='cart'),
        path('user_home/', views.user_home, name='user_home'),
        path('user_address/', views.user_address, name='user_address'),    
        path('user_order/', views.user_order, name='user_order'),    
        path('user_detail/', views.user_detail, name='user_detail'),    
        path('user_registration/', views.user_registration, name='user_registration'),      
        path('terms_and_service/', views.terms_and_service, name='terms_and_service'),
        path('wish_list/', views.wish_list, name='wish_list'),      
        path('loyalty/', views.loyalty, name='loyalty'),      
        path('faqs/', views.faqs, name='faqs'),      
        path('contacts/', views.contacts, name='contacts'),      
        path('policy/', views.policy, name='policy'),      
        path('refund_and_return/', views.refund_and_return, name='refund_and_return'),      
        path('about/', views.about, name='about'),      

 path('user/user_dashboard/', views.user_dashboard, name='user_dashboard'),
]