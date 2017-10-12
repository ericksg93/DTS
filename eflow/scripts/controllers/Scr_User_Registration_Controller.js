DTS_APP.controller('Scr_User_Registration_Controller',function($scope) {

  $scope.Registration_User = {
      License:[]
  };
$scope.init = function(){
try{
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.Show_Components.Main_Menu = false;  
        		$scope.Show_Components.SubMenu_Maintenance = false;
        		$scope.Show_Components.Login = false;
        		$scope.Error_Password = false;
            });
       }, 0);
       

       $scope.List_License = [];
       Check_Parameter();
          
			    
 }catch (e) {
     console.log(e);
 }
};


var Check_Parameter = function(){
try{
    var Case = getParameterByName("ID_Case");
       if(Case === null || Case === ""){
           $("#Error").modal('show');
       }else{
        //   $("#Charging").modal('show');
           Get_Information_Case(Case);
       }
			    
 }catch (e) {
     console.log(e);
 }
};

var Get_Information_Case = function(ID_Case){
try{
   
   $scope.Registration_User = {};
   $scope.Registration_User.License = [];
   
   var Request = {
			'Method_Name': 'Select_User_Registration_Case',
             'Data': {
                 "ID_Case":ID_Case,
                 "Registration_Status":"PEND"
            },
            'Fields':{
            	
            }	,
            'DB':"DTS_Info"	 
		};
	
		var onSuccess = function(Response){
            if(Response.Result === true){                
                setTimeout(function () {
                        $scope.$apply(function () {
                           $scope.Registration_User.ID_User = Response.Data.ID_User;
                           $scope.Registration_User.Mail = Response.Data.Mail;
                           $scope.Registration_User.Type = Response.Data.Type;
                           $scope.Registration_User.Company = Response.Data.Company;
                           $scope.Registration_User.DB = Response.Data.DB;
                           $scope.Registration_User.ID_Case = Response.Data.ID_Case;
                           $scope.Registration_User.Invited_By = Response.Data.Invited_By;
                           $scope.Registration_User.Date_Invited = Response.Data.Date_Invited;
                           $scope.Registration_User.ID_DB = Response.Data._id.$id;
                           if(Response.Data.Type==="Conductor"){
                               Carga_Licencias(Response.Data);
                           }
                     //     $("#Charging").modal('hide');
                        });
                 }, 0);              
            }else{
            //   $("#Charging").modal('hide');
               $("#Error").modal('show'); 
            }			
		};
		
		var onError = function(e){
			console.log(e);
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);
		
			    
 }catch (e) {
     console.log(e);
 }
};

function Carga_Licencias(Data){
  var JsonData = {
            'Method_Name': 'Select_Company',
            'Data': {
    			"Identifier": Data.Identifier,
            },
            'Fields':{
            	"Settings.License":true
            },
            'DB': Data.DB.toUpperCase()
        };
	
		var onSuccess = function(Success){
		    for(var i=0; i < Success[0].Settings.License.length;i++){
		        $scope.List_License[i]=Success[0].Settings.License[i].Value;		      
		    }
		}
		var onError = function(Error){
			console.log(onError);
		};
		 Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);

		
}

$scope.Register_User = function(User){
    
    if(User.Password_Repeat !== User.Password){
        $scope.Error_Password = true;
        return ;
    }else{
        var Request = {
			'Method_Name': 'Update_User_Registration',
             'Data_General':{                 
                    "Identificador":User.ID_DB,
                    "ID_Case":User.ID_Case,
                    "DB_Company":User.DB.toUpperCase()
                    },
			  'Data':{
						    "User": {
							      "Control": {
							        "Creation_Date": new Date().getTime(),
							        "Created_User": User.Invited_By
							      },
							      "Company": User.Company.toUpperCase(),
							      "UserName": User.UserName,
							      "Password": User.Password,
							      "ID": User.ID_User,
							      "Name": User.Name,
							      "Lastname": User.Lastname,
							      "Lastname2": User.Lastname2,
							      "Identification": User.Identification,
							      "Mail": User.Mail,
							      "Gender": User.Gender,
							      "Birthdate": User.Birthdate,
							      "DueDate": User.DueDate,
							      "License": User.License,
							      "Type": User.Type,
							      "Address": User.Address
						    },
						    "Audit": {
							      "Company": User.Company.toUpperCase(),
							      "User_ID": User.Identification,
							      "Created_On": new Date().getTime(),
							      "Created_By": User.Invited_By,
							      "Audit_State": "Open"
						    }
						  },
            'Fields':{
            },
            'DB':"DTS_Info"	 
		};
	
		var onSuccess = function(Response){
          	 $scope.Registration_User=[];
          	 bootbox.dialog({
   				title:"¡Alerta!",
   				message:"Se ha registado con éxito",
   				buttons:{
   					main:{
   						label:'OK!',
   						className:'btn-primary'
   					}
   				}
   			    });
   			    window.location.href = "#";
   			    
		};
		
		var onError = function(e){
			console.log(e);
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get,Request,onSuccess,onError);
		}
    
};

$scope.Check_Form = function(form) {
 if($scope.Registration_User.Type==='Administrador'){
    return form.$invalid;
 }else{
      if ($scope.Registration_User.License.length === 0 || form.$invalid) { 
         return true;
      }else {
        return false;
      }   
 }
 
};


});