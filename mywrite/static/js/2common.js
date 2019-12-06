
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
window.timecount = 0;
function addSelect(param) {
  let el = param.el;
  let backgroundColor = param.backgroundColor || '#fffb6c';
  let color = param.color;
  let onSelect = param.onSelect;

  // let currentEle = null;

  document.onmouseup = function (e) {
    let resultEle = document.querySelector(el);
    let selected = window.getSelection();

    // if (selected.type === 'None') {
    //   return;
    // }

    let selectedStr = selected.toString();
    if (selected && selected.rangeCount > 0) {
      let r = selected.getRangeAt(0);
      if (r.startContainer === r.endContainer && isParent(r.startContainer, resultEle) && selectedStr) {
        let children = resultEle.childNodes;
        let c;

        let result = '';

        for (let i = 0; i < children.length; i++) {
          if (children[i] === r.startContainer) {
            c = i;
          }
        }
        for (let i = 0; i < children.length; i++) {
          let node = children[i];
          if (node.toString() === '[object Text]') {
            if (i === c) {
              if (!window.timecount) { window.timecount = 1 } else { window.timecount++ }
              let start = node.nodeValue.substring(0, r.startOffset);
              let end = node.nodeValue.substring(r.endOffset);

              let span = `<span class="selected_` + window.timecount + `" style="background-color: ${backgroundColor};color: ${color}">${selectedStr}</span>`
              result += `${start}${span}${end}`;
              continue;
            }
            result += node.nodeValue
          } else {
            result += node.outerHTML;
          }
        }
        resultEle.innerHTML = result;
        if (onSelect) {
          onSelect(e);
        }
      }
    }
  };
}

