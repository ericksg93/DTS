DTS_APP.controller('Scr_Calendar_Controller',function($scope) {

$scope.init = function(){
try{
			    
    Set_Current_Page();
	$scope.Select_VisitPoint();	
	$scope.Show_Components.Main_Menu = true;
	$scope.Show_Components.SubMenu_Maintenance = true;
	$scope.Show_Components.Login = true;

 }catch (e) {
        
     var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Calendar_Controller",
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

$scope.Select_VisitPoint = function(){
try{
	 
	 var Request = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			'Company': eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	'Estimated_Date':true,
            	'Name': true,
            	'Route.ID_Route':true
            },
            'DB':eflowDTS.Session.DB
        };
        
        
		var onSuccess = function(Response){
		
		var obj = {}; 
		
		for(var i = 0; i < Response.length; i++){
			  
     var puntoVisita = Response[i];
  
  if (! obj.hasOwnProperty(puntoVisita.Estimated_Date)){
	  
      obj[puntoVisita.Estimated_Date] = { "PuntosVisita": 1, "Rutas": 1, "ID_Rutas":[puntoVisita.Route.ID_Route]};
           
  }else{
  	  
  	  if(obj[puntoVisita.Estimated_Date].ID_Rutas.indexOf(puntoVisita.Route.ID_Route) === -1){  	  	
  	  obj[puntoVisita.Estimated_Date].Rutas++;
  	  obj[puntoVisita.Estimated_Date].ID_Rutas.push(puntoVisita.Route.ID_Route);  	  
  	  }
  	  obj[puntoVisita.Estimated_Date].PuntosVisita++;

  }
  	 }
		
		
		var date = new Date();
	       
	       $("#calendar").responsiveCalendar({
			
	          time: date.getFullYear() + "-" + (date.getMonth() + 1),
			  
	          events: obj,
	          
		      onDayClick : function(){
		      	var day = this.title;
		      var Month=	day.split("-")[1];
		      var days=	day.split("-")[2];
		      	if(Month >9){
		      		if(days<10){
		      			eflowDTS.Session.Ram.Calendar_Date = (new Date(this.title)).format("yyyy-mm-dd");
		      		}
		      		else{
		      		eflowDTS.Session.Ram.Calendar_Date =this.title;
		      		}
		      	}
				else{
					eflowDTS.Session.Ram.Calendar_Date = (new Date(this.title)).format("yyyy-mm-dd");
		      	}		      	
		      //	 eflowDTS.Session.Ram.Calendar_Date =this.title;// (new Date(this.title)).format("yyyy-mm-dd");
		      	 Set_Cookie("EflowCookie",eflowDTS);
		      	 location.href = "#/PV_DB";
		      	 }
	      });	
		
		};
		
		var onError = function(e){
			
		var erro={
			Generated: true,
            Page: "Scr_Calendar_Controller",
            Method: "Select_VisitPoint",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
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
                Page: "Scr_Calendar_Controller",
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

});