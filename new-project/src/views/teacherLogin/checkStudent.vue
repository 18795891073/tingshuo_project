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
      <!-- 导航栏下面的内容 -->
      <div style="display:flex;">
        <!-- 时间、年级、地区、表格、分页 -->
        <div style="margin-left:166px;">
          <!-- 时间（单选框） -->
          <div class="select-border">
            <div>提交时间</div>
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:400px;">
            </el-date-picker>
          </div>
          <!-- 年级（复选框） -->
          <div class="select-border">
            <div>年级</div>
            <el-checkbox-group v-model="checkboxGroup1" @change="gradeChange()">
              <el-checkbox-button v-for="grade in grades" :label="grade" :key="grade" @click="selectGrade()">{{grade}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <!-- 地区（复选框） -->
          <div class="select-border">
            <div>地区</div>
            <el-checkbox-group v-model="checkboxGroup2" @change="regionChange()">
              <el-checkbox-button v-for="province in provinces" :label="province" :key="province">{{province}}</el-checkbox-button>
            </el-checkbox-group>  
          </div>
          <!-- 标题 -->
          <div class="select-border">
            <div>标题</div>
            <el-input v-model="title" placeholder="请输入标题" style="width:400px;"></el-input>
            <button class="btn" @click="search()">搜索</button>
            <button class="reset-btn" @click="reset()">重置</button>
          </div>
          <!-- table表格和分页 -->
          <div>
            <!-- table表格 -->
            <el-table 
            :data="tableData.slice( (pageNum - 1) * pageSize,pageNum * pageSize )"
            border 
            style="width: 100%;margin-top:20px;"
            @cell-click=handColumnClick>
              <el-table-column
                prop="time"
                label="时间"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="grade"
                label="年级"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="region"
                label="地区"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="title"
                label="标题"
                width="300"
                align="center">
              </el-table-column>
              <el-table-column
                prop="original"
                label="作文内容"
                width="350"
                align="center"
                :show-overflow-tooltip=true
                >
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              :current-page="pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"  
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              style="margin:20px 0 0 550px;">
            </el-pagination>
          </div>
          <!-- 对话框 -->
          <div>
            <el-dialog
              title="全文阅读"
              :visible.sync="dialogVisible"
              width="60%">
              <div>{{text}}</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">返回</el-button>
                <el-button type="primary" @click="innerVisible = true">确认批改</el-button>
              </span>
              <el-dialog
              width="30%"
              title="温馨提示"
              :visible.sync="innerVisible"
              append-to-body>
                <div>是否提交批改？</div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="handleTwoClose()">取消</el-button>
                  <el-button type="primary" @click="handleTwoTo()">确认提交</el-button>
                </span>
              </el-dialog>
            </el-dialog>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const gradeOptions = ['七年级','八年级','九年级'];
const provinceOptions = ['江苏省','安徽省','山东省','北京市','天津市']

import { home } from '@/api'
import moment from 'moment'

export default {
  data(){
    return{
    // 存放变量
      activeIndex:"2",
      radio:1,
      checkboxGroup1:[],
      checkboxGroup2:[],
      grades:gradeOptions,
      provinces:provinceOptions,
      dateValue:'',
      tableData:[],
      pageNum:1,            //:current-page="pageNum"---当前页数
      pageSize:5,           //page-size="pageSize"---每页显示条目数
      pageTotal:0,         //:total="pageTotal"---总条目数
      dialogVisible:false,
      innerVisible:false,
      text:'',
      data:{
        grade:[],
        region:[],
        time:[],
        // titleList:[]
      },
      title:'',
    }
  },
  mounted(){
    // this.init();
    console.log(555,this.data)
  },
  created(){},
  methods:{
    // 二次确认点击事件
    handleTwoTo(){
      this.dialogVisible=false;
      this.innerVisible=false;
    },
    handleTwoClose(){
      this.dialogVisible=false;
      this.innerVisible=false;
    },
    // 表格行点击事件
    handColumnClick(row,cell,column){
        this.dialogVisible=true;
        this.text = row.original
    },
    
    init(){
      // let data1 = JSON.stringify(this.data)
      // console.log(data1)
      home.getDetail(this.data).then( res => {
        this.tableData = res.data.data;
        this.pageTotal = res.data.data.length
        
      }).catch(err=>{
        console.log('发生错误')
      })
      
    },
    handleSelect(key,keyPath){
      console.log(key,keyPath)
    },
    handleSizeChange(val){
      this.pageSize = val
      console.log(this.pageSize)
      this.init()
    },
    handleCurrentChange(val){
      this.pageNum = val
      console.log(this.pageNum)
      this.init()
    },
    // 复选框选项发生变化时
    gradeChange(){
      console.log(111,this.checkboxGroup1)
      this.data.grade = this.checkboxGroup1
    },
    regionChange(){
      console.log(222,this.checkboxGroup2)
      this.data.region = this.checkboxGroup2
    },
    // 搜索框
    search(){
      // console.log(moment(this.dateValue[0].getTime()).format('YYYY-MM-DD'))
      this.data.time = []
      if(this.dateValue){
        let startTime = moment(this.dateValue[0].getTime()).format('YYYY-MM-DD'),
            endTime = moment(this.dateValue[1].getTime()).format('YYYY-MM-DD');
        this.data.time.push(startTime,endTime);
      }
      this.init();
    },
    // 重置
    reset(){
      window.location.reload();
    },
  }
}
</script>

<style scoped>
  a{
    display:inline-block;
    width:100%;height:100%;
    text-decoration:none;
  }
  .select-border{
    display:flex;
    margin:20px 15px 10px 5px;
    align-items:center;
  }
  .select-border div:first-child{
    margin-right:15px;
    border:1px solid #999;
    border-radius:5px;
    width:110px;height:38px;
    font-size:16px;
    color:#777777;
    text-align:center;
    line-height:38px;
  }
  .btn{
    position:fixed;
    right:502px;
  }
  .reset-btn{
    position:fixed;
    right:260px;
  }
  .btn,.reset-btn{
    width:120px;height:45px;
    border:0;border-radius:5px;color:#fff;
    font-size:16px;
    background:#009688;
  }
  .btn:hover{
    color:#999;
  }
  .el-tooltip__popper{
    /* margin-left:5px; */
    width:80%;
  }
</style>
<style>
  .el-tooltip__popper{
    width:80%;
  }
</style>