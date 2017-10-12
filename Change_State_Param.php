<?php
  try{
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

$DB = $_GET['DB'];   
$QUERY = $_GET['QUERY']; 
  
if(Exist_DB($Conn , $DB) === 1) {
 
$db = $Conn->selectDB($DB);
    
$coll = $db->Store_Jobs_Send;

$result = $coll->find(json_decode($QUERY));

foreach($result as $doc){
 
$coll->update(array("_id"=> new MongoId($doc["_id"])), array('$set' =>  array("Transferring_State" => "Pending_To_Mobile")));

}

echo "Estado Restaurados";

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
}catch(Exception $e){
  echo json_encode( array('Error' => $e->getMessage()));
}

?>

  