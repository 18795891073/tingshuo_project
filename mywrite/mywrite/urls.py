
from django.contrib import admin
from django.conf.urls import url
from user import views as user
from Shop import views as shop
from adminuser import views as ad
from writing import views as writ
from django.conf.urls import include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'^$', user.home),
    url(r'^home/$', user.home),
    url(r'^login/$', user.login),
    url(r'^register/$', user.register),
    url(r'^logout/$', user.logout),
    url(r'^personalinfo/$', user. personalinfo),
    url(r'^address/$',user.editaddress,name='address'),
    url(r'^getaddress/$', user.getaddress),
    url(r'^editpwd/$',user.editpassword,name='eidtpwd'),
    url(r'^package/$',user.package,name='package'),
    url(r'^captcha/', include('captcha.urls')),
    url(r'^write/$', writ.write),
    url(r'^submit/$', writ.submit),
    url(r'^correct/$', writ.correct),
    url(r'^correct1/$', writ.correct1),
    url(r'^load/$', writ.load),
    url(r'^complete/$', writ.complete),
    url(r'^web/$',writ.web, name='web'),
    url(r'^web3/$',writ.web3, name='web3'),
    url(r'^check/$', writ.check),
    url(r'^jieshou/$', writ.jieshou, name='jieshou'),
    url(r'^detail/$', shop.prodetail, name='detail'),  # 详细页面
    url(r'^addtocart/$', shop.addtocart, name='addtocart'), # 添加到购物车
    url(r'^getcartnum1/$', shop.getcartnum, name='getcartnum'),  # 添加到购物车
    url(r'^showcart/$',shop.showCart,name='showcart'), # 展示购物车
    url(r'^addgoods1/$',shop.add_goods,name='addgoods'),
    url(r'^subgoods1/$',shop.sub_goods,name='subgoods'),
    url(r'^deletcart/$',shop.delCart,name='deletcart'),  # 删除购物车的商品
    url(r'^cash_pay/$',shop.cash_payment,name='cash_pay'),
    url(r'^adlogin/$', ad.adminlogin, name='adminlogin'),
    url(r'^adlogout/$', ad.logout, name='admin.logout'),
    url(r'^index/$', ad.admin_index, name='admin_index'),
    url(r'^imagefile/$', ad.imagemanage, name='imagemanage'),
    url(r'^imageupload/$', ad.imageupload, name='imageupload'),
    url(r'^categorym/$', ad.categorym, name='categorym'),
    url(r'^newfcategory/$', ad.newfcategory, name='newfcategory'),
    url(r'^categorydelete/$', ad.categorydelete, name='categorydelete'),
    url(r'^addproduct/$', ad.addproduct, name='addproduct'),
    url(r'^productm/newproduct/$', ad.newproduct, name='newproduct'),
    url(r'^product_list/$',ad.admin_product_list,name='product_list'),
    url(r'^prodelete/$', ad.prodelete, name='prodelete'),
    url(r'^modproduct/$', ad.modproduct, name='modproduct'),
    url(r'^modproductdata/$', ad.modproductdata, name='modproductdata'), 
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
