# Generated by Django 3.1.5 on 2022-06-03 22:17

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0003_auto_20220529_2218'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='group',
            field=models.UUIDField(default=uuid.uuid4, null=True),
        ),
    ]
