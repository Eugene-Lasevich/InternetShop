from django.contrib import admin
from .models import Category, Product,Article, Partner, Advertisement, CompanyInfo, Contact


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
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'video_url', 'logo', 'history', 'contacts', 'certificate')
admin.site.register(CompanyInfo, CompanyInfoAdmin)

class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'job_title', 'phone', 'email', 'website')  # Определите, какие поля отображать в списке объектов
    search_fields = ('first_name', 'last_name', 'job_title', 'email')  # Добавьте поля для поиска
admin.site.register(Contact, ContactAdmin)


