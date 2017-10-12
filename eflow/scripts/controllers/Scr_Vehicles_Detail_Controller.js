var map;
var drawingManager;
var placeIdArray = [];
var polylines = [];
var snappedCoordinates = [];

DTS_APP.controller('Scr_Vehicles_Detail_Controller', function($scope) {
	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.numberOfPages = function() {
		if ($scope.PV) {
			return Math.ceil($scope.PV.Jobs.length / $scope.pageSize);
		}
		return 0;

	};

	$scope.init = function() {
		try {
			$scope.Show_Message = false;
			if (eflowDTS.Session.Ram.page === "Vehicles_Online") {
				$scope.Show_Message = true;
			}
			Set_Current_Page();
			Load_Map();
			$scope.Load_Visit_Point();
			$scope.Load_Route();
			$scope.User = eflowDTS.Session.Ram.UserControl;
			$scope.Company = eflowDTS.Session.Company.Identifier;

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
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


	$scope.See_Info = function(jobs) {
		try {
			eflowDTS.Session.Ram.Current_Incidents = jobs;
			location.href = "#/dashboard";

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "See_Info",
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


	$scope.Download_Certificate = function(PV) {
		try {

			window.open(PV.Certificate.PDF);

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Download_Certificate",
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



	$scope.Message = function(TextAsunto, TextMessage) {
		try {
			if (TextAsunto == null || TextMessage == null || TextAsunto === "" || TextMessage === "") {

				bootbox.dialog({
					title: "¡Alerta!",
					message: "Es necesario que digite el mensaje y el asunto para guardar la notificación.",
					buttons: {
						main: {
							label: 'Ok!',
							className: 'btn-primary'
						}
					}
				});

			}
			var JsonData = {
				'Method_Name': 'Insert_Notification',
				'Data': {
					"Collection_Info": {
						"Collection_Name": "Store_Notification",
						"Collection_Schema": "'_id.$id,User,ID_Truck,Company,Estimated_Date,State,Matter,Details,[User+ID_Truck+Company],Transferring_State'"

					},
					"Control": {
						"Creation_Date": new Date().getTime(),
						"Created_User": eflowDTS.Session.Current_User.UserName
					},
					"Company": eflowDTS.Session.Company.Identifier,
					"User": eflowDTS.Session.Ram.UserControl.User,
					"ID_Truck": eflowDTS.Session.Ram.UserControl.ID_Truck,
					"Estimated_Date": eflowDTS.Session.Ram.UserControl.Date, //new Date(new Date().format('yyyy-mm-dd')).getTime()+eflowDTS.Time.Difference,
					"State_Created": true,
					"State_Sent": false,
					"State_Received": false,
					"State_Open": false,
					"State": "Unread",
					"Matter": TextAsunto,
					"Detail": TextMessage,
					"Transferring_State": "Pending_To_Mobile"
				},
				'DB': eflowDTS.Session.DB
			};
			var onSuccess = function(onSuccess) {

				bootbox.dialog({
					title: "¡Alerta!",
					message: "Notificación Enviada",
					buttons: {
						main: {
							label: 'Ok',
							className: 'btn-primary'
						}
					}
				});
				$scope.TextAsunto = "";
				$scope.TextMessage = "";
			};
			var onError = function(onError) {
				var erro = {
					Generated: true,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Message",
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



		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Message",
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



	function Load_Map() {
		try {
			//if(navigator.geolocation){

			//var onSuccess = function(pos){

			var div = document.getElementById('Map_Dashboard');

			if (div) {

				map = new GMaps({
					div: div,
					lat: eflowDTS.Session.Company.Location.Latitud,
					lng: eflowDTS.Session.Company.Location.Longitud,
					zoom: 12
				});

			}

			/*};
   		
   		navigator.geolocation.getCurrentPosition(onSuccess);
   		
   	}else{   		 		
   		
   			bootbox.dialog(
                {
                	title:"¡Alerta!",
                	message:"¡Notificación enviada!",
                	buttons:{
                	main:{
                		label:'Ok!',
                		className : 'btn-primary'
                		}
                }
                });
     	}*/


		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Load_Map",
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

	$scope.Open_Modal_Add_VisitPoint = function(jobs, type) {
		try {

			if (type === "Incidents") {
				$scope.Incidents = jobs;
				$scope.Show_Test = false;
				$scope.Show_Incidents = true;
			} else {
				$scope.Test = jobs;
				$scope.Show_Test = true;
				$scope.Show_Incidents = false;
			}
			$("#Modal_Add_VisitPoint").modal("show");
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
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
	$scope.Open_Modal_Add_VisitPoint_Test = function(jobs) {
		try {

			$scope.Notes = jobs;
			$("#Modal_Add_VisitPoint_Test").modal("show");
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Open_Modal_Add_VisitPoint_Test",
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

	$scope.Open_Modal_VisitPoint = function(jobs) {
		try {

			$scope.Details = jobs;
			$("#Modal_VisitPoint").modal("show");

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Open_Modal_VisitPoint",
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

	function Data_Charge(JsonArray) {
		try {
			if (JsonArray.length > 0) {


				$scope.ArrayJobs = JsonArray;
				$scope.Show_Summary = true;

				if (!map) {

					var div = document.getElementById('Map_Dashboard');

					if (div) {

						map = new GMaps({
							div: div,
							lat: JsonArray[0].Latitude,
							lng: JsonArray[0].Latitude,
							zoom: 12
						});
					}
				}

				for (var i = 0; i < JsonArray.length; i++) {

					var x = JsonArray[i];
					map.addMarker({
						lat: JsonArray[i].Latitude,
						lng: JsonArray[i].Longitude,
						icon: 'images/' + JsonArray[i].Visit_State + '.png',
						infoWindow: {
							content: '<h5>' + JsonArray[i].Name + '<h5>' +
								'<h5>' + JsonArray[i].Address + '<h5>'
						},
						value: JsonArray[i],
						click: function(e) {
							$scope.PV_Info(e.value);
						}
					});
				}
			}
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Data_Charge",
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

	$scope.PV_Info = function(obj) {
		try {

			$scope.Show_PV_General = false;
			$scope.Show_PV_Process = false;
			$scope.Show_PV_Aborted = false;
			$scope.Show_PV_Partial = false;
			$scope.Show_PV_Finalized = false;

			$scope.Show_PV = true;
			if (obj.Certificate) {
				$scope.Show_Certificate = true;
			} else {
				$scope.Show_Certificate = false;
			}
			if (obj.Notes.length === 0) {
				$scope.Show_Test = false;
			} else {
				$scope.Show_Test = true;
			}
			$scope.PV = obj;

			$scope.Show_Detail_Prod = false;
			$scope.Show_Incidentes = false;
			$scope.Show_Detail_Test = false;
			$scope.Show_Punto_Visita = true;

			var Incidents_Types = {
				"Excessive_Wait": "Espera excesiva en el local.",
				"Canceled_Order": "Cancelación de entrega en sitio.",
				"Closed_Local": "Local cerrado.",
				"Damaged_Truck": "Falla mecánica en vehículo.",
				"Order_With_Difference": "Diferencia entre entregado y pedido.",
				"Damaged_Product": "Mercadería en mal estado.",
				"Excessive_Transit": "Tránsito excesivo en ruta.",
				"No_Money": "No tiene dinero.",
				"Assault": "Asalto.",
			};

			if (obj.Visit_Point_Incidents.length === 0) {
				$scope.Show_Incidentes = false;
			} else {
				$scope.Show_Incidentes = true;
				$scope.Show_Inc = true;
				$scope.Notes_Incidentes = obj.Visit_Point_Incidents;
				for (var i = 0; i < $scope.Notes_Incidentes.length; i++) {
					$scope.Notes_Incidentes[i].Incident_TypeEs = Incidents_Types[$scope.Notes_Incidentes[i].Incident_Type];

					if ($scope.Notes_Incidentes[i].Notes.length === 0) {
						/* $scope.Notes_Incidentes[i].nota="No hay notas";
						//$scope.Show_Nota=true;
						//$scope.nota="No hay notas";
						$scope.Show_Boton1=false;
						$scope.Show_Boton=true;*/
					} else {
						/*$scope.Show_Boton=false;
						$scope.Show_Boton1=true;*/
					}
				}
			}
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "PV_Info",
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

	$scope.PV_Info_Prod = function(obj) {
		try {
			$scope.Prod = obj;
			$scope.Show_Detail_Prod = true;
			$scope.Show_Detail = true;
			$scope.Notes = obj.JobActions;
			for (var i = 0; i < $scope.Notes.length; i++) {
				if (!$scope.Notes[i].Notes === "No hay notas") {
					$scope.Show_Notes = true;
					$scope.Show_Buttons = false;
				} else {
					$scope.Show_Notes = false;
					$scope.Show_Buttons = true;
				}
			}
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "PV_Info_Prod",
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

	$scope.PV_Info_Test = function(obj) {
		try {
			$scope.Info_Test = obj.Notes;
			$scope.Show_Detail_Test = true;
			$scope.Show_DetailTest = true;
			if (!$scope.Info_Test.lengh === 0) {
				$scope.Show_Notes = true;
				$scope.Show_Buttons = false;
			} else {
				$scope.Show_Notes = false;
				$scope.Show_Buttons = true;
			}
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "PV_Info_Test",
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

	function Draw_Route(JsonArray) {
		try {
			if (JsonArray.length > 0) {
				var path = [];
				for (var i = 1; i < JsonArray.length; i++) {
					var Position = [];
					Position.push(JsonArray[i].Geolocation.Latitude);
					Position.push(JsonArray[i].Geolocation.Longitude);
					path.push(Position);
					map.drawRoute({
						origin: [JsonArray[i - 1].Geolocation.Latitude, JsonArray[i - 1].Geolocation.Longitude],
						destination: [JsonArray[i].Geolocation.Latitude, JsonArray[i].Geolocation.Longitude],
						travelMode: 'driving',
						strokeColor: '#131540',
						strokeOpacity: 0.6,
						strokeWeight: 6
					});
				}
				if (!map) {
					var div = document.getElementById('Map_Dashboard');
					if (div) {
						map = new GMaps({
							div: map,
							lat: JsonArray[0].Geolocation.Latitude,
							lng: JsonArray[0].Geolocation.Latitude,
							zoom: 12
						});
					}
				}
				map.drawPolyline({
					path: path,
					strokeColor: '#101010',
					strokeOpacity: 0.6,
					strokeWeight: 6
				});

			}

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Draw_Route",
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

	$scope.Load_Visit_Point = function() {
		try {
			var JsonData = {
				'Method_Name': 'Select_Jobs',
				'Data': {
					"Company": eflowDTS.Session.Company.Identifier,
					"User": eflowDTS.Session.Ram.UserControl.User,
					"ID_Truck": eflowDTS.Session.Ram.UserControl.ID_Truck,
					"Estimated_Date": eflowDTS.Session.Ram.UserControl.Date
				},
				'Fields': {

				},
				'DB': eflowDTS.Session.DB
			};

			var onError = function(JsonData) {
				var erro = {
					Generated: true,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Load_Visit_Point",
					Description: "onError",
					User: eflowDTS.Session.Current_User.UserName,
					Company: eflowDTS.Session.Company.Identifier,
					Date: new Date().getTime(),
					Error: JsonData
				};
				throw erro;

				console.log(e);
			};

			var onSuccess = function(JsonArray) {

				Data_Charge(JsonArray);

			};

			Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
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


	$scope.Load_Route = function() {
		try {
			var JsonData = {
				'Method_Name': 'Select_Geolocation',
				'Data': {
					"Company": eflowDTS.Session.Company.Identifier,
					"User": eflowDTS.Session.Ram.UserControl.User,
					"ID_Truck": eflowDTS.Session.Ram.UserControl.ID_Truck,
					"Estimated_Date": eflowDTS.Session.Ram.UserControl.Date
				},
				'Fields': {

				},
				'DB': eflowDTS.Session.DB
			};

			var onError = function(JsonData) {
				var erro = {
					Generated: true,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Load_Route",
					Description: "onError",
					User: eflowDTS.Session.Current_User.UserName,
					Company: eflowDTS.Session.Company.Identifier,
					Date: new Date().getTime(),
					Error: JsonData
				};
				throw erro;

				console.log(e);
			};

			var onSuccess = function(JsonArray) {
				//Draw_Route(JsonArray);	
				Draw_Road(JsonArray);
				if (JsonArray.length > 0) {
					map.removeMarkers();
					map.addMarker({
						lat: JsonArray[JsonArray.length - 1].Geolocation.Latitude,
						lng: JsonArray[JsonArray.length - 1].Geolocation.Longitude,
						icon: 'images/truck.png'
					});
				}
			};

			Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Vehicles_Detail_Controller",
					Method: "Load_Route",
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

	function Draw_Road(Arr_Geo) {
		var Arr_Path = [];
		if (Arr_Geo.length > 90) {
			for (var i = Arr_Geo.length - 90; i < Arr_Geo.length; i++) {
				Arr_Path.push(Arr_Geo[i].Geolocation.Latitude + "," + Arr_Geo[i].Geolocation.Longitude);
			}
		} else {
			for (var i = 0; i < Arr_Geo.length; i++) {
				Arr_Path.push(Arr_Geo[i].Geolocation.Latitude + "," + Arr_Geo[i].Geolocation.Longitude);
			}
		}


		$.get('https://roads.googleapis.com/v1/snapToRoads', {
			interpolate: true,
			key: "AIzaSyCRh45szzjPZ7j8xszFYH_5r7hvcUszCg4",
			path: Arr_Path.join('|')
		}, function(data) {
			processSnapToRoadResponse(data);
			drawSnappedPolyline();
		});
	}

	function processSnapToRoadResponse(data) {
		snappedCoordinates = [];
		placeIdArray = [];
		for (var i = 0; i < data.snappedPoints.length; i++) {
			var latlng = new google.maps.LatLng(
				data.snappedPoints[i].location.latitude,
				data.snappedPoints[i].location.longitude);
			snappedCoordinates.push(latlng);
			placeIdArray.push(data.snappedPoints[i].placeId);
		}
	}

	function drawSnappedPolyline() {
		/* var snappedPolyline = new google.maps.Polyline({
		   path: snappedCoordinates,
		   strokeColor: 'black',
		   strokeWeight: 3
		 });*/
		map.drawPolyline({
			path: snappedCoordinates,
			strokeColor: '#101010',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});

		/* snappedPolyline.setMap(map);*/
		polylines.push(snappedPolyline);
	}



});