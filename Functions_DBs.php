<?php

try{
 
function Exist_DB($conn , $Name){
   
   $dbases = $conn->listDBs(); 
    $result = 0;
    foreach ($dbases['databases'] as $dbs) {
            if(strtoupper($dbs['name']) == strtoupper($Name)){
               $result = 1; 
               break;
            }         
     } 
     return $result; 
     
 };
 
 function getGUID(){
      
      mt_srand((double)microtime()*10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);
        $uuid = substr($charid, 0, 8).$hyphen
               .substr($charid, 8, 4).$hyphen
               .substr($charid,12, 4).$hyphen
               .substr($charid,16, 4).$hyphen
               .substr($charid,20,12);
        return $uuid; 
        
};
 
 
}catch(Exception $e) {
die("error:   ".$e->getMessage());
}

?>
