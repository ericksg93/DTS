<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){
    $db = $Conn->selectDB($dataObject->DB);
    $coll = $db->Store_Case_Change_GPS;
    $document = $dataObject->Data;
    $id = '$id';
    $coll->update(array("_id"=> new MongoId($document->id)), array('$set' => array("State"  => "CANC")));
    echo json_encode(array("Message"=>"Eliminado"));
}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>

