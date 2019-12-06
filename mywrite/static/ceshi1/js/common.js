
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
        console.log(result);
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
  }
}


//选中文字改变颜色
var a = addSelect({
  el: '.content',
  onSelect: function (e, cur) {
    let pop = document.querySelector('.popup');
    pop.style.display = 'block';
    $(".comment").val('');
    $(".comment_type").val('');
    $(".myform input").val('');

    if (e.clientX - 100 > window.innerWidth - 240) {
      pop.style.left = `${window.innerWidth - 400}px`;
    } else {
      pop.style.left = `${e.clientX - 200}px`;
    }
    pop.style.top = `${e.clientY + 40}px`;
  },

  backgroundColor: '#fff',
  color: '#ffaf5d',

});


//下拉框添加新的点评类型重新渲染
function renderForm() {
  layui.use('form', function () {
    var form = layui.form;
    form.render();

  });
}


$(".collect").click(function () {
  var ivalue = $(".comment_type").val();
  var option = $(".select_options")[0].options;
  // var sIndex=option.length-1;
  var flag = false;

  for (var i = 0; i < option.length; i++) {
    if (ivalue == $(option[i]).html()) {
      flag = true;
      break;
    }
  }
  if (flag) {
    alert("已有相同标签");
    return;
  }

  // console.log($(".select_options")[0].options[1])
  $(".select_options").append("<option value=" + ivalue + ">" + ivalue + "</option>");
  renderForm();

})




layui.use('layer', function () {
  var $ = layui.jquery, layer = layui.layer;

})
layui.use('element', function(){
  var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
  
  //监听导航点击
  element.on('nav(demo)', function(elem){
    //console.log(elem)
    layer.msg(elem.text());
  });
});


//下拉框选择点评类型
layui.use('form', function () {
  var form = layui.form;
  form.on('select(filter)', function (data) {
    $(".comment_type").val(data.value);

    var dom = a.getSelect();
    if (dom) {

      //根据错误类型改变字体颜色
      if ($(".comment_type").val() == "插入" || $(".comment_type").val() == "删除") {

        dom.style.color = "#5FB878";
      } else if ($(".comment_type").val() == "拼写错误" || $(".comment_type").val() == "语法错误") {
        dom.style.color = "#f13838";
      } else {
        dom.style.color = "#ffaf5d";

      }
    }
  })

});

//改变文字下划线样式

$("#underline").click(function () {
  var dom = a.getSelect();
  if (dom) {
    dom.style.textDecoration = "underline"
  }

});

$("#through").click(function () {
  var dom = a.getSelect();
  if (dom) {
    dom.style.textDecoration = "line-through"
  }

});
$("#none").click(function () {
  var dom = a.getSelect();
  if (dom) {
    dom.style.textDecoration = "none"
  }

});


//复制文字
$(".btn_copy").click(function () {
  var dom = a.getSelect();
  if (dom) {
    $(".comment").val($(".comment").val() + dom.innerHTML);
  }

})

//撤销所有样式
$(".btn_delete").click(function () {


  $(".comment").val('');

  a.clear();
})

//弹出框的确认添加与取消

var hover3 = hover4 = false;
$(".popup_cancel_wrap").hover(function () {
  hover4 = true;
}, function () {
  hover4 = false;
  setTimeout(function () {
    if (!hover3 && !hover4) {
      $(".popup_cancel_wrap").hide();
    }
  }, 100)
}
)

