# coding=utf8
from django.shortcuts import render, redirect
from . import models
from user import models as mml
from .check import checker
from .window import ch
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
import json
import datetime
from dwebsocket.decorators import accept_websocket
import time
import os
import re
import spacy
import random
from django.db.models import Q
import logging



# Create your views here.

print("*************************************************************")
print('                                                             ')
print('************欢迎使用此djang框架开发，祝您生活愉快************')
print('                                                             ')
print("*************************************************************")

SELF_PATH = os.path.dirname(os.path.abspath(__file__))

# 日志文件，当前文件上级目录下的log目录中的esslog.log
log_file = os.path.join(os.path.join(os.path.dirname(SELF_PATH), "log"), "esslog.log")

# 创建一个logger
logger = logging.getLogger('mylogger')
logger.setLevel(logging.DEBUG)

# 创建一个handler，用于写入日志文件
file_handler = logging.FileHandler(log_file)
file_handler.setLevel(logging.DEBUG)

# 定义handler的输出格式
formatter = logging.Formatter('[%(asctime)s][%(filename)s][line:%(lineno)4d][%(levelname)7s] ## %(message)s')
file_handler.setFormatter(formatter)

# 给logger添加handler
logger.addHandler(file_handler)


class MyConst:
    class ConstError(TypeError):pass
    def __setattr__(self, name, value):
        if name in self.__dict__:
            raise self.ConstError("Can't rebind const (%s)" %name)
        self.__dict__[name] = value


all_provinces = list(models.TsProvince.objects.all().values("id", "name"))
def get_province_name(province_id):
    '''根据省份编号查询省份的名称'''

    global all_provinces

    for p in all_provinces:
        if province_id == p['id']:
            return p['name']
    return ''


def get_userid_by_name(user_name):
    '''根据用户名查询用户id'''

    records = mml.UserInfo.objects.filter(username=user_name).values('uid', 'identity')
    if len(records) == 0:
        logger.warning("找不到对应的用户信息，username=%s" % user_name)
    elif len(records) > 1:
        logger.warning("用户名重复，username=%s" % user_name)
    else:
        user_id = records[0]['uid']
        user_identity = records[0]['identity']
        return (user_id, user_identity)

    return None


#加载学生页面接口
def write(request):
    if request.session.get('is_login', None):
        return render(request, 'writing/student.html')
    else:
        return redirect('/login/')

# 常量定义
my_const = MyConst()

# 年级名称和数字转换字典
dict_grade_name_2_num = {'七年级':7, '八年级':8, '九年级':9}
dict_grade_num_2_name = {'7':'七', '8':'八', '9':'九'}


#系统内学生提交作文接口    
# def submit(request):
#     if request.session.get('is_login', None):
#         m1 = request.session['user_name']
#         p = mml.UserInfo.objects.filter(username=m1).values('uid')
#         p=list(p)[0]['uid']
#         g = mml.package.objects.filter(uid=p).values('surplus')
#         g1 = list(g)[0]['surplus']
#         if int(g1) > 0:
#             g2 =int(g1)-1
#             mml.package.objects.filter(uid=p).update(surplus=str(g2))
#             if request.method == "POST":
#                 s = request.POST.get('write')
#                 c = models.Articles(system_id=0,author_id=p,title='test',state='waiting',essay_text=s)
#                 c.save()
#                 return JsonResponse({'data':'提交成功'})
#             else:
#                 return JsonResponse({'data':'出现错误'})
#         else:
#             return JsonResponse({'data':'套餐已用完，请前往商城购买'})
#     else:
#         return render(request, 'user/login.html')


#加载筛选页面接口
def correct(request):
    if request.session.get('is_login', None): 
        return render(request, 'writing/teacher1.html')
    else:
        return redirect('/login/')


#继续完成待办事项进入批改页面接口
def correct2(request):
    if request.session.get('is_login', None):
        if request.method == "POST":
            s = request.POST.get('ac')
            if s =='':
                return redirect('/backlog/') 
            else:
                m=models.Articles.objects.filter(id=s).values('state','essay_text','details','statistics','score','comments','start_correct_time')
                data=list(m)[0]
                data['id']=s
                data["errors"] = data.pop("details")
                try:
                    data["errors"] = json.loads(data["errors"])
                except:
                    return JsonResponse({'data':'details数据格式错误'})
                data["essay_statistics"] = data.pop("statistics")
                try:
                    data["essay_statistics"] =json.loads( data["essay_statistics"])
                except:
                    return JsonResponse({'data':'statistics数据格式错误'})
                data["comment"] = data.pop("comments")
                data['start_correct_time']=(data['start_correct_time']+datetime.timedelta(days = 15)).strftime('%Y-%m-%d %H:%M:%S')
                return render(request, 'writing/teacher.html', {"data":json.dumps(data)})
        else:
            return JsonResponse({'data':'Not POST'})
    else:
        return redirect('/login/')


   
        
