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
import re
import spacy
import random
from django.db.models import Q




# Create your views here.
print("***********************************************************")
print('                                                           ')
print('********欢迎使用此djang框架开发，祝您生活愉快**************')
print('                                                           ')
print("***********************************************************")

def write(request):

    return render(request, 'writing/student.html')
     




# def submit(request):
#     m = request.session['user_name']
#     p = mml.UserInfo.objects.filter(username=m).values('uid')
#     p=list(p)[0]['uid']
#     g = mml.package.objects.filter(uid=p).values('surplus')
#     g1 = list(g)[0]['surplus']
#     if int(g1) > 0:
#         g2 =int(g1)-1
#         mml.package.objects.filter(uid=p).update(surplus=str(g2))
#         if request.method == "POST":
#             s = request.POST.get('write')
#             h=ch(s)
#             x={"word_count": 127, "sentence_count": 10, "avg_sentence_len": 13.86, "sentence_word_1to5": 0, "sentence_word_6to10": 1, "sentence_word_11to15": 3, "sentence_word_16to20": 3, "sentence_word_21to25": 0, "sentence_word_26to30": 0, "sentence_word_31to40": 0, "sentence_word_41to50": 0, "sentence_word_51more": 0, "avg_word_len": 3.74, "long_word_4less": 43, "long_word_4to6": 42, "long_word_7to10": 11, "long_word_11to15": 1, "long_word_16more": 0, "unique_word": 47, "stopwords_count": 31, "noun_count": 18, "adj_count": 1, "adv_count": 6, "verb_count": 15, "foreign_count": 0, "prep_count": 9, "lower_7_count": 91, "grade_7_count": 67, "grade_8_count": 23, "grade_9_count": 19, "higher_9_count": 5, "sentence_simple_count": 5, "sentence_compound_count": 3, "sentence_complex_count": 2, "conjunction_word_count": 5}
#             v=random.random()
#             v1=str(v)[-4:-1]
#             w =time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+v1
#             c = models.Articles(identifier=w, uid=p, original=s, errors=h, state='waiting', essay_statistics=json.dumps(x))
#             c.save()
#             return JsonResponse({'data':'提交成功'})
#         else:
#             return JsonResponse({'data':'出现错误'})
#     else:
#         return JsonResponse({'data':'套餐已用完，请前往商城购买'})



def submit(request):
    m1 = request.session['user_name']
    p = mml.UserInfo.objects.filter(username=m1).values('uid')
    p=list(p)[0]['uid']
    g = mml.package.objects.filter(uid=p).values('surplus')
    g1 = list(g)[0]['surplus']
    if int(g1) > 0:
        g2 =int(g1)-1
        mml.package.objects.filter(uid=p).update(surplus=str(g2))
        if request.method == "POST":
            s = request.POST.get('write')
            if "<script>" in s or "<script" in s:
                return JsonResponse({'data':'小比崽子别瞎闹'})
            v=random.random()
            v1=str(v)[-4:-1]
            w =time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+v1
            x={"word_count": 127, "sentence_count": 10, "avg_sentence_len": 13.86, "sentence_word_1to5": 0, "sentence_word_6to10": 1, "sentence_word_11to15": 3, "sentence_word_16to20": 3, "sentence_word_21to25": 0, "sentence_word_26to30": 0, "sentence_word_31to40": 0, "sentence_word_41to50": 0, "sentence_word_51more": 0, "avg_word_len": 3.74, "long_word_4less": 43, "long_word_4to6": 42, "long_word_7to10": 11, "long_word_11to15": 1, "long_word_16more": 0, "unique_word": 47, "stopwords_count": 31, "noun_count": 18, "adj_count": 1, "adv_count": 6, "verb_count": 15, "foreign_count": 0, "prep_count": 9, "lower_7_count": 91, "grade_7_count": 67, "grade_8_count": 23, "grade_9_count": 19, "higher_9_count": 5, "sentence_simple_count": 5, "sentence_compound_count": 3, "sentence_complex_count": 2, "conjunction_word_count": 5}
            c = models.Articles(identifier=w, uid=p, original=s, errors="", state='waiting',  essay_statistics=json.dumps(x))
            c.save()
            return JsonResponse({'data':'提交成功'})
        else:
            return JsonResponse({'data':'出现错误'})
    else:
        return JsonResponse({'data':'套餐已用完，请前往商城购买'})


def correct(request):

    return render(request, 'writing/teacher1.html')



