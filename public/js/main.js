//全域變數
var BASE_URL = location.protocol + '//' + location.hostname,
    curlTemp = '',
    regexTemp,
    headerList=[],
    parameterList=[];

var ValidateNumber=function(e, pnumber){
    if (!/^\d+$/.test(pnumber))
    {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}

$(document).on("click",".url-submit",function(){
    $('.result-output').html('');
    $('.regex-output-content').html('');
    var urlValue = $(".url-text").val();
    var methodValue = $(".method").val();
    curlUrl(urlValue, methodValue, headerList, parameterList);
});

$(document).on("click",".header-submit",function(){
    var itemArrText= [];
    var valuArrTexte= [];
    $('input[class="header-item"]').each(function(){
        itemArrText.push($(this).val());
    });
    $('input[class="header-value"]').each(function(){
        valuArrTexte.push($(this).val());
    });
    headerList = {
        "item" : itemArrText,
        "value" : valuArrTexte
    };
    $('.header-table').html("");
    $('.header-table').append("<thead><tr><td class='header-input-title'>Header Name</td>" +
    " <td class='header-input-title'>value</td></tr></thead>");
    for (var key2 in headerList['item']) {
        var $Tr = $('<tr></tr>');
        $Tr.append('<td>'+headerList['item'][key2]+'</td>');
        $Tr.append('<td>'+headerList['value'][key2]+'</td>');
        $('.header-table').append($Tr);
    }
});

$(document).on("click",".parameter-submit",function(){
    var itemArrText= [];
    var valuArrTexte= [];
    $('input[class="parameter-item"]').each(function(){
        itemArrText.push($(this).val());
    });
    $('input[class="parameter-value"]').each(function(){
        valuArrTexte.push($(this).val());
    });
    parameterList = {
        "item" : itemArrText,
        "value" : valuArrTexte
    };
    $('.parameter-table').html("");
    $('.parameter-table').append("<thead><tr><td class='parameter-input-title'>Parameter Name</td>" +
    " <td class='parameter-input-title'>value</td></tr></thead>");
        for (var key2 in parameterList['item']) {
            var $Tr = $('<tr></tr>');
            $Tr.append('<td>'+parameterList['item'][key2]+'</td>');
            $Tr.append('<td>'+parameterList['value'][key2]+'</td>');
            $('.parameter-table').append($Tr);
        }
});

//執行第一次regex
$(document).on("click",".regex-submit",function(){
    var regexValue = '/'+$(".regex-text").val()+'/';
    regex(regexValue, curlTemp);
});

//執行del/regex/split事件
$(document).on("click",".regex-output-content button",function(){
    var $touch=$(this).attr("class"),
        touchEvent = $touch.split('_'),
        plan_Event=touchEvent[0],
        regex_id = touchEvent[1];
    if (plan_Event == 'del') {
        $('.'+regex_id).remove();
    } else if (plan_Event == 'regex') {
        $('.sec-regex_'+regex_id).html('');
        $('.sec-regex_'+regex_id).append('請輸入regex<input type="text" class="sec-regex_'+regex_id+'-text" size="15">');
        $('.sec-regex_'+regex_id).append('<button class="sec-regex-submit_'+regex_id+'">送出</button>');

    //執行第二次regex
    } else if (plan_Event == 'sec-regex-submit') {
        var secRegexValue = '/'+$(".sec-regex_"+regex_id+"-text").val()+'/';
        regex2(secRegexValue, regexTemp[regex_id]);
    } else if (plan_Event == 'split') {
        $('.sec-split_'+regex_id).html('');
        $('.sec-split_'+regex_id).append('請輸入split num<input type="text" class="split_'+regex_id+'-text" size="2" ' +
        'onkeyup="return ValidateNumber(this,value)">');
        $('.sec-split_'+regex_id).append('<button class="split-submit_'+regex_id+'">送出</button>');
    } else if (plan_Event == 'split-submit') {
        var splitValue = $(".split_" + regex_id + "-text").val();
        split(splitValue, regexTemp[regex_id]);
    }
});

//combine
$(document).on("click",".combine-submit",function(){
    var $childrenArray = [];
    var $children;
    $(this).prev().children().each(function(){
        $children = $(this).attr('class');
        $childrenArray.push($children);
    });
    if ($childrenArray.length !== 2) {
        alert("請確認combine數量,應為2");
    } else {
        output($childrenArray[0], $childrenArray[1]);
    }

});

$(function(){
    $(".add-header").click(function(){
        $('.header-table').append('<tr><td><input class="header-item" type="text"></td>' +
        '<td><input class="header-value" type="text"></td></tr>');
    });
    $(".del-header").click(function(){
        $(".header-table tr:last").remove();
    });
    $(".add-parameter").click(function(){
        $('.parameter-table').append('<tr><td><input class="parameter-item" type="text"></td>' +
        '<td><input class="parameter-value" type="text"></td></tr>');
    });
    $(".del-parameter").click(function(){
        $(".parameter-table tr:last").remove();
    });
});

var curlUrl = function(urlValue, methodValue, headerList, parameterList) {
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
                $('.url-output').html('');
                $('.url-output').append('<textarea cols="50" rows="4">'+response.status+'</textarea>');
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
            $('.regex-output-content').html('');
            for (var key in response.status) {
                var data = response.status;
                var $Td = $('<td class="'+key+'"></td>');
                var $div = $('<div class="regex-output-category">$'+key+'</div>');
                var $Tr = $('<tr></tr>');
                var $textarea = $('<div class="regex-output-item"></div>')
                for (var key2 in data[key]) {
                    $textarea.append('<xmp>'+[key2]+' : '+data[key][key2]+'</xmp>');
                }
                $Tr.append($textarea);
                $div.append($Tr);
                $Td.append($div);
                $Td.append('<button class="del_' + key + '">DEL</button>');
                $Td.append('<button class="regex_' + key + '">REGEX</button>');
                $Td.append('<button class="split_' + key + '">SPLIT</button>');
                $Td.append('<div class="sec-regex_' + key + '"></div>');
                $Td.append('<div class="sec-split_' + key + '"></div>');

                $('.regex-output-content').append($Td);
            }
            $('.combine-submit').show();
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
            var num=regexTemp.length;
            regexTemp[num]=response.status;
            var $Td = $('<td class="' + num + '"></td>');
            var $div = $('<div class="regex-output-category">$' + num + '</div>');
            var $Tr = $('<tr></tr>');
            var $textarea = $('<div class="regex-output-item"></div>')
            for (var key in response.status) {
                    $textarea.append('<xmp>' + [key] + ' : ' + response.status[key] + '</xmp>');
            }
            $Tr.append($textarea);
            $div.append($Tr);
            $Td.append($div);
            $Td.append('<button class="del_' + num + '">DEL</button>');
            $Td.append('<button class="regex_' + num + '">REGEX</button>');
            $Td.append('<button class="split_' + num + '">SPLIT</button>');
            $Td.append('<div class="sec-regex' + num + '"></div>');
            $Td.append('<div class="sec-split_' + num + '"></div>');
            $('.regex-output-content').append($Td);
        }
    })
}
var split = function(num, Temp) {
    $.ajax({
        url: BASE_URL + "/split",
        type: "POST",
        dataType: "JSON",
        data: {num: num,
            temp: Temp},
        success: function (response) {
            var num=regexTemp.length;
            regexTemp[num]=response.status;
            var $Td = $('<td class="' + num + '"></td>');
            var $div = $('<div class="regex-output-category">$' + num + '</div>');
            var $Tr = $('<tr></tr>');
            var $textarea = $('<div class="regex-output-item"></div>')
            for (var key in response.status) {
                $textarea.append('<xmp>' + [key] + ' : ' + response.status[key] + '</xmp>');
            }
            $Tr.append($textarea);
            $div.append($Tr);
            $Td.append($div);
            $Td.append('<button class="del_' + num + '">DEL</button>');
            $Td.append('<button class="regex_' + num + '">REGEX</button>');
            $Td.append('<button class="split_' + num + '">SPLIT</button>');
            $Td.append('<div class="sec-regex' + num + '"></div>');
            $Td.append('<div class="sec-split_' + num + '"></div>');
            $('.regex-output-content').append($Td);
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
            $('.result-output').html('');
            $table.append('<td class="title">期數</td>');
            $table.append('<td class="title">value</td>');
            for (var key in response.status) {
                var $Tr = $('<tr></tr>');
                var $Td1 = $('<td class="t1">'+key+'</td>');
                $Tr.append($Td1);
                var $Td2 = $('<td class="t3">'+response.status[key]+'</td>');
                $Tr.append($Td2);
                $table.append($Tr);
                $('.result-output').append($table);
            }

        },
        error: function (response) {
        }
    })
}