#选定作文批改进入批改页面接口
def correct1(request):
    if request.session.get('is_login', None):
        if request.method == "POST":
            s = request.POST.get('ac')
            if s =='':
                return redirect('/backlog/') 
            else:
                m=models.Articles.objects.filter(id=s).values('state')
                if list(m)[0]['state'] == 'waiting':
                    models.Articles.objects.filter(id=s).update(state='marking',start_correct_time=datetime.datetime.now())
                    # 获取用户名
                    user_name = request.session.get('user_name', None)
                    if user_name:
                        # 根据用户名获取用户id
                        records = mml.UserInfo.objects.filter(username=user_name).values('uid', 'identity')
                        if len(records) == 0:
                            logger.warning("找不到对应的用户信息，username=%s" % user_name)
                        elif len(records) > 1:
                            logger.warning("用户名重复，username=%s" % user_name)
                        else:
                            user_id = records[0]['uid']
                            j=models.To_Do_List(user_id=user_id,essay_id=s,type="待批改作文",state="marking")
                            j.save()
                            m1=models.Articles.objects.filter(id=s).values('state','essay_text','details','statistics','score','comments','start_correct_time')
                            data=list(m1)[0]
                            data['id']=s
                            data["errors"] = data.pop("details")
                            try:
                                data["errors"] = json.loads(data["errors"])
                            except:
                                return JsonResponse({'data':'details数据格式错误'})
                            data["essay_statistics"] = data.pop("statistics")
                            try:
                                data["essay_statistics"] =json.loads( data["essay_statistics"])
                            except:
                                return JsonResponse({'data':'statistics数据格式错误'})
                            data["comment"] = data.pop("comments")
                            data['start_correct_time']=(data['start_correct_time']+datetime.timedelta(days = 15)).strftime('%Y-%m-%d %H:%M:%S')
                            return render(request, 'writing/teacher.html', {"data":json.dumps(data)})
                    else:
                        return JsonResponse({'data':'session信息中找不到user_name'})   
                elif list(m)[0]['state'] == 'marking':
                    return render(request, 'writing/backlog.html')
                else:
                    return render(request, 'writing/backlog.html')
        else:
            return JsonResponse({'data':'Not POST'})
    else:
        return redirect('/login/')




#保存批改接口
def finish_correct(request):
    if request.session.get('is_login', None):
        if request.method == "POST":
            m = request.POST.dict()
            s=m['questions'].replace('null,', '')
            s=s.replace('null', '')
            a1=m['id']
            p=models.Articles.objects.filter(id=a1).values('details')
            try:
                h=eval(m['comment'])
                h6=eval(m['scores'])
                a3=eval(s)
                p1= eval(list(p)[0]['details'])
                for c in p1:
                    c['questions'] = []
                    for b in a3:
                        if int(b['offset']) >= int(c['sentence']['offset']) and int(b['offset']) < int(c['sentence']['offset'])+int(c['sentence']['length']):
                            c['questions'] += [b]
                p1=json.dumps(p1, ensure_ascii=False)
                models.Articles.objects.filter(id=a1).update(details=p1, state='completed', comments=json.dumps(h),score=float(h6['scores']),finish_correct_time=datetime.datetime.now())
                h1=models.To_Do_List.objects.filter(essay_id=a1).values('state')
                print(h1)
                h2=list(h1)[0]['state']
                if h2 == "marking":
                    models.To_Do_List.objects.filter(essay_id=a1).update(state="completed",type="已完成")
                    return HttpResponse('提交成功')
                else:
                    return JsonResponse({'data':'状态出错'})
            except:
                return JsonResponse({'data':'提交数据格式错误'})
        else:
            return JsonResponse({'data':'Not POST'})
    else:
        return redirect('/login/')


