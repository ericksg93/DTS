var map;
DTS_APP.controller('Scr_VisitPoint_General_View_Controller',function($scope){

$scope.init = function(){
try{
	
	 $scope.ArrayRoute = [];
     Set_Current_Page();
     $scope.Show_Components.Main_Menu = true;
     $scope.Show_Components.SubMenu_Maintenance = true;
     $scope.Show_Components.Login = true;

	$('#Charging').modal('show');
	
	Select_VisitPoint();
	Select_Routes();
	
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_General_View_Controller",
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


function Select_Routes(){
try{
	var JsonData = {
				'Method_Name':'Select_All_Route',
				'Data':{
					"Company":eflowDTS.Session.Company.Identifier
				},
				'Fields':{},
            'DB':eflowDTS.Session.DB
			};
			
			var onSuccess = function(Response){
				
				$scope.Array_Route = Response;
				
			};
			
			var onError = function(e){
				
				var err = {
				Generated : true,
				Page: "Scr_VisitPoint_General_View",
				Method:"Select_Routes",
				Description: "onError",
				User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
				Error: e
				};
				
				throw err;
				
			};
			
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,JsonData,onSuccess,onError);
			
		}catch(e){
			
			var obj;
			if(e.hasOwnProperty("Generated") === false){
				obj = {
					Generated: false,
					Page:"Scr_VisitPoint_General_View",
					Method:"Select_Routes",
					Description:"Error no Controlado",
					User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
					Error: e			
				};
				Save_Error(obj);
			}else{
				Save_Error(e);
			}
			
		}
		
	};
	
	function Load_Init_Map(){
		try{
			
		var div = document.getElementById('Map_VisitPoint');
   			
   			if(div){
	   		    map = new GMaps({
				div: div,
			    lat: eflowDTS.Session.Company.Location.Latitud, 
				lng: eflowDTS.Session.Company.Location.Longitud,
			    zoom: 12,
			    tilesloaded: function(e){	
			    	 GMaps.off('tilesloaded',map);
			    	 setTimeout(function(){
			    	 	Add_Markers();
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
	
	$scope.See_Routes = function(){ 
	try{
	map.removePolygons();
	
		for(var i = 0; i < $scope.Array_Route.length; i++){
			
			var Route = $scope.Array_Route[i];	
			var color = RandomColor();
				map.drawPolygon({
					paths: Route.Route_Path,
					strokeColor: color.Border, 
					strokeOpacity: 1,
					strokeWeigth: 3,
					fillColor: color.BackGround,
					fillOpacity: 0.6	
				});				
		}
		
	}catch(e){
		
		var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "See_Routes",
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
		//console.error(e);
	}
	};
	
	function Add_Markers(){
	try{	
		for(var i = 0; i < $scope.Array_VisitPoint.length; i++){
			var VP = $scope.Array_VisitPoint[i];
			
			if(typeof VP.Latitude === 'number' || typeof VP.Longitude === 'number'){
			map.addMarker({
				lat: VP.Latitude,
				lng: VP.Longitude,
				value: VP,
				title: VP.Name,
				infoWindow:{
					content: '<H3>'+VP.Name+'</H3></br><p><b>Sector: </b>'+VP.Route.Route_Name+'</p>'
				},
				click:function(e){
					map.setCenter(VP.Latitude,VP.Longitude);
					map.refresh();
				}
			});	
			}
			map.refresh();
		}
	}catch(e){
		
		var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Vehicles_Online_Controller",
                Method: "Add_Markers",
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
		//console.error(e);
	}
	};
	
$scope.Resize = function(){
try {
		if(typeof map === "object"){
			map.refresh();	
		}
		
}catch(e){		
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

function Select_VisitPoint(){
try{
	var Query = {
			'Method_Name':'Select_All_Visit_Point',
			'Data':{
				'Company':eflowDTS.Session.Company.Identifier               
			},
			'Fields':{			
			},
            'DB':eflowDTS.Session.DB
		};
		
		var Success = function(json){
			$scope.Array_VisitPoint = json;			
			Load_Init_Map();			
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
};
	


});