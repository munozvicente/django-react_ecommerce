# Generated by Django 4.0.3 on 2022-09-13 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
    ]