def correct1(request):

    if request.method == "POST":
        s = request.POST.get('ac')
        print(s)
        m=models.Articles.objects.filter(identifier=s).values('state')
        if list(m)[0]['state'] == 'waiting':
            # models.Articles.objects.filter(identifier=s).update(state='marking')
            data1 = models.Articles.objects.filter(identifier=s).values('original')
            p = models.Articles.objects.filter(identifier=s).values('errors') 
            data2 = list(data1)
            data = data2[0]
            data['identifier'] = s
            p1= eval(list(p)[0]['errors'])
            data['errors']=p1
            return render(request, 'writing/teacher.html', {"data":json.dumps(data)})
        elif list(m)[0]['state'] == 'marking':
            return HttpResponse('已有老师正在批改此作文，请您刷先新页面选择另一篇作文进行批改')
        else:
            return HttpResponse('该作文已被其他(她)老师批改完成，请您先刷新页面选择另一篇作文进行批改')


def load(request):
    if request.method == "POST":
        s = request.POST.get('ac')
        m=models.Articles.objects.filter(identifier=s).values('state')
        if list(m)[0]['state'] == 'waiting':
            # models.Articles.objects.filter(identifier=s).update(state='marking')
            data1 = models.Articles.objects.filter(identifier=s).values('original')
            p = models.Articles.objects.filter(identifier=s).values('errors') 
            data2 = list(data1)
            data = data2[0]
            data['identifier'] = s
            p1= eval(list(p)[0]['errors'])
            data['errors']=p1
            data['essay_statistics']={'word':'200','实词':[{'名词':['America','school']},{'代词':['it','he']},{'形容词':['bright','cold']},{'副词':['greater','harder']},{'动词':['break','erase']},{'数词':['ten','zero','2']}],'虚词':[{'冠词':['the','an']},{'介词':['uppon','inside']},{'连词':['and','but','or']},{'感叹词':['wow']}],'过度词汇':['but','and','because','although','instead of','unlike','at first','since','on the whole','accordingly','on the other hand']}
            return JsonResponse(data)
        elif list(m)[0]['state'] == 'marking':
            return HttpResponse('已有老师正在批改此作文，请您刷先新页面选择另一篇作文进行批改')
        else:
            return HttpResponse('该作文已被其他(她)老师批改完成，请您先刷新页面选择另一篇作文进行批改')


def complete(request):
    s = request.POST
    m = s.dict()
    h=m['comment']
    s1=m['questions'].replace('null,', '')
    s1=s1.replace('null', '')
    a1=m['identifier']
    a2=m['essay_statistics']
    a3=eval(s1)
    p=models.Articles.objects.filter(identifier=a1).values('errors')
    p1= eval(list(p)[0]['errors'])
    for c in p1:
        c['questions'] = []
        for b in a3:
            if int(b['offset']) >= int(c['sentence']['offset']) and int(b['offset']) < int(c['sentence']['offset'])+int(c['sentence']['length']):
                c['questions'] += [b]
    p1=json.dumps(p1, ensure_ascii=False)
    models.Articles.objects.filter(identifier=a1).update(errors=p1, state='completed', comment=h)
    return HttpResponse('提交成功')

def web(request):

    if request.method == "GET":
        p= models.Articles.objects.all().values("identifier", "original", "state")
        p1= list(p)
        data={'data':p1}
        return JsonResponse(data)


def web3(request):
    s = request.POST
    s1=s.dict()

    a1=eval(s1['grade'])
    a2=eval(s1['region'])
    a3=eval(s1['time'])

    con = Q()

    if a1 != []:
        q1 = Q()
        q1.connector = 'OR'
        for n1 in a1:
            q1.children.append(('grade', n1))
        con.add(q1, 'AND')
    if a2 != []:
        q2 = Q()
        q2.connector = 'OR'
        for n2 in a2:
            q2.children.append(('region', n2))
        con.add(q2, 'AND')
    if a3 != []:
        h1=a3[0].split('-')
        h2=a3[1].split('-')
        h3=h1+h2
        h4=[]
        for i in h3:
            h4+=[int(i)]
        print(h4)
        q3 = Q()
        q3.connector = 'AND'
        t1=datetime.datetime(h4[0],h4[1],h4[2])
        t2=datetime.datetime(h4[3],h4[4],h4[5])
        q3.children.append(('time__gte',t1))
        q3.children.append(('time__lt',t2))
        con.add(q3, 'AND')

    p = models.Articles.objects.filter(con).values("identifier","title", "original", "state","time","grade","region")
    p1= list(p)
    p1=[s for s in p1 if s['state']=='waiting']
    data={'data':p1}
    response = JsonResponse(data)
    response["Access-Control-Allow-Origin"] = "*"
    return response     


def check(request):
    if request.method == "POST":
        s = request.POST.get('identifier')
        p = models.Articles.objects.filter(identifier=s).values('original', 'errors')
        m=list(p)[0]
        return JsonResponse(m)

        


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




