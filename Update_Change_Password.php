<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

    $db = $Conn->selectDB($dataObject->DB);
  //  echo ("db/");
    $coll = $db->Store_Mails_Password;
  //  echo ("coll/");
    $document = $dataObject->Data;
  //  echo ("document/");
    $id = '$id';
    $coll->update(array("_id"=> new MongoId($document->ID_Mails)), array('$set' => array("State"  => "SEND")));
  //  echo ("update/");
    $dbCompany = $Conn->selectDB($dataObject->Data->DB);
   // echo ("dbCompany/");
    $collCompany = $dbCompany->Store_User_Access;
  //  echo ("collCompany/");
    $collCompany->update(array("_id"=> new MongoId($document->ID)), array('$set' => array("Password"  => $document->Password)));
    //echo ("$collCompany->update/");
  //  echo json_encode($dataObject->Data);    
    echo json_encode(array("Message"=>"Insertado"));
}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>