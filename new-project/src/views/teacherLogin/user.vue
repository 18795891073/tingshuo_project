<template>
  <div>
    <div>
      <!-- 导航栏 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" style="background:#f2f2f2;display:flex;justify-content:center;align-items:center;" mode="horizontal" @select="handleSelect">
        <div style="margin-right:10px;font-size:13px;color:#999;">欢迎来到听说科技</div>
        <el-menu-item index="1">欢迎您：222</el-menu-item>
        <div>|</div>
        <el-menu-item index="2"><a href="http://localhost:8080/#/check">作文批改</a></el-menu-item>
        <div>|</div>
        <el-menu-item index="3">我的报酬</el-menu-item>
        <div>|</div>
        <el-menu-item index="4">退出</el-menu-item>
        <div>|</div>
        <el-menu-item index="5">用户中心</el-menu-item>
        <div>|</div>
        <el-menu-item index="6">我的购物车</el-menu-item>
        <div>|</div>
        <el-menu-item index="7"><a href="http://localhost:8080/#/index" >主页</a></el-menu-item>
      </el-menu>
      <!-- 正文内容 -->
      <div style="width:60%;margin-left:20%;">
        <!-- logo + 输入框 + 购物车 -->
        <div style="margin-top:45px;display:flex;justify-content:space-between;height:42px;align-items:center;">
          <img src="../../assets/images/logo.png" alt="图片加载失败" >
          <div style="width:600px;height:42px;border:1px solid #FF2832;display:flex;align-items:center;border-radius:3px;">
            <img src="../../assets/images/search.png" alt="图片加载失败" style="margin:0 5px 0 10px;">
            <input type="text" style="width:480px;height:40px;border:0;outline:none;">
            <button style="width:120px;height:42px;border:0;background:#FF2832;">搜索</button>
          </div>
          <div style="display:flex;align-items:center;width:220px;height:40px;border:1px solid #dddddd;border-radius:3px;">
            <img src="../../assets/images/shopping_car.png" alt="图片加载失败" style="width:25p;height:25px;margin:0 32px 0 8px">
            <span style="font-size:16px;color:#999;">我的购物车</span>
            <div style="margin-left:32px;width:43px;height:42px;background:#ff2832;line-height:40px;text-align:center;font-weight:bolder;">0</div>
          </div>
        </div>
        <!-- logo -->
        <div style="width:200px;height:40px;color:#000;text-align:center;line-height:40px;border-radius:3px;margin:50px 0 0 -28px;font-size:15px;color:#fff;">
          <img src="../../assets/images/logo.png" alt="图片加载失败" >
        </div>
      </div>
      <div style="width:60%;margin-left:20%;">
        <div style="margin-top:15px;width:200px;height:400px;border:1px solid #999;">
          <div style="margin:-1px 0 0 -10px ;width:220px;height:60px;background:#999;text-align:center;line-height:60px;"><img src="" alt=""><span>我的听说</span></div>
          <ul class="sidebar_ul" style="margin-top:35px;">
            <li>我的交易</li>
            <li>我的订单</li>
            <li>个人中心</li>
            <li>个人信息</li>
            <li>修改密码</li>
            <li>收货地址</li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeIndex:"1"
    }
  },
  mounted(){},
  created(){},
  methods:{
    handleSelect(){},
  }
}
</script>
<style scoped>
.sidebar_ul{
  padding:0;
}
.sidebar_ul li{
  list-style: none;
  width:200px;height:40px;
  text-align:center;
  line-height:40px;
  cursor: pointer;
  font-size:15px;
  color:#777777;
  margin-top:6px;
}
ul li:hover{
  color:#f00;
  background:#dddddd;
}
a{
  text-decoration:none;
}
</style>