DTS_APP.controller('Scr_Historic_Information_Controller',function($scope) {
 
$scope.init = function(){
	try{
		 $("#Charge_New_Modal").modal('show');
		$scope.Information = false;
		
	}catch (e) {   
		var err;
		if (e.hasOwnProperty("Generated") === false) {
	       err = {
	            Generated: false,
	            Page: "Scr_Historic_Information_Controller",
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
  $scope.validate_fechaMayorQue = function(fechaInicial)
 {
         var f =new Date();         
         var fechaFinal=f.getFullYear()+ "-" + (f.getMonth() +1) + "-" + f.getDate();
             valuesStart=fechaInicial.split("-");
            valuesEnd=fechaFinal.split("-");
            // Verificamos que la fecha no sea posterior a la actual
            var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
            var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
             if(dateStart>dateEnd)
            {
           $scope.Historic.Date=""; // console.log("La fecha actual "+fechaFinal+" es superior a la fecha "+fechaInicial);
            return 1;                         
            }      
            //console.log("La fecha actual "+fechaFinal+" NO es superior a la fecha "+fechaInicial);
                     return 0; 
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
                Page: "Scr_Historic_Information_Controller",
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

$scope.Select_VisitPoint = function(Historic_Date){
	try {
		
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
            	"Estimated_Date":  Historic_Date
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
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
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
                Page: "Scr_Historic_Information_Controller",
                Method: "Select_VisitPoint",
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
				alert("No Existe Información");
		        $scope.Historic = "";
				$scope.Information =false ;
		}
		else{
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
		
		$scope.Information=true; 
		}
} catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Historic_Information_Controller",
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

$scope.Send_Information = function(Historic){
	try {
		$scope.Select_User(Historic);
		
	} catch (e) {
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Historic_Information_Controller",
                Method: "Send_Information",
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


 
$scope.Select_User = function(Historic){
	try {
        var Request = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"ID":Historic.User.split("(")[0],
    			"Type": "Conductor"
            },
            'Fields':{
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){
			if(Response.length===0){
				$.notify({message: "Este Usuario No EXISTE"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	 		//alert("Este Usuario No EXISTE");
		        $scope.Historic = "";
				$scope.Information =false ;
			}
			else{
				$scope.ArrayUser = Response;
				$scope.$apply($scope.ArrayUser);
				eflowDTS.Session.Ram.UserControl = {};
				eflowDTS.Session.Ram.UserControl.User = Historic.User.split("(")[0];
				eflowDTS.Session.Ram.UserControl.UserName = $scope.ArrayUser[0].Name+" "+$scope.ArrayUser[0].Lastname;
		    	eflowDTS.Session.Ram.UserControl.ID_Truck = Historic.User.split("(")[1].split(")")[0];
				eflowDTS.Session.Ram.UserControl.Date = Historic.Date;		
				eflowDTS.Session.Ram.page="Vehicles_Historic";
				Set_Cookie("EflowCookie",eflowDTS);
			    $("#Charge_New_Modal").on("hidden.bs.modal", function () {
		   		 location.href="#/detail";
				});
				$("#Charge_New_Modal").modal('hide');
			}
	    
		};
		var onError =  function(e){
			var erro={
			Generated: true,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Select_User",
            Description: "onError", 
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;			
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
    } catch (e) {        
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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


});