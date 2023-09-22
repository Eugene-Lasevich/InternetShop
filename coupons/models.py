# from django.db import models
# from django.core.validators import MinValueValidator, MaxValueValidator
#
#
# class Coupon(models.Model):
#     code = models.CharField(max_length=50, unique=True)
#     valid_from = models.DateTimeField()
#     valid_to = models.DateTimeField()
#     discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
#     active = models.BooleanField()
#
#     def __str__(self):
#         return self.code

from django.db import models


class Coupon(models.Model):
    code = models.CharField(max_length=20, unique=True)  # Уникальный код промокода
    description = models.TextField()  # Описание промокода
    valid_from = models.DateTimeField()  # Дата и время начала действия промокода
    valid_to = models.DateTimeField()  # Дата и время окончания действия промокода
    discount = models.DecimalField(max_digits=75, decimal_places=2)  # Скидка в процентах или фиксированная сумма
    active = models.BooleanField(default=True)  # Флаг активности промокода (True - активен, False - в архиве)

    def __str__(self):
        return self.code
