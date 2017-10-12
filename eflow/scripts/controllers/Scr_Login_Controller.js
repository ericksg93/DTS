DTS_APP.controller('Scr_Login_Controller', function($scope) {


    $scope.init = function() {  
      try{
			$scope.Restaurar=false; 
			$scope.Ingreso=true;
			
		$scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
	    $scope.Log = {};
	    $scope.Rest = {};
	
	if(eflowDTS.Session.Save_Session === true){
		
		$scope.Show_Components.Main_Menu = true;
		$scope.Show_Components.SubMenu_Maintenance = true;
		$scope.Show_Components.Login = true;
		
		window.location.href = eflowDTS.Session.Ultimate_Page;		
	   
	}
	
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
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
		
$scope.EnviarPassword = function(rest){	
   try{    
		if(rest.Mail === "" || rest.Mail === undefined || rest.ID_Company === "" || rest.ID_Company === undefined )  {		    	
		  bootbox.dialog({
    			title:"¡Alerta!",
    			message:"Debe completar todos los campos",
    			buttons:{
    				main:{
    					label:"Ok!",
    					className:"btn-primary"
    				}
    			}				
		  });
		} else {
		var JsonData = 	{
			 'Method_Name': 'Select_User',
             'Data': {
    			"Mail": rest.Mail
              },
              'Fields':{            	
              },
              'DB':rest.ID_Company.toLocaleUpperCase()
        };
	var onSuccess = function(onSuccess){
	    
		if(onSuccess.length>0){
		   		var JsonData1 = 	{
					'Method_Name': 'Change_Password',
					 'Data':   { 
                           "Company_Name" : onSuccess[0].Company,
                           "Mail": rest.Mail,
                           "DB": rest.ID_Company.toUpperCase(),
                           "Change_Password_Status" : "PEND", 
                           "Mail_Status" : "PEND",
                           "ID_User" : onSuccess[0]._id.$id, 
                           "Date_Change" : new Date().getTime()
                         } ,
                    'Fields':{},
                    'DB': 'DTS_Info'
				};
	var onSuccess1 = function(onSuccess1){
		$.notify({message: "<strong>Solicitud de cambio de contraseña ha sido enviada</strong>"},  {animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100} });
					
	        $scope.Rest = {};		
			$scope.Restaurar=false; 
			$scope.Ingreso=true;
			
	};
	var onError1 = function(onError1){
	   var erro={
			Generated: true,
            Page: "Scr_User_Controller",
            Method: "Invited_User",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: onError1
        };
		throw erro;	
		console.log(onError1);
     };
     Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData1, onSuccess1, onError1);
		   
		   
		   
		   
		   
		   
		   
		}
		else{
		   alert("El correo o el identificador de la compañia no son correctos");					   
		}
	    
	  /*  $.notify({message: "<strong>Correo Enviado para cambio de contraseña</strong>"},{animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100} });				
		$scope.Restaurar=false; 
		$scope.Ingreso=true;*/
	};
	var onError = function(onError){
	   var erro={
			Generated: true,
            Page: "Scr_Login_Controller",
            Method: "EnviarPassword",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: onError
        };
		throw erro;	
		
     };
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    
        } //else      	
}catch (e) {//try
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Invited_User",
                Description: "Error no controlado",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
            };
            console.log(err);
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }//CATCH  
         
	}
		
	$scope.ResetPassword = function(){
	    	
	}
		
	$scope.Log_In = function(Log){
	try {
		 	
		if(Log.Mail === "" || Log.Mail === undefined || Log.Password === "" || Log.Password === undefined ){
			
		bootbox.dialog({
			title:"¡Alerta!",
			message:"Debe completar todos los campos",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}				
			});
			
		}else{
   
        var Request = {
            'Method_Name': 'Login_Admin',
            'Data': {
                'Mail': Log.Mail.toLowerCase(),
                'Password': Log.Password,
    			'Type': 'Administrador'
            },
            'DB':Log.ID_Company.toLocaleUpperCase()
        };
        
        console.log(Request);
               
		var onSuccess = function(Response) {
            if (Response.Result === false || Response.Result === "Database not found") {
            	
             bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"Datos incorrectos.",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                     }
                });
                
            } else {
				$.notify({message: "<strong>Bienvenidos al Sistema</strong>"},  {animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100} });
					$scope.Show_Components.Main_Menu = true;
					
					eflowDTS.Session.Current_User = Response;
					
					eflowDTS.Session.LoggedIn = true;
					eflowDTS.Session.DB = Log.ID_Company.toLocaleUpperCase();
					eflowDTS.Session.Save_Session = $scope.Save_Session;
					Set_Cookie("EflowCookie",eflowDTS);						
				    											
			    	DataCompany();
	                $scope.Show_Components.Login = true;
			    	//window.location.href = "#Calendar";
            }
            
        };
		
		var onError = function(Response_Error) {
			
           var erro = {
			Generated: true,
            Page: "Scr_Login_Controller",
            Method: "Log_In",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: Response_Error
        };
			throw erro;          
        };
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
        }
        
    } catch (e) {
	
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
                Method: "Log_In",
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


 function DataCompany() {	

      try{
		 var Request = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": eflowDTS.Session.Current_User.Company.toUpperCase()
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB.toUpperCase()
        };
        
		var onSuccess = function(Response){
			
			eflowDTS.Session.Company = Response[0];
		    Set_Cookie("EflowCookie",eflowDTS);
		    window.location.href = "#Calendar";
		    
		};
		
		var onError = function(e){
		
		var erro = {
			Generated: true,
            Page: "Scr_Login_Controller",
            Method: "DataCompany",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
       
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Login_Controller",
                Method: "DataCompany",
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
	