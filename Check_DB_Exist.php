<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB_Name) === 1){
    echo json_encode(array("Result"=>"Database already exist"));
}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
