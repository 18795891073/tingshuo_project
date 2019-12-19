# coding=utf8
from alipay import AliPay
from django.conf import settings
import os
from django.http import JsonResponse

class OrderPayView(View):
    def post(self, request):
        
        user = request.user
        if not user.is_authenticated():
            return JsonResponse({"res": 0, "errmsg": "用户未登录"})
        
        order_id = request.POST.get('order_id')
        
        if not order_id:
            return JsonResponse({"res": 1, "errmsg": "无效的订单id"})
        try:
            
            order = OrderInfo.objects.get(order_id=order_id,user=user,pay_method=3,order_status=1)
        except OrderInfo.DoesNotExist:
            return JsonResponse({"res": 2, "errmsg": "订单错误"})
        
        alipay = AliPay(
            appid="2019092300568545",   
            app_notify_url=None,  
            app_private_key_path=os.path.join(settings.BASE_DIR, "apps/order/app_private_key.pem"), 
            alipay_public_key_path=os.path.join(settings.BASE_DIR, "apps/order/app_public_key.pem"),
            sign_type="RSA2",  
            debug = True  
        )
        

        total_pay = order.total_price + order.transit_price 
        order_string = alipay.api_alipay_trade_page_pay(
            out_trade_no=order_id,  
            total_amount=str(total_pay), 
            subject="ÌìÌìÉúÏÊ%s"%order_id, 
            return_url=None,
            notify_url=None
        )
       
        pay_url = "https://openapi.alipaydev.com/gateway.do?"+order_string
        return JsonResponse({"res": 3, "pay_url": pay_url})




class CheckPayView(View):
    def post(self,request):
        
        user = request.user
        if not user.is_authenticated():
            return JsonResponse({"res": 0, "errmsg": "用户未登录"})
        
        order_id = request.POST.get("order_id")
        
        if not order_id:
            return JsonResponse({"res": 0, "errmsg": "用户未登录"})
        
        order_id = request.POST.get("order_id")

        
        if not order_id:
            return JsonResponse({"res": 1, "errmsg": "无效的订单id"})
        try:
            order = OrderInfo.objects.get(order_id=order_id, user=user, pay_method=3, order_status=1)
        except OrderInfo.DoesNotExist:
            return JsonResponse({"res": 2, "errmsg" :"订单错误"})
        

        alipay = AliPay(
            appid= '2016092200568545',
            app_notify_url=None,
            app_private_key_path=os.path.join(settings.BASE_DIR, "apps/order/app_private_key.pem"),  
            alipay_public_key_path=os.path.join(settings.BASE_DIR, "apps/order/app_public_key.pem"),  
            sign_type="RSA2",
            debug=True
        )
        while True:
            response = alipay.api_alipay_trade_query(order_id)
            code = response.get("code")
            
            if code == "10000" and response.get("trade_status") == "TRADE_SUCCESS":
                

                trade_no = response.get("trade_no")
                
                order.trade_no = trade_no
                order.order_status = 4  
                order.save()
                return JsonResponse({"res": 3, "message": "支付成功"})
            
            elif code == "40004" or (response.get("trade_status") == "WAIT_BUYER_PAY"):
                
                
                import time
                time.sleep(5)
                continue
            else:
                
                return JsonResponse({"res": 4, "errmsg": "支付失败"})
