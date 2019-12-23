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
        <!-- 商品分类导航栏 -->
        <div style="width:200px;height:40px;color:#000;background:#ff2832;text-align:center;line-height:40px;border-radius:3px;margin-top:50px;font-size:15px;color:#fff;">全部商品分类</div>
      </div>
      <div style="border:1.5px solid #ff2832;width:100%;"></div>
      <!-- 轮播图 + 侧边栏 -->
      <div style="width:60%;margin-left:20%;display:flex;">
        <!-- 左侧边栏 -->
        <div>
          <ul class="sideerbar_ul">
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
        <div style="width:732px;height:372px;">
          <el-carousel :interval="2000" arrow="always">
            <el-carousel-item v-for="(item,index) in items" :key="index">
              <div>
                <img :src="item.src" alt="图片加载失败" style="width:732px;height:372px;">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 右侧边栏 -->
        <div style="width:200px;height:372px;">
          <div><img src="../../assets/images/right_1.jpg" alt="图片加载失败" style="display:inline-block;margin-top:15px;width:200px;"></div>
          <div><img src="../../assets/images/right_2.jpg" alt="图片加载失败" style="display:inline-block;margin-top:15px;"></div>
        </div>
      </div>
      <!-- 页脚说明 -->
      <div class="footer">
        <!-- <div style="width:100%;border:1px solid #999;"></div> -->
        <ul class="footer_ul">
          <li>关于听说</li>
          <li>|</li>
          <li>加入听说</li>
          <li>|</li>
          <li>下载中心</li>
          <li>|</li>
          <li>常见问题</li>
          <li>|</li>
          <li>渠道联盟</li>
        </ul>
        <div style="font-size:13px;color:#777;">Copyright © 2008-2019 南京听说科技有限公司 All Rights Reserved 电信增值业务许可证:苏B2-20160570</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeIndex:"7",
      items:[
        {src:require('../../assets/images/carousel_1.jpg')},
        {src:require('../../assets/images/carousel_2.jpg')},
        {src:require('../../assets/images/carousel_3.jpg')},
        {src:require('../../assets/images/carousel_4.jpg')},
        {src:require('../../assets/images/carousel_5.jpg')},
        {src:require('../../assets/images/carousel_6.jpg')}
      ],
      index:0,
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
  .sideerbar_ul{
    cursor: pointer;
  }
  .sideerbar_ul li:hover{
    background:#999;
    color:#f00;
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
  /* 轮播样式 */
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .footer{
    position:absolute;
    left:36%;
    bottom:45px;
  }
  .footer ul{
    margin:80px 0 30px 120px;
    display:flex;
  }
  .footer ul li{
    list-style: none;
    margin-right:10px;
    font-size:13px;
    color:#777;
    cursor: pointer;
  }
  .footer_ul li:hover{
    color:#999;
  }
  a{
    display:inline-block;
    width:100%;height:100%;
    text-decoration: none;
  }
</style>>
<style>
  .el-carousel__container{
    height:372px;
  }
</style>

