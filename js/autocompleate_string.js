


javascript:void(function(){
 var s=document.createElement('script');
 s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
 document.getElementsByTagName('head')[0].appendChild(s);
}());
$.getScript('http://dropdown-search.googlecode.com/svn/js/jquery.autocomplete.js');
$("head").append('<link rel="stylesheet" type="text/css" href="http://dropdown-search.googlecode.com/svn/styles/dropdown.css">');
setTimeout(function(){
 $('select:visible').each(function(e){
  var $obj = $(this),
      selectName = $obj.attr("name"),
      searchTerms = $obj.children().map(function() {return $(this).html();}).get(),
      selectedIndex = $('option[selected="selected"]', this).index(),
      selectedIndex = selectedIndex != -1 ? selectedIndex : 0,
      qfTextField = "qfTextField" + selectName,
      $qfTextField;
   console.log(selectedIndex);
  if($obj.children().length > 12){
   $obj.hide();
   $('<span><input name="' + qfTextField + '" id="' + qfTextField + '" type="text" value="' + searchTerms[selectedIndex] + '" /><img src="http://dropdown-search.googlecode.com/svn/images/arrow_down_left_sm.png" /></span>').insertAfter(this);
   $qfTextField = $("#" + qfTextField);
   $qfTextField
   .next("img")
    .css({height: $obj.outerHeight(),
          position: "relative",
          "vertical-align": "middle"})
    .bind("click", function(){
     $qfTextField.focus().val('').click();
     setTimeout(function(){
      $qfTextField.click();
     }, 100);
    })
   .end()
   .parent()
    .css({"white-space": "nowrap"})
   .end()
   .css({width: $obj.width() - $qfTextField.next("img").height(),
         height: $obj.height()})
    .querycomplete(searchTerms,
                   {matchCase: false,
                    matchContains: true,
                    width: $obj.width(),
                    max: 10000,
                    selectFirst: false,
                    scroll: true,
                    minChars: 0})
    .result(function(event, data, formatted){
    if(data){
     $obj.val($obj.find("option:contains(" + data + ")").val());
     $obj.trigger("change");
    }
   });
  }
 });
},600);



$('textarea:not([name="comments"])').each(function(){
 if(!$(this).val()){
  $(this).val('passed');
 }
});


// script for non ajax pages

javascript:void(function(){
 var s=document.createElement('script');
 s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
 document.getElementsByTagName('head')[0].appendChild(s);
}());
$.getScript('http://images.marketamerica.com/lib/js/jquery.autocomplete.js');
$("head").append('<link rel="stylesheet" type="text/css" href="http://devimages.marketamerica.com/lib/styles/usa/eng/content.css">');
$('select:visible').live('mouseover', function(){
 $obj = $(this);
 selectName = $obj.attr("name");
 searchTerms = $obj.children().map(function() {return $(this).html();}).get();
 selectedIndex = $('option[selected="selected"]', this).index();
 qfTextField = "qfTextField" + selectName;
 $obj.hide();
 $('<input name="' + qfTextField + '" id="' + qfTextField + '" type="text" value="' + searchTerms[selectedIndex] + '" />').insertAfter(this);
 $('#' + qfTextField).one('click', function(){
  $(this).val('').trigger('change');
 });
 $('#' + qfTextField).bind('click', function(){
  $(this).trigger('change');
 });
 $('#' + qfTextField).css('width', $obj.width()).css('height', $obj.height());;
 $('#' + qfTextField).querycomplete(searchTerms, {matchCase: false, matchContains: true, width: $obj.width(), max: 10000, selectFirst: false, scroll: true, minChars: 0});
 $('#' + qfTextField).result(function(event, data, formatted){
  if(data){
   $obj.val($obj.find("option:contains(" + data + ")").val());
   $obj.trigger('change');
  }
 });
});


// script for ajax pages



javascript:void(function(){
 var s=document.createElement('script');
 s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
 document.getElementsByTagName('head')[0].appendChild(s);
}());
$.getScript('http://images.marketamerica.com/lib/js/jquery.autocomplete.js');
$("head").append('<style type="text/css">.ac_results{ background-color: #FFF; border-color: #036; border-width: 0 1px 4px 1px; border-style: solid; z-index: 3;}.ac_results ul{ list-style: none outside none; margin: 4px 2px; padding: 0;}.ac_results ul li{ cursor: pointer;}.ac_results ul li.ac_odd{ background-color: #FFC;}.ac_results ul li.ac_over{ background-color: #FF6; padding-left: 5px;}</style>');
$('body').delegate('select:visible', 'click', function(selE){
 $obj = $(this);
 selectName = $obj.attr("name");
 searchTerms = $obj.children().map(function() {return $(this).html();}).get();
 selectedIndex = $('option[selected="selected"]', this).index();
 qfTextField = "qfTextField" + selectName;
 $obj.hide();
 $('<input name="' + qfTextField + '" id="' + qfTextField + '" type="text" value="" />').insertAfter(this);
 $('#' + qfTextField).css('width', $obj.width()).css('height', $obj.height());;
 $('#' + qfTextField).querycomplete(searchTerms, {matchCase: false, matchContains: true, width: $obj.width(), max: 10000, selectFirst: false, scroll: true, minChars: 0});
 $('#' + qfTextField).result(function(event, data, formatted){
  if(data){
   $obj.val($obj.find("option:contains(" + data + ")").val());
   $obj.show();
   $('#' + qfTextField).remove();
   $obj.trigger('change');
   $obj.focus();
  }
 });
 $('#' + qfTextField).focus();
 $('#' + qfTextField).focus(function(){
  $(this).trigger('change');
 });
});





