# Generated by Django 4.2.1 on 2023-09-17 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0009_faq'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Название вакансии', max_length=200)),
                ('description', models.TextField(help_text='Описание вакансии')),
                ('requirements', models.TextField(help_text='Требования к кандидату')),
                ('publication_date', models.DateTimeField(auto_now_add=True, help_text='Дата публикации')),
            ],
        ),
    ]
