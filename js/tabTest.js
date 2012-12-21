$(function(){
 var $tab_source_input = $("#tab_source"),
     tab_counter = 3;
 var $tabs = $("#tabs").tabs({
  tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
  add: function( event, ui ){
   var tab_content = $tab_source_input.val() || "Tab " + tab_counter + " not found.",
       $new_tab = $('<p><iframe id="tabFrame' + tab_counter + '" name="tabFrame' + tab_counter + '" src="' + tab_content + '" width="100%" height="95%"></iframe></p>');
   $( ui.panel ).append($new_tab);
   $('#tabFrame' + tab_counter)
    .bind('load', function(){
     var tab_title = ($('title', this).html() || tab_content.replace('http://', '')).substring(0, 14) + '...';
     $('.ui-tabs-nav li:last-child a')
      .html(tab_title)
      .trigger('click');
      });
  }
 });

 var $dialog = $("#dialog").dialog({
     autoOpen: false,
     modal: true,
     buttons: {
      Add: function(){
       addTab();
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
  addTab();
  $dialog.dialog("close");
  return false;
 });

 function addTab(){
  var tab_title = "Tab " + tab_counter;
  $tabs.tabs("add", "#tabs-" + tab_counter, tab_title);
  tab_counter++;
 }

 $("#add_tab")
  .button()
  .click(function(){
   $dialog.dialog("open");
  });

 $("#tabs span.ui-icon-close").live("click", function(){
  var $obj = $(this),
      tabIndex = $("li", $tabs ).index($obj.parent());
  $tabs.tabs("remove", tabIndex);
   $($obj.prev('a').attr('href'), $tabs).add($obj.parent()).remove();
   $('.ui-tabs-nav li:nth-child(3) a', $tabs)
       .trigger('click');
   console.log('remove', tabIndex, $($obj.prev('a').attr('href'), $tabs));

 });

 $(".ui-tabs-nav").hover(function(){
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

});?
