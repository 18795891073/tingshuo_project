# coding=utf8
from django.db import models

class UserInfo(models.Model):

    gender = (
        ('male', '男'),
        ('female', '女'),
    )
    gender1 = (
        ('student', '学生'),
        ('teacher', '老师'),
    )
    uid = models.AutoField(primary_key=True,unique=True)
    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    sex = models.CharField(max_length=32, choices=gender, default='男')
    identity = models.CharField(max_length=128, choices=gender1, default='学生')
    c_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ['c_time']
        verbose_name = '用户'
        verbose_name_plural = '用户'

class Address(models.Model):

    userinfo = models.ForeignKey(UserInfo, related_name='userinfo_address', on_delete=models.CASCADE)
    uid = models.AutoField(primary_key=True)
    province = models.CharField(max_length=30)    # 省份
    city = models.CharField(max_length=30)        # 市区
    district = models.CharField(max_length=30)    # 县区
    detail = models.CharField(max_length=128)     # 详细地区
    get_name = models.CharField(max_length=128)
    get_phone = models.CharField(max_length=128)
    get_code = models.CharField(max_length=128)

    def getFullAddress(self):
        return self.province + ' ' + self.city + ' ' + self.district + ' ' + self.detail + '(' + self.get_name + '收)' + ' ' + self.get_phone


class package(models.Model): 
    uid = models.CharField(max_length=128, unique=False)
    packname = models.CharField(max_length=255, unique=True)  
    time = models.DateTimeField(auto_now_add=True)
    total = models.CharField(max_length=128, unique=False) 
    surplus = models.CharField(max_length=128, unique=False)
    
    def __str__(self):
        return self.packname
