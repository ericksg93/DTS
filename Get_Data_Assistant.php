<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);

$GUID = getGUID();
  
$coll = $db->Store_Jobs_Send;
 
$result = $coll->find($dataObject->Data_Driver);

$arrayResult = Array();

foreach($result as $doc){
 
 $doc->Visibility_State = false;
 array_push($arrayResult, $doc);  

}

$coll = $db->Store_Notification;

$result = $coll->find($dataObject->Data_Assistant);

foreach($result as $doc){
  
 array_push($arrayResult, $doc);
 $coll->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Token_Synch" => $GUID)));
  
}

echo json_encode(array("Data"=>$arrayResult,"Token_Synch"=>$GUID));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>