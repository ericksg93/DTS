<?php
  
/*


*/

require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';
 
 

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
    
    $coll = $db->Store_User_Access;
    
    $result = $coll->findOne($dataObject->Data);
    
    if($result != null){
      echo json_encode($result);
    }else{
      $js = array('Result'=>false);
      echo json_encode($js);  
    }

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>
 

  