<?php  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB); 

$coll = $db->Store_Invitations;

$document = $dataObject->Data_General;

$coll->update(array("_id"=> new MongoId($document->Identificador)), array('$set' => array("Registration_Status"  => "COMP")));

$db_insert = $Conn->selectDB($document->DB_Company); 

$coll_User = $db_insert->Store_User_Access;
$coll_Audit = $db_insert->Store_Audit_User;

  $id='$id';
  $Mongo = new MongoId();  
  $User = $dataObject->Data->User;
  $Audit = $dataObject->Data->Audit;
  
  $User->_id = $Mongo;  
  $Audit->Mongo_User_ID = $Mongo->$id; 

   $coll_User->insert($User);
   $coll_Audit->insert($Audit);
  
echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>