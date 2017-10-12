<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Jobs_Send;
 
$result = $coll->find($dataObject->Data);

foreach($result as $doc){
 
$coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State" => "Sync_With_Mobile","Control.Syncroniced_Date"=>date_timestamp_get(date_create())*1000)));

}

$coll = $db->Store_Notification;

$result = $coll->find($dataObject->Data);

foreach($result as $doc){ 
  
$coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Transferring_State"  => "Sync_With_Mobile","State_Sent"  => true ,"Control.Syncroniced_Date"=>date_timestamp_get(date_create())*1000)));
  
}

echo json_encode(array("Result"=>"OK"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
