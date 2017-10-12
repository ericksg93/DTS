<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

    $db = $Conn->selectDB($dataObject->DB);
    $coll = $db->Store_Case_Change_GPS;
    $documentCase = $dataObject->Case;
    $id = '$id';
    $coll->update(array("_id"=> new MongoId($documentCase->_id->$id)), array('$set' => array("State"  => "COMP")));
    
    $collCompany = $db->Store_Visit_Point;
    $document = $dataObject->Data;
    
$collCompany->remove(array('_id' => new MongoId($document->_id->$id)));

 $document->_id = new MongoId($document->_id->$id);

 $collCompany->insert($document);    
echo json_encode(array("Message"=>"Actualizado"));
}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
