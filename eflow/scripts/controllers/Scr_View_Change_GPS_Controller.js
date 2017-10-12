var mapNew;
var mapOld;
DTS_APP.controller('Scr_View_Change_GPS_Controller', function($scope) {

	$scope.init = function() {
		try {
			$scope.Show_Map_Old = true;
			$scope.Show_Map_New = true;
			$scope.ShowMaps = true;
			$scope.Show_List = true;
			Set_Current_Page();
			$('#Charging').modal('show');
			Select_Change_GPS();

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_View_Change_GPS_Controller",
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

	function Load_Init_Map() {
		try {

			var div = document.getElementById('Map_VisitPoint_GPS_NEW');

			if (div) {

				mapNew = new GMaps({
					div: div,
					lat: eflowDTS.Session.Company.Location.Latitud,
					lng: eflowDTS.Session.Company.Location.Longitud,
					zoom: 12,
					tilesloaded: function(e) {
						GMaps.off('tilesloaded', mapNew);
						setTimeout(function() {
							//Add_Markers();
							$('#Charging').modal('hide');
						}, 3000);
					}
				});
			}

			var div2 = document.getElementById('Map_VisitPoint_GPS_OLD');

			if (div2) {

				mapOld = new GMaps({
					div: div2,
					lat: eflowDTS.Session.Company.Location.Latitud,
					lng: eflowDTS.Session.Company.Location.Longitud,
					zoom: 12,
					tilesloaded: function(e) {
						GMaps.off('tilesloaded', mapOld);
						setTimeout(function() {
							//Add_Markers();
							$('#Charging').modal('hide');
						}, 3000);
					}
				});
			}

			$scope.ShowMaps = false;

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_View_Change_GPS",
					Method: "Load_Init_Map",
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

	$scope.Show_Case = function(Case) {



		setTimeout(function() {
			$scope.$apply(function() {
				$scope.ShowMaps = true;
				$scope.Case_Form = Case;
			});
		}, 1);

		var JsonData = {
			'Method_Name': 'Select_All_Visit_Point',
			'Data': {
				'Company': eflowDTS.Session.Company.Identifier,
				'ID_Location': Case.Identificador_Visit_Point
			},
			'Fields': {

			},
			'DB': eflowDTS.Session.DB
		};

		var onSuccess = function(Response) {
			$scope.VP = Response[0];
			Add_Markers("OLD", {
				'Latitude': Response[0].Latitude,
				'Longitude': Response[0].Longitude
			});
			Add_Markers("NEW", {
				'Latitude': Case.Latitude,
				'Longitude': Case.Longitude
			});
		};

		var onError = function(e) {
			throw err;
		};

		Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);

	};

	$scope.Delete_Case = function(Case) {


		var Callback = function(result) {
			if (!result) {
				return;
			} else {
				var JsonData = {
					'Method_Name': 'Delete_Case_GPS',
					'Data': {
						'ID': Case._id.$id
					},
					'Fields': {

					},
					'DB': eflowDTS.Session.DB
				};

				var onSuccess = function(Response) {
					Select_Change_GPS();
				};

				var onError = function(e) {
					throw err;
				};

				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
			}

		};

		bootbox.confirm("¿Realmente desea descartar el cambio de ubicación?", Callback);
	};

$scope.Accept_Case = function(Case) {

		$scope.VP.Latitude = Case.Latitude;
		$scope.VP.Longitude = Case.Longitude;

		var JsonData = {
			'Method_Name': 'Update_Store_Case_Change_GPS',
			'Data': $scope.VP,
			'Case':Case,
			'DB': eflowDTS.Session.DB
		};

		var onSuccess = function(Response) {
			Select_Change_GPS();
		};
		
		var onError = function(e) {
			throw err;
		};

		Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);

	};

	$scope.Resize_Map = function(ID_Map) {
		switch (ID_Map) {
			case "OLD":
				{
					if (typeof mapOld === "object") {
						mapOld.refresh();
					}
					break;
				}
			case "NEW":
				{
					if (typeof mapNew === "object") {
						mapNew.refresh();
					}
					break;
				}
		}
	};


	function Add_Markers(Map, Coor) {
		try {

			switch (Map) {
				case 'OLD':
					{
						mapOld.removeMarkers();
						if (typeof Coor.Latitude === 'number' || typeof Coor.Longitude === 'number') {
							mapOld.addMarker({
								lat: Coor.Latitude,
								lng: Coor.Longitude,
								value: Coor,
								click: function(e) {
									mapOld.setCenter(Coor.Latitude, Coor.Longitude);
									mapOld.setZoom(17);
									mapOld.refresh();
								}
							});
						}

						mapOld.refresh();
						break;
					}
				case 'NEW':
					{
						mapNew.removeMarkers();
						if (typeof Coor.Latitude === 'number' || typeof Coor.Longitude === 'number') {
							mapNew.addMarker({
								lat: Coor.Latitude,
								lng: Coor.Longitude,
								value: Coor,
								click: function(e) {
									mapNew.setCenter(Coor.Latitude, Coor.Longitude);
									mapNew.setZoom(17);
									mapNew.refresh();
								}
							});
						}

						mapNew.refresh();
						break;
					}
			}




		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_View_Change_GPS",
					Method: "Add_Markers",
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
			//console.error(e);
		}
	};

	$scope.Resize = function() {
		try {
			if (typeof map === "object") {
				map.refresh();
			}

		} catch (e) {
			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_View_Change_GPS",
					Method: "Resize",
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

	function Select_Change_GPS() {
		try {
			var Query = {
				'Method_Name': 'Select_All_Change_GPS',
				'Data': {
					'Company': eflowDTS.Session.Company.DB_Name,
					'State': 'COMP'/*PEND*/
				},
				'Fields': {},
				'DB': eflowDTS.Session.DB
			};

			var Success = function(json) {
				$scope.Array_Change = json;
				Load_Init_Map();
			};

			var onError = function(e) {
				var erro = {
					Generated: true,
					Page: "Scr_View_Change_GPS",
					Method: "Select_Jobs",
					Description: "onError",
					User: eflowDTS.Session.Current_User.UserName,
					Company: eflowDTS.Session.Company.Identifier,
					Date: new Date().getTime(),
					Error: e
				};
				throw erro;
			};

			Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Query, Success, onError);

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_View_Change_GPS",
					Method: "Select_Jobs",
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