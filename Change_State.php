<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

$DB = $_GET['DB'];   

if(Exist_DB($Conn , $DB) === 1) {
 
$db = $Conn->selectDB($DB);
    
$coll = $db->Store_Jobs_Send;

$result = $coll->find();

foreach($result as $doc){
 
$coll->update(array("_id"=> new MongoId($doc["_id"])), array('$set' =>  array("Transferring_State" => "Pending_To_Mobile")));

}

echo "Estados Restaurados";

}else{
    echo json_encode(array("Result"=>"Database not found"));
}

?>

  