$('.confirm').click(function () {
  var dom = a.getSelect();
  if (dom) {
    //只输入了错误类型
    if ($(".comment_type").val() != '' && $(".comment").val() == '') {

      dom.innerHTML = '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em>' + dom.innerHTML;
      $(".popup_cancel").html("<ul><li>错误类型：" + $(".comment_type").val() + "</li></ul><div class='layui-layer-btn layui-layer-btn- repeal_teather' style='margin: 10px auto -10px;'><a class='layui-layer-btn0' style='padding: 1px 14px;'>撤销</a></div>");
      // + '<span  class="comment_content" style="text-decoration: none;display:inline-block">【' + $(".comment_type").val() + '】</span>';
      $(".popup").hide();

    } else if ($(".comment_type").val() == '' && $(".comment").val() != '') {

      alert("请输入错误类型！");

    } else if ($(".comment_type").val() == '' && $(".comment").val() == '') {
      alert("请输入错误类型或者批改内容！");
    }
    //输入了错误类型和批改内容
    else {
      dom.innerHTML = '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em>' + dom.innerHTML;
      $(".popup_cancel").html("<ul><li>错误类型：" + $(".comment_type").val() + "</li><li>批改内容："+$(".comment").val()+"</li></ul><div class='layui-layer-btn layui-layer-btn- repeal_teather' style='margin: 10px auto -10px;'><a class='layui-layer-btn0' style='padding: 1px 14px;'>撤销</a></div>");
      //  + '<span  class="comment_content" style="text-decoration: none;display:inline-block">【' + $(".comment_type").val() + "：" + $(".comment").val() + '】</span>';
      $(".popup").hide();
    }


    //鼠标悬浮在教师批注处，可选择清除该批注

    $(dom).bind({
      mouseenter: function (e) {
        var popCancel = document.querySelector(".popup_cancel_wrap");
        $(".popup_cancel_wrap").show();
        if (e.clientX - 100 > window.innerWidth - 240) {
          popCancel.style.left = `${window.innerWidth - 500}px`;
        } else {
          popCancel.style.left = `${e.clientX - 220}px`;
        }
        popCancel.style.top = `${e.clientY - 70}px`;
        hover3 = true;
      },
      mouseleave: function (e) {

        hover3 = false;
        setTimeout(function () {
          if (!hover3 && !hover4) {
            $(".popup_cancel_wrap").hide();
          }
        }, 100)
      }


    })

    //点击撤销按钮，删除该处系统错误标注
    $(".repeal_teather").click(function () {

      $(dom).unbind('mouseenter').unbind('mouseleave');
      $(dom).css('color', '');
      $(dom).children('.comment_em').remove();
      // $(dom).children('.comment_content').remove();

      $(".popup_cancel_wrap").hide();
      var spanDoms = $(".comment_em");
      for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);
    
      }
    })

  }
  var spanDoms = $(".comment_em");
  for (var i = 0; i < spanDoms.length; i++) {
    $(spanDoms[i]).html(i + 1);

  }


})

$(".cancel").click(function () {
  $(".popup").hide();

  a.clear();
})
$(".cancel1").click(function () {
  $(".popup").hide();

  a.clear();
})






//定位字符串位置，高亮显示错误

// $(".teacher_solving a").click(function () {
//   $(".middle_right").show();
//   $(".middle_right_1").hide();
// })
// $(".teacher_solving dd").click(function () {
//   $(".middle_right").show();
//   $(".middle_right_1").hide();
// })
// $(".system_solving a").click(function () {
//   $(".middle_right").hide();
//   $(".middle_right_1").show();
// })


