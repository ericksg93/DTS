DTS_APP.controller('Scr_User_Controller',function($scope){

$scope.Type = "password";   

$scope.currentPage = 0;
$scope.pageSize = 15; 
$scope.pageSizeInvited = 15; 
$scope.ArrayUser = [];
$scope.Show_Components.Main_Menu = true;
$scope.Show_Components.SubMenu_Maintenance = true;
$scope.Show_Components.Login = true;

$scope.ArrayUserInvited = [];
$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayUser.length/$scope.pageSize);
};

$scope.numberOfPagesInvited = function(){
	return Math.ceil($scope.ArrayUserInvited.length/$scope.pageSizeInvited);
};

$scope.init = function() {
try{
    
  // $("#Modal_Agregar_User_New").modal("show");
    
    $scope.checked=false;
			$scope.Show_Alerta=false;
Set_Current_Page();
	
var Headers= [{"es":"NOMBRE","value":"ID_User"},{"es":"PRIMER APELLIDO","value":"Lastname"},
{"es":"SEGUNDO APELLIDO","value":"Lastname2"},{"es":"CEDULA","value":"Identification"},{"es":"IDENTIFICADOR","value":"ID"},{"es":"TIPO","value":"Type"}] ;
$scope.ArrayHeaders = Headers;
var HeadersInvited= [{"es":"IDENTIFICADOR","value":"ID_User"},{"es":"TIPO","value":"Type"},{"es":"Correo","value":"Mail"}] ;
$scope.ArrayHeadersInvited = HeadersInvited;

var Gender =[{"es":"Masculino","value":"Male"},{"es":"Femenino","value":"Female"}] ;
$scope.ArrayLicense = eflowDTS.Session.Company.Settings.License;
$scope.ArrayTypes = eflowDTS.Session.Company.Settings.User;
$scope.ArrayGenders = Gender;
//$scope.Domain = eflowDTS.Session.Company.Domain;
$scope.Select();

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
                Page: "Scr_User_Controller",
                Method: "Password",
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
                Page: "Scr_User_Controller",
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
$scope.Send_Mails=function(Identificador){
    
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
                Page: "Scr_User_Controller",
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

$scope.Action_Option= function(Option){
	try{
	if(Option === "Eliminar"){
		$scope.Delete_User_DB();
	}

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
$scope.Verify_License=function(Type){
	try{
	if (Type === "Conductor"){
		
		$scope.Show_Components.Type_License=true;
	}else/*{
	    
		if (Type === "Ayudante"){
			
		delete $scope.User.License;
	    
	    delete $scope.User.DueDate;
	    
	    $scope.User.Mail;	
	    
		$scope.Show_Components.Mail=false;
		$scope.Show_Components.Type_License=false;
		$scope.Show_Components.License = false;
	}
		else*/{
		delete $scope.User.License;
	    
	    delete $scope.User.DueDate;		
	    
		$scope.Show_Components.Type_License = false;

		$scope.Show_Components.License = false;
	}

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Verify_License",
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
$scope.See_License=function(){
	try{
		$scope.Show_Components.License=true;
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "See_License",
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
	
	
	
$scope.Delect_Invited_User =function(obj){
  	try{
  	    
  	   /* delete $scope.User.ArrayUserInvited(obj);*/
  	   
		var JsonData = {
            'Method_Name': 'Delete_Invited_User',
            'Data': obj.ID_Case,
            'Fields':{
            },
            'DB': eflowDTS.Session.DB
        };
        
	var onSuccess = function(onSuccess){
		$scope.Select_Invited_User();
		};
	
	var onError = function(onError){
				
					 var erro={
			Generated: true,
            Page: "Scr_Route_Controller",
            Method: "Delect_Invited_User",
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
                Page: "Scr_User_Controller",
                Method: "Delect_Invited_User",
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

$scope.Delete_User_DB = function(){
 try {
        var JsonData = {
            'Method_Name': 'Select_Jobs',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
				'User':true,
				'_id.$id':true
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){		
			var onSuccess2 = function(result){
				if(result === true){
					var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
					var Array_Delete_User_ID = [];
					for (var i=0; i < CheckBoxes_Array.length ;i++){
						if (CheckBoxes_Array[i].checked === true){
							var m={
								"id_check":CheckBoxes_Array[i].attributes.id_check.value,
								"id_User_id":CheckBoxes_Array[i].attributes.id_User_id.value  
							};
						if(eflowDTS.Session.Current_User.ID===CheckBoxes_Array[i].attributes.id_check.value){								
				 alert("El usuario "+CheckBoxes_Array[i].attributes.id_check.value +" no se pueden eliminar por ser el usuario que esta activo actualmente");
						}else{
						Array_Delete_User_ID.push(m); 
						}
					}
					}
					var Array_Delete_ID=[];	
					var Array_Not_Delete_ID=[];
					var obj={};
					for(var j=0; j< Response.length ;j++){
						if(obj.hasOwnProperty(Response[j].User)){
							obj[Response[j].User]+=1;
						}
						else{
							obj[Response[j].User]=1;
						}		
					}
					for(var k = 0; k < Array_Delete_User_ID.length; k++){
						if(obj.hasOwnProperty(Array_Delete_User_ID[k].id_check)){
							Array_Not_Delete_ID.push(Array_Delete_User_ID[k].id_check);
						}else{
							Array_Delete_ID.push(Array_Delete_User_ID[k].id_User_id);
					    }
					 }
					if(Array_Delete_ID.length>0){
						var JsonData1 = {
							'Method_Name': 'Delete_User',
							'Data': Array_Delete_ID,
							'User_Audit':{
								"Audit_State":"Close",
								"Deleted_On": new Date().getTime(),
								"Delete_By": eflowDTS.Session.Current_User.UserName
							},
            'DB':eflowDTS.Session.DB
						};
						var onSuccess1 = function(resonSuccess1){
							$scope.Select();
						};
						var onError1 =  function(onError1){
							var erro={
								Generated: true,
								Page: "Scr_Summary_Controller",
								Method: "Delete_User_DB",
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
					if(Array_Not_Delete_ID.length>0){
					 alert("Los siguientes usuarios "+Array_Not_Delete_ID +" no se pueden eliminar por tener Puntos de visita asignados ");
					} 
				}
			};
			bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",onSuccess2);
		};		
		var onError = function(e){
			var erro={
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
    } 
	catch (e) {
        alert(e);
        var err;
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Delete_User_DB",
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


$scope.Update_Invited = function(Obj){
	try{
	    
		var Json = Obj;
		delete Json['$$hashKey'];
		Json.Mail_Status= "PEND";
		var JsonData = {
					'Method_Name': 'Update_Invited_User',
					'Data': Json,
                    'Fields':{
                    },
                    'DB':  eflowDTS.Session.DB
        };
		var onSuccess = function(onSuccess){
		    
	    
		    $.notify({message: "Invitación reenviada"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	 $scope.Select_Invited_User();
			};
				
		var onError =  function(onError){
			var erro={
			Generated: true,
                Page: "Scr_User_Controller",
                Method: "Update_Invited",
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
                Page: "Scr_User_Controller",
                Method: "Update_Invited",
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

$scope.Save_User_Edit = function(Obj){
	try{
		var Json = Obj;
		Json.Control.Modification_date = new Date().getTime();
		Json.Control.Modify_User = eflowDTS.Session.Current_User.UserName;
		Json.Mail = Obj.Mail;//.toLowerCase()+ eflowDTS.Session.Company.Domain.toLowerCase();
		delete Json['$$hashKey'];
		var JsonData = 
				{
					'Method_Name': 'Update_Users',
					'Data': Json,
            'DB':eflowDTS.Session.DB
				};
		var onSuccess = function(JsonData){
			$scope.Select();
			};
				
		var onError =  function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Save_User_Edit",
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
                Page: "Scr_User_Controller",
                Method: "Save_User_Edit",
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
    			"User": Obj.ID//User
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
    			$scope.checked=false;
    			$scope.Show_Alerta=false;
    		}
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
	

$scope.Visualize_User = function(Obj){
	try{
	
	$scope.Verifica_Trabajos(Obj);
   $scope.User = Obj;
   
	$scope.User.Mail=Obj.Mail;//.split("@")[0];
   if($scope.User.Type==="Conductor"){
	$scope.Show_Components.License=true;
   $scope.Show_Components.Type_License=true;
   }else{
	$scope.Show_Components.License=false;
   $scope.Show_Components.Type_License=false;
   }
   
   $("#Modal_Edit_User").modal("show"); 
   

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Visualize_User",
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
	
$scope.Open_Modal_Add_User = function(){
	try{
	    $scope.Registration_User={};
		$("#Modal_Agregar_User_New").modal("show");
	$scope.Show_Components.License=false;
$scope.Show_Components.Type_License=false;
	$scope.User = {};

	//$("#Modal_Agregar_User").modal("show");	
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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

$scope.Select_Invited_User = function(){
 
	 try {
        var JsonData = {
            'Method_Name': 'Select_Invited_User',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"Registration_Status": "PEND", 
    			'DB':eflowDTS.Session.DB,
            },
                    'Fields':{
                        
                    },
                    'DB':  eflowDTS.Session.DB
        };
		
		var onSuccess = function(JsonData){
		
		document.getElementById('Invited_User_Table').style.display = 'block';
		document.getElementById('New_User').style.display = 'none';			
		document.getElementById('Invited_User_button').style.display = 'none';	
		document.getElementById('New_User_button').style.display = 'block';	
		$scope.ArrayUserInvited = JsonData;
		$scope.$apply($scope.ArrayUserInvited);

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_User_Controller",
                Method: "Select_Invited_User",
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
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Select_Invited_User",
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
            'Method_Name': 'Select_All_User',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		
		var onSuccess = function(JsonData){
		
		document.getElementById('Invited_User_Table').style.display = 'none';
		document.getElementById('New_User').style.display = 'block';			
		document.getElementById('Invited_User_button').style.display = 'block';	
		document.getElementById('New_User_button').style.display = 'none';	
		$scope.ArrayUser = JsonData;
		$scope.$apply($scope.ArrayUser);

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_User_Controller",
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
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
   
  
  
  /*
$scope.Select_Company = function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_Company',
             'Data': {
    			"Company": eflowDTS.Session.Company
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		
		var onSuccess = function(JsonData){
		eflowDTS.Session.DataCompany=JsonData;

		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Select_Company",
            Description: "onError",
            User: eflowDTS.Session.UserName,
            Company: eflowDTS.Session.Company,
            Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;		
		console.log(JsonData);
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
    } catch (e ) {
        onError(e );
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Select_Company",
                Description: "Error no controlado",
                User: eflowDTS.Session.UserName,
                Company: eflowDTS.Session.Company,
                Date: new Date().getTime(),
                Error: e
            };
            Save_Error(err);
        } else {
            Save_Error(e);
        }
    }  
  
};
   
  
   
  
  */
   

$scope.Delete = function(id){
	try {
	
		var onSuccess = function(result){
    
    if (result === true) {
       
      var JsonData = {
            'Method_Name': 'Delete_User',
            'Data':  id.$id,
            'DB':eflowDTS.Session.DB
            
        };
		
		var onSuccess = function(JsonData){
		
		$scope.Select();
		
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
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
    
    bootbox.confirm("¿Est"+'\u00e1'+" seguro que desea borrar el usuario del sistema?",onSuccess);
    
    
    } catch (e) {
            onError(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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


$scope.Generar =function(){
	try{
	var data = $scope.ArrayUser;
        if(data === '')
            return;
        
        JSONToCSVConvertor(data, "User Report", true);

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "Generar",
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


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
	try{
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
                Method: "JSONToCSVConvertor",
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

$scope.Invited_User = function(Invited_User){
   try{
		var JsonData = 	{
					'Method_Name': 'Invited_User',
					 'Data':   { 
                           "Company" :eflowDTS.Session.Company.Identifier,
                           "Company_Name" :eflowDTS.Session.Company.Name,
                           'DB':eflowDTS.Session.DB,
                           "Registration_Status" : "PEND", 
    		               "Mail_Status": "PEND", 
                           "ID_User" :Invited_User.ID_User , 
                           "Mail" : Invited_User.Mail, 
                           "Type" : Invited_User.Gender, 
                           "Invited_By" : eflowDTS.Session.Current_User.UserName, 
                           "Invited_By_Name" : eflowDTS.Session.Current_User.Name+" "+eflowDTS.Session.Current_User.Lastname+" "+eflowDTS.Session.Current_User.Lastname2, 
                           "Date_Invited" : new Date().getTime()
                         } ,
                    'Fields':{},
                    'DB':  eflowDTS.Session.DB
				};
	var onSuccess = function(onSuccess){
		$scope.Select_Invited_User();	
		$scope.Registration_User=[];
		$("#Modal_Agregar_User_New").modal("hide");	
	};
	var onError = function(onError){
	   var erro={
			Generated: true,
            Page: "Scr_User_Controller",
            Method: "Invited_User",
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
    }  
};

$scope.Add_New_User = function(New_User){

	try{
		var JsonData = 	{
					'Method_Name': 'Insert_User',
					 'Data': [
						 {
						    "User": {
							      "Control": {
							        "Creation_Date": new Date().getTime(),
							        "Created_User": eflowDTS.Session.Current_User.UserName
							      },
							      "Company": eflowDTS.Session.Company.Identifier,
							      "UserName": New_User.UserName,
							      "Password": New_User.Password,
							      "ID": New_User.ID,
							      "Name": New_User.Name,
							      "Lastname": New_User.Lastname,
							      "Lastname2": New_User.Lastname2,
							      "Identification": New_User.Identification,
							      "Mail": New_User.Mail,//.toLowerCase()+ eflowDTS.Session.Company.Domain.toLowerCase(),
							      "Gender": New_User.Gender,
							      "Birthdate": New_User.Birthdate,
							      "DueDate": New_User.DueDate,
							      "License": New_User.License,
							      "Type": New_User.Type,
							      "Address": New_User.Address
						    },
						    "Audit": {
							      "Company": eflowDTS.Session.Company.Identifier,
							      "User_ID": New_User.Identification,
							      "Created_On": new Date().getTime(),
							      "Created_By": eflowDTS.Session.Current_User.UserName,
							      "Audit_State": "Open"
						    }
						  }
					 ],
            'Fields':{
            },
            'DB':eflowDTS.Session.DB
					    
				};
					 /*[{
					 	"Control":{
					 	"Creation_Date": new Date().getTime(),
					 	"Created_User" : eflowDTS.Session.Current_User.UserName
					 	},
		    			"Company": eflowDTS.Session.Company.Identifier,
		    			"UserName": New_User.UserName,
					    "Password": New_User.Password,
					    "ID": New_User.ID,
					    "Name":New_User.Name,
					    "Lastname": New_User.Lastname,
					    "Lastname2": New_User.Lastname2,
					    "Identification": New_User.Identification,
					    "Mail": New_User.Mail.toLowerCase()+ eflowDTS.Session.Company.Domain.toLowerCase(),
					    "Gender": New_User.Gender,
					    "Birthdate": New_User.Birthdate,
					    "DueDate": New_User.DueDate,
					    "License": New_User.License,
					    "Type": New_User.Type,
					    "Address": New_User.Address
					    }],
					 'DataAudit': [{
					    "Company": eflowDTS.Session.Company.Identifier,
					    "User_ID":  New_User.Identification,
					    "Created_On":  new Date().getTime(),
					    "Created_By": eflowDTS.Session.Current_User.UserName,
					    "Audit_State": "Open"}
					    ],*/
				var onSuccess = function(onSuccess){
				$scope.Select();
				};
				var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Add_New_User",
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
                Page: "Scr_User_Controller",
                Method: "Add_New_User",
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
                Page: "Scr_User_Controller",
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



$scope.Export_File = function(Export_Type,Array_Users){
	try{
	
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Users);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Users);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Users);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Users);
			
			break;
		}
	}
	

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
		delete Obj.Password;
		delete Obj.$$hashKey;
		
	}	
	
	return Json_Array;

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
                Page: "Scr_User_Controller",
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
		texto.push('<Usuarios>\n');
		//texto.push('\t<Company>' + datos[i].Company + '</Company>\n');
		texto.push('\t<UserName>' + datos[i].UserName + '</UserName>\n');
		//texto.push('\t<Password>' + datos[i].Password + '</Password>\n');
		texto.push('\t<ID>' + datos[i].ID + '</ID>\n');
		texto.push('\t<Name>' + datos[i].Name + '</Name>\n');
		texto.push('\t<Lastname>' + datos[i].Lastname + '</Lastname>\n');
		texto.push('\t<Lastname2>' + datos[i].Lastname2 + '</Lastname2>\n');
		texto.push('\t<Identification>' + datos[i].Identification + '</Identification>\n');
		texto.push('\t<Mail>' + datos[i].Mail + '</Mail>\n');
		texto.push('\t<Gender>' + datos[i].Gender + '</Gender>\n');
		texto.push('\t<Birthdate>' + datos[i].Birthdate + '</Birthdate>\n');
		texto.push('\t<DueDate>' + datos[i].DueDate+ '</DueDate>\n');
		texto.push('\t<License>' + datos[i].License+ '</License>\n');
		texto.push('\t<Type>' + datos[i].Type + '</Type>\n');
		texto.push('\t<Address>' + datos[i].Address + '</Address>\n');
					    
		
		texto.push('</Usuarios>\n');
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
                Page: "Scr_User_Controller",
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
	
	
    Download_File(file, 'Usuarios.json');


   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
	
	Download_File(Generate_XML(arr), 'Usuarios.xml');
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
	   row += '"UserName",';
	   row += '"Password",';
	   row += '"ID",';
	   row += '"Name",';
	   row += '"Lastname",';
	   row += '"Lastname2",';
	   row += '"Identification",';
	   row += '"Mail",';
	   row += '"Gender",';
	   row += '"Type",'; 
	   row += '"Birthdate",';
	   row += '"DueDate",';
	   row += '"Address",';
	   row += '"License",';
	   row += '"",';
    
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		row = "";
		//row += '"' + arrData[i].Company + '",';
		row += '"' + arrData[i].UserName + '",';
		row += '"' + arrData[i].Password + '",';
		row += '"' + arrData[i].ID + '",';
		row += '"' + arrData[i].Name + '",';
		row += '"' + arrData[i].Lastname + '",';
		row += '"' + arrData[i].Lastname2 + '",';
		row += '"' + arrData[i].Identification + '",';
		row += '"' + arrData[i].Mail+ '",';
		row += '"' + arrData[i].Gender + '",';
		row += '"' + arrData[i].Type + '",';
		row += '"' + arrData[i].Birthdate + '",';
		row += '"' + arrData[i].DueDate + '",';
		row += '"' + arrData[i].Address + '",';
		row += '"' + arrData[i].License + '",';
		
	   row += '"",';
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
    link.download = "Usuarios.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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
		{title:"Usuario",dataKey:"UserName"},
		//{title:"Contraseña",dataKey:"Password"},
		{title:"Identificador",dataKey:"ID"},
		{title:"Nombre",dataKey:"Name"},
		{title:"Apellido",dataKey:"Lastname"},
		{title:"Apellido",dataKey:"Lastname2"},
		{title:"Cedula",dataKey:"Identification"},
		{title:"Correo",dataKey:"Mail"},
		{title:"Genero",dataKey:"Gender"},
		{title:"Fecha de nacimiento",dataKey:"Birthdate"},
		{title:"Licencia",dataKey:"License"},
		{title:"Fecha de vencimiento",dataKey:"DueDate"},
		{title:"Tipo",dataKey:"Type"},
		{title:"Dirección",dataKey:"Address"}];
var rows = [];
for(var i = 0; i < Arr.length; i++){
	   rows.push(Arr[i]);
}	

var doc = new jsPDF('l', 'pt');
   var header = function (data) {
      
doc.setFontSize(13);
  
doc.setFontType("normal");

doc.text(420, 50, 'Fecha: '+new Date($scope.Watch).format('dd/mm/yyyy'));
doc.setFontSize(18);	

doc.text(420, 160, 'Usuarios');

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
        beforePageContent: header,
        afterPageContent: footer,
	margin: {horizontal: 10},
        styles: {overflow: 'linebreak'},
        bodyStyles: {valign: 'top'},
        columnStyles: {email: {columnWidth: 'wrap'}},
        margin: {top: 180}
    });

        


doc.save('Usuarios.pdf');
  

};
Image_To_Base64("images/ima.png",onSucces_Img2);

};
Image_To_Base64("images/logo.png",onSucces_Img1);

	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_User_Controller",
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

















 /*

});



  
	
	
	
	
	
	
		var DB = new Dexie('eflowDTS');
        DB.version(1).stores({
            Store_User_Access: '_id.$id,Name,Lastname,Lastname2,Identification,Gender,Age,Address,Mail,UserName,Password,ID,Id_Vehicle'
        });
		DB.open().
		catch (function(error) {
			Save_Error(error);
		});
		DB.Store_User_Access.remove( { "_id.$id" : id} )
    
    
    
    
} catch (e) {
    alert(e);
}


};*/

});

