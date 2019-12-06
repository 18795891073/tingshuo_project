

// 判断parentEle是否是cur元素的父元素
function isParent(cur, parentEle) {
    if (cur && cur.tagName !== 'BODY') {
        let pEle = cur.parentElement;
        if (parentEle === pEle) {
            return true;
        } else {
            return isParent(pEle, parentEle);
        }
    }
    return false;
}

//封装编辑文字样式方法
function addSelect(param) {
    let el = param.el;
    let backgroundColor = param.backgroundColor || '#fffb6c';
    let color = param.color;
    let onSelect = param.onSelect;

    let currentEle = null;

    document.onmouseup = function (e) {
        let resultEle = document.querySelector(el);
        let selected = window.getSelection();

        if (selected.type === 'None') {
            return;
        }

        let selectedStr = selected.toString();
        if (selected && selected.rangeCount > 0) {
            let r = selected.getRangeAt(0);
            if (r.startContainer === r.endContainer && isParent(r.startContainer, resultEle) && selectedStr) {
                let children = resultEle.childNodes;
                let c;

                let result = [];

                for (let i = 0; i < children.length; i++) {
                    if (children[i] === r.startContainer) {
                        c = i;
                    }
                }
                for (let i = 0; i < children.length; i++) {
                    let node = children[i];
                    if (node.toString() === '[object Text]') {
                        if (i === c) {
                            let start = node.nodeValue.substring(0, r.startOffset);
                            let end = node.nodeValue.substring(r.endOffset);
                            let span = document.createElement('span');
                            span.innerText = selectedStr;
                            span.style.backgroundColor = backgroundColor;
                            span.style.color = color;
                            start = new Text(start);
                            end = new Text(end);
                            result.push(start);
                            result.push(span);
                            result.push(end);
                            currentEle = span;
                            continue;
                        }
                        result.push(node);
                    } else {
                        result.push(node);
                    }
                }
                resultEle.innerHTML = '';
                for (let i = 0; i < result.length; i++) {
                    resultEle.appendChild(result[i]);
                }
                // console.log(result);
                if (onSelect) {
                    onSelect(e, currentEle);
                }
            }
        }
    };

    return {
        clear: function () {
            if (currentEle) {
                currentEle.outerHTML = `${currentEle.innerText}`;
                currentEle = null;
            }
        },
        getSelect: function () {
            return currentEle;
        }
    };
}


//选中文字改变颜色
var a = addSelect({
    el: '.content',
    onSelect: function (e, cur) {
        let pop = document.querySelector('.popup');
        // pop.style.display = 'block';
        // console.log(cur)
        layer.open({
            type: 1,
            zIndex: '9',
            closeBtn: 1,
            title: '批改框',
            area: ['400px', '500px'], //宽高

            content: pop.innerHTML,//内容可以放入html
            shadeClose: true,//点击遮罩关闭
 
            // cancel: function () {
            //     a.clear();
    
            // },
            // end: function () {
            //     a.clear();
                   
               
            // },
            success: function (layero, index) {
                layui.form.render();

            }


        });

        $('.comment').val('');
        $('.comment_type').val('');
        $('.myform input').val('');

    },

    backgroundColor: '#fff',
    color: '#eb3922'
});

