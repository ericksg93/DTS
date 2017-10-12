<?php

try{ 


/*
ini_set("mongo.native_long", 0);
ini_set("mongo.long_as_object", 1);
*/
//ini_set('mongo.native_long', strlen(decbin(~0)) == 32 ? 0 : 1);

ini_set("mongo.long_as_object", 1);

$uri = "mongodb://104.197.248.93:27017";
  
$options = array("connectTimeoutMS" => 30000);

//$conn = new MongoClient($uri,$options);
  
/*
$db = $conn->selectDB("eflowdtsProduction");
$db = $conn->selectDB("eflowdtsTesting");
$db = $conn->selectDB("eflowdtsDevelopment");
$db = $conn->selectDB("eflowdtsPresentation");
*/ 
  
    $Connection = new MongoClient($uri,$options);
    $db = $Connection->selectDB( "example" );
  
  
}
catch(MongoConnectionException $e) {

    $MaxRetries = 5;
    for( $Counts = 1; $Counts <= $MaxRetries; $Counts ++ ) {
        try {
           $Connection = new MongoClient($uri,$options);
    		  $db = $Connection->selectDB("eflowdtsDevelopment");
        } catch( Exception $e ) {
            continue;
        }
        return;
    }
 
  
die("No es posible conectarnos a la base de datos:".$e->getMessage());
  
}
  

 

?>

 