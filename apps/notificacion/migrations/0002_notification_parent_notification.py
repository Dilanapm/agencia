# Generated by Django 3.2.16 on 2024-12-04 22:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notificacion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='parent_notification',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='responses', to='notificacion.notification'),
        ),
    ]
