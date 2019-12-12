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
        // 返回文档中匹配指定 CSS 选择器的一个元素,只返回匹配的第一个元素，如果没有匹配项，返回null
        let selected = window.getSelection();
        // getSelection()方法可以返回一个Selection对象，用于表示用户选择的文本范围或插入符的当前位置
        if (selected.type === 'None') {
            return;
        }

        let selectedStr = selected.toString();  //toString()--返回selection的纯文本，也就是返回选中区域的文本内容(把一个逻辑值转为字符串)
        if (selected && selected.rangeCount > 0) {  //rangeCount：selection中range的数目，一般一个，ctrl键配合多个
            let r = selected.getRangeAt(0);   //getRangeAt() --从当前selection中获取某一个range对象
            if (r.startContainer === r.endContainer && isParent(r.startContainer, resultEle) && selectedStr) {
                //startContainer:此Range对象的开始点位于哪个节点
                //endContainer:此Range对象的结束点位于哪个节点
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

        layer.open({
            type: 1,
            zIndex: '9',
            closeBtn: 1,
            title: '批改框',
            area: ['400px', '400px'], 
            content: pop.innerHTML,
            shadeClose: true,
            btn: ['确认'],
            yes: function (index, layero) {
                popup_confirm(index)
            },
            cancel: function () {

                a.clear();
            },
            end: function () {
                if (!flag) {

                    a.clear();
                }
                flag = false;

            },
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

var flag = false;
//批改编辑框-确认

function popup_confirm(index) {
    var dom = a.getSelect();

    if (dom) {
        //只输入了错误类型
        if ($('.comment_type').val() != '' && $('.comment').eq(1).val() == '') {
            $(dom).replaceWith(function () {
                return $('<div class="wrap" style="display: inline-block"><span class="' + optionContent + ' show"><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="'
                    + error_count + '">&nbsp;</em><errorWords>'
                    + dom.innerHTML
                    + '</errorWords></span><div class="error_mark"><ul><li>错误类型：' +
                    optionContent + '</li><li>修改建议：' +
                    $('.comment').eq(1).val() +
                    '</li></ul><div class="layui-layer-btn layui-layer-btn-" style="padding: 10px 5px 5px 50px;float: left;"><a class="layui-layer-btn0" onclick = "repealDetails(' + error_count + ')">撤销</a></div> <div class="layui-layer-btn layui-layer-btn-" style="padding: 10px 5px 5px 0;float: left;"><a class="layui-layer-btn0 editor" onclick = "editorDetails(' + error_count + ')">编辑</a></div></div></div>');
            });

            flag = true;
            layer.close(index);
        } else if ($('.comment_type').val() == '' && $('.comment').eq(1).val() != '') {

            layer.msg('请输入错误类型！', function () {

            });
            flag = false;

        } else if ($('.comment_type').val() == '' && $('.comment').eq(1).val() == '') {

            layer.msg('请输入错误类型或者批改内容！', function () {

            });
            flag = false;

        } else if ($('.comment_type').val() != '' && $('.comment').eq(1).val() != '') {
            //输入了错误类型和批改内容
            $(dom).replaceWith(function () {
                return $('<div class="wrap" style="display: inline-block"><span class="' + optionContent + ' show"><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="'
                    + error_count + '">&nbsp;</em><errorWords>'
                    + dom.innerHTML
                    + '</errorWords></span><div class="error_mark"><ul><li>错误类型：' +
                    optionContent + '</li><li>修改建议：' +
                    $('.comment').eq(1).val() +
                    '</li></ul><div class="layui-layer-btn layui-layer-btn-" style="padding: 10px 5px 5px 50px;float: left;"><a class="layui-layer-btn0" onclick = "repealDetails(' + error_count + ')">撤销</a></div> <div class="layui-layer-btn layui-layer-btn-" style="padding: 10px 5px 5px 0;float: left;"><a class="layui-layer-btn0 editor" onclick = "editorDetails(' + error_count + ')">编辑</a></div></div></div>');
            });
            flag = true;
            layer.close(index);
        }


    }
    var spanDoms = $('.comment_em');
    for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);

    }

    //教师批改的新对象
    var newdata = {
        sentence: '',
        questions: [{
            issueType: optionContent,
            offset: '',
            length: $(dom).text().length,

            words: $(dom).text(),
            suggestion: $('.comment').eq(1).val(),
            shortMessage: '',
            Message: '',
            id: error_count//数组里追加新的属性——每个错误对应的唯一id
       
        }]

    };

    error_count++;
    dataNew.errors.push(newdata);
    wordsOffset();
 
    errorCategory(dataNew.errors);//侧边栏显示错误类别数量
    errorDetails();//悬浮在指定错误处显示错误详情
    $('.layui_details').children().remove();
    errorShow();//显示错误列表
    console.log(dataNew);

};


layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(demo)', function (elem) {
    
        layer.msg(elem.text());
    });
});


