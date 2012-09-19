var $act = 'act',
 $act2 = 'act',
 controllerName = "";
;(function($){
 var devMenu = '\
<style type="text/css">\
 table.cfdump_wddx,table.cfdump_xml,table.cfdump_struct,table.cfdump_array,table.cfdump_query,table.cfdump_cfc,table.cfdump_object,table.cfdump_binary,table.cfdump_udf,table.cfdump_udfbody,table.cfdump_udfarguments{ font-size: xx-small; font-family: verdana, arial, helvetica, sans-serif; margin: 2px;}table.cfdump_wddx th,table.cfdump_xml th,table.cfdump_struct th,table.cfdump_array th,table.cfdump_query th,table.cfdump_cfc th,table.cfdump_object th,table.cfdump_binary th,table.cfdump_udf th,table.cfdump_udfbody th,table.cfdump_udfarguments th{ text-align: left; color: white; padding: 5px; border: 1px solid #000000;}table.cfdump_wddx td,table.cfdump_xml td,table.cfdump_struct td,table.cfdump_array td,table.cfdump_query td,table.cfdump_cfc td,table.cfdump_object td,table.cfdump_binary td,table.cfdump_udf td,table.cfdump_udfbody td,table.cfdump_udfarguments td{ padding: 3px; background-color: #ffffff; vertical-align : top; border: 1px solid #000000;}table.cfdump_wddx{ background-color: #000000;}table.cfdump_wddx th.wddx{ background-color: #444444;}table.cfdump_xml{ background-color: #888888;}table.cfdump_xml th.xml{ background-color: #aaaaaa;}table.cfdump_xml td.xml{ background-color: #dddddd;}table.cfdump_struct{ background-color: #CCE9E5;}table.cfdump_struct th.struct{ background-color: #4444cc;}table.cfdump_struct td.struct{ background-color: #ccddff;}table.cfdump_array{ background-color: #006600;}table.cfdump_array th.array{ background-color: #009900;}table.cfdump_array td.array{ background-color: #ccffcc;}table.cfdump_query{ background-color: #884488;}table.cfdump_query th.query{ background-color: #aa66aa;}table.cfdump_query td.query{ background-color: #ffddff;}table.cfdump_cfc{ background-color: #ff0000;}table.cfdump_cfc th.cfc{ background-color: #ff4444;}table.cfdump_cfc td.cfc{ background-color: #ffcccc;}table.cfdump_object{ background-color : #ff0000;}table.cfdump_object th.object{ background-color: #ff4444;}table.cfdump_binary{ background-color : #eebb00;}table.cfdump_binary th.binary{ background-color: #ffcc44;}table.cfdump_binary td{ font-size: x-small;}table.cfdump_udf{ background-color: #aa4400;}table.cfdump_udf th.udf{ background-color: #cc6600;}table.cfdump_udfarguments{ background-color: #dddddd; margin: 3px;}table.cfdump_udfarguments th{ background-color:#eeeeee; color: #000000;}\
.toolset.ac_results{\
 background-color: #FFF;\
 border-color: #036;\
 border-width: 0 1px 4px 1px;\
 border-style: solid;\
 z-index: 3;\
}\
.toolset.ac_results ul{\
 list-style: none outside none;\
 margin: 4px 2px;\
 padding: 0;\
}\
.toolset.ac_results ul li{\
 cursor: pointer;\
}\
.toolset.ac_results ul li.ac_odd{\
 background-color: #FFC;\
}\
.toolset.ac_results ul li.ac_over{\
 background-color: #FF6;\
 padding-left: 5px;\
}\
#dumpData{\
 position: fixed;\
 top: 0;\
 left: 0;\
 border: 1px solid #000;\
 background: transparent;\
 z-index: 9995;\
 height: 15px;\
 width: 30px;\
 overflow: hidden;\
 opacity: 0;\
 display: block;\
 color: #000;\
 margin: 0px;\
 padding: 0px;\
}\
#dumpData #data{\
 position: relative;\
 display: none;\
 overflow: auto;\
 background: transparent;\
}\
#dumpData #dumpMenu{\
 background: #fff;\
 height: 30px;\
}\
#dumpMenu form{\
 margin: 0;\
}\
#dumpData #dumpMenu span{\
 float: left;\
 z-index: 9999;\
 background: #fff;\
}\
#dumpData #dumpMenu a{\
 color: blue;\
}\
#dumpData .superDropDown ul{\
 z-index: 9996;\
 position: absolute;\
 display: none;\
 list-style: none;\
}\
#dumpData .superDropDown li{\
 position: relative;\
 display: block;\
 border: 1px solid #000;\
 background: #fff;\
 z-index: 9996;\
}\
#dumpData .superDropDown.expandable ul li div{\
 z-index: 9998;\
 position: absolute;\
 display: none;\
 border: 1px solid #000;\
 background: #fff;\
 left: 100px;\
 padding: 5px;\
 white-space: nowrap;\
}\
#dumpData .superDropDown ul li img{\
 max-height: 100px;\
 max-width: 100px;\
}\
</style>\
 <div id="dumpData">\
  <div id="dumpMenu">\
   <span><a href="">>@@<</a> <---- click to shrink</span>\
   <span>&nbsp;| <label for="controllerName">Controller</label><input type="text" value="" name="controllerName" id="controllerName" size="12" /></span>\
   <span>&nbsp;| <label for="depScript">Deployment Script</label><input type="text" value="" name="depScript" id="depScript" size="6" /></span>\
   <span>&nbsp;| <label for="remRed">Disable redirect </label><input type="checkbox" value="1" name="remRed" id="remRed" /></span>\
   <span id="images" class="superDropDown expandable">&nbsp;| <span style="float:none;">Images</span><ul id="imgList"></ul></span>\
   <span id="log"></span>\
   <form id="scriptForm"  name="default" action="http://codereview.maeagle.corp/index.cfm?action=scripts.editDS" method="post" target="scriptFrame">\
    <input type="hidden" name="dsID" id="dsID" value="">\
   </form>\
  </div>\
  <div id="data">\
   <iframe id="scriptFrame" name="scriptFrame" src="http://codereview.maeagle.corp/index.cfm" width="100%" height="95%"></iframe>\
  <div>\
 </div>',
  _ = {
   build: {
   init: function(){
    _.build.loadMenu();
    _.build.buildImageList();
   },
   loadMenu: function(){
    $('body').append(devMenu);
    if(depScript){
     _.general.loadScript(depScript);
    }
   },
   resizeDataWin: function(){
    $("#dumpData").addClass('moving');
    $("#dumpData")
     .animate({
      height: $height + "px",
      width: $width + "px",
      top: winPad + "px",
      left: winPad + "px"
    }, 500,
     function(){
      $(this).removeClass('moving');
     }
    );
    $('#dumpData #data')
     .show()
     .height($height)
     .width($width);
   },
   buildImageList: function(){
    $('#imgList').empty();
    $('img').each(function(i){
     var $copyImage = $(this).clone()
      , imageSRC = $copyImage.attr("src")
      , picWidth = new Array()
      , picHeight = new Array();
     $('<li></li>').appendTo('#imgList');
     $copyImage.appendTo('#imgList li:nth-child(' + (i+1) + ')');
     $('#imgList li:nth-child(' + (i+1) + ') img')
      .attr({
       title: "",
       id: "",
       alt: ""
      })
      .removeAttr("title")
      .removeAttr("id")
      .removeAttr("alt");
     $copyImage.load(function(){
      picHeight[i + 1] = this.height;
      picWidth[i + 1] = this.width;
      $('#imgList li:nth-child(' + (i+1) + ')')
       .prepend('<div><nowrap>' + imageSRC.slice(imageSRC.lastIndexOf('/') + 1) +
        '</nowrap></br>Width: ' + picWidth[i + 1] +
        '</br>Height: ' + picHeight[i + 1] +
        '<br /><input type="checkbox" name="locImg" id="locImg' + [i + 1] + '" data-index="' + [i + 1] + '" value="' + $(this).index('img') + '" /><label for="locImg' + [i + 1] + '">&nbsp;Use local image</label>' +
       '</div>');
     });
    });
   }
  },
  listeners: {
   init: function(){
    _.listeners.windowResize();
    _.listeners.controllerChange();
    _.listeners.scriptChange();
    _.listeners.rebuildImageList();
    _.listeners.enterSuDr();
    _.listeners.exitSuDr();
    _.listeners.enterSuDrEx();
    _.listeners.exitSuDrEx();
    _.listeners.imageLocationChange();
    _.listeners.toggleWindow();
    _.listeners.hideWindow();
    _.listeners.redirectEnable();
    _.listeners.linkRedirect();
    _.listeners.headerSlide();
   },
   windowResize: function(){
    $(window).resize(function(){
     winPad = 40;
     $height = $(window).height() - (winPad * 2);
     $width = $(window).width() - (winPad * 2);
     if($("#dumpData").width() > 30){
      _.build.resizeDataWin();
     }
    });
   },
   controllerChange: function(){
    $("#controllerName")
    .val(controllerName)
    .bind("change", function(){
     _.general.setCookie("controllerName", $(this).val());
    });
   },
   scriptChange: function(){
   $('#depScript')
    .val(depScript)
    .bind("change", function(){
     _.general.setCookie("depScript", $(this).val());
     if($(this).val()){
      _.general.loadScript($(this).val());
     }
    });
   },
   rebuildImageList: function(){
    $("#images span")
    .bind("click", function(){
     _.build.buildImageList();
    });
   },
   enterSuDr: function(){
    $('#dumpMenu .superDropDown').bind("mouseenter", function(event){
     var hdrHeight = $(this).height();
     $(this)
      .clearQueue("dmenu")
      .delay(200, "dmenu")
      .queue("dmenu", function(next){
       $(this)
        .find('ul')
        .height('auto')
        .slideDown("fast");
        next();
     })
     .dequeue("dmenu");
     if($(this).find('ul').height() > $height){
      var $obj= $(this).find('ul');
      $obj
       .stop(true)
       .bind('mousemove',function(e){
        var listHeight = $obj.outerHeight(true),
           offset = $obj.position(),
           divY = (e.pageY - $('body').scrollTop()),
           topMargin = eval(($height / 2) + (winPad * 2) + hdrHeight),
           bottomMargin = eval(($height / 2) - (winPad * 2) + hdrHeight),
           downSpeed = ((Math.abs(listHeight + offset.top + $height) * 1.5) - (Math.abs(divY - bottomMargin) * 6)),
           upSpeed = (((listHeight - hdrHeight -$height - offset.top) * 1.5) - (Math.abs(divY - topMargin) * 6));
        //$("#log").text("---------------Y: " + e.pageY + " / " + divY + ", top: " + offset.top + " calc:" + eval(Math.abs(offset.top - hdrHeight)) + " | " + eval(listHeight - $height) + "  Margins: " + topMargin + " / " + bottomMargin + "  Speed: " + downSpeed + " / " + upSpeed + "  scrollTop: " + $('body').scrollTop());
        if(divY > topMargin && Math.abs(offset.top - hdrHeight) < (listHeight - $height)){
         $obj.addClass('moving').animate({top: "-" + eval(listHeight - $height) + "px"}, downSpeed, function(){
          $obj.stop(true);
          $obj.removeClass('moving');
         });
        }
        else if(divY < bottomMargin && offset.top < hdrHeight){
         $obj.addClass('moving').animate({top: hdrHeight + "px"}, upSpeed, function(){
          $obj.stop(true);
          $obj.removeClass('moving');
         });
        }
        else{
         $obj.stop(true);
         $obj.removeClass('moving');
        }
      });
     }
    });
   },
   exitSuDr: function(){
    $('#dumpMenu .superDropDown').bind("mouseleave", function(event){
     $(this)
     .find('ul')
     .stop(true)
     .end()
     .clearQueue("dmenu")
     .delay(800, "dmenu")
     .queue("dmenu", function(next){
      $(this)
      .find('ul')
      .slideUp("fast");
      next();
     })
     .dequeue("dmenu");
    });
   },
   enterSuDrEx: function(){
    $('#dumpMenu .superDropDown.expandable ul').delegate("li", "mouseenter", function(event){
     var $obj = $(this),
         $listItem = $obj.find('div input[name="locImg"]'),
         $curImg = $('#imgList li:nth-child(' + $listItem.data('index') + ') img').add('img:eq(' + ($listItem.data('index') - 1) + ')');
     $obj
     .clearQueue("emenu")
     .delay(1000, "emenu")
     .queue("emenu", function(){
      $(this)
      .find('div')
      .css({opacity: 100,
       width: 'auto',
       height: 'auto',
       'z-index': 9998
      })
      .animate({width: 'show'});
     $('#data')
      .animate({
       opacity: ".2"
      }, 500);
      //console.log($curImg, $curImg.first().offset().top, event);
      $("html, body")
        .animate({
         scrollTop: $curImg.first().offset().top - event.screenY
        }, 500);
      $curImg
       .first()
       .css({
        'z-index': 99999,
        position: "relative",
        border: "2px solid red"
       });
     })
     .dequeue("emenu");
    });
   },
   exitSuDrEx: function(){
    $('#dumpMenu .superDropDown.expandable ul').delegate("li", "mouseleave", function(event){
      var $listItem = $(this).find('div input[name="locImg"]'),
         $curImg = $('#imgList li:nth-child(' + $listItem.data('index') + ') img').add('img:eq(' + ($listItem.data('index') - 1) + ')');
     $(this)
      .find('div')
       .stop("emenu", true)
      .end()
      .clearQueue("emenu")
      .delay(500, "emenu")
      .queue("emenu", function(next){
       $(this)
        .find('div')
         .animate({width: 'hide'});
       $('#data')
        .css({opacity: "1"});
       $curImg
        .css({
         'z-index': "",
         position: "",
         border: ""
        });
       next();
      })
      .dequeue("emenu");
    });
   },
   imageLocationChange: function(){
    $('#dumpMenu .superDropDown.expandable ul li').delegate('div input[name="locImg"]', "click", function(event){
     var $obj = $(this)
      , $curImg = $('#imgList li:nth-child(' + $obj.data('index') + ') img').add('img:eq(' + ($obj.data('index') - 1) + ')')
      , curSRC = $curImg.attr('src')
      , repSRC = 'devImages.marketamerica.com'
      , newSRC = curSRC.replace(repSRC ,'devImages.marketamerica.com/stage/' + controllerName);
      //console.log($curImg, curSRC, newSRC);
     if($obj.is(":checked")){
      $obj.data('prevVal', $curImg.attr('src'));
      $curImg.attr('src', newSRC);
      //$('img').get($obj.val()).src = newSRC;
      //console.log($(this).val() + ' | ' + newSRC + ' | ' + $curImg.data('prevVal') + ' | ' + $('img').get($(this).val()).src);
     }
      else{
      $curImg.attr('src', $obj.data('prevVal'));
      //$('img').get($obj.val()).src = $obj.data('prevVal');
      //console.log($obj.val() + ' | ' + $obj.data('prevVal'))
     }
    });
   },
   toggleWindow: function(){
    $("#dumpData a").toggle(function(event){
     event.preventDefault();
     _.build.resizeDataWin();
    },function(event){
     event.preventDefault();
     $("#dumpData").addClass('moving');
     $("#dumpData").stop(true, true).animate({
       height: "15px",
       width: "30px",
       top: "0px",
       left: "0px"
     }, 1000,
      function(){
       $(this).removeClass('moving');
      }
     );
     $('#dumpData #data').fadeOut(1000);
    });
   },
   hideWindow: function(){
    $('#dumpData:not(.moving)').hover(function(){
     $(this)
      .stop(true, true)
      .animate({
       opacity: "1"
      }, 500);
    },
    function(){
     $(this)
      .delay(1000)
      .animate({
       opacity: "0"
     }, 500);
    });
   },
   redirectEnable: function(){
    $('#remRed').change(function(){
     if(!$(this).attr("checked")){
      setAct('controllerName + "." + act', 'act.replace(/action=/, "action=" + controllerName + ".")', controllerName);
      $('form').each(function(){
       var $obj = $(this);
       $obj.data('prevVal', $obj.attr('action'));
       $obj.attr('action', $obj.attr('action').replace(/action=/, "action=" + controllerName + "."));
      });
     }
     else{
      $('form').each(function(){
       if($(this).data('prevVal')){
        $(this).attr('action', $(this).data('prevVal'));
       }
      });
     }
    });
   },
   linkRedirect: function(){
    $('body').delegate('a', 'click', function(event){
     var $obj = $(this);
     if($obj.attr('href') != null && $obj.attr('href') != 'javascript:void(0);' && $obj.attr('href') != '#' && !$('#remRed').attr("checked")){
      $obj
       .attr('href', $obj
                      .attr('href')
                      .replace(/action=/, "action=" + controllerName + "."));
     }
    });
   },
   headerSlide: function(){
    $('#dumpData').delegate("#dumpMenu", "mouseenter", function(event){
     //console.log($('#dumpData').width(), $('#dumpMenu span:last'),$('#dumpMenu span:last').position(),  $('#dumpMenu span:last').offset(),event);
    });
   }
  },
  general:{
   init: function(){
   },
   setCookie: function(key, value){
    var expires = new Date();
    expires.setTime(expires.getTime() + 31536000000); //1 year
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
   },
   getCookie: function(key){
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
   },
   loadScript: function(scriptNum){
    $('#dsID').val(scriptNum);
    $('#scriptForm').submit();
   }
  }
 },
 settings,
 winPad = 40,
 $height = $(window).height() - (winPad * 2),
 $width = $(window).width() - (winPad * 2),
 patt1 = window.location.search ? window.location.search.match(/action=([A-Za-z]+)\./)[1] : "",
 controllerName = _.general.getCookie("controllerName") || "",
 depScript = _.general.getCookie("depScript") || "";
 $.devHelper = {
  defaults: {
  },
  init: function(options){
   settings = $.extend({}, $.devHelper.defaults, options);
   _.build.init();
   _.listeners.init();
   _.general.init();
   if(patt1 != controllerName){
    $('#remRed').attr("checked", "checked").trigger('change');
   }
   $('#remRed').trigger('change');
  }
 };
})(jQuery);
$(document).ready(function(){
 $.devHelper.init();
  console.log("Helper Called");
});

