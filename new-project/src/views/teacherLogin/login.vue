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
  mounted(){

  },
  methods:{
    drawCode(str){
      $('#verifyCanvas').remove();    //每次更新验证码都要移除canvas，然后再进行重绘
      var box = $('.code');
      var p1 = $('.code_img');
      var p0 = document.createElement('canvas');  //----<canvas>创建canvas节点
      // var p2 = $('<canvas>')[0]    -----<canvas>
      p0.id = 'verifyCanvas';   //定义canvas id
      box.insertBefore(p0,p1);  //将canvas节点插入到img节点前面
      p0.width = 100;
      p0.height = 40;   //设置画布宽高
      //var canvas = $('#verifyCanvas');  //获取html端画布
      var canvas = document.getElementById('verifyCanvas')
      var context = canvas.getContext("2d");   //获取画布2D上下文环境
      context.fillStyle = "#fff";   //画布填充色
      context.fillRect(0,0,canvas.width,canvas.height); //清空画布
      context.fillStyle = "#800000";   //设置字体颜色
      context.font = "25px Arial";     //设置字体
      var rand = new Array();
      var x = new Array();
      var y = new Array();
      for(var i = 0; i<4;i++){
        rand.push(rand[i]);
        rand[i] = this.nums[Math.floor(Math.random() * this.nums.length)];   //在数组中随机取一个值
        x[i] = i * 20 + 10;
        y[i] = Math.random() * 20 +20;
        context.fillText(rand[i],x[i],y[i]);  //设置文本在画布中显示的位置
      }
      this.str = rand.join('').toUpperCase();  //将验证码值中的小写字母转为大写
      //画3条随即线
      for(var i = 0;i<30;i++){
        this.drawline(canvas,context);
      }
       
      //  画30个随机点
      for(var i=0;i<30;i++){
        this.drawDot(canvas,context);
      }
      this.convertCanvasToImage(canvas);
      return this.str;
    },
    // 随机线
    drawline(canvas,context){
      //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
      context.moveTo(Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height));
      //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
      context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
      context.lineWidth = 0.5;   //随机线宽
      context.strokeStyle = 'rgba(50,50,50,0.3)';//随机线描边属性
      context.stroke();  //描边，即起点描到终点
    },
     // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
    drawDot(canvas, context) {
      var px = Math.floor(Math.random() * canvas.width);
      var py = Math.floor(Math.random() * canvas.height);
      context.moveTo(px, py);
      context.lineTo(px + 1, py + 1);
      context.lineWidth = 0.2;
      context.stroke();
    },
    //绘制图片
    convertCanvasToImage(canvas) {
      document.getElementById("verifyCanvas").style.display = "none";
      var image = document.getElementById("code_img");
      image.src = canvas.toDataURL("image/png");//画布转成图片地址
      return image;//返回图片对象
    }
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