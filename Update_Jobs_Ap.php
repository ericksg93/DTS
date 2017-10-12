<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);

$coll = $db->Store_Jobs_Send;

$arrayResult = Array();

    foreach($dataObject->Data as $doc){ 
      $id = '$id';
      $coll->remove(array('_id' => new MongoId($doc->_id->$id)));
      $doc->_id = new MongoId($doc->_id->$id);
      $coll->insert($doc);	
      array_push($arrayResult, $doc->_id->$id);   
    }

	foreach($dataObject->Data_PDF as $doc){  
      $DTS_Info = $Conn->selectDB("DTS_Info");      
      $coll_Mails_PDF = $DTS_Info->Store_Mails_PDF;
      $coll_Mails_PDF->insert($doc);   
    }
    
    foreach($dataObject->Data_GUIDE as $doc){  
      $DTS_Info = $Conn->selectDB("DTS_Info");      
      $coll_Mails_GUIDE = $DTS_Info->Store_Mails_GUIDE;
      $coll_Mails_GUIDE->insert($doc);   
    }

echo json_encode(array("Data"=>$arrayResult,"Collection_Name"=>$dataObject->Collection_Name));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>