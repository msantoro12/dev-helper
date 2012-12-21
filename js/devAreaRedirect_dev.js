var $act = 'act',
 $act2 = 'act',
 controllerName = "";
;(function($){
 var devMenu = '\
 <link rel="stylesheet" type="text/css" href="//devImages.marketamerica.com/stage/santoro/lib/styles/devHelper/main.css?call=' + Math.floor(Math.random()*1100) + '" />\
 <div id="emailGen">\
  <ul>\
   <li>Generate</li>\
   <li>Close</li>\
  </ul>\
 </div>\
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
   <div id="dialog" title="Tab Source">\
    <form>\
     <fieldset class="ui-helper-reset">\
      <label for="tab_source">source</label>\
         <input type="text" name="tab_source" id="tab_source" value="http://" class="ui-widget-content ui-corner-all" />\
     </fieldset>\
    </form>\
   </div>\
   <div id="tabs">\
    <ul>\
     <li><button id="add_tab">Add Tab</button></li>\
     <li class="ui-icon ui-icon-transfer-e-w"></li>\
     <li><a href="#tabs-1">Code Review</a></li>\
    </ul>\
    <div id="tabs-1">\
     <p><iframe id="scriptFrame" name="scriptFrame">Loading ...</iframe></p>\
    </div>\
   </div>\
  <div>\
 </div>',
  _ = {
   build: {
   init: function(){
    _.build.loadMenu();
    _.build.buildImageList();
    _.build.loadTabs();
   },

   loadTabs: function(){
    var $tab_source_input = $("#tab_source"),
        tab_counter = 3;
    $tabs = $("#dumpData #tabs").tabs({
     tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
     add: function(event, ui){
      var tab_content = tabSource ||$tab_source_input.val() || "Tab " + tab_counter + " not found.",
          $new_tab = $('<p><iframe id="tabFrame' + tab_counter + '" name="tabFrame' + tab_counter + '" src="' + tab_content + '"></iframe></p>');
      $(ui.panel).append($new_tab);
      $('#tabFrame' + tab_counter)
       .bind('load', function(){
        var $obj = $(this),
            tab_title = ($(document, $obj).find("title").html() || tab_content.replace(/http:\/\/|https:\/\//g, ''));
        $obj
         .height('100%')
         .width('100%');
        $('.ui-tabs-nav li:last-child a')
         .html(tab_title.substring(0, 14) + '...')
         .attr("title", tab_title)
         .trigger('click');
         console.log($obj, $(document, $obj).find("title").html());
       });
       tab_counter++;
     }
    });
    $dialog = $("#dumpData #dialog").dialog({
     autoOpen: false,
     modal: true,
     resizable: false,
     buttons: {
      Add: function(){
       $tabs.tabs("add", "#tabs-" + tab_counter, "");
       $(this).dialog("close");
      },
      Cancel: function(){
       $(this).dialog("close");
      }
     },
     open: function(){
      $tab_source_input.focus();
     },
     close: function(){
         $tab_source_input.val('http://');
     }
    });
    var $form = $("form", $dialog).submit(function(){
     $tabs.tabs("add", "#tabs-" + tab_counter, "");
     $dialog.dialog("close");
     return false;
    });
   },
   loadMenu: function(){
    $body.append(devMenu);
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
    ).find('#data, iframe')
     .show()
     .height('100%')
     .width('100%');
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
    _.listeners.focusTab();
    _.listeners.menuClear();
    _.listeners.emailGen();
    _.listeners.addTab();
    _.listeners.removeTab();
    _.listeners.hoverTabNav();
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

   menuClear: function(){
    $(document).bind("click", function(event){
     $("#emailGen").hide();
    });
   },
   emailGen: function(){
    $body.delegate("input[name='usrID']", "contextmenu", function(event){
     var $obj = $(this);
     $("#emailGen")
     .css({
      top: event.pageY + 'px',
      left: event.pageX + 'px'
     })
     .show()
     .find("ul li:first")
      .bind("click", function(){
       $obj.val(controllerName + Math.floor(Math.random()*110000) + "@marketamerica.com");
       $(this).siblings().unbind();
       $("#emailGen").hide();
      })
     .end()
     .find("ul li:last")
      .bind("click", function(){
       $obj.focus();
       $(this).siblings().unbind();
       $("#emailGen").hide();
      });
     return false;
    });
   },
   focusTab: function(){
    $("ul.ui-tabs-nav li", "#tabs").delegate("button", "focus", function(event){
      event.preventDefault();
      $(event.target)
       .trigger("mouseover")
       .trigger("blur")
       .delay(3000)
       .queue(function(next){
        $(this).trigger("mouseout")
       });
     });
   },
   addTab: function(){
    $("#add_tab", "#dumpData")
     .button()
     .click(function(){
      $dialog.dialog("open");
     });
   },
   removeTab: function(){
    $("#tabs span.ui-icon-close", "#dumpData").live("click", function(){
     var $obj = $(this),
         tabIndex = $("li", $tabs).index($obj.parent());
     $tabs.tabs("remove", tabIndex);
      $($obj.prev('a').attr('href'), $tabs).add($obj.parent()).remove();
      $('.ui-tabs-nav li:nth-child(3) a', $tabs)
          .trigger('click');
    });
   },
   hoverTabNav: function(){
    $(".ui-tabs-nav", $tabs).hover(function(){
     $(this)
      .delay(250)
      .animate({
       right: "0px"
      },500);
    }, function(){
     $(this)
      .stop(true)
      .animate({
       right: -($(this).width() -16) +"px"
      }, 500);
    });
   },
   systemInfo: function(){
    $('#remSys').change(function(){
      _.general.setCookie("sysInfo", $(this).is(":checked"));
      if($(this).is(":checked")){
       $body.find('table:last').slideUp();
      }
      else{
       $body.find('table:last').slideDown();
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
     controllerName = $(this).val();
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
           divY = (e.pageY - $body.scrollTop()),
           topMargin = eval(($height / 2) + (winPad * 2) + hdrHeight),
           bottomMargin = eval(($height / 2) - (winPad * 2) + hdrHeight),
           downSpeed = ((Math.abs(listHeight + offset.top + $height) * 1.5) - (Math.abs(divY - bottomMargin) * 6)),
           upSpeed = (((listHeight - hdrHeight -$height - offset.top) * 1.5) - (Math.abs(divY - topMargin) * 6));
        //$("#log").text("---------------Y: " + e.pageY + " / " + divY + ", top: " + offset.top + " calc:" + eval(Math.abs(offset.top - hdrHeight)) + " | " + eval(listHeight - $height) + "  Margins: " + topMargin + " / " + bottomMargin + "  Speed: " + downSpeed + " / " + upSpeed + "  scrollTop: " + $body.scrollTop());
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
    $("#dumpData a:first").toggle(function(event){
     event.preventDefault();
     depScriptLoaded = !depScriptLoaded ? (depScript ? _.general.loadScript(depScript): $('#scriptFrame').attr('src', depScriptUrl)): true;

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
      setAct('act.indexOf(controllerName) != -1 ? act : controllerName + "." + act', 'act.indexOf(controllerName) != -1 ? act : act.replace(/action=/, "action=" + controllerName + ".")', controllerName);
      $('form[action]').not("[action*=" + controllerName + "]").each(function(){
       var $obj = $(this);
       $obj.attr('action', $obj.attr('action').replace("action=", "action=" + controllerName + "."));
      });
      $("script:contains('m?action=')").each(function(){
       var $obj = $(this);
       $obj.text($obj.text().replace(/action=/g, "action=" + controllerName + "."));
      });
     }
     else{
      $('form[action]').each(function(){
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
    $body.delegate('a', 'click', function(event){
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
    return true;
   }
  }
 },
 settings,
 winPad = 40,
 $body = $("body"),
 $height = $(window).height() - (winPad * 2),
 $width = $(window).width() - (winPad * 2),
 patt1 = window.location.search ? window.location.search.match(/action=([A-Za-z]+)\./)[1] : "",
 controllerName = _.general.getCookie("controllerName") || "",
 depScriptUrl = "http://codereview.maeagle.corp/index.cfm",
 depScript = _.general.getCookie("depScript") || "",
 sysInfo = _.general.getCookie("sysInfo") || false,
 depScriptLoaded = false,
 $tabs,
 $dialog,
 tabSource,
 tabsRecord = _.general.getCookie("tabsRecord") || "";
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
