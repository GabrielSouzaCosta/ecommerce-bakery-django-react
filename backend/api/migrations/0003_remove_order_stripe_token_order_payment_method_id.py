# Generated by Django 4.0.5 on 2022-07-11 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_order_alter_user_account_address_orderitem_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='stripe_token',
        ),
        migrations.AddField(
            model_name='order',
            name='payment_method_id',
            field=models.TextField(default='asjdklasjkldjaskljdkl'),
            preserve_default=False,
        ),
    ]