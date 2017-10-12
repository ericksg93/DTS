<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll_User = $db->Store_User_Access;
$coll_Audit = $db->Store_Audit_User;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {
  
$coll_User->remove(array('_id' => new MongoId($dataObject->Data[$i])));
$coll_Audit->update(array('Mongo_User_ID'=>$dataObject->Data[$i]),array('$set'=>array('Audit_State'=>$dataObject->User_Audit->Audit_State,'Delete_By'=>$dataObject->User_Audit->Delete_By,'Deleted_On'=>$dataObject->User_Audit->Deleted_On)));
  
}

/*Audit_State
 * var JsonData = {
            'Method_Name': 'Delete_User',
            'Data': Array_Delete_ID,
            'User_Audit':{
            	"Deleted_On": new Date().getTime(),
            	"Delete_By": eflowDTS.Session.Current_User.UserName
            }
        };
 * 
 * 

$coll_Audit = $db->Store_Audit_User;
 
$document = $dataObject->DataAudit;

$id = '$id';

$coll_Audit->remove(array('User_ID' => new MongoId($document->Identification)));

 $document->_id = new MongoId($document->_id->$id);

 $coll_Audit->insert($document);

echo json_encode($dataObject->DataAudit);
  
*/


echo json_encode(array("Message"=>"Eliminado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
