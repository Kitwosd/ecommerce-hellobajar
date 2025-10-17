from itertools import product
from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect


from django.contrib.auth.decorators import login_required

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
# Create your views here.
def home(request):
    return render(request, 'home.html') 

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome back, {username}!')
            # Get the 'next' parameter or redirect to root
            next_url = request.GET.get('next', '/')
            return redirect(next_url)
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'login.html')

def user_logout(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('/')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('/login/')
    else:
        form = UserCreationForm()
    
    return render(request, 'register.html', {'form': form})

# accounts/forms.py (optional - for custom registration form)
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        if commit:
            user.save()
        return user
    
def fruits(request):
    # render the fruits page template
    return render(request, 'fruits.html')

def products(request):
    return render(request, 'products.html')


def product_detail(request):
    return render(request, 'product_detail.html')

def product_detail1(request):
    return render(request, 'product_detail1.html')

def product_detail2(request):
    return render(request, 'product_detail2.html')


def veg(request):
    return render(request, 'veg.html')

def flash_products(request):
    return render(request, 'flash_products.html')

@login_required
def cart(request):
    return render(request, 'cart.html')

def user_home(request):
    return render(request, 'user_home.html')

def user_address(request):
    return render(request, 'user_address.html')

def user_order(request):
    return render(request, 'user_order.html')

def user_dashboard(request):
    return render(request, 'user_dashboard.html')

def user_detail(request):
    return render(request, 'user_detail.html')

def user_registration(request):
    return render(request, 'user_registration.html')

def terms_and_service(request):
    return render(request, 'terms_and_service.html')

def wish_list(request):
    return render(request, 'wish_list.html')

def loyalty(request):
    return render(request, 'loyalty.html')

def faqs(request):
    return render(request, 'faqs.html')

def contacts(request):
    return render(request, 'contacts.html')

def policy(request):
    return render(request, 'policy.html')

def refund_and_return(request):
    return render(request, 'refund_and_return.html')

def about(request):
    return render(request, 'about.html')
