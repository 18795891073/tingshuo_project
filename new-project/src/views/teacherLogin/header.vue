<template>
  <div>
    <div>
      <!-- 导航栏 -->
      <!-- <div>
        <span>欢迎来到听说科技</span>
        <ul>
          <li>欢迎您 {{}}</li>
          <li>|</li>
          <li>作文批改</li>
          <li>|</li>
          <li>我的报酬</li>
          <li>|</li>
          <li>退出</li>
          <li>|</li>
          <li>用户中心</li>
          <li>|</li>
          <li>我的购物车</li>
          <li>|</li>
          <li>主页</li>
        </ul>
      </div> -->
      <el-table
      :data="tableData.slice((pageNum - 1) * pageSize,pageNum * pageSize)"
      style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
  </div>
</template>
<script>
export default {
  data(){
    return{
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      pageSize:5,
      pageNum:1,
      pageTotal:20
    }
  },
  mounted(){},
  created(){},
  methods:{
    init(){
      this.pageTotal = this.tableData.length
      // console.log(999,this.pageNum)
      // console.log(888,this.tableData.length)
    },
    handleSizeChange(val){
      console.log(val)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val){
      console.log(val)
      this.pageNum = val
      this.init()
    },
  },
}
</script>