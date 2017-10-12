DTS_APP.controller('Scr_Full_View_Controller',function($scope) {      
$scope.init = function(){
try{
    $scope.Show_Components.Main_Menu = true;
    $scope.Show_Components.SubMenu_Maintenance = true;
    $scope.Show_Components.Login = true;

	   $scope.chart=[];
$scope.Load_Visit_Point();
   }catch (e) {        
        var err;        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Full_View_Controller",
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
  
 $scope.Generate_Jobs = function(jobs){    
    var Obj={"Delivery": {"Confirmar": 0,"Rechazar": 0,"Mal_Estado": 0,"Faltante": 0,"Vencido": 0,"Otros": 0,"total":0,"Delivery_total":0,"Delivery_Incidentes":0,"Delivery_Missing":0},   
	           "Return": {"Confirmar": 0,"Rechazar": 0,"Mal_Estado": 0,"Faltante": 0,"Vencido": 0,"Otros": 0,"total":0,"Return_total":0,"Return_Incidentes":0,"Return_Missing":0}
  };
		    for(var j=0; j<jobs.length;j++){
		        var actions=jobs[j].JobActions;
		        
                            if(jobs[j].JobType==="delivery"){
					           	Obj.Delivery.Delivery_total+=jobs[j].Quantity;                                
                            }else{                                
					           	Obj.Return.Return_total+=jobs[j].Quantity;
                            }
    		    for(var k=0; k<actions.length;k++){    		        
    		        switch(actions[k].Action_Type){
                        case "Confirmar":
                        {
                            if(jobs[j].JobType==="delivery"){
                                Obj.Delivery.Confirmar+=actions[k].Quantity;//1;
					           	Obj.Delivery.total+=actions[k].Quantity;
                            }
                            else{
                                Obj.Return.Confirmar+=actions[k].Quantity;
					           	Obj.Return.total+=actions[k].Quantity;
                            }
                            break;
                        };
                        
                        case "Rechazar":
                        {
                            if(jobs[j].JobType==="delivery"){
                                Obj.Delivery.Rechazar+=actions[k].Quantity;
					           	Obj.Delivery.total+=actions[k].Quantity;
					           	Obj.Delivery.Delivery_Incidentes+=actions[k].Quantity;
                            }
                            else{
                                Obj.Return.Rechazar+=actions[k].Quantity;
					           	Obj.Return.total+=actions[k].Quantity;
					           	Obj.Return.Return_Incidentes+=actions[k].Quantity;
                            }
                            break;
                        };
                        case "Mal_Estado":
                        {                            
                            if(jobs[j].JobType==="delivery"){
                                Obj.Delivery.Mal_Estado+=actions[k].Quantity;
					           	Obj.Delivery.total+=actions[k].Quantity;
					           	Obj.Delivery.Delivery_Incidentes+=actions[k].Quantity;
                            }
                            else{
                                Obj.Return.Mal_Estado+=actions[k].Quantity;
					           	Obj.Return.total+=actions[k].Quantity;
					           	Obj.Return.Return_Incidentes+=actions[k].Quantity;
                            }
                            break;
                        };
                        case "Faltante":
                        {                            
                            if(jobs[j].JobType==="delivery"){
                                Obj.Delivery.Faltante+=actions[k].Quantity;
					           	Obj.Delivery.total+=actions[k].Quantity;
					           	Obj.Delivery.Delivery_Incidentes+=actions[k].Quantity;
                            }
                            else{
                                Obj.Return.Faltante+=actions[k].Quantity;
					           	Obj.Return.total+=actions[k].Quantity;
					           	Obj.Return.Return_Incidentes+=actions[k].Quantity;
                            }
                            break;
                        };
                        case "Vencido":
                        {   
                            if(jobs[j].JobType==="delivery"){
                                Obj.Delivery.Vencido+=actions[k].Quantity;
					           	Obj.Delivery.total+=actions[k].Quantity;
					           	Obj.Delivery.Delivery_Incidentes+=actions[k].Quantity;
                            }
                            else{
                                Obj.Return.Vencido+=actions[k].Quantity;
					           	Obj.Return.total+=actions[k].Quantity;
					           	Obj.Return.Return_Incidentes+=actions[k].Quantity;
                            }
                            break;
                        };
                        case "Otros":
                        {
                            if(jobs[j].JobType==="delivery"){
                                Obj.Delivery.Otros+=actions[k].Quantity;
					           	Obj.Delivery.total+=actions[k].Quantity;
					           	Obj.Delivery.Delivery_Incidentes+=actions[k].Quantity;
                            }
                            else{
                                Obj.Return.Otros+=actions[k].Quantity;
					           	Obj.Return.total+=actions[k].Quantity;
					           	Obj.Return.Return_Incidentes+=actions[k].Quantity;
                            }
                            break;
                        };
                    }
    		    }
		 }
		 return Obj;
	};
  
   $scope.Generate_Incidentes = function(incidentes){
   var ArrayIncidents= {"Excessive_Wait":0,"Canceled_Order":0,"Closed_Local":0,"Damaged_Truck":0,"Order_With_Difference":0,"Damaged_Product":0,"Excessive_Transit":0,"No_Money":0,"Assault":0,"total":0};
		    for (var t=0; t<incidentes.length;t++){
				switch(incidentes[t].Incident_Type){
					  case "Canceled_Order":
					  {
						ArrayIncidents.Canceled_Order+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Closed_Local":
					  {					
						ArrayIncidents.Closed_Local+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Damaged_Truck":
					  {
						ArrayIncidents.Damaged_Truck+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Order_With_Difference":
					  {
						ArrayIncidents.Order_With_Difference+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Damaged_Product":
					  {
						ArrayIncidents.Damaged_Product+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Excessive_Transit":
					  {
						ArrayIncidents.Excessive_Transit+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "No_Money":
					  {
						ArrayIncidents.No_Money+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Excessive_Wait":
					  {
						ArrayIncidents.Excessive_Wait+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
					 case "Assault":
					  {
						ArrayIncidents.Assault+=1;
						ArrayIncidents.total+=1;
						break;
					 }; 
				};
		    }	
		    return ArrayIncidents;
};
  
 $scope.Load_Visit_Point = function(){
 try{
 	var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
                "Estimated_Date": new Date().format("yyyy-mm-dd")
                },
            'Fields':{
			"Jobs":true,
			"Visit_Point_Incidents":true,
			"Name":true,
			"Visit_State":true,
			"User":true,
			"ID_Truck":true,
			"Estimated_Date":true 
			
            },
            'DB':eflowDTS.Session.DB
	};
	var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Full_View_Controller",
                Method: "Load_Visit_Point",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: JsonData
        };
			throw erro;	
	};
	var onSuccess = function(JsonArray){
	    if(JsonArray.length===0){
	       $.notify({message: "<strong>No hay datos para el dia actual</strong>"},{animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
		   window.location.href = "#Calendar";   
	    }else{
	        $.notify({message: "<strong>Cargando Datos</strong>"},{animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	   var user={};
	   var chart={};
	   var chart1={};
	  for(var m=0; m<JsonArray.length; m++){
		var identifier=JsonArray[m].User+","+JsonArray[m].ID_Truck;
	       if(user.hasOwnProperty(identifier)){	        
			 var ArrayIncidents= $scope.Generate_Incidentes(JsonArray[m].Visit_Point_Incidents);	
			 var Obj= $scope.Generate_Jobs(JsonArray[m].Jobs);
			  user[identifier].Incidents.total+=JsonArray[m].Visit_Point_Incidents.length;
			  user[identifier].Incidents.Canceled_Order+=ArrayIncidents.Canceled_Order,			  
			  user[identifier].Incidents.Closed_Local+=ArrayIncidents.Closed_Local;
			  user[identifier].Incidents.Damaged_Truck+=ArrayIncidents.Damaged_Truck;
			  user[identifier].Incidents.Order_With_Difference+=ArrayIncidents.Order_With_Difference;
			  user[identifier].Incidents.Damaged_Product+=ArrayIncidents.Damaged_Product;
			  user[identifier].Incidents.Excessive_Transit+=ArrayIncidents.Excessive_Transit;
			  user[identifier].Incidents.No_Money+=ArrayIncidents.No_Money;
			  user[identifier].Incidents.Excessive_Wait+=ArrayIncidents.Excessive_Wait;
			  user[identifier].Incidents.Assault+=ArrayIncidents.Assault;
		            user[identifier].Return.total+=Obj.Return.total;
		            user[identifier].Return.Confirmar+=Obj.Return.Confirmar;
		            user[identifier].Return.Rechazar+= Obj.Return.Rechazar;
		            user[identifier].Return.Mal_Estado+=Obj.Return.Mal_Estado;
		            user[identifier].Return.Faltante+= Obj.Return.Faltante;
		            user[identifier].Return.Vencido+= Obj.Return.Vencido;
		            user[identifier].Return.Otros+= Obj.Return.Otros;  
		            
		            user[identifier].Return_total+=Obj.Return.Return_total;
		            user[identifier].Return_Incidentes+=Obj.Return.Return_Incidentes;
		            user[identifier].Return_Missing=user[identifier].Return_total-(user[identifier].Return.Confirmar+user[identifier].Return_Incidentes);
		          
		            user[identifier].Delivery.total+=Obj.Delivery.total;   
		            user[identifier].Delivery.Confirmar+= Obj.Delivery.Confirmar;   
		            user[identifier].Delivery.Rechazar+=Obj.Delivery.Rechazar;   
		            user[identifier].Delivery.Mal_Estado+= Obj.Delivery.Mal_Estado;   
		            user[identifier].Delivery.Faltante+= Obj.Delivery.Faltante;   
		            user[identifier].Delivery.Vencido+= Obj.Delivery.Vencido;   
		            user[identifier].Delivery.Otros+= Obj.Delivery.Otros;	
		            
		            user[identifier].Delivery_total+=Obj.Delivery.Delivery_total;
		            user[identifier].Delivery_Incidentes+=Obj.Delivery.Delivery_Incidentes;
		            user[identifier].Delivery_Missing=user[identifier].Delivery_total-(user[identifier].Delivery.Confirmar+user[identifier].Delivery_Incidentes);
		  
		      user[identifier].Visit_Point.push({"Name":JsonArray[m].Name,"State":JsonArray[m].Visit_State});							   			 				 
			}
			else{			    
					ArrayIncidents= $scope.Generate_Incidentes(JsonArray[m].Visit_Point_Incidents);	
			        Obj= $scope.Generate_Jobs(JsonArray[m].Jobs);
			        user[identifier]=[];			   
			        user[identifier].User=JsonArray[m].User;
			        user[identifier].ID_Truck=JsonArray[m].ID_Truck;
			        user[identifier].Incidents=ArrayIncidents;
		            user[identifier].Return=Obj.Return;
		            user[identifier].Delivery=Obj.Delivery;
		            
		         //   "Return_total":0,"Return_Incidentes":0,"Return_Missing":0}
		            
		            user[identifier].Return_total=Obj.Return.Return_total;
		            user[identifier].Return_Incidentes=Obj.Return.Return_Incidentes;
		            user[identifier].Return_Missing= user[identifier].Return_total-(user[identifier].Return.Confirmar+user[identifier].Return_Incidentes);	
		            
		            user[identifier].Delivery_total=Obj.Delivery.Delivery_total;
		            user[identifier].Delivery_Incidentes=Obj.Delivery.Delivery_Incidentes;
		            user[identifier].Delivery_Missing=user[identifier].Delivery_total-(user[identifier].Delivery.Confirmar+user[identifier].Delivery_Incidentes);
		            
		            user[identifier].Visit_Point=[{
		                "Name":JsonArray[m].Name,
		                "State":JsonArray[m].Visit_State
					}];	  					
			}
	           //	var chartej=[['Entregas',user[identifier].Delivery.total],['Recolecciones',user[identifier].Return.total],['Incidentes',user[identifier].Incidents.total],['Puntos de visita',user[identifier].Visit_Point.length]];
	           	var charte_Delivery=[['Exitosas',user[identifier].Delivery.Confirmar],
	           	['Con problemas',user[identifier].Delivery_Incidentes],
	           	['Faltan',user[identifier].Delivery_Missing]];
	           	chart[identifier]=charte_Delivery;	
	           	
		       
	           	
            	var charte_Return=[['Exitosas',user[identifier].Return.Confirmar],
	           	['Con problemas',user[identifier].Return_Incidentes],
	           	['Faltan',user[identifier].Return_Missing]];
	           	chart1[identifier]=charte_Return;		           		  
	   }	  
	   
	     for(key in user){
	         var count=0;
           for(var i=0;i<user[key].Visit_Point.length;i++){
               switch(user[key].Visit_Point[i].State){
					  case "Partial":
					  {
					     user[key].Visit_Point[i].StateEs= "Parcialmente Finalizado";
						break;
					 }; 
					 case "In_Process":
					  {
					     user[key].Visit_Point[i].StateEs= "En Proceso";
						break;
					 };
					 case "Aborted":
					  {
					     user[key].Visit_Point[i].StateEs= "Abortado";
						break;
					 };
					 case "Finalized":
					  {
					     user[key].Visit_Point[i].StateEs= "Finalizado";
						break;
					 };
					 case "Unassigned":
					  {
					     user[key].Visit_Point[i].StateEs= "No Asignado";
						break;
					 };
				};
               if(user[key].Visit_Point[i].State==="In_Process"){
                   count++;
               }
           }
           user[key].percentage=(((user[key].Visit_Point.length-count)*100)/user[key].Visit_Point.length);
       }
	   
	   
	   
	   
	   $scope.ArrayView=user;
	  
	   
	 setTimeout(function(){           
	$scope.Generate_Chart(chart1);
	$scope.Generate_Chart1(chart);
	                	}, 1000);
	}; 
	}
 	Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError); 	
 }catch (e) {        
        var err;        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Full_View_Controller",
                Method: "Load_Visit_Point",
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
  

  
  
 $scope.Generate_Chart = function(Array_Chart_Return){
 var count1=0;
 for( key in Array_Chart_Return){
      
	google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
		Array_Chart_Return[key].unshift(["Descripcion","Valor"]);
        var data1 = google.visualization.arrayToDataTable(Array_Chart_Return[key]);
        var options1 = {
          title: 'Recolecciones',  colors: ['#4E8613', '#F60B0B', '#1185A9']
        };
            var chart1 = new google.visualization.PieChart(document.getElementById('Div_ReturnChart_'+key));
        chart1.draw(data1, options1);
	                	
        
      }
 count1++;
  }
  
 };
  $scope.Generate_Chart1 = function(Array_Chart_Delivery){
 var count=0;
  for( key in Array_Chart_Delivery){
      
	google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
		Array_Chart_Delivery[key].unshift(["Descripcion","Valor"]);
        var data = google.visualization.arrayToDataTable(Array_Chart_Delivery[key]);
        var options = {
          title: 'Entregas', colors: ['#4E8613', '#F60B0B', '#1185A9']
        };
            var chart = new google.visualization.PieChart(document.getElementById('Div_DeliveryChart_'+key));
        chart.draw(data, options);
	                	
      }
 count++;
  }
  
  
 };
     
});