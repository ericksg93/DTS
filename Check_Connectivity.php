<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){
    
$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db->Store_User_Online;

$result = $coll->find($dataObject->User_Info);
 
if($result->count() === 1){
 
  foreach($result as $doc){
    
	 $id = '$id';
    
    $coll->update($dataObject->User_Info,$dataObject->Data);
    
    echo json_encode(array("ID"=>$doc->_id->$id));
   
  }

  
}else{
  
  $coll->insert($dataObject->Data);
  
  echo json_encode(array("Message"=>"Insertado"));
  
}

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
