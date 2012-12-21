var $scripts,
$contentArea = $('#mainContent');
if(window.location.host.indexOf('unfranchise') != -1){
 $contentArea = $('table tr:nth-child(2) td:nth-child(3)');
}
$contentArea.replaceWith(function(){
 var $obj = $(this),
     content;
 $scripts = $obj.find('script');
 $obj.find('script').remove();
 content = $obj.html();
 content = content.replace(/<!-- mp_trans_disable_start -->/g, '<div class="mpTagBorder"><!-- mp_trans_disable_start -->');
 content = content.replace(/<!-- mp_trans_disable_end -->/g, '<!-- mp_trans_disable_end --></div>');
 return content;
 console.log("tagged");
});

$('.mpTagBorder').each(function(){
 var $obj = $(this);
 if($obj.children().length){
  $obj
   .children()
    .css({border: "1px solid red",
          background: "#ccc !important"});
 }
 else{
 $obj
   .css({border: "1px solid red",
         background: "#ccc !important"});
 }
})
.after($scripts);
