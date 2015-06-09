<?php

require_once("vendor/autoload.php");
use Pux\Mux;
$mux = new Mux;
$mux->any('/', ['Mvc\Controller\TemplateController', 'index']);
$mux->post('/curlUrl', ['Mvc\Controller\Controller', 'curlUrl']);
$mux->post('/regex', ['Mvc\Controller\Controller', 'regex']);
return $mux;
