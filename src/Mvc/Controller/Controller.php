<?php
namespace Mvc\Controller;

use Mvc\Model\Model;
use Mvc\View\View;

class Controller
{
    public function __construct()
    {
        $this->Model = new Model();
    }

    public function curlUrl(){
        if (!empty($_POST['headerList'])) {
            $header = array_combine($_POST['headerList']['item'], $_POST['headerList']['value']);
        }
        if (!empty($_POST['parameterList'])) {
            $parameter = array_combine($_POST['parameterList']['item'], $_POST['parameterList']['value']);
        }
        $status = $this->Model->curlUrl($_POST['urlValue'], $_POST['methodValue'], $header,  $parameter);
        return View::render(array('status' => $status));
    }

    public function regex(){
        $status = $this->Model->regex($_POST['temp'], $_POST['regexValue']);
        return View::render(array('status' => $status));
    }

    public function regex2(){
        $status = $this->Model->regex2($_POST['temp'], $_POST['regexValue']);
        return View::render(array('status' => $status));
    }

    public function output(){
        $status = $this->Model->output($_POST['a'], $_POST['b']);
        return View::render(array('status' => $status));
    }
}