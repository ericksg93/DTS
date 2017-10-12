DTS_APP.controller('Scr_Dashboard_Controller',function($scope){
	 
	$scope.init = function(){
		
		$("#Charge_New_Dashboard").modal('show');
		$scope.Select_DataSet();
		$scope.Select_Dashboard();
		$scope.PivotData = {};	
		$scope.Dashboard_Show = true;
	    $scope.Dashboard_Object = {};
	    $scope.Filter = {};

	};
	
	
	$scope.Charge_Template = function(Url,Type){
		setTimeout(function(){
   			$scope.$apply( function(){   				
				$('#Charge_New_Dashboard').on('hidden.bs.modal', function (e) {
					$scope.Template_Type = Type;
					$scope.Template = Url;
					$scope.Show_All_Chart();
					$scope.Dashboard_Object.Type = Type;
					$scope.Dashboard_Object.Url = Url;
				});
			$("#Charge_New_Dashboard").modal('hide');	
							
   		});},0); 					
	};
	
	
	$scope.Charge_Dashboard = function(Dashboard){
	    
	    setTimeout(function(){
   			$scope.$apply( function(){   				
				$('#Charge_New_Dashboard').on('hidden.bs.modal', function (e) {
					$scope.Dashboard_Object = Dashboard;					
            	    $scope.Filter.Start_Date = Dashboard.Start_Date;
            	    $scope.Filter.End_Date = Dashboard.End_Date;
            	    $scope.Select_Data($scope.Filter);
            	    $scope.Template_Type = Dashboard.Type;
					$scope.Template = Dashboard.Url;
					$scope.Show_All_Chart();
					
					setTimeout(function(){   							
				        for(var i = 0; i < Dashboard.Charts.length; i++){				            
				    	    $scope.Charge_Pivot_Saved(Dashboard.Charts[i]);
	                    }							
   		           },2000);    		
   		
				});
			$("#Charge_New_Dashboard").modal('hide');								
   		});},0); 
   		
	};
	
	
	$scope.Close_Modal = function(){
		try{
		
	$('#Charge_New_Dashboard').on('hidden.bs.modal', function (e) {
  			window.location.href = "#Calendar";	
    });
    
	$("#Charge_New_Dashboard").modal('hide');
	
	
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

	$scope.Confirm_Dashboard = function(){
		
		if(Validate_Dashboard()){
			$("#Modal_Save_Dashboard").modal('show');
		}else{
			bootbox.dialog({
   			        title : "¡Alerta!",
        			message : "Complete el Dashboard...",
           			buttons :{
        	   				main:{
        	   					label:'¡OK!',
        	   					className:'btn-primary'
        	   					}
           			    }
           		  });
		}
		
	};
		
	function Validate_Dashboard(){
		
		var result = true;
		
		var Arr_Das = {
		 Dashboard_1x1 : ["1x1"],
		 Dashboard_1x2 : ["1x1","1x2"],
		 Dashboard_2x1 : ["1x1","2x1"],
		 Dashboard_2x2 : ["1x1","1x2","2x1","2x2"],
		 Dashboard_3x1 : ["1x1","2x1","3x1"],
		 Dashboard_2x3 : ["1x1","1x2","1x3","2x1","2x2","2x3"],
		 Dashboard_3x2 : ["1x1","1x2","2x1","2x2","3x1","3x2"]
		};
				
		for(var i = 0; i < Arr_Das[$scope.Template_Type].length; i++ ){
			if( $scope["Pivot_"+Arr_Das[$scope.Template_Type][i]] === undefined ){
				result = false;
				break;
			}  
		}
		return result;
	};
	
	$scope.Charge_Pivot_Saved = function(Dataset){	
		
		if(Dataset === undefined){
			$("#"+Dataset.id).html("");
		}else{ 
			$scope[Dataset.id.replace("Pivot","DataSet")] = Dataset;
			//$("#"+Dataset.id).width(Dataset.width+20);
			//$("#"+Dataset.id).height(Dataset.height+20);
			$scope[Dataset.id] = Dataset;
		
			var opts = {
			width: Dataset.width-5,
			height: Dataset.height-5,
			title: Dataset.Name,
			Print_Id: Dataset.id
    	    };
					 
			var config = JSON.parse(Dataset.Config);
			config.onRefresh = function(ram_config){
			var config_copy = JSON.parse(JSON.stringify(ram_config));
			delete config_copy["aggregators"];
			delete config_copy["renderers"];		
			setTimeout(function(){
				$scope.$apply( function(){
					Dataset.Config = JSON.stringify(config_copy);
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
			
			var Arr_Properties = [];
			Arr_Properties = Arr_Properties.concat(config.rows);
			Arr_Properties = Arr_Properties.concat(config.cols);
			Arr_Properties = Arr_Properties.concat(config.vals);
			if($scope.PivotData[Dataset.Type]){
			 //config.renderer = $.pivotUtilities.gchart_renderers[config.rendererName];			
				config.renderer = $.pivotUtilities.gchart_renderers_Dashboard(config.rendererName,opts);		
				$("#"+Dataset.id).pivot(Filter_Properties(Spanish_Version($scope.PivotData[Dataset.Type],Dataset.Type),Arr_Properties),config,true);		
			
			}else{
				bootbox.dialog({
   			        title : "¡Alerta!",
        			message : "Debe seleccionar un rango de fechas...",
           			buttons :{
        	   				main:{
        	   					label:'¡OK!',
        	   					className:'btn-primary'
        	   					}
           			    }
           		  });
           		  
           		  $scope.Dashboard_Show = true;
           		  
				  $scope[Dataset.id.replace("Pivot","DataSet")] = "";
			}
			
		}
	};
	
	$scope.Charge_Pivot = function(id,pivot,UI){	
		
		if(pivot === undefined){
			$("#"+id).html("");
		}else{
			
			$scope[id] = pivot;
    		$scope[id].id = id;
    		$scope[id].width = document.getElementById(id).offsetWidth;
    		$scope[id].height = document.getElementById(id).offsetHeight;
		
			var opts = {
			width: document.getElementById(id).offsetWidth-20,
			height: document.getElementById(id).offsetHeight-20,
			title: pivot.Name,
			Print_Id: id
		      };
		
			var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.gchart_renderers);
			var config = JSON.parse(pivot.Config);
			config.onRefresh = function(ram_config){
			var config_copy = JSON.parse(JSON.stringify(ram_config));
			delete config_copy["aggregators"];
			delete config_copy["renderers"];		
			setTimeout(function(){
				$scope.$apply( function(){
					pivot.Config = JSON.stringify(config_copy);
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
			
			var Arr_Properties = [];
			Arr_Properties = Arr_Properties.concat(config.rows);
			Arr_Properties = Arr_Properties.concat(config.cols);
			Arr_Properties = Arr_Properties.concat(config.vals);
			if($scope.PivotData[pivot.Type]){
				if(UI){
				config.renderers = renderers;       		
				$("#"+id).pivotUI(Filter_Properties(Spanish_Version($scope.PivotData[pivot.Type],pivot.Type),Arr_Properties),config,true);				
			}else{
				//config.renderer = $.pivotUtilities.gchart_renderers[config.rendererName];			
				config.renderer = $.pivotUtilities.gchart_renderers_Dashboard(config.rendererName,opts);		
				$("#"+id).pivot(Filter_Properties(Spanish_Version($scope.PivotData[pivot.Type],pivot.Type),Arr_Properties),config,true);		
			} 
			}else{
				bootbox.dialog({
   			        title : "¡Alerta!",
        			message : "Debe seleccionar un rango de fechas...",
           			buttons :{
        	   				main:{
        	   					label:'¡OK!',
        	   					className:'btn-primary'
        	   					}
           			    }
           		  });
           		  
           		  $scope.Dashboard_Show = true;
           		  
				  $scope[id.replace("Pivot","DataSet")] = "";
			}
			
		}
	};
	
	
	$scope.Print_Chart = function(id){
			
			document.getElementById("Print"+id).click();
		
	};
	
	$scope.Select_DataSet = function(){
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
		var onSuccess = function(Response){		
		  $scope.ArrayDataSet = Response;
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

$scope.Select_Dashboard = function(){
	 try {
	 	 	
        var JsonData = {
            'Method_Name': 'Select_Dashboard',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){		
		  $scope.ArrayDashboard = Response;
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

	$scope.Save_Dashboard = function(Name){
	    
	    $scope.Dashboard_Object.Name = Name;
	    $scope.Dashboard_Object.Start_Date = $scope.Filter.Start_Date;
	    $scope.Dashboard_Object.End_Date = $scope.Filter.End_Date;
	    $scope.Dashboard_Object.Company = eflowDTS.Session.Company.Identifier;
	    $scope.Dashboard_Object.Charts = [];
	        
		
		var Arr_Das = {
		 Dashboard_1x1 : ["1x1"],
		 Dashboard_1x2 : ["1x1","1x2"],
		 Dashboard_2x1 : ["1x1","2x1"],
		 Dashboard_2x2 : ["1x1","1x2","2x1","2x2"],
		 Dashboard_3x1 : ["1x1","2x1","3x1"],
		 Dashboard_2x3 : ["1x1","1x2","1x3","2x1","2x2","2x3"],
		 Dashboard_3x2 : ["1x1","1x2","2x1","2x2","3x1","3x2"]
		};
				
		for(var i = 0; i < Arr_Das[$scope.Template_Type].length; i++ ){
			$scope.Dashboard_Object.Charts.push($scope["Pivot_"+Arr_Das[$scope.Template_Type][i]]);			
		}
		
		
		var Request =  {
		    'Method_Name': 'Insert_Dashboard',
             'Data':  $scope.Dashboard_Object,
            'DB':eflowDTS.Session.DB
         };

		
		var onSuccess = function(Response){
		   $("#Modal_Save_Dashboard").modal('hide');
		};
		
		var onError = function(e){
		    console.error(e);
		};
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, Request, onSuccess, onError);
	};
	
	$scope.Select_Data = function(Filter) {
        try{
        	
        var Request = {
             'Method_Name': 'Select_Data_Graph',
             'Data_Trip': {
				 "Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        "$lte": new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		},
                 'Company': eflowDTS.Session.Company.Identifier
             },
             'Fields_Trip': {

             },
             'Data_Visit_Point': {
				 "Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        "$lte": new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		},
                 'Company': eflowDTS.Session.Company.Identifier
             },
             'Fields_Visit_Point': {

             },
             'Data_Item': {
				 "Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        "$lte": new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		},
                 'Company': eflowDTS.Session.Company.Identifier
             },
             'Fields_Item': {

             },
             'Data_Vehicle': {
				 "Start_Date":  {
                		"$gte": new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        "$lte": new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		},
                 'Company': eflowDTS.Session.Company.Identifier
             },
             'Fields_Vehicle': {

             },
            'DB':eflowDTS.Session.DB
         };

         var onSuccess = function(Response) {         
         $scope.PivotData = Response;
         };

		 var onError = function(Error_Response) {
			 
		 };

     Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
 
 } catch (e) {
         var err;

         if (e.hasOwnProperty("Generated") === false) {
             err = {
                 Generated: false,
                 Page: "Scr_General_Detail_Controller",
                 Method: "Select_Data",
                 Description: "Error no controlado",
                 User: "Default",
                 Company: "Default",
                 Date: new Date().getTime(),
                 Error: e
             };
             Save_Error(err);
         } else {
             Save_Error(e);
         }
     }
 };
	
 function Filter_Properties(Arr_Data,Arr_Pro){
	 
	 for(var i = 0; i < Arr_Data.length; i++){
		 
		 for(key in Arr_Data[i]){
		 
			if(Arr_Pro.indexOf(key) === -1){
				delete Arr_Data[i][key];
			}
		 }
		 
	 }
	 
	 return Arr_Data;
	 
 };
	
 $scope.Switch_Folder_Data = function(tipo) {
     try {        
	 
		if ($scope["Show_" + tipo] === true) {
			
             $scope["Class_" + tipo] = "fa fa-plus";
			 $scope["Show_" + tipo] = false
			 
         } else {
			 
             $scope["Class_" + tipo] = "fa fa-minus";
			 $scope["Show_" + tipo] = true
			 
         }
		 
     } catch (e) {
         var err;

         if (e.hasOwnProperty("Generated") === false) {
             err = {
                 Generated: false,
                 Page: "Scr_General_Detail_Controller",
                 Method: "Switch_Folder_Data",
                 Description: "Error no controlado",
                 User: "Default",
                 Company: "Default",
                 Date: new Date().getTime(),
                 Error: e
             };
             Save_Error(err);
         } else {
             Save_Error(e);
         }
     } 
 };
 	
 	$scope.Show_All_Chart = function() {
     try {
		
	var Arr = ["Pivot_1x1","Pivot_1x2","Pivot_1x3","Pivot_2x1","Pivot_2x2","Pivot_2x3","Pivot_3x1","Pivot_3x2"];
		
     for(var i = 0; i < Arr.length; i++){
        
		$scope["UI_"+ Arr[i]] = false;
        $scope["Show_" + Arr[i]] = true;
        $scope["Class_" + Arr[i]] = "fa fa-minus";
        
       }  

     } catch (e) {
         var err;

         if (e.hasOwnProperty("Generated") === false) {
             err = {
                 Generated: false,
                 Page: "Scr_General_Detail_Controller",
                 Method: "Switch_Folder_Data",
                 Description: "Error no controlado",
                 User: "Default",
                 Company: "Default",
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