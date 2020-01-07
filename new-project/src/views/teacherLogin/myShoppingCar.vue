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
      <div style="width:100%;height:100%;margin-top:50px;">
        <div style="width:60%;margin-left:20%;">
          <!-- logo + 输入框 + 购物车 -->
          <div style="margin:45px 0;display:flex;justify-content:space-between;height:42px;align-items:center;">
            <img src="../../assets/images/logo.png" alt="图片加载失败" >
            <div style="width:600px;height:42px;border:1px solid #FF2832;display:flex;align-items:center;border-radius:3px;">
              <img src="../../assets/images/search.png" alt="图片加载失败" style="margin:0 5px 0 10px;">
              <input type="text" style="width:480px;height:40px;border:0;outline:none;">
              <button style="width:120px;height:42px;border:0;background:#FF2832;">搜索</button>
            </div>
            <div style="display:flex;align-items:center;width:220px;height:40px;border:1px solid #dddddd;border-radius:3px;">
              <img src="../../assets/images/shopping_car.png" alt="图片加载失败" style="width:25p;height:25px;margin:0 32px 0 8px">
              <span style="font-size:16px;color:#999;">我的购物车</span>
              <div style="margin-left:32px;width:43px;height:42px;background:#ff2832;line-height:40px;text-align:center;font-weight:bolder;">{{this.tableData.length}}</div>
            </div>
          </div>
          <div style="width:100%;border-bottom:2px solid #999;margin-bottom:5px;font-size:25px;color:#333;">商品列表</div>
          <!-- 表格组件 -->
          <div>
            <el-table
              :data="tableData"
              border
              show-summary
              style="width: 100%">
              <el-table-column
                align="center"
                label="序号"
                type="index"
                width="60">
              </el-table-column>
              <el-table-column
                align="center"
                prop="productName"
                label="商品名"
                width="270">
              </el-table-column>
              <el-table-column
                align="center"
                prop="price"
                label="价格"
                width="120">
              </el-table-column>
              <el-table-column
                align="center"
                prop="count"
                label="购买数量"
                width="160">
                <!-- <template> -->
                  <!-- <el-input-number v-model="num1" :step="1" @change="handleChange" :min="1" :max="10" label="描述文字" style="width:139px;"></el-input-number> -->
                <!-- </template> -->
              </el-table-column>
              <el-table-column
                align="center"
                prop="subtotal"
                label="小计"
                width="120">
              </el-table-column>
              <el-table-column
                align="center"
                prop="remarks"
                label="备注"
                width="320">
              </el-table-column>
              <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <i class="el-icon-edit-outline" style="display:inline-block;margin-right:10px;cursor:pointer;" @click="handleEdit(scope.$index, scope.row)"></i>
                  <i class="el-icon-delete" style="cursor:pointer;" @click="handleDelete(scope.$index, scope.row)"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="width:100%;height:60px;background:#999;line-height:60px;margin-top:5px;">
            <span style="margin-left:540px;">总价(不含运费)：{{total}}</span> 
            <button class="btn" style="margin:0 30px 0 85px;background:#6ef304;"><a href="http://localhost:8080/#/index" style="text-decoration:none;color:#fff;margin-top:8px;">购 &nbsp; 物</a></button>
            <button class="btn" >结 &nbsp; 算</button>
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
      activeIndex:"6",
      tableData:[
        {
          productName:'小米Note15',
          price:7399,
          count:3,
          subtotal:25000,
          remarks:'小米手机，国产品牌，走向世界',
        },
        {
          productName:'小米Note15',
          price:7399,
          count:3,
          subtotal:25000,
          remarks:'小米手机，国产品牌，走向世界',
        },
        {
          productName:'小米Note15',
          price:7399,
          count:6,
          subtotal:25000,
          remarks:'小米手机，国产品牌，走向世界',
        },
        {
          productName:'小米Note15',
          price:7399,
          count:3,
          subtotal:25000,
          remarks:'小米手机，国产品牌，走向世界',
        },
        {
          productName:'小米Note15',
          price:7399,
          count:5,
          subtotal:25000,
          remarks:'小米手机，国产品牌，走向世界',
        }
      ],
      num1:1,
      total:0,
      subtotal:0,
    }
  },
  mounted(){
    this.handleCount();
  },
  methods:{
    handleSelect(){},
    handleChange(value){
      console.log(value);
      // this.num1 = value;
      console.log(this.num1)
    },
    handleEdit(index,row){
      console.log(111,index)  
      console.log(222,row)
      alert(row.remarks)
      alert(row.productName)
    },
    handleDelete(index,row){
      this.tableData.splice(index, 1);
      this.total -= (row.count)*(row.price)
      console.log(this.tableData)
    },
    // 自定义方法用于计算
    handleCount(){
      for(var i=0;i<this.tableData.length;i++){
        this.total += (this.tableData[1].price)*(this.tableData[i].count)
        this.tableData[i].subtotal = (this.tableData[i].price)*(this.tableData[i].count)
      }
    }
  },
}
</script>
<style scoped>
a{
  display:inline-block;
  width:100%;height:100%;
  text-decoration: none;
}
.btn{
  font-size:16px;font-weight: bolder;
  background:#f00;
  color:#fff;
  width:85px;height:40px;
  border:0;border-radius:3px;
  cursor:pointer;
}
.btn:hover{
  color:#999;
}
</style>