function setAct(act, act2, conName){
 $act = act;
 $act2 = act2;
 controllerName = conName;
}
function switchActionSubmitExplicit(frmName,act){
 document[frmName].action = 'index.cfm?action=' + eval($act);
 document[frmName].submit();
 return true;
}
function switchAction(act){
 document.forms[0].action = 'index.cfm?action=' + eval($act);
 return true;
}
function switchActionExplicit(form, act) {
 document[form].action = 'index.cfm?action=' + eval($act);
 return true;
}
function switchActionSubmit(act){
 document.forms[0].action = 'index.cfm?action=' + eval($act);
 document.forms[0].submit();
 return true;
}
function switchLocation(act){
 location.href = 'index.cfm?action=' + eval($act);
 return true;
}
function outboundSubmitExplicit(frmName,act){
 document[frmName].action = eval($act2);
 document[frmName].submit();
 return true;
}
function switchFormActionSubmitExplicit(form,act){
 document[form].action = eval($act2);
 document[form].submit();
 return true;
}
function setSubmitFocus(e,form,act,target){
 var key=e.keyCode || e.which;
 if (key==13){
  form.target = target;
  document.forms[0].action = 'index.cfm?action=' + eval($act);
  document.forms[0].submit();
  return true;
 }
}
function setSubmitFocusExplicit(e,frmName,act,target){
 var key=e.keyCode || e.which;
 if (key==13){
  document[frmName].target = target;
  document[frmName].action = 'index.cfm?action=' + eval($act);
  document[frmName].submit();
  return true;
 }
}
function setSubmitFocusExplicitHomePage(e,frmName,act,target,url){
 var key=e.keyCode || e.which;
 if (key==13){
  document[frmName].target = target;
  document[frmName].action = url +'index.cfm?action=' + eval($act);
  document[frmName].submit();
  return true;
 }
}
