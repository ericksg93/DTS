DTS_APP.controller('Scr_Job_Import_Controller',function($scope) {


$scope.currentPage = 0;
$scope.pageSize = 5; 
$scope.ArrayJobs_Import = [];

$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayJobs_Import.length/$scope.pageSize);
};

$scope.init = function(){
try{
		
    Set_Current_Page();
    $scope.Show_Components.Main_Menu = true;
    $scope.Show_Components.SubMenu_Maintenance = true;
    $scope.Show_Components.Login = true;

    $scope.Check = false;
    $scope.Dates = new Date();
	$scope.ArrayJobs_Import = [];
	$scope.Headers = [{"es":"GERENTE","value":"Manager"},{"es":"NOMBRE","value":"Name"},
		{"es":"DIRECCION","value":"Address"},{"es":"TELEFONO","value":"Telephone_Number"},
		{"es":"VEHICULO","value":"ID_Truck"},
		{"es":"USUARIO","value":"User"},{"es":"CORREO","value":"Mail"}];
	$scope.Cabecera =["ID_Location","Name","Canton","Province","District","Country","Legal_Cedula","Mail","Manager","Telephone_Number","Address","Latitude","Longitude","Route_Name","ID_Route","Sequence","User","ID_Truck","Estimated_Date","Estimated_Delivery_Time","Delivery_Period_Start","Delivery_Period_End","Order_Number","Invoice","JobClass","JobID","JobType","JobName","JobDescription","JobInstructions","UOM","JobWeight","JobCubics","JobInfo"];
$scope.Select_User();

$scope.Select_Vehicle();

		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "init",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};
	$scope.Change_Class=function(class_name,class_value){
		$scope["Align_class_"+class_value] = class_name;
	};
$scope.Action_Option= function(Option){
	try{
	if(Option === "Asignar"){
		$scope.Assign_VisitPoint_In_DB();
	}
	
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Action_Option",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Checking_Checkboxes_Check = function(){
	
	try{
	$scope.Show_Actions = false;
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked === true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Checking_Checkboxes_Check",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
};
 
$scope.Checking_Checkboxes_Check_Master = function(master){
	try{
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	for(var i = 0; i < CheckBoxes_Array.length; i++){
		CheckBoxes_Array[i].checked = !master;
	}
	$scope.Checking_Checkboxes_Check();
	
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Checking_Checkboxes_Check_Master",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};


$scope.Info_Vehicle = function(Vehicle,ArrayVehicle){
	try{
	for ( var i = 0; i < ArrayVehicle.length ; i++ ){
      if(Vehicle === ArrayVehicle[i].ID_Truck){
		$scope.ObjVeh = {};
		$scope.ObjVeh.Description = ArrayVehicle[i].Description;
		$scope.ObjVeh.Weight = ArrayVehicle[i].Weight;
		$scope.ObjVeh.Cubics = ArrayVehicle[i].Cubics;
      }     
   } 
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Info_Vehicle",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Select_User = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_User',
            'Data': {
            	"Company":eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(JsonData){
		$scope.ArrayUser = JsonData;
		$scope.$apply($scope.ArrayUser);
		}
		var onError = function(JsonData){
			 var erro={
			Generated: true,
            Page: "Scr_Job_Import_Controller",
            Method: "Select_User",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;
			
			
		console.log(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        onError(e);
        
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Select_User",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Select_Vehicle = function(){
	try {
        var JsonData = {
            'Method_Name': 'Select_All_Vehicle',
            'Data': {
            	"Company":eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
        
		var onSuccess = function(JsonData){
		$scope.ArrayVehicle = JsonData;
		$scope.$apply($scope.ArrayVehicle);
		}
		var onError = function(JsonData){
					 var erro={
			Generated: true,
            Page: "Scr_Job_Import_Controller",
            Method: "Select_Vehicle",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;
	//	console.log(JsonData);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        onError(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Select_Vehicle",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Open_Modal_Change = function(){
	try{
	
	document.getElementById("Usuario").selectedIndex = "-1";
	document.getElementById("Vehicle").selectedIndex = "-1";
	$scope.Assign = {};
	$scope.Assign.Estimated_Date = new Date().format("yyyy-mm-dd");
	$("#Modal_Change").modal("show");	
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Open_Modal_Change",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Assign_VisitPoint_In_DB = function(){
	try{
	
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_VisitPoint_To_Assign = [];
	
	for (var i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked === true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			//json_obj.job[i].JobID = new Date().getTime();
			//var json_obj1={};
			//json_obj1.Estimated_Date = new Date(json_obj.Estimated_Date).getTime() + eflowDTS.Time.Difference;
			//json_obj.Estimated_Date = json_obj1.Estimated_Date;
			/*if(json_obj1.ID_Truck==null || json_obj1.ID_Truck==undefined||json_obj1.User==null || json_obj1.User==undefined)
			    {
				    json_obj1.Visit_State = "Unassigned";
				}
				else{
					json_obj1.Visit_State = "In_Process";
				}*/
			json_obj.Control = {};
			json_obj.Control.Creation_Date = new Date().getTime();
			json_obj.Control.Created_User = eflowDTS.Session.Current_User.UserName;
			Array_VisitPoint_To_Assign.push(json_obj);
			//Array_VisitPoint_To_Assign.push(JSON.parse(CheckBoxes_Array[i].value));
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Job',
            'Data': 
            Array_VisitPoint_To_Assign,
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayJobs_Import = [];
		
		};
		
		var onError = function(JsonData){
					 var erro={
			Generated: true,
            Page: "Scr_Job_Import_Controller",
            Method: "Assign_VisitPoint_In_DB",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;
		console.log(JsonData);
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}
};
 
 bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Assign_VisitPoint_In_DB",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Open_Modal_Add_VisitPoint_Import = function(){
	try{
		$scope.VisitPoint_Import_Add = {};
		$scope.VisitPoint_Import_Add_Array_Task = [];
		$("#Modal_Add_VisitPoint_Import").modal("show");	
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Open_Modal_Add_VisitPoint_Import",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.To_Order_By = function(Order_Type){
	
	try{
	if ($scope.OrderList === Order_Type) {
		
    var Reverse = Order_Type.charAt(0);
    if (Reverse === '-') {
        $scope.OrderList = Order_Type.substr(1);
    } else {
        $scope.OrderList = '-' + Order_Type;
    }
	} else {
	    $scope.OrderList = Order_Type;
	}}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "To_Order_By",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Import_Files = function(){
	try{
	
	var file = document.getElementById('VisitPoint_File_Import').files[0];
	
	if(file){
	
	var ext = file.name.split('.');
     ext = ext[ext.length -1].toLowerCase();
      
      switch(ext){
      
     case'json':{ 	
      	
      	Import_Json(file);
      	
      	break;
  	   }
  	 case'csv':{ 	
      	
      	Import_CSV(file);
      	
      	break;
  	   }
      }	
	}else{
		
		 bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Debe elegir un archivo.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
		
	}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Import_Files",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Checking_Checkboxes = function(){
	try{
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked = true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Checking_Checkboxes",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

$scope.Visualize_VisitPoint_Import = function(Obj){
	try{
  for(var i = 0; i < Obj.Jobs.length; i++){
			if(Obj.Jobs[i].JobType === "delivery"){
				Obj.Jobs[i].JobTypeEs = "Entrega";
			}else{
			  Obj.Jobs[i].JobTypeEs = "Recolección";
			}
		}
  		$scope.VisitPoint_Import = Obj;
        $scope.Array_VisitPoint_Import_Task = Obj.Jobs;
	    $scope.Estimated_Date = new Date(Obj.Estimated_Date.replace(/-/g,'\/')).format("yyyy-mm-dd");
        $("#Modal_Edit_VisitPoint_Import").modal("show"); 
         }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Visualize_VisitPoint_Import",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }        
};

function Import_Json(file){
	try{
		
	oFReader = new FileReader();
			
	oFReader.onloadend = function() {
	 			
	//Asigno a una variable el nuevo Json
	//$scope.ArrayJobs_Import1 = Complete_Json(JSON.parse(this.result));
	insertarI($scope.ArrayJobs_Import,Complete_Json(JSON.parse(this.result)));
	};
			
	oFReader.readAsText(file);
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Import_Json",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 	
};
function insertarI(ArrayJobs_Import,ArrayJobs_Import1){
	try{
	
	for(var i = 0; i < ArrayJobs_Import1.length; i++){
		$scope.ArrayJobs_Import.push(ArrayJobs_Import1[i]);
		
	}}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "insertarI",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
}
function Complete_Json(Json_Array){
	try{
	
	for(var i = 0; i < Json_Array.length; i++){
		
		var Json = Json_Array[i];
		
  
  //Json.Visit_State = "Incompleted";
  if(Json.ID_Truck==null || Json.ID_Truck==undefined ||Json.User==null || Json.User==undefined)
			    {
				    Json.Visit_State = "Unassigned";
				}
				else{
					Json.Visit_State = "In_Process";
				}
  Json.Transferring_State = "Pending_To_Mobile";
  Json.Collection_Info = {};
  Json.Company = eflowDTS.Session.Company.Identifier;
  Json.Collection_Info.Collection_Name = "Store_Jobs";
  Json.Collection_Info.Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
  Json.Visit_Point_Incidents = [];
  Json.Visit_Point_Incidents_Type = [
        {
            "text": "Problemas con la mercaderia.",
            "value": "Mercaderia"
        },
        {
            "text": "Problemas con la ubicación.",
            "value": "Ubicacion"
        },
        {
            "text": "Problemas con el vehículo.",
            "value": "Vehiculo"
        },
        {
            "text": "Problema con Encargado.",
            "value": "Encargado"
        },
        {
            "text": "Retraso.",
            "value": "Delay_Incidents"
        },
        {
            "text": "No Visita.",
            "value": "NoVisito"
        },
        {
            "text": "Otros.",
            "value": "Otros"
        }
    ];
  Json.Visit_Point_States = [{"name":"Pendiente"},{"name":"En Proceso"},{"name":"Finalizado"},{"name":"Abortado"}];
  Json.Visit_Point_Abort = " var incident = {}; eflowDTS_lib.GetServerTime(); incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
  Json.Visit_Point_Confirm = " var incident = {}; eflowDTS_lib.GetServerTime(); incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";
        		
		  for(var j = 0; j < Json.Jobs.length; j++){
		  
		  Json.Jobs[j].Quantity_Register = 0;
		  Json.Jobs[j].JobState = "Uninitiated";
		  Json.Jobs[j].JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
		  Json.Jobs[j].JobActions = [];
		  
		  }

  }
	
	return Json_Array;
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Complete_Json",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};


function Complete_Json_CSV(arr){
	try{
 
 var obj={}; 
  
  for (var i=0;i<arr.length;i++){
	  
  var puntoVisitaExcel = arr[i];
  
  if (! obj.hasOwnProperty(puntoVisitaExcel.ID_Location)){
	  
      obj[puntoVisitaExcel.ID_Location]={"Jobs":[]};
  }
  
  var pv = obj[puntoVisitaExcel.ID_Location];
  
  pv.ID_Location = puntoVisitaExcel.ID_Location;
  pv.Manager = puntoVisitaExcel.Manager;
  pv.Name = puntoVisitaExcel.Name;
  pv.Address = puntoVisitaExcel.Address;
  pv.Telephone_Number = parseInt(puntoVisitaExcel.Telephone_Number);
  pv.Mail = puntoVisitaExcel.Mail;
  pv.User = puntoVisitaExcel.User;
  pv.Notes= [];
  pv.Control={};
  pv.Control.Creation_Date=new Date().getTime();

  pv.Canton = puntoVisitaExcel.Canton;
  pv.Province = puntoVisitaExcel.Province;
  pv.District = puntoVisitaExcel.District;
  pv.Country = puntoVisitaExcel.Country;
  pv.Legal_Cedula = puntoVisitaExcel.Legal_Cedula;
  
  pv.ID_Truck = puntoVisitaExcel.ID_Truck;
  //pv.Visit_State = "Incompleted";
   if(pv.ID_Truck === "" || pv.ID_Truck === undefined || pv.User === "" || pv.User === undefined)
			    {
				    pv.Visit_State = "Unassigned";
				}else{
					pv.Visit_State = "In_Process";
				}
  pv.Latitude = parseFloat(puntoVisitaExcel.Latitude);
  pv.Longitude = parseFloat(puntoVisitaExcel.Longitude);
  pv.Route = {};
  pv.Route.Route_Name = puntoVisitaExcel.Route_Name;
  pv.Route.ID_Route = puntoVisitaExcel.ID_Route;
  pv.Sequence = parseInt(puntoVisitaExcel.Sequence);
  pv.Estimated_Date = puntoVisitaExcel.Estimated_Date;//new Date(puntoVisitaExcel.Estimated_Date).format('yyyy-dd-mm'); 
  pv.Estimated_Delivery_Time = parseInt(puntoVisitaExcel.Estimated_Delivery_Time);
  pv.Transferring_State = 'Pending_To_Mobile';
  pv.Delivery_Period_Start = puntoVisitaExcel.Delivery_Period_Start;
  pv.Delivery_Period_End =  puntoVisitaExcel.Delivery_Period_End;
  pv.Order_Number = puntoVisitaExcel.Order_Number;
  pv.Invoice = puntoVisitaExcel.Invoice;
  pv.Collection_Info = {};
  pv.Collection_Info.Collection_Name = "Store_Jobs";
  pv.Collection_Info.Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
  pv.Visit_Point_Incidents = [];
  pv.Visit_Point_Incidents_Type = [
        {
            "text": "Problemas con la mercaderia.",
            "value": "Mercaderia"
        },
        {
            "text": "Problemas con la ubicación.",
            "value": "Ubicacion"
        },
        {
            "text": "Problemas con el vehículo.",
            "value": "Vehiculo"
        },
        {
            "text": "Problema con Encargado.",
            "value": "Encargado"
        },
        {
            "text": "Retraso.",
            "value": "Delay_Incidents"
        },
        {
            "text": "No Visita.",
            "value": "NoVisito"
        },
        {
            "text": "Otros.",
            "value": "Otros"
        }
    ];
  pv.Visit_Point_States = [{"name":"Pendiente"},{"name":"En Proceso"},{"name":"Finalizado"},{"name":"Abortado"}];
  pv.Visit_Point_Abort = " var incident = {}; eflowDTS_lib.GetServerTime(); incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
  pv.Visit_Point_Confirm = " var incident = {}; eflowDTS_lib.GetServerTime(); incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";
  pv.Company = eflowDTS.Session.Company.Identifier;
  var job = {};
  
  						
  job.JobID = (new Date().getTime())+Math.floor((Math.random() * 100) + 1);//parseInt(puntoVisitaExcel.JobID);
  job.JobType = puntoVisitaExcel.JobType;
  if(job.JobType==="delivery"){
  job.JobTypeEs= "Entrega";
  }else{
  job.JobTypeEs= "Recoleccion";
  }
  
  job.Status_Created= "Admin";
  job.Quantity_Register= 0;
  job.JobName = puntoVisitaExcel.JobName;
  job.JobDescription = puntoVisitaExcel.JobDescription;
  job.UOM = puntoVisitaExcel.UOM;job.Quantity_Register = 0;
  job.JobWeight = parseInt(puntoVisitaExcel.JobWeight);
  job.JobCubics = parseInt(puntoVisitaExcel.JobCubics);
  job.JobState = "Uninitiated";
  job.JobInstructions = puntoVisitaExcel.JobInstructions;
  job.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
  job.JobActions = [];
  job.JobClass = puntoVisitaExcel.JobClass;
  switch(job.JobClass){
	case"SS":{
		job.Barcode = puntoVisitaExcel.JobInfo.split("|")[0];
		job.Quantity = parseInt(puntoVisitaExcel.JobInfo.split("|")[1]);
		break;
	}
	case"SU":{
		job.Quantity = parseInt(puntoVisitaExcel.JobInfo);	
		break;
	}
	case"SP":{
		var arr1 = puntoVisitaExcel.JobInfo.split("|");
		job.Serial_List = [];
		for(var j = 0; j < arr1.length; j++){
			var serie = {};
			serie.Serial = arr1[j];
			job.Serial_List.push(serie);
		}
		job.Quantity = arr1.length;
		break;
	}
	}
  
  pv.Jobs.push(job);
  
  
  }
  
  insertarI($scope.ArrayJobs_Import,ObtenerArray(obj));
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Complete_Json_CSV",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};
 
function ObtenerArray(obj){
	try{
	  
	  var array = [];
	  var keys = Object.keys(obj);

for (var i = 0; i < keys.length; i++) {
    array.push(obj[keys[i]]);
    
}
	  return array;
	  }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "ObtenerArray",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
  };
  
function Import_CSV(file){
	try{
		
		oFReader = new FileReader();
			
	    oFReader.onloadend = function() {
	        
		Complete_Json_CSV(CSV_To_JSON(this.result));
			
		};
			
	    oFReader.readAsText(file,'ISO-8859-1');
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Import_CSV",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
    };
		
			
$scope.Remove_In_Array = function(Obj,Array){
	try{
	
	Array_Remove(Array,Obj);
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "Remove_In_Array",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
};

function CSV_To_JSON(csv){
	try{
		
		var existe =false;
		  var Lines = csv.split("\n");
		  var ArrayJson = [];
		  var Headers = Lines[0].replace(/"/g,'').split(",");
		    if($scope.Cabecera.length===(Headers.length)-1){
			for(var k = 0; k < $scope.Cabecera.length; k++){
		  		if((Headers.indexOf($scope.Cabecera[k]))!==-1){
		  		 existe =false;
			  	}
			  	else{		  		
		 			existe=true;
					break;
			  	}
		  	}
	 	}else{
	 		existe=true;
	 	}
		if(existe===true){
	 		$.notify({message: "Archivo invalido"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	 		//alert("Archivo invalido");
	 		return ArrayJson=0;
	 	}else{
		  for(var i = 1; i < (Lines.length)-1; i++){
			  
			 var Obj = {};
			 var CurrentLine = Lines[i].replace(/"/g,'').split(",");
			 
				 for(var j = 0; j < Headers.length-1; j++){
					
					Obj[Headers[j]] = CurrentLine[j];
				
				 }
				 
				 ArrayJson.push(Obj);
		  }
		  
     return ArrayJson; 
     }
	 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Job_Import_Controller",
                Method: "CSV_To_JSON",
                Description: "Error no controlado",
               User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
	};
	

}); 