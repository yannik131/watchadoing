# Generated by Django 3.1.5 on 2022-06-09 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0004_location_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='city',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='country',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='location',
            name='county',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='state',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]