var $act = 'act',
 $act2 = 'act',
 controllerName = "";
;(function($){
 var devMenu = '\
 <link rel="stylesheet" type="text/css" href="//devImages.marketamerica.com/stage/santoro/lib/styles/devHelper/main.css" />\
 <div id="dumpData">\
  <div id="dumpMenu">\
   <span><a href="">>@@<</a></span>\
   <span>&nbsp;| <label for="remRed">Disable redirect </label><input type="checkbox" value="1" name="remRed" id="remRed" /></span>\
   <span>&nbsp;| <label for="controllerName">Controller</label><input type="text" value="" name="controllerName" id="controllerName" size="12" /></span>\
   <span>&nbsp;| <label for="remSys">Disable System Info </label><input type="checkbox" value="1" name="remSys" id="remSys" /></span>\
   <span>&nbsp;| <label for="depScript">Deployment Script</label><input type="text" value="" name="depScript" id="depScript" size="6" /></span>\
   <span id="images" class="superDropDown expandable">&nbsp;| <span style="float:none;">Images</span><ul id="imgList"></ul></span>\
   <span id="log"></span>\
   <form id="scriptForm" name="default" action="http://codereview.maeagle.corp/index.cfm?action=scripts.editDS" method="post" target="scriptFrame">\
    <input type="hidden" name="dsID" id="dsID" value="">\
   </form>\
  </div>\
  <div id="data">\
   <iframe id="scriptFrame" name="scriptFrame" src="" width="100%" height="95%"></iframe>\
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
    if(depScript && depScriptLoaded){
     _.general.loadScript(depScript);
    }
    console.log(sysInfo);
    if(sysInfo == 'true'){
     $('#remSys').attr('checked', 'checked');
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
      $(this)
       .removeClass('moving')
       .removeClass("smallSlide");
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
  listeners:{
   init: function(){
    _.listeners.systemInfo();
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

   systemInfo: function(){
    $('#remSys').change(function(){
      _.general.setCookie("sysInfo", $(this).is(":checked"));
      if($(this).is(":checked")){
       $('body table:last').slideUp();
      }
      else{
       $('body table:last').slideDown();
      }
    });
   },
   windowResize: function(){
    $(window).resize(function(){
     winPad = 40;
     $height = $(window).height() - (winPad * 2);
     $width = $(window).width() - (winPad * 2);
     if($("#dumpData").width() > 32){
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
     var $obj = $(this),
         $curImg = $('#imgList li:nth-child(' + $obj.data('index') + ') img').add('img:eq(' + ($obj.data('index') - 1) + ')'),
         curSRC = $curImg.attr('src'),
         repSRC = 'devImages.marketamerica.com',
         newSRC = curSRC.replace(repSRC ,'devImages.marketamerica.com/stage/' + controllerName);
      //console.log($curImg, curSRC, newSRC);
     if($obj.is(":checked")){
      $obj.data('prevVal', $curImg.attr('src'));
      $curImg.attr('src', newSRC);
     }
      else{
      $curImg.attr('src', $obj.data('prevVal'));
     }
    });
   },
   toggleWindow: function(){
    $("#dumpData a").toggle(function(event){
     event.preventDefault();
     depScriptLoaded = !depScriptLoaded ? $('#scriptFrame').attr('src', depScriptUrl): true;
     _.build.resizeDataWin();
    },function(event){
     event.preventDefault();
     $("#dumpData").addClass('moving');
     $("#dumpData").stop(true, true).animate({
       height: "20px",
       width: "30px",
       top: "0px",
       left: "0px"
     }, 1000,
      function(){
       $(this)
        .removeClass('moving')
        .removeClass("smallSlide");
      }
     );
     $('#dumpData #data').fadeOut(1000);
    })
    .hover(function(){
      $("#dumpData:not(moving)")
      .not(function(){
       return $(this).width() > 32;
      })
      .delay(250)
      .addClass("smallSlide")
      .animate({
        width: "480px",
        height: "30px"
      });
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
      .filter(".smallSlide")
      .not(".moving")
      .animate({
         width: "30px",
         height: "20px"
       }, 500
       ,function(){
        $(this).removeClass("smallSlide");
       })
      .end()
      .end()
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
       $obj.attr('action', $obj.attr('action').replace("action=", "action=" + controllerName + "."));
      });
      $("script:contains('m?action=')").each(function(){
       var $obj = $(this);
       $obj.text($obj.text().replace(/action=/g, "action=" + controllerName + "."));
      });
     }
     else{
      $('form').each(function(){
       var $obj = $(this);
       $obj.attr('action', $obj.attr('action').replace("action=" + controllerName + ".", "action="));
      });
      $("script:contains('m?action=')").each(function(){
       var $obj = $(this);
       $obj.text($obj.text().replace(new RegExp("action=" + controllerName + ".", "g"), "action="));
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
 depScriptUrl = "http://codereview.maeagle.corp/index.cfm",
 depScript = _.general.getCookie("depScript") || "",
 sysInfo = _.general.getCookie("sysInfo") || false,
 depScriptLoaded = false;
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
   $('#remSys').trigger('change');
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
