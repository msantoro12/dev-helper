;(function($){
 var _ = {
  build: {
   init: function(){
    _.build.displayWindow();
    _.build.priceSelect();
   },
   displayWindow: function(){
   },
   priceSelect: function(){
   }
  },
  listeners: {
   init: function(){
    _.listeners.priceCall();
    _.listeners.priceSellCall();
   },
   priceCall: function(){
    _.general.getPageData();
   },
   priceSellCall: function(){
   }
  },
  general: {
   stripCurrency: function(){
   },
   getPageData: function(){`

    /*
    var uniName = ("uploader" + (new Date()).getTime()),
    $jFrame = $("<iframe name=\"" + uniName + "\" id=\"" + uniName + "\" src=\"about:blank\" />");
    $("body").append($jFrame);
    $jFrame.attr("src", "//theunderminejournal.com/item.php?item=" + item);
    */

    $.get({url: "theunderminejournal.com/item.php?item=" + item,
           data: function(data) {
                  $itemData = $(data).find(".topitems");
                  console.log($itemData);
                 },
           dataType: "jsonp"
    });

   }
  }
 },
 settings,
 localSettings,
 $itemData,
 item = 44309;
$.averages = {
 defaults: {
 },
 init: function(options){
  settings = $.extend({}, $.averages.defaults, options);
  _.build.init();
  _.listeners.init();
 }
};
})(jQuery);
$(document).ready(function(){
 $.averages.init();
  console.log("Helper Called");
});