//批改编辑框-确认
$(document).on('click', '.confirm', function () {
// function popup_confirm() {
    var dom = a.getSelect();

    if (dom) {
        //只输入了错误类型
        if ($('.comment_type').val() != '' && $('.comment').val() == '') {
            dom.innerHTML =
                '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em" id="' + error_count + '">&nbsp;</em><errorWords>' + dom.innerHTML + '</errorWords>';
                

        } else if ($('.comment_type').val() == '' && $('.comment').val() != '') {
            // alert('请输入错误类型！');
            layer.msg('请输入错误类型！', function () {
                //关闭后的操作
            });

        } else if ($('.comment_type').val() == '' && $('.comment').val() == '') {
            // alert('请输入错误类型或者批改内容！');
            layer.msg('请输入错误类型或者批改内容！', function () {
                //关闭后的操作
            });

        } else if ($('.comment_type').val() != '' && $('.comment').val() != '') {
            //输入了错误类型和批改内容
            dom.innerHTML =
                '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="' + error_count + '">&nbsp;</em><errorWords>' + dom.innerHTML + '</errorWords>';

        }


    }


    var spanDoms = $('.comment_em');

    for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);
    }




    //教师批改的新对象

    //  var dom1 = $(dom);
    //  console.log(dom1.text(),dataNew.essay.indexOf(dom1.text()));

    var newdata = {
        sentence: '',
        questions: [{
            issueType: optionContent,
            offset: '',
            length: $(dom).text().trim().length-1,

            words: $(dom).text().replace(/\d+/g, ''),
            suggestion: $('.comment').val(),
            shortMessage: '',
            Message: '',
            id: error_count//数组里追加新的属性——每个错误对应的唯一id
            // number: $(dom).children('em').html()
        }]

    };

    error_count++;
    dataNew.errors.push(newdata);
    errorDetails();
    


});

layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(demo)', function (elem) {
        //console.log(elem)
        layer.msg(elem.text());
    });
});

// layui.form.render('select');
//下拉框选择点评类型
var optionContent;
layui.use('form', function () {
    var form = layui.form;
    form.on('select(filter)', function (data) {
        $('.comment_type').val(data.value);

        //获取下拉框选中的选项的content属性值
        optionContent = data.elem.form.attributes.style.name;
        console.log(optionContent)

    });
});

//改变文字下划线样式
$(document).on('click', '#underline', function () {

    var dom = a.getSelect();
    if (dom) {
        dom.style.textDecoration = 'underline';
    }
});

$(document).on('click', '#through', function () {
    var dom = a.getSelect();
    if (dom) {
        dom.style.textDecoration = 'line-through';
    }
});
$(document).on('click', '#none', function () {

    var dom = a.getSelect();
    if (dom) {
        dom.style.textDecoration = 'none';
    }
});

//复制文字
$(document).on('click', '.btn_copy', function () {
    var dom = a.getSelect();
    if (dom) {
        $('.comment').val($('.comment').val() + dom.innerHTML);
    }
});
//撤销所有样式
$(document).on('click', '.btn_delete', function () {
    $('.comment').val('');
    a.clear();
});

var original = {
    'write': "When it comes to college life,we can't ignore this fact.That on campus we can see some not good phenomenon widespread which do harm to their health.Typical examples are followed,some of them stay up too late which easily resulting in waking up late even skipping classes.Others consume too much money in an inappropriate way.Besides many are tended to be addicted to computer games and so.\r\nIt can be noticed that the majority has a good learning of the negative impacts.In the first place,they have difficulty in focusing on lessons about what teachers said in the daytime.In addition,they are likely to neglect their studies and drop out.They gradually become physical or mental ill-being.Even worse,they may embark on the crimes.\r\nTherefore,we just can not leave youngsters alone,or they are likely to be influenced by unhealthy tendencies.It's high time that the college students should take effective methods to get rid of unhealthy habits and live a colorful life.It is advisable that college students themselves ought to strengthen the awareness to lead a healthy life.Furthermore,they ought to gather the courage to participate in outdoor activities and go to interesting and meaningful clubs.Last but not lest,students themselves should control their lives in an appropriate way to maintain a balance between playing and studying instead of yielding to the temptation.Only in this way,can they make a change and lead a meaningful and wonderful life on campus."
}
var baseurl = 'http://192.168.1.146:9000';



