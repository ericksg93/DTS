<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn, $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);

$coll = $db->Store_Geolocation;

$arrayResult = Array();

 foreach($dataObject->Data as $doc){

 $coll->insert($doc);
	
 array_push($arrayResult, $doc->id);
   
 }

echo json_encode(array("Data"=>$arrayResult,"Collection_Name"=>$dataObject->Collection_Name));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>