$.getScript('http://images.marketamerica.com/lib/js/jquery.autocomplete.js');

$("head").append('<link rel="stylesheet" type="text/css" href="http://devimages.marketamerica.com/lib/styles/usa/eng/content.css">');

$('body').delegate('select', function(){
 searchTerms = $(this).children().map(function() {return $(this).html();}).get();
 selectName = $(this).attr("name");
 //$(this).val("");
 //$(this).hide();
 $('<input name="qfTextField" id="qfTextField' + selectName + '" type="text" value="" />').insertAfter(this);
 $('#qfTextField' + selectName).focus();
 $('#qfTextField' + selectName).querycomplete(searchTerms, {matchCase: false, matchContains: true, width: $(this).width(), max: 10000, selectFirst: false, scroll: true, minChars: 0});
 $('#qfTextField' + selectName).result(function(event, data, formatted){
  if(data){
   $(this).val(this.find("option:contains(" + data + ")").val());
   //$(this).show();
   //$('#qfTextField' + selectName).remove();
   $('#qfTextField').val('');
  }
 });
});



$.getScript('http://images.marketamerica.com/lib/js/jquery.autocomplete.js');

$("head").append('<link rel="stylesheet" type="text/css" href="http://devimages.marketamerica.com/lib/styles/usa/eng/content.css">');

$('select:visible').live('click', function(){
 searchTerms = $(this).children().map(function() {return $(this).html();}).get();
 selectName = $(this).attr("name");
 //$(this).val("");
 //$(this).hide();
 $('<input name="qfTextField' + selectName + '" id="qfTextField' + selectName + '" type="text" value="" />').insertAfter(this);
 $('#qfTextField' + selectName).focus();
 $('#qfTextField' + selectName).querycomplete(searchTerms, {matchCase: false, matchContains: true, width: $(this).width(), max: 10000, selectFirst: false, scroll: true, minChars: 0});
 $('#qfTextField' + selectName).result(function(event, data, formatted){
  if(data){
   $(this).val(this.find("option:contains(" + data + ")").val());
   //$(this).show();
   //$('#qfTextField' + selectName).remove();
   //$('#qfTextField' + selectName).val('');
  }
 });
});



$('body').undelegate('select', 'focus');

$('body').delegate('select', 'click', function(selE){
  selE.event.preventDefault();
  console.log($(this).width());
 $('body').live('keydown', function(keys) {
  console.log(keys);

 });
});


// matchContains: true, width: $(this).width(), max: 10000, selectFirst: false, scroll: true, minChars: 0

$('#qfTextField').live('click', function(event){
$frmSelect = $('select[name="viewName"]');

searchTerms = $($frmSelect).children().map(function() {return $(this).html();}).get();
$('<input name="qfTextField" id="qfTextField" type="text" value="" />').insertAfter($frmSelect);
 $("#qfTextField").querycomplete(searchTerms, {matchCase: false, matchContains: true, width: 220, max: 100, selectFirst: false});
 $('#qfTextField').result(function(event, data, formatted){
  if(data){
   $($frmSelect).val($frmSelect.find("option:contains(" + data + ")").val());
   $('#qfTextField').val('');
  }
 });
});



data = ('this,that').split(",");


//$("head").append('<script type="text//javascript" src="http:////images.marketamerica.com//lib//js//jquery.autocomplete..js"></script>');


 javascript: $("#contentHeading th:eq(1)").append('<input id="checkAll" type="checkbox" value="1" name="checkAll">'); $('#checkAll').click(function(){  $("input:checkbox[name=cUpdate]").attr('checked', ($('#checkAll').is(':checked') ? true : false)); });

$('<input name="qfTextField" id="qfTextField" type="text" value="" />').insertAfter('select[name="partnerID"]');

searchTerms = $('select[name="partnerID"]').children().map(function() {return $(this).html();}).get();
