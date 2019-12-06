from django.shortcuts import render
from .models import User ,ImageRecord
from django.http import JsonResponse, HttpResponseRedirect
import os
from .timestamp import TimeStamp
from PIL import Image
from Shop.models import Category,Product
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from functools import wraps
from django.contrib.auth.decorators import login_required

# Create your views here.

def adminlogin(request):
    params = {'tip': ''}
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username != "" and password != "":
            thisuser = User.objects.filter(username=username)
            if thisuser.count() == 0:
                params['tip'] = "用户不存在"
            else: 
                params['tip'] = '登录成功'
                request.session["adminuser"] = {'islogin': True, 'username': thisuser.first().username,
                                                'root': thisuser.first().root}
                return HttpResponseRedirect("/index/")
        else:
            params['tip'] = "用户名或密码不能为空"
    return render(request, 'admin/login.html', params)


def admin_index(request):
    a=request.session["adminuser"]
    return render(request, 'admin/admin_index.html', {'userinfo': a})

def logout(request):
    userinfo=request.session["adminuser"]
    if userinfo['islogin'] is True:
        request.session.pop("adminuser")  # 清空session
        return HttpResponseRedirect('/admin/login/')


def imagemanage(request):
    userinfo=request.session["adminuser"]

    thisimg = ImageRecord.objects.filter().all()
    paginator = Paginator(thisimg, 16)
    page = request.GET.get('page_num')
    try:
        current_page = paginator.page(page)  # 指定 page 页面中的内容
    except PageNotAnInteger:  # 传入参数不为整数，显示第一页
        current_page = paginator.page(1)
    except EmptyPage:  # 参数为空，显示最后一页面
        current_page = paginator.page(paginator.num_pages)

    timestamp = TimeStamp()
    return render(request, 'admin/file_manager.html',
                  {'imglist': current_page, 'timestamp': timestamp, 'userinfo': userinfo,'page':current_page})
# save image
def imageupload(request):
    if request.method == 'POST':
        imglist = request.FILES.getlist('imgfile')
        baseurl = os.path.dirname(__file__).replace('\\', '/')
        try:
            imgurl = []
            for i in range(0, len(imglist)):
                timestamp = TimeStamp().gettimestamp()
                imgfolder = os.path.join(baseurl + '/static/uploadimg/', str(timestamp) + '_' + imglist[i].name)
                Image.open(imglist[i]).save(imgfolder)
                thisurl ='/static/uploadimg/' + str(timestamp) + '_' + imglist[i].name
                imgurl.append({
                    'name': str(timestamp) + '_' + imglist[i].name,
                    'url': thisurl,
                    'addtime': TimeStamp().stamptotime(timestamp)
                })
                newimg = ImageRecord(url=thisurl, addtime=timestamp)
                newimg.save()
            return JsonResponse({'recode': 1, 'remsg': '上传图片成功', 'data': {'error': '', 'imglist': imgurl}})
        except:
            return JsonResponse({'recode': 0, 'remsg': '上传图片失败', 'data': {'error': '上传图片失败'}})
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})

# 新增加种类

def categorym(request):
    userinfo=request.session["adminuser"]
    categorys = Category.objects.filter().all()
    return render(request, 'admin/categorym.html',
                  {'userinfo': userinfo, 'recode': 0, 'categorys': categorys,  'remsg': '',
                   'data': {'error': ''}})

def newfcategory(request):
    if request.method == 'POST':
        fcategory = request.POST.get('fcategory')
        if fcategory == "":
            return JsonResponse({
                'recode': 0,
                'remsg': '种类不能为空',
                'data': {
                    'error': '种类不能为空'
                }
            })
        thiscategory = Category.objects.filter(kind=fcategory).all()
        if len(thiscategory) != 0:
            return JsonResponse({
                'recode': 0,
                'remsg': '已有该种类',
                'data': {
                    'error': '已有该种类'
                }
            })
        else:
            newcategory = Category(kind=fcategory)
            newcategory.save()
            return JsonResponse({
                'recode': 1,
                'remsg': '添加成功',
                'data': {
                    'error': ''
                }
            })
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})


