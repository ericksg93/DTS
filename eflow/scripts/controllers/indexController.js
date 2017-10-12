function ValidateInput(e,patron) {  
    return ! patron.test(String.fromCharCode(e.which));    
} 

function Clear(input,values){
    input.value = input.value.replace(values,'');
}

DTS_APP.controller('indexController', function($scope) {
	

       $scope.init = function() {try{
 
       	Set_Current_Page();
       	
		$scope.Show_Components = {};		
		$scope.Show_Components.Main_Menu = false;  
		$scope.Show_Components.SubMenu_Maintenance = false;
		$scope.Show_Components.Login = false;
		
		Get_Time(); 
		
		setInterval(function() {
                  $scope.$apply(function(){
						$scope.UserName = eflowDTS.Session.Current_User.UserName;
						$scope.Company = eflowDTS.Session.Company.Name;
		           });  
        }, 1000);
        
        setInterval(function(){
        	Get_Time();
        },60000);
  
        }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "indexController",
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

 
function Get_Time() {
	
try{
		
Load_JSON(eflowDTS.Configuration.URLs.eflow_Date_Time, function(Text_Json) {
             
	var x = JSON.parse(Text_Json);	
	
		$scope.$apply(function(){
			$scope.Watch = new Date(x.Time);
		});
		
		});
     
}catch (e) {        
    var err;        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "indexController",
                Method: "timers",
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
	

		
		
	
$scope.Sign_Out = function(){
try{
	
	$("#Log_Out").modal('show');
	
	eflowDTS.Session.Save_Session = false;
	eflowDTS.Session.LoggedIn = false;	
	Set_Cookie("EflowCookie",eflowDTS);
		      
	setTimeout(function(){
	     $('#Log_Out').modal('hide');
	     window.location.href = "#";
	}, 3000);
	
}catch (e) {
	
      var err;
        
     if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "indexController",
                Method: "Sign_Out",
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