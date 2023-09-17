import django.contrib.auth.views
from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    # path('login/', views.user_login, name='login'),
    path('register/', views.register, name='register'),

    path('login/', django.contrib.auth.views.LoginView.as_view(), name='login'),
    path('logout/', django.contrib.auth.views.LogoutView.as_view(), name='logout'),
]