//选中文字改变颜色
addSelect({
  el: '.content',
  onSelect: function (e) {
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
function renderForm(){
  layui.use('form', function () {
    var form = layui.form;
    form.render();
   
  });
  }


//下拉框选择点评类型
layui.use('form', function () {
  var form = layui.form; 
  form.on('select(filter)', function (data) {
    $(".comment_type").val(data.value);
  
 

    //根据错误类型改变字体颜色
    if ($(".comment_type").val() == "插入" || $(".comment_type").val() == "删除") {

      $(".selected_" + window.timecount + "").css("color", "#5FB878");
    } else if ($(".comment_type").val() == "拼写错误" || $(".comment_type").val() == "语法错误") {
      $(".selected_" + window.timecount + "").css("color", "#f13838");
    } else {
      $(".selected_" + window.timecount + "").css("color", "#ffaf5d");
    }
  })

});


//输入的新的点评类型加入收藏，步入下拉列表
// $("a.layui-layer-btn0 ").click(function () {
//   var newOption = $(".comment_type").val().trim();
//   if (newOption!="") {

//     var flag = false;
//     var options = $(".layui-anim.layui-anim-upbit dd");
//     for(var i = 0;i<options.length;i++){
//       if(newOption == $(options[i]).html()){
//         flag = true;
//         break;
//       }
//     }
//     if(flag){
//       alert("已有相同标签");
//       return;
//     }

//     var newOptionDom = $('<dd lay-value="'+newOption+'" class="">'+newOption+'</dd>');
//     newOptionDom.click(function(){
//       $(".comment_type").val(newOption)
//     })
//     $('.layui-anim.layui-anim-upbit').append(newOptionDom);
//     renderForm();
//   }
// })

$(".collect").click(function(){
  var ivalue=$(".comment_type").val();
  var option=$(".select_options")[0].options;
  // var sIndex=option.length-1;
  var flag = false;
    
      for(var i = 0;i<option.length;i++){
        if(ivalue == $(option[i]).html()){
          flag = true;
          break;
        }
      }
      if(flag){
        alert("已有相同标签");
        return;
      }
 
// console.log($(".select_options")[0].options[1])
  $(".select_options").append("<option value="+ivalue+">"+ivalue+"</option>");  
                renderForm();

})




layui.use('layer', function () {
  var $ = layui.jquery, layer = layui.layer;

})




//改变文字下划线样式
$("#underline").click(function () {
  $(".selected_" + window.timecount + "").css("text-decoration", "underline");
});

$("#through").click(function () {
  $(".selected_" + window.timecount + "").css("text-decoration", "line-through");
});
$("#none").click(function () {
  $(".selected_" + window.timecount + "").css("text-decoration", "none");
});


//复制文字
$(".btn_copy").click(function () {
  $(".comment").val($(".comment").val() + $(".selected_" + window.timecount + "").text());
})

//撤销所有样式
$(".btn_delete").click(function () {
  $(".selected_" + window.timecount + "").css("text-decoration", "none");
  $(".comment").val('');
  $(".selected_" + window.timecount + "").css("color", "#000");
})

//弹出框的确认添加与取消
$('.confirm').click(function () {
  if ($(".comment_type").val() != '' && $(".comment").val() == '') {
    $(".selected_" + window.timecount + "").append('<span  class="comment_content" style="text-decoration: none;display:inline-block">【' + $(".comment_type").val() + '】</span><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em>');
    $(".popup").hide();

  } else if ($(".comment_type").val() == '' && $(".comment").val() != '') {
   
    alert("请输入错误类型！");

  } else if ($(".comment_type").val() == '' && $(".comment").val() == '') {
    alert("请输入错误类型或者批改内容！");
  }
  else {
    $(".selected_" + window.timecount + "").append('<span  class="comment_content" style="text-decoration: none;display:inline-block">【' + $(".comment_type").val() + "：" + $(".comment").val() + '】</span><em style="text-decoration: none;display:inline-block;background-color: #ffb800;line-height: 8px;color: #fff;padding: 6px;" class="comment_em">&nbsp;</em>');
    $(".popup").hide();
  }
  
  var spanDoms = $(".comment_em");
  for(var i=0;i<spanDoms.length;i++){
   $(spanDoms[i]).html(i+1);
  }
  
})
$(".cancel").click(function () {
  $(".popup").hide();
  $(".selected_" + window.timecount + "").css("color", "");
})
$(".cancel1").click(function () {
  $(".popup").hide();
  $(".selected_" + window.timecount + "").css("color", "");
})


//定位字符串位置，高亮显示错误

$(".teacher_solving a").click(function () {
  $(".middle_right").show();
  $(".middle_right_1").hide();
})
$(".teacher_solving dd").click(function () {
  $(".middle_right").show();
  $(".middle_right_1").hide();
})
$(".system_solving a").click(function () {
  $(".middle_right").hide();
  $(".middle_right_1").show();
})

$.ajax({
  type: "get",
  // url: "https://www.easy-mock.com/mock/5d48e9c63dbe173654aeecee/correct/errorTagging",
  url:"../errorTagging.json",
  dataType: "json",
  success: function (data) {

    //前端展示整篇作文
    $(".content_1").html(data.data[0].composition);

    //悬浮窗口显示错误详情
    function errorDetails() {
      for (var i = 0; i < data.data.length; i++) {
        (function (i) {
          $(".content_1 span").hover(function (e) {

            var errorMark = document.querySelector('.error_mark');

            if ($(e.target).html() == data.data[i].words) {

              $(".error_mark").html("<ul><li>修改建议：" + data.data[i].suggestion + "</li><li>短语用法：" + data.data[i].shortMessage + "</li><li>批改解释：" + data.data[i].Message + "</li></ul><div class='layui-layer-btn layui-layer-btn- repeal' style='margin: 10px auto -10px;'><a class='layui-layer-btn0' style='padding: 1px 14px;'>撤销</a></div>");

              //点击撤销按钮，删除该处系统错误标注
              $(".repeal").click(function(){
                $(".error_mark").html('');
                $(this).unbind('mouseenter').unbind('mouseleave');
                $(e.target).css('color', '');
                $(e.target).next('em').html('');
                console.log($($(e.target).next('em')))
                $($(e.target).next('em')).removeClass('em');
                $(".error_mark").hide();

              })
              if (data.data[i].shortMessage == '') {
                $(".error_mark ul li:nth-child(2)").text('');
              }
            }

            $(".error_mark").show();
            if (e.clientX - 100 > window.innerWidth - 240) {
              errorMark.style.left = `${window.innerWidth - 400}px`;
            } else {
              errorMark.style.left = `${e.clientX - 200}px`;
            }
            errorMark.style.top = `${e.clientY + 40}px`;
           
          }, function (e) {
            // $(".error_mark").hide();
             //鼠标不在悬浮框内，悬浮框自动隐藏
            if($.contains($(".error_mark")[0],e.target) || $(".error_mark")[0]==e.target){
              $(".error_mark").show();
          }else{
            // $(".error_mark").hide();
          }
          });
//撤销系统批改的项
// console.log($(".repeal"));

        })(i);
      }
    }
//截取错误处之前的字符串，检测br数量，得到新的错误处起始位置
    for (var i = 0; i < data.data.length; i++) {
      var subComposition=data.data[0].composition.slice(0,data.data[i].offset);
      var subCount=(subComposition.split('<br>')).length-1;
      if(subCount>=1){
        data.data[i].offset+=2*subCount
       
      }
    }

    //点击系统批改显示所有错误标注
    $(".system_solving a").click(function () {
      var error_count = 1;
      $(".middle_right").hide();
      $(".middle_right_1").show();
      
    

      if ($(".content_1").has("span").length != 0) {
        clearSelection();
      }
      var content = $(".content_1").html();
      for (var i = 0; i < data.data.length; i++) {
        // var subComposition=data.data[0].composition.slice(0,data.data[i].offset);
        // var subCount=(subComposition.split('<br>')).length-1;
        // if(subCount>=1){
        //   data.data[i].offset+=2*subCount
         
        // }
        // console.log(subComposition);
        // console.log(subCount);
        // console.log(data.data[i].offset)
        console.log(content.indexOf(data.data[i].words));
        if (content.indexOf(data.data[i].words) == data.data[i].offset) {
          $(".content_1").each(function () {
            var html = $(this).html();
            var regExp = new RegExp(data.data[i].words);
            var newHtml = html.replace(regExp, '<span class="highlight_' + error_count + '">' + data.data[i].words + '</span><em class="em">&nbsp;' + error_count + '&nbsp;</em>');
            $(this).html(newHtml);
            $(".highlight_" + error_count + "").css('color', '#eb3922');
            $("em").css('cursor', 'pointer');
            $("span").css('cursor', 'pointer');
            error_count++;
          })
        }
      }
      errorDetails()

    })

    //点击系统批改——空白提示显示相应错误标注
    $(".system_solving dd:first-child").click(function () {
      var error_count = 1;
      $(".middle_right").hide();
      $(".middle_right_1").show();
     


      if ($(".content_1").has("span").length != 0) {
        clearSelection();
      }
      var content = $(".content_1").html();
      for (var i = 0; i < data.data.length; i++) {
        
        if (data.data[i].issueType == 'whitespace') {
        //   var subComposition=data.data[0].composition.slice(0,data.data[i].offset);
        // var subCount=(subComposition.split('<br>')).length-1;
        // if(subCount>=1){
        //   data.data[i].offset+=2*subCount
        // }
          if (content.indexOf(data.data[i].words) == data.data[i].offset) {


            $(".content_1").each(function () {
              var html = $(this).html();
              var regExp = new RegExp(data.data[i].words);
              var newHtml = html.replace(regExp, '<span class="highlight_' + error_count + '">' + data.data[i].words + '</span><em class="em">&nbsp;' + error_count + '&nbsp;</em>');
              $(this).html(newHtml);
              $(".highlight_" + error_count + "").css('color', '#eb3922');

              $("em").css('cursor', 'pointer');
              $("span").css('cursor', 'pointer');

              error_count++;


            })

          }
        }
      }
      errorDetails()

    })

    //点击系统批改——语法错误显示相应错误标注
    $(".system_solving dd:nth-child(2)").click(function () {
      var error_count = 1;

      $(".middle_right").hide();
      $(".middle_right_1").show();


      if ($(".content_1").has("span").length != 0) {

        clearSelection();
      }
      var content = $(".content_1").html();
      for (var i = 0; i < data.data.length; i++) {
       
        if (data.data[i].issueType == 'grammar') {
          // var subComposition=data.data[0].composition.slice(0,data.data[i].offset);
          // var subCount=(subComposition.split('<br>')).length-1;
          // if(subCount>=1){
          //   data.data[i].offset+=2*subCount
          // }
          if (content.indexOf(data.data[i].words) == data.data[i].offset) {

            $(".content_1").each(function () {
              var html = $(this).html();
              var regExp = new RegExp(data.data[i].words);
              var newHtml = html.replace(regExp, '<span class="highlight_' + error_count + '">' + data.data[i].words + '</span><em class="em">&nbsp;' + error_count + '&nbsp;</em>');

              $(this).html(newHtml);


              $(".highlight_" + error_count + "").css('color', '#eb3922');
              $("em").css('cursor', 'pointer');
              $("span").css('cursor', 'pointer');
              error_count++;
            })
          }
        }
      }
      errorDetails()
    })


  },
  error: function (jqXHR) {
    alert("发生错误：" + jqXHR.status);
  }
});


//遍历清除错误标注中生成的span标签以及em序号内容
function clearSelection() {
  $(".content_1 span").each(function () {
    $(this).replaceWith($(this).text())
  });
  $(".content_1 em").each(function () {
    $(this).remove();
  });
}