<?php

try{ 


/*
ini_set("mongo.native_long", 0);
ini_set("mongo.long_as_object", 1);
*/
//ini_set('mongo.native_long', strlen(decbin(~0)) == 32 ? 0 : 1);

ini_set("mongo.long_as_object", 1);
 ini_set('display_errors', '1');

$uri = "mongodb: //35.184.61.164:27017"; //104.197.145.209:27017";

$options = array("connectTimeoutMS" => 30000);

    $Conn = new MongoClient($uri,$options);
    
    
 
}
catch(MongoConnectionException $e) {

    $MaxRetries = 5;
    for( $Counts = 1; $Counts <= $MaxRetries; $Counts ++ ) {
        try {
            
            ini_set("mongo.long_as_object", 1);

            $uri = "mongodb://35.184.61.164:27017"; //35.184.61.164:27017";
  
            $options = array("connectTimeoutMS" => 300000);
            
           $Conn = new MongoClient($uri,$options);
    		//  $db = $Connection->selectDB("eflowdtsDevelopment");
        } catch( Exception $e ) {
            continue;
        }
        return;
    }
 
  
die("No es posible conectarnos a la base de datos:".$e->getMessage());
  
}
  

 

?>

 