<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Vehicle ;

$ArrayLength = count($dataObject->Data);

for($i = 0; $i < $ArrayLength; $i++){

  $result = $coll->insert($dataObject->Data[$i]);

}

echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>