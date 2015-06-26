
//data adda & del 動態產生
$(function(){
    $(".add-header").click(function(){
        $('.header-table').append(
            '<tr class="active"><td><input class="header-item" name="header[item][]" type="text"></td>' +
            '<td><input class="header-value" name="header[value][]" type="text"></td></tr>');
    });
    $(".del-header").click(function(){
        $(".header-table tr:last").remove();
    });
    $(".add-parameter").click(function(){
        $('.parameter-table').append(
            '<tr class="active"><td><input class="parameter-item" name="parameter[item][]"type="text"></td>' +
            '<td><input class="parameter-value" name="parameter[value][]" type="text"></td></tr>');
    });
    $(".del-parameter").click(function(){
        $(".parameter-table tr:last").remove();
    });
});

//regex del
$(document).on("click",".regex-output-content button",function(){
    var $touch=$(this).attr("class"),
        touchEvent = $touch.split(' '),
        regex_Event = touchEvent[0],
        regex_Event = regex_Event.split('-'),
        regex_name = regex_Event[0],
        regex_id=regex_Event[1];
    if (regex_name === 'del') {
        $('.'+regex_id).remove();
    }
});
