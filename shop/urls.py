from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.home, name='product_list'),
    path('articles/<int:article_id>/', views.article_detail, name='article-detail'),
    path('store/', views.product_list, name='product_list'),
    path('contacts/', views.contact_list, name='contact-list'),
    path('privacy-policy/', views.privacy_policy, name='privacy-policy'),
    path('faq/', views.faq_list, name='faq-list'),
    path('vacancy/', views.vacancy_list, name='vacancy-list'),


    path('reviews/', views.review_list, name='review-list'),
    path('add_review/', views.add_review, name='add-review'),

    path('partners/', views.partner_list, name='partner-list'),
    path('store/<slug:category_slug>/', views.product_list, name='product_list_by_category'),
    path('<int:id>/<slug:slug>/', views.product_detail, name='product_detail'),
    path('about/', views.company_info, name='company-info'),
    path('articles/', views.article_list, name='article-list'),
    path('example/', views.example_view, name='example'),
    path('example1/', views.example_view_1, name='example1'),

    # path('partners/<slug:slug>/', views.partner_detail, name='partner-detail'),
]
