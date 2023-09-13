from django.contrib import admin
from .models import Category, Product,Article, Partner, Advertisement


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Category, CategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'stock', 'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'stock', 'available']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Product, ProductAdmin)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'short_argument','date_of_creation')
admin.site.register(Article, ArticleAdmin)

class PartnerAdmin(admin.ModelAdmin):
    list_display = ('partner_name', 'description', 'link')
    prepopulated_fields = {'slug': ('partner_name',)}
admin.site.register(Partner, PartnerAdmin)

class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('adv_name', 'link')
admin.site.register(Advertisement,AdvertisementAdmin)