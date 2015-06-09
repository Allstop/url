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
        $status = $this->Model->curlUrl($_POST['urlValue']);
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
}