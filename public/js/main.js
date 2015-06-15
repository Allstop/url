//全域變數
var BASE_URL = location.protocol + '//' + location.hostname,
    curlTemp = '',
    regexTemp,
    headerList=[],
    parameterList=[];

//spilt欄位只能輸入數字
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
    $('.header-table').append(
      "<td class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'>Header Name</h3></div></td>" +
      "<td class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'>Value</h3></div></td>");
    for (var key2 in headerList['item']) {
        var $Tr = $('<tr></tr>');
        $Tr.append('<td class="panel-body">'+headerList['item'][key2]+'</td>');
        $Tr.append('<td class="panel-body">'+headerList['value'][key2]+'</td>');
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
      regex_Event=touchEvent[0],
        regex_id = touchEvent[1],
        regex_idEvent = regex_id.split(' '),
        regex_id_num=regex_idEvent[0];
    if (regex_Event === 'del') {
        $('.'+regex_id_num).remove();
    } else if (regex_Event === 'regex') {
        $('.sec-regex_'+regex_id_num).html('');
        $('.sec-regex_'+regex_id_num).append('<input type="text" class="sec-regex_'+regex_id_num+'-text form-control">');
        $('.sec-regex_'+regex_id_num).append('<span class="input-group-btn">' +
        '<button class="sec-regex-submit_'+regex_id_num+' btn btn-default" type="button">REGEX</button>');
    //執行第二次regex
    } else if (regex_Event === 'sec-regex-submit') {
        var secRegexValue = '/'+$(".sec-regex_"+regex_id_num+"-text").val()+'/';
        regex2(secRegexValue, regexTemp[regex_id_num]);
    } else if (regex_Event === 'split') {
        $('.sec-split_'+regex_id_num).html('');
        $('.sec-split_'+regex_id_num).append('<input type="text" class="split_'+regex_id_num+'-text form-control" ' +
        'size="2" onkeyup="return ValidateNumber(this,value)">');
        $('.sec-split_'+regex_id_num).append('<span class="input-group-btn">' +
        '<button class="split-submit_'+regex_id_num+' btn btn-default" type="button">SPLIT</button>');
    } else if (regex_Event === 'split-submit') {
        var splitValue = $(".split_" + regex_id_num + "-text").val();
        split(splitValue, regexTemp[regex_id_num]);
    }
});

//combine
$(document).on("click",".combine-submit",function(){
    var $childrenArray = [];
    var $children;
    $(this).prev().children().each(function(){
        $children = $(this).attr('class'),
        childrenEvent = $children.split(' ');
        $childrenArray.push(childrenEvent[0]);
    });
    console.log($childrenArray);
    if ($childrenArray.length !== 2) {
        alert("請確認combine數量,應為2");
    } else {
        output($childrenArray[0], $childrenArray[1]);
    }

});
//add&del
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
                $('.url-output').append('<div class="col-lg-10"><textarea class="form-control" rows="3" ' +
                'style="margin: 0px -4.84375px 0px 0px; width: 428px; height: 96px;">'+response.status+'</textarea></div>');
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
                var $Td = $('<td class="'+key+' panel-title"></td>');
                var $div = $('<div class="regex-output-category panel panel-info">$'+key+'</div>');
                var $Tr = $('<tr></tr>');
                var $textarea = $('<div class="regex-output-item panel-body"></div>')
                for (var key2 in data[key]) {
                    $textarea.append('<xmp>'+[key2]+' : '+data[key][key2]+'</xmp>');
                }
                $Tr.append($textarea);
                $div.append($Tr);
                $Td.append($div);
                $Td.append('<button class="del_' + key + ' btn btn-danger">del</button>');
                $Td.append('<button class="regex_' + key + ' btn btn-info">regex</button>');
                $Td.append('<button class="split_' + key + ' btn btn-primary">split</button>');
                $Td.append('<div class="sec-regex_' + key + ' input-group"></div>');
                $Td.append('<div class="sec-split_' + key + ' input-group"></div>');

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
            $Td.append('<button class="del_' + num + ' btn btn-danger">del</button>');
            $Td.append('<button class="regex_' + num + '  btn btn-info">regex</button>');
            $Td.append('<button class="split_' + num + ' btn btn-primary">split</button>');
            $Td.append('<div class="sec-regex' + num + ' input-group"></div>');
            $Td.append('<div class="sec-split_' + num + ' input-group"></div>');
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
            $Td.append('<button class="del_' + num + ' btn btn-danger">del</button>');
            $Td.append('<button class="regex_' + num + '  btn btn-info">regex</button>');
            $Td.append('<button class="split_' + num + ' btn btn-primary">split</button>');
            $Td.append('<div class="sec-regex' + num + ' input-group"></div>');
            $Td.append('<div class="sec-split_' + num + ' input-group"></div>');
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
            var $table = $('<table class="table table-striped table-hover"></table>');
            $('.result-output').html('');
            $table.append('<thead><tr class="success"><th class="title">Draw</th><th class="title">Value</th></tr>' +
            '</thead>');
            for (var key in response.status) {
                var $Tr = $('<tr></tr>');
                var $Td1 = $('<td>'+key+'</td>');
                $Tr.append($Td1);
                var $Td2 = $('<td>'+response.status[key]+'</td>');
                $Tr.append($Td2);
                $table.append($Tr);
                $('.result-output').append($table);
            }

        },
        error: function (response) {
        }
    })
}