#暂存批改接口
def finish_correct_pending(request):
    if request.session.get('is_login', None):
        if request.method == "POST":
            m = request.POST.dict()
            s=m['questions'].replace('null,', '')
            s=s.replace('null', '')
            a1=m['id']
            p=models.Articles.objects.filter(id=a1).values('details')
            try:
                p1= eval(list(p)[0]['details'])
                h=eval(m['comment'])
                h1=eval(m['scores'])
                a3=eval(s)
                for c in p1:
                    c['questions'] = []
                    for b in a3:
                        if int(b['offset']) >= int(c['sentence']['offset']) and int(b['offset']) < int(c['sentence']['offset'])+int(c['sentence']['length']):
                            c['questions'] += [b]
                p1=json.dumps(p1, ensure_ascii=False)
                if h1['scores']!='': 
                    models.Articles.objects.filter(id=a1).update(details=p1, comments=json.dumps(h),score=float(h1['scores']))
                    return HttpResponse('提交成功')
                else:
                    models.Articles.objects.filter(id=a1).update(details=p1, comments=json.dumps(h),score=None)
                    return HttpResponse('提交成功')
            except:
                return JsonResponse({'data':'提交数据格式错误'})
        else:
            return JsonResponse({'data':'Not POST'})
    else:
        return redirect('/login/')



#获取省份列表
def get_provinces(request):
    if request.session.get('is_login', None):
        if request.method == "GET":
            records = models.TsProvince.objects.all().values("id", "name")
            data={'data':list(records)}
            return JsonResponse(data)
        else:
            return JsonResponse({'data':'Not GET'})
    else:
        return redirect('/login/')




#学生作文页面接口(需要修改)
# def web(request):
    # if request.method == "GET":
    #     # 判断登录状态
    #     if request.session.get('is_login', None):
    #         # 获取用户名
    #         user_name = request.session.get('user_name', None)
    #         if user_name:
    #             # 根据用户名获取用户id
    #             userinfo = get_userid_by_name(user_name)
    #             if userinfo:


    #     p = models.Articles.objects.all().values("identifier", "original", "state")
    #     models.Articles.objects.filter(id=s).values("id", "original", "state")

    #     data={'data':list(p)}
    #     return JsonResponse(data)


# 作文筛选接口
def essay_selection(request):
    if request.session.get('is_login', None):
        if request.method == "POST":
            post_conditions = request.POST.dict()
            print(post_conditions)

            try:
                nodata_flag = eval(post_conditions.get('test'))
                page = eval(post_conditions.get('page'))
                condition_title = eval(post_conditions.get('title'))
                condition_time = eval(post_conditions.get('time'))
                condition_grade = eval(post_conditions.get('grade'))
                condition_region = eval(post_conditions.get('region'))

                if nodata_flag != ['star']:
                    # 首次进入页面时，前端仍然会调用此接口，但实际不需要返回数据，程序通过test字段来区分：如果test中填写了'star'，则不返回

                    # Q查询过滤条件
                    Q_query_filters = Q()
                    
                    # 标题
                    if condition_title != []:
                        sub_q = Q()
                        sub_q.connector = 'OR'
                        for ct in condition_title:
                            sub_q.children.append(('title__icontains', ct))
                        Q_query_filters.add(sub_q, 'AND')

                    # 提交时间
                    if condition_time != []:
                        try:
                            start_time = datetime.datetime.strptime(condition_time[0].strip(), '%Y-%m-%d')
                            end_time = datetime.datetime.strptime(condition_time[1].strip(), '%Y-%m-%d')
                            end_time = datetime.datetime(end_time.year, end_time.month, end_time.day, 23, 59, 59)
                            sub_q = Q()
                            sub_q.connector = 'OR'
                            sub_q.children.append(('commit_time__range', (start_time,end_time)))
                            Q_query_filters.add(sub_q, 'AND')
                        except Exception as err:
                            logger.warning("前端查询条件中时间设置错误：%s" % str(condition_time))
                        finally:
                            pass

                    # 年级
                    if condition_grade != []:
                        sub_q = Q()
                        sub_q.connector = 'OR'
                        for cg in condition_grade:
                            num_grade = dict_grade_name_2_num.get(cg)
                            if num_grade:
                                sub_q.children.append(('grade', num_grade))
                            else:
                                logger.warning("前端查询条件中年级设置错误：%s" % str(condition_grade))
                                break
                        else:
                            Q_query_filters.add(sub_q, 'AND')

                    # 地区
                    if condition_region != []:
                        sub_q = Q()
                        sub_q.connector = 'OR'
                        for cr in condition_region:
                            try:
                                str_province = "%02d" % int(cr)
                                sub_q.children.append(('region__istartswith', str_province))
                            except Exception as err:
                                logger.warning("前端查询条件中地区设置错误：%s" % str(condition_region))
                                break
                            finally:
                                pass
                        else:
                            Q_query_filters.add(sub_q, 'AND')
                    
                    # 添加默认过滤条件
                    default_q = Q()
                    default_q.connector = 'OR'
                    default_q.children.append(('state', 'waiting'))
                    Q_query_filters.add(default_q, 'AND')

                    # 查询符合条件的作文
                    records = models.Articles.objects.filter(Q_query_filters).values("id", "essay_text", "title", "commit_time", "grade", "region")
                    # print(records)
                    
                    # 替换grade字段，替换region字段（根据省份的id获取省份名称，替换到region字段中）
                    for rcd in records:
                        grade_name = dict_grade_num_2_name.get(rcd['grade'])
                        if grade_name:
                            rcd['grade'] = grade_name
                        province_id = int(rcd['region'][:2])
                        rcd['region'] = get_province_name(province_id)

                    response = JsonResponse({'data':list(records), 'page':page})
                    response['Access-Control-Allow-Origin'] = '*'
                    response['Access-Control-Allow-Headers'] = '*'
                    return response
            except:
                logger.warning("前端查询条件格式错误：%s" % str(post_conditions))
            finally:
                pass

        # 出现异常，或者本身就不需要返回数据，则返回空数据
        null_response = JsonResponse({"data": []})
        null_response["Access-Control-Allow-Origin"] = "*"
        null_response['Access-Control-Allow-Headers'] = '*'
        return null_response
    else:
        return redirect('/login/')

