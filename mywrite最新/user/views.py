# coding=utf8
from django.shortcuts import render, redirect
from . import models
from Shop.models import Product 
from .forms import UserForm, RegisterForm
import hashlib
from django.http import JsonResponse,HttpResponseRedirect

# Create your views here.
def home(request):

    book1s = Product.objects.filter(category_id=1)[0:4]
    # 小说书刊
    book2s = Product.objects.filter(category_id=2)[0:4]
    # 时尚杂志
    book3s = Product.objects.filter(category_id=3)[0:4]
    # 儿童书刊
    book4s = Product.objects.filter(category_id=4)[0:4]
    # 明星传记
    book5s = Product.objects.filter(category_id=5)[0:4]
    # 励志书刊
    book6s = Product.objects.filter(category_id=6)[0:4]
    data = {
        'book1s': book1s,
        'book2s': book2s,
        'book3s': book3s,
        'book4s': book4s,
        'book5s': book5s,
        'book6s': book6s,
    }
    
    return render(request, 'user/home.html',data)


def login(request):

    if request.session.get('is_login', None):
        return redirect('/home/')

    if request.method == "POST":
        login_form = UserForm(request.POST)
        message = "请检查填写的内容！"
        if login_form.is_valid():
            username = login_form.cleaned_data['username']
            password = login_form.cleaned_data['password']
            try:
                user = models.UserInfo.objects.get(username=username)
                if user.password == hash_code(password):
                    request.session['is_login'] = True
                    request.session['user_id'] = user.uid
                    request.session['user_name'] = user.username
                    request.session['user_identity'] = user.identity
                    return redirect('/home')
                else:
                    message = "密码不正确！"

            except:
                message = "用户不存在！"
        return render(request, 'user/login.html', locals())

    login_form = UserForm()
    return render(request, 'user/login.html', locals())


def register(request):

    if request.session.get('is_login', None):
        return redirect("/home/")
    if request.method == "POST":
        register_form = RegisterForm(request.POST)
        message = "请检查填写的内容！"
        if register_form.is_valid():
            username = register_form.cleaned_data['username']
            password1 = register_form.cleaned_data['password1']
            password2 = register_form.cleaned_data['password2']
            email = register_form.cleaned_data['email']
            sex = register_form.cleaned_data['sex']
            identity = register_form.cleaned_data['identity']
            if password1 != password2:
                message = "两次输入的密码不同！"
                return render(request, 'user/register.html', locals())
            else:
                same_name_user = models.UserInfo.objects.filter(username=username)
                if same_name_user:
                    message = '用户已经存在，请重新选择用户名！'
                    return render(request, 'user/register.html', locals())
                same_email_user = models.UserInfo.objects.filter(email=email)
                if same_email_user:
                    message = '该邮箱地址已被注册，请使用别的邮箱！'
                    return render(request, 'user/register.html', locals())

                new_user = models.UserInfo.objects.create()
                new_user.username = username
                new_user.password = hash_code(password1)
                new_user.email = email
                new_user.sex = sex
                new_user.identity =identity 
                new_user.save()
                return redirect('/login')  # 自动跳转到登录页面
    register_form = RegisterForm()
    return render(request, 'user/register.html', locals())



def hash_code(s, salt='mywrite'):

    h = hashlib.sha256()
    s += salt
    h.update(s.encode())
    return h.hexdigest()

    

def logout(request):

    if not request.session.get('is_login', None):
        return redirect("/login")
    request.session.flush()
    return redirect("/home")


def personalinfo(request):
    if not request.session.get('is_login', None):
        return redirect("/login")    
    userinfo=request.session['user_name'] 
    thisuser = models.UserInfo.objects.filter(username=userinfo).first()
    context={'username' : thisuser.username,'email': thisuser.email,'thisuser': thisuser}
    return render(request, "user/personalinfo.html", context)



def editpassword(request):
    if not request.session.get('is_login', None):
        return redirect("/login")
    
    user_info=request.session['user_name']
    thisuser = models.UserInfo.objects.filter(username=user_info).first()
    if request.method == "POST":
        oldpassword = request.POST.get('oldpassword')
        newpassword = request.POST.get('newpassword')
        if thisuser.verify_password(oldpassword):
            thisuser.password = newpassword
            thisuser.save()
            return HttpResponseRedirect("/user/home/")
        else:  # 密码不对
            context = {'error_pwd': 1, 'oldpassword': oldpassword, 'newpassword': newpassword}
            return render(request, 'user/editpwd.html', context)
    else:
        context = {'error_pwd': 0, 'oldpassword': '', 'newpassword': ''}
        return render(request, 'user/editpwd.html',context)


def editaddress(request):
    if not request.session.get('is_login', None):
        return redirect("/login")

    user_info=request.session['user_name']
    userinfo1 = models.UserInfo.objects.filter(username=user_info)
    userinfo1= userinfo1.first()
    this_address = models.Address.objects.filter(userinfo_id=userinfo1.uid)

    if this_address.count() == 0:
        addressinfo = {
            'address': {
                'curaddress': '请设置收货地址',
                'province': '广东省',
                'city': '广州市',
                'district': '天河区',
                'detail': '',
                'getname': '',
                'getphone': '',
                'getcode': ''
            }
        }
        if request.method == 'POST':
            province = request.POST.get('province')
            city = request.POST.get('city')
            district = request.POST.get('district')
            adddetail = request.POST.get('adddetail')
            getphone = request.POST.get('getphone')
            getcode = request.POST.get('getcode')
            getname =request.POST.get('getname')
            newaddress = models.Address( province=province, city=city, district=district,
                                 detail=adddetail, get_name=getname, get_phone=getphone, get_code=getcode,userinfo_id=userinfo1.uid)
            newaddress.save()
            return HttpResponseRedirect("/address/")
    else:
        this_address = this_address.first()
        addressinfo = {
            'address': {
                'curaddress': this_address.getFullAddress(),
                'province': this_address.province,
                'city': this_address.city,
                'district': this_address.district,
                'detail': this_address.detail,
                'getname': this_address.get_name,
                'getphone': this_address.get_phone,
                'getcode': this_address.get_code,
            }
        }
        if request.method == 'POST':
            province = request.POST.get('province')
            city = request.POST.get('city')
            district = request.POST.get('district')
            adddetail = request.POST.get('adddetail')
            getname = request.POST.get('getname')
            getphone = request.POST.get('getphone')
            getcode = request.POST.get('getcode')
            this_address.province = province
            this_address.city = city
            this_address.district = district
            this_address.detail = adddetail
            this_address.get_name = getname
            this_address.get_phone = getphone
            this_address.get_code = getcode
            this_address.save()
            return HttpResponseRedirect("/address/")
    return render(request,"user/address.html",addressinfo)