def categorydelete(request):
    if request.method == 'POST':
        cid = request.POST.get('cid')
        Category.objects.filter(cid=cid).delete()
        return JsonResponse({'recode': 1, 'remsg': '删除成功', 'data': {'error': ''}})
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})


def addproduct(request):
    userinfo=request.session["adminuser"]
    categorys = Category.objects.filter().all()     #种类
    return render(request, 'admin/addproduct.html',
                  {'userinfo': userinfo, 'recode': 0, 'categorys':categorys , 'remsg': '',
                   'data': {'error': ''}})


def newproduct(request):
    if request.method == 'POST':
        first = request.POST.get('first')
        proname = request.POST.get('proname')
        proprice = request.POST.get('proprice')
        discount = request.POST.get('discount')
        imglink = request.POST.getlist('imglink[]')
        pdInfo = request.POST.get('proname')
        imglink = '##'.join(imglink)
        if first == "" or proname == "" or proprice == "" or discount == "" or imglink == "" or pdInfo == "":
            return JsonResponse({'recode': 0, 'remsg': '产品参数不能存在空值', 'data': {'error': '产品参数不能存在空值'}})
        else:
            newpro = Product( category_id=first, pdname=proname, pdprice=float(proprice),
                             discount =float(discount)
                             , pdImage=imglink,  pdInfo=pdInfo,)
            newpro.save()
            return JsonResponse({'recode': 1, 'remsg': '添加成功', 'data': {'error': ''}})
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})


# 商品列表分页展示

def admin_product_list(request):
    products = Product.objects.filter().all()
    paginator = Paginator(products, 4)
    page = request.GET.get('page_num')
    try:
        current_page = paginator.page(page)  # 指定 page 页面中的内容
    except PageNotAnInteger:  # 传入参数不为整数，显示第一页
        current_page = paginator.page(1)
    except EmptyPage:  # 参数为空，显示最后一页面
        current_page = paginator.page(paginator.num_pages)
    data = {
        'products': current_page.object_list,
        'page':current_page
    }
    return render(request, 'admin/product_list.html',data)


def prodelete(request):
    if request.method == 'GET':
        pid = request.POST.get('p_id')
        Product.objects.filter(pid=pid).delete()
    return HttpResponseRedirect('/product_list/')


def modproduct(request):
    
    categorys = Category.objects.filter().all()  #种类
    pid = request.GET.get('p_id')
    thispro = Product.objects.filter(pid=pid).first()
    imglist = thispro.pdImage.split('##')   # 商品图片地址
    return render(request, 'admin/modproduct.html',
                  {'thispro': thispro, 'recode': 0, 'categorys': categorys, 'remsg': '',
                   'data': {'error': ''},'imglist':imglist})


def modproductdata(request):
    pid = request.GET.get('p_id')
    if request.method == 'POST':
        first = request.POST.get('first')
        proname = request.POST.get('proname')
        proprice = request.POST.get('proprice')
        discount = request.POST.get('discount')
        imglink = request.POST.getlist('imglink[]')
        pdInfo = request.POST.get('pdInfo')
        imglink = '##'.join(imglink)
        if first == "" or proname == "" or proprice == "" or discount == "" or imglink == "" \
                or  pdInfo == "":
            return JsonResponse({'recode': 0, 'remsg': '产品参数不能存在空值', 'data': {'error': '产品参数不能存在空值'}})
        else:
            thispro = Product.objects.filter(pid=pid).first()
            if thispro is None:
                return JsonResponse({'recode': 0, 'remsg': '产品不存在', 'data': {'error': '产品不存在'}})
            else:
                thispro.pdname = proname
                thispro.category_id = first
                thispro.pdprice = float(proprice)
                thispro.discount = float(discount)
                thispro.pdImage = imglink
                thispro. pdInfo = pdInfo
                thispro.save()
                return JsonResponse({'recode': 1, 'remsg': '修改成功', 'data': {'error': ''}})
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})





