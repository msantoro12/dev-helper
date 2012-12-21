$("#contentHeading tr th:nth-child(2)").append('<input id="checkAll" type="checkbox" value="1" name="checkAll">');
$('#checkAll').click(function(){
 $("input:checkbox[name=cUpdate]").attr('checked', ($('#checkAll').is(':checked') ? true : false));
});

