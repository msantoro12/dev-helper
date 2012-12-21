;(function($){
 var _ = {
  build: {
   init: function(){

   },
   loadWindow: function(){
    var uniName = ("loader" + (new Date()).getTime());
    $jFrame = $("<iframe name=\"" + uniName + "\" id=\"" + uniName + "\" src=\"" + activeTarget + "\" />"),
    $loadTarget = $(settings.loadTarget);
    $jFrame.css({
     position: "absolute",
     top: "-99999px"
    });
    $("body").append($jFrame);
    $jFrame.bind("load", function(event){
     var $newContent = $(window[uniName].document)
                        .find(settings.loadTarget)
                        .attr("id", "newContent")
                        .removeAttr("class")
                        .hide(),
      $scripts = $jFrame.find("script[src]");
     $scripts.each(function(){
      $(this).getScript($(this).attr("src"));
     });
     $loadTarget
      .wrapInner("<div id=\"oldContent\" />");
     $("#oldContent")
      .after($newContent)
      .fadeOut("fast")
      .remove();
     //$(document).scrollTop(0);
     $newContent
      .fadeIn("slow")
      .children()
       .unwrap();

    });
   }
  },
  listeners: {
   init: function(){
    _.listeners.bodyClick();
   },
   bodyClick: function(){
    $("body").delegate("a", "click", function(event){
     var $obj = $(this);
     event.preventDefault();
     if($obj.attr("href") != null && $obj.attr("href") != "javascript:void(0);" && $obj.attr("href") != "#"){
      activeTarget = $obj.attr("href");
      _.build.loadWindow();
    }
    });
   }
  },
  general: {
   init: function(){

   },
   someGeneral: function(){

   }
  }
 },
 settings,
 activeTarget,
 $jFrame;
 $.pageLoader = {
  defaults: {
   loadTarget: "#mainContent"
  },
  init: function(options){
   settings = $.extend({}, $.pageLoader.defaults, options);
   //_.build.init();
   _.listeners.init();
  }
 };
})(jQuery);
$(document).ready(function(){
 $.pageLoader.init();
  console.log("called");

});
