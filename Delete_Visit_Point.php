<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Visit_Point;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  
$coll->remove(array('_id' => new MongoId($dataObject->Data[$i])));
  
}

$document->_id = new MongoId($document->_id->$id);

$coll->insert($document); 

echo json_encode(array("Message"=>"Eliminado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
