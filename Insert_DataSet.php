<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);

$coll = $db->Store_DataSet;

$ArrayLength = count($dataObject->Data);

for($i = 0; $i < $ArrayLength; $i++){
	
if(isset($dataObject->Data[$i]->_id)){
  
    $id = '$id';

    $coll->remove(array('_id' => new MongoId($dataObject->Data[$i]->_id->$id)));
    $dataObject->Data[$i]->_id = new MongoId($dataObject->Data[$i]->_id->$id);

    $coll->insert($dataObject->Data[$i]);
  
   }else{
     
     $result = $coll->insert($dataObject->Data[$i]);
     
   }
  

}
echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>