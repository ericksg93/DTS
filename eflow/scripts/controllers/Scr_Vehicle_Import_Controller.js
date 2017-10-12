DTS_APP.controller('Scr_Vehicle_Import_Controller',function($scope) {


$scope.currentPage = 0;
$scope.pageSize = 5; 
$scope.ArrayVehicles_Import = [];

$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayVehicles_Import.length/$scope.pageSize);
};


$scope.init = function(){try{
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
	//Get_Cookie("EflowCookie");
	//	eflowDTS = Get_Cookie("EflowCookie");
   $scope.Check = false;
   $scope.Show_Components.Main_Menu = true;
$scope.Show_Components.SubMenu_Maintenance = true;
$scope.Show_Components.Login = true;

  //  $scope.Dates = new Date();
$scope.ArrayVehicles_Import = [];
$scope.ArrayLicense =eflowDTS.Session.Company.Settings.License;
	$scope.Headers= 
[{"es":"PLACA","value":"ID_Truck"},{"es":"MARCA","value":"Brand"},
{"es":"AÑO","value":"Year"},{"es":"PESO","value":"Weight"},{"es":"VOLUMEN","value":"Cubics"}] ;
$scope.Cabecera =["Id_Vehicle","Brand","Model","Year","Fuel","Type_Vehicle","Cylinder_Capacity","ID_Truck","Weight","Cubics","Description","License"];

}catch (e) {
         
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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
		$scope.Assign_Vehicle_In_DB();
	}
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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
                Page: "Scr_Vehicle_Import_Controller",
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
                Page: "Scr_Vehicle_Import_Controller",
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

$scope.Assign_Vehicle_In_DB = function(){
	try{
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Vehicle_To_Assign = [];
	
	for (i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked == true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			json_obj.ID_Truck = json_obj.ID_Truck.replace(/\s/g, '').toUpperCase();
			json_obj.Control = {};
			json_obj.Control.Creation_Date = new Date().getTime();
			json_obj.Control.Created_User = eflowDTS.Session.Current_User.UserName;
			Array_Vehicle_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Vehicle',
            'Data': 
            Array_Vehicle_To_Assign,
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayVehicles_Import = [];
		
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicle_Import_Controller",
                Method: "Assign_Vehicle_In_DB",
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
                Page: "Scr_Vehicle_Import_Controller",
                Method: "Assign_Vehicle_In_DB",
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

$scope.Open_Modal_Add_Vehicle_Import = function(){
	try{
	$scope.Vehicle_Import_Add = {};
	$scope.Vehicle_Import_Add_Array_Task = [];
	$("#Modal_Add_Vehicle_Import").modal("show");	
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
                Method: "Open_Modal_Add_Vehicle_Import",
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
	}
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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
	var file = document.getElementById('Vehicle_File_Import').files[0];
	
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
                Page: "Scr_Vehicle_Import_Controller",
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
                Page: "Scr_Vehicle_Import_Controller",
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

$scope.Visualize_Vehicle_Import = function(Obj){
  try{
  		$scope.Vehicle_Import = Obj;
  		
        $scope.Array_Vehicle_Import_Task = Obj.Jobs;
	  //  $scope.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
        $("#Modal_Edit_Vehicle_Import").modal("show"); 
                

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
                Method: "Visualize_Vehicle_Import",
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
	 var arr = [];
	arr = JSON.parse(this.result);
	
	
	
	
	for(var i = 0; i < arr.length; i++){
        arr[i].Company = eflowDTS.Session.Company.Identifier;
		arr[i].ID_Truck = arr[i].ID_Truck.replace(/\s/g, '').toUpperCase();
		$scope.ArrayVehicles_Import.push(arr[i]);	
		
		$scope.$apply($scope.ArrayVehicles_Import);
		
	}
	};
			
	oFReader.readAsText(file);
				
	/*//Asigno a una variable el nuevo Json
	//$scope.ArrayJobs_Import1 = Complete_Json(JSON.parse(this.result));
	insertarI($scope.ArrayVehicles_Import,Complete_Json(JSON.parse(this.result)));
	};
			
	oFReader.readAsText(file);
*/		

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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
  
};/*
function insertarI(ArrayVehicles_Import,ArrayVehicles_Import1){
	
	for(var i = 0; i < ArrayVehicles_Import1.length; i++){
		$scope.ArrayVehicles_Import.push(ArrayVehicles_Import1[i]);
		
	}
}*/

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
                Page: "Scr_Vehicle_Import_Controller",
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

function Complete_Json_CSV(arr){
 try{
 for (var i=0;i<arr.length;i++){
	  
  var VehicleExcel = arr[i];
   
  var ve = {};
  ve.Id_Vehicle = VehicleExcel.Id_Vehicle;
  ve.Brand = VehicleExcel.Brand;
  ve.Model = VehicleExcel.Model;
  ve.Year = VehicleExcel.Year;
  ve.Fuel = VehicleExcel.Fuel;
  ve.Type_Vehicle = VehicleExcel.Type_Vehicle;
  ve.Cylinder_Capacity = VehicleExcel.Cylinder_Capacity;
  ve.Transferring_State = VehicleExcel.Transferring_State;
  ve.ID_Truck = VehicleExcel.ID_Truck.replace(/\s/g, '').toUpperCase();
  ve.Weight = VehicleExcel.Weight;
  ve.Cubics = VehicleExcel.Cubics;
  ve.Description = VehicleExcel.Description;
  ve.Company = eflowDTS.Session.Company.Identifier;
  
  }
  
 // $scope.ArrayJobs_Import = ObtenerArray(obj);
  insertarI($scope.ArrayVehicles_Import,ObtenerArray(obj));
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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
 
 
function Import_CSV(file){
		try{
		oFReader = new FileReader();
			
	    oFReader.onloadend = function() {
	         
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){  
		//$scope.ArrayVehicles_Import = CSV_To_JSON(this.result);
		$scope.ArrayVehicles_Import.push(arr[i]);
		$scope.$apply($scope.ArrayVehicles_Import);
		
	    }
		//$scope.$apply($scope.ArrayVehicles_Import);
			
		};
			
	    oFReader.readAsText(file,'ISO-8859-1');
		
 
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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
                Page: "Scr_Vehicle_Import_Controller",
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
			for(var j = 0; j < $scope.Cabecera.length; j++){
		  		if((Headers.indexOf($scope.Cabecera[j]))!==-1){
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
	 		alert("Archivo invalido");
	 		return ArrayJson=0;
	 	}else{
	 		for(var i = 1; i < (Lines.length)-1; i++){
				var Obj = {};
				var CurrentLine = Lines[i].replace(/"/g,'').split(",");
			  	for(var j = 0; j < Headers.length; j++){
					if(Headers[j] === "License"){
						Obj[Headers[j]] = CurrentLine[j].split("|");
					}else{
						Obj[Headers[j]] = CurrentLine[j];
					}
				}
				Obj.Company = eflowDTS.Session.Company.Identifier;
				Obj.Year = parseInt(Obj.Year);
				Obj.Weight = parseInt(Obj.Weight);
				Obj.Cubics = parseInt(Obj.Cubics);
				ArrayJson.push(Obj);
			}
     		return ArrayJson; 
	 	}	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Import_Controller",
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