//创建新的数组，复制后台传递的错误信息
var dataNew = [];
var error_count = 0;
// layui.use('table', function () {
    // var table = layui.table;

    // //展示作文列表
    // table.render({
    //     elem: '#composition_list',
    //     method: 'post',
    //     id: 'composition_list',
    //     height: 312,

    //     url: baseurl + '/correct1/',

    //     parseData: function (res) {
    //         console.log(res);
    //         return {
    //             "code": 0,
    //             "msg": '',
    //             "count": 1000,
    //             "data": res.data
    //         }
    //     },

    //     cols: [[ //表头

    //         { field: 'identifier', title: '作文列表', width: '100%', style: 'cursor: pointer;', align: 'center' }

    //     ]]
    // });

    //监听单元格点击事件
    // table.on('row(demoEvent)', function (obj) {
    //     var dataNumber = $(obj.tr).text();
    $("#ti1").click(function() {
        $.ajax({
            type: 'post',
            url: '/load/',
            dataType: 'json',
            data: $('#kk').serialize(),
            success: function (data) {
                dataNew = data;
                //页面一加载显示所有错误标注
                var html = dataNew.original;
                // console.log(typeof (dataNew.original))
                for (let i = dataNew.errors.length - 1; i >= 0; i--) {
                    for (let j = dataNew.errors[i].questions.length - 1; j >= 0; j--) {
                        var html1 = html.split('');//字符串转为字节数组

                        html1.splice(dataNew.errors[i].questions[j].offset, dataNew.errors[i].questions[j].length, '<span class="highlight"><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="' + error_count + '">&nbsp;</em><errorWords>' + dataNew.errors[i].questions[j].words + '</errorWords></span>');
                        //数组里追加新的属性——每个错误对应的唯一id
                        dataNew.errors[i].questions[j].id = error_count;
                        error_count++;
                        html = html1.join('');

                    }
                }
                $('.content').html(html.replace(/\r\n/g, "<br/>"))
                $('.content .highlight').css('color', '#eb3922');

                errorDetails();//悬浮在指定错误处显示错误详情
                var spanDoms = $('.comment_em');

                for (var i = 0; i < spanDoms.length; i++) {
                    $(spanDoms[i]).html(i + 1);
                }



            },
            error: function (jqXHR) {
                alert('发生错误：' + jqXHR.status);
            }
        });
    });

//点击错误分类显示所有错误标注

$('.system_solving > dl > a').click(function () {
    console.log(aaaa)
    if ($('.content').has('span').length != 0) {
        clearSelection();
      }
      var html = dataNew.original;
      for (let i = dataNew.errors.length - 1; i >= 0; i--) {
        for (let j = dataNew.errors[i].questions.length - 1; j >= 0; j--) {
            var html1 = html.split('');//字符串转为字节数组

            html1.splice(dataNew.errors[i].questions[j].offset, dataNew.errors[i].questions[j].length, '<span class="highlight"><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="' + error_count + '">&nbsp;</em><errorWords>' + dataNew.errors[i].questions[j].words + '</errorWords></span>');
            //数组里追加新的属性——每个错误对应的唯一id
            dataNew.errors[i].questions[j].id = error_count;
            error_count++;
            html = html1.join('');
            console.log(dataNew)

        }
    }
    $('.content').html(html.replace(/\r\n/g, "<br/>"))
    $('.content .highlight').css('color', '#eb3922');

    errorDetails();//悬浮在指定错误处显示错误详情
    var spanDoms = $('.comment_em');

    for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);
    }

})

//点击侧边导航栏的不同错误分类显示相应错误标注
$('.system_solving dd a').click(function () {

    if ($('.content').has('span').length != 0) {
        clearSelection();
      }
      var html = dataNew.original;
      for (let i = dataNew.errors.length - 1; i >= 0; i--) {
        for (let j = dataNew.errors[i].questions.length - 1; j >= 0; j--) {
            var html1 = html.split('');//字符串转为字节数组

            html1.splice(dataNew.errors[i].questions[j].offset, dataNew.errors[i].questions[j].length, '<span class="highlight"><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="' + error_count + '">&nbsp;</em><errorWords>' + dataNew.errors[i].questions[j].words + '</errorWords></span>');
            //数组里追加新的属性——每个错误对应的唯一id
            dataNew.errors[i].questions[j].id = error_count;
            error_count++;
            html = html1.join('');

        }
    }
    $('.content').html(html.replace(/\r\n/g, "<br/>"))
    $('.content .highlight').css('color', '#eb3922');

    errorDetails();//悬浮在指定错误处显示错误详情
    var spanDoms = $('.comment_em');

    for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);
    }

})


