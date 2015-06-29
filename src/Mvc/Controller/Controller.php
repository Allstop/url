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
        if (! empty(self::$data->getData()['regex'])) {
            $status = $this->Model->regex(self::$data->getData()['temp'], self::$data->getData()['regex']);
            return Template::render('com-output.html', array('regex_output' => $status));
        }
    }

    public function regex2()
    {
        foreach (self::$data->getData()['regex'] as $key => $value) {
            ! empty(self::$data->getData()['regex'][$key])
            and $regex_value=self::$data->getData()['regex'][$key]
            and $temp=self::$data->getData()['temp'][$key];
        }
        if (! empty($regex_value)) {
            $status = $this->Model->regex2($temp, $regex_value);
            $result = array_merge(self::$data->getData()['temp'], $status);
            return Template::render('com-output.html', array('regex_output' => $result));
        }
    }

    public function split()
    {
        foreach (self::$data->getData()['num'] as $key => $value) {
            ! empty(self::$data->getData()['num'][$key])
            and $num = self::$data->getData()['num'][$key]
            and $temp = self::$data->getData()['temp'][$key];
        }
        if (! empty($num)) {
            $status = $this->Model->split($temp, $num);
            $result = array_merge(self::$data->getData()['temp'], array($status));
            return Template::render('com-output.html', array('regex_output' => $result));
        }
    }

    public function output()
    {
        isset(self::$data->getData()['1']) and
        ! isset(self::$data->getData()['2']) and
        $status = $this->Model->output(self::$data->getData()['0'], self::$data->getData()['1']);
        return Template::render(
            'com-output.html',
            array('regex_output' => self::$data->getData(), 'com_output' => $status
            )
        );
    }
}