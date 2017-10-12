<?php

try{

//Header access
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
 
//Json to Array      
$string = file_get_contents('php://input');

  $lines = explode(PHP_EOL, $string);
  
$array = array();
  
foreach ($lines as $line) {
    $array[] = str_getcsv($line);
}
  
  var_dump($array);
  
}catch(Exception $e){
  echo json_encode( array('Error' => $e->getMessage()));
}
