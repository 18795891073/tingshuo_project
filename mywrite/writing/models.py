from django.db import models

class Articles(models.Model):
    uid = models.CharField(max_length=128, unique=False)
    time = models.DateTimeField(auto_now_add=True)
    identifier = models.CharField(max_length=128, unique=True) 
    title = models.CharField(max_length=1000, blank=True)
    grade = models.CharField(max_length=64,blank=True)
    region = models.CharField(max_length=100,blank=True)
    state = models.CharField(max_length=64, unique=False)
    original = models.TextField()
    essay_statistics=models.TextField(blank=True)
    errors = models.TextField(blank=True)
    comment = models.TextField(blank=True)

    def __str__(self):
        return self.identifier


# class Province(models.Model):
#     name = models.CharField(max_length=64,blank=True)
#     short_name = models.CharField(max_length=64,blank=True)

#     def __str__(self):
#         return self.name

#class City(models.Model):
#    name = models.CharField(max_length=64,blank=True)
#    province_uid = models.IntegerField(blank=True) 
#    province = models.ForeignKey(Province,related_name='p_c',on_delete=models.CASCADE)
#
#    def __str__(self):
#        return self.name
#
#class Zone(models.Model):
#    name = models.CharField(max_length=64,blank=True)
#    province_uid = models.IntegerField(blank=True)
#    city_uid = models.IntegerField(blank=True)
#    bshow = models.IntegerField(blank=True)
#    city = models.ForeignKey(City,related_name='c_z',on_delete=models.CASCADE)
#
#    def __str__(self):
#        return self.name 


