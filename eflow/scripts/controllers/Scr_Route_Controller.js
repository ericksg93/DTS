var map;
var Array_Route = [];
var Polygon;

DTS_APP.controller('Scr_Route_Controller',function($scope) {
	
	
$scope.currentPage = 0;
$scope.pageSize = 15; 
$scope.ArrayRoute = [];
$scope.Show_Components.Main_Menu = true;
$scope.Show_Components.SubMenu_Maintenance = true;
$scope.Show_Components.Login = true;

$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayRoute.length/$scope.pageSize);
};

$scope.init = function(){
	try{
    Set_Current_Page(); 
    $scope.checked=false;
			$scope.Show_Alerta=false;
	$scope.Show_Components.Route_Form = true;	
	$scope.Show_Components.Route_Table = false;
	Load_Map_Init();
	$scope.Show_Components.Route_Add = true;
	$scope.Show_Components.Export = true;
	$scope.Route = {};
	$scope.Check = false;
		//To_Reload_Eflow_Config();
		//Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");
    
    var Headers= [{"es":"NOMBRE","value":"Route_Name"},{"es":"IDENTIFICADOR","value":"ID_Route"},
	{"es":"DESCRIPCION","value":"Route_Description"}] ;
	$scope.ArrayHeaders = Headers;
	$scope.Array_Route = [];
	$scope.Select();
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
	function Load_Map_Init(){
		
	try{
		var div = document.getElementById('Map_Dashboard_Route');
		$('#Charging').modal('show');
		if(div){ 			
			map = new GMaps({
				div: div,
				lat:eflowDTS.Session.Company.Location.Latitud,
				lng:eflowDTS.Session.Company.Location.Longitud,
				zoom:12	,
				tilesloaded: function(e){					
					$scope.Show_Components.Route_Form = false;	
	                $scope.Show_Components.Route_Table = true;
	                GMaps.off('tilesloaded',map);
	                setTimeout(function(){
	                	$('#Charging').modal('hide');
	                	}, 3000);
	                
                }
			});	
		
		}
		
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Load_Map_Init",
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
                Page: "Scr_Route_Controller",
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
                Page: "Scr_Route_Controller",
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

$scope.Load = function(){
	
	try{
	$scope.checked=false; 
	$scope.Show_Alerta=false;
	$scope.Route = {};
	Load_Map();		
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Load",
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


   
$scope.Verifica_Sector = function(Obj){
	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Visit_Point',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"Route":{
    			"ID_Route": Obj.ID_Route}
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
                Page: "Scr_Route_Controller",
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
                Page: "Scr_VisitPoint_Controller",
                Method: "Verifica_Sector",
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
	


$scope.Visualize_Route = function(Obj){
	
try{
	$scope.Verifica_Sector(Obj);
	$scope.Show_Components.Route_Form = true;
	$scope.Show_Components.Route_Table = false;
	$scope.Show_Components.Route_Add = false;
	$scope.Show_Components.Export = false;
	Load_Map();
	$scope.Route = Obj;
	$scope.Array_Route = Obj.Route_Path;	
	$scope.Print_Zone();	
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Visualize_Route",
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
            'Method_Name': 'Select_All_Route',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayRoute = JsonData;
		$scope.$apply($scope.ArrayRoute);

		};
		
		var onError = function(JsonData){
				
					 var erro={
			Generated: true,
            Page: "Scr_Route_Controller",
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
                Page: "Scr_Route_Controller",
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
   
     function Load_Map(){
   	
     
	try{
		map.removePolygons();
		map.removeMarkers();
		    		
		$scope.Array_Route = [];
		    
		map.setContextMenu({
				  control: 'map',
				  options: [{
				    title: 'Agregar Vértice',
				    name: 'Add_Vertex',
				    action: function(e) {				    	
				    var coor = [];				    
				    coor.push(e.latLng.lat());
				    coor.push(e.latLng.lng());					    
				    $scope.Array_Route.push(coor);				    
				      this.addMarker({
				        lat: e.latLng.lat(),
				        lng: e.latLng.lng(), draggable: true,
				        title: 'Vértice',
				        icon: 'images/Point_Blue.png'
				      });
				    }
				  }, {
				    title: 'Centrar aquí',
				    name: 'Center_here',
				    action: function(e) {
				      this.setCenter(e.latLng.lat(), e.latLng.lng());
				    }
				  }]
				});
		   			 	
   		
     	
   		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Load_Map",
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
   
   $scope.Action_Option= function(Option){
	try{
	if(Option === "Eliminar"){
		$scope.Delete_Route_DB();
	}
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
   
   $scope.Delete_Route_DB = function(){
	
	try{
		
	var onSuccess = function(result){
	
	if(result === true){
		
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
            'Method_Name': 'Delete_Route',
            'Data': Array_Delete_ID,
            'DB':eflowDTS.Session.DB
        };
        
	var onSuccess = function(JsonData){
		$scope.Select();
		$scope.Show_Actions = false;
		};
	
	var onError = function(JsonData){
				
					 var erro={
			Generated: true,
            Page: "Scr_Route_Controller",
            Method: "Delete_Route_DB",
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
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",onSuccess);
	 
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Delete_Route_DB",
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
	
		var onSuccess = function(result){
    
    if (result === true) {
       
      var JsonData = {
            'Method_Name': 'Delete_Visit_Point',
            'Data':  id.$id,
            'DB':eflowDTS.Session.DB
            
        };
		
		var onSuccess = function(response){
		
		$scope.Select();
		
		};
		
		var onError = function(error){
				
					 var erro={
			Generated: true,
            Page: "Scr_Route_Controller",
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
    };
    
    bootbox.confirm("¿Est"+'\u00e1'+" seguro que desea borrar el Punto de Visita del sistema?",onSuccess);
    
    
    } catch (e) {
            onError(e);	
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
	}	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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

   $scope.Print_Zone = function(){   	
   	
	try{
		
		map.removeMarkers();
		 
		 var path = $scope.Array_Route;
		 $scope.Route.Route_Path = path;
		 
	if(path.length > 0){		
         
  Polygon = map.drawPolygon({
   paths: path, // pre-defined polygon shape
   strokeColor: '#BBD8E9',
   strokeOpacity: 1,
   strokeWeight: 3,
   editable: true,
   draggable:true,
   fillColor: '#BBD8E9',
   fillOpacity: 0.6
   });
   
    map.setContextMenu({
        control: 'map',
        options: [ {
            title: 'Centrar Aquí',
            name: 'Center_here',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());
            }
        }]
    });
    
   if(path.length > 0){
   	map.setCenter(path[0][0],path[0][1]);
   }
   google.maps.event.addListener(Polygon.getPath(), "insert_at", Refresh_Path);
  
   google.maps.event.addListener(Polygon.getPath(), "set_at", Refresh_Path);
   
   } 
   
   		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Print_Zone",
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

function Refresh_Path(){
	try{
	$scope.Array_Route = [];
    var len = Polygon.getPath().getLength();
   
  for (var i = 0; i < len; i++) {
	var coords = [];
	coords.push(Polygon.getPath().getAt(i).lat());
    coords.push(Polygon.getPath().getAt(i).lng());
    $scope.Array_Route.push(coords);
  }
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Refresh_Path",
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
   
   $scope.Delete_Zone = function(){
   	
	try{
		
     $scope.Array_Route = [];	
     Load_Map();
   	 	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Delete_Zone",
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
   
   $scope.Save_Route = function(Route){
   	
	try{
   	if(Route.Name === "" || Route.ID === "" || Route.Description === "" || $scope.Array_Route.length === 0){
   		
   		bootbox.dialog({
   			title : "¡Alerta!",
   			message : "Debe ingresar todos los campos",
   			buttons :{
	   				main:{
	   					label:'¡OK!',
	   					className:'btn-primary'
	   					}
   			    }
   		  });
   		
   	}else{
   		
   if(typeof Route._id === 'undefined'){
   	
     	var Obj = {};
        Obj.Control = {};
	    Obj.Control.Creation_Date = new Date().getTime();
	    Obj.Control.Created_User = eflowDTS.Session.Current_User.UserName;
   		Obj.Route_Name = Route.Route_Name;
   		Obj.ID_Route = Route.ID_Route;
   		Obj.Route_Description = Route.Route_Description;
   		Obj.Company = eflowDTS.Session.Company.Identifier;
   		Obj.Route_Path = $scope.Array_Route;
   		
   		var JsonData = {
   			'Method_Name':'Insert_Route',
   			'Data':[Obj]		,
            'DB':eflowDTS.Session.DB	
   		};
   		
   		var OnError = function(JsonData){
				
					 var erro={
			Generated: true,
            Page: "Scr_Route_Controller",
            Method: "Save_Route",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;
		};
   		
   		var OnSuccess = function(json){
   			
   			$scope.Route = {};
   			$scope.Array_Route = [];
   			$scope.Show_Components.Route_Form = false;
   			$scope.Select();
   			$scope.Show_Components.Route_Add = true;
   			$scope.Show_Components.Route_Table = true ;
   			bootbox.dialog({
   				title:"¡Alerta!",
   				message:"La ruta ha sido creada",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			});
   			
   		};
   		
   		}else{
   			
   		var Obj = Route;
   		Obj.Control.Modification_date =  new Date().getTime();
   		Obj.Control.Modify_User= eflowDTS.Session.Current_User.UserName;
		Obj.Route_Path = $scope.Array_Route;
   		
   		delete Obj['$$hashKey'];
   		
   		var JsonData = {
   			'Method_Name':'Update_Route',
   			'Data':Obj  ,
            'DB':eflowDTS.Session.DB 			
   		};
   		
   		var OnError = function(JsonData){
				
					 var erro={
			Generated: true,
            Page: "Scr_Route_Controller",
            Method: "Save_Route",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;
		
   		};
   		
   		var OnSuccess = function(json){
   			
   			$scope.Route = {};
   			$scope.Array_Route = [];
   			bootbox.dialog({
   				title:"¡Alerta!",
   				message:"La ruta ha sido modificada",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			});
   			
   			$scope.Show_Components.Route_Form = false;
   			$scope.Select();
   			$scope.Show_Components.Route_Table = true ;
   			$scope.Show_Components.Route_Add = true;
   			
   		};	
   			
   		}
   		
   		Send_JSON(eflowDTS.Configuration.URLs.eflow_Post,JsonData,OnSuccess,OnError);
   		
   		
   	}
   		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
                Method: "Save_Route",
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
   

$scope.Export_File = function(Export_Type,Array_Routes){
	
	try{
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Routes);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Routes);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Routes);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Routes);
			
			break;
		}
	}
	
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
                Page: "Scr_Route_Controller",
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
                Page: "Scr_Route_Controller",
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
		texto.push('<Rutas>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		texto.push('\t<Route_Name>' + datos[i].Route_Name + '</Route_Name>\n');
		texto.push('\t<ID_Route>' + datos[i].ID_Route + '</ID_Route>\n');
		texto.push('\t<Route_Description>' + datos[i].Route_Description + '</Route_Description>\n');
		texto.push('\t<Route_Path>' + datos[i].Route_Path + '</Route_Path>\n');
		
		
		texto.push('</Rutas>\n');
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
                Page: "Scr_Route_Controller",
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
	
	
    Download_File(file, 'Rutas.json');

		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
	Download_File(Generate_XML(arr), 'Rutas.xml');
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
	   row += '"Route_Path",';
	   row += '"Route_Name",';
	   row += '"ID_Route",';
	   row += '"Route_Description",';
	   row += '"",';
	  
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		
	 	var Route_Path="";
		for(var K = 0; K < arrData[i].Route_Path.length; K++){			
			for(var m = 0; m < arrData[i].Route_Path[K].length; m++){
			if(Route_Path===""){
				Route_Path=arrData[i].Route_Path[K][0]+"|"+ arrData[i].Route_Path[K][1];
			}else{
			Route_Path=Route_Path+"|"+arrData[i].Route_Path[K][0]+"|"+ arrData[i].Route_Path[K][1];
			}
		}
			
		}
	    row += '"' + Route_Path+'",';		 
			   
		row += '"' + arrData[i].Route_Name + '",';
		row += '"' + arrData[i].ID_Route + '",';
		row += '"' + arrData[i].Route_Description + '",';
		row += '"'  + '",';
		//row += '"' + arrData[i].Route_Path+ '",';
		row.slice(0, row.length - 1);
	//	|
       
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
    link.download = "Rutas.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
		{title:"Nombre de la Ruta",dataKey:"Route_Name"},
		{title:"Identificador de la ruta",dataKey:"ID_Route"},
		{title:"Descripción de la ruta",dataKey:"Route_Description"},
		{title:"Coordenadas de la ruta",dataKey:"Route_Path"}];
var rows = [];
for(var i = 0; i < Arr.length; i++){
	   rows.push(Arr[i]);
}	

var doc = new jsPDF('l', 'pt');
   var header = function (data) {
        doc.setFontSize(18);	
  doc.text(420, 160, 'Rutas');

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

        


doc.save('Rutas.pdf');

};
Image_To_Base64("images/ima.png",onSucces_Img2);

};
Image_To_Base64("images/logo.png",onSucces_Img1);

	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Route_Controller",
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
		
		