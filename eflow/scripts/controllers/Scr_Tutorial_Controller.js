DTS_APP.controller('Scr_Tutorial_Controller',function($scope){
	
	
	$scope.init = function(){
		$scope.Show_Image = false; 
		$scope.Tuto = {};
	};
	
	$scope.Rich_Init = function(){
         $('#Description').summernote({height:300});		
	};
	
	
	$scope.Get = function(){
		console.log();		
	};
	
	$scope.Upload_Image = function(){
		
		var file = document.getElementById('File_Image').files[0];
		$scope.Image_Name = file.name;		
		
		var onSuccess = function(base64){			
			$scope.Tuto.Image = base64;
			setInterval(function(){$scope.$apply();},0);			
		};
		
		Resize_Image(file,onSuccess);
		
	};
	
	$scope.Save_Tutorial = function(Tuto){
		
		Tuto.Description = $('#Description').summernote('code');
		Tuto.Control = {};
		Tuto.Control.Creation_Date = new Date().getTime();
		Tuto.Control.Created_User = eflowDTS.Session.Current_User.UserName;
		
		
		var Request = {
			"Method_Name":"Insert_Tutorial",
			"Data":Tuto,
            'DB':eflowDTS.Session.DB
		};
		
		var onSuccess = function(Response){
			document.getElementById("Description").innerHTML = "";
			$('#Description').summernote('code',"");
			$scope.Tuto = {};
			$scope.Image_Name = "";	
			
			bootbox.dialog({
				title:"¡Alerta!",
				message:"Tutorial Guardado",
				buttons:{
					main:{
						label:"OK",
						className:"btn-primary"
					}
				}
			});
	    };

		var onError = function(e){
			alert("Error: "+e);
		};	
		
		Send_JSON(eflowDTS.Configuration.URLs.eflow_Post,Request,onSuccess,onError);
		
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

});