<template>
  <div>
    <div>
      <!-- 导航栏 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" style="background:#f2f2f2;display:flex;justify-content:center;align-items:center;" mode="horizontal" @select="handleSelect">
        <div style="margin-right:10px;font-size:13px;color:#999;">欢迎来到听说科技</div>
        <el-menu-item index="1">欢迎您：222</el-menu-item>
        <div>|</div>
        <el-menu-item index="2">作文批改</el-menu-item>
        <div>|</div>
        <el-menu-item index="3">我的报酬</el-menu-item>
        <div>|</div>
        <el-menu-item index="4">退出</el-menu-item>
        <div>|</div>
        <el-menu-item index="5">用户中心</el-menu-item>
        <div>|</div>
        <el-menu-item index="6">我的购物车</el-menu-item>
        <div>|</div>
        <el-menu-item index="7">主页</el-menu-item>
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
        <!-- 商品分类导航栏 -->
        <div style="width:200px;height:40px;color:#000;background:#ff2832;text-align:center;line-height:40px;border-radius:3px;margin-top:50px;font-size:15px;color:#fff;">全部商品分类</div>
      </div>
      <div style="border:1.5px solid #ff2832;width:100%;"></div>
      <!-- 轮播图 + 侧边栏 -->
      <div style="width:60%;margin-left:20%;">
        <!-- 左侧边栏 -->
        <div>
          <ul>
            <li style="display:flex;align-items:center;width:200px;height:60px;border:1px solid #dddddd;">
              <span>初一套餐</span>
              <img src="../../assets/images/turn_right.png" alt="图片加载失败">
            </li>
            <li style="display:flex;align-items:center;width:200px;height:60px;border:1px solid #dddddd;">
              <span>初二套餐</span>
              <img src="../../assets/images/turn_right.png" alt="图片加载失败">
            </li>
            <li style="display:flex;align-items:center;width:200px;height:60px;border:1px solid #dddddd;">
              <span>初三套餐</span>
              <img src="../../assets/images/turn_right.png" alt="图片加载失败">
            </li>
            <li style="display:flex;align-items:center;width:200px;height:60px;border:1px solid #dddddd;">
              <span>高一套餐</span>
              <img src="../../assets/images/turn_right.png" alt="图片加载失败">
            </li>
            <li style="display:flex;align-items:center;width:200px;height:60px;border:1px solid #dddddd;">
              <span>高二套餐</span>
              <img src="../../assets/images/turn_right.png" alt="图片加载失败">
            </li>
            <li style="display:flex;align-items:center;width:200px;height:60px;border:1px solid #dddddd;">
              <span>高三套餐</span>
              <img src="../../assets/images/turn_right.png" alt="图片加载失败">
            </li>
          </ul>
        </div>
        <!-- 轮播 -->
        <div>
          
        </div>
        <!-- 右侧边栏 -->
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeIndex:"1",

    }
  },
  mounted(){},
  created(){},
  methods:{
    handleSelect(key,keyPath){
      console.log(key,keyPath)
    },
  },
}
</script>
<style scoped>
  ul{
    margin:0;padding:0;
  }
  li{
    list-style:none;
  }
  li span{
    display:inline-block;
    margin:0 15px 0 62px;
  }
  li img{
    width:25px;height:25px;
    margin-left:30px;
  }
</style>>

