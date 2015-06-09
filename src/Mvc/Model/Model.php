<?php
namespace Mvc\Model;

class Model
{
    public function curlUrl($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        $temp =preg_replace('/\s/','',curl_exec($ch));
        return $temp;
    }

    public function method(){
    }

    public function header(){
    }

    public function parameter(){
    }

    public function regex($temp, $regexValue){
        preg_match_all($regexValue, $temp, $mat);
        $arr = array_combine($mat[1],$mat[2]);
        return $arr;
    }
}