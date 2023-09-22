from django.urls import path
from . import views
app_name = "orders"
urlpatterns = [
    path('create/', views.order_create, name='order_create'),
    path('statistics/', views.order_items_statistics, name='order_items_statistics'),
    path('statistics1/', views.order_items_statistics_1, name='order_items_statistics'),

]