<?php
namespace Mvc\Model;

class Model
{
    public static $model = null;

    public static function init()
    {
        if (!static::$model) {
            static::$model = new self();
        }
        return static::$model;
    }

    public function curlUrl($url, $method, $headerData, $parameterData)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        if ($headerData) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, http_build_query($headerData));
        }
        curl_setopt($ch, CURLOPT_HEADER, false);
        if ($method === 'get') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        }
        if ($method === 'put') {
            if ($parameterData) {
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameterData));
            }
        }
        if ($method === 'post') {
            if ($parameterData) {
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameterData));
            }
        }
        if ($method === 'delete') {
            if ($parameterData) {
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($parameterData));
            }
        }
        $temp = preg_replace('/\s/', '', curl_exec($ch));
        $temp = mb_convert_encoding($temp, 'utf-8', 'GBK,UTF-8,ASCII');
        return $temp;
        $ch = curl_init();
    }

    public function regex($temp, $regexValue)
    {
        preg_match_all($regexValue, $temp, $mat);
        return $mat;
    }

    public function regex2($temp, $regexValue)
    {
        foreach ($temp as $key => $value) {
            preg_match_all($regexValue, $value, $ans);
            $arr[$key] = implode(',', $ans[1]);
        }
        return $arr;
    }

    public function split($temp, $num)
    {
        foreach ($temp as $key => $value) {
            $temp[$key] = implode(',', str_split($temp[$key], $num));
        }
        return $temp;
    }

    public function output($a, $b)
    {
        $arr = array_combine($a, $b);
        return $arr;
    }
}