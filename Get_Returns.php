<?php
try {
    header("Access-Control-Allow-Origin: * ");
    header("Access-Control-Allow-Credentials: true ");
    header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
    
  $Json_String = file_get_contents('php://input');
    
  $Json_Object = json_decode($Json_String);
   
  require 'ConnectionMongo.php';
   
  $coll = $db->Store_Jobs_Send;
  
  $result = $coll->find($Json_Object->Data, $Json_Object->Fields);
  
    $arrayResult = Array();
  
    foreach ($result as $doc) {
      
        array_push($arrayResult, $doc);
      
    }
  
    echo json_encode($arrayResult);
}
catch (Exception $e) {
    echo json_encode(array(
        'Error' => $e->getMessage()
    ));
}
?>