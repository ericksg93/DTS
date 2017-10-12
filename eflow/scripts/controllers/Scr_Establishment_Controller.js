
var map; 
DTS_APP.controller('Scr_Establishment_Controller',function($scope) {
 
  
$scope.currentPage = 0;
$scope.pageSize = 15; 
$scope.ArrayVisitPoint = [];
$scope.Show_Components.Main_Menu = true;
$scope.Show_Components.SubMenu_Maintenance = true;
$scope.Show_Components.Login = true;

$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayVisitPoint.length/$scope.pageSize);
};


$scope.init = function(){
try{
       	Set_Current_Page();
       	$scope.Route ={};
		$scope.flag = true;
		//$scope.Polygon = {}; 
		$('#Charging').modal('show');
		$scope.Show_Components.VisitPoint_Form = true;
		$scope.Show_Components.VisitPoint_General_View = true;
		//To_Reload_Eflow_Config();
		//Get_Cookie("EflowCookie");
	//eflowDTS = Get_Cookie("EflowCookie");		
		Load_Map_Init();
		$scope.ArrayRoute = [];
		var Headers= [{"es":"NOMBRE","value":"Name"},{"es":"CEDULA JURIDICA","value":"Legal_Cedula"},
		{"es":"SECTOR","value":"Route"},{"es":"DIRECCION","value":"Address"},
		{"es":"ENCARGADO","value":"Manager"},{"es":"CORREO","value":"Mail"}] ;
		$scope.ArrayHeaders = Headers;		
		$scope.Select();				
		$scope.Show_Components.VisitPoint_Table = false;
		$scope.Show_Components.VisitPoint_Add = true;
		$scope.Show_Components.VisitPoint_Add1 = false;
		$scope.Show_Components.Export = true;
		Select_Routes();
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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
	
function Load_Map_VisitPoint(){try{
		var div = document.getElementById('Map_VisitPoint');
		if(div){
		map1 = new GMaps({
			div:div,
			lat:eflowDTS.Session.Company.Location.Latitud,
			lng:eflowDTS.Session.Company.Location.Longitud,
			zoom :8,
			tilesloaded: function(e){
			  $scope.Show_Components.VisitPoint_Form = false;
			  $scope.Show_Components.VisitPoint_See = false;
			  $scope.Show_Components.VisitPoint_Table = true;
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
                Page: "Scr_VisitPoint_Controller",
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

$scope.Resize = function(){
try{
		if(typeof map === "object"){
			map.refresh();
		}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
                Method: "Resize",
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
	
	function Load_Map_Init(){try{
		var div = document.getElementById('Map_Dashboard_VisitPoint');
		if(div){
		map = new GMaps({
			div:div,
			lat:eflowDTS.Session.Company.Location.Latitud,
			lng:eflowDTS.Session.Company.Location.Longitud,
			zoom :14, resize:true,
			click:function(e){
				bootbox.dialog({
					title:"¡Alerta!",
					message:"Estas coordenadas no pertenecen a la ruta especificada",
					buttons:{
						main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
					}
				});
			},
			tilesloaded: function(e){
			  $scope.Show_Components.VisitPoint_Form = false;
			  $scope.Show_Components.VisitPoint_See = false;
			  $scope.Show_Components.VisitPoint_Table = true;
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
                Page: "Scr_VisitPoint_Controller",
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

   $scope.Print_Zone = function(Obj){ try{  	
   		map.removePolygons();
		map.drawPolygon({
		   paths: Obj.Route_Path, // pre-defined polygon shape
		   strokeColor: '#BBD8E9',
		   strokeOpacity: 1,
		   strokeWeight: 3,
		   fillColor: '#BBD8E9',
		   fillOpacity: 0.4, 

		   click: function(e) {
              $scope.VisitPoint.Latitude = e.latLng.lat();
			  $scope.VisitPoint.Longitude = e.latLng.lng();
			  GMaps.geocode({'latLng': {lat: e.latLng.lat(), lng: e.latLng.lng()},'callback':function(results, status) {
    if (status === "OK") {
	$scope.VisitPoint.Country = results[results.length-1].formatted_address.split(',', 1)[0];
	$scope.VisitPoint.Province = results[results.length-2].formatted_address.split(',', 1)[0];
	$scope.VisitPoint.Canton = results[results.length-3].formatted_address.split(',', 1)[0];
	$scope.VisitPoint.District= results[results.length-4].formatted_address.split(',', 1)[0];
      }
  }});
  map.removeMarkers();
			  map.addMarker({
			  lat: e.latLng.lat(),
			  lng: e.latLng.lng()			 
              });
            }
		});
		if($scope.flag === true){
			map.setCenter(Obj.Route_Path[0][0],Obj.Route_Path[0][1]);
		}
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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

function Select_Routes(){
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
		var onSuccess = function(Response){		
		$scope.ArrayRoute = Response;		
		};		
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_Controller",
                Method: "Select_Routes",
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
                Method: "Select_Routes",
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

$scope.To_Order_By = function(Order_Type){try{
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
                Page: "Scr_VisitPoint_Controller",
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

$scope.Load_VisitPoint= function(){
	try{
	var Obj=$scope.ArrayVisitPoint;
  	$scope.ArrayPoint=[];
	map1.removePolygons();
	map1.removeMarkers();	
  for(var i=0; i<Obj.length;i++){
  	
  	 map1.addMarker({
	 lat: parseFloat(Obj[i].Latitude),
	 lng: parseFloat(Obj[i].Longitude)			 
   });
  	
  	}
  }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
                Method: "Load_VisitPoint",
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
    }};

$scope.Load_New_Visit_Point = function(){
try{
	$scope.VisitPoint = {};	
    $scope.Route = {};
	map.removePolygons();
	map.removeMarkers();	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
                Method: "Load_New_Visit_Point",
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

$scope.Save_Visit_Point = function(VP){
    try{
if(VP.Latitude === "" || typeof VP.Latitude === 'undefined' || VP.Longitude === "" || typeof VP.Longitude === 'undefined'){
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
		if(typeof VP._id === 'undefined'){
			VP.Route = {};
			VP.Control = {};
			VP.Control.Creation_Date = new Date().getTime();
			VP.Control.Created_User = eflowDTS.Session.UserName;
			VP.Route.Route_Name = $scope.Route.Route_Name;
			VP.Route.ID_Route = $scope.Route.ID_Route;
			VP.Company = eflowDTS.Session.Company.Identifier;
			var JsonData = {
				'Method_Name': 'Insert_Visit_Point',
				'Data': [VP],
            'DB':eflowDTS.Session.DB
			};//Insert
			var onSuccess = function(e){								
				$scope.Show_Components.VisitPoint_Form = false;
				$scope.Show_Components.VisitPoint_See = false;
				$scope.Show_Components.VisitPoint_Table = true;
				$scope.Show_Components.VisitPoint_Add = true;
				$scope.Show_Components.VisitPoint_General_View = true;
				$scope.Show_Components.Export = true;
				$scope.Select();
				bootbox.dialog({
   				title:"¡Alerta!",
   				message:"El establecimiento ha sido creado",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			    });
				};
		}else{
			VP.Route.Route_Name = $scope.Route.Route_Name;
			VP.Route.ID_Route = $scope.Route.ID_Route;
			VP.Control.Modification_date = new Date().getTime();
			VP.Control.Modify_User = eflowDTS.Session.UserName;
			delete VP.Pais;		
			delete VP.Provincia;		
			delete VP.Distrito;
			var JsonData = {
				'Method_Name': 'Update_Visit_Point',
				'Data': VP,
            'DB':eflowDTS.Session.DB
			};//Insert
			var onSuccess = function(e){								
				$scope.Show_Components.VisitPoint_Form = false;
				$scope.Show_Components.VisitPoint_See = false;
				$scope.Show_Components.VisitPoint_Table = true;
				$scope.Show_Components.VisitPoint_Add = true;
				$scope.Show_Components.Export = true;
				$scope.Select();
				bootbox.dialog({
   				title:"¡Alerta!",
   				message:"El establecimiento ha sido modificado",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			    });
				};//Update
		}
			var onError =function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_Controller",
                Method: "Save_Visit_Point",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;			
			};
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
		}	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
                Method: "Save_Visit_Point",
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
		var onSuccess = function(JsonData){
		
		$scope.Select();
		
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_Controller",
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
                Page: "Scr_VisitPoint_Controller",
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

$scope.Select = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Visit_Point',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        }; 
		
		var onSuccess = function(JsonData){
		
		$scope.ArrayVisitPoint = JsonData;
		$scope.$apply($scope.ArrayVisitPoint);

		};
		
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_Controller",
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
                Page: "Scr_VisitPoint_Controller",
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


$scope.Verifica_Trabajos = function(Obj){
	 try {
        var JsonData = {
            'Method_Name': 'Select_Jobs',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"ID_Location": Obj.ID_Location
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
                Page: "Scr_VisitPoint_Controller",
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
	
$scope.Visualize_Visit_Point = function(Obj){
	try{
	$scope.Verifica_Trabajos(Obj);
   $scope.flag =false;
   $scope.VisitPoint = Obj;   
   $scope.Show_Components.VisitPoint_Form = true;
   $scope.Show_Components.VisitPoint_See = false;
   $scope.Show_Components.VisitPoint_Table = false;
   $scope.Show_Components.VisitPoint_Add = false;
   $scope.Show_Components.VisitPoint_General_View = false;
   $scope.Show_Components.Export = false;
   map.removePolygons();
   map.removeMarkers();
  
  map.setCenter(Obj.Latitude, Obj.Longitude, function(){
  	 map.addMarker({
	 lat: parseFloat(Obj.Latitude),
	 lng: parseFloat(Obj.Longitude)			 
   });
  });
   
   Check_Route(Obj.Route); 
   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
                Method: "Visualize_Visit_Point",
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
 
 function Check_Route(Route){
 	try{
	 if($scope.ArrayRoute.length > 0){		
		for(var i = 0; i < $scope.ArrayRoute.length; i++){				
			if($scope.ArrayRoute[i].Route_Name === Route.Route_Name){										
					$scope.Route = $scope.ArrayRoute[i]; 
					$scope.Print_Zone($scope.ArrayRoute[i]);				
			}				
		}				 
	 }	 	 
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
                Method: "Check_Route",
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


$scope.Save_Visit_Point_Edit = function(Obj){try{
		var Json = Obj;
		delete Json['$$hashKey'];
		var JsonData = 
				{
					'Method_Name': 'Update_Visit_Point',
					'Data': [Json],
            'DB':eflowDTS.Session.DB
				};
		var onSuccess = function(JsonData){
			$scope.Select();
			};
				
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_Controller",
                Method: "Save_Visit_Point_Edit",
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
                Page: "Scr_VisitPoint_Controller",
                Method: "Save_Visit_Point_Edit",
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
	
   
$scope.Delete_Visit_Point_DB = function(){
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
            'Method_Name': 'Delete_Visit_Point',
            'Data': Array_Delete_ID,
            'DB':eflowDTS.Session.DB
        };
        
	var onSuccess = function(JsonData){
		$scope.Show_Actions = false;
		$scope.Select();
		};
	
	var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_Controller",
                Method: "Delete_Visit_Point_DB",
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
                Page: "Scr_VisitPoint_Controller",
                Method: "Delete_Visit_Point_DB",
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
                Page: "Scr_VisitPoint_Controller",
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
                Page: "Scr_VisitPoint_Controller",
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
		$scope.Delete_Visit_Point_DB();
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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



$scope.Export_File = function(Export_Type,Array_VisitPoints){
	try{
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_VisitPoints);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_VisitPoints);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_VisitPoints);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_VisitPoints);
			
			break;
		}
	} 
	 

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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
                Page: "Scr_VisitPoint_Controller",
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
                Page: "Scr_VisitPoint_Controller",
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
		texto.push('<Establecimientos>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		texto.push('\t<ID_Location>' + datos[i].ID_Location + '</ID_Location>\n');
		texto.push('\t<Manager>' + datos[i].Manager + '</Manager>\n');
		texto.push('\t<Name>' + datos[i].Name + '</Name>\n');
		texto.push('\t<Legal_Cedula>' + datos[i].Legal_Cedula + '</Legal_Cedula>\n');
		texto.push('\t<Address>' + datos[i].Address + '</Address>\n');
		texto.push('\t<Telephone_Number>' + datos[i].Telephone_Number + '</Telephone_Number>\n');
		texto.push('\t<Mail>' + datos[i].Mail + '</Mail>\n');
		texto.push('\t<Latitude>' + datos[i].Latitude + '</Latitude>\n');
		texto.push('\t<Longitude>' + datos[i].Longitude + '</Longitude>\n');
		texto.push('\t<ID_Route>' + datos[i].Route.ID_Route + '</ID_Route>\n');
		texto.push('\t<Route_Name>' + datos[i].Route.Route_Name + '</Route_Name>\n');
		
		texto.push('</Establecimientos>\n');
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
                Page: "Scr_VisitPoint_Controller",
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
	
	
    Download_File(file, 'Establecimientos.json');


}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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
	Download_File(Generate_XML(arr), 'Establecimientos.xml');

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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
	   row += '"ID_Route",';
	   row += '"Route_Name",';
	   row += '"ID_Location",';
	   row += '"Legal_Cedula",';
	   row += '"Address",';
	   row += '"Telephone_Number",';
	   row += '"Mail",';
	   row += '"Latitude",';
	   row += '"Longitude",';
	   row += '"Manager",';
	   row += '"Name",';
	   row += '"Country",';
	   row += '"Province",';
	   row += '"Canton",';
	   row += '"District",';
	   row += '"",';
        row = row.slice(0, -1);
          
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].Route.ID_Route + '",';
		row += '"' + arrData[i].Route.Route_Name + '",';
		row += '"' + arrData[i].ID_Location + '",';
		row += '"' + arrData[i].Legal_Cedula + '",';
		row += '"' + arrData[i].Address + '",';
		row += '"' + arrData[i].Telephone_Number + '",';
		row += '"' + arrData[i].Mail + '",';
		row += '"' + arrData[i].Latitude+ '",';
		row += '"' + arrData[i].Longitude + '",';
		row += '"' + arrData[i].Manager + '",';
		row += '"' + arrData[i].Name + '",';
		row += '"' + arrData[i].Country+ '",';
		row += '"' + arrData[i].Province + '",';
		row += '"' + arrData[i].Canton + '",';
		row += '"' + arrData[i].District + '",';
		row += '"'  + '",';
		row.slice(0, row.length - 1);
       
        CSV += row + '\r\n';
    } 
    
    if (CSV === '') {        
        //alert("Invalid data");
        $.notify({message: "Invalid data"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
        return;
    }  

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = "Establecimientos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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
		{title:"Identificador",dataKey:"ID_Location"},
		{title:"Encargado",dataKey:"Manager"},
		{title:"Nombre",dataKey:"Name"},
		{title:"Cedula Juridica",dataKey:"Legal_Cedula"},
		{title:"Dirección",dataKey:"Address"},
		{title:"Telefono",dataKey:"Telephone_Number"},
		{title:"Correo",dataKey:"Mail"},
		{title:"Latitud",dataKey:"Latitude"},
		{title:"Longitud",dataKey:"Longitude"},
		{title:"Identificador Ruta",dataKey:"ID_Route"},
		{title:"Nombre Ruta",dataKey:"Route_Name"}];
var rows = [];
for(var i = 0; i < Arr.length; i++){
	Arr[i].ID_Route=Arr[i].Route.ID_Route;
	Arr[i].Route_Name=Arr[i].Route.Route_Name;
	   rows.push(Arr[i]);
}	

var doc = new jsPDF('l', 'pt');
   var header = function (data) {
        doc.setFontSize(18);	
  doc.text(420, 160, 'Establecimientos');


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

        


doc.save('Establecimientos.pdf');

};
Image_To_Base64("images/ima.png",onSucces_Img2);

};
Image_To_Base64("images/logo.png",onSucces_Img1);

	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_Controller",
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