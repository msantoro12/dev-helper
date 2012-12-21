$(document).ready(function(){
 var loc = window.location.search.match(/action=([A-Za-z]+\.[A-Za-z]+)/);
 loc = window.location.search.match(/action=([A-Za-z]+\.[A-Za-z]+)/) ? window.location.search.match(/action=([A-Za-z]+\.[A-Za-z]+)/)[1] : "";
 $(".itemSectionTab:contains('Views')").next().find(".cfitem").each(function(){
  var $obj = $(this),
  newString = $obj.html().replace(/([a-z]+\\){3}/, "");
  $obj.html(newString);
 });
 if(loc === "review.peerReview"){
  $("#scriptContainer div.itemSectionTab:contains('MetaData') ~ .itemGrp > table:first tr:first td:first")
   .append('   <a href="#" id="inspectallmetadata">Inspect All</a>');
  $("#inspectallmetadata")
   .bind("click", function(event){
    event.preventDefault();
    $("#scriptContainer a[onclick*=contentInspect]").trigger("click");
   });
  $("#scriptContainer div.itemSectionTab:contains('Action Mappings')")
   .after('<a href="#" style="position: relative; float: right;top: -18px;display: inline;line-height: 0px;right: 151px;" id="passall">Pass All</a>');
  $("#passall")
   .bind("click", function(event){
    event.preventDefault();
    $('textarea:not([name="comments"])').each(function(){
     if(!$(this).val()){
      $(this).val('passed');
     }
    });
   });
 }
 if(loc === "admin.dcProjectRead"){
  $("#goBtn").show();
 }
 if(loc === "review.peerReview"){
  $('div.itemGrp table').each(function(){
   $obj = $(this)
   displayPos = $obj.find("tr td:contains('Comments')").index();
   $obj
    .find("tr:not(:first-child) td:nth-child(" + displayPos + ")")
    .addClass("commentDisplay")
    .bind({
     mouseover: function(){
      $(this)
       .clearQueue("comments")
       .delay(250, "comments")
       .queue("comments", function(next){
        $(this)
         .animate({
          opacity: ".9"
         }, 500);
       })
       .dequeue("comments");
     },
     mouseout: function(){
      $(this)
       .clearQueue("comments")
       .delay(250, "comments")
       .queue("comments", function(next){
        $(this)
         .animate({
          opacity: "0"
         }, 500);
       })
       .dequeue("comments");
     }
    });
  });
 }
});