//悬浮窗口显示错误详情
function errorDetails() {
    for (let i = dataNew.errors.length - 1; i >= 0; i--) {
        for (let j = dataNew.errors[i].questions.length - 1; j >= 0; j--) {
            $('.content span').mouseover(function (e) {
                // console.log($($(e.target).parent().children('errorWords')).html(), '---', dataNew.errors[i].questions[j].words)
                if ($($(e.target).parent().children('errorWords')).html() == dataNew.errors[i].questions[j].words) {
                    if (dataNew.errors[i].questions[j].shortMessage == '') {
                        $('.content ul li:nth-child(2)').text('');
                    }
                    layer.tips('<ul><li>错误类型：' +
                        dataNew.errors[i].questions[j].words + '</li><li>修改建议：' +
                        dataNew.errors[i].questions[j].suggestion +
                        '</li><li>短语用法：' +
                        dataNew.errors[i].questions[j].shortMessage +
                        '</li><li>批改解释：' +
                        dataNew.errors[i].questions[j].Message +
                        "</li></ul><div class='layui-layer-btn layui-layer-btn- repeal' style='margin: 10px auto -10px;'><a class='layui-layer-btn0' style='padding: 1px 14px;'>撤销</a></div>"
                        , e.target, {
                        tips: 3
                    });
                    //点击撤销按钮，删除该处系统错误标注
                    $('.repeal').click(function () {
                        // console.log(1)                                            
                        // $(e.target).unbind('mouseenter').unbind('mouseleave');
                        // layer.closeAll(e.target)
                        $(e.target).parent().css('color', '');
                        $(e.target).parent().children('em').remove();
                        // console.log($(e.target).html(),dataNew.errors[i].offset,dataNew.errors[i].words,i);

                        var spanDoms = $('.comment_em');
                        for (let i = 0; i < spanDoms.length; i++) {
                            $(spanDoms[i]).html(i + 1);
                        }
                        //删除一处系统错误，复制的数组里同步删除
                        dataNew.errors[i].questions.splice(j, 1);


                    });
                }
            });

        }
    }
}



//遍历清除错误标注中生成的span标签以及em序号内容
function clearSelection() {
    $('.content span').each(function () {
      $(this).replaceWith($(this).text());
    });
    $('.content em').each(function () {
      $(this).remove();
    });
  }


//批改结果最终提交
$('.correct_button').click(function () {

    var m1 = $(".content").html();
    var m = m1.replace(/<br>/g, '\r\n');
    console.log(m);
    console.log(document.getElementsByTagName("em").length);

    for (var index = 0; index < document.getElementsByTagName("em").length; index++) {

        var w1 = m.indexOf('<span');
        console.log(w1);
        var number = document.getElementsByTagName("em")[index].getAttribute("id");
        var b1 = m.replace(/<span.*?<errorwords>/, '');
        var b2 = b1.replace(/<.*?span>/, '');
        var m = b2;

        for (var i = 0; i < dataNew.errors.length; i++) {
            // for(var item in dataNew.errors[i]){
            //     if (item == 'sentence') {
            //       delete dataNew.errors[i][item];
            //     } 
            //   }
            for (var j = 0; j < dataNew.errors[i].questions.length; j++) {

                if (dataNew.errors[i].questions[j].id == number) {
                    dataNew.errors[i].questions[j].offset = w1;

                }

            }

        };

    };
    console.log(dataNew);

    var a1 = dataNew.identifier;
    var a2 = dataNew.essay_statistics;
    var a3 = dataNew.errors;
    var a4 =[];
    for(var i in a3) {
        if(a3[i].questions.length>0){
        a4[i]=a3[i].questions;
        };
    };
    var a5 = Array.prototype.concat.apply([], a4);




    var data = {
                'identifier': a1,
                'essay_statistics': JSON.stringify(a2),
                'questions':JSON.stringify(a5),
               };
 
//     //将新数组回传
    $.ajax({
        url: '/complete/',
        type: "post",
        // async: false,
        traditional: true,
        data: data,
        success: function () {
            alert('保存成功');
        },
        error: function (msg) {
            alert("添加关键词失败");
        }
    });


})

