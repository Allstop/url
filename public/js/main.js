//全域變數
var BASE_URL = location.protocol + '//' + location.hostname,
    curlTemp = '',
    regexTemp,
    headerList=[],
    parameterList=[];

$(document).on("click","#urlSubmit",function(){
    var urlValue = $("#url").val();
    var methodValue = $(".method").val();
    curlUrl(urlValue, methodValue, headerList, parameterList);
});

$(document).on("click","#headerSubmit",function(){
    var itemArrText= [];
    var valuArrTexte= [];
    $('input[class="headerItem"]').each(function(){
        itemArrText.push($(this).val());
    });
    $('input[class="headervalue"]').each(function(){
        valuArrTexte.push($(this).val());
    });
    headerList = {
        "item" : itemArrText,
        "value" : valuArrTexte
    };
});

$(document).on("click","#parameterSubmit",function(){
    var itemArrText= [];
    var valuArrTexte= [];
    $('input[class="parameterItem"]').each(function(){
        itemArrText.push($(this).val());
    });
    $('input[class="parametervalue"]').each(function(){
        valuArrTexte.push($(this).val());
    });
    parameterList = {
        "item" : itemArrText,
        "value" : valuArrTexte
    };
});

//執行第一次regex
$(document).on("click","#regexSubmit",function(){
    var regexValue = '/'+$("#regex").val()+'/';
    regex(regexValue, curlTemp);
});

//執行del/regex事件
$(document).on("click","#regexOutput button",function(){
    var $touch=$(this).attr("class"),
        touchEvent = $touch.split('_'),
        plan_Event=touchEvent[0],
        regex_id = touchEvent[1];
    if (plan_Event == 'del') {
        $('.'+regex_id).remove();
    } else if (plan_Event == 'regex') {
        $('.secRregex_'+regex_id).html('');
        $('.secRregex_'+regex_id).append('請輸入regex<input type="text" id="secRegex_'+regex_id+'" size="15">');
        $('.secRregex_'+regex_id).append('<button class="secRegexSubmit_'+regex_id+'">送出</button>');

    //執行第二次regex
    } else if (plan_Event == 'secRegexSubmit') {
        var secRegexValue = '/'+$("#secRegex_"+regex_id).val()+'/';
        regex2(secRegexValue, regexTemp[regex_id]);
    }
});

//combine
$(document).on("click",".combine",function(){
    output(1, 2);
});

$(function(){
    $("#addheader").click(function(){
        $('#header').append('<tr><td><input class="headerItem" type="text"></td><td><input class="headervalue" type="text"></td></tr>');
    });
    $("#delheader").click(function(){
        $("#header tr:last").remove();
    });
    $("#addparameter").click(function(){
        $('#parameter').append('<tr><td><input class="parameterItem" type="text"></td><td><input class="parametervalue" type="text"></td></tr>');
    });
    $("#delparameter").click(function(){
        $("#parameter tr:last").remove();
    });
})

var curlUrl = function(urlValue, methodValue, headerList, parameterList) {
    console.log()
    $.ajax({
        url: BASE_URL + "/curlUrl",
        type: "POST",
        dataType: "JSON",
        data: {urlValue:urlValue,
               methodValue:methodValue,
                headerList:headerList,
                parameterList:parameterList},
        success: function (response) {
            if (response.status === false) {
                alert("請檢查參數資料!");
            } else {
                curlTemp = response.status;
                $('#return').html('');
                $('#return').append('<textarea cols="50" rows="4">'+response.status+'</textarea>');
            }
        },
        error: function (response) {
        }
    })
}

var regex = function(regexValue, Temp) {
    $.ajax({
        url: BASE_URL + "/regex",
        type: "POST",
        dataType: "JSON",
        data: {regexValue: regexValue,
               temp: Temp},
        success: function (response) {
            regexTemp = response.status;
            $('#regexOutput').html('');
            for (var key in response.status) {
                var data = response.status;
                var $Td = $('<td class="'+key+'"></td>');
                var $div = $('<div class="regexClass">$'+key+'</div>');
                var $Tr = $('<tr></tr>');
                var $textarea = $('<div class="regexReturn"><xmp></xmp></div>')
                for (var key2 in data[key]) {
                    $textarea.append('<xmp>'+[key2]+' : '+data[key][key2]+'</xmp>');
                }
                $Tr.append($textarea);
                $div.append($Tr);
                $Td.append($div);
                $Td.append('<button class="del_'+key+'">DEL</button>');
                $Td.append('<button class="regex_'+key+'">REGEX</button>');
                $Td.append('<div class="secRregex_'+key+'"></div>');
                $('#regexOutput').append($Td);
            }
            $('#combineButton').html('');
            $('#combineButton').append('<input type="button" class="combine" value="combine">');
        }
    })
}
var regex2 = function(regexValue, Temp) {
    $.ajax({
        url: BASE_URL + "/regex2",
        type: "POST",
        dataType: "JSON",
        data: {regexValue: regexValue,
               temp: Temp},
        success: function (response) {
            var $Td = $('<td class="' + 3 + '"></td>');
            var $div = $('<div class="regexClass">$' + 3 + '</div>');
            var $Tr = $('<tr></tr>');
            var $textarea = $('<div class="regexReturn"><xmp></xmp></div>')
            for (var key in response.status) {
                    $textarea.append('<xmp>' + [key] + ' : ' + response.status[key] + '</xmp>');
            }
            $Tr.append($textarea);
            $div.append($Tr);
            $Td.append($div);
            $Td.append('<button class="del_' + 3 + '">DEL</button>');
            $Td.append('<button class="regex_' + 3 + '">REGEX</button>');
            $Td.append('<div class="secRregex_' + 3 + '"></div>');
            $('#regexOutput').append($Td);
        }
    })
}
var output = function(a, b) {
    $.ajax({
        url: BASE_URL + "/output",
        type: "POST",
        dataType: "JSON",
        data: {a: regexTemp[a], b: regexTemp[b]},
        success: function (response) {
            var $table = $('<table></table>');
            $('#resultOutput').html('');
            $table.append('<td class="title">期數</td>');
            $table.append('<td class="title">value</td>');
            for (var key in response.status) {
                var $Tr = $('<tr></tr>');
                var $Td1 = $('<td class="t1">'+key+'</td>');
                $Tr.append($Td1);
                var $Td2 = $('<td class="t3">'+response.status[key]+'</td>');
                $Tr.append($Td2);
                $table.append($Tr);
                $('#resultOutput').append($table);
            }
        },
        error: function (response) {
        }
    })
}