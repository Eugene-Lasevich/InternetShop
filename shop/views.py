from django.shortcuts import render
from cart.forms import CartAddProductForm
from django.shortcuts import render, get_object_or_404
from .models import Category, Product, Article, Partner,Advertisement


def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    return render(request,
                  'shop/product/list.html',
                  {'category': category,
                   'categories': categories,
                   'products': products})


def product_detail(request, id, slug):
    product = get_object_or_404(Product,
                                id=id,
                                slug=slug,
                                available=True)
    cart_product_form = CartAddProductForm()
    return render(request,
                  'shop/product/detail.html',
                  {'product': product, 'cart_product_form': cart_product_form})

def home(request):
    # Получите последнюю опубликованную статью
    latest_article = Article.objects.latest('date_of_creation')

    # Получите список компаний-партнеров
    partners = Partner.objects.all()
    advertisement = Advertisement.objects.first()

    context = {
        'latest_article': latest_article,
        'partners': partners,
        'advertisement': advertisement,  # Добавьте рекламу в контекст
    }

    return render(request, 'shop/home/home.html', context)


def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)

    context = {
        'article': article,
    }

    return render(request, 'shop/home/article_detail.html', context)


def partner_list(request):
    partners = Partner.objects.all()

    context = {
        'partners': partners,
    }

    return render(request, 'shop/home/partner_list.html', context)


def partner_detail(request, slug):
    partner = get_object_or_404(Partner, slug=slug)

    context = {
        'partner': partner,
    }

    return render(request, 'shop/home/partner_detail.html', context)
