# Generated by Django 3.1.1 on 2020-11-14 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('income', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='incomedata',
            name='income',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
