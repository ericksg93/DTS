<?php
  
require 'ConnectionMongo.php'; 
require 'Functions_DBs.php';

if(Exist_DB($Conn , $dataObject->DB) === 1){

$db = $Conn->selectDB($dataObject->DB);
  
$coll = $db-> Store_Binnacle_Changes;

$ArrayLength = count($dataObject->Data);
 
for($i = 0; $i < $ArrayLength; $i++) {

  $result = $coll->insert($dataObject->Data[$i]);

}
echo json_encode(array("Message"=>"Insertado"));

}else{
    echo json_encode(array("Result"=>"Database not found"));
}
?>


/*   
var JsonData = 	{
		'Method_Name': 'Insert_Binnacle',
			'Data': [{
					"Date": new Date().getTime(),
					"User" : eflowDTS.Session.UserName,
		    		"Company": eflowDTS.Session.Company,
					"Change":"",// agrega borra modifica 
					"Id_Change":
					}]
				};
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
					
};

*/