<?php
namespace Mvc\Core;

class Data {

    public function getData()
    {
        foreach ($_POST as $key => $value)
        {
            $_POST[$key] = trim($value);
        }
        $Data = array();
        if (isset($_POST['urlValue'])) {
            $Data['urlValue'] = $_POST['urlValue'];
        }
        if (isset($_POST['methodValue'])) {
            $Data['methodValue'] = $_POST['methodValue'];
        }
        if (isset($_POST['headerList'])) {
            $Data['hItem'] = $_POST($_POST['headerList']['item']);
            $Data['hValue'] = $_POST($_POST['headerList']['value']);
        }
        if (isset($_POST['parameterList'])) {
            $Data['pItem'] = $_POST($_POST['parameterList']['item']);
            $Data['pValue'] = $_POST($_POST['parameterList']['value']);
        }
        if (isset($_POST['temp'])) {
            $Data['temp'] = $_POST['temp'];
        }
        if (isset($_POST['regexValue'])) {
            $Data['regexValue'] = $_POST['regexValue'];
        }
        if (isset($_POST['num'])) {
            $Data['num'] = $_POST['num'];
        }
        if (isset($_POST['a'])) {
            $Data['a'] = $_POST['a'];
        }
        if (isset($_POST['b'])) {
            $Data['b'] = $_POST['b'];
        }
        return $Data;
    }
}