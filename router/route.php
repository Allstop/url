<?php
require_once("vendor/autoload.php");

use Pux\Mux;

$mux = new Mux;
$mux->any('/', ['Mvc\Controller\TemplateController', 'index']);
$mux->post('/curlUrl', ['Mvc\Controller\Controller', 'curlUrl']);
$mux->post('/regex', ['Mvc\Controller\Controller', 'regex']);
$mux->post('/regex2', ['Mvc\Controller\Controller', 'regex2']);
$mux->post('/output', ['Mvc\Controller\Controller', 'output']);
return $mux;
