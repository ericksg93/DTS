<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Notification;

$result = $coll->find($dataObject->Data);

$arrayResult = Array();
  
foreach($result as $doc){
 
  array_push($arrayResult, $doc);
  
}

echo json_encode($arrayResult);

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
