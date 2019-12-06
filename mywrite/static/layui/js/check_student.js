//创建新的数组，复制后台传递的错误信息
var dataNew = [];
var dataOriginal;
var error_count = 0;
var biii="";


// form表单组件
layui.use('form',function(){
    var form = layui.form;
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
        //如果都勾选上 勾上不限
        // var all = item.length;
        // for (var i=0;i<item.length;i++){
        //     if(item[i].checked == true){
        //         all--;
        //     }
        // }
        // if(all == 0){
        //     $('#c_all').prop("checked",true);
        //     form.render('checkbox');
        // }
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
        //如果都勾选上 勾上不限
        // var all = item2.length;
        // for (var i=0;i<item2.length;i++){
        //     if(item2[i].checked == true){
        //         all--;
        //     }
        // }
        // if(all == 0){
        //     $('#c_all2').prop("checked",true);
        //     form.render('checkbox');
        // }
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
    var form = layui.form
    var util = layui.util;
    //展示作文列表
    table.render({
        elem: '#LAY_table_user',
        method: 'post',
        url: 'http://192.168.1.150:9000/web4/',
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

            { field: 'time', title: '提交时间',  style: 'cursor: pointer;', align: 'center',unresize:true,templet:function(d){
                return util.toDateString(d.taskDate); //时间戳格式转换
            } },
            { field: 'grade', title: '年级',  style: 'cursor: pointer;', align: 'center' ,unresize:true},
            { field: 'region', title: '地区', style: 'cursor: pointer;', align: 'center',unresize:true },
            { field: 'title', title: '标题',  style: 'cursor: pointer;', align: 'center',unresize:true },
            { field: 'original', title: '作文内容', width: '30%', style: 'cursor: pointer;', align: 'center',unresize:true }
            

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
            str = (dateTime[0].split('至')) ;
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
                    regions.push(obj1[i].value);
                }       
            }


            // title参数
            var title = [];
            if ($("#test3").val()!=""){
                title.push($("#test3").val());
            };
            //执行重载
            table.reload('tableReload', {
                
                page: {
                    curr:1
                },
                where: {
                    test: JSON.stringify('star'),
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
        $('.layui_details').children().remove();
        var dataNumber = obj.data.identifier;
        biii=dataNumber;

        // 为单击行设置样式
        $(".layui-table-body tr ").attr({"style":"background:#FFFFFF"});
        $(obj.tr).attr({"style":"background:#999"});
        // console.log(1212,obj.tr.selector)


        $('#hello').css('display', 'inline');
        $("#hello").click(function() {    
             $('#hka').val(biii);      
            });
        $.ajax({
            type: 'post',
            url: 'http://192.168.1.150:9000/check1/',
            dataType: 'json',
            data: { 'identifier': dataNumber },
            success: function (data) {
                dataNew = eval(data.errors);
                var html = data.original;
                dataOriginal = data.original;
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





