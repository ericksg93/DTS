<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';
if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll_User = $db->Store_Mails_Invitations;

$coll_User->remove(array('ID_Case' =>$dataObject->Data));
echo json_encode(array("Message"=>"Eliminado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>


