DTS_APP.controller('Scr_Route_Import_Controller',function($scope) {
 
 $scope.currentPage = 0;
$scope.pageSize = 5; 
$scope.ArrayRoutes_Import = [];

$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayRoutes_Import.length/$scope.pageSize);
};

$scope.init = function(){
	try{
       	Set_Current_Page();
		//To_Reload_Eflow_Config();
	//Get_Cookie("EflowCookie");
	$scope.Show_Components.Main_Menu = true;
$scope.Show_Components.SubMenu_Maintenance = true;
$scope.Show_Components.Login = true;

	//	eflowDTS = Get_Cookie("EflowCookie");
   $scope.Check = false;
  //  $scope.Dates = new Date();
$scope.ArrayRoutes_Import = [];
	$scope.Headers= [{"es":"NOMBRE","value":"Route_Name"},{"es":"IDENTIFICADOR","value":"ID_Route"},
	{"es":"DESCRIPCION","value":"Route_Description"}] ;

	$scope.Cabecera =["Route_Name","ID_Route","Route_Description","Route_Path"];
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
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
		$scope.Assign_Route_In_DB();
	}
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
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
                Page: "Scr_Route_Import_Controller",
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
                Page: "Scr_Route_Import_Controller",
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

$scope.Assign_Route_In_DB = function(){
	try{
	
var onSuccess = function(result){
	
	if(result === true){
				
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Route_To_Assign = [];
	
	for (var i=0; i < CheckBoxes_Array.length ; i++){
		if (CheckBoxes_Array[i].checked === true){
			var json_obj = JSON.parse(CheckBoxes_Array[i].value);
			json_obj.Control = {};
			json_obj.Control.Creation_Date = new Date().getTime();
			json_obj.Control.Created_User = eflowDTS.Session.Current_User.UserName;
			Array_Route_To_Assign.push(json_obj);
			}
	}
	
	 var JsonData = {
            'Method_Name': 'Insert_Route',
            'Data': 
            Array_Route_To_Assign,
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(JsonData){
		
		$scope.ArrayRoutes_Import = [];
		
		};
		
		var onError = function(JsonData){
				
					 var erro={
			Generated: true,
                Page: "Scr_Route_Import_Controller",
                Method: "Assign_Route_In_DB",
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
 
 $.notify({message: "Archivo invalido"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	 		//bootbox.confirm("¿Desea Asignar los elementos seleccionados?",onSuccess);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
                Method: "Assign_Route_In_DB",
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

$scope.Open_Modal_Add_Route_Import = function(){
	try{
	
	$scope.Route_Import_Add = {};
	$scope.Route_Import_Add_Array_Task = [];
	$("#Modal_Edit_Routes_Import").modal("show");	
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
                Method: "Open_Modal_Add_Route_Import",
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
                Page: "Scr_Route_Import_Controller",
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
	
	var file = document.getElementById('Route_File_Import').files[0];
	
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
                Page: "Scr_Route_Import_Controller",
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
                Page: "Scr_Route_Import_Controller",
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

$scope.Visualize_Route_Import = function(Obj){
	try{
  
  		$scope.Route_Import = Obj;
        $scope.Array_Route_Import_Task = Obj.Jobs;
	  //  $scope.Estimated_Date = new Date(Obj.Estimated_Date).format("yyyy-mm-dd");
        $("#Modal_Edit_Routes_Import").modal("show"); 
                
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
                Method: "Visualize_Route_Import",
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
		var arr = [];
	arr = JSON.parse(this.result);
	
	for(var i = 0; i < arr.length; i++){

		arr[i].Company = eflowDTS.Session.Company.Identifier;
		$scope.ArrayRoutes_Import.push(arr[i]);		
		$scope.$apply($scope.ArrayRoutes_Import);
		
	}
//	insertarI($scope.ArrayRoutes_Import,Complete_Json(JSON.parse(this.result)));
	};
			
	oFReader.readAsText(file);
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
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
function insertarI(ArrayRoutes_Import,ArrayRoutes_Import1){
	
	for(var i = 0; i < ArrayRoutes_Import1.length; i++){
		$scope.ArrayRoutes_Import.push(ArrayRoutes_Import1[i]);
		
	}
}*/
function Complete_Json(Json_Array){
	

	
		
};


function Complete_Json_CSV(arr){
	try{
 
 for (var i=0;i<arr.length;i++){
	  
  var RouteExcel = arr[i];
   
  var ro = {};
  ro.Route_Name = RouteExcel.Route_Name;
  ro.ID_Route = RouteExcel.ID_Route;
  ro.Route_Description = RouteExcel.Route_Description;
  ro.Route_Path = RouteExcel.Route_Path;
  ro.Company = eflowDTS.Session.Company.Identifier;
  
  }
  
 // $scope.ArrayJobs_Import = ObtenerArray(obj);
  insertarI($scope.ArrayRoutes_Import,ObtenerArray(obj));
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
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
                Page: "Scr_Route_Import_Controller",
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
	        
	/*	$scope.ArrayRoutes_Import = CSV_To_JSON(this.result);
		$scope.$apply($scope.ArrayRoutes_Import);*/
			        
		var arr =[];
		arr = CSV_To_JSON(this.result);
		
		for(var i = 0; i < arr.length; i++){

		$scope.ArrayRoutes_Import.push(arr[i]);
		$scope.$apply($scope.ArrayRoutes_Import);
		
		
		
		
	    }		
			
		};
			
	    oFReader.readAsText(file,'ISO-8859-1');
		
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Import_Controller",
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
                Page: "Scr_Route_Import_Controller",
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
	 		alert("Archivo invalido");
	 		return ArrayJson=0;
	 	}else{
		  for(var x = 1; x < (Lines.length)-1; x++){
			  
			 var Obj = {};
			 var CurrentLine = Lines[x].replace(/"/g,'').split(",");
			
			 Obj.Company = eflowDTS.Session.Company.Identifier;
			 
				 for(var j = 0; j < Headers.length; j++){
					/*
					 var String = Lines[i].split("|");
						var Arr = String.split("|");
						var Path = [];
						for(var i = 0; i < Arr.length; i = i+2){
						
						var Coor = [];
						Coor.push(parseFloat(Arr[i]));
						Coor.push(parseFloat(Arr[i+1]));
						Path.push(Coor);
						}
						console.log(Path);*/
					if (Headers[j] === "Route_Path"){
						 var Arr = CurrentLine[j].split("|");
						var Path = [];
						for(var i = 0; i < Arr.length; i = i+2){
						
						var Coor = [];
						Coor.push(parseFloat(Arr[i]));
						Coor.push(parseFloat(Arr[i+1]));
						Path.push(Coor);}
					Obj[Headers[j]] = Path;
						}else{
					Obj[Headers[j]] = CurrentLine[j];
					}
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
                Page: "Scr_Route_Import_Controller",
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