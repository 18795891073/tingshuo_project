from django.db import models


class User(models.Model):

    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=255)
    root = models.IntegerField()


class ImageRecord(models.Model):
    db_table = 'adminuser_imagerd'
    iid = models.AutoField(primary_key=True)
    url = models.TextField()
    addtime = models.IntegerField()

