var map;
DTS_APP.controller('Scr_Vehicles_Online_Controller',function($scope){

$scope.init = function(){
try{ 
       	    Set_Current_Page();
			$scope.Show_Components = {};
			$scope.Show_Components.Map_Online_User = true;
	        $('#Charging').modal('show');
			Load_Init_Map();		
			Select_User_Online();
			Select_Jobs();		       				
			$scope.Show_Components.Show_User_Online = true;	
			$scope.Show_Components.Show_List = false;
			$scope.Show_Components.Main_Menu = true;
            $scope.Show_Components.SubMenu_Maintenance = true;
            $scope.Show_Components.Login = true;

	}catch (e) {        
        var err;        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
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

function Load_Init_Map(){
		try{			
		var div = document.getElementById('Map_Online_User');   			
   			if(div){
	   		    map = new GMaps({
				div: div,
			    lat: eflowDTS.Session.Company.Location.Latitud, 
				lng: eflowDTS.Session.Company.Location.Longitud,
			    zoom: 12,
			    tilesloaded: function(e){	
			    	 GMaps.off('tilesloaded',map);
			    	 setTimeout(function(){
	                	$('#Charging').modal('hide');
	                	}, 3000);
			    	}
			    }); 
			 }			 
		//$scope.Show_Components.Map_Online_User = false;
	}catch (e) {        
        var err;        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Load_Init_Map",
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
                Page: "Scr_Vehicles_Online_Controller",
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
	
$scope.refresh = function(){
try{
		Select_User_Online();
		Select_Jobs();
		}catch (e) {        
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "refresh",
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
	
$scope.See_Info = function(User){
try{
		eflowDTS.Session.Ram.UserControl = User;
		eflowDTS.Session.Ram.UserControl.Date = new Date().format("yyyy-mm-dd");
		eflowDTS.Session.Ram.page="Vehicles_Online";
		Set_Cookie("EflowCookie",eflowDTS);
		location.href="#/detail";		
	}catch (e) {        
        var err;        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "See_Info",
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
	
function Select_User_Online(){
try{	
		var JsonData = {
			'Method_Name': 'Select_User_Online',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
            	"Date": {
            		"$gte":new Date().getTime() - eflowDTS.Configuration.Time_Since_Last_Connection
            		}
            },
            'Fields':{
            	
            }	,
            'DB':eflowDTS.Session.DB	 
		};
	
		var onSuccess = function(Json){
			$scope.ArrayUser = [];
			map.removeMarkers();
			if(Json.length > 0){
			  for(var i = 0; i < Json.length; i++){
					
					if(Json[i].Type === 'Conductor'){
					Json[i].Class = "fa fa-truck";
					}else{
					Json[i].Class =  "fa fa-user";
					}
					var x = Json[i];
				
			if(x.Geolocation.Latitude){
  			map.addMarker({
			  lat: x.Geolocation.Latitude, 
			  lng: x.Geolocation.Longitude,
			  icon: 'images/truck.png',
			  infoWindow: {
			  content: 
			'<div class="small-box">'+
                '<div class="inner">'+
                  '<h5>Placa: '+x.ID_Truck+'    </h5> '+
                  '<h5>'+x.UserName+'  </h5> '+
                  '</div>'+                               
              '</div>'
			  },
			  value: x			  
			  });
			  }
					$scope.ArrayUser.push(Json[i]);
					$scope.$apply($scope.ArrayUser);	
					$scope.Show_Components.Show_User_Online = false;
					$scope.Show_Components.Show_List = true;
				
				}			
			}else{
				$scope.Show_User_Online = true;		
			}
			
		};
		
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Select_User_Online",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,JsonData,onSuccess,onError);
		
		
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Select_User_Online",
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
	
$scope.Create_Map = function(User){
		try{
		if($scope.Show_Components.Map_Online_User === false){
			$scope.Show_Components.Map_Online_User = true;
			Load_Map(User);
		}else{			
			if(typeof User === 'undefined'){
			$scope.Show_Components.Map_Online_User = false;	
		    }else{
			Load_Map(User);
		    }
		}
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Create_Map",
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
	
var Load_Map = function(User){
 try{
   	 	    if(typeof User === 'undefined'){
	   		   map.setCenter(eflowDTS.Session.Company.Location.Latitud,eflowDTS.Session.Company.Location.Longitud);			    
	        }else{
		       map.setCenter(User.Geolocation.Latitude,User.Geolocation.Longitude);		      	
	        }
			map.removeMarkers();
			if($scope.ArrayUser.length > 0){
		   
			for(var i = 0; i < $scope.ArrayUser.length; i++){				
		
			var x = $scope.ArrayUser[i];
  			map.addMarker({
			  lat: x.Geolocation.Latitude, 
			  lng: x.Geolocation.Longitude,
			  icon: 'images/truck.png',
			  infoWindow: {
			  content: 
			'<div class="small-box">'+
                '<div class="inner">'+
                  '<h5>Placa: '+x.ID_Truck+'    </h5> '+
                  '<h5>'+x.UserName+'  </h5> '+
                  '</div>'+
                '<div class="icon">'+
                 '   <i class="fa fa-truck"></i>'+
                '</div>'+                
              '</div>'
			  },
			  value: x			  
			  });			  	
				
			}
		}

				   		
  }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
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
	
function Select_Jobs(){
try{
 var Query = {
			'Method_Name':'Select_Jobs',
			'Data':{
				'Company':eflowDTS.Session.Company.Identifier,
				/*"Estimated_Date": new Date(new Date().format('yyyy-mm-dd')).getTime()+eflowDTS.Time.Difference*/
				"Estimated_Date" : new Date().format("yyyy-mm-dd")
                
			},
			'Fields':{
				'Visit_State':true,
				'User':true,
				'Name':true,
				'ID_Truck':true				 
			} ,
            'DB':eflowDTS.Session.DB
		};
		
		var Success = function(json){
			$scope.ArrayJobs = json;	
		};
		
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Select_Jobs",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;				
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Query,Success,onError);
		
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Select_Jobs",
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


});