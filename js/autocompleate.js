document.write('<scr' + 'ipt type="text/javascript" src="http://images.marketamerica.com/lib/js/jquery.autocomplete.js?48"></scr' + 'ipt>');


var $frmSelect = $("select#selectID");

var searchTerms = $("select" $frmSelect).children().map(function() {return $(this).val();}).get();

$(document).ready(function(){
 $($frmSelect.parent).append('<input name="qfTextField" id="qfTextField" type="text" value="" />');
});
$(window).load(function(){
 var data = (searchTerms).split(",");
 $("#qfTextField").querycomplete(data, {matchCase: false, matchContains: true, width: 220, max: 100, selectFirst: false});
 $('#qfTextField').result(function(event, dta, formatted){
  if(dta){
   $($frmSelect).val(dta[0]);
   $('#qfPageName').val('');
  }
 });
});




