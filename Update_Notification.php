<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
    
 $coll = $db->Store_Notification;

$arrayResult = Array();

 foreach($dataObject->Data as $doc){

      $id = '$id';

      $coll->remove(array('_id' => new MongoId($doc->_id->$id)));

      $doc->_id = new MongoId($doc->_id->$id);

      $coll->insert($doc);
	
      array_push($arrayResult, $doc->_id->$id);
   
    }

echo json_encode(array("Data"=>$arrayResult,"Collection_Name"=>$dataObject->Collection_Name));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
