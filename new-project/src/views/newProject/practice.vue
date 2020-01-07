<template>
    <div>
        <p>这个是practice页面</p>
        <!-- 抽奖页面 -->
        <!-- <div  class="turntable">
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
            <div class="gift"></div>
        </div>  -->
        <!-- 为ECharts准备一个具备宽高的Dom元素 -->
        <div id="main" style="width:600px;height:600px;"></div>
    </div>
</template>
<script>
// 引入基本模板,按需加载
let echarts = require('echarts/lib/echarts');

export default {
    data(){
        return{

        }
    },
    mounted(){
        this.drawBar();
    },
    methods:{
        drawBar(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init($('#main')[0]);
            // 绘制图表
            myChart.setOption({
                series:[{
                    name:'访问来源',
                    type:'pie',
                    radius:'55%',
                    data:[
                        {value:235,name:'视频广告'},
                        {value:274,name:'联盟广告'},
                        {value:310,name:'邮件营销'},
                        {value:335,name:'直接访问'},
                        {value:400,name:'搜索引擎'}
                    ],
                    roseType:'angle'
                }]
            });
        },
    },
}
</script>
<style scoped>
    .turntable{
        width:396px;height:396px;
        border:1px solid #999;
        margin:80px auto;
    }
    .gift{
        width:130px;height:130px;
        border:1px solid #f00;
        float: left;
    }
</style>