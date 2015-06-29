<?php
namespace Mvc\Controller;

use Mvc\Model\Model;
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
            self::$data->getData()['url'],
            self::$data->getData()['method'],
            self::$data->getData()['header'],
            self::$data->getData()['parameter']
        );
        return Template::render('url-output.html', array('curl_output' => $status));

    }

    public function regex()
    {
        $status = $this->Model->regex(self::$data->getData()['temp'], self::$data->getData()['regex']);
        return Template::render('com-output.html', array('regex_output' => $status));
    }

    public function regex2()
    {

        if (isset(self::$data->getData()['regex'])) {
            $status = $this->Model->regex2(self::$data->getData()['temp'], self::$data->getData()['regex']);
            $result = array_merge(self::$data->getData()['temp'], $status);
            return Template::render('com-output.html', array('regex_output' => $result));
        }
    }

    public function split()
    {
            $status = $this->Model->split(self::$data->getData()['temp'], self::$data->getData()['num']);
            $result = array_merge(self::$data->getData()['temp'], $status);
            return Template::render('com-output.html', array('regex_output' => $result));
    }

    public function output()
    {
        if (isset(self::$data->getData()['1']) and !isset(self::$data->getData()['2'])) {
            $status = $this->Model->output(self::$data->getData()['0'], self::$data->getData()['1']);
            return Template::render('com-output.html', array('regex_output' => self::$data->getData(),
                                                             'com_output' => $status));
        } else {
            return Template::render('com-output.html', array('com_output' => 'error'));
        }

    }
}