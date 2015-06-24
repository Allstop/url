<?php
namespace Mvc\Controller;

use Mvc\Model\Model;
use Mvc\View\View;
use Mvc\Core\Con;
use Mvc\Core\Template;
use Mvc\Core\Data;

class Controller extends Con
{

    private $Model = null;

    public static $data = null;

    public function __construct()
    {
        Controller::init();
        $this->Model = Model::init();
        self::$data = new Data();
        $this->action = isset($_GET['act']) ? strtolower($_GET['act']) : 'index';
    }

    public function index()
    {
        return Template::render();
    }

    public function curlUrl()
    {
        $status = $this->Model->curlUrl(
            self::$data->getData()['urlValue'],
            self::$data->getData()['methodValue'],
            self::$data->getData()['headerList'],
            self::$data->getData()['parameterList']
        );
        return Template::render('url-output.html', array('curl_output' => $status ));

    }

    public function regex()
    {
        $status = $this->Model->regex(self::$data->getData()['temp'], self::$data->getData()['regexValue']);
        return Template::render('regex-output.html', array('regex_output' => $status ));
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