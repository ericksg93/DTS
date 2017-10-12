DTS_APP.controller('Scr_Restoring_DB_Controller', function($scope) {

 $scope.init = function() {
			$scope.Show_No_Data=false; 
			$scope.Show_Data=false;
		 $("#Charge_New_Modal").modal('show');
    $scope.Select_User();
  };
    
    
    $scope.Select_User = function(){
	try {
		
        var JsonData = {
            'Method_Name': 'Select_User_Online',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
            	"Date": {
            		"$gte":new Date().getTime() - eflowDTS.Configuration.Time_Since_Last_Connection
            		}
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){
				//Change_Structure(JsonData);
		Load_Select(Response);
		//$scope.Information=true; 
		};
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_Restoring_DB_Controller",
                Method: "Select_User",
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
      
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Restoring_DB_Controller",
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

var Load_Select = function(ArrayJobs){
	try {
		if(ArrayJobs.length===0){
			$scope.Show_Data=false;
			$scope.Show_No_Data=true;
				//alert("No Existe Información");
	//$("#Charge_New_Modal").modal('hide');
		}
		else{
			$scope.Show_No_Data=false;
			$scope.Show_Data=true;
		$scope.User_Truck=[]; 
		
		 for(var i=0; i<ArrayJobs.length;i++){
		
			var data = {
				"User" : ArrayJobs[i].User,
			    "ID_Truck" : ArrayJobs[i].ID_Truck
			    };
			    
			var existe = false;
			
			for(var j=0; j<$scope.User_Truck.length;j++){
				if(JSON.stringify($scope.User_Truck[j]) === JSON.stringify(data)){
					existe=true;	
					break;
				}	
			}					
			if(existe === false){
				$scope.User_Truck.push(data);
			}	
		}
	
		}
} catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Restoring_DB_Controller",
                Method: "Load_Select",
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
    
    
        
$scope.Close_Modal = function(){
		try{
	$('#Charge_New_Modal').on('hidden.bs.modal', function (e) {
  			window.location.href = "#Calendar";	
    });
	$("#Charge_New_Modal").modal('hide');
	
}catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Restoring_DB_Controller",
                Method: "Close_Modal",
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
    
 $scope.Save_Data=function(Restoring){
try{
	if(Restoring.User == null || Restoring.User === "" || Restoring.Password == null || Restoring.Password === "" || Restoring.Script == null || Restoring.Script === ""  ){
		
		bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Es necesario que digite todos los campos.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });

	}
	  var JsonData = {
            'Method_Name': 'Insert_DB_Manager',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
                "User": Restoring.User.split("(")[0],
    			"ID_Truck": Restoring.User.split("(")[1].split(")")[0],
                "Date": new Date().getTime(),
				"Password": Restoring.Password,
				"Script": Restoring.Script
			 },
            'DB':eflowDTS.Session.DB
			 };
				var onSuccess = function(onSuccess){
				
				$scope.Restoring={};
				};
				var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Restoring_DB_Controller",
                Method: "Save_Data",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;	
				console.log(onError);
				};
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
	
}catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Restoring_DB_Controller",
                Method: "Save_Data",
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