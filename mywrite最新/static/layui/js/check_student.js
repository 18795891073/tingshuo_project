//创建新的数组，复制后台传递的错误信息
var dataNew = [];
var dataOriginal;
var error_count = 0;
var biii="";


// form表单组件
layui.use('form',function(){
    if(window.devicePixelRatio>1||window.devicePixelRatio<1){
        alert('缩放比例设置成默认（100%），体验更好哦！')
        //console.log(111,window.devicePixelRatio)  //正常1 正常100%状态
    };
    var form = layui.form;
    // 页面初始化调接口得到省份
    window.onload=function(){
        $.ajax({
            url:'/getprovinces/',
            type:'get',
            dataType:'json',
            success:function(data){
                // console.log('成功',data)
                for(var i=0;i<data.data.length;i++){
                //   console.log(9999,data.data[i])  
                    var attr = data.data[i].name;
                    console.log(attr)
                    $("#pros").append("<input type='checkbox' name='region' class='checkboxNum2' lay-filter='c_one2' />");
                    console.log(data.data[i].id)
                    $("#pros input:last-child").attr("title",attr);     
                    $("#pros input:last-child").attr("value",data.data[i].id);
                    // $("#pros input:last-child").attr("num",data.data[i].id);                   
                }
                form.render('checkbox');
            },
            error:function(){console.log('失败')}
        })
    };
    // 全选---年级
    form.on('checkbox(c_all)',function(data){
        var a = data.elem.checked;
        if (a == true ){
            $(".checkboxNum").prop("checked",false);
            form.render('checkbox');
        } else {
            $(".checkboxNum").prop("checked",false);
            form.render('checkbox');
        }
    });
    // 有一个未选中全选取消选中
    form.on('checkbox(c_one)',function(data){
        var item = $(".checkboxNum");
        for (var i=0;i<item.length;i++){
            if ( item[i].checked ==false ){
                $('#c_all').prop('checked',false);
                form.render('checkbox');
                break;
            }
        }
    });

    // 全选---地区
    // 全选
    form.on('checkbox(c_all2)',function(data){
        var b = data.elem.checked;
        if (b == true ){
            $(".checkboxNum2").prop("checked",false);
            form.render('checkbox');
        } else {
            $(".checkboxNum2").prop("checked",false);
            form.render('checkbox');
        }
    });
    // 有一个未选中全选取消选中
    form.on('checkbox(c_one2)',function(data){
        var item2 = $(".checkboxNum2");
        for (var i=0;i<item2.length;i++){
            if ( item2[i].checked ==false ){
                $('#c_all2').prop('checked',false);
                form.render('checkbox');
                break;
            }
        }

    });
});

    
// 时间组件
layui.use('laydate', function(){
  var laydate = layui.laydate;
  

  laydate.render({
    elem: '#test1' ,
    range:'至',
  });
});
//搜索查询
// 表格组件
layui.use('table', function () {
    var table = layui.table;
    var form = layui.form;
    var util = layui.util;

    //展示作文列表
    table.render({
        elem: '#LAY_table_user',
        method: 'post',
        url:'/web3/',
        where: {
            test:"['star']",
            time: "[]",
            grade: "[]",
            region: "[]",
            title:"[]"
        },
        parseData: function (res) {
            return {
                "code": 0,
                "msg": '',
                "count":res.data.length,
                "data": res.data.slice( (res.page - 1) * this.limit,res.page * this.limit )
            }
        },
        cols: [[
            { field: 'commit_time', title: '提交时间', width:"12%",  style: 'cursor: pointer;', align: 'center',templet:function(d){
                return util.toDateString(d.commit_time); //时间戳格式转换
            } },
            { field: 'grade', title: '年级', width:"5%",  style: 'cursor: pointer;', align: 'center' },
            { field: 'region', title: '地区', width:"12%", style: 'cursor: pointer;', align: 'center'},
            { field: 'title', title: '标题', width:"18%",  style: 'cursor: pointer;', align: 'center'},
            { field: 'essay_text', title: '作文内容', width:"53%",style: 'cursor: pointer;', align: 'left',}

        ]],
        id: 'tableReload',
        // page: true,
        limits: [5,10,15,20],
        limit: 5 ,//每页默认显示的数量
        count:this.data.length,
        height: 400,
        curr:1,
        done:function(res,curr,count){
            this.count = count
            this.curr = curr     
        },
    });
   
    var $ = layui.$, active = {
        reload: function () {
            // time参数
            var dateTime=[];
            var str=[];
            if ($("#test1").val()!=""){
            dateTime.push($("#test1").val());
            str = (dateTime[0].split(' 至 ')) ;
            };


            // grades参数
            var grades = [];
            var obj = $("input[name='grade']");
            for (var i = 0; i < obj.length; i++) {
                if(obj[i].checked && obj[i].value == ''){
                    grades = [];
                }
                else if (obj[i].checked && obj[i].value !== ''){
                    grades.push(obj[i].value);
                }        
            }


            // regions参数
            var regions = [];
            var obj1 = $("input[name='region']");
            for (var i = 0; i < obj1.length; i++) {
                if (obj1[i].checked && obj1[i].value == ''){
                    regions = [];
                }else if(obj1[i].checked && obj1[i].value !== ''){
                    console.log(obj1[i].value)
                    regions.push(obj1[i].value);
                }       
            }


            // title参数
            var title = [];
            if ($("#test3").val()!=""){
                var g = $("#test3").val();
                title = g.split(','); 
            };
            //执行重载
            table.reload('tableReload', {
                
                page: {
                    curr:1
                },
                where: {
                    test: JSON.stringify(['abx']),
                    time: JSON.stringify(str),
                    grade: JSON.stringify(grades),
                    region: JSON.stringify(regions),
                    title:JSON.stringify(title)
                }
            });
        }
    };
    $('.demoTable .layui-btn ' ).on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    $('.button ' ).on('click', function () {

        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


    // 重置按钮---再次调接口，清空数据
    $('.reset-btn').on('click',function(){
        window.location.reload();
    });

    //监听单元格点击事件  
    table.on('row(demoEvent)', function (obj) {
        // console.log(1111,obj.data.id)
        $('.layui_details').children().remove();
        var dataNumber = obj.data.id;
        biii=dataNumber;

        $(".layui-table-body tr ").attr({"style":"background:#FFFFFF"});
        $(obj.tr).attr({"style":"background:#999"});
        $('.btn-agree').css('display','block') ;   

        $(".btn-agree").click(function() {
            $(".middle_right").after(
               '<div class="delcon"><div class="desure" color="red">请在规定时间内完成批改，请确认!</div><form class="form-login" action="/correct1/" method="post"><input style="display:none" id="hka" name="ac"><div class="delfoot"><button class="delcer" type="submit">确认</button><button class="delcan">取消</button></div></form></div>'
             );
            $('#hka').val(biii);
            $(".delcon").fadeIn();
            $('.delcan').click(function(){
               $(".delcon").remove();
            });      
        });
        $.ajax({
            type: 'post',
            url: '/check/',
            dataType: 'json',
            data: { 'id': dataNumber },
            success: function (data) {
                var html = data.essay_text;
                $('.content').html(html.replace(/\r\n/g, "<br/>"))
               
                $('.middle_content').css('display', 'inline-block');
                $('.correct_button').css('display', 'inline-block');
              
            },
            error: function (jqXHR) {
                alert('发生错误：' + jqXHR.status);
            }
        });
            
    });

});





