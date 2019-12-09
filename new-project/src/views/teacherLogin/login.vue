<template>
  <div>
    <div>
      <!-- logo图片 -->
      <div style="margin:40px 0 20px 350px;">
        <img src="../../assets/images/logo.png" alt="图片加载失败">
      </div>
      <!-- 登录框及背景 -->
      <div class="login_bg">
        <!-- 登录框 -->
        <table></table>
        <div class="t_table" >
          <div style="margin:15px;">
            <div>
              <img src="../../assets/images/new_tip.png" alt="图片加载失败">
              <span style="font-size:12px;color:#666;">请勿设置与邮箱及其他网站相同的登录及支付密码，</span>
              <span style="font-size:12px;color:#f00;">谨防诈骗！</span>
            </div>
            <div>
              <div style="margin:10px 0 15px 0;font-size:18px;">密码登录</div>
              <div>
                <span>用户名：</span>
                <div style="margin-bottom:15px;display:inline-block;width:190px;height:32px;border:1px solid #999; ">
                  <input type="text" placeholder="请输入用户名" autofocus="autofocus">
                </div>             
              </div>
              <div>
                <span>密码：</span>
                <div  style="margin-left:16px;display:inline-block;width:190px;height:32px;border:1px solid #999; ">
                  <input type="password" placeholder="请输入密码">
                </div>
              </div>
              <!-- 验证码图片生成 -->
              <div >
                <div class="get_code" @click="drawCode()" id="code">
                  <canvas width="100" height="40" id="verifyCanvas"></canvas>
                  <img id="code_img">
                </div>
              </div>
              <!-- 验证码输入框 -->
              <div>
                <span>验证码</span>
                <div style="margin-left:16px;display:inline-block;width:190px;height:32px;border:1px solid #999;">
                  <input type="text" placeholder="请输入验证码">
                </div> 
              </div>
              <button>登 &nbsp; 录</button>
            </div>
          </div>
          
        </div>
      </div>
      <!-- 页脚说明 -->
      <div class="footer">
        <ul>
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
      nums:[
        "1","2","3","4","5","6","7","8","9","0",
        "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x",
      "y","z",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X",
      "Y","Z"
      ],
    }
  },
  created(){},
  mounted(){},
  methods:{
    drawCode(str){
      
    },
  },
}
</script>
<style  scoped>
  .login_bg{
    height:590px;
    background:url('../../assets/images/login_bgk.jpg') no-repeat center;
    border-bottom:1px solid #999;
    border-width: 1.5px;
  }
  .t_table{
    margin:120px 0 0 1300px;
    width:300px;height:350px;
    border:1px solid #999;
    border-width:1.5px;
  }

  input{
    border:0;
    outline: none;
    margin-left: 10px;
    width:180px;height:30px;
    /* border:1px solid #999; */
  }
  button{
    margin-top:15px;
    width:270px;height:35px;
    border:0;
    font-size:15px;
    color:#333;
    background:#ff2832;
    border-radius:5px;
  }
  button:hover{
    background:#ff2858;
    color:#666;
  }
  .footer{
    margin:0 0 0 550px;
  }
  .footer ul{
    margin:80px 0 30px 120px;
    display:flex;
  }
  ul li{
    list-style: none;
    margin-right:10px;
    font-size:13px;
    color:#777;
  }
  ul li:hover{
    color:#999;
    cursor: pointer;
  }
</style>