//系统批注的展示
var hover1 = hover2 = false;
$(".error_mark_wrap").hover(function () {
  hover2 = true;
}, function () {
  hover2 = false;
  setTimeout(function () {
    if (!hover1 && !hover2) {
      $(".error_mark_wrap").hide();
    }
  }, 100)
}
)
$("#ti1").click(function() {
$('.content').html('');
$('.ty').html('');
$.ajax({
  type: "POST",                
  url: "/load/"+"&random="+new Date().getTime(),
  data: $('#kk').serialize(),
  success: function (data) {

    //前端展示整篇作文
    $(".content").html(data.essay);
    $('.ty').append('<input type="submit" id="dd" value="提交">');
    document.getElementById("mm").value=data.name;

    //悬浮窗口显示错误详情
    function errorDetails() {
      for (var i = 0; i < data.errors.length; i++) {
        (function (i) {
          $(".content span").bind({
            mouseenter: function (e) {
              var errorWrap = document.querySelector(".error_mark_wrap");
              var errorMark = document.querySelector('.error_mark');

              if ($(e.target).html() == data.errors[i].words) {

                $(".error_mark").html("<ul><li>修改建议：" + data.errors[i].suggestion + "</li><li>短语用法：" + data.errors[i].shortMessage + "</li><li>批改解释：" + data.errors[i].Message + "</li></ul><div class='layui-layer-btn layui-layer-btn- repeal' style='margin: 10px auto -10px;'><a class='layui-layer-btn0' style='padding: 1px 14px;'>撤销</a></div>");

                //点击撤销按钮，删除该处系统错误标注
                $(".repeal").click(function () {

                  $(e.target).unbind('mouseenter').unbind('mouseleave');
                  $(e.target).css('color', '');
                  $(e.target).prev().remove();
                

                  $(".error_mark_wrap").hide();
                  var spanDoms = $(".comment_em");
                  for (var i = 0; i < spanDoms.length; i++) {
                    $(spanDoms[i]).html(i + 1);
                
                  }

                })
                if (data.errors[i].shortMessage == '') {
                  $(".error_mark ul li:nth-child(2)").text('');
                }
              }

              $(".error_mark_wrap").show();
              if (e.clientX - 100 > window.innerWidth - 240) {
                errorWrap.style.left = `${window.innerWidth - 500}px`;
              } else {
                errorWrap.style.left = `${e.clientX - 270}px`;
              }
              errorWrap.style.top = `${e.clientY - 70}px`;

              hover1 = true;
            },
            mouseleave: function (e) {
              hover1 = false;
              setTimeout(function () {
                if (!hover1 && !hover2) {
                  $(".error_mark_wrap").hide();
                }
              }, 100)
            }
          })

        })(i);
      }
    }
    //截取错误处之前的字符串，检测br数量，得到新的错误处起始位置
    for (var i = 0; i < data.errors.length; i++) {
      var str = data.essay;
      // var allCount = (str.split('<br>')).length - 1;

      var positions = [];
      function searchSubStr(str, subStr) {
        var pos = str.indexOf(subStr);
        while (pos > -1) {
          positions.push(pos);
          pos = str.indexOf(subStr, pos + 1);
        }
      }
      searchSubStr(str, "<br>");

      for (var j = 0; j < positions.length; j++) {
        if (positions[j - 1] < data.errors[i].offset && data.errors[i].offset < positions[j]) {

          if (j >= 1) {
            data.errors[i].offset += 2 * j
          }

        }

      }

    }

    //页面一加载显示所有错误标注
    $(document).ready(function () {
      var error_count = 1;
      // $(".middle_right").hide();
      // $(".middle_right_1").show();

      if ($(".content").has("span").length != 0) {
        clearSelection();
      }
      var content = $(".content").html();
      for (var i = 0; i < data.errors.length; i++) {

        console.log(content.indexOf(data.errors[i].words));
        if (content.indexOf(data.errors[i].words) == data.errors[i].offset) {
          $(".content").each(function () {
            var html = $(this).html();
            var regExp = new RegExp(data.errors[i].words);
            var newHtml = html.replace(regExp, '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em><span class="highlight_' + error_count + '">' + data.errors[i].words + '</span>');
            $(this).html(newHtml);
            $(".highlight_" + error_count + "").css('color', '#eb3922');
            $("em").css('cursor', 'pointer');
            $("span").css('cursor', 'pointer');
            error_count++;
          })
        }
      }
      errorDetails();
      var spanDoms = $(".comment_em");
      for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);

      }

    })

    //点击侧边导航栏任一项该项背景色变色
    // $('.system_solving dd').click(function(){
    //   $('.system_solving dd').removeClass();
    //   $(this).addClass('layui-this');
    // })

//点击错误分类显示所有错误标注
$('.system_solving a').click(function () {
  var error_count = 1;
  // $(".middle_right").hide();
  // $(".middle_right_1").show();

  if ($(".content").has("span").length != 0) {
    clearSelection();
  }
  var content = $(".content").html();
  for (var i = 0; i < data.errors.length; i++) {

    // console.log(content.indexOf(data.errors[i].words));
    if (content.indexOf(data.errors[i].words) == data.errors[i].offset) {
      $(".content").each(function () {
        var html = $(this).html();
        var regExp = new RegExp(data.errors[i].words);
        var newHtml = html.replace(regExp, '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em><span class="highlight_' + error_count + '">' + data.errors[i].words + '</span>');
        $(this).html(newHtml);
        $(".highlight_" + error_count + "").css('color', '#eb3922');
        $("em").css('cursor', 'pointer');
        $("span").css('cursor', 'pointer');
        error_count++;
      })
    }
  }
  errorDetails();
  var spanDoms = $(".comment_em");
  for (var i = 0; i < spanDoms.length; i++) {
    $(spanDoms[i]).html(i + 1);

  }

})

    //点击系统批改——空白提示显示相应错误标注
    $(".system_solving dd:first-child").click(function () {
      var error_count = 1;
      // $(".middle_right").hide();
      // $(".middle_right_1").show();



      if ($(".content").has("span").length != 0) {
        clearSelection();
      }
      var content = $(".content").html();
      for (var i = 0; i < data.errors.length; i++) {

        if (data.errors[i].issueType == 'whitespace') {
          //   var subComposition=data.essay.slice(0,data.errors[i].offset);
          // var subCount=(subComposition.split('<br>')).length-1;
          // if(subCount>=1){
          //   data.errors[i].offset+=2*subCount
          // }
          if (content.indexOf(data.errors[i].words) == data.errors[i].offset) {


            $(".content").each(function () {
              var html = $(this).html();
              var regExp = new RegExp(data.errors[i].words);
              var newHtml = html.replace(regExp, '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em><span class="highlight_' + error_count + '">' + data.errors[i].words + '</span>');
              $(this).html(newHtml);
              $(".highlight_" + error_count + "").css('color', '#eb3922');

              $("em").css('cursor', 'pointer');
              $("span").css('cursor', 'pointer');

              error_count++;


            })

          }
        }
      }
      errorDetails();
      var spanDoms = $(".comment_em");
      for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);

      }


    })

    //点击系统批改——语法错误显示相应错误标注
    $(".system_solving dd:nth-child(2)").click(function () {
      var error_count = 1;

      // $(".middle_right").hide();
      // $(".middle_right_1").show();


      if ($(".content").has("span").length != 0) {

        clearSelection();
      }
      var content = $(".content").html();
      for (var i = 0; i < data.errors.length; i++) {

        if (data.errors[i].issueType == 'grammar') {

          if (content.indexOf(data.errors[i].words) == data.errors[i].offset) {

            $(".content").each(function () {
              var html = $(this).html();
              var regExp = new RegExp(data.errors[i].words);
              var newHtml = html.replace(regExp, '<em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em><span class="highlight_' + error_count + '">' + data.errors[i].words + '</span>');

              $(this).html(newHtml);


              $(".highlight_" + error_count + "").css('color', '#eb3922');
              $("em").css('cursor', 'pointer');
              $("span").css('cursor', 'pointer');
              error_count++;
            })
          }
        }
      }
      errorDetails();
      var spanDoms = $(".comment_em");
      for (var i = 0; i < spanDoms.length; i++) {
        $(spanDoms[i]).html(i + 1);

      }

    })

//作文下方逐条显示系统批改详情
$(document).ready(function () {
  for (var i = 0; i < data.errors.length;i++ ) {
    $('.layui-row').append("<div class='layui-col-md6'><div class='layui-card'><div class='layui-card-header' style='height: auto;'>原句："+data.errors[i].sentence+"</div><div class='layui-card-body' style='line-height: 35px;'><ul><li>错误类型："+data.errors[i].issueType+"</li><li>错误单词："+data.errors[i].words+"</li><li>修改建议："+data.errors[i].suggestion+"</li><li>短语用法："+data.errors[i].shortMessage+"</li><li>批改解释："+data.errors[i].Message+"</li></ul></div></div></div>");
    if (data.errors[i].shortMessage == '') {
      $(".layui-card-body ul li:nth-child(4)").text('');
    }
   
  }
  

})




  },
  error: function (jqXHR) {
    alert("发生错误：" + jqXHR.status);
  }
});
})

//遍历清除错误标注中生成的span标签以及em序号内容
function clearSelection() {
  $(".content span").each(function () {
    $(this).replaceWith($(this).text())
  });
  $(".content em").each(function () {
    $(this).remove();
  });
}


