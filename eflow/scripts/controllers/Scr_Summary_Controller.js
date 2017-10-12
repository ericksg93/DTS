DTS_APP.controller('Scr_Summary_Controller',function($scope) {
  
	$scope.init = function(){
		try{
        Set_Current_Page();
		//Get_Cookie("EflowCookie");
		$scope.query = {};
		var User = eflowDTS.Session.Current_User.ID;
		var Current_Date = new Date(new Date().format("yyyy-mm-dd")).getTime()+eflowDTS.Time.Difference;	
		
		$scope.QueryForUser = {"User":User};
		
		$scope.QueryForDate = function(DataSets){
		return DataSets.Date_Updated >= Current_Date;
		};

       $("#Charge_New_Modal").modal('show');
       Select_DataSet();
		
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
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
                Page: "Scr_Summary_Controller",
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

function Select_DataSet(){
	 try {
	 	
	 	$scope.User = eflowDTS.Session.Ram.ID;
	 	
        var JsonData = {
            'Method_Name': 'Select_DataSet',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(JsonData){		
		   $scope.ArrayDataSet = JsonData;		
		};		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Select_DataSet",
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
    } catch (e) {
        console.log(e);
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Select_DataSet",
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
   
   $scope.Charge_DataSet = function(DataSet){
	try{
		
   	$scope.Filter={};
   	
   	$("#Charge_New_Modal").modal('hide');
		$scope.Filter.End_Date =  new Date(DataSet.End_Date).format("yyyy-mm-dd");
		$scope.Filter.Start_Date =  new Date(DataSet.Start_Date).format("yyyy-mm-dd");  	
		$scope.Filter.Type = DataSet.Type; 	    
   	$scope.Refresh_Pivot_Table(DataSet);   	
   	
  }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Charge_DataSet",
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

   $scope.Switch_See_Pivot_UI = function(UI){
   	
   if(UI){
   	$scope.Pivot_UI_Class = "fa fa-compress";
   }else{
    $scope.Pivot_UI_Class = "fa fa-expand"; 
   }
   Create_Pivot_Table(UI);
   };
   
   function Create_Pivot_Table(UI){
		try{ 
   	 
   	var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);
   	var config = JSON.parse($scope.DataSet.Config);
   	config.onRefresh = function(ram_config){
   		var config_copy = JSON.parse(JSON.stringify(ram_config));
   		delete config_copy["aggregators"];
   		delete config_copy["renderers"];
   		setTimeout(function(){
   			$scope.$apply( function(){
   				$scope.DataSet.Config = JSON.stringify(config_copy);
   				});},0);
   	};
   	config.filter = function(rowObj){         
         			
				for(key in config.exclusions){				
					
					if(config.exclusions[key].indexOf(rowObj[key]) > -1){
						return false;
					}
				}
			return true;
			};
   	if(UI){
   		config.renderers = renderers;
       $("#Pivot_Table").pivotUI($scope.PivotData,config,true);		
   	}else{
   		config.renderer = $.pivotUtilities.gchart_renderers[config.rendererName];
   		$("#Pivot_Table").pivot($scope.PivotData,config,true);
    }  
   	   	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Create_Pivot_Table",
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
   
   $scope.New_DataSet = function(){
		try{
   	
   	$("#Charge_New_Modal").modal('hide');
   	   	
   	eflowDTS.Session.Ram.Flag_DataSet = "New";
   	
	   	$scope.DataSet = {
	   		"Name":"",
	   		"Config":"{}"
	   	};
	   	
	   	$scope.PivotData = [];
	   	$scope.Pivot_UI_Class = "fa fa-compress"; 
	   	$scope.Pivot_UI = true;
	   	Create_Pivot_Table(true);
	   	
 }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "New_DataSet",
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
   
   $scope.Refresh_Pivot_Table = function(Filter){
		try{
   	var JsonData = {
            'Method_Name': 'Select_Summary_'+Filter.Type,
             'Data': {
             	"Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        "$lte": new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		},
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(ArrData){ 
		
		if($scope.DataSet.Name === ""){
			eflowDTS.Session.Ram.Flag_DataSet = "New";
		}else{
			eflowDTS.Session.Ram.Flag_DataSet = "Old";
		}
		 
		
		switch(Filter.Type){
			case 'Item':{
				for(var i = 0; i < ArrData.length; i++){					
					ArrData[i].Start_Date = new Date(ArrData[i].Start_Date).format("dd-mm-yyyy")+"  " +new Date(ArrData[i].Start_Date).format("h:MM:ss TT"); 
                    ArrData[i].End_Date = new Date(ArrData[i].End_Date).format("dd-mm-yyyy")+"  " +new Date(ArrData[i].End_Date).format("h:MM:ss TT"); 
                  
          ArrData[i].Condition_Item = "Mixta";
        if (ArrData[i].Quantity === ArrData[i].Total_Units_Confirmed) {
            ArrData[i].Condition_Item = "Confirmada";
        }
        if (ArrData[i].Quantity === ArrData[i].Total_Units_Rejected) {
            ArrData[i].Condition_Item = "Rechazada";
        }
        if (ArrData[i].Quantity === ArrData[i].Total_Units_Damaged) {
            ArrData[i].Condition_Item = "Dañada";
        }
        if (ArrData[i].Quantity === ArrData[i].Total_Units_Missing) {
            ArrData[i].Condition_Item = "Faltante";
        }
        if (ArrData[i].Quantity === ArrData[i].Total_Units_Expired) {
            ArrData[i].Condition_Item = "Vencida";
        }
        if (ArrData[i].Quantity === ArrData[i].Total_Units_Other) {
            ArrData[i].Condition_Item = "Otro";
        }        
				}
				break;
				}
			case 'Visit_Point':{
				for(var i = 0; i < ArrData.length; i++){					
					ArrData[i].In_Time === true ? ArrData[i].In_Time = "Sí" : ArrData[i].In_Time = "No";
					ArrData[i].Start_Date = new Date(ArrData[i].Start_Date).format("dd-mm-yyyy")+"  " +new Date(ArrData[i].Start_Date).format("h:MM:ss TT"); 
                    ArrData[i].End_Date = new Date(ArrData[i].End_Date).format("dd-mm-yyyy")+"  " +new Date(ArrData[i].End_Date).format("h:MM:ss TT"); 
                    
				}
				break;
				}
			case 'Trip':{
				for(var i = 0; i < ArrData.length; i++){
					ArrData[i].Start_Date = new Date(ArrData[i].Start_Date).format("dd-mm-yyyy")+"  " +new Date(ArrData[i].Start_Date).format("h:MM:ss TT"); 
                    ArrData[i].End_Date = new Date(ArrData[i].End_Date).format("dd-mm-yyyy")+"  " +new Date(ArrData[i].End_Date).format("h:MM:ss TT"); 
                    
				}				

				break;}			
		}
		
		$scope.PivotData = Spanish_Version(ArrData,Filter.Type);
		$scope.DataSet.Type = Filter.Type;
		$scope.DataSet.Start_Date = new Date(Filter.Start_Date).getTime();
		$scope.DataSet.End_Date = new Date(Filter.End_Date).getTime();
		setInterval(function(){$scope.$apply();	},0);
		
		if($scope.DataSet.Name === ""){
			$scope.Pivot_UI_Class = "fa fa-compress"; 
		Create_Pivot_Table(true);	
		}else{
			$scope.Pivot_UI_Class = "fa fa-expand"; 
		Create_Pivot_Table(false);	
		}	
		
		};		
		var onError = function(onError){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Refresh_Pivot_Table",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: onError
        };
			throw erro;		
		console.log(JsonData);		
		};		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
   	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Refresh_Pivot_Table",
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
   
   $scope.Confirm_DataSet = function(){
   try{
   	
   	if(typeof $scope.DataSet.Type === "undefined" || typeof $scope.DataSet.Start_Date === "undefined" || typeof $scope.DataSet.End_Date === "undefined"){
   		
   		bootbox.dialog({
			title:"¡Alerta!",
			message:"Debe elegir un tipo de DataSet y un rango de fechas antes de guardar",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}}); 
   		
   	}else{
   	   
   	    if($scope.DataSet.Default){
   	    	$scope.Save_Name = "";   	    	
   	    }   	    
 		$("#Save_Modal").modal('show'); 
 
   	 }
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_Summary_Controller",
                Method: "Confirm_DataSet",
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
   
   $scope.Save_DataSet = function(Name){
		try{
			
   	$scope.DataSet.Name = Name;
   	$scope.DataSet.Company = eflowDTS.Session.Company.Identifier;
  	$scope.DataSet.User = eflowDTS.Session.Current_User.ID;
  	
  	if($scope.DataSet.Default){
  		delete $scope.DataSet["_id"];
  	}
    $scope.DataSet.Default = false; 
  	/*	var config = $("#Pivot_Table").data("pivotUIOptions");  	
  	delete config["aggregators"];
  	delete config["renderers"];
  	$scope.DataSet.Config = JSON.stringify(config);*/
   	if(eflowDTS.Session.Ram.Flag_DataSet === "New"){
      $scope.DataSet.Date_Created = new Date().getTime();
   	}
   	$scope.DataSet.Date_Updated = new Date().getTime();
   	
   	var JsonData = {
            'Method_Name': 'Insert_DataSet',
             'Data': [$scope.DataSet],
            'DB':eflowDTS.Session.DB
        }; 
        
		var onSuccess = function(ArrData){
			
		$('#Save_Modal').on('hidden.bs.modal', function (e) {
  			bootbox.dialog({
			title:"¡Alerta!",
			message:"Se ha guardado el DataSet",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}}); 
	});
    
	$("#Save_Modal").modal('hide');
	};	
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_Summary_Controller",
                Method: "Save_DataSet",
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
                Page: "Scr_Summary_Controller",
                Method: "Save_DataSet",
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
   
   
  function Spanish_Version(Arr, Type) {
         var Trip_Schema = [{"En":"Trip_ID","Es":"Viaje_ID"},{"En":"User","Es":"Conductor"},{"En":"ID_Truck","Es":"Placa"},{"En":"Year","Es":"Año"},{"En":"Quarter","Es":"Cuatrimestre"},{"En":"Trimester","Es":"Trimestre"},{"En":"Month","Es":"Mes"},{"En":"Week","Es":"Semana"},{"En":"DayWeek","Es":"Día de la semana"},{"En":"Day","Es":"Día"},{"En":"Start_Date","Es":"Fecha de Inicio"},{"En":"Total_VisitPoint","Es":"Total_Puntos_Visita"},{"En":"Total_VisitPoint_In_Time","Es":"Total_Puntos_Visita_A_Tiempo"},{"En":"Total_VisitPoint_Off_Time","Es":"Total_Puntos_Visita_Desatiempo"},{"En":"Total_Jobs","Es":"Total_Ordenes"},{"En":"Total_Jobs_Confirmed","Es":"Total_Ordenes_Confirmadas"},{"En":"Total_Jobs_Rejected","Es":"Total_Ordenes_Rechazadas"},{"En":"Total_Jobs_Damaged","Es":"Total_Ordenes_Dañadas"},{"En":"Total_Jobs_Missing","Es":"Total_Ordenes_Faltantes"},{"En":"Total_Jobs_Expired","Es":"Total_Ordenes_Vencidos"},{"En":"Total_Jobs_Other","Es":"Total_Ordenes_Otros"},{"En":"Total_Units","Es":"Total_Unidades"},{"En":"Total_Volume","Es":"Total_Volume"},{"En":"Total_Weight","Es":"Total_Peso"},{"En":"Total_Units_Confirmed","Es":"Total_Unidades_Confirmadas"},{"En":"Total_Volume_Confirmed","Es":"Total_Volume_Confirmadas"},{"En":"Total_Weight_Confirmed","Es":"Total_Peso_Confirmadas"},{"En":"Total_Units_Rejected","Es":"Total_Unidades_Rechazadas"},{"En":"Total_Volume_Rejected","Es":"Total_Volume_Rechazado"},{"En":"Total_Weight_Rejected","Es":"Total_Peso_Rechazado"},{"En":"Total_Units_Damaged","Es":"Total_Unidades_Dañadas"},{"En":"Total_Volume_Damaged","Es":"Total_Volume_Dañado"},{"En":"Total_Weight_Damaged","Es":"Total_Peso_Dañado"},{"En":"Total_Units_Missing","Es":"Total_Unidades_Faltantes"},{"En":"Total_Volume_Missing","Es":"Total_Volume_Faltante"},{"En":"Total_Weight_Missing","Es":"Total_Peso_Faltante"},{"En":"Total_Units_Expired","Es":"Total_Unidades_Vencidas"},{"En":"Total_Volume_Expired","Es":"Total_Volume_Vencido"},{"En":"Total_Weight_Expired","Es":"Total_Peso_Vencido"},{"En":"Total_Units_Other","Es":"Total_Unidades_Otras"},{"En":"Total_Volume_Other","Es":"Total_Volume_Otro"},{"En":"Total_Weight_Other","Es":"Total_Peso_Otro"},{"En":"Total_Incidents","Es":"Total_Incidentes"},{"En":"Excessive_Wait_Incidents","Es":"Incidentes_Espera Excesiva"},{"En":"Canceled_Order_Incidents","Es":"Incidentes_Orden_Cancelada"},{"En":"Closed_Local_Incidents","Es":"Incidentes_Local_Cerrado"},{"En":"Damaged_Truck_Incidents","Es":"Incidentes_Falla_Camion"},{"En":"Order_With_Difference_Incidents","Es":"Incidentes_Orden_Con_Diferencia"},{"En":"Damaged_Product_Incidents","Es":"Incidentes_Producto_Dañado"},{"En":"Excessive_Transit_Incidents","Es":"Incidentes_Transito_Excesivo"},{"En":"No_Money_Incidents","Es":"Incidentes_Sin_Dinero"},{"En":"Assault_Incidents","Es":"Incidentes_Asalto"},{"En":"ID_Route","Es":"Sector_ID"},{"En":"Route_Name","Es":"Sector_Nombre"},{"En":"PERC_Confirmed","Es":"Porcentaje_Confirmado"},{"En":"PERC_Rejected","Es":"Porcentaje_Rechazado"},{"En":"PERC_Damaged","Es":"Porcentaje_Dañado"},{"En":"PERC_Expired","Es":"Porcentaje_Vencido"},{"En":"PERC_Missing","Es":"Porcentaje_Faltante"},{"En":"PERC_Other","Es":"Porcentaje_Otro"},{"En":"Average_Time_Visit","Es":"Promedio_Tiempo_Visita"},{"En":"End_Date","Es":"Fecha_Final"},{"En":"Total_Kilometer","Es":"Total_Kilometros"},{"En":"Total_Duration","Es":"Total_Duracion"}];
         var Visit_Point_Schema = [{"En":"Name","Es":"Nombre"},{"En":"Trip_ID","Es":"Viaje_ID"},{"En":"User","Es":"Conductor"},{"En":"Truck_ID","Es":"Placa"},{"En":"ID_Route","Es":"Sector_ID"},{"En":"Route_Name","Es":"Sector_Nombre"},{"En":"Start_Date","Es":"Fecha de Inicio"},{"En":"Year","Es":"Año"},{"En":"Quarter","Es":"Cuatrimestre"},{"En":"Trimester","Es":"Trimestre"},{"En":"Month","Es":"Mes"},{"En":"Week","Es":"Semana"},{"En":"DayWeek","Es":"Día de la semana"},{"En":"Day","Es":"Día"},{"En":"VisitPoint_ID","Es":"Punto_Visita_ID"},{"En":"VisitPoint_Name","Es":"Punto_Visita_Nombre"},{"En":"Country","Es":"Pais"},{"En":"Province","Es":"Provincia"},{"En":"Canton","Es":"Cantón"},{"En":"District","Es":"Distrito"},{"En":"Total_Jobs","Es":"Total_Ordenes"},{"En":"Total_Jobs_Confirmed","Es":"Total_Ordenes_Confirmadas"},{"En":"Total_Jobs_Rejected","Es":"Total_Ordenes_Rechazadas"},{"En":"Total_Jobs_Damaged","Es":"Total_Ordenes_Dañadas"},{"En":"Total_Jobs_Missing","Es":"Total_Ordenes_Faltantes"},{"En":"Total_Jobs_Expired","Es":"Total_Ordenes_Vencidos"},{"En":"Total_Jobs_Other","Es":"Total_Ordenes_Otros"},{"En":"Total_Units","Es":"Total_Unidades"},{"En":"Total_Volume","Es":"Total_Volume"},{"En":"Total_Weight","Es":"Total_Peso"},{"En":"Total_Units_Confirmed","Es":"Total_Unidades_Confirmadas"},{"En":"Total_Volume_Confirmed","Es":"Total_Volume_Confirmadas"},{"En":"Total_Weight_Confirmed","Es":"Total_Peso_Confirmadas"},{"En":"Total_Units_Rejected","Es":"Total_Unidades_Rechazadas"},{"En":"Total_Volume_Rejected","Es":"Total_Volume_Rechazado"},{"En":"Total_Weight_Rejected","Es":"Total_Peso_Rechazado"},{"En":"Total_Units_Damaged","Es":"Total_Unidades_Dañadas"},{"En":"Total_Volume_Damaged","Es":"Total_Volume_Dañado"},{"En":"Total_Weight_Damaged","Es":"Total_Peso_Dañado"},{"En":"Total_Units_Missing","Es":"Total_Unidades_Faltantes"},{"En":"Total_Volume_Missing","Es":"Total_Volume_Faltante"},{"En":"Total_Weight_Missing","Es":"Total_Peso_Faltante"},{"En":"Total_Units_Expired","Es":"Total_Unidades_Vencidas"},{"En":"Total_Volume_Expired","Es":"Total_Volume_Vencido"},{"En":"Total_Weight_Expired","Es":"Total_Peso_Vencido"},{"En":"Total_Units_Other","Es":"Total_Unidades_Otras"},{"En":"Total_Volume_Other","Es":"Total_Volume_Otro"},{"En":"Total_Weight_Other","Es":"Total_Peso_Otro"},{"En":"Total_Incidents","Es":"Total_Incidentes"},{"En":"Excessive_Wait_Incidents","Es":"Incidentes_Espera Excesiva"},{"En":"Canceled_Order_Incidents","Es":"Incidentes_Orden_Cancelada"},{"En":"Closed_Local_Incidents","Es":"Incidentes_Local_Cerrado"},{"En":"Damaged_Truck_Incidents","Es":"Incidentes_Falla_Camion"},{"En":"Order_With_Difference_Incidents","Es":"Incidentes_Orden_Con_Diferencia"},{"En":"Damaged_Product_Incidents","Es":"Incidentes_Producto_Dañado"},{"En":"Excessive_Transit_Incidents","Es":"Incidentes_Transito_Excesivo"},{"En":"No_Money_Incidents","Es":"Incidentes_Sin_Dinero"},{"En":"Assault_Incidents","Es":"Incidentes_Asalto"},{"En":"In_Time","Es":"A_Tiempo"},{"En":"End_Date","Es":"Fecha_Final"},{"En":"Duration","Es":"Total_Duracion"},{"En":"PERC_Confirmed","Es":"Porcentaje_Confirmado"},{"En":"PERC_Rejected","Es":"Porcentaje_Rechazado"},{"En":"PERC_Damaged","Es":"Porcentaje_Dañado"},{"En":"PERC_Expired","Es":"Porcentaje_Vencido"},{"En":"PERC_Missing","Es":"Porcentaje_Faltante"},{"En":"PERC_Other","Es":"Porcentaje_Otro"}];
         var Item_Schema =[{"En":"Condition_Item","Es":"Tarea Condicion"},{"En":"Trip_ID","Es":"Viaje_ID"},{"En":"User","Es":"Conductor"},{"En":"Truck_ID","Es":"Placa"},{"En":"ID_Route","Es":"Sector_ID"},{"En":"Route_Name","Es":"Sector_Nombre"},{"En":"Year","Es":"Año"},{"En":"Quarter","Es":"Cuatrimestre"},{"En":"Trimester","Es":"Trimestre"},{"En":"Month","Es":"Mes"},{"En":"Week","Es":"Semana"},{"En":"DayWeek","Es":"Día de la semana"},{"En":"Day","Es":"Día"},{"En":"Start_Date","Es":"Fecha de Inicio"},{"En":"VisitPoint_ID","Es":"Punto_Visita_ID"},{"En":"VisitPoint_Name","Es":"Punto_Visita_Nombre"},{"En":"Doc_Type","Es":"Tipo"},{"En":"Ref1","Es":"Ref1"},{"En":"Ref2","Es":"Ref2"},{"En":"Ref3","Es":"Ref3"},{"En":"Item_ID","Es":"Producto_ID"},{"En":"Item_Name","Es":"Producto_Nombre"},{"En":"Item_Desc","Es":"Producto_Descripcion"},{"En":"UOM","Es":"Unidad_Medida"},{"En":"Quantity","Es":"Cantidad"},{"En":"Country","Es":"Pais"},{"En":"Province","Es":"Provincia"},{"En":"Canton","Es":"Canton"},{"En":"District","Es":"Distrito"},{"En":"Total_Units","Es":"Total_Unidades"},{"En":"Total_Volume","Es":"Total_Volume"},{"En":"Total_Weight","Es":"Total_Peso"},{"En":"Total_Units_Confirmed","Es":"Total_Unidades_Confirmadas"},{"En":"Total_Volume_Confirmed","Es":"Total_Volume_Confirmadas"},{"En":"Total_Weight_Confirmed","Es":"Total_Peso_Confirmadas"},{"En":"Total_Units_Rejected","Es":"Total_Unidades_Rechazadas"},{"En":"Total_Volume_Rejected","Es":"Total_Volume_Rechazado"},{"En":"Total_Weight_Rejected","Es":"Total_Peso_Rechazado"},{"En":"Total_Units_Damaged","Es":"Total_Unidades_Dañadas"},{"En":"Total_Volume_Damaged","Es":"Total_Volume_Dañado"},{"En":"Total_Weight_Damaged","Es":"Total_Peso_Dañado"},{"En":"Total_Units_Missing","Es":"Total_Unidades_Faltantes"},{"En":"Total_Volume_Missing","Es":"Total_Volume_Faltante"},{"En":"Total_Weight_Missing","Es":"Total_Peso_Faltante"},{"En":"Total_Units_Expired","Es":"Total_Unidades_Vencidas"},{"En":"Total_Volume_Expired","Es":"Total_Volume_Vencido"},{"En":"Total_Weight_Expired","Es":"Total_Peso_Vencido"},{"En":"Total_Units_Other","Es":"Total_Unidades_Otras"},{"En":"Total_Volume_Other","Es":"Total_Volume_Otro"},{"En":"Total_Weight_Other","Es":"Total_Peso_Otro"},{"En":"PERC_Confirmed","Es":"Porcentaje_Confirmado"},{"En":"PERC_Rejected","Es":"Porcentaje_Rechazado"},{"En":"PERC_Damaged","Es":"Porcentaje_Dañado"},{"En":"PERC_Expired","Es":"Porcentaje_Vencido"},{"En":"PERC_Missing","Es":"Porcentaje_Faltante"},{"En":"PERC_Other","Es":"Porcentaje_Otro"},{"En":"End_Date","Es":"Fecha_Final"}];
         var Arr_Return = [];
 
        switch (Type) {
            case 'Trip':
                {
                    for (var i = 0; i < Arr.length; i++) {
                        var Obj = {};
                        for (key in Arr[i]) {
                            for (var x = 0; x < Trip_Schema.length; x++) {
                                if (key === Trip_Schema[x].En) {
                                    Obj[Trip_Schema[x].Es] = Arr[i][key];
                                }
                            }
                        }
                        Arr_Return.push(Obj);
                    }
                    break;
                }
            case 'Visit_Point':
                 {
                    for (var i = 0; i < Arr.length; i++) {
                        var Obj = {};
                        for (key in Arr[i]) {
                            for (var x = 0; x < Visit_Point_Schema.length; x++) {
                                if (key === Visit_Point_Schema[x].En) {
                                    Obj[Visit_Point_Schema[x].Es] = Arr[i][key];
                                }
                            }
                        }
                        Arr_Return.push(Obj);
                    }
                    break;
                }
            case 'Item':
                  {
                    for (var i = 0; i < Arr.length; i++) {
                       var Obj = {};
                        for (key in Arr[i]) {
                            for (var x = 0; x < Item_Schema.length; x++) {
                                if (key === Item_Schema[x].En) {
                                    Obj[Item_Schema[x].Es] = Arr[i][key];
                                }
                            }
                        }
                        Arr_Return.push(Obj);
                    }
                    break;
                }
        }

        return Arr_Return;
    };


   
   
   

});