//下拉框选择点评类型
var optionContent;
layui.use('form', function () {
    var form = layui.form;
    form.on('select(filter)', function (data) {
        $('.comment_type').val(this.innerText);

        //获取下拉框选中的选项的content属性值
        optionContent = data.value;

        var elem = data.elem;
        var textId = elem.getAttribute("textId");


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
        $('.comment').val($('.comment').eq(1).val() + dom.innerHTML);
    }
});
//撤销所有样式
$(document).on('click', '.btn_delete', function () {
    $('.comment').val('');
    a.clear();
});



//创建新的数组，复制后台传递的错误信息
var dataNew = [];
var error_count = 0;

//侧边导航栏显示错误类型个数
function errorCategory(arr) {

    var whitespaceN = 0;
    var grammarN = 0;
    var styleN = 0;
    var misspellingN = 0;
    var typographicalN = 0;
    var duplicationN = 0;
    var localeN = 0;
    var inconsistencyN = 0;
    var uncategorizedN = 0;
    var errorsN = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = arr[i].questions.length - 1; j >= 0; j--) {
            if (arr[i].questions[j].issueType == 'whitespace') {
                whitespaceN++;
            }

            if (arr[i].questions[j].issueType == 'grammar') {
                grammarN++;
            }
            if (arr[i].questions[j].issueType == 'style') {
                styleN++;
            }
            if (arr[i].questions[j].issueType == 'misspelling') {
                misspellingN++;
            }
            if (arr[i].questions[j].issueType == 'typographical') {
                typographicalN++;
            }
            if (arr[i].questions[j].issueType == 'duplication') {
                duplicationN++;
            }
            if (arr[i].questions[j].issueType == 'locale-violation') {
                localeN++;
            }
            if (arr[i].questions[j].issueType == 'inconsistency') {
                inconsistencyN++;
            }
            if (arr[i].questions[j].issueType == 'uncategorized') {
                uncategorizedN++;
            }
        }
    }
    errorsN = whitespaceN + grammarN + styleN + misspellingN + typographicalN + duplicationN + localeN + inconsistencyN + uncategorizedN;

    $('.system_solving dd:first-child a span').html(' (' + errorsN + ')');
    $('.system_solving dd:nth-child(2) a span').html(' (' + whitespaceN + ')');
    $('.system_solving dd:nth-child(3) a span').html(' (' + grammarN + ')');
    $('.system_solving dd:nth-child(4) a span').html(' (' + styleN + ')');
    $('.system_solving dd:nth-child(5) a span').html(' (' + misspellingN + ')');
    $('.system_solving dd:nth-child(6) a span').html(' (' + typographicalN + ')');
    $('.system_solving dd:nth-child(7) a span').html(' (' + duplicationN + ')');
    $('.system_solving dd:nth-child(8) a span').html(' (' + localeN + ')');
    $('.system_solving dd:nth-child(9) a span').html(' (' + inconsistencyN + ')');
    $('.system_solving dd:nth-child(10) a span').html(' (' + uncategorizedN + ')');
    if (whitespaceN == 0) {
        $('.system_solving dd:nth-child(2) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(2) a').css('color', '#ffffffb3')
    }
    if (grammarN == 0) {
        $('.system_solving dd:nth-child(3) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(3) a').css('color', '#ffffffb3')
    }
    if (styleN == 0) {

        $('.system_solving dd:nth-child(4) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(4) a').css('color', '#ffffffb3')
    }
    if (misspellingN == 0) {
        $('.system_solving dd:nth-child(5) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(5) a').css('color', '#ffffffb3')
    }
    if (typographicalN == 0) {
        $('.system_solving dd:nth-child(6) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(6) a').css('color', '#ffffffb3')
    }
    if (duplicationN == 0) {
        $('.system_solving dd:nth-child(7) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(7) a').css('color', '#ffffffb3')
    }
    if (localeN == 0) {
        $('.system_solving dd:nth-child(8) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(8) a').css('color', '#ffffffb3')
    }
    if (inconsistencyN == 0) {
        $('.system_solving dd:nth-child(9) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(9) a').css('color', '#ffffffb3')
    }
    if (uncategorizedN == 0) {
        $('.system_solving dd:nth-child(10) a').css('color', '#8c8985')
    } else {
        $('.system_solving dd:nth-child(10) a').css('color', '#ffffffb3')
    }
}
//封装作文循环遍历错误单词标注方法
function errorTagging(data) {

    //页面一加载显示所有错误标注

    var html = data.original;
    var m = [];
    for (let i = data.errors.length - 1; i >= 0; i--) {
        for (let j = data.errors[i].questions.length - 1; j >= 0; j--) {
            var html1 = html.split('');//字符串转为字节数组
          
        let display='block';
        let display1='block';
        let display2='block';
        if(!data.errors[i].questions[j].suggestion){
            display='none';
        };
        if(!data.errors[i].questions[j].shortMessage){
            display1='none';
        };
        if(!data.errors[i].questions[j].Message){
            display2='none';
        };
      

                html1.splice(data.errors[i].questions[j].offset, data.errors[i].questions[j].length, '<div class="wrap" style="display: inline-block"><span class="' + data.errors[i].questions[j].issueType + ' show"><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em"  id="'
                + data.errors[i].questions[j].id + '">&nbsp;</em><errorWords>'
                + data.errors[i].questions[j].words
                + '</errorWords></span><div class="error_mark"><ul><li>错误类型：' +
                data.errors[i].questions[j].issueType + '</li><li style="display:'+display+'">修改建议：' +
                data.errors[i].questions[j].suggestion +
                '</li><li style="display:'+display1+'">短语用法：' +
                data.errors[i].questions[j].shortMessage +
                '</li><li style="display:'+display2+'">批改解释：' +
                data.errors[i].questions[j].Message +
                '</li></ul><div class="layui-layer-btn layui-layer-btn-" style="padding: 10px 5px 5px 50px;float: left;"><a class="layui-layer-btn0" onclick = "repealDetails(' + data.errors[i].questions[j].id + ')">撤销</a></div> <div class="layui-layer-btn layui-layer-btn-" style="padding: 10px 5px 5px 0;float: left;"><a class="layui-layer-btn0" onclick = "editorDetails(' + data.errors[i].questions[j].id + ')">编辑</a></div></div></div>');
   
           
            //数组里追加新的属性——每个错误对应的唯一id
            m.push(data.errors[i].questions[j].id);
            // error_count++;
            html = html1.join('');
      
        }
    }

    m.sort(function (a, b) {
               return a-b;});
    error_count = m[m.length - 1]+1;
    $('.content').html(html.replace(/\r\n/g, "<br/>"))

    $('.content span').css('color', '#eb3922');
    var spanDoms = $('.comment_em');
    for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);
    }

    errorDetails()//悬浮在指定错误处显示错误详情
    errorCategory(data.errors);//侧边栏显示错误类别数量
    errorShow();//显示错误列表
}

