$.getScript('//devImages.marketamerica.com/lib/js/jqueryui/jquery-ui-1.8.9.effects.core.js');

var $list = $("#uwfMenuWrapper").find("li"),
    $labels = $list.find("a"),
    searchTerms = $labels.map(function(){
     return $(this).html().toLowerCase();
    }).get(),
    $searchObj = $labels.map(function(){
     return $(this).parent();
    });

$("#uwfMenuWrapper")
 .css({overflow: "visible"})
 .find("ul, .menu li:hover>ul")
  .css({visibility: "visibile",
   width: "220px",
   top: "-1px"})
  .show()
  .hide()
 .end()
 .bind({
  mouseover: function(event){
   $obj = $(this);
   inputField = $("#sortInp").is("*") ? "" : "<input type=\"text\" name=\"sortInp\" id=\"sortInp\" style=\"position:absolute; top:4px; left:14px;\" \\>";
   $obj
    .clearQueue("emenu")
    .queue("emenu", function(next){
     $obj
      .find("ul:first")
      .css({width: "220px"})
      .delay(250, "emenu")
      .animate({
       width: "show",
       height: "show"
      },200);
     next();
    })
    .dequeue("emenu")
    .prepend(inputField);
  },
  mouseout: function(event){
   $obj = $(this);
   $obj
    .clearQueue("emenu")
    .delay(150, "emenu")
    .queue("dmenu", function(next){
     $obj
      .find("ul:first")
       .delay(300, "emenu")
       .animate({
        width: "hide",
        height: "hide"
       },200);
     next();
    })
    .dequeue("emenu");
  }
 })
 .delegate("#sortInp", {
  mouseover: function(event){
  // $(this).focus();
  },
  keyup:function(event){
   console.log('keypress');
   var $obj = $(this),
         filter = $(this).val().toLowerCase(),
         search;
   $obj
    .clearQueue("nameFilter")
    .delay(250, "nameFilter")
    .queue("nameFilter", function(next){
     $.grep(searchTerms, function(value, i){
      search = new RegExp(filter, "g");
      if(value.match(search)){
       $searchObj[i]
        .trigger("mouseover")
        .show()
        .parents("li")
        .trigger("mouseover")
        .show();
      }
      else{
       $searchObj[i]
        .trigger("mouseout")
        .hide();
      }
     });
    })
    .dequeue("nameFilter");


   //\\maimages-d01\images\usa\webPortals\search-magnifying-glass.png
  }
 })
 .delegate("li", {
  mouseover: function(event){
   var $obj = $(this);
   $obj
   .parent("ul:first")
    .addClass("hovered")
    .css({overflow: "visible"})
    .stop(true)
    .parent("li")
     .clearQueue("dmenu")
    .end()
   .end()
    .clearQueue("dmenu")
    .queue("dmenu", function(next){
     var offsetleft = $obj.parents("li").data("offsetleft") || $obj.data("offsetleft") || $obj.parent("ul").offset().left + $obj.parent("ul").innerWidth();
     $obj
     .data("offsetleft", offsetleft)
     .children('ul')
      .delay(250)
      .css({left: offsetleft - 1,
        visibility: "visible",
        width: "220px",
        height: "auto"})
      .animate({
       width: "show",
       height: "show"
      },
      200,
      "easeOutExpo")
      .width($obj.width);
     next();
    })
    .dequeue("dmenu");
  },
  mouseout: function(event){
   var $obj = $(this);
   $obj
    .parent("ul")
     .removeClass("hovered")
    .end()
    .children('ul')
     .stop(true, true)
    .end()
     .clearQueue("dmenu")
     .delay(300, "dmenu")
     .queue("dmenu", function(next){
      if(!$obj.parent("ul").is(".hovered")){
       $obj
        .parent('ul')
         .delay(150)
         .animate({
          width: "hide",
          height: "hide"
         },150);
         $("#sortInp")
          .remove();
       next();
      }
      if(!$obj.children("ul").is(".hovered")){
       $obj
       .children('ul')
        .delay(150)
        .animate({
         width: "hide",
         height: "hide"
        },150);
       next();
      }
     })
     .dequeue("dmenu");
  }
 });

