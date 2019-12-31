<template>
  <div>
    <div>
      <!-- 导航栏 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" style="position:fixed;top:0px;width:100%;background:#f2f2f2;display:flex;justify-content:center;align-items:center;" mode="horizontal" @select="handleSelect">
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
      <!-- 错误分类左侧边栏 -->
      <div class="left_border">
        <div style="width:200px;height:40px;line-height:40px;margin-left:30px;color:#fff">错误分类</div>
        <ul style="background:#212d3c;">
          <li style="padding-top:10px;margin-top:0;"><a href="javascript:;">空白提示</a></li>
          <li><a href="javascript:;">语法错误</a></li>
          <li><a href="javascript:;">句子冗长</a></li>
          <li><a href="javascript:;">拼写错误</a></li>
          <li><a href="javascript:;">排版问题</a></li>
          <li><a href="javascript:;">重复提示</a></li>
          <li><a href="javascript:;">美式英语</a></li>
          <li><a href="javascript:;">搭配不当</a></li>
          <li style="padding-bottom:10px;"><a href="javascript:;">未分类处</a></li>
        </ul>
      </div>
      <div style="margin-top:80px;">
        <table></table>
        <!-- 倒计时框 -->
        <p id="textp" style="position:fixed;top:80px;left:650px;border:3px solid #f00;width:500px;height:50px;text-align:center;line-height:50px;color:#0ff;font-size:20px;" >这里显示倒计时</p>
        <div style="position:relative;margin-top:120px;overflow:auto;width:1900px;height:682px;">
          <div style="display:flex;">
            <!-- 内容区域 -->
            <div class="main_border" style="overflow:auto;padding:20px;line-height:40px;" @mouseup="myFunction()">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus vitae expedita officiis, nostrum odio ratione distinctio quidem aliquam illum id vel ipsum harum quod accusamus earum, exercitationem reprehenderit cupiditate eos!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum natus assumenda quaerat praesentium repellendus nulla expedita, fugit dignissimos excepturi placeat eligendi quasi ipsa totam necessitatibus molestiae animi nam eveniet vero.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum similique saepe officiis ratione, atque ducimus porro facilis delectus quia architecto, nisi, nulla nam quas. Nihil beatae officiis quibusdam aperiam vitae?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto enim corporis provident ea, cumque similique perferendis mollitia totam suscipit necessitatibus ratione vitae quae sit repellendus non eligendi rerum, libero dicta.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi atque fugiat facere, quis vel maxime voluptatibus, odit tempora corrupti cumque voluptatem suscipit aspernatur iste autem mollitia. Ipsum excepturi nihil ducimus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nisi temporibus inventore unde, laboriosam quae debitis ex voluptates cumque dicta nesciunt odio tempora quam nobis distinctio harum aliquam tempore ullam?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo esse veritatis deleniti iusto fuga corrupti explicabo nulla accusantium, tenetur odio cumque inventore delectus provident error quis dicta totam expedita quia!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel libero earum, ea nobis ipsa repellendus. Tenetur molestias neque quibusdam, excepturi doloremque reiciendis laboriosam id, expedita vero quae facere, cumque iure?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis earum in est iure? Officia vel rem omnis laboriosam unde amet, placeat ducimus odit. Beatae, nisi molestiae ipsa pariatur laudantium ipsum.
            </div>
            <!-- 单词统计右侧边栏 -->
            <div class="right_border">
              右侧的统计框
            </div>
          </div>
          <!-- 整体评价 -->
          <form action="" style="margin:50px 30px 0 220px;">
            <fieldset style="border:0;border-top:1px solid #999;">
              <legend style="font-size:20px;color:#333;">整体评价</legend>
            </fieldset>
            <!-- 弹出提示框 -->
            <el-dialog
              title="批改框"
              :visible.sync="dialogVisible"
              width="20%"
              :before-close="handleClose">
              <template>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
              <textarea cols="43" placeholder="请输入批改内容" rows="8" style="margin-top:10px;padding:6px;line-height:18px;"></textarea>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
            <div class="assessment">
              <label for="">词&nbsp;&nbsp;&nbsp;&nbsp;汇</label>
              <input type="text" placeholder="请输入对词汇的评价">
            </div>
            <div class="assessment">
              <label for="">句&nbsp;&nbsp;&nbsp;&nbsp;子</label>
              <input type="text" placeholder="请输入对句子的评价">
            </div>
            <div class="assessment">
              <label for="">篇章结构</label>
              <input type="text" placeholder="请输入对篇章结构的评价">
            </div>
            <div>
              <div class="assessment zong" style="background:#f8f8f8;color:#666;font-size:15px;line-height:35px;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总&nbsp;&nbsp;&nbsp;评
              </div>
              <textarea cols="225" rows="10" style="padding:20px;line-height:20px;"></textarea>
            </div>
            <div class="assessment score">
              <label for="">得&nbsp;&nbsp;&nbsp;分</label>
              <input type="text" placeholder="请输入分数">
            </div>
            <div class="btn">
              <button>暂&nbsp;&nbsp;存</button>
              <button style="margin-left:30px;">提&nbsp;&nbsp;交</button>
            </div>
          </form>
          <!-- 系统批改详情 -->
          <div style="margin:50px 30px 0 220px;">
            <fieldset style="border:0;border-top:1px solid #999;">
              <legend style="font-size:20px;color:#333;">系统批改详情</legend>
            </fieldset>
            <div class="correct_detail">
                <table></table>
                <div style="width:90%;margin:20px 0 0 5%;background:#fff;">
                    <div>can you speak English?</div>
                    <li></li>
                    <p></p>
                    <tr></tr>
                    <span></span>
                </div>
            </div>
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
      dialogVisible:false,
      selectText:'',
      options:[
        {
          value:'选项1',
          label:'空白提示'
        },
        {
          value:'选项2',
          label:'语法错误'
        },
        {
          value:'选项3',
          label:'句子冗长'
        },
        {
          value:'选项4',
          label:'拼写错误'
        },
        {
          value:'选项5',
          label:'排版问题'
        },
        {
          value:'选项6',
          label:'重复提示'
        },
        {
          value:'选项7',
          label:'美式英语'
        },
        {
          value:'选项8',
          label:'搭配不当'
        },
        {
          value:'选项9',
          label:'未分类处'
        },
      ],
      value:'',
      texts:{},
    }
  },
  mounted(){
    this.timeDown(); 
  },
  methods:{
    handleSelect(){},
    timeDown(){
      var t1=setInterval(()=>{
        // 获取后端传过来的时间
        var dateH = '2019-12-31';  
        // 获取当前时间
        var now=new Date();
        //获得两者的时间差
        var allTime = (Date.parse(dateH) - Date.parse(now))
        // var allTime = (1577770400000 - Date.parse(now))
        var day = Math.floor(allTime/(24*60*60*1000))
        var hour = Math.floor((allTime - day*24*60*60*1000)/(60*60*1000));
        var minute = Math.floor((allTime - day*24*60*60*1000 - hour*60*60*1000)/(60*1000));
        var second = Math.floor((allTime - day*24*60*60*1000 - hour*60*60*1000 - minute*60*1000)/1000);
        var textp = document.getElementById("textp");
        textp.innerHTML = "距离批改结束还有" + day + '天' + hour + '小时' + minute + '分' + second + '秒';
        // 倒计时归零时清楚定时器
        if(allTime===0){
          clearInterval(t1);
        } 
      },1000);
      
    }, 
    handleClose(done){
      this.$confirm('确认关闭？').then(_=>{
        done();
      }).catch(_=>{});
    },
    myFunction(){
      console.log(111);
      this.selectText = window.getSelection().toString();
      this.dialogVisible = true;
    },
  }
}
</script>
<style scoped>
  a{
    display:inline-block;
    width:100%;height:100%;
    text-decoration: none;
  }
  .left_border{
    margin-right:30px;
    width:200px;
    height:900px;
    position:fixed;
    top:70px;left:0;
    background:#2f4056;
  }
  .left_border ul{
    padding:0;
    margin:0;
  }
  .left_border ul li{
    margin:15px 0 10px 60px;
    list-style:none;
  }
  .left_border ul li a{
    color:#fff;
    font-size:14px;
  }
  .left_border ul li a:hover{
    color:#f00;
  }
  .main_border{
    width:1250px;height:600px;
    border:1px solid #000;
    margin-left:220px;
    position: relative;
  }
  .right_border{
    width:350px;
    height:640px;
    border:1px solid #000;
    margin:0 10px 0 20px;
  }
  .assessment{
    width:1630px;
    height:35px;
    border:1px solid #999;
    border-radius:2px;
    margin:10px 0 20px 0;
  }
  .zong{
    margin:0;
  }
  .score{
    width:300px;
  }
  .assessment label{
    width:100px;height:35px;
    display:inline-block;
    background:#f8f8f8;
    color:#666;
    font-size:15px;
    text-align:center;
    line-height:35px;
    border-right:1px solid #999;
    border-radius:2px;
  }
  .assessment input{
    width:1510px;height:26px;
    margin:0 1px 1px 2px;
    border:0;
    outline:none;
  }
  .score input{
    width:189px;
  }
  .btn button{
    width:80px;height:45px;
    text-align:center;line-height:45px;
    font-size:15px;color:#fff;
    background:#009688;
    border:0;border-radius:5px;
    box-shadow: -3px 3px 2px #009688;
  }
  .btn button:active{
    border-radius:5px;
    box-shadow:2px 2px 2px #009688;
  }
  .correct_detail{
      width:1630px;
      border:1px solid #999;
      background:#999;
  }
</style>
<style>
.el-scrollbar{
  height:190px;
}
</style>