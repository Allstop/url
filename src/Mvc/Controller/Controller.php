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
        $status = $this->Model->curlUrl($_POST['urlValue'], $_POST['method'], $_POST['headerData'],  $_POST['parameterData']);
        return View::render(array('status' => $status));
    }

    public function method(){
    }

    public function header(){
    }

    public function parameter(){
    }

    public function regex(){
        $status = $this->Model->regex($_POST['temp'], $_POST['regexValue']);
        return View::render(array('status' => $status));
    }
    public function split(){
        $status = $this->Model->regex($_POST['num'], $_POST['data']);
        return View::render(array('status' => $status));
    }
    public function output(){
        $status = $this->Model->output($_POST['a'], $_POST['b']);
        return View::render(array('status' => $status));
    }
}