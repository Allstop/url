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

    public function curlUrl($url, $method, $header_data, $parameter_data)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        if ($header_data) {
            $_data = array_combine($header_data['item'], $header_data['value']);
            curl_setopt($ch, CURLOPT_HTTPHEADER, http_build_query($_data));
        }
        curl_setopt($ch, CURLOPT_HEADER, false);
        if ($method === 'get') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        }
        if ($method === 'put') {
            if ($parameter_data) {
                $_data = array_combine($parameter_data['item'], $parameter_data['value']);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_data));
            }
        }
        if ($method === 'post') {
            if ($parameter_data) {
                $_data = array_combine($parameter_data['item'], $parameter_data['value']);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_data));
            }
        }
        if ($method === 'delete') {
            if ($parameter_data) {
                $_data = array_combine($parameter_data['item'], $parameter_data['value']);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_data));
            }
        }
        $temp = preg_replace('/\s/', '', curl_exec($ch));
        $temp = mb_convert_encoding($temp, 'utf-8', 'GBK,UTF-8,ASCII');
        return $temp;
        $ch = curl_init();
    }

    public function regex($temp, $regex_value)
    {
        preg_match_all($regex_value, $temp, $mat);
        return $mat;
    }

    public function regex2($temp, $regex_value)
    {
        foreach ($regex_value as $key => $value) {
            if (!empty($regex_value[$key])) {
                foreach ($temp[$key] as $key2 => $value2) {
                    preg_match_all($regex_value[$key], $value2, $ans);
                    foreach ($ans as $key3 => $value3) {
                        if ($key3!== 0) {
                            $arr[$key3][$key2] = implode(',', $ans[$key3]);
                        }
                    }
                }
            }
        }
        return $arr;
    }

    public function split($temp, $num)
    {
        foreach ($num as $key => $value) {
            if (!empty($num[$key])) {
                foreach ($temp[$key] as $key2 => $value2) {
                    $arr[$key2] = implode(',', str_split($temp[$key][$key2], $num[$key]));
                }
            }
        }

        return array($arr);
    }

    public function output($a, $b)
    {
        $arr = array_combine($a, $b);
        return $arr;
    }
}