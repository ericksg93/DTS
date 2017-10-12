DTS_APP.controller('Scr_Settings_Controller', function($scope) {

	$scope.init = function() {
		try {

			Set_Current_Page();
			$scope.Companys = {};
			if (!eflowDTS.Session.Company.Mails) {
				eflowDTS.Session.Company.Mails = []; 
			}
			if (!eflowDTS.Session.Company.Array_Questions) {
				eflowDTS.Session.Company.Array_Questions = []; 
			}
			if (!eflowDTS.Session.Company.Mails_Guide) {
				eflowDTS.Session.Company.Mails_Guide = [];
			}
			if (!eflowDTS.Session.Company.Enable_Poll) {
				eflowDTS.Session.Company.Enable_Poll = false;
			}
			
			$scope.Company = eflowDTS.Session.Company.Name;
			$scope.Image = eflowDTS.Session.Company.Logo;
			$scope.Array_License = eflowDTS.Session.Company.Settings.License;
			$scope.Array_User = eflowDTS.Session.Company.Settings.User;
			$scope.Array_Vehicle = eflowDTS.Session.Company.Settings.Vehicle;
			$scope.Array_Fuel = eflowDTS.Session.Company.Settings.Fuel;
			$scope.Array_Unity = eflowDTS.Session.Company.Settings.Unity;
			$scope.Array_Mail = eflowDTS.Session.Company.Mails;
			$scope.Array_Questions = eflowDTS.Session.Company.Array_Questions;
			$scope.Array_Mail_Guide = eflowDTS.Session.Company.Mails_Guide;
			$scope.Array_Report = eflowDTS.Session.Company.Settings.Report;
			$scope.Enable_Poll = eflowDTS.Session.Company.Enable_Poll;

			$scope.Show_Settings = true;
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Settings_Controller",
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

	$scope.Switch_Show = function(Show_Name) {

		var Arr_Show = ["Indicator", "PDF_Mail", "GUIDE_Mail", "Unity", "Fuel", "Vehicle", "License", "Logo"];

		for (var i = 0; i < Arr_Show.length; i++) {
			$scope["Show_Settings_" + Arr_Show[i]] = false;
			if (Arr_Show[i] === Show_Name) {
				$scope["Show_Settings_" + Arr_Show[i]] = true;
			}
		}

	};

	$scope.Upload_Image = function() {

		var file = document.getElementById('File_Image').files[0];
		$scope.Companys.Logo = file.name;

		var onSuccess = function(base64) {
			$scope.Image = base64;
			//$scope.LogoImage = base64;
			setInterval(function() {
				$scope.$apply();
			}, 0);
		};

		Resize_Image(file, onSuccess);

	};
	$scope.Remove_In_Array = function(Obj, Array) {
		try {
			Array_Remove(Array, Obj);

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Settings_Controller",
					Method: "Remove_In_Array",
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
	
	$scope.Guardar_Pregunta = function(Obj){
	    if(Obj.Question === null || Obj.Question === undefined ){
	       return; 
	    }
	    	    
	   $scope.Array_Questions.push({
	       Question:Obj.Question,
           Value:0
	   });
	   
	   $scope._Question = {};
	  
	};

	$scope.validate_Settings1 = function(Obj) {
		$scope.Array_Report = Obj;
	}
	$scope.validate_Settings = function(Obj, Arr) {
		try {
			if (Obj.Value === "" || Obj.Value === undefined || Obj.Description === "" || Obj.Description === undefined) {
				alert("Debe de ingresar los valores");

			} else {
				existe = false;
				for (var i = 0; i < Arr.length; i++) {
					if (Arr[i].Value === Obj.Value) {
						existe = true;
						break;
					}
				}
				if (existe === true) {
					alert("Los datos que ha ingresado ya fueron ingresados en el sistema");
				} else {
					var Unity = {};
					Unity.Value = Obj.Value;
					Unity.Description = Obj.Description;
					Arr.push(Unity);


					var inputValues = document.getElementsByName("Input_Value");
					var inputDescription = document.getElementsByName("Input_Description");

					for (var j = 0; j < inputValues.length; j++) {
						inputValues[j].value = "";
						//console.log("Limpiando input value: "+ i);
					}

					for (var k = 0; k < inputDescription.length; k++) {
						inputDescription[k].value = "";
						//console.log("Limpiando input description: "+ i);
					}

					//			document.getElementById("Input_Value").value="";
					//			document.getElementById("Input_Description").value="";
				}
			}
		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Settings_Controller",
					Method: "validate_Settings",
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

	$scope.SaveData = function() {
		try {
			var Json = eflowDTS.Session.Company;
			Json.Enable_Poll = $scope.Enable_Poll;
			Json.Control.Modification_date = new Date().getTime();
			Json.Control.Modify_User = eflowDTS.Session.Current_User.UserName;
			Json.Logo = $scope.Image;
			Json.Settings = {
				"Unity": $scope.Array_Unity,
				"Fuel": $scope.Array_Fuel,
				"User": $scope.Array_User,
				"Vehicle": $scope.Array_Vehicle,
				"License": $scope.Array_License,
				"Report": $scope.Array_Report
			};
			var JsonData = {
				'Method_Name': 'Update_Company',
				'Data': Json,
				'DB': eflowDTS.Session.DB.toUpperCase()
			};
			var onSuccess = function(JsonData) {
				DataCompany();
				window.location.href = "#Calendar";
			};

			var onError = function(JsonData) {
				var erro = {
					Generated: true,
					Page: "Scr_Summary_Controller",
					Method: "Save_User_Edit",
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




		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Settings_Controller",
					Method: "SaveData",
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

	function DataCompany() {

		try {
			var JsonData = {
				'Method_Name': 'Select_Company',
				'Data': {
					"Identifier": eflowDTS.Session.Company.Identifier.toUpperCase(),
				},
				'Fields': {

				},
				'DB': eflowDTS.Session.DB.toUpperCase()
			};
			var onSuccess = function(arr) {

				eflowDTS.Session.Company = arr[0];

				//To_Save_Eflow_Config();
				Set_Cookie("EflowCookie", eflowDTS);
			}
			var onError = function(e) {
				var erro = {
					Generated: true,
					Page: "Scr_Login_Controller",
					Method: "DataCompany",
					Description: "onError",
					User: eflowDTS.Session.Current_User.UserName,
					Company: eflowDTS.Session.Company.Identifier,
					Date: new Date().getTime(),
					Error: e
				};
				throw erro;
				console.log(e);
			}
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);

		} catch (e) {

			var err;

			if (e.hasOwnProperty("Generated") === false) {
				err = {
					Generated: false,
					Page: "Scr_Settings_Controller",
					Method: "DataCompany",
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


});