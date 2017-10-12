<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Jobs_Send;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  
$coll->remove(array('_id' => new MongoId($dataObject->Data[$i])));
  
}


echo json_encode(array("Message"=>"Eliminado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>