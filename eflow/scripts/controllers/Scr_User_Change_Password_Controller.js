DTS_APP.controller('Scr_User_Change_Password_Controller',function($scope) {

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
           $("#Charging").modal('show');
           Get_Information_Case(Case);
       }
			    
 }catch (e) {
     console.log(e);
 }
};

var Get_Information_Case = function(ID_Case){
try{
   
   $scope.Change = {};
   
   var Request = {
			'Method_Name': 'Select_User_Change_Password_Case',
             'Data': {
                 "ID_Case":ID_Case,
                 "Change_Password_Status":"PEND"
            },
            'Fields':{
            	
            }	,
            'DB':"DTS_Info"	 
		};
	
		
		var onSuccess = function(Response){
            if(Response.Result === true){                
                setTimeout(function () {
                        $scope.$apply(function () {
                        $scope.Change.ID_User = Response.Data.ID_User;
                           $scope.Change.Mail = Response.Data.Mail;
                           $scope.Change.DB= Response.Data.DB;
                           $scope.Change.Company = Response.Data.Company_Name;
                           $scope.Change.ID_Mails = Response.Data._id.$id;
                           
                            $("#Charging").modal('hide');
                        });
                 }, 0);    
               
            }else{
               $("#Charging").modal('hide');
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

$scope.Change_Password = function(change){
    
    if(change.Password !== change.Password_Repeat){
        $scope.Error_Password = true;
       // return ;
    }else{
        var Request ={
			'Method_Name': 'Update_Change_Password',
			  'Data': {
			      "Company": change.Company,
			      "DB": change.DB,
			      "Password": change.Password,
			      "ID": change.ID_User,
			      "Mail": change.Mail,
			      "ID_Mails": change.ID_Mails
			  },
            'Fields':{
            },
            'DB':"DTS_Info"	 
		};
	
		var onSuccess = function(Response){
          	 $scope.Change = {};
          	 bootbox.dialog({
   				title:"¡Alerta!",
   				message:"Se ha cambiado con éxito",
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






});