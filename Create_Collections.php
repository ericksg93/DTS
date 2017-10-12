<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';
 
$DB = $_GET['DB'];

if(Exist_DB($Conn , $DB) === 0) {
 
$db = $Conn->selectDB($DB);
    
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

echo json_encode(array("Result"=>"Registro completo"));

}else{
    echo json_encode(array("Result"=>"Database already exist"));
}

?>

  