<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  /*
$coll = $db-> Store_User_Access ;


$ArrayLength = count($dataObject->Data);

for($i = 0; $i < $ArrayLength; $i++){

  $result = $coll->insert($dataObject->Data[$i]);

}
echo json_encode(array("Message"=>"Insertado"));

*/
$coll_User = $db->Store_User_Access;
$coll_Audit = $db->Store_Audit_User;

$ArrayDataLength = count($dataObject->Data);


for($i = 0; $i < $ArrayDataLength; $i++){
  
  $id='$id';
  $Mongo = new MongoId();  
  $User = $dataObject->Data[$i]->User;
  $Audit = $dataObject->Data[$i]->Audit;
  
  $User->_id = $Mongo;  
  $Audit->Mongo_User_ID = $Mongo->$id; 

   $coll_User->insert($User);
   $coll_Audit->insert($Audit);
  
}


echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>