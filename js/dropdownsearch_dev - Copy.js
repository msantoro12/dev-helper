javascript:void(function(){
 var s=document.createElement('script');
 s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
 document.getElementsByTagName('head')[0].appendChild(s);
}());
$.getScript('//dropdown-search.googlecode.com/svn/js/jquery.autocomplete.js', function(){
 $("head").append('<link rel="stylesheet" type="text/css" href="http://dropdown-search.googlecode.com/svn/styles/dropdown.css">');


 $('select:visible').each(function(e){
  var $obj = $(this),
      selectName = $obj.attr("name"),
      searchTerms = $obj.children().map(function() {return $(this).html();}).get(),
      selectedIndex = $('option[selected="selected"]', this).index(),
      selectedIndex = selectedIndex != -1 ? selectedIndex : 0,
      qfTextField = "qfTextField" + selectName,
      $qfTextField;
   //console.log(selectedIndex);
  if($obj.children().length > 13 && !$obj.attr("multiple")){
   $obj.hide();
   $('<span class="qfArea"><input name="' + qfTextField + '" id="' + qfTextField + '" type="text" value="' + searchTerms[selectedIndex] + '" class="qfTextField" data-searchTerms="' + searchTerms + '" /><img class="qfImage" src="http://dropdown-search.googlecode.com/svn/images/arrow_down_left_sm.png" /></span>').insertAfter(this);
   $qfTextField = $("#" + qfTextField);
   $obj
    .next("span.qfArea")
     .find("img")
      .css({height: $qfTextField.outerHeight(),
          position: "relative",
          "vertical-align": "middle"})
     .end()
     .find("input.qfTextField")
      .css({width: $qfTextField.width() - $qfTextField.next("img.qfImage").width(),
            height: $qfTextField.height()})
     .end()
     .css({"white-space": "nowrap"});
  }
 });

 $('span.qfArea')
 .delegate("input[type=text].qfTextField", "mouseover", function(event){
  var $obj = $(this);
  console.log($obj);
 $obj
 .querycomplete($obj.data("searchTerms"),
                {matchCase: false,
                 matchContains: true,
                 width: $(this).width() + 2,
                 max: 10000,
                 selectFirst: false,
                 scroll: true,
                 minChars: 0})
  .result(function(event, data, formatted){
    if(data){
     $(this).prev("select").val($obj.prev("select").find("option:contains(" + data + ")").val());
     $(this).prev("select").trigger("change");
    }
   })
 })
 .end()
 .delegate("input[type=text].qfTextField",{
  click: function(event){
   $(this)
    .data("prevValue", $(this).val() || $(this).data("prevValue"))
    .val("");
  },
  focusout: function(){
   $(this).val($(this).val() || $(this).data("prevValue") || "");
  },
  focus: function(){
   var $obj = $(this);


  }
 })
 .delegate("img.qfImage", "click", function(){
  var $obj = $(this).prev("input[type=text].qfTextField");
  $obj
   .data("prevValue", $obj.val() || $obj.data("prevValue"))
   .focus()
   .val('')
   .click();
  setTimeout(function(){
   $obj.click();
  }, 100);
 })
 ;
});





