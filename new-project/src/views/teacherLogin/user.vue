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
        <el-menu-item index="3"><a href="http://localhost:8080/#/reward">我的报酬</a></el-menu-item>
        <div>|</div>
        <el-menu-item index="4"><a href="http://localhost:8080/#/login">退出</a></el-menu-item>
        <div>|</div>
        <el-menu-item index="5"><a href="http://localhost:8080/#/user">用户中心</a></el-menu-item>
        <div>|</div>
        <el-menu-item index="6"><a href="http://localhost:8080/#/shoppingCar">我的购物车</a></el-menu-item>
        <div>|</div>
        <el-menu-item index="7"><a href="http://localhost:8080/#/index">主页</a></el-menu-item>
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
      <div style="width:60%;margin-left:20%;display:flex;">
        <div style="margin-top:15px;width:200px;height:400px;border:1px solid #999;">
          <div style="margin:-1px 0 0 -10px ;width:220px;height:60px;background:#999;text-align:center;line-height:60px;"><img src="" alt=""><span style="color:#fff;font-size:20px;">我的听说</span></div>
          <!-- 侧边导航栏 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的交易</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" id="tab1" @click="myclick(1)">我的订单</el-menu-item>
              </el-menu-item-group> 
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>导航二</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" id="tab2" @click="myclick(2)">个人信息</el-menu-item>
                <el-menu-item index="2-2" id="tab3" @click="myclick(3)">修改密码</el-menu-item>
                <el-menu-item index="2-3" id="tab4" @click="myclick(4)">收货地址</el-menu-item>
              </el-menu-item-group> 
            </el-submenu>
          </el-menu>
        </div>
        <!-- 我的订单 -->
        <div style="margin:15px 0 0 50px ;display:block;" class="tab_css" id="tab1_content">
          <div style="width:780px;height:60px;line-height:50px;background:#999;border:1px solid #ddd;color:#fff;font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 我的订单</div>
          <div style="width:780px;height:340px;background:#fff;border:1px solid #ddd;border-top:0;">
            <table></table> <!--防止父元素高度坍塌 -->
            <div style="margin:75px 0 25px 100px;color:#333;font-size:18px;">当前信息：</div>
            <div style="margin:25px 0 5px 136px;color:#555;">
              <div style="margin-bottom:10px;">用户名：</div>
              <div style="margin-bottom:10px;">邮箱：</div>
              <div style="margin-bottom:10px;">手机号</div>
            </div>  
          </div>
        </div>
        <!-- 个人信息 -->
        <div style="margin:15px 0 0 50px ;display:none;" class="tab_css" id="tab2_content">
          <div style="width:780px;height:60px;line-height:50px;background:#999;border:1px solid #ddd;color:#fff;font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 个人信息</div>
          <div style="width:780px;height:340px;background:#fff;border:1px solid #ddd;border-top:0;">
            <table></table> <!--防止父元素高度坍塌 -->
            <div style="margin:75px 0 25px 100px;color:#333;font-size:18px;">当前信息：</div>
            <div style="margin:25px 0 5px 136px;color:#555;">
              <div style="margin-bottom:10px;">用户名：</div>
              <div style="margin-bottom:10px;">邮箱：</div>
              <div style="margin-bottom:10px;">手机号</div>
            </div>  
          </div>
        </div>
        <!-- 修改密码 -->
        <div style="margin:15px 0 0 50px ;display:none;" class="tab_css" id="tab3_content">
          <div style="width:780px;height:60px;line-height:50px;background:#999;border:1px solid #ddd;color:#fff;font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 修改密码</div>
          <div style="width:780px;height:340px;background:#fff;border:1px solid #ddd;border-top:0;">
            <table></table> <!--防止父元素高度坍塌 -->
            <form style="margin:70px 0 0 120px;">
              <p style="margin-left:64px;">旧密码: <input type="password" placeholder="6-20位非中文字符" style="width:200px;height:30px;"/></p>
              <p style="margin-left:64px;">新密码: <input type="password" placeholder="6-20位非中文字符" style="width:200px;height:30px;"/></p>
              <p>重新输入新密码: <input type="password" placeholder="6-20位非中文字符" style="width:200px;height:30px;"/></p>
              <input type="submit" value="提交" style="width:80px;height:35px;margin:20px 0 0 174px;font-size:15px;color:#fff;background:#ff2832;border:0;border-radius:3px;"/>
            </form>  
          </div>
        </div>
        <!-- 收货地址 -->
        <div style="margin:15px 0 0 50px ;display:none;" class="tab_css" id="tab4_content">
          <div style="width:780px;height:60px;line-height:50px;background:#999;border:1px solid #ddd;color:#fff;font-size:20px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| 收货地址</div>
          <div style="width:780px;height:500px;background:#fff;border:1px solid #ddd;border-top:0;">
            <table></table> <!--防止父元素高度坍塌 -->
            <form style="margin:70px 0 0 120px;">
              <p style="margin-left:64px;">收件人: <input type="password" placeholder="请输入收件人姓名" style="width:200px;height:30px;"/></p>
              <p style="margin-left:64px;">手机号: <input type="password" placeholder="请输入手机号" style="width:200px;height:30px;"/></p>
              <p style="margin-left:48px;">邮政编码: <input type="password" placeholder="请输入邮政编码" style="width:200px;height:30px;"/></p>
              <!-- 省市区级联菜单 -->
              <p style="margin-left:48px;padding-bottom:10px;">收货地址：<v-distpicker province="山西省" city="太原市" area="小店区" style="margin:-22px 0 0 72px ;width:380px;"></v-distpicker></p>
              <p style="margin-left:48px;padding:0;">详细地址：<br><textarea cols="40" rows="5" style="margin-left:72px;"></textarea></p>
              <input type="submit" value="提交" style="width:80px;height:35px;margin:20px 0 0 222px;font-size:15px;color:#fff;background:#ff2832;border:0;border-radius:3px;"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'

export default {
  // 省市区级联组件
  components: { VDistpicker },
  data(){
    return{
      activeIndex:"5",
      tabPosition: 'left'
    }
  },
  mounted(){},
  created(){},
  methods:{
    handleSelect(){},
    handleOpen(){},
    handleClose(){},
    // tabs点击事件
    myclick(v){
      var elems = $(".tab_css");
      for(var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if(elem == $("#tab" + v + "_content")[0]) {
          elem.style.display = "block";
        } else {
          elem.style.display = "none";
        }
      }
    },

  }  
}
</script>
<style scoped>
p{
  margin-bottom:0;
}
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
  display:inline-block;
  width:100%;height:100%;
  text-decoration:none;
}
</style>
<style>
.distpicker-address-wrapper select{
  padding:0;width:100px;height:25px;
}
</style>