$(function(){
    $(".add-header").click(function(){
        $('.header-table').append('<tr class="active"><td><input class="header-item" type="text"></td>' +
        '<td><input class="header-value" type="text"></td></tr>');
    });
    $(".del-header").click(function(){
        $(".header-table tr:last").remove();
    });
    $(".add-parameter").click(function(){
        $('.parameter-table').append('<tr class="active"><td><input class="parameter-item" type="text"></td>' +
        '<td><input class="parameter-value" type="text"></td></tr>');
    });
    $(".del-parameter").click(function(){
        $(".parameter-table tr:last").remove();
    });
});
