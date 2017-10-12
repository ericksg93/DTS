<?php

use \MongoDB\BSON\ObjectId;

try{  
    
  
$uri = "mongodb://104.197.248.93:27017";
  
$options = array("connectTimeoutMS" => 30000);
  
  
 $manager = new \MongoDB\Driver\Manager($uri);  
  
  
  
 $db = new \MongoDB\Database($manager, "eflowdtsDevelopment",$options); 
  
  echo $db->getDatabaseName();
  
  
}
catch(MongoConnectionException $e) {
  
die("No es posible conectarnos a la base de datos:".$e->getMessage());
  
}

?>
