# Generated by Django 4.0.3 on 2024-05-02 12:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djapp', '0003_project_teamlead_mail'),
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
        migrations.CreateModel(
            name='backlog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('backlogName', models.CharField(max_length=30)),
                ('backlogId', models.CharField(max_length=20, unique=True)),
                ('sprint', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='djapp.sprint')),
            ],
        ),
    ]
