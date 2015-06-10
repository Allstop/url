<?php
namespace Mvc\Model;

class Model
{
    public function curlUrl($url, $method, $headerData, $parameterData){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $parameterData);
        $temp =preg_replace('/\s/','',curl_exec($ch));
        $temp = mb_convert_encoding($temp, 'utf-8', 'GBK,UTF-8,ASCII');
        return $temp;
        $ch = curl_init();
    }

    public function method(){
    }

    public function header(){
    }

    public function parameter(){
    }

    public function regex($temp, $regexValue){
        preg_match_all($regexValue, $temp, $mat);
        return $mat;
    }
    public function split($num, $data){
        foreach ($data as $key => $value) {
            $arr[$key]=implode(',', str_split($data[$key],$num));
        }
        return $arr;
    }
    public function output($a, $b){
        $arr = array_combine($a, $b);
        return $arr;
    }
}