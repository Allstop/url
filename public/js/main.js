//全域變數
var BASE_URL = location.protocol + '//' + location.hostname,
    temp = '';
$(document).on("click","#urlSubmit",function(){
    var urlValue = $("#url").val();
    curlUrl(urlValue);
});

$(document).on("click","#regexSubmit",function(){
    var regexValue = '/'+$("#regex").val()+'/';
    regex(regexValue);
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
$('#header').append('<input type="button" value="增加" onclick="addheader()">');
$('#header').append('<input type="button" value="減少" onclick="lessheader()">');
$('#header').append('<input type="submit" id="saveItem" value="送出">');


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
$('#parameter').append('<input type="button" value="增加" onclick="addparameter()">');
$('#parameter').append('<input type="button" value="減少" onclick="lessparameter()">');
$('#parameter').append('<input type="submit" id="saveItem" value="送出">');

var curlUrl = function(urlValue) {
    $.ajax({
        url: BASE_URL + "/curlUrl",
        type: "POST",
        dataType: "JSON",
        data: {urlValue: urlValue},
        success: function (response) {
            temp = response.status;
            $('#return').html('');
            $('#return').append('<textarea rows="8" cols="60">'+response.status+'</textarea>');
        }
    })
}
var regex = function(regexValue) {
    $.ajax({
        url: BASE_URL + "/regex",
        type: "POST",
        dataType: "JSON",
        data: {regexValue: regexValue,
               temp: temp},
        success: function (response) {
            var $table = $('<table></table>');
            $('#regexOutput').html('');
            $table.append('<td class="title">期數</td>');
            $table.append('<td class="title">value</td>');
            for (var key in response.status) {
                var $Tr = $('<tr></tr>');
                var $Td1 = $('<td class="t1">'+key+'</td>');
                $Tr.append($Td1);
                var $Td2 = $('<td class="t3">'+response.status[key]+'</td>');
                $Tr.append($Td2);
                $table.append($Tr);
                $('#regexOutput').append($table);
            }
        }
    })
}