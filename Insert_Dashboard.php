<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Dashboard;

if(isset($dataObject->Data->_id)){
  
    $id = '$id';

    $coll->remove(array('_id' => new MongoId($dataObject->Data->_id->$id)));
    $dataObject->Data->_id = new MongoId($dataObject->Data->_id->$id);

    $coll->insert($dataObject->Data);
  
   }else{
     
     $result = $coll->insert($dataObject->Data);
     
   }
  

echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>