<?php
try{
$serverName = "server=192.168.24.251;"; 

$connectionInfo = array( "Database"=>"EFLOW_ACOSA", "UID"=>"usreprac", "PWD"=>"usreprac");
$conn = sqlsrv_connect($serverName,$connectionInfo);

if($conn){
     echo "Connection established.<br />";
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}

}catch(Exception $e) {
    echo 'Excepción capturada: ',  $e->getMessage(), "\n";
}
?>