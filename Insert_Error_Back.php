<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);

$coll = $db->Store_Error_Back;

 foreach($dataObject->Data as $doc){

      $coll->insert($doc);
	
    }

echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>