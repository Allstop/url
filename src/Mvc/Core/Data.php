<?php
namespace Mvc\Core;

class Data
{
    public function getData()
    {
        $Data = array();
        if (isset($_POST['urlValue'])) {
            $Data['urlValue'] = trim($_POST['urlValue']);
        }
        if (isset($_POST['methodValue'])) {
            $Data['methodValue'] = trim($_POST['methodValue']);
        }
        if (isset($_POST['headerList'])) {
            foreach ((array)$_POST['headerList'] as $key => $value) {
                $_POST['headerList'][$key] = trim($value);
            }
            $Data['headerList'] = array_combine($Data['headerList']['item'], $Data['headerList']['value']);
        }
        if (isset($_POST['parameterList'])) {
            foreach ((array)$_POST['parameterList'] as $key => $value) {
                $_POST['parameterList'][$key] = trim($value);
            }
            $Data['parameterList'] = array_combine($Data['parameterList']['item'], $Data['parameterList']['value']);
        }
        if (isset($_POST['temp'])) {
            foreach ((array)$_POST['temp'] as $key => $value) {
                $_POST['temp'][$key] = trim($value);
            }
            $Data['temp'] = $_POST['temp'];
        }
        if (isset($_POST['regexValue'])) {
            $Data['regexValue'] = trim($_POST['regexValue']);
        }
        if (isset($_POST['num'])) {
            $Data['num'] = trim($_POST['num']);
        }
        if (isset($_POST['a'])) {
            foreach ((array)$_POST['a'] as $key => $value) {
                $_POST['a'][$key] = trim($value);
            }
            $Data['a'] = $_POST['a'];
        }
        if (isset($_POST['b'])) {
            foreach ((array)$_POST['b'] as $key => $value) {
                $_POST['b'][$key] = trim($value);
            }
            $Data['b'] = $_POST['b'];
        }
        return $Data;
    }
}