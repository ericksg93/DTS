<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);

$coll = $db->Store_Vehicle;
 
$document = $dataObject->Data;

$id = '$id';

$coll->remove(array('_id' => new MongoId($document->_id->$id)));

 $document->_id = new MongoId($document->_id->$id);

 $coll->insert($document);

echo json_encode($dataObject->Data);
  
}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>