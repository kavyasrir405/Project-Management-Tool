# Generated by Django 5.0.4 on 2024-04-14 22:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_backlog_delete_employeedata'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('sprint', models.AutoField(primary_key=True, serialize=False)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
        migrations.AddField(
            model_name='backlog',
            name='sprint',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapp.sprint'),
        ),
    ]