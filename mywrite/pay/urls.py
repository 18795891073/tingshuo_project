from django.conf.urls import url
urlpatterns = [
 url(r'^pay$', OrderPayView.as_view(),name="pay"),#����֧��
 url(r'^check$', CheckPayView.as_view(),name="check"), #��ѯ֧�����׽��
]
