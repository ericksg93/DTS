<?php     

require 'ConnectionMongo.php'; 

$coll = $db->Store_Error;
 
$ArrayLength = count($dataObject->Data);

if($ArrayLength > 0){
  
      for($i = 0; $i < $ArrayLength; $i++) {

         $id = '$id';

         $document = $dataObject->Data[$i];

         if(gettype($document->_id) == "object"){
         
           $document->_id = new MongoId($document->_id->$id);

         }
        
         $coll->insert($document);

      }
  
  echo json_encode($dataObject->Data);
  
}

?>