#筛选预加载作文接口
def check(request):
    if request.session.get('is_login', None):
        if request.method == "POST":
            s = request.POST.get('id')
            p = models.Articles.objects.filter(id=s).values('essay_text')
            m=list(p)[0]
            return JsonResponse(m)
        else:
            return JsonResponse({'data':'Not POST'})
    else:
        return redirect('/login/')


#上传文件接口
def jieshou(request):
    if request.method == "POST":
        s= request.FILES.get('upfile')
        sname='%s/%s' % (settings.MEDIA_ROOT,s.name)
        destination = open(sname,'wb')
        for chunk in s.chunks(): 
            destination.write(chunk) 
        destination.close()
        data='hello' 
        return HttpResponse(data)


#待办事项页面接口
def backlog(request):
    if request.session.get('is_login', None):
        return render(request, 'writing/backlog.html')
    else:
        return redirect('/login/')


# 获取我的任务列表接口
def get_my_tasks(request):
    # 判断登录状态
    if request.session.get('is_login', None):
        # 获取用户名
        user_name = request.session.get('user_name', None)
        if user_name:
            # 根据用户名获取用户id
            records = mml.UserInfo.objects.filter(username=user_name).values('uid', 'identity')
            if len(records) == 0:
                logger.warning("找不到对应的用户信息，username=%s" % user_name)
            elif len(records) > 1:
                logger.warning("用户名重复，username=%s" % user_name)
            else:
                user_id = records[0]['uid']

                # 查询该用户的任务记录
                tasks = models.To_Do_List.objects.filter(user_id=user_id).values("id", "user_id", "essay_id", "time", "type", "state")
                
                full_task_info = list()  # 完整的任务信息

                # 查询文章标题，并补充到任务信息中
                for task in tasks:
                    essay_id = task["essay_id"]
                    title = models.Articles.objects.filter(id=essay_id).values("title")
                    if len(title) == 0:
                        logger.warning("找不到对应的文章，id=%d" % essay_id)
                    elif len(title) > 1:
                        logger.warning("文章编号重复，id=%d" % essay_id)
                    else:
                        full_task_info += [dict(task, **list(title)[0])]
                data = {"data":full_task_info}
                response = JsonResponse(data)
                response["Access-Control-Allow-Origin"] = "*"
                return response
        else:
            logger.warning("session信息中找不到user_name")
    
    # 异常，全部返回空数据
    null_response = JsonResponse({"data": []})
    null_response["Access-Control-Allow-Origin"] = "*"
    return null_response
