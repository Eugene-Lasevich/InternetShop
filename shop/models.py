from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def get_absolute_url(self):
        return reverse('shop:product_list_by_category',
                       args=[self.slug])

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField(upload_to='products/%Y/%m/%d', blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        # index_together = (('id', 'slug'),)
        indexes = [
            models.Index(fields=['id', 'slug']),
        ]

    def get_absolute_url(self):
        return reverse('shop:product_detail',
                       args=[self.id, self.slug])

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=200,
                             help_text='Enter article title')
    short_argument = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='article')
    date_of_creation = models.DateTimeField(auto_now_add=True)

    def get_absolute_url(self):
        return reverse('article-detail', args=[str(self.id)])

    def str(self):
        return self.title


class Partner(models.Model):
    partner_name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    image = models.ImageField(upload_to='partner')
    link = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, db_index=True)

    def get_absolute_url(self):
        return reverse('partner-detail', args=[str(self.id)])

    def str(self):
        return self.partner_name


class Advertisement(models.Model):
    adv_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='advertisement')
    link = models.CharField(max_length=200)

    def get_absolute_url(self):
        return reverse('advertisement-detail', args=[str(self.id)])

    def str(self):
        return self.adv_name

class CompanyInfo(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    video_url = models.URLField()
    logo = models.ImageField(upload_to='company_logo')
    history = models.TextField()
    contacts = models.TextField()
    certificate = models.ImageField(upload_to='certificates')

class Contact(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='contact_photos', null=True, blank=True)
    job_title = models.CharField(max_length=100)
    description = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.question

class Vacancy(models.Model):
    title = models.CharField(max_length=200, help_text='Название вакансии')
    description = models.TextField(help_text='Описание вакансии')
    requirements = models.TextField(help_text='Требования к кандидату')
    publication_date = models.DateTimeField(auto_now_add=True, help_text='Дата публикации')

    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    rating = models.PositiveIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    text = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
