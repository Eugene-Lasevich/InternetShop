from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.home, name='product_list'),
    path('articles/<int:article_id>/', views.article_detail, name='article-detail'),
    path('store/', views.product_list, name='product_list'),
    path('contacts/', views.contact_list, name='contact-list'),

    path('partners/', views.partner_list, name='partner-list'),
    path('store/<slug:category_slug>/', views.product_list, name='product_list_by_category'),
    path('<int:id>/<slug:slug>/', views.product_detail, name='product_detail'),
    path('about/', views.company_info, name='company-info'),
    path('articles/', views.article_list, name='article-list'),
    # path('partners/<slug:slug>/', views.partner_detail, name='partner-detail'),
]
