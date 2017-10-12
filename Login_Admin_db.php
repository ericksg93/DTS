<?php
 
require 'ConnectionMYSQL.php'; 
//require 'Functions_DBs.php';

//Json to Array      
$json = file_get_contents('php://input');
 

$dataObject = json_decode($json);
 
//build the query
$query= "SELECT * FROM Store_User_Access WHERE Company = '" . $dataObject->DB . "'" . " AND UserName = '" .  $dataObject->Data->Mail . "'" . " AND Password = '" .  $dataObject->Data->Password . "'"  ;



//execute the query
$data = $pdo->query($query);
//convert result resource to array
$result = $data->fetchAll(PDO::FETCH_ASSOC);

//view the entire array (for testing)
//print_r( $result);

if ($result!= null){
    echo json_encode($result[0]);
}
else {
     $js = array('Result'=>false);
     echo json_encode($js); 
}

 
?>
 

  