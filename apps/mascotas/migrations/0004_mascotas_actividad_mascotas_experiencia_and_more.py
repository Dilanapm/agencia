# Generated by Django 5.1.3 on 2024-12-05 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mascotas', '0003_remove_mascotas_actividad_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mascotas',
            name='actividad',
            field=models.CharField(choices=[('activa', 'Activa'), ('tranquila', 'Tranquila')], default='activa', max_length=50),
        ),
        migrations.AddField(
            model_name='mascotas',
            name='experiencia',
            field=models.CharField(choices=[('principiante', 'Principiante'), ('intermedio', 'Intermedio'), ('experto', 'Experto')], default='principiante', max_length=50),
        ),
        migrations.AddField(
            model_name='mascotas',
            name='niños',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='mascotas',
            name='tamano',
            field=models.CharField(choices=[('pequeño', 'Pequeño'), ('mediano', 'Mediano'), ('grande', 'Grande')], default='mediano', max_length=50),
        ),
        migrations.AddField(
            model_name='mascotas',
            name='tiempo_cuidado',
            field=models.CharField(choices=[('poco', 'Menos de 1 hora'), ('medio', 'Entre 1 y 3 horas'), ('mucho', 'Más de 3 horas')], default='medio', max_length=50),
        ),
        migrations.AddField(
            model_name='mascotas',
            name='vivienda',
            field=models.CharField(choices=[('patio', 'Casa con patio'), ('sinPatio', 'Casa sin patio'), ('departamento', 'Departamento')], default='patio', max_length=50),
        ),
    ]