var essay_statistics=[];

    //监听单元格点击事件
// $("#ti1").click(function() {
        
//         $.ajax({
//             type: 'post',
//             url:'/load/',
//             dataType: 'json',
//             data: $('#kk').serialize(),
//             success: function (data) {
         
//                 dataNew = data;
                // dataNew=aaa;
                // console.log(dataNew);
                dataNew['essay_statistics']={"word_count": 127, "sentence_count": 10, "avg_sentence_len": 13.86, "sentence_word_1to5": 0, "sentence_word_6to10": 1, "sentence_word_11to15": 3, "sentence_word_16to20": 3, "sentence_word_21to25": 0, "sentence_word_26to30": 0, "sentence_word_31to40": 0, "sentence_word_41to50": 0, "sentence_word_51more": 0, "avg_word_len": 3.74, "long_word_4less": 43, "long_word_4to6": 42, "long_word_7to10": 11, "long_word_11to15": 1, "long_word_16more": 0, "unique_word": 47, "stopwords_count": 31, "noun_count": 18, "adj_count": 1, "adv_count": 6, "verb_count": 15, "foreign_count": 0, "prep_count": 9, "lower_7_count": 91, "grade_7_count": 67, "grade_8_count": 23, "grade_9_count": 19, "higher_9_count": 5, "sentence_simple_count": 5, "sentence_compound_count": 3, "sentence_complex_count": 2, "conjunction_word_count": 5}
                errorTagging(dataNew);//页面一加载显示所有错误标注
         
                //右侧的词汇信息图表
                $('.middle_content').css('display', 'inline-block');
                $('.right_show').css('display', 'inline-block');
                $('.word_details').show();
                $('.word_countN  span').html(dataNew.essay_statistics.word_count);
                $('.avg_word_lenN  span').html(dataNew.essay_statistics.avg_word_len.toFixed(1));
                $('.unique_wordN  span').html(dataNew.essay_statistics.unique_word);
                $('.conjunction_word_countN  span').html(dataNew.essay_statistics.conjunction_word_count);
                $('.sentence_countN  span').html(dataNew.essay_statistics.sentence_count);
                $('.avg_sentence_lenN  span').html(dataNew.essay_statistics.avg_sentence_len.toFixed(1));
                $('.sentence_simple_countN  span').html(dataNew.essay_statistics.sentence_simple_count);
                $('.sentence_compound_countN  span').html(dataNew.essay_statistics.sentence_compound_count);
                $('.sentence_complex_countN  span').html(dataNew.essay_statistics.sentence_complex_count);
                $('.sentence_compound_complex_countN  span').html(2);

                var showHeight = $(".middle_content").height();

                $('.right_show').css('height', showHeight + 'px');
                $('.right_show ul').css('height', showHeight-50 + 'px');
                essay_statistics=dataNew.essay_statistics;
           

