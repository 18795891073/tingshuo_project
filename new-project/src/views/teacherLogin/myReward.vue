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
      <div style="width:70%;height:820px;margin-left:15%;border:1px solid #999;text-align:center;font-size:20px;color:#009688;padding:20px;">这个是报酬页面
          <div style="width:80%;height:80%;border:1px solid #f00;margin-left:10%;">
              <div style="margin:30px 0 0 230px;width:600px;height:50px;border:1px solid #0ff;" v-for="(item,index) in countryList" :key="index">
                  <i class="el-icon-view"></i>
                  <span>{{countryList[index]}}</span>
                  <input type="text" style="width:350px;height:40px;margin-top:2px;">
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeIndex:"3",
      countryList:['中国','美国','英国','法国','俄罗斯']
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
a{
  display:inline-block;
  width:100%;height:100%;
  text-decoration: none;
}
</style>