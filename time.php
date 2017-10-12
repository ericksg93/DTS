<?php
//Header access
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

ini_set('date.timezone','America/Costa_Rica'); 
$Date = date("Y-m-d H:i:s");
//$Date = date("H:i:s");

$jsonArray = array();

$jsonArray["Time"] = $Date;
echo json_encode($jsonArray);

?>