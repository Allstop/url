<?php
namespace Mvc\Controller;

use Mvc\Model\Model;
use Mvc\View\View;
use Mvc\Core\Data;

class Controller
{

    private $Model = null;

    public static $data = null;

    public function __construct()
    {
        $this->Model = Model::init();
        self::$data = new Data();
    }

    public function curlUrl()
    {
        if (!empty(self::$data->getData()['hItem'])) {
            $header = array_combine(self::$data->getData()['hItem'], self::$data->getData()['hValue']);
        } else {
            $header = '';
        }
        if (!empty(self::$data->getData()['pItem'])) {
            $parameter = array_combine(self::$data->getData()['pItem'], self::$data->getData()['pValue']);
        } else {
            $parameter = '';
        }
        $status = $this->Model->curlUrl(self::$data->getData()['urlValue'], self::$data->getData()['methodValue'], $header,  $parameter);
        return View::render(array('status' => $status));
    }

    public function regex()
    {
        $status = $this->Model->regex(self::$data->getData()['temp'], self::$data->getData()['regexValue']);
        return View::render(array('status' => $status));
    }

    public function regex2()
    {
        $status = $this->Model->regex2(self::$data->getData()['temp'], self::$data->getData()['regexValue']);
        return View::render(array('status' => $status));
    }

    public function split()
    {
        $status = $this->Model->split(self::$data->getData()['temp'], self::$data->getData()['num']);
        return View::render(array('status' => $status));
    }
    public function output()
    {
        $status = $this->Model->output(self::$data->getData()['a'], self::$data->getData()['b']);
        return View::render(array('status' => $status));
    }
}