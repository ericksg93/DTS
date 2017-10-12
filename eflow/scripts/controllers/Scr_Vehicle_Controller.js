DTS_APP.controller('Scr_Vehicle_Controller',function($scope){


$scope.currentPage = 0;
$scope.pageSize = 15; 
$scope.ArrayVehicle = [];
$scope.Show_Components.Main_Menu = true;
$scope.Show_Components.SubMenu_Maintenance = true;
$scope.Show_Components.Login = true;


$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayVehicle.length/$scope.pageSize);
};


$scope.init = function() {try{
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
	//Get_Cookie("EflowCookie");
	//	eflowDTS = Get_Cookie("EflowCookie");
var Headers= [{"es":"PLACA","value":"ID_Truck"},{"es":"MARCA","value":"Brand"},{"es":"AÑO","value":"Year"},{"es":"PESO","value":"Weight"},{"es":"VOLUMEN","value":"Cubics"}] ;
$scope.ArrayType_Vehicle = eflowDTS.Session.Company.Settings.Vehicle;
$scope.ArrayLicense = eflowDTS.Session.Company.Settings.License;
$scope.ArrayFuel_Vehicle = eflowDTS.Session.Company.Settings.Fuel;
$scope.ArrayHeaders = Headers;
$scope.Select();
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
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
$scope.Checking_Checkboxes_Check = function(){try{
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
                Page: "Scr_Vehicle_Controller",
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
                Page: "Scr_Vehicle_Controller",
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

$scope.Action_Option= function(Option){try{
	if(Option === "Eliminar"){
		$scope.Delete_Vehicle_DB();
	}
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
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


$scope.Delete_Vehicle_DB = function() {
    try {
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
                "Company": eflowDTS.Session.Company.Identifier
            },
            'Fields': {
               'ID_Truck': true,
                '_id.$id': true
            },
            'DB': eflowDTS.Session.DB
        };
        var onSuccess = function(Response) {
            var onSuccess2 = function(result) {
                if (result === true) {
                    var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
                    var Array_Delete_Truck_ID = [];
                    for (var i = 0; i < CheckBoxes_Array.length; i++) {
                        if (CheckBoxes_Array[i].checked === true) {
                            var m = {
                                "id_check": CheckBoxes_Array[i].attributes.id_check.value,
                                "id_Truck_id": CheckBoxes_Array[i].attributes.id_Truck_id.value
                            };
                            Array_Delete_Truck_ID.push(m);
                        }
                    }
                    var Array_Delete_ID = [];
                    var Array_Not_Delete_ID = [];
                    var obj = {};
                    for (var j = 0; j < Response.length; j++) {
                        if (obj.hasOwnProperty(Response[j].ID_Truck)) {//Id_Vehicle
                            obj[Response[j].ID_Truck] += 1;//Id_Vehicle
                        } else {
                            obj[Response[j].ID_Truck] = 1;//Id_Vehicle
                        }
                    }
                    for (var k = 0; k < Array_Delete_Truck_ID.length; k++) {
                        if (obj.hasOwnProperty(Array_Delete_Truck_ID[k].id_check)) {
                            Array_Not_Delete_ID.push(Array_Delete_Truck_ID[k].id_check);
                        } else {
                            Array_Delete_ID.push(Array_Delete_Truck_ID[k].id_Truck_id);
                        }
                    }
                    if (Array_Delete_ID.length > 0) {
                        var JsonData1 = {
                            'Method_Name': 'Delete_Vehicle',
                            'Data': Array_Delete_ID,
                            'DB': eflowDTS.Session.DB
                        };
                        var onSuccess1 = function(onSuccess1) {
                            $scope.Select();
                        };
                        var onError1 = function(onError1) {
                            var erro = {
                                Generated: true,
                                Page: "Scr_Summary_Controller",
                                Method: "Delete_Truck_DB",
                                Description: "onError",
                                User: eflowDTS.Session.Current_User.UserName,
                                Company: eflowDTS.Session.Company.Identifier,
                                Date: new Date().getTime(),
                                Error: onError1
                            };
                            throw erro;
                            console.log(erro);
                        };
                        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData1, onSuccess1, onError1);
                    }
                    if (Array_Not_Delete_ID.length > 0) {
                        alert("Los siguientes vehiculos " + Array_Not_Delete_ID + " no se pueden eliminar por tener Puntos de visita asignados ");
                    }
                }
            };
            bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?", onSuccess2);
        };
        var onError = function(e) {
            var erro = {
                Generated: true,
                Page: "Scr_User_Controller",
                Method: "Verifica_Trabajos1",
                Description: "onError",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            throw erro;
        };
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);

        /*
	if(confirm("¿Realmente desea borrar los elementos seleccionados?") == true){
		
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
	for (i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked == true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Delete_ID.push(CheckBoxes_Array[i].attributes.id_check.value);
			//Array_Remove($scope.ArrayJobs,Obj);
			}
	}
		
	
	
	var JsonData = {
            'Method_Name': 'Delete_Vehicle',
            'Data': Array_Delete_ID,
            'DB':eflowDTS.Session.DB
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		};
	
	var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicle_Controller",
                Method: "Delete_Vehicle_DB",
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
	 
	 
	 }*/
    } catch (e) {

        var err;

        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Delete_Vehicle_DB",
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

$scope.Save_Vehicle_Edit = function(Obj){try{
		var Json = Obj;
		Json.Control.Modification_date = new Date().getTime();
		Json.ID_Truck=Json.ID_Truck.replace(/\s/g, '').toUpperCase();
		Json.Control.Modify_User = eflowDTS.Session.UserName;
		delete Json['$$hashKey'];
		var JsonData = 
				{
					'Method_Name': 'Update_Vehicles',
					'Data': Json,
            'DB':eflowDTS.Session.DB
				};
		var onSuccess = function(JsonData){
			$scope.Select();
			};
				
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicle_Controller",
                Method: "Save_Vehicle_Edit",
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
								
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Save_Vehicle_Edit",
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
	

$scope.Verifica_Trabajos = function(Obj){
	 try {
        var JsonData = {
            'Method_Name': 'Select_Jobs',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"ID_Truck": Obj.ID_Truck
            },
            'Fields':{
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){		
		$scope.Tam_VisitPoint = Response.length;
		if(Response.length>0){
			$scope.checked=true;
			$scope.Show_Alerta=true;
		}else{
			$scope.checked=false;}
		
		};		
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_User_Controller",
                Method: "Verifica_Sector",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;					
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);        
    } catch (e) {
        alert(e);
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Verifica_Trabajos",
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
	

$scope.Visualize_Vehicle = function(Obj){
	   try{
	$scope.Verifica_Trabajos(Obj);
   $scope.Vehicle = Obj;
   
   $("#Modal_Edit_Vehicle").modal("show"); 
   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Visualize_Vehicle",
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
	
$scope.Open_Modal_Add_VisitPoint = function(){
	try{
	$scope.Vehicle = {};

	$("#Modal_Agregar_Vehicle").modal("show");	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Open_Modal_Add_VisitPoint",
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
$scope.Select = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Vehicle',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayVehicle = JsonData;
		$scope.$apply($scope.ArrayVehicle);

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicle_Controller",
                Method: "Select",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		
		console.log(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        onError(e);
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Select",
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
   
  
   

$scope.Delete = function(id){
	try {
    if (confirm("¿Est"+'\u00e1'+" seguro que desea borrar el Vehiculo del sistema?") == true) {
       
      var JsonData = {
            'Method_Name': 'Delete_Vehicle',
            'Data':  id.$id,
            'DB':eflowDTS.Session.DB
            
        };
		
		var onSuccess = function(JsonData){
		
		$scope.Select();
		
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicle_Controller",
                Method: "Delete",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
		
		console.log(JsonData);
		
		};
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e) {
        onError(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Delete",
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


$scope.Add_New_Vehicle = function(New_Vehicle){
try{
		var JsonData = 
				{
					'Method_Name': 'Insert_Vehicle',
					'Data':[ {
					 	"Control":{
					 	"Creation_Date": new Date().getTime(),
					 	"Created_User" : eflowDTS.Session.Current_User.UserName
					 	},
				        	"Company": eflowDTS.Session.Company.Identifier,
				            "Id_Vehicle": New_Vehicle.Id_Vehicle.replace(/\s/g, '').toUpperCase(),
				            "Type_Vehicle": New_Vehicle.Type_Vehicle,
				            "License": New_Vehicle.License,
						    "Brand": New_Vehicle.Brand,
						    "Model": New_Vehicle.Model,
						    "Year": New_Vehicle.Year,
						    "Fuel":New_Vehicle.Fuel,
						    "Cylinder_Capacity": New_Vehicle.Cylinder_Capacity,
						    "Transferring_State": "PEND",
						    "ID_Truck": New_Vehicle.ID_Truck,
						    "Weight":New_Vehicle.Weight,
						    "Cubics": New_Vehicle.Cubics,
						    "Description": New_Vehicle.Description
					    }],
            'DB':eflowDTS.Session.DB
				};
				var onSuccess = function(JsonData){
				$scope.Select();
				};
				var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Vehicle_Controller",
                Method: "Add_New_Vehicle",
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
					
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Add_New_Vehicle",
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
                Page: "Scr_Vehicle_Controller",
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




$scope.Export_File = function(Export_Type,Array_Vehicles){
	try{
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Vehicles);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Vehicles);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Vehicles);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Vehicles);
			
			break;
		}
	}
	
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Export_File",
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

function Delete_Attributes(arr){
	try{
	var Json_Array = arr;
	
	for(var i = 0; i < Json_Array.length; i++){
		
		var Obj = Json_Array[i];
		
		delete Obj._id;
		delete Obj.Company;
		delete Obj.$$hashKey;
		
	}	
	
	return Json_Array;
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Delete_Attributes",
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

function Download_File(contenidoEnBlob, nombreArchivo) {
   try{
   var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Download_File",
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
function Generate_XML(arr) {
	try{
	var datos = arr ; 
    var texto = [];
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
	texto.push('<Data>\n');
	for(var i = 0; i < datos.length; i++){
		texto.push('<Vehiculos>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		
		texto.push('\t<Id_Vehicle>' + datos[i].Id_Vehicle + '</Id_Vehicle>\n');
		texto.push('\t<Brand>' + datos[i].Brand + '</Brand>\n');
		texto.push('\t<Model>' + datos[i].Model + '</Model>\n');
		texto.push('\t<License>' + datos[i].License + '</License>\n');
		texto.push('\t<Year>' + datos[i].Year + '</Year>\n');
		texto.push('\t<Fuel>' + datos[i].Fuel + '</Fuel>\n');
		texto.push('\t<Cylinder_Capacity>' + datos[i].Cylinder_Capacity + '</Cylinder_Capacity>\n');
		texto.push('\t<ID_Truck>' + datos[i].ID_Truck + '</ID_Truck>\n');
		texto.push('\t<Weight>' + datos[i].Weight + '</Weight>\n');
		texto.push('\t<Cubics>' + datos[i].Cubics + '</Cubics>\n');
		texto.push('\t<Description>' + datos[i].Description + '</Description>\n');
		
		texto.push('</Vehiculos>\n');
	}
	texto.push('</Data>\n');
    
    return new Blob(texto, {
        type: 'application/xml'
    });
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Generate_XML",
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

function Export_JSON(arr){
	try{
	var text = [];
	
	text.push(JSON.stringify(Delete_Attributes(arr)));
    
    var file = new Blob(text, {
        type: 'application/json'
    });
	
	
    Download_File(file, 'Vehiculos.json');

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Export_JSON",
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

function Export_XML(arr){
	try{
	Download_File(Generate_XML(arr), 'Vehiculos.xml');
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Export_XML",
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


function Export_CSV(arr) {
	
    try{
    var arrData = arr;
    var CSV = '';    
    
        var row = "";
		
      // row += '"Company",';
	   row += '"Id_Vehicle",';
	   row += '"Brand",';
	   row += '"Model",';
	   row += '"Year",';
	   row += '"Fuel",';
	   row += '"Cylinder_Capacity",';
	   row += '"ID_Truck",';
	   row += '"Weight",';
	   row += '"Cubics",';
	   row += '"Description",';
	   row += '"Type_Vehicle",';
	   row += '"License",';
	   
	   row += '"",';
	   
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].Id_Vehicle + '",';
		row += '"' + arrData[i].Brand + '",';
		row += '"' + arrData[i].Model + '",';
		row += '"' + arrData[i].Year + '",';
		row += '"' + arrData[i].Fuel + '",';
		row += '"' + arrData[i].Cylinder_Capacity + '",';
		row += '"' + arrData[i].ID_Truck+ '",';
		row += '"' + arrData[i].Weight + '",';
		row += '"' + arrData[i].Cubics + '",';
		row += '"' + arrData[i].Description + '",';
		row += '"' + arrData[i].Type_Vehicle + '",';
		var License="";
		for(var K = 0; K < arrData[i].License.length; K++){
			License=arrData[i].License[K]+"|"+License;
		}
	    row += '"' + License+'",';	
		
		row += '"",';
		//row += '"' + arrData[i].License+ '",';
		row.slice(0, row.length - 1);
       
        CSV += row + '\r\n';
    } 
    
    if (CSV === '') {        
        alert("Invalid data");
        return;
    }  

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = "Vehiculos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Export_CSV",
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

function Export_PDF (Arr){
	try{
		
	
	var onSucces_Img1 = function(img1){

var logo = img1;

var onSucces_Img2 = function(img2){

var ima = img2;

var Compania = eflowDTS.Session.Company;
var columns = [
   		//{title:"Compañia",dataKey:"Company"},
		{title:"Identificador",dataKey:"Id_Vehicle"},
		{title:"Marca",dataKey:"Brand"},
		{title:"Modelo",dataKey:"Model"},
		{title:"Año",dataKey:"Year"},
		{title:"Licencia",dataKey:"License"},
		{title:"Combustible",dataKey:"Fuel"},
		{title:"Cilindraje",dataKey:"Cylinder_Capacity"},
		{title:"Placa",dataKey:"ID_Truck"},
		{title:"Peso",dataKey:"Weight"},
		{title:"Volumen",dataKey:"Cubics"},
		{title:"Descripción",dataKey:"Description"}];
var rows = [];
for(var i = 0; i < Arr.length; i++){
	   rows.push(Arr[i]);
}	

var doc = new jsPDF('l', 'pt');
   var header = function (data) {
       doc.setFontSize(18);	
  doc.text(420, 160, 'Vehiculos');

  doc.setFontSize(13);
doc.setFontType("normal");

doc.text(420, 50, 'Fecha: '+new Date($scope.Watch).format('dd/mm/yyyy'));

  doc.setFontSize(10);

doc.setTextColor(100);
doc.setFontType("bold");

doc.addImage(ima, 'JPEG', 20, 20, 150, 90);
    
if(eflowDTS.Session.Company.Logo){
	
doc.addImage(eflowDTS.Session.Company.Logo, 'JPEG', 180,20, 150, 90);

}
 
  
doc.text(420, 70, 'Nombre de la Compañia: '+ Compania.Name);
    
doc.text(420, 80, 'Teléfono: '+ Compania.Phone);
    
doc.text(420, 90, 'Fax: '+ Compania.Fax);
      
doc.text(420, 100, 'Correo Electrónico: '+ Compania.Mail);
    
doc.text(420, 110, 'País: '+ Compania.Country);
      
doc.text(420, 120, 'Ubicación: '+ Compania.Address);

doc.setLineWidth(1);
doc.line(20, 130, 800, 130); 
    };   
    var footer = function (data) {
        var str = "Pag " + data.pageCount;
				doc.addImage(logo, 'JPEG', 420, 550, 90, 30);
        // Total page number plugin only available in jspdf v1.0+
       
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
    };

    var options = {
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 80}
    };
  

    doc.autoTable(columns, rows, {startY: 170,
	margin: {horizontal: 10},
        styles: {overflow: 'linebreak'},
        bodyStyles: {valign: 'top'},
        columnStyles: {email: {columnWidth: 'wrap'}},
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 180}
    });

        


doc.save('Vehiculos.pdf');
 

};
Image_To_Base64("images/ima.png",onSucces_Img2);

};
Image_To_Base64("images/logo.png",onSucces_Img1);

	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicle_Controller",
                Method: "Export_PDF",
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




