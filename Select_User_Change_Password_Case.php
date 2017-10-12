<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_Mails_Password;

$result = $coll->findOne($dataObject->Data,$dataObject->Fields);

if($result){  
		echo json_encode(array("Result"=> true, "Data"=>$result));
}else{
		echo json_encode(array("Result"=> false));
}

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>

