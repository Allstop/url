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

        if (isset(self::$data->getData()['regexValue'])) {
            var_dump(self::$data->getData()['regexValue']);
            $status = $this->Model->regex2(self::$data->getData()['temp'], self::$data->getData()['regexValue']);
            return Template::render('regex-output.html', array('regex2_output' => $status));
        }
    }

    public function split()
    {
        if (isset(self::$data->getData()['num'])) {
            var_dump(self::$data->getData()['num']);
            $status = $this->Model->split(self::$data->getData()['temp'], self::$data->getData()['num']);
            return Template::render('regex-output.html', array('split_output' => $status ));
        }
    }
    public function output()
    {
        if (isset(self::$data->getData()['1']) and !isset(self::$data->getData()['2'])) {
            $status = $this->Model->output(self::$data->getData()['0'], self::$data->getData()['1']);
            return Template::render('com-output.html', array('com_output' => $status ));
        } else {
            echo 'error';
        }

    }
}