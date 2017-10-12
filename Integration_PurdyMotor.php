<?php
try {
	header("Access-Control-Allow-Origin: * ");
	header("Access-Control-Allow-Credentials: true ");
	header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
	header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
	
	require 'ConnectionMongo.php';
	require 'Functions_DBs.php';
	
	$PM_Obj = json_decode(file_get_contents('php://input'));
		
	$db = $Conn->selectDB("GRUPOPURDYMOTOR");
	$coll = $db->Store_Jobs_Send;
	
	$doc->Control->Creation_Date = date_timestamp_get(date_create()) * 1000;
	$doc->Control->Created_User = "Rest_Service";
	
	$doc->ID_Location = $PM_Obj->cliente_id;
	$doc->Manager = "Cualquiera";
	$doc->Name = $PM_Obj->Cliente_Nombre;
	$doc->Address =  $PM_Obj->CLIENTE_DIRECCION;
	$doc->Telephone_Number = $PM_Obj->Cliente_Telefono;
	$doc->Mail = "";
	$doc->Company = "GRUPO PURDY MOTOR";
	$doc->Legal_Cedula = $PM_Obj->Cliente_Cedula;	
	$doc->Notes = array();
	$doc->Latitude = "";
	$doc->Longitude = "";	
	$doc->Country = "Costa Rica";
	$doc->District = $PM_Obj->desc_distrito;
	$doc->Province = $PM_Obj->Des_provincia;
	$doc->Canton = $PM_Obj->Des_canton;
		
	$doc->Order_Number = $PM_Obj->factura_numero_distribucion;
	$doc->Invoice = $PM_Obj->factura_numero_distribucion;
		
	$doc->Collection_Info->Collection_Name = "Store_Jobs";
	$doc->Collection_Info->Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";	
	$doc->Visit_Point_Incidents = array();	
	$doc->Visit_Point_Abort = " var incident = {};eflowDTS_lib.GetServerTime().getTime();incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = [] ;incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
	$doc->Visit_Point_Confirm = " var incident = {};eflowDTS_lib.GetServerTime().getTime();incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = [];incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";	
	$doc->Sequence = 1;
	$doc->Visit_State = "In_Process";
	$doc->Estimated_Delivery_Time = 15;
	$doc->Estimated_Date = date("Y-m-d"); 
	$doc->Transferring_State = "Pending_To_Mobile";
	$doc->Delivery_Period_Start = "05:00";
	$doc->Delivery_Period_End = "22:00";	
	
	
	
	$doc->Jobs = array();
	$doc->Jobs[0]->JobTypeEs = "Entrega";
	$doc->Jobs[0]->JobClass = "SS";
	$doc->Jobs[0]->JobID = (date_timestamp_get(date_create()) * 1000) + rand();
	$doc->Jobs[0]->JobType = "delivery";
	$doc->Jobs[0]->JobName = "Facturas";
	$doc->Jobs[0]->JobDescription = "Facturas ( ".$PM_Obj->Cliente_Nombre." )";
	$doc->Jobs[0]->JobInstructions = "Revisar la facturas";
	$doc->Jobs[0]->BarCode = $PM_Obj->factura_numero_distribucion;
	$doc->Jobs[0]->UOM = "Unidad";
	$doc->Jobs[0]->Quantity = 1;
	$doc->Jobs[0]->JobWeight = 1;
	$doc->Jobs[0]->JobCubics = 1;
	$doc->Jobs[0]->Quantity_Register = 0;
	$doc->Jobs[0]->Status_Created = "Admin";
	$doc->Jobs[0]->JobState = "Uninitiated";
	$doc->Jobs[0]->JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
	$doc->Jobs[0]->JobActions = array();
	
	
	
	switch($PM_Obj->Chofe_Asignado){
	    case '2':
	    {
	      $doc->User = "racema";
	      $doc->Route->Route_Name = "Zona1";
	      $doc->Route->ID_Route = "Zona1";  
	      $doc->ID_Truck = "DT04";
	      $PV = $coll->findOne(array("Name"=>$doc->Name,"Address"=>$doc->Address,"Estimated_Date"=>$doc->Estimated_Date,Transferring_State => "Pending_To_Mobile"));
	      if($PV === null){
	        $coll->insert($doc);  	          
	      }else{
	        $Query = array("_id"=> new MongoId($PV['_id']));
	        $DataUpdate = array('$inc' => array("Jobs.0.Quantity"=>1));
	        $coll->update($Query,$DataUpdate); 
	      }
	      break;
	    }
	    case '9':
	    {
	      $doc->User = "majiso";
	      $doc->Route->Route_Name = "Zona5";
	      $doc->Route->ID_Route = "Zona5";
	      $doc->ID_Truck = "DT07";	      
	      $PV = $coll->findOne(array("Name"=>$doc->Name,"Address"=>$doc->Address,"Estimated_Date"=>$doc->Estimated_Date,Transferring_State => "Pending_To_Mobile"));
	      if($PV === null){
	        $coll->insert($doc);  	          
	      }else{
	        $Query = array("_id"=> new MongoId($PV['_id']));
	        $DataUpdate = array('$inc' => array("Jobs.0.Quantity"=>1));
	        $coll->update($Query,$DataUpdate); 
	      }
	      break;
	    }
	    case '104':
	    {
	      $doc->User = "alhuas";
	      $doc->Route->Route_Name = "Zona8";
	      $doc->Route->ID_Route = "Zona8";
	      $doc->ID_Truck = "DT03";
	      $PV = $coll->findOne(array("Name"=>$doc->Name,"Address"=>$doc->Address,"Estimated_Date"=>$doc->Estimated_Date,Transferring_State => "Pending_To_Mobile"));
	      if($PV === null){
	        $coll->insert($doc);  	          
	      }else{
	        $Query = array("_id"=> new MongoId($PV['_id']));
	        $DataUpdate = array('$inc' => array("Jobs.0.Quantity"=>1));
	        $coll->update($Query,$DataUpdate); 
	      }
	      break;   
	   }
	    default:
	    {
	        break;
	    }
	}
	
	
	
	
}catch(Exception $e) {
	echo json_encode(array('Error' => $e->getMessage()));
}

?>
