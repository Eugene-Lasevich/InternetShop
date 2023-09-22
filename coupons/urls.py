from django.urls import path
from . import views


app_name = "coupons"
urlpatterns = [
    path('apply/', views.coupon_apply, name='apply'),
    # path('', views.coupon_list, name='coupon_list'),
]