<?php
namespace Mvc\Core;

class App
{
    public static $data = null;

    public static $template = null;

    public static function forge($filename = null, $path = null)
    {
        return new self($filename, $path);
    }

    public static function getData()
    {
        self::$data = Data::forge();
        return self::$data;
    }
    public static function getTemplate()
    {
        if (self::$template == null) {
            self::$template = Template::forge(implode('/', array(dirname(dirname(dirname(__DIR__))), 'templates')));
        }
        return self::$template;
    }
}