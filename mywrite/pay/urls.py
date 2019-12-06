from django.conf.urls import url
urlpatterns = [
 url(r'^pay$', OrderPayView.as_view(),name="pay"),#订单支付
 url(r'^check$', CheckPayView.as_view(),name="check"), #查询支付交易结果
]
