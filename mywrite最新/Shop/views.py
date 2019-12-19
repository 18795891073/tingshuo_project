from django.shortcuts import render, redirect
from.models import Product,Category,Cart,PayCart
from user.models import UserInfo
from django.http import  HttpResponseRedirect,JsonResponse
from user.models import Address

# Create your views here.

# 商品列表
def prodetail(request):
    pid = request.GET.get('pid')
    product=Product.objects.filter(pid=pid).first()  #产品
    category=Category.objects.filter(cid=product.category_id).first()
    imglist = product.pdImage.split('##')  # 商品图片地址
    price=(float(product.pdprice)*float(product.discount)/10)  #折扣价
    books = Product.objects.filter(category_id=product.category_id)[0:3]
    data={
        'product':product,
        'category':category,
        'imglist':imglist,
        'price':price,
        'books':books,
    }
    return render(request, "Shop/detail1.html", data)


# Add to cart
def addtocart(request):   #添加至购物车
    a=request.session['user_name']
    thisuser = UserInfo.objects.filter(username=a).first()
    if request.method == "POST":
        product_pid = request.POST.get('product_pid')    # 获取pid
        userinfo_id = thisuser.uid              # 用户id
        pnum = request.POST.get('pnum')          # 数量
        sumprice = request.POST.get('sumprice')
        thiscart = Cart.objects.filter(product_id=product_pid,  userinfo_id= userinfo_id).all()
        if len(thiscart) == 0:
            newcart = Cart(product_id=product_pid,  userinfo_id= userinfo_id,pnum=pnum,sumprice=sumprice)
            newcart.save()
        # else:
        #     thiscart[0].pnum = thiscart[0].pnum + pnum # 更改数量
        #     thisuser[0].sumprice =round(float(thisuser[0].sumprice)  + float(sumprice) ) # 更改价格
        #     thiscart[0].save()
        allcart = Cart.objects.filter(userinfo_id= userinfo_id).count()    # 购物车数量
        return JsonResponse({
            'recode': 1,
            'remsg': '添加成功',
            'data': {
                'error': '',
                'allcart': allcart
            }
        })
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})



# 获取购物车数目
def getcartnum(request):
    if request.method == "GET":
        try:

            userinfo=request.session['user_name']
            thisuser = UserInfo.objects.filter(username=userinfo).first()
            userinfo_id = thisuser.uid  # 用户id
            allcart = Cart.objects.filter(userinfo_id=userinfo_id).count()  # 购物车数量
            return JsonResponse({'recode': 1, 'remsg': '获取成功', 'data': {'error': '', 'allcart': allcart}})

        except:
            return JsonResponse({'recode': 1, 'remsg': '获取成功', 'data': {'error': '','allcart': 0}})




#  展示购物车
def showCart(request):
    if not request.session.get('is_login', None):
        return redirect("/login")
    a = request.session['user_name']
    thisuser = UserInfo.objects.filter(username=a).first()
    userinfo_id = thisuser.uid  # 用户id
    allcart = Cart.objects.filter(userinfo_id=userinfo_id).all()
    allcartnum = Cart.objects.filter(userinfo_id=userinfo_id).count()  # 购物车数量

    data={

        'allcartnum': allcartnum,
        'allcart': allcart ,
    }
    return render(request,'Shop/ShowCart.html',data)


# 增加商品
def add_goods(request):
    if request.method == 'POST':
        a = request.session['user_name']
        thisuser = UserInfo.objects.filter(username=a).first()
        userinfo_id = thisuser.uid  # 用户id
        product_pid = request.POST.get('product_pid')
        data = {}
        cart = Cart.objects.filter(userinfo_id=userinfo_id,product_id=product_pid).first()
        if cart:
            cart.sumprice = round (float(cart.sumprice) / cart.pnum * (cart.pnum + 1),2)
            cart.pnum += 1
            cart.save()
            data['msg'] = '请求成功'
            return JsonResponse(data)



#减少商品
def sub_goods(request):
    if request.method == 'POST':
        a = request.session['user_name']
        thisuser = UserInfo.objects.filter(username=a).first()
        userinfo_id = thisuser.uid  # 用户id
        product_pid = request.POST.get('product_pid')
        data = {}
        cart = Cart.objects.filter(userinfo_id=userinfo_id, product_id=product_pid).first()
        if cart:
            if cart.pnum == 1:
                data['msg'] = '亲! 至少买一个吧'
            else:
                cart.sumprice = round (float(cart.sumprice) / cart.pnum * (cart.pnum - 1),2)
                cart.pnum -= 1
                cart.save()
                data['msg'] = '请求成功'
                return JsonResponse(data)
        else:
            data['msg'] = '请添加商品'
            return JsonResponse(data)

#  减少数目
def delCart(request):
    if request.method == 'GET':
        a=request.session['user_name']
        thisuser = UserInfo.objects.filter(username=a).first()
        userinfo_id = thisuser.uid  # 用户id
        product_pid = request.GET.get('pid')
        Cart.objects.filter(userinfo_id=userinfo_id, product_id=product_pid).delete()
        return HttpResponseRedirect("/showcart/")

# 支付
def cash_payment(request):
    if request.method == 'POST':
        allcartpay = PayCart.objects.filter().all()
        a=request.session['user_name']
        if allcartpay != '':
            PayCart.objects.filter().all().delete()
        thisuser = UserInfo.objects.filter(username=a).first()
        userinfo_id = thisuser.uid  # 用户id
        cartlist = request.POST.get("cartlist")  #支付的购物车id
        cartlist = cartlist.split('#')
        for list in cartlist:
            if list !='':
                list= int(list)
                newcart= Cart.objects.filter(cid=list).first()
                cartpay=PayCart(cart_id=newcart.cid)
                cartpay.save()
        allcart = Cart.objects.filter(userinfo_id=userinfo_id).all()
        this_address = Address.objects.filter(userinfo_id=userinfo_id).first()
        print(this_address) 
        Clist= PayCart.objects.filter().all() 
        if this_address is None:
            return HttpResponseRedirect("/address/")
        else:

            data = {
                'allcart': allcart,
                'curaddress': this_address.getFullAddress(),
                'Clists':Clist,
                 }
            return render(request, 'Shop/pay.html', data)