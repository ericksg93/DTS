<?php 
try{ //Header access header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$Json_String = file_get_contents('php://input');
$Json_Object = json_decode($Json_String);

require 'ConnectionMongo.php';

$coll = $db->Store_Jobs_Send;

for($i = 0;$i < count($Json_Object);$i++){
        
    $doc = $Json_Object[$i];
    $doc->Control->Creation_Date = date_timestamp_get(date_create())*1000;
    $doc->Control->Created_User = "Rest_Service";
    $doc->Manager = "Cualquiera";
    $doc->Collection_Info->Collection_Name = "Store_Jobs";
    $doc->Collection_Info->Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
    $doc->Visit_Point_Abort = " var incident = {};
    eflowDTS_lib.GetServerTime().getTime();
    incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = [] ;incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
    $doc->Visit_Point_Confirm = " var incident = {};
    eflowDTS_lib.GetServerTime().getTime();
    incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = [];incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";
    $doc->Estimated_Delivery_Time = 0;
    $doc->Transferring_State = "Pending_To_Mobile";
    $doc->Visit_Point_Incidents = [];
        if($doc->ID_Truck === "" || $doc->User === ""){ 
            $doc->Visit_State = "Unassigned";
        }else{ 
            $doc->Visit_State = "In_Process";
        } 
    for($x = 0;$x < count($doc->Jobs);$x++){
        $doc->Jobs[$x]->Quantity_Register = 0;
        $doc->Jobs[$x]->JobState = "Uninitiated";
        $doc->Jobs[$x]->JobValidator = "var arr = obj.JobActions;var suma = 0;for (var j = 0;j < arr.length;j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
        $doc->Jobs[$x]->JobActions = [];
    } $coll->insert($doc);
    }//echo $Json_String;
echo json_encode(array('Message'=> 'Insertados '.count($Json_Object). ' documentos.'));
}catch(Exception $e){ echo json_encode( array('Error' => $e->getMessage()));
} 
?>
