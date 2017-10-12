function comprueba(val,input){
	 
var arroba = /@/;

/*if(arroba.test(val)){
	input.value = val.replace(arroba,'');
	}*/
if(!arroba.test(val)){
return val;	
}

};

DTS_APP.controller('Scr_Company_Registration_Controller', function($scope) {
 	
    $scope.Type = "password"; 
    
	$scope.init = function(){
		
		try{  
       
	    //$scope.subscription = eflowDTS.Session.Ram.Subscription.Type_subscription;
	    
	    setTimeout(function () {
          $scope.$apply(function () {
              $scope.Class_Company_Name = "form-group";
              });
       }, 0);
       
	    $scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
		$scope.Show_Map = true;
		$scope.Class_Map = "fa fa-eye";
		$scope.Text_Map = "Mostar Mapa";
        $scope.Show_Company=true;
        $scope.Show_User=false;
        $scope.Show_Settings=false;
        $scope.Show_Settings_License= false;
        $scope.Show_Settings_User= false;
        $scope.Show_Settings_Fuel= false;
        $scope.Show_Settings_Vehicle= false;
        $scope.Show_Settings_Unity = false;
		$scope.Array_Unity = [];
		$scope.Array_Fuel = [];
		$scope.Array_User = [];
		$scope.Array_Vehicle = [];
		$scope.Array_License = [];
		$scope.Companys={};
		cargar_paises(); 
      //Set_Current_Page();
       	var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
		$scope.ArrayGenders = Gender;
	    Load_Map_Init();
	
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "init",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};
		
		$scope.Switch_Map_Data = function(Show_Map){
			try{
			if(Show_Map){
			$scope.Class_Map = "fa fa-eye-slash";
		    $scope.Text_Map = "Ocultar Mapa";
			}else{
			$scope.Class_Map = "fa fa-eye";
			$scope.Text_Map = "Mostar Mapa";
			}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Switch_Map_Data",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};
		
$scope.Upload_Image = function(){
		
		var file = document.getElementById('File_Image').files[0];
		$scope.Companys.Logo = file.name;		
		
		var onSuccess = function(base64){			
			$scope.Image = base64;
			$scope.Companys.LogoImage = base64;
			setInterval(function(){$scope.$apply();},0);			
		};
		
		Resize_Image(file,onSuccess);
		
	};	

  function cargar_paises(){
  	try{
  		
  	var Callback=function(response){
  		
  		$scope.Array_Country = JSON.parse(response);
  		
  	};
  	
  	Load_JSON("scripts/externals/Paises.json", Callback);
  	
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "cargar_paises",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};
  
  
	function Load_Map_Init(){
		
	try{
		var div = document.getElementById('Map_Dashboard_Company');
		
		eflowDTS.Session.Company={};
		
		$('#Charging').modal('show');
		if(div){ 			
			map = new GMaps({
				div: div,
				lat: 9.904668,
				lng: -83.906478,
				zoom: 1,
				tilesloaded: function(e){					
	                GMaps.off('tilesloaded',map);
	                setTimeout(function(){
	                	$('#Charging').modal('hide');
	                	$scope.Show_Map = false;
	                	}, 3000);
	                
                }
			});	
			
			
		map.removeMarkers();
		    		
		$scope.Array_Route = [];
		    
		map.setContextMenu({
				  control: 'map',
				  options: [{
				    title: 'Seleccionar Ubicación',
				    name: 'Add_Vertex',
				    action: function(e) {
				    	
			this.removeMarkers();
				    	
			  $scope.Companys.location_Latitud = e.latLng.lat();
			  $scope.Companys.location_Longitud = e.latLng.lng();
			  
				   var marker =   this.addMarker({
				        lat: e.latLng.lat(),
				        lng: e.latLng.lng(), 
				        draggable: true,
				        title: 'Vértice',
				        icon: 'images/Point_Blue.png'
				      });
				      
function refresh_Coords(e) {
   			  $scope.Companys.location_Latitud = e.latLng.lat();
			  $scope.Companys.location_Longitud = e.latLng.lng();
			}
	marker.addListener('drag', refresh_Coords);
    marker.addListener('dragend', refresh_Coords);
}
				  }, {
				    title: 'Centrar aquí',
				    name: 'Center_here',
				    action: function(e) {
				      this.setCenter(e.latLng.lat(), e.latLng.lng());
				    }
				  }]
				});
		
		}
		
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
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
		
	$scope.Password = function(x){
	try{
	    if(x === true){
          $scope.Type = "text";
        }else{
          $scope.Type = "password";
        }

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Password",
                Description: "Error no controlado",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};	

$scope.Validate_Company= function(Company){
try{
    if($scope.Companys.LogoImage===undefined) {
        $.notify({message: "Debe de cargar un logo para la compañia"},{type: 'danger',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});		        
    }else {
        var Request = {
            'Method_Name': 'Check_DB_Exist',
            'DB_Name': Company.name.replace(/ /gi, "").toUpperCase()
             };
        
		var onSuccess = function(Response){
		    
		    if(Response.Result === "Database already exist"){
		       
		       bootbox.dialog({
       			title : "¡Alerta!",
       			message : "Ya existe una companía con ese nombre.",
       			buttons :{
    	   				main:{
    	   					label:'¡OK!',
    	   					className:'btn-primary'
    	   					}
       			    }
       		  });
       		  
       		   setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.Class_Company_Name = "form-group has-error";
                    });
                }, 0);
		                    		      
		    }else{
		        $scope.Show_User = true; 
                $scope.Show_Company = false;		        
		    }
		};
		
		var onError = function(e){
			
			var erro={
			Generated: true,
            Page: "Scr_Company_Controller",
            Method: "Select_Company",
            Description: "onError",
            User: "Default",
            Company: "Default",
            Date: new Date().getTime(),
            Error: e
        };
        
		throw erro;
		
		}
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
        
     }   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate_Companys",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};


function Select_Company(){

      try{
		 var JsonData = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": $scope.Companys.name.toUpperCase()/*,
    			"Domain":"@"+$scope.Companys.domain1.toLowerCase()+"."+$scope.Companys.domain2.toLowerCase(),
    			"Name":$scope.Companys.name*/
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(arr){
			if(arr.length > 0){
				//alert("Esta Compañia ya esta registrada");
	$.notify({message: "Esta Compañia ya esta registrada"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});

				eflowDTS.Session.Company={};
				window.location.href='#';
			}
			
		}
		var onError = function(e){
					 var erro={
			Generated: true,
            Page: "Scr_Company_Controller",
            Method: "Select_Company",
            Description: "onError",
            User: "Default",
            Company: "Default",
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;
		console.log(e);
		}
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
       
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "Select_Company",
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
    }  }
   		
$scope.Validate_User= function(User){
try{
	    
        $scope.User=User;	
        $scope.Show_User= false; 
        $scope.Show_Company = false;
        $scope.Show_Settings = true;
        
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate_User",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    } 
		};		
						
$scope.SaveData = function() {
    try {
        var Request = {
            'Method_Name': 'Company_Registration',
            'Company_Data': {
                "Control": {
                    "Creation_Date": new Date().getTime(),
                    "Created_User": "Default"
                },
                "Subscription": {
                    "Creation_Date": new Date().getTime(),
                    "Ending_Date": new Date().getTime() + (30 * 24 * 60 * 60 * 1000),
                    "Type_Subscription": "demo" //  $scope.Companys.subscription
                },
                "Name": $scope.Companys.name,
                "Logo": $scope.Companys.LogoImage,
                "Identifier": $scope.Companys.name.toUpperCase(),
                'DB_Name': $scope.Companys.name.replace(/ /gi, "").toUpperCase(),
             //   "Domain": "@" + $scope.Companys.domain1.toLowerCase() + "." + $scope.Companys.domain2.toLowerCase(),
                "Mail": $scope.Companys.mail.toLowerCase(),
                "Country": $scope.Companys.country,
                "Location": {
                    "Latitud": $scope.Companys.location_Latitud,
                    "Longitud": $scope.Companys.location_Longitud
                },
                "Address": $scope.Companys.Address,
                "Phone": $scope.Companys.phone,
                "Fax": $scope.Companys.fax,
                "Mails": [],
                "Settings": {
                    "Unity": $scope.Array_Unity,
                    "Fuel": $scope.Array_Fuel,
                    "User": [{
                        "Value": "Conductor",
                        "Description": "Conductor"
                    }, {
                        "Value": "Administrador",
                        "Description": "Administrador"
                    }], //$scope.Array_User ,
                    "Vehicle": $scope.Array_Vehicle,
                    "License": $scope.Array_License
                }
            }/*,
            'Subscription_Company': {
                "Company": $scope.Companys.name,
                "Subscription_Type": {
                    "Subscription_ID": eflowDTS.Session.Ram.Subscription.Subscription_ID,
                    "Subscription_Name": eflowDTS.Session.Ram.Subscription.Subscription_Name,
                    "Subscription_Type": eflowDTS.Session.Ram.Subscription.Subscription_Type,
                    "Comments": eflowDTS.Session.Ram.Subscription.Comments,
                    "Features": eflowDTS.Session.Ram.Subscription.Features,
                    "Subscription_Period": eflowDTS.Session.Ram.Subscription.Subscription_Period,
                    "Ammount": eflowDTS.Session.Ram.Subscription.Ammount,
                    "Free_Users": eflowDTS.Session.Ram.Subscription.Free_Users
                },
                "Creation_Date": new Date().getTime(),
                "Ending_Date": new Date().getTime() + (30 * 24 * 60 * 60 * 1000),
                "Automatic_Renewal": true,
                "State": "Active"
            }*/,
            'User_Data': {
                "Control": {
                    "Creation_Date": new Date().getTime(),
                    "Created_User": "Default"
                },
                "Company": $scope.Companys.name.toUpperCase(),
                "UserName": $scope.User.UserName,
                "Password": $scope.User.Password,
                "ID": $scope.User.ID,
                "Name": $scope.User.Name,
                "Lastname": $scope.User.Lastname,
                "Lastname2": $scope.User.Lastname2,
                "Identification": $scope.User.Identification,
                "Mail": $scope.User.Mail,//.toLowerCase() + "@" + $scope.Companys.domain1.toLowerCase() + "." + $scope.Companys.domain2.toLowerCase(),
                "Gender": $scope.User.Gender,
                "Birthdate": $scope.User.Birthdate,
                "Type": "Administrador",
                "Address": $scope.User.Address
            },
            'DB_Name': $scope.Companys.name.replace(/ /gi, "").toUpperCase()
        };
        var onSuccess = function(Request) {
            
            if(Request.DB_Name){
                bootbox.dialog({
       			title : "¡Alerta!",
       			message : "Compañía registrada, su Identificador es: "+Request.DB_Name,
       			buttons :{
    	   				main:{
    	   					label:'¡OK!',
    	   					className:'btn-primary'
    	   					}
       			    }
       		  });
       		  
       		  
       		  
       		  window.location.href = "#";
            }else{
               bootbox.dialog({
       			title : "¡Alerta!",
       			message : "Ya existe una companía con ese nombre.",
       			buttons :{
    	   				main:{
    	   					label:'¡OK!',
    	   					className:'btn-primary'
    	   					}
       			    }
       		  }); 
            }            
        };

        var onError = function(onError) {

        };
        
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, Request, onSuccess, onError);

    } catch (e) {

        var err;

        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "SaveData",
                Description: "Error no controlado",
                User: "Default",
                Company: "Default",
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }
};			

$scope.validate_Settings =function(Obj,Arr){
		try{
	    if(Obj.Value===""||Obj.Value===undefined||Obj.Description===""||Obj.Description===undefined){
	    	//alert("Debe de ingresar los valores");	
	    	$.notify({message: "Debe de ingresar los valores"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	    	}
		else{
			existe=false;
			for (var i=0; i< Arr.length;i++){
				if( Arr[i].Value === Obj.Value)	{
					existe = true;
					break;
				}			
			}	
			if(existe===true){
				//alert("Los datos que ha ingresado ya fueron ingresados en el sistema");	
	    	$.notify({message: "Los datos que ha ingresado ya fueron ingresados en el sistema"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	    	
			}
			else{
				var Unity = {};
				Unity.Value = Obj.Value;
				Unity.Description = Obj.Description;
				Arr.push(Unity);
				
				var inputValues = document.getElementsByName("Input_Value");
var inputDescription = document.getElementsByName("Input_Description");

for(var j = 0; j < inputValues.length;j++){
    inputValues[j].value = "";
    //console.log("Limpiando input value: "+ i);
}

for(var k= 0; k < inputDescription.length; k++){
    inputDescription[k].value = "";
    //console.log("Limpiando input description: "+ i);
}

				
				
			//	document.getElementById("Input_Value").value="";
			//	document.getElementById("Input_Description").value="";
			}
		}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Company_Controller",
                Method: "validate_Settings",
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
                Page: "Scr_Company_Controller",
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


















});