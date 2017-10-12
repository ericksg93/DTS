
 <?php
/*
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
 
$coll_Company = $db->Store_Company;

$result_Insert_Company = $coll_Company->insert($dataObject->Company_Data);
    
$coll_User = $db->Store_User_Access;

$result_Insert_User = $coll_User->insert($dataObject->User_Data);
  
$coll_Subscription = $db->Store_Company_Subscription;

$result_Insert_Subscription = $coll_Subscription->insert($dataObject->Subscription_Company);


 echo json_encode(array("Message"=>"Datos Insertados"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}

*/


// new code


  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';
 

if(Exist_DB($Conn , $dataObject->DB_Name) === 0) {
 
$db = $Conn->selectDB($dataObject->DB_Name);

$DTS_Info = $Conn->selectDB("DTS_Info");
    
$db->createCollection("Store_Audit_User");
$db->createCollection("Store_Company");
$db->createCollection("Store_Company_Subscription");
$db->createCollection("Store_DB_Manager");
$db->createCollection("Store_DataSet");
$db->createCollection("Store_Error");
$db->createCollection("Store_Error_Back");
$db->createCollection("Store_Geolocation");
$db->createCollection("Store_Jobs_Send");
$db->createCollection("Store_Mail_Status");
$db->createCollection("Store_Notification");
$db->createCollection("Store_Routes");
$db->createCollection("Store_Subscription_Types");
$db->createCollection("Store_Summary_Item");
$db->createCollection("Store_Summary_Trip");
$db->createCollection("Store_Summary_Visit_Point");
$db->createCollection("Store_User_Access");
$db->createCollection("Store_User_Online");
$db->createCollection("Store_Vehicle");
$db->createCollection("Store_Visit_Point");
$db->createCollection("Store_Answers_Polls");

$coll_Company = $db->Store_Company;

$result_Insert_Company = $coll_Company->insert($dataObject->Company_Data);

$coll_Company_DTS_Info = $DTS_Info->Store_Company;

$result_Insert_Company = $coll_Company_DTS_Info->insert($dataObject->Company_Data);
    
$coll_User = $db->Store_User_Access;

$result_Insert_User = $coll_User->insert($dataObject->User_Data);
  
$coll_Subscription = $db->Store_Company_Subscription;

// $result_Insert_Subscription = $coll_Subscription->insert($dataObject->Subscription_Company);


echo json_encode(array("Result"=>"Registro completo","DB_Name"=>$dataObject->DB_Name));

}else{
    echo json_encode(array("Result"=>"Database already exist"));
}



  
?>