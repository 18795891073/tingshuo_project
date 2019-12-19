from django.db import models


# class To_Do_List(models.Model):
#     user_id = models.IntegerField(blank=True, null=True)
#     essay_id = models.CharField(max_length=60, blank=True, null=True)
#     type = models.CharField(max_length=20, blank=True, null=True)
#     state = models.CharField(max_length=10, blank=True, null=True)
#     time = models.DateTimeField(blank=True, null=True)
#     def __str__(self):
#         return self.essay_id

class To_Do_List(models.Model):
    user_id = models.IntegerField(blank=True, null=True)
    essay_id = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=20, blank=True, null=True)
    state = models.CharField(max_length=10, blank=True, null=True)
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'to_do_list'



# class Articles(models.Model):
#     system_id = models.IntegerField(blank=True)
#     essay_id = models.IntegerField(blank=True,null=True)
#     author_id = models.IntegerField(unique=False) 
#     commit_time = models.DateTimeField(auto_now_add=True)
#     start_ocr_time=models.DateTimeField(blank=True,null=True)
#     finish_ocr_time=models.DateTimeField(blank=True,null=True)
#     start_check_time=models.DateTimeField(blank=True,null=True)
#     finish_check_time=models.DateTimeField(blank=True,null=True)
#     start_correct_time = models.DateTimeField(blank=True,null=True)
#     finish_correct_time = models.DateTimeField(blank=True,null=True)
#     start_verify_time = models.DateTimeField(blank=True,null=True)
#     finish_verify_time = models.DateTimeField(blank=True,null=True)
#     correct_mode=models.IntegerField(blank=True,null=True)      
#     title = models.CharField(max_length=100, blank=True,null=True)
#     grade = models.CharField(max_length=32,blank=True,null=True)
#     region = models.CharField(max_length=64,blank=True,null=True)
#     state = models.CharField(max_length=32, unique=False)
#     essay_text = models.TextField(blank=True,null=True)
#     essay_image = models.ImageField(upload_to='imgs',blank=True,null=True) 
#     statistics=models.TextField(blank=True,null=True)
#     details = models.TextField(blank=True,null=True)
#     comments = models.TextField(blank=True,null=True)
#     score=models.IntegerField(blank=True,null=True)
#     result=models.IntegerField(blank=True,null=True)
#     description = models.TextField(blank=True,null=True)
#     def __str__(self):
#         return self.title
    
#     class Meta:
#         unique_together = (("system_id", "essay_id"),)



class Articles(models.Model):
    system_id = models.IntegerField(blank=True, null=True)
    essay_id = models.IntegerField(blank=True, null=True)
    author_id = models.IntegerField(blank=True, null=True)
    commit_time = models.DateTimeField(auto_now_add=True)
    start_ocr_time = models.DateTimeField(blank=True, null=True)
    finish_ocr_time = models.DateTimeField(blank=True, null=True)
    start_check_time = models.DateTimeField(blank=True, null=True)
    finish_check_time = models.DateTimeField(blank=True, null=True)
    start_correct_time = models.DateTimeField(blank=True, null=True)
    finish_correct_time = models.DateTimeField(blank=True, null=True)
    start_verify_time = models.DateTimeField(blank=True, null=True)
    finish_verify_time = models.DateTimeField(blank=True, null=True)
    correct_mode = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=1000)
    grade = models.CharField(max_length=64)
    region = models.CharField(max_length=100)
    state = models.CharField(max_length=64)
    essay_text = models.TextField(blank=True, null=True)
    analyze_rst = models.IntegerField(blank=True, null=True)
    statistics = models.TextField(blank=True, null=True)
    analyze_time = models.DateTimeField(blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    score = models.FloatField(blank=True, null=True)
    result = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = (("system_id", "essay_id"),)
        managed = False
        db_table = 'writing_articles'





class TsProvince(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=32, blank=True, null=True)
    short_name = models.CharField(max_length=3, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ts_province'





