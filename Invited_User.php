<?php
 
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

    $db = $Conn->selectDB($dataObject->DB);    
       
    $coll = $db-> Store_Mails_Invitations;
    
    $GUID = getGUID();
    
    $dataObject->Data->ID_Case = $GUID;
    
    $result = $coll->insert($dataObject->Data);
    
    echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>