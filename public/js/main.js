//全域變數
var BASE_URL = location.protocol + '//' + location.hostname,
    curlTemp = '',
    regexTemp;

$(document).on("click","#urlSubmit",function(){
    var urlValue = $("#url").val();
    curlUrl(urlValue);
});

$(document).on("click","#regexSubmit",function(){
    var regexValue = '/'+$("#regex").val()+'/';
    regex(regexValue, curlTemp);
});

//執行regexdel事件
$(document).on("click","#regexOutput button",function(){
    var $touch=$(this).attr("class"),
        touchEvent = $touch.split('_'),
        plan_Event=touchEvent[0],
        regex_id = touchEvent[1];
    if (plan_Event == 'del') {
        $('.'+regex_id).remove();
    } else if (plan_Event == 'regex') {
    } else if (plan_Event == 'split1') {
        split(1, regex_id);
    } else if (plan_Event == 'split2') {
        split(2, regex_id);
    }
});
//combine
$(document).on("click",".combine",function(){
    var $touch=$(this).parent().attr('id');
    output(1, 2);
});
function addheader() {
    var num = document.getElementById("headerItem").rows.length;
    var Tr = document.getElementById("headerItem").insertRow(num);
    Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML='<input class="headerItem" type="text">';
    Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML='<input class="value" type="text">';
}
//減少item
function lessheader() {
    var num = document.getElementById("headerItem").rows.length;
    if(num >0)
    {
        document.getElementById("headerItem").deleteRow(-1);
    }
}

var title = ["Header Name","value"];
$('#header').html('');
var $tableTitle = $('<table id="headerItem" border="0"></table>');
var $Tr = $('<tr></tr>');
for (var m in title ) {
    var $Td = $('<td bgcolor="#d0dac9" width="150px">'+title[m]+'</td>');
    $Td.text(title[m]);
    $Tr.append($Td);
    $tableTitle.append($Tr);
    $('#header').append($tableTitle);
    m++;
}

function addparameter() {
    var num = document.getElementById("parameterItem").rows.length;
    var Tr = document.getElementById("parameterItem").insertRow(num);
    Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML='<input class="parameterItem" type="text">';
    Td = Tr.insertCell(Tr.cells.length);
    Td.innerHTML='<input class="value" type="text">';
}
//減少item
function lessparameter() {
    var num = document.getElementById("parameterItem").rows.length;
    if(num >0)
    {
        document.getElementById("parameterItem").deleteRow(-1);
    }
}

var title = ["Parameter Name","value"];
$('#parameter').html('');
var $tableTitle = $('<table id="parameterItem" border="0"></table>');
var $Tr = $('<tr></tr>');
for (var m in title ) {
    var $Td = $('<td width="150" bgcolor="#d0dac9">'+title[m]+'</td>');
    $Td.text(title[m]);
    $Tr.append($Td);
    $tableTitle.append($Tr);
    $('#parameter').append($tableTitle);
    m++;
}

var curlUrl = function(urlValue) {
    $.ajax({
        url: BASE_URL + "/curlUrl",
        type: "POST",
        dataType: "JSON",
        data: {urlValue: urlValue},
        success: function (response) {
            curlTemp = response.status;
            $('#return').html('');
            $('#return').append('<textarea cols="50" rows="4">'+response.status+'</textarea>');
            //$('#return').append('<div class="curlReturn"><xmp>'+response.status+'</xmp></div>');
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
                $Td.append('<button class="split1_'+key+'">SPLIT_1</button>');
                $Td.append('<button class="split2_'+key+'">SPLIT_2</button>');
                $('#regexOutput').append($Td);
            }
            $('#regexOutput').append('<input type="button" class="combine" value="combine">');
        }
    })
}
var split = function($num, $data) {
    console.log($num);
    console.log(regexTemp[$data]);
    $.ajax({
        url: BASE_URL + "/split",
        type: "POST",
        dataType: "JSON",
        data: {num: $num, data: regexTemp[$data]},
        success: function (response) {
        }
    })
}
var output = function($a, $b) {
    $.ajax({
        url: BASE_URL + "/output",
        type: "POST",
        dataType: "JSON",
        data: {a: regexTemp[$a], b: regexTemp[$b]},
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