//             },
//             error: function (jqXHR) {
//                 alert('发生错误：' + jqXHR.status);
//             }
//         });
// });



//计算鼠标在盒子中的位置 
function evfun(_this, event) {
    event = event || window.event;

    var pagex = event.pageX || scroll().left + event.clientX;
    var pagey = event.pageY || scroll().top + event.clientY;

    var xx = $(_this).offset().left;
    var yy = $(_this).offset().top;

    var targetx = pagex - xx;
    var targety = pagey - yy;
    var xydata = {
        x: targetx,
        y: targety
    }
    return xydata
}

//封装的scrollTop
function scroll() {
    if (window.pageYOffset != null) {

        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if (document.compatMode === "CSS1Compat") {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {  
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}


//悬浮窗口显示错误详情
function errorDetails() {

    $('.content span').bind({
        mouseenter: function (e) {

            if ($(e.target).parent().hasClass('show')) {
                $(e.target).parent().parent().find('.error_mark').show();

                var _this = $('.content');
                var mouh = evfun(_this, event);
             
                if (e.clientY + $(e.target).parent().parent().find('.error_mark').height() + 10 > window.innerHeight) {

                    $(e.target).parent().parent().find('.error_mark').css('top', mouh.y - $(e.target).parent().parent().find('.error_mark').height() - 40);
                }

             
            }

        },

    });
    $(".wrap").bind({
        mouseleave: function (e) {
            $(e.target).parent().parent().find('.error_mark').hide();
        }
    })
}

//点击撤销按钮，删除该处系统错误标注
function repealDetails(e) {
    // console.log(e)
    var issueType;
    //删除一处系统错误，复制的数组里同步删除
    for (var i = 0; i < dataNew.errors.length; i++) {
        for (var j = 0; j < dataNew.errors[i].questions.length; j++) {
            if (e == dataNew.errors[i].questions[j].id) {
                issueType = dataNew.errors[i].questions[j].issueType;
                dataNew.errors[i].questions.splice(j, 1);
            }
        }
    };
    errorTagging(dataNew)//页面一加载显示所有错误标注 
    // $('.content span').removeClass('show').addClass('hide');
    // for (let i = 0; i < $('.content span').length; i++) {
    //     if ($('.content span:eq(' + i + ')').hasClass(issueType)) {
    //         $('.content span:eq(' + i + ')').removeClass('hide').addClass('show');
    //     }
    // }
}

//点击编辑按钮，跳出原始批改编辑框
function editorDetails(e) {
 

    $('.error_mark').hide();
    let pop = document.querySelector('.popup1');

    layer.open({

        type: 1,
        zIndex: '9',
        closeBtn: 1,
        title: '重新编辑框',
        area: ['400px', '400px'], //宽高
        content: pop.innerHTML,
        shadeClose: true,//点击遮罩关闭
        btn: ['确认'],
        yes: function (index, layero) {
            popup_confirm1(index, e)
        },
     
        success: function (layero, index) {
            layui.form.render();
        }
    });
    //错误类别的中文
    var issueTypeChinese = {
        'whitespace': '空白提示',
        'grammar': '语法错误',
        'style': '句子冗长',
        'misspelling': '拼写错误',
        'typographical': '排版问题',
        'duplication': '重复提示',
        'locale-violation': '美式英语',
        'inconsistency': '搭配不当',
        'uncategorized': '未分类处'
    };

    for (let i = dataNew.errors.length - 1; i >= 0; i--) {
        for (let j = dataNew.errors[i].questions.length - 1; j >= 0; j--) {

            if (e == dataNew.errors[i].questions[j].id) {
                console.log($('.comment1'))
                console.log($('.comment_type1'))
                var issueType = dataNew.errors[i].questions[j].issueType;
                $('.comment1').val(dataNew.errors[i].questions[j].suggestion);

                $('.comment_type1').val(issueTypeChinese[issueType]);

            }
          
        }
    }

}
//重新编辑框内的错误类别下拉列表
var optionContent1;
layui.use('form', function () {
    var form = layui.form;
    form.on('select(filter1)', function (data) {
        $('.comment_type1').val(this.innerText);
        //获取下拉框选中的选项的content属性值
        optionContent1 = data.value;
    });
});
//悬浮框中的编辑确认事件
var flag1 = false;
function popup_confirm1(index, e) {
 
    // 重新更新数组数据    
    for (let i = dataNew.errors.length - 1; i >= 0; i--) {
        for (let j = dataNew.errors[i].questions.length - 1; j >= 0; j--) {
            if (e == dataNew.errors[i].questions[j].id) {
                console.log($('.comment1').val(), $('.comment_type1').val())
                dataNew.errors[i].questions[j].suggestion = $('.comment1').eq(1).val();
                dataNew.errors[i].questions[j].issueType = optionContent1;
            }

        }
    }
    layer.close(index);
    errorTagging(dataNew)

};


//点击错误分类显示所有错误标注

$('.system_solving dd:first-child a').click(function () {
    $('.content span').removeClass('hide').addClass('show');

})

//点击侧边导航栏的不同错误分类显示相应错误标注
$('.system_solving dd a').not(":first").click(function () {
    $('.content span').removeClass('show').addClass('hide');
    for (let i = 0; i < $('.content span').length; i++)
        if ($('.content span:eq(' + i + ')').hasClass($(this).prop('class'))) {

            $('.content span:eq(' + i + ')').removeClass('hide').addClass('show');
        }

})


//作文下方逐条显示系统批改详情
function errorShow() {
    $('.layui_details').empty();

    var index = 1;
    for (let i = 0; i < dataNew.errors.length; i++) {
        var row = document.createElement('DIV');
        $(row).addClass('layui-row').css('margin', '0');
        $(row).addClass('layui-col-space15').css('background-color', '#fff');
        $(row).css('border-bottom', '0.7px solid #c1c0c0');
        var md6 = document.createElement('DIV');
        $(md6).addClass('layui-col-md5').css('width', '48%');
        var indexDiv = document.createElement('DIV');
        $(indexDiv).addClass('indexStyle').html(index + '.');
        $(indexDiv).addClass('layui-col-md1').css('width', '2%');
        var card = document.createElement('DIV');
        $(card).addClass('layui-card').css('box-shadow', '0 1px 2px 0 rgba(0,0,0,0)');
        var card_body = document.createElement('DIV');
       
        $(card_body).addClass('layui-card-body').css('height', 'auto').html(dataNew.original.substr(dataNew.errors[i].sentence.offset, dataNew.errors[i].sentence.length));
        index++;
        var ul_html = '<ul>';
      
        var md61 = document.createElement('DIV');
        $(md61).addClass('layui-col-md5');
        var card1 = document.createElement('DIV');
        $(card1).addClass('layui-card').css('box-shadow', '0 1px 2px 0 rgba(0,0,0,0)');
        var card_body1 = document.createElement('DIV');
        $(card_body1).addClass('layui-card-body').css('height', 'auto');

        for (let j = 0; j < dataNew.errors[i].questions.length; j++) {
            let display='block';
        let display1='block';
        let display2='block';
        if(!dataNew.errors[i].questions[j].suggestion){
            display='none';
        };
        if(!dataNew.errors[i].questions[j].shortMessage){
            display1='none';
        };
        if(!dataNew.errors[i].questions[j].Message){
            display2='none';
        };
            if (dataNew.errors[i].questions.length < 1) {
                ul_html +=
                    '<li>错误类型：' +
                    dataNew.errors[i].questions[j].issueType +
                    '</li><li>错误单词：' +
                    dataNew.errors[i].questions[j].words +
                    '</li><li style="display:'+display+'">修改建议：' +
                    dataNew.errors[i].questions[j].suggestion +
                    '</li><li style="display:'+display1+'">短语用法：' +
                    dataNew.errors[i].questions[j].shortMessage +
                    '</li><li style="display:'+display2+'">批改解释：' +
                    dataNew.errors[i].questions[j].Message +
                    '</li>';
            } else {
                ul_html +=
                    '<li>错误类型：' +
                    dataNew.errors[i].questions[j].issueType +
                    '</li><li>错误单词：' +
                    dataNew.errors[i].questions[j].words +
                    '</li><li style="display:'+display+'">修改建议：' +
                    dataNew.errors[i].questions[j].suggestion +
                    '</li><li style="display:'+display1+'">短语用法：' +
                    dataNew.errors[i].questions[j].shortMessage +
                    '</li><li style="display:'+display2+'">批改解释：' +
                    dataNew.errors[i].questions[j].Message +
                    '</li><li style="padding: 8px;"></li>';
            
            
            }
        }
        if (dataNew.errors[i].questions && dataNew.errors[i].questions.length > 0) {
        } else {
            $(md6).addClass('layui-col-md5').css('width', '98%');
        }

        ul_html += '</ul>';

        $(card_body1).append(ul_html);
        $(card).append(card_body);
        $(md6).append(card);
        $(card1).append(card_body1);
        $(md61).append(card1);
        $(row).append(indexDiv)
        $(row).append(md6);
        $(row).append(md61);
        $('.layui_details').append(row);
    }

}

//正则替换文中标签，依次替换获取错误单词的位置
function wordsOffset() {
    var h = $(".comment_em").text();
    var m1 = $(".content").html();
    var m = m1.replace(/<br>/g, '\r\n');

    for (var index = 0; index < document.getElementsByTagName("em").length; index++) {

        var w1 = m.indexOf('<div class="wrap"');
        var number = document.getElementsByTagName("em")[index].getAttribute("id");
        var b1 = m.replace(/<div.*?<errorwords>/, '');
        var b2 = b1.replace(/<.*?div>/, '').replace(/<.*?div>/, '').replace(/<.*?div>/, '').replace(/<.*?div>/, '').replace(/\s/, '');
        var m = b2;

        for (var i = 0; i < dataNew.errors.length; i++) {
            for (var j = 0; j < dataNew.errors[i].questions.length; j++) {
                if (dataNew.errors[i].questions[j].id == number) {
                    dataNew.errors[i].questions[j].offset = w1;
                }
            }
        };
    };
    var a=[];
    var b=[];
    Object.assign(a,dataNew.errors);
    var shuzu=[];
    var qshuzu=[];
    for (var i = 0; i < dataNew.errors.length; i++) {
        for (var j = 0; j < dataNew.errors[i].questions.length; j++) {
            shuzu.push(dataNew.errors[i].questions[j]);    
        };
    };
    for (var i = 0; i < a.length; i++) {
        if(a[i].sentence!=""){
            a[i].questions=[];
            qshuzu.push(a[i]);
        }
    };
    var compare = function (obj1, obj2) {
                    var val1 = obj1.offset;
                    var val2 = obj2.offset;
                    if (val1 < val2) {
                       return -1;
                    } else if (val1 > val2) {
                    return 1;
                    } else {
                     return 0;
                    }            
                }; 
    var kk1=shuzu.sort(compare);

    for (var i = 0; i < shuzu.length; i++) {
        var a1 = shuzu[i].offset;
        var a2 = shuzu[i].length;
        var a3 = a1+a2;
        for (var j = 0; j < qshuzu.length; j++) {
            var b1 = qshuzu[j].sentence.offset;
            var b2 = qshuzu[j].sentence.length;
            var b3 = b1+b2;
            if( a1>=b1 && a1 < b3 ) {
               qshuzu[j].questions.push(shuzu[i]); 
            }   
        };
    };

    dataNew.errors = qshuzu;
}

//批改结果最终提交
$('.correct_button').click(function () {

    var rex = /^[0-9]+.?[0-9]*$/;
    var flag = rex.test($('#scores').val());
    if (flag) {
    var b1 = $('#word').val();
    var b2 = $('#sentence').val();
    var b3 = $('#structure').val();
    var b4 = $('#totle').val();
    var b5 = $('#scores').val();
    var b6 ={"word":b1,"sentence":b2,"structure":b3,"totle":b4,"scores":b5}; 
    var a1 = dataNew.identifier;
    var a2 = dataNew.essay_statistics;
    var a3 = dataNew.errors;
    var a4 = [];
    for (var i in a3) {
        if (a3[i].questions.length > 0) {
            a4[i] = a3[i].questions;
        };
    };
    var a5 = Array.prototype.concat.apply([], a4);
    var data = {
        "identifier": a1,
        "essay_statistics": JSON.stringify(a2),
        "questions": JSON.stringify(a5),
        "comment":JSON.stringify(b6),
    };

    console.log(data)
    //将新数组回传
    $.ajax({
        url: '/complete/',
        type: "post",
    
        traditional: true,
        data: data,
        success: function (data) {
            alert("保存成功");
            window.location.href = "/correct/"; 
        },
        error: function (data) {
            alert("保存失败");
        },
    });
    };
})


//右侧图表信息展示
layui.use('element', function () {
    var element = layui.element;


});


$(document).on('click', '.word_details', function () {
    wordEchart1()
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        area: ['1100px', '700px'], //宽高

        skin: 'yourclass',
        content: $('.pop_words')
    });
   
    wordEchart(essay_statistics)//显示词汇详情的弹窗内容
   
    console.log(essay_statistics)
});

layui.use('table', function () {
    var table = layui.table;

});


//右侧信息展示宽高随着屏幕放大缩小而同步变化
window.onresize = function () {
  
    var showHeight = $(".middle_content").height();

    $('.right_show').css('height', showHeight + 'px');
    $('.right_show ul').css('height', showHeight-50 + 'px');

}


// 点开详情弹窗内容
function wordEchart(data) {
    console.log(data)
    var echarts_bar = document.getElementById('echarts_bar');
    var myChart = echarts.init(echarts_bar);
    option = {

        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {interval:0,rotate:40 },
            data: ['小学', '七年级', '八年级', '九年级', '高年级']
        },
        yAxis: {
            show: false
        },
        series: [{
            data: [data.lower_7_count, data.grade_7_count, data.grade_8_count,data.grade_9_count, data.higher_9_count],
            type: 'bar',
            barWidth: 20,
            itemStyle: {
                normal: {

                    color: function (params) {

                        var colorList = ['#6198fe'];
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}'

            }

        }]
    };
    myChart.setOption(option,true);

    var echarts_pie1 = document.getElementById('echarts_pie1');
    var myChart1 = echarts.init(echarts_pie1);

    option1 = {
  
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['<4个字母','4~6个','7~10个','11~15个','>15个']
        },
        series: [
            {
                name: '单词数',
                type: 'pie',
                radius: ['55%', '75%'],
                center: ['72%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                normal: {
　　　　　　　
                color: function(params) {
                	
                    var colorList = ['#bcdaff','#8dc1fe','#6198fe','#3f89f9','#3377fe'];
                    return colorList[params.dataIndex]
                }
            }},
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: data.long_word_4less, name: '<4个字母' },
                    { value: data.long_word_4to6, name: '4~6个' },
                    { value: data.long_word_7to10, name: '7~10个' },
                    { value: data.long_word_11to15, name: '11~15个' },
                    { value: data.long_word_16more, name: '>15个' }
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1,true);
    var echarts_pie2 = document.getElementById('echarts_pie2');
    var myChart2 = echarts.init(echarts_pie2);

    option2 = {

    legend: {
        orient: 'vertical',
        x: 'left',
        data:['1~5个单词','6~10个','11~15个','16~20个','21~25个','26~30个','31~40个','41~50个','>50个']
    },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
            {
                name: '句子数',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['72%', '58%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        
                        color: function(params) {
                            
                            var colorList = ['#e4efff','#bcdaff','#8dc1fe','#6198fe','#3377fe'];
                            return colorList[params.dataIndex]
                        }
                    }},
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: data.sentence_word_1to5, name: '1~5个单词' },
                    { value: data.sentence_word_6to10, name: '6~10个' },
                    { value: data.sentence_word_11to15, name: '11~15个' },
                    { value: data.sentence_word_16to20, name: '16~20个' },
                    { value: data.sentence_word_21to25, name: '21~25个' },
                    { value: data.sentence_word_26to30, name: '26~30个' },
                    { value: data.sentence_word_31to40, name: '31~40个' },
                    { value: data.sentence_word_41to50, name: '41~50个' },
                    { value: data.sentence_word_51more, name: '>50个' },
                ]
            }
        ]
    };

    myChart2.setOption(option2,true);

    var echarts_pie3= document.getElementById('echarts_pie3');
    var myChart3 = echarts.init(echarts_pie3);
    option3 = {
          
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
             
                series : [
                    {
                        name: '句型占比',
                        type: 'pie',
                        radius : '80%',
                        center: ['50%', '50%'],
                        label:{
                            normal:{
                                 formatter: '{b}({c})',
                                 position: 'inside'
                            },
        
                        },
                        data:[
                            {value:data.sentence_simple_count, name:'简单句'},
                            {value:data.sentence_compound_count, name:'并列句'},
                            {value:data.sentence_complex_count, name:'复合句'},
                           
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal:{
                                color:function(params) {
                                //自定义颜色
                                var colorList = [          
                                    '#bcdaff','#8dc1fe','#6198fe'
                                    ];
                                    return colorList[params.dataIndex]
                                 }
                            }
                        }
                    }
                ]
            };
            myChart3.setOption(option3,true);


            //展示实词虚词的数量
            $('.notionalN').html(data.noun_count+data.adj_count+data.adv_count+data.verb_count);
            $('.functionN').html(data.prep_count);

}


function wordEchart1(){
    var echarts_bar = document.getElementById('echarts_bar');
    echarts_bar.removeAttribute("_echarts_instance_"); 

    var echarts_pie1 = document.getElementById('echarts_pie1');
    echarts_pie1.removeAttribute("_echarts_instance_"); 

    var echarts_pie2 = document.getElementById('echarts_pie2');
    echarts_pie2.removeAttribute("_echarts_instance_"); 

    var echarts_pie3= document.getElementById('echarts_pie3');
    echarts_pie3.removeAttribute("_echarts_instance_"); 

}