<?php
namespace Mvc\Core;

class Con
{
    public static $app = null;

    public static function init()
    {
        self::$app = App::forge();
        self::$app->getTemplate();
        self::$app->getData();
    }
}