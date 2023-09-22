from django.http import HttpResponseForbidden
from django.shortcuts import render
from .models import OrderItem
from django.contrib.auth.decorators import login_required
from .forms import OrderCreateForm
from cart.cart import Cart
from django.shortcuts import render



def order_create(request):
    cart = Cart(request)
    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            if cart.coupon:
                order.coupon = cart.coupon
                order.discount = cart.coupon.discount
            order.save()
            for item in cart:
                OrderItem.objects.create(order=order,
                                         product=item['product'],
                                         price=item['price'],
                                         quantity=item['quantity'])
            # очистка корзины
            cart.clear()
            return render(request, 'orders/order/created.html',
                          {'order': order})
    else:
        form = OrderCreateForm
    return render(request, 'orders/order/create.html',
                  {'cart': cart, 'form': form})


import plotly.express as px
from django.shortcuts import render
from .models import OrderItem

@login_required
def order_items_statistics(request):
    # Проверка, является ли пользователь суперпользователем
    if not request.user.is_superuser:
        return HttpResponseForbidden("Доступ запрещен")

    # Извлеките данные о продажах элементов заказов
    order_items = OrderItem.objects.all()



    # Создайте DataFrame для данных
    import pandas as pd
    data = pd.DataFrame(list(order_items.values('product__name', 'quantity', 'price')))

    # Создайте график с использованием Plotly
    fig = px.bar(data, x='product__name', y='quantity', title='Статистика продаж элементов заказов')

    # Преобразуйте график в HTML и передайте его в шаблон
    plot_html = fig.to_html(full_html=False)

    return render(request, 'orders/statistics/order_items_statistics.html', {'plot_html': plot_html})

def order_items_statistics_1(request):
    # Извлеките данные о продажах элементов заказов
    order_items = OrderItem.objects.all()

    return render(request, 'orders/statistics/order_items_statistics_1.html', {'order_items': order_items})