def getaddress(request):
    if not request.session.get('is_login', None):
        return redirect("/login")

    user_info = request.session['user_name']
    userinfo1 = models.UserInfo.objects.filter(username=user_info)
    userinfo1 = userinfo1.first()
    this_address = models.Address.objects.filter(userinfo_id=userinfo1.uid)

    if this_address.count() == 0:
        return JsonResponse({
            'recode': 0,
            'remsg': '无地址',
            'data': {
                'error': '',
                'address': {
                    'province': '广东省',
                    'city': '广州市',
                    'district': '天河区',
                    'detail': ''
                }
            }
        })
    else:
        thisaddress = this_address.first()
        return JsonResponse({
            'recode': 1,
            'remsg': '获取地址成功',
            'data': {
                'error': '',
                'address': {
                    'province': thisaddress.province,
                    'city': thisaddress.city,
                    'district': thisaddress.district,
                    'detail': thisaddress.detail
                }
            }
        })
def package(request):
    m1 = request.session['user_name']
    p = models.UserInfo.objects.filter(username=m1).values('uid')
    p = list(p)[0]['uid']
    a = models.package.objects.filter(uid=p).values('surplus')
    a = list(a)[0]['surplus']
    return render(request,"user/package.html",{'a':a})




# def sms_captcha(request):
#     """短信验证码"""
#     code = Captcha.gene_text()
#     print('code:', code)
#     # 获取方式是/account/sms_captcha/?telephone=12345678900
#     telephone = request.GET.get('telephone')
#     result = aliyun.send_sms(telephone, code=code)  # 前端会用到该参数
#     print(telephone, code)
#     request.session['sms_captcha'] = code
#     return HttpResponse('success')


# def show(request):
#     user = request.session.get('user_name')
#     orders = OrderManage.objects.filter(author__exact=user).all()
#     for order in orders:
#         pass
#     return render(request, 'show.html',locals())

# '''订单添加'''
# def add(request):
#     if request.method == "POST":
#         order_form = OrderForm(request.POST)
#         message = "请检查输入内容"
#         if order_form.is_valid():
#             name = Store.objects.filter(id=order_form.cleaned_data['name']).all()[0]
#             num = order_form.cleaned_data['num']
#             price = order_form.cleaned_data['price']
#             c_time = request.POST.get('time')
#             customer = order_form.cleaned_data['customer_ser']
#             author = order_form.cleaned_data['author']
#             detail = order_form.cleaned_data['detail']
#             status = order_form.cleaned_data['status']
#             # print(status)   #状态显示还是数字
#         else:
#             return render(request, 'add.html', locals())
#         same_num_user = OrderManage.objects.filter(order_num=num)
#         if same_num_user:
#             message = "该订单号已经存在"
#             return render(request, 'add.html', locals())
#         # if request.session.user_name != author:
#         #         #     message = "请核对作者"
#         #         #     return render(request, 'add.html', locals())
#         new_order = OrderManage()
#         new_order.store_name = name
#         new_order.order_num = num
#         new_order.price = price
#         new_order.customer_ser = customer
#         new_order.author = author
#         new_order.c_time = c_time
#         new_order.o_detail = detail
#         new_order.status = status
#         new_order.save()
#         return render(request, 'show.html', locals())
#     order_form = OrderForm()
#     return render(request, 'add.html', locals())



# '''订单修改'''
# def modify(request, order_id):
#     user = request.session.get('user_name')
#     try:
#         order = OrderManage.objects.filter(id=order_id).all()[0]
#         if user != order.author:
#             message = "请勿修改他人订单"
#             return redirect("/index/show")
#     except:
#         message = "订单不存在"
#         return redirect('/index/show')
#     order_form = OrderForm()
#     if request.method == "POST":
#         order.e_time = request.POST.get('e_time')
#         if request.POST.get('status_name') == "制作":
#             order.status = 0
#         elif request.POST.get('status_name') == "测试":
#             order.status = 1
#         elif request.POST.get('status_name') == "退单":
#             order.status = 2
#         elif request.POST.get('status_name') == "完成":
#             order.status = 3
#         order.save()
#         return redirect('/index/show')
#     return render(request, 'modify.html',locals() )
# #我的订单
# def order(request):
#     context={}
#     orders = Orders.objects.filter(uid=request.session['vipuser']['id'])
#     for order in orders:
#         dlist = Detail.objects.filter(orderid=order.id)
#         order.detaillist = dlist
#         for detail in dlist:
#             goods = Goods.objects.get(id=detail.goodsid)
#             detail.picname = goods.picname
#     context['orders'] = orders
#     return render(request,'myweb/order.html',context)
# #个人中心
# def member(request):
#     return render(request,"myweb/member.html")