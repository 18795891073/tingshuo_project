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
            <div style="margin-left:5px;">
              <div style="margin:10px 0 15px 0;font-size:18px;">用户登录</div>
              <div>
                <span>用户名：</span>
                <div class="user_cover" style="display:inline-block;width:190px;height:32px;border:1px solid #999;">
                  <input type="text" placeholder="请输入用户名" autofocus="autofocus" class="user_name">      
                </div>  
                <span class="login_username" style="font-size:12px;color:#f00;display:block;margin-left:68px;height:15px;"></span>           
              </div>
              <div>
                <span>密码：</span>
                <div  style="margin:0px 0 0 16px;display:inline-block;width:190px;height:32px;border:1px solid #999; ">
                  <input type="password" placeholder="请输入密码" class="user_password">
                </div>
                <span class="login_password" style="font-size:12px;color:#f00;display:block;margin-left:68px;height:15px;"></span> 
              </div>
              <!-- 验证码图片生成 -->
              <div class="code" @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <!-- 验证码输入框 -->
              <div>
                <span>验证码</span>
                <div style="margin-left:16px;display:inline-block;width:190px;height:32px;border:1px solid #999;">
                  <input type="text" placeholder="请输入验证码" v-model="num">
                </div> 
              </div>
              <button @click="go()">登 &nbsp; 录</button>
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
  name:"SIdentifyd",
  data(){
    return{
      identifyCodes:'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      identifyCode:"",
      codeImg:'',
      name_error:false,
      pwd_error:false,
      num:'',
    }
  },
  created(){
    this.codeImg='url';
  },
  mounted(){
    this.identifyCode = "";
    this.makeCode(this.identifyCodes,4);
  },
  methods:{
    randomNum(min,max){
      return Math.floor(Math.random() * (max-min) + min);
    },
    refreshCode(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes,4);
    },
    makeCode(o,l){
      for(let i=0;i<l;i++){
        this.identifyCode += this.identifyCodes[this.randomNum(0,this.identifyCodes.length)];
      }
      console.log(this.identifyCode);
    },
    // 验证用户名是否为空
    checkUserName(){
      if($('.user_name').val().length == 0){
        $('.login_username').html('！用户名不能为空').show();  
        this.name_error = true;  
      } else {
        // $('.login_username').hide();
        this.name_error = false;
      }
    },
    // 验证密码是否为空
    checkPassword(){
      if($('.user_password').val().length == 0 ){
        $('.login_password').html('！密码不能为空').show();
        this.pwd_error = true;
      } else {
        // $('.login_password').hide();
        this.pwd_error = false;
      }
    },
    go(){ 
      this.checkUserName();
      this.checkPassword();
      if(this.name_error == false && this.pwd_error == false && this.num){
        this.$router.push('/index');         //登录后跳转到首页
      } else {
        console.log('输入有误');
        return false;
      }
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
    width:310px;height:380px;
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
  .code{
    margin:8px 0 5px 68px;
    width:150px;
    height:50px;
    border:1px solid red;
  }
</style>