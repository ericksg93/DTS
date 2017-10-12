DTS_APP.controller('Scr_General_Detail_Controller',function($scope){
 	
 	$scope.Data = {};
 	
 	$scope.Chart_Roles =
 	[
  {
    "Value": "Espacio_Utilizado",
    "Es": "Espacio Utilizado"
  },
  {
    "Value": "Devoluciones",
    "Es": "Devoluciones"
  },
  {
    "Value": "Rendimiento_Visitas",
    "Es": "Rendimiento Visitas"
  },
  {
    "Value": "A_Tiempo",
    "Es": "A Tiempo"
  },
  {
    "Value": "Desatiempo",
    "Es": "Desatiempo"
  },
  {
    "Value": "Efectividad_Entrega",
    "Es": "Efectividad Entrega"
  },
  {
    "Value": "Merma",
    "Es": "Merma"
  }
];
$scope.Chart_Roles_Checked =  angular.copy($scope.Chart_Roles);

 	$scope.init = function(){
 	    $scope.Show_Components.Main_Menu = true;
        $scope.Show_Components.SubMenu_Maintenance = true;
        $scope.Show_Components.Login = true;

		$scope.Dashboard_Show = true;
		$scope.Detail_Show = false;
 	//	$('#Charging').modal('show');
 		$scope.Show_All_Chart();
 		//$scope.Select_Data(Filter);
    };
 	
  	
  	   $scope.Select_Data = function(Filter) {
        try{
        	
        var Request = {
             'Method_Name': 'Select_Data_Graph',
             'Data_Trip': {
                 'Company': eflowDTS.Session.Company.Identifier,
                 'Start_Date':  {
                		'$gte': new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        '$lte': new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		}
                		
             },
             'Fields_Trip': {

             },
             'Data_Visit_Point': {
                 'Company': eflowDTS.Session.Company.Identifier,
                 'Start_Date':  {
                		'$gte': new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        '$lte': new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		}
             },
             'Fields_Visit_Point': {

             },
             'Data_Item': {
                 'Company': eflowDTS.Session.Company.Identifier,
                 'Start_Date':  {
                		'$gte': new Date(Filter.Start_Date).getTime()-(18)*60*60*1000+(24)*60*60*1000,
                        '$lte': new Date(Filter.End_Date).getTime()+(5)*60*60*1000+(24)*60*60*1000
                		}
             },
             'Fields_Item': {

             },
             'Data_Vehicle': {
                 'Company': eflowDTS.Session.Company.Identifier
             },
             'Fields_Vehicle': {

             },
            'DB':eflowDTS.Session.DB
         };

         var onSuccess = function(Response) {
         
		$scope.Dashboard_Show = false;
		$scope.Detail_Show=true;
         $scope.Data = Response;
        
             $scope.Generate_Percentages(Response);
             setTimeout(function() {
                 $('#Charging').modal('hide');
             }, 2000);
          
          google.charts.load('current', { packages: ['corechart', 'bar']  });
          
          google.charts.setOnLoadCallback(function() {
           
           $scope.Generate_Charts();
         
          });
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
  	
  
  	
  	$scope.Generate_Percentages = function(Data) {

     $scope.Percentage_1 = (Get_Total_Weight_Charge(Data.Trip) / Get_Total_Weight_Vehicle(Data.Vehicle, Get_Vehicles_ID(Data.Trip))) * 100;
     $scope.Percentage_2 = (Get_Total_Order_With_Unit_Damaged(Data.Visit_Point) / Data.Visit_Point.length) * 100;   
     $scope.Percentage_3 = (Get_Total_Unit_Rejected(Data.Trip) / Get_Total_Unit(Data.Trip)) * 100;
     $scope.Percentage_4  = (Get_Total_Visit_Point_First_Pass(Data.Trip) / Get_Total_Visit_Point(Data.Trip)) * 100;
     $scope.Percentage_5  = (Get_Total_Visit_Point_In_Time(Data.Trip) / Get_Total_Visit_Point(Data.Trip)) * 100;
     $scope.Percentage_6 = (Get_Total_Visit_Point_Off_Time(Data.Trip) / Get_Total_Visit_Point(Data.Trip)) * 100;
     $scope.Percentage_7 = (Get_Total_Unit_Confirmed(Data.Trip) / Get_Total_Unit(Data.Trip)) * 100;
     $scope.Percentage_8= (Get_Total_Unit_Damaged(Data.Trip) / Get_Total_Unit(Data.Trip)) * 100;
     

 };
  	
  	
  	 function Get_Total_Weight_Charge(Arr) {
     var Total_Weight = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Weight += Arr[i].Total_Weight;
     }

     return Total_Weight;
 	 };

 	function Get_Total_Weight_Vehicle(Arr_Vehicles, Arr_IDS) {
     var Total_Weight = 0;

     for (var i = 0; i < Arr_Vehicles.length; i++) {
         var Vehi = Arr_Vehicles[i];
         for (var x = 0; x < Arr_IDS.length; x++) {
             var ID = Arr_IDS[x];
             if (Vehi.ID_Truck === ID) {
                 Total_Weight += Vehi.Weight;
                 break;
             }
         }
     }
     
     return Total_Weight;
     };

 function Get_Vehicles_ID(Arr) {
     var IDs = [];

     for (var i = 0; i < Arr.length; i++) {
         if (!Exist_In_Array(IDs, Arr[i].ID_Truck)) {
             IDs.push(Arr[i].ID_Truck);
         }
     }

     return IDs;
 };

 
 function Get_Total_Order_With_Unit_Damaged(Arr) {
     var Total_Order = 0;

     for (var i = 0; i < Arr.length; i++) {
         if (Arr[i].Total_Units_Damaged > 0) {
             Total_Order += Arr[i].Total_Jobs_Damaged;
         }
     }

     return Total_Order;
 };

 function Get_Total_Unit_Rejected(Arr) {
     var Total_Unit = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Unit += Arr[i].Total_Units_Rejected;
     }

     return Total_Unit;
 };

 function Get_Total_Unit(Arr) {
     var Total_Unit = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Unit += Arr[i].Total_Units;
     }

     return Total_Unit;
 };


 function Get_Time_In_Transit(Arr_Trip, Visit_Point) {
     var Time_Transit = 0;
     var Trip = {};
     for (var i = 0; i < Arr_Trip.length; i++) {
         if (Arr_Trip[i].Trip_ID === Visit_Point.Trip_ID) {
             Trip = Arr_Trip[i];
             break;
         }
     }
     Time_Transit = (((Visit_Point.Start_Date ? Visit_Point.Start_Date : 0) - (Trip.Start_Date ? Trip.Start_Date : 0)) / 1000) / 60;
     return Time_Transit;
 };


 function Get_Time_Visit(Visit_Point) {
     var Time_Visit = 0;

     Time_Visit = Visit_Point.Duration;

     return Time_Visit;
 };
 
 function Get_Total_Visit_Point_First_Pass(Arr) {
     var Total_Order = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Order += Arr[i].Total_Doc_Perfect;
     }

     return Total_Order;
 };

 function Get_Total_Visit_Point(Arr) {
     var Total_Visit_Point = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Visit_Point += Arr[i].Total_VisitPoint;
     }

     return Total_Visit_Point;
 };

 function Get_Total_Visit_Point_In_Time(Arr) {
     var Visit_Point_In_Time = 0;

     for (var i = 0; i < Arr.length; i++) {
         Visit_Point_In_Time += Arr[i].Total_VisitPoint_In_Time;
     }

     return Visit_Point_In_Time;
 };

 function Get_Total_Visit_Point_Off_Time(Arr) {
     var Visit_Point_Off_Time = 0;

     for (var i = 0; i < Arr.length; i++) {
         Visit_Point_Off_Time += Arr[i].Total_VisitPoint_Off_Time;
     }

     return Visit_Point_Off_Time;
 };

 function Get_Total_Unit_Confirmed(Arr) {
     var Total_Unit = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Unit += Arr[i].Total_Units_Confirmed;
     }

     return Total_Unit;
 }

 function Get_Total_Unit_Damaged(Arr) {
     var Total_Unit = 0;

     for (var i = 0; i < Arr.length; i++) {
         Total_Unit += Arr[i].Total_Units_Damaged;
     }

     return Total_Unit;
 }; 
  
  $scope.Separated_By_Sector = function(Arr) {
     var Obj = {};
     for (var i = 0; i < Arr.length; i++) {

         if (!Obj.hasOwnProperty(Arr[i].Route_Name)) {
             Obj[Arr[i].Route_Name] = [];
             Obj[Arr[i].Route_Name].push(Arr[i]);
         } else {
             Obj[Arr[i].Route_Name].push(Arr[i]);
         }

     }
     return Obj;
 };
 
  $scope.Separated_By_Period = function(Data, Period) {
        var Group = {};
 
        for (var i = 0; i < Data.length; i++) {
            if (!Group.hasOwnProperty(Data[i][Period])) {
                Group[Data[i][Period]] = [];
                Group[Data[i][Period]].push(Data[i]);
            } else {
                Group[Data[i][Period]].push(Data[i]);
            }
        }
 
        return Group;
    };
  	
  	 $scope.Generate_Charts = function(){
  	 	
  	 	$scope.Chart_Time($scope.Data.Trip);
  	 	$scope.Chart_Incidents($scope.Data.Trip);
  	 	$scope.Chart_Jobs($scope.Data.Trip);
  	 	$scope.Chart_Units($scope.Data.Trip);
  	 	$scope.Chart_General("Year",$scope.Data.Trip);
  	 	
  	 	
  	 };
  	
  	
  	 $scope.Chart_Time = function(Par) {
     var Data = [];
     
    if(Par.length === 'undefined'){
    	Data.push(["Sector", "Total Puntos Visita", "Total Puntos Visita A tiempo", "Total Puntos Visita en desatiempo", "Total Kilometros",
         "Duración Total", "Promedio de duración por cliente"
     ]);
    for (key in Obj) {
         var Trip = {
             "Total_VisitPoint": 0,
             "Total_VisitPoint_In_Time": 0,
             "Total_VisitPoint_Off_Time": 0,
             "Average_Time_Visit": 0,
             "Total_Kilometer": 0,
             "Total_Duration": 0
         };
         Trip.Route_Name = key;
         for (var i = 0; i < Obj[key].length; i++) {
             var Trip_Unique = Obj[key][i];
             Trip.Total_VisitPoint += Trip_Unique.Total_VisitPoint;
             Trip.Total_VisitPoint_In_Time += Trip_Unique.Total_VisitPoint_In_Time;
             Trip.Total_VisitPoint_Off_Time += Trip_Unique.Total_VisitPoint_Off_Time;
             Trip.Total_Kilometer += Trip_Unique.Total_Kilometer;
             Trip.Total_Duration += Trip_Unique.Total_Duration;
         }

         Data.push([Trip.Route_Name, Trip.Total_VisitPoint, Trip.Total_VisitPoint_In_Time, Trip.Total_VisitPoint_Off_Time, Trip.Total_Kilometer, Trip.Total_Duration, Math.round(Trip.Total_Duration / Trip.Total_VisitPoint)]);
     }	
    }else{
    	Data.push(["Total Puntos Visita", "Total Puntos Visita A tiempo", "Total Puntos Visita en desatiempo", "Total Kilometros",
         "Duración Total", "Promedio de duración por cliente"
     ]);
      var Trip = {
             "Total_VisitPoint": 0,
             "Total_VisitPoint_In_Time": 0,
             "Total_VisitPoint_Off_Time": 0,
             "Average_Time_Visit": 0,
             "Total_Kilometer": 0,
             "Total_Duration": 0
         };
    	for (var i = 0; i < Par.length; i++) {
             var Trip_Unique = Par[i];
             Trip.Total_VisitPoint += Trip_Unique.Total_VisitPoint;
             Trip.Total_VisitPoint_In_Time += Trip_Unique.Total_VisitPoint_In_Time;
             Trip.Total_VisitPoint_Off_Time += Trip_Unique.Total_VisitPoint_Off_Time;
             Trip.Total_Kilometer += Trip_Unique.Total_Kilometer;
             Trip.Total_Duration += Trip_Unique.Total_Duration;
         }
         Data.push([Trip.Total_VisitPoint, Trip.Total_VisitPoint_In_Time, Trip.Total_VisitPoint_Off_Time, Trip.Total_Kilometer, Trip.Total_Duration, Math.round(Trip.Total_Duration / Trip.Total_VisitPoint)]);
    }
     
     var data_chart = google.visualization.arrayToDataTable(Data);

     var options = {
         legend: {
             position: 'top',
             maxLines: 3,
             textStyle: {
                 color: 'black',
                 fontSize: 16
             }
         },
         isStacked: true,
         chart: {
             title: '',
             subtitle: '',
         }
     };

     var chart = new google.charts.Bar(document.getElementById('Chart_Time'));

     chart.draw(data_chart, options);

 }
  	
  	
  	
  	$scope.Chart_Incidents = function(Par) {

     var Data = [];
     
     if(Par.length === 'undefined'){
     Data.push([
         "Sector",
         "Espera excesiva en el local",
         "Cancelación de entrega en sitio",
         "Local cerrado",
         "Falla mecánica en vehículo",
         "Diferencia entre entregado y pedido",
         "Mercadería en mal estado",
         "Tránsito excesivo en ruta",
         "No tiene dinero",
         "Asalto"
     ]);

     for (key in Obj) {
         var Trip = {
             "Total_Incidents": 0,
             "Excessive_Wait_Incidents": 0,
             "Canceled_Order_Incidents": 0,
             "Closed_Local_Incidents": 0,
             "Damaged_Truck_Incidents": 0,
             "Order_With_Difference_Incidents": 0,
             "Damaged_Product_Incidents": 0,
             "Excessive_Transit_Incidents": 0,
             "No_Money_Incidents": 0,
             "Assault_Incidents": 0
         };

         Trip.Sector = key;
         for (var i = 0; i < Obj[key].length; i++) {
             var Trip_Unique = Obj[key][i];
             Trip.Total_Incidents += Trip_Unique.Total_Incidents;
             Trip.Excessive_Wait_Incidents += Trip_Unique.Excessive_Wait_Incidents;
             Trip.Canceled_Order_Incidents += Trip_Unique.Canceled_Order_Incidents;
             Trip.Closed_Local_Incidents += Trip_Unique.Closed_Local_Incidents;
             Trip.Damaged_Truck_Incidents += Trip_Unique.Damaged_Truck_Incidents;
             Trip.Order_With_Difference_Incidents += Trip_Unique.Order_With_Difference_Incidents;
             Trip.Damaged_Product_Incidents += Trip_Unique.Damaged_Product_Incidents;
             Trip.Excessive_Transit_Incidents += Trip_Unique.Excessive_Transit_Incidents;
             Trip.No_Money_Incidents += Trip_Unique.No_Money_Incidents;
             Trip.Assault_Incidents += Trip_Unique.Assault_Incidents;
         }

         Data.push([Trip.Sector + " [ " + Trip.Total_Incidents + "].",
             Trip.Excessive_Wait_Incidents,
             Trip.Canceled_Order_Incidents,
             Trip.Closed_Local_Incidents,
             Trip.Damaged_Truck_Incidents,
             Trip.Order_With_Difference_Incidents,
             Trip.Damaged_Product_Incidents,
             Trip.Excessive_Transit_Incidents,
             Trip.No_Money_Incidents,
             Trip.Assault_Incidents
         ]);

     }
     
      var Data_Chart = google.visualization.arrayToDataTable(Data);

     var options = {
         width: 600,
         height: 400,
         legend: {
             position: 'top',
             maxLines: 9
         },
         bar: {
             groupWidth: '75%'
         },
         isStacked: true,
     };

     var chart = new google.visualization.ColumnChart(document.getElementById('Chart_Incident'));
     chart.draw(Data_Chart, options);


     }else{   	   
     
     Data.push(["Incidente","Cantidad"]);
     var Trip = {
             "Excessive_Wait_Incidents": 0,
             "Canceled_Order_Incidents": 0,
             "Closed_Local_Incidents": 0,
             "Damaged_Truck_Incidents": 0,
             "Order_With_Difference_Incidents": 0,
             "Damaged_Product_Incidents": 0,
             "Excessive_Transit_Incidents": 0,
             "No_Money_Incidents": 0,
             "Assault_Incidents": 0
         };
         
   	for (var i = 0; i < Par.length; i++) {
             var Trip_Unique = Par[i];
             Trip.Excessive_Wait_Incidents += Trip_Unique.Excessive_Wait_Incidents;
             Trip.Canceled_Order_Incidents += Trip_Unique.Canceled_Order_Incidents;
             Trip.Closed_Local_Incidents += Trip_Unique.Closed_Local_Incidents;
             Trip.Damaged_Truck_Incidents += Trip_Unique.Damaged_Truck_Incidents;
             Trip.Order_With_Difference_Incidents += Trip_Unique.Order_With_Difference_Incidents;
             Trip.Damaged_Product_Incidents += Trip_Unique.Damaged_Product_Incidents;
             Trip.Excessive_Transit_Incidents += Trip_Unique.Excessive_Transit_Incidents;
             Trip.No_Money_Incidents += Trip_Unique.No_Money_Incidents;
             Trip.Assault_Incidents += Trip_Unique.Assault_Incidents;
         }
	Data.push(["Espera excesiva en el local",Trip.Excessive_Wait_Incidents]);
    Data.push(["Cancelación de entrega en sitio",Trip.Canceled_Order_Incidents]);
    Data.push(["Local cerrado",Trip.Closed_Local_Incidents]);
    Data.push(["Falla mecánica en vehículo",Trip.Damaged_Truck_Incidents]);
    Data.push(["Diferencia entre entregado y pedido",Trip.Order_With_Difference_Incidents]);
    Data.push(["Mercadería en mal estado",Trip.Damaged_Product_Incidents]);
    Data.push(["Tránsito excesivo en ruta",Trip.Excessive_Transit_Incidents]);
    Data.push(["No tiene dinero",Trip.No_Money_Incidents]);
    Data.push(["Asalto",Trip.Assault_Incidents]);
   
    var Data_Chart = google.visualization.arrayToDataTable(Data);

    var options = {
          title: 'Incidentes',
          pieHole: 0.4,
        };

   var chart = new google.visualization.PieChart(document.getElementById('Chart_Incident'));
   chart.draw(Data_Chart, options);
    }
   	
 }; 
  	
  	$scope.Chart_Units = function(Par) {
     var Data = [];
     
     if(Par.length === 'undefined'){
     	
     	Data.push(["Sector", "Total de Unidades", "Unidades Confirmadas", "Unidades Rechazadas", "Unidades Dañadas", "Unidades Faltantes", "Unidades Vencidas", "Unidades Otras"]);

     for (key in Obj) {
         var Trip = {
             "Total_Units": 0,
             "Total_Units_Confirmed": 0,
             "Total_Units_Rejected": 0,
             "Total_Units_Damaged": 0,
             "Total_Units_Missing": 0,
             "Total_Units_Expired": 0,
             "Total_Units_Other": 0,
         };
         Trip.Route_Name = key;
         for (var i = 0; i < Obj[key].length; i++) {
             var Trip_Unique = Obj[key][i];
             Trip.Total_Units += Trip_Unique.Total_Units;
             Trip.Total_Units_Confirmed += Trip_Unique.Total_Units_Confirmed;
             Trip.Total_Units_Rejected += Trip_Unique.Total_Units_Rejected;
             Trip.Total_Units_Damaged += Trip_Unique.Total_Units_Damaged;
             Trip.Total_Units_Missing += Trip_Unique.Total_Units_Missing;
             Trip.Total_Units_Expired += Trip_Unique.Total_Units_Expired;
             Trip.Total_Units_Other += Trip_Unique.Total_Units_Other;
         }

         Data.push([Trip.Route_Name, Trip.Total_Units, Trip.Total_Units_Confirmed, Trip.Total_Units_Rejected, Trip.Total_Units_Damaged, Trip.Total_Units_Missing, Trip.Total_Units_Expired, Trip.Total_Units_Other]);
     }
  }else{
 		Data.push(["Total de Unidades", "Unidades Confirmadas", "Unidades Rechazadas", "Unidades Dañadas", "Unidades Faltantes", "Unidades Vencidas", "Unidades Otras"]);
 		
 		 var Trip = {
             "Total_Units": 0,
             "Total_Units_Confirmed": 0,
             "Total_Units_Rejected": 0,
             "Total_Units_Damaged": 0,
             "Total_Units_Missing": 0,
             "Total_Units_Expired": 0,
             "Total_Units_Other": 0,
         };
         for (var i = 0; i < Par.length; i++) {
             var Trip_Unique = Par[i];
             Trip.Total_Units += Trip_Unique.Total_Units;
             Trip.Total_Units_Confirmed += Trip_Unique.Total_Units_Confirmed;
             Trip.Total_Units_Rejected += Trip_Unique.Total_Units_Rejected;
             Trip.Total_Units_Damaged += Trip_Unique.Total_Units_Damaged;
             Trip.Total_Units_Missing += Trip_Unique.Total_Units_Missing;
             Trip.Total_Units_Expired += Trip_Unique.Total_Units_Expired;
             Trip.Total_Units_Other += Trip_Unique.Total_Units_Other;
         }

         Data.push([Trip.Total_Units, Trip.Total_Units_Confirmed, Trip.Total_Units_Rejected, Trip.Total_Units_Damaged, Trip.Total_Units_Missing, Trip.Total_Units_Expired, Trip.Total_Units_Other]);
 		
  }
     var data_chart = google.visualization.arrayToDataTable(Data);

     var options = {
         legend: {
             position: 'top',
             maxLines: 3,
             textStyle: {
                 color: 'black',
                 fontSize: 16
             }
         },
         isStacked: true,
         chart: {
             title: '',
             subtitle: '',
         }
     };

     var chart = new google.charts.Bar(document.getElementById('Chart_Product'));

     chart.draw(data_chart, options);
 
 };
  	
  	
  	$scope.Chart_Jobs = function(Par) {
     var Data = [];
     
     if(Par.length === 'undefined'){
     Data.push(["Sector", "Total de Órdenes", "Órdenes Confirmadas", "Órdenes Rechazadas", "Órdenes Dañadas", "Órdenes Faltantes", "Órdenes Vencidas", "Órdenes Otras", "Órdenes Mixtas"]);

     for (key in Obj) {
         var Trip = {
             "Total_Jobs": 0,
             "Total_Jobs_Confirmed": 0,
             "Total_Jobs_Rejected": 0,
             "Total_Jobs_Damaged": 0,
             "Total_Jobs_Missing": 0,
             "Total_Jobs_Expired": 0,
             "Total_Jobs_Other": 0,
         };
         Trip.Route_Name = key;
         for (var i = 0; i < Obj[key].length; i++) {
             var Trip_Unique = Obj[key][i];
             Trip.Total_Jobs += Trip_Unique.Total_Jobs;
             Trip.Total_Jobs_Confirmed += Trip_Unique.Total_Jobs_Confirmed;
             Trip.Total_Jobs_Rejected += Trip_Unique.Total_Jobs_Rejected;
             Trip.Total_Jobs_Damaged += Trip_Unique.Total_Jobs_Damaged;
             Trip.Total_Jobs_Missing += Trip_Unique.Total_Jobs_Missing;
             Trip.Total_Jobs_Expired += Trip_Unique.Total_Jobs_Expired;
             Trip.Total_Jobs_Other += Trip_Unique.Total_Jobs_Other;
         }

         Data.push([Trip.Route_Name, Trip.Total_Jobs, Trip.Total_Jobs_Confirmed, Trip.Total_Jobs_Rejected, Trip.Total_Jobs_Damaged, Trip.Total_Jobs_Missing, Trip.Total_Jobs_Expired, Trip.Total_Jobs_Other, Trip.Total_Jobs - (Trip.Total_Jobs_Confirmed + Trip.Total_Jobs_Rejected + Trip.Total_Jobs_Damaged + Trip.Total_Jobs_Missing + Trip.Total_Jobs_Expired + Trip.Total_Jobs_Other)]);
     }
     
     
     
     
 }else{
 	Data.push(["Total de Órdenes", "Órdenes Confirmadas", "Órdenes Rechazadas", "Órdenes Dañadas", "Órdenes Faltantes", "Órdenes Vencidas", "Órdenes Otras", "Órdenes Mixtas"]);
 	
 	
         var Trip = {
             "Total_Jobs": 0,
             "Total_Jobs_Confirmed": 0,
             "Total_Jobs_Rejected": 0,
             "Total_Jobs_Damaged": 0,
             "Total_Jobs_Missing": 0,
             "Total_Jobs_Expired": 0,
             "Total_Jobs_Other": 0,
         };
         for (var i = 0; i < Par.length; i++) {
             var Trip_Unique = Par[i];
             Trip.Total_Jobs += Trip_Unique.Total_Jobs;
             Trip.Total_Jobs_Confirmed += Trip_Unique.Total_Jobs_Confirmed;
             Trip.Total_Jobs_Rejected += Trip_Unique.Total_Jobs_Rejected;
             Trip.Total_Jobs_Damaged += Trip_Unique.Total_Jobs_Damaged;
             Trip.Total_Jobs_Missing += Trip_Unique.Total_Jobs_Missing;
             Trip.Total_Jobs_Expired += Trip_Unique.Total_Jobs_Expired;
             Trip.Total_Jobs_Other += Trip_Unique.Total_Jobs_Other;
         }

         Data.push([Trip.Total_Jobs, Trip.Total_Jobs_Confirmed, Trip.Total_Jobs_Rejected, Trip.Total_Jobs_Damaged, Trip.Total_Jobs_Missing, Trip.Total_Jobs_Expired, Trip.Total_Jobs_Other, Trip.Total_Jobs - (Trip.Total_Jobs_Confirmed + Trip.Total_Jobs_Rejected + Trip.Total_Jobs_Damaged + Trip.Total_Jobs_Missing + Trip.Total_Jobs_Expired + Trip.Total_Jobs_Other)]);
 }

     var data_chart = google.visualization.arrayToDataTable(Data);

     var options = {
         chart: {
             title: '',
             subtitle: '', 
         }
     };

     var chart = new google.charts.Bar(document.getElementById('Chart_Order'));

     chart.draw(data_chart, options);
 }
  	
  	
  	$scope.Chart_General = function(Period,Data){
  		var Obj = $scope.Separated_By_Period(Data, Period);
  		if($scope.Chart_Roles_Checked.length === 0){
  			$scope.Chart_Roles_Checked = angular.copy($scope.Chart_Roles);  			
  		}
  		var Data = [];
      var Data_Header = [];
      Data_Header.push("Periodo");
      for(var i = 0; i < $scope.Chart_Roles_Checked.length; i++){
		      	Data_Header.push($scope.Chart_Roles_Checked[i].Es);
      }
     // Data.push(["Periodo","Espacio Utilizado",/*"Orden Producto Dañado",*/"Devoluciones","Rendimiento Visitas","A Tiempo","Desatiempo","Efectividad Entrega","Merma"]);
      Data.push(Data_Header);
      for(key in Obj){      	
    var Trip = {
    "Espacio_Utilizado":0,
    /*"Orden_Producto_Danado":0,*/
    "Devoluciones":0,
    "Rendimiento_Visitas":0,
    "A_Tiempo":0, 
    "Desatiempo":0,
    "Efectividad_Entrega":0,
    "Merma":0    
      };
      Trip.Period = key;  
      
     Trip.Espacio_Utilizado = (Get_Total_Weight_Charge(Obj[key]) / Get_Total_Weight_Vehicle($scope.Data.Vehicle, Get_Vehicles_ID(Obj[key]))) * 100;

     //Trip.Orden_Producto_Danado = (Get_Total_Order_With_Unit_Damaged(Data.Visit_Point) / Data.Visit_Point.length) * 100;

     Trip.Devoluciones = (Get_Total_Unit_Rejected(Obj[key]) / Get_Total_Unit(Obj[key])) * 100;

     Trip.Rendimiento_Visitas = (Get_Total_Visit_Point_First_Pass(Obj[key]) / Get_Total_Visit_Point(Obj[key])) * 100;

     Trip.A_Tiempo = (Get_Total_Visit_Point_In_Time(Obj[key]) / Get_Total_Visit_Point(Obj[key])) * 100;

     Trip.Desatiempo = (Get_Total_Visit_Point_Off_Time(Obj[key]) / Get_Total_Visit_Point(Obj[key])) * 100;

     Trip.Efectividad_Entrega = (Get_Total_Unit_Confirmed(Obj[key]) / Get_Total_Unit(Obj[key])) * 100;

     Trip.Merma = (Get_Total_Unit_Damaged(Obj[key]) / Get_Total_Unit(Obj[key])) * 100;     
       
       var Data_Colums = [];
       Data_Colums.push(Trip.Period);
       for(var k = 0; k < $scope.Chart_Roles_Checked.length; k++){
       	Data_Colums.push(Trip[$scope.Chart_Roles_Checked[k].Value]); 
       }
    // Data.push([Trip.Period,Trip.Espacio_Utilizado+"%"/*,Trip.Orden_Producto_Danado+"%"*/,Trip.Devoluciones+"%",Trip.Rendimiento_Visitas+"%",Trip.A_Tiempo+"%",Trip.Desatiempo+"%",Trip.Efectividad_Entrega+"%",Trip.Merma+"%"]); 
      Data.push(Data_Colums); 
      }  
      
 var data_chart = google.visualization.arrayToDataTable(Data);
 
        var options = {
          chart: {
            title: '',
            subtitle: '',
          }
        };
 
        var chart = new google.charts.Bar(document.getElementById('General_Charts'));
 
        chart.draw(data_chart, options);
      };
      
  	
  	 $scope.Switch_Folder_Data = function(tipo) {
     try {

         if ($scope["Show_" + tipo]) {
             $scope["Class_" + tipo] = "fa fa-minus";
         } else {
             $scope["Class_" + tipo] = "fa fa-plus";
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
		
	var Arr = ["Chart1","Chart2","Chart3","Chart4","Chart5"];
		
     for(var i = 0; i < Arr.length; i++){
        
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