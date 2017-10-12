DTS_APP.controller('Scr_VisitPoint_DB_Controller',function($scope) {
 
 
$scope.currentPage = 0;
$scope.pageSize = 25; 
$scope.ArrayJobs = [];

$scope.numberOfPages = function(){
	return Math.ceil($scope.ArrayJobs.length/$scope.pageSize);
};


$scope.init = function(){
try{
	
       	Set_Current_Page();
	 
  //  document.getElementById("sincronize").style.display = "none"; 
			$scope.Show_Alerta=false;
			$scope.Show_Alert=false;
		$scope.Show_Serie=false;
        $scope.Show_Code=false;
        $scope.Show_Quantity=false;
        $scope.Show_Select_Vehicule = false;
	    $scope.Array_Serials =  [];
        $scope.Check = false;
        $scope.Tareas = false;
        $scope.Date = new Date(eflowDTS.Session.Ram.Calendar_Date.replace(/-/g,'\/'));
		$scope.Headers = [{"es":"NOMBRE","value":"Name"},
		{"es":"VEHICULO","value":"ID_Truck"},{"es":"USUARIO","value":"User"},
		{"es":"SECTOR","value":"Route"},{"es":"SECUENCIA","value":"Sequence"},
		{"es":"DURACION","value":"Estimated_Delivery_Time"}];
		$scope.ArrayStatus =[{"ID":"Partial","Name":"Parcialmente Finalizado"},{"ID":"In_Process","Name":"En Proceso"},
		{"ID":"Aborted","Name":"Abortado"},{"ID":"Finalized","Name":"Finalizado"},{"ID":"Unassigned","Name":"No Asignado"}];
		$scope.ArrayUnidads = eflowDTS.Session.Company.Settings.Unity;	
		$scope.Select_VisitPoint();
		$scope.Select_Local();
		$scope.Select_User();
	//	$scope.Select_Vehicle();
		clearInterval(myVar);
    
   var myVar = setInterval(function() {   	
       $scope.Select_VisitPoint();
    }, 120000);
    
	}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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

 $scope.validate_fechaMayorQue = function(tipo,fechaInicial)
 {
         var f =new Date();         
         var fechaFinal=f.getFullYear()+ "-" + (f.getMonth() +1) + "-" + f.getDate();
             valuesStart=fechaInicial.split("-");
            valuesEnd=fechaFinal.split("-");
            // Verificamos que la fecha no sea posterior a la actual
            var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
            var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
             if(dateStart>=dateEnd)
            {// console.log("La fecha actual "+fechaFinal+" es superior a la fecha "+fechaInicial);
                     return 0;          
            }
            switch(tipo) {
                case "VisitPoint_Add":{
                 $scope.VisitPoint_Add.Estimated_Date=""; //console.log("La fecha actual "+fechaFinal+" NO es superior a la fecha "+fechaInicial);
                 return 1;  
                 break;}
                case "VisitPoint":{
                 $scope.VisitPoint.Estimated_Date=""; //console.log("La fecha actual "+fechaFinal+" NO es superior a la fecha "+fechaInicial);
                 return 1;  
                 break;}
                case "Assign":{
                 $scope.Assign.Estimated_Date=""; //console.log("La fecha actual "+fechaFinal+" NO es superior a la fecha "+fechaInicial);
                 return 1;  
                 break;}
          }
            
         /*  $scope.Noti.Date=""; //console.log("La fecha actual "+fechaFinal+" NO es superior a la fecha "+fechaInicial);
            return 1;    */   
};
	
$scope.mostrarFecha = function(days){ 
  fecha= $scope.Date;//new Date();
    day=fecha.getDate();
    // el mes es devuelto entre 0 y 11
    month=fecha.getMonth()+1;
    year=fecha.getFullYear();
	//document.write("Fecha actual: "+day+"/"+month+"/"+year);
	//Obtenemos los milisegundos desde media noche del 1/1/1970
    tiempo=fecha.getTime();
    //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
    milisegundos=parseInt(days*24*60*60*1000);
    //Modificamos la fecha actual
    total=fecha.setTime(tiempo+milisegundos);
    day1=fecha.getDate();
    month1=fecha.getMonth()+1;
    year1=fecha.getFullYear(); 
	//document.write("Fecha modificada: "+day+"/"+month+"/"+year);
  eflowDTS.Session.Ram.Calendar_Date = year1+"-"+month1+"-"+day1;		      	
  Set_Cookie("EflowCookie",eflowDTS);
  $scope.init();
}	;
	
$scope.See_Status=function(status){
try{
 		
	$scope.Status_Filter=status;
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "See_Status",
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
	$scope.Change_Class=function(class_name,class_value){
		$scope["Align_class_"+class_value] = class_name;
	};
$scope.Add_Serial =function(value,Parameter_array){
try{
	 
	 if(value===""||value===undefined){
	    	//alert("Debe de ingresar una serie");
	    	bootbox.dialog({title:"¡Alerta!",message:"Debe de ingresar una serie",buttons:{main:{label:'OK!',className:'btn-primary'}}});
//$.notify({message: "Debe de ingresar una serie"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	  }else{
				var existe = false;
			 for (var i=0; i <  Parameter_array/*Array_Serials*/.length;i++){
					if( Parameter_array/*Array_Serials*/[i].Serial===value)	{
						existe=true;
						break;
					}			
				}	
				if(existe===true){
				//	alert("La serie que ha ingresado ya fue ingresada");
	    	bootbox.dialog({title:"¡Alerta!",message:"La serie que ha ingresado ya fue ingresada",buttons:{main:{label:'OK!',className:'btn-primary'}}});
//$.notify({message: "La serie que ha ingresado ya fue ingresada"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	
				}
				else{
					var obj_serials={};
				   obj_serials.Serial = value;
					//$scope.Array_Serials.push(obj_serials);
					Parameter_array.push(obj_serials);
				//	setTimeout(function(){$scope.$apply();},1);
					
					//document.getElementById("Input_Serial").value="";
				}
		}
		document.getElementById("Input_Serial1").value="";
		document.getElementById("Input_Serial").value="";
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_Serial",
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
 $scope.Show_Serial_Edit= function(Value) {
 	try{
 		$scope.Show_Serie=false;
 		$scope.Show_Code=false;
 		
 switch(Value.JobClass){
	 case 'SP':{
           $scope.Show_Serie=true;
		   $scope.Show_Quantity=false;	
		   
	    $scope.VisitPoint_Add_Task.Serial_List =  [];
			break;   
      } 
      case 'SS':{
           $scope.Show_Code=true;
           $scope.Show_Quantity=true;			
			break;          
      } 
     case 'SU':{
           $scope.Show_Quantity=true;			
			break;
      }

	}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Show_Serial_Edit",
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

 $scope.Show_Serial = function(Value) {
 	try{
 	
 		$scope.Show_Serie=false;
 		$scope.Show_Code=false;
 		
 switch(Value.Serial){
	 case 'SP':{
           $scope.Show_Serie=true;
		   $scope.Show_Quantity=false;			
			break;   
      } 
      case 'SS':{
           $scope.Show_Code=true;
           $scope.Show_Quantity=true;			
			break;          
      } 
     case 'SU':{
           $scope.Show_Quantity=true;			
			break;
      }
	}
		}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Show_Serial",
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
	$scope.Select_Local= function(){

	 try {
        var JsonData = {
            'Method_Name': 'Select_All_Visit_Point',
             'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		
		var onSuccess = function(Response){
		
		$scope.ArrayVisitPoint = Response;
		$scope.$apply($scope.ArrayVisitPoint);

		};
		
		var onError = function(e){
			var erro={
			    Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Local",
                Description: "onError",
                User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
                Error: e
                };     
                
			throw erro;	
		
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
        
    } catch (e) {
             
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Local",
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

$scope.Filter_License = function(ID){
try{
	
for(var j = 0; j < $scope.ArrayUser.length; j++){
	if($scope.ArrayUser[j].ID === ID){
		var User = $scope.ArrayUser[j];
		break;
	}
}
$scope.Show_Select_Vehicule = true;
$scope.ArrayVehicle_Filter = [];

for(var x = 0; x < $scope.ArrayVehicle.length; x++){
    for(var y = 0; y < $scope.ArrayVehicle[x].License.length; y++){
         for(var z = 0; z < User.License.length; z++){
                    if($scope.ArrayVehicle[x].License[y] === User.License[z]){
                        if($scope.ArrayVehicle_Filter.indexOf($scope.ArrayVehicle[x]) === -1){
                            $scope.ArrayVehicle_Filter.push($scope.ArrayVehicle[x]);
                           }
                        break;
                    }         
         }
     }
}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Filter_License",
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

$scope.Checking_Checkboxes_Check = function(){
	try{
	$scope.Show_Actions = false;
	
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");

	for ( var i = 0; i < CheckBoxes_Array.length ; i++ ){
	  if(CheckBoxes_Array[i].checked === true){
		$scope.Show_Actions=true;	
		break;
	   }
	} 
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes_Check",
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

$scope.Checking_Checkboxes_Check_Master = function(master){
try{
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	for(var i = 0; i < CheckBoxes_Array.length; i++){
		CheckBoxes_Array[i].checked = !master;
	}
	$scope.Checking_Checkboxes_Check();
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes_Check_Master",
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


$scope.Action_Option= function(Option){
try{
	switch(Option){
	  case "Cambiar":{
		$scope.Open_Modal_Change();
		break;
	}	
      case "Eliminar":{
		$scope.Delete_Job_DB();
		break;
	}
       case "Estados":{
		$scope.Open_Modal_Change_Status();
		break;
	}
	default :{
		break;
	}	
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Action_Option",
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
 $scope.Info_Vehicle = function(Vehicle,ArrayVehicle){
	try{
	for(var i = 0; i < ArrayVehicle.length ; i++ ){
      if(Vehicle === ArrayVehicle[i].ID_Truck){
		$scope.ObjVeh = {};
		$scope.ObjVeh.Description = ArrayVehicle[i].Description;
		$scope.ObjVeh.Weight = ArrayVehicle[i].Weight;
		$scope.ObjVeh.Cubics = ArrayVehicle[i].Cubics;
		//peso
		if($scope.ObjVeh.Weight>$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck]){
			$scope.Show_Alerta=true;	
			$scope.Show_Alert=true;	
			$scope.Weight=($scope.ObjVeh.Weight-$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck]);
			//volumen
				if($scope.ObjVeh.Cubics>$scope.Data_Vehicule_Cubics[ArrayVehicle[i].ID_Truck]){
					$scope.Show_Alerta=true;	
					$scope.Show_Alert=true;	
					$scope.Cubics=($scope.ObjVeh.Cubics-$scope.Data_Vehicule_Cubics[ArrayVehicle[i].ID_Truck]);
				 	$scope.freeCubics =$scope.Cubics;
				}else{
					$scope.Show_Alerta=false;	
					$scope.Show_Alert=true;	
					$scope.freeCubics =0;
				}
			$scope.freeWeight =$scope.Weight;
		}else{
			$scope.Show_Alerta=false;	
			$scope.Show_Alert=true;	
			$scope.freeWeight =0;
		}
		
		
		/*
		if($scope.ObjVeh.Weight>$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck]){
			$scope.Show_Alerta=true;	
			$scope.Show_Alert=true;	
			$scope.Weight=($scope.ObjVeh.Weight-$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck]);
			$scope.Cubics=($scope.ObjVeh.Cubics-$scope.Data_Vehicule_Cubics[ArrayVehicle[i].ID_Truck]);
		$scope.freeWeight =$scope.Weight;
		$scope.freeCubics =$scope.Cubics;
	//	$scope.freeWeight =("*  Tiene disponible "+$scope.Weight+" kilos para cargar la unidad. ");
		}else{
			$scope.Show_Alerta=false;	
			$scope.Show_Alert=true;	
		$scope.freeWeight =0;
	$scope.freeCubics =0;
			//$scope.freeWeight =("*  No Tiene disponible kilos para cargar la unidad. ");
		}*/
      }     
   } 

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Info_Vehicle",
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
  
};/*
 $scope.Info_Vehicle1 = function(Vehicle,ArrayVehicle){
	try{	
	for(var i = 0; i < ArrayVehicle.length ; i++ ){
      if(Vehicle === ArrayVehicle[i].ID_Truck){
		$scope.ObjVeh = {};
		$scope.ObjVeh.Description = ArrayVehicle[i].Description;
		$scope.ObjVeh.Weight = ArrayVehicle[i].Weight;
		$scope.ObjVeh.Cubics = ArrayVehicle[i].Cubics;
		
		if($scope.ObjVeh.Weight>$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck]){
			$scope.Show_Alerta=true;	
			$scope.Show_Alert=true;	
			$scope.Weight=($scope.ObjVeh.Weight-$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck]);
		$scope.freeWeight =$scope.Weight;
	//	$scope.freeWeight =("*  Tiene disponible "+$scope.Weight+" kilos para cargar la unidad. ");
		}else{
			$scope.Show_Alerta=false;	
			$scope.Show_Alert=true;	
		$scope.freeWeight =0;
			//$scope.freeWeight =("*  No Tiene disponible kilos para cargar la unidad. ");
		}
      }     
   } 

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Info_Vehicle1",
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
*/
$scope.Select_User = function(){
	try {
        var Request = {
            'Method_Name': 'Select_All_User',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
    			"Type": "Conductor"
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){
		$scope.ArrayUser = Response;
		$scope.$apply($scope.ArrayUser);
		};
		var onError =  function(e){
			var erro={
			Generated: true,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Select_User",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;			
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
    } catch (e) {        
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_User",
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



$scope.Select_Vehicle = function(){
	try {
        var Request = {
            'Method_Name': 'Select_All_Vehicle',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier
            },
            'Fields':{
            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){
			$scope.ArrayVehicle = Response;
		for(var i=0; i<$scope.ArrayVehicle.length;i++ ){
			if($scope.Data_Vehicule.hasOwnProperty($scope.ArrayVehicle[i].ID_Truck)){
				$scope.Data_Vehicule[$scope.ArrayVehicle[i].ID_Truck]=$scope.Data_Vehicule[$scope.ArrayVehicle[i].ID_Truck];
				$scope.Data_Vehicule_Cubics[$scope.ArrayVehicle[i].ID_Truck]=$scope.Data_Vehicule_Cubics[$scope.ArrayVehicle[i].ID_Truck];
			}
			else{
				$scope.Data_Vehicule[$scope.ArrayVehicle[i].ID_Truck]=0;
				$scope.Data_Vehicule_Cubics[$scope.ArrayVehicle[i].ID_Truck]=0;
			}
		}
			$scope.$apply($scope.ArrayVehicle);
		};
		
		var onError = function(e){
			var erro={
			Generated: true,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Select_Vehicle",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
            Company: eflowDTS.Session.Company.Identifier,
            Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
		
        Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, Request, onSuccess, onError);
        
    } catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_Vehicle",
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

function Change_Structure(arr){
try{
	
	var NewArray = [];
	
	for(var i = 0; i < arr.length; i++){
	
	var obj = {};
	var y = arr[i];
    obj.Status_Created = "Admin";
	//obj.Order_Number = 1455667200000+i;
	obj.ID_Location = y.VisitPoint.IDDelivery_Location;
	obj.Name = y.VisitPoint.Name;
	obj.Address = y.VisitPoint.Address;
	obj.Manager = y.VisitPoint.Manager;
	obj.Telephone_Number = y.VisitPoint.TelephoneNumber;
	obj.Mail = y.VisitPoint.Mail;
	obj.Latitude = y.VisitPoint.Geolocation.Latitude;
	obj.Longitude = y.VisitPoint.Geolocation.Longitude;
	obj.Estimated_Date = (new Date("2016-02-01").getTime()) + eflowDTS.Time.Difference;
	obj.Control.Creation_Date = new Date().getTime();
	obj.Control.Created_User = eflowDTS.Session.UserName;
	obj.Delivery_Period_Start = y.DeliveryPeriod.Start;
	obj.Delivery_Period_End = y.DeliveryPeriod.End;
	obj.Estimated_Delivery_Time = y.EstimatedDeliveryTime;
	obj.Sequence = y.Sequence;
	obj.User = y.User;
	obj.ID_Truck = new Date().getTime();
	obj.Visit_State = y.VisitPoint.State_Visit;
	obj.Transferring_State = "Pending_To_Mobile";
	obj.Invoice = new Date().getTime();
	obj.Collection_Info = {};
	obj.Collection_Info.Collection_Name = "Store_Jobs";
	obj.Collection_Info.Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
	obj.Visit_Point_Incidents = [];
	obj.Visit_Point_Incidents_Type = y.Visit_Point_Incidents_Type;
	obj.Visit_Point_States =  [
        {
            "name": "Pendiente", "value":"Pending"
        },
        {
            "name": "En Proceso", "value":"In_Process"
        },
        {
            "name": "Finalizado",
			"value":"Finalized"
        },
        {
            "name": "Abortado", "value":"Aborted"
        }
    ];
	obj.Visit_Point_Abort = " var incident = {}; incident.Date = eflowDTS_lib.GetServerTime().toString(); incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
	obj.Visit_Point_Confirm = " var incident = {}; incident.Date = eflowDTS_lib.GetServerTime().toString(); incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";
	
	obj.Company	= eflowDTS.Session.Company.Identifier;	
	obj.Jobs = [];
	for(var j = 0; j < arr[i].Jobs.length; j++){
		
		var x = {};
		var w = arr[i].Jobs[j];
		x.JobID = new Date().getTime()+j*2/i;
		x.JobType = w.JobType;
		x.JobName = w.JobName;
		x.Status_Created = "Admin";
		x.JobDescription= w.JobDescription;
		x.JobInstructions = w.JobInstructions;
		x.BarCode = new Date().getTime();
		x.UOM = w.UOM;
		x.Quantity = w.Quantity;
		x.JobWeight = 10-j+i;
		x.JobCubics = 150+i-j;
		x.Quantity_Register = 0;
		x.JobState = w.JobState;
		x.JobValidator = w.JobValidator;
		x.JobActions = [];	
		obj.Jobs.push(x);
	
	}
	NewArray.push(obj);
	
	}
  var JsonData = {
            'Method_Name': 'Insert_Job',
            'Data': NewArray,
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(JsonData){
		
				alert("Hecho");
		};
		
		var onError = function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Change_Structure",
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
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Change_Structure",
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
	try {
		
        var JsonData = {
            'Method_Name': 'Select_Jobs',
            'Data': {
    			"Company": eflowDTS.Session.Company.Identifier,
            	"Estimated_Date":  eflowDTS.Session.Ram.Calendar_Date
            },
            'Fields':{
                "Certificate":false            	
            },
            'DB':eflowDTS.Session.DB
        };
		var onSuccess = function(Response){
		$scope.ArrayJobs = Response;
		$scope.Data_Vehicule=[];
		$scope.Data_Vehicule_Cubics=[];
		for(var i=0; i<Response.length;i++ ){
			var jobs=Response[i].Jobs;
			for(var j=0; j<jobs.length;j++ ){
			if($scope.Data_Vehicule.hasOwnProperty(Response[i].ID_Truck)){
				
				$scope.Data_Vehicule[Response[i].ID_Truck]+=jobs[j].JobWeight;
				$scope.Data_Vehicule_Cubics[Response[i].ID_Truck]+=jobs[j].JobCubics;
			}
			else{
				$scope.Data_Vehicule[Response[i].ID_Truck]=jobs[j].JobWeight;
				$scope.Data_Vehicule_Cubics[Response[i].ID_Truck]=jobs[j].JobCubics;
			}	
					}
			}
		//Change_Structure(JsonData);
		
		$scope.Select_Vehicle();
		};
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Select_VisitPoint",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		
		};
	    Send_JSON(eflowDTS.Configuration.URLs.eflow_Get, JsonData, onSuccess, onError);
	    
        } catch (e) {
      
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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

$scope.Export_File = function(Export_Type,Array_Jobs){
	try{
	switch(Export_Type){
		
		case 'JSON':{
			
			Export_JSON(Array_Jobs);
			
			break;
		}
		case 'XML':{

			Export_XML(Array_Jobs);
			
			break;
		}
		case 'CSV':{

			Export_CSV(Array_Jobs);
			
			break;
		}
		case 'PDF':{

			Export_PDF(Array_Jobs);
			
			break;
		}
	}
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_File",
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

function Export_PDF (Arr){
	/*
var pdf = new jsPDF('p', 'pt', 'letter');
var source = $('#Table_VisitPoint_DB')[0];

var margins = {
    top: 50,
    left: 60,
    width: 545
  };
pdf.fromHTML(
  	source // HTML string or DOM elem ref.
  	, margins.left // x coord
  	, margins.top // y coord
  	, {
  		'width': margins.width // max width of content on PDF
  	},
  	function (dispose) {
  	  // dispose: object with X, Y of the last line add to the PDF
  	  //          this allow the insertion of new lines after html
        pdf.save('Punto_de_visita.pdf');
      }
  )	*/
	try{
	
	var onSucces_Img1 = function(img1){

var logo = img1;

var onSucces_Img2 = function(img2){

var ima = img2;

var Compania = eflowDTS.Session.Company;
var columns = [
    {/*title: "Gerente", dataKey: "Manager"},
    {title: "Nombre", dataKey: "Name"}, 
    {title: "Dirección", dataKey: "Address"},
    {title: "Telefono", dataKey: "Telephone_Number"},
    {title: "Vehiculo", dataKey: "ID_Truck"},
    {title: "Usuario", dataKey: "User"}, 
    {title: "Correo", dataKey: "Mail"}
];*/
title:"NOMBRE",dataKey:"Name"},
		{title:"VEHICULO",dataKey:"ID_Truck"},
		{title:"USUARIO",dataKey:"User"},
		{title:"SECUENCIA",dataKey:"Sequence"},
		{title:"DURACION",dataKey:"Estimated_Delivery_Time"}];
var rows = [];

for(var i = 0; i < Arr.length; i++){
		/*if($scope.ArrayJobs[i].Visit_State==="Partial"){
			doc.setTextColor(0,255,0);			
		}if($scope.ArrayJobs[i].Visit_State==="In_Process"){
			doc.setTextColor(255,0,0);			
		}if($scope.ArrayJobs[i].Visit_State==="Aborted"){
			doc.setTextColor(255,0,0);			
		}if($scope.ArrayJobs[i].Visit_State==="Finalized"){
			doc.setTextColor(255,0,0);			
		}if($scope.ArrayJobs[i].Visit_State==="Unassigned"){
			doc.setTextColor(255,0,0);			
		}*/
		rows.push(Arr[i]);
		}	

var doc = new jsPDF('l', 'pt');
   var header = function (data) {
       
  doc.setFontSize(18);	
  doc.text(420, 160, 'Puntos de Visita');

  doc.setFontSize(13);
doc.setFontType("normal");

doc.text(420, 50, 'Fecha: '+new Date($scope.Date).format('dd/mm/yyyy'));

  doc.setFontSize(10);

doc.setTextColor(100);

doc.setFontType("bold");

doc.addImage(ima, 'JPEG', 20, 20, 150, 80);
if(eflowDTS.Session.Company.Logo){
	
doc.addImage(eflowDTS.Session.Company.Logo, 'JPEG', 180,20, 150, 90);

}
 
    
doc.text(420, 70, 'Nombre de la Compañia: '+ Compania.Name);
    
doc.text(420, 80, 'Teléfono: '+ Compania.Phone);
    
doc.text(420, 90, 'Fax: '+ Compania.Fax);
      
doc.text(420, 100, 'Correo Electrónico: '+ Compania.Mail);
    
doc.text(420, 110, 'País: '+ Compania.Country);
      
doc.text(420, 120, 'Ubicación: '+ Compania.Address);

doc.setLineWidth(1);
doc.line(20, 130, 800, 130); 
    };   
    var footer = function (data) {
        var str = "Pag " + data.pageCount;
				doc.addImage(logo, 'JPEG', 420, 550, 90, 30);
        // Total page number plugin only available in jspdf v1.0+
       
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
    };

    var options = {
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 80}
    };

    doc.autoTable(columns, rows, {startY: 170,
	margin: {horizontal: 10},
        styles: {overflow: 'linebreak'},
        bodyStyles: {valign: 'top'},
        columnStyles: {email: {columnWidth: 'wrap'}},
        beforePageContent: header,
        afterPageContent: footer,
        margin: {top: 180}
    });

doc.save('Puntos_de_Visita.pdf');
  

};
Image_To_Base64("images/ima.png",onSucces_Img2);
};
Image_To_Base64("images/logo.png",onSucces_Img1);

	
   }catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_PDF",
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


$scope.To_Order_By = function(Order_Type){
try{
	if ($scope.OrderList === Order_Type) {
		
    var Reverse = Order_Type.charAt(0);
    if (Reverse === '-') {
        $scope.OrderList = Order_Type.substr(1);
    } else {
        $scope.OrderList = '-' + Order_Type;
    }
	} else {
	    $scope.OrderList = Order_Type;
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "To_Order_By",
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

$scope.Visualize_VisitPoint = function(Obj){
try{
	$scope.Filter_License(Obj.User);
	$scope.Info_Vehicle(Obj.ID_Truck,$scope.ArrayVehicle);
	 $scope.Show_Alert=true;
		for(var i = 0; i < Obj.Jobs.length; i++){
			if(Obj.Jobs[i].JobType === "delivery"){
				Obj.Jobs[i].JobTypeEs = "Entrega";
			}else{
			  Obj.Jobs[i].JobTypeEs = "Recolección";
			}
		}
	/*if(Obj.Transferring_State==="Pending_To_Mobile"){		  
        document.getElementById("sincronize").style.display = "none"; 
	}else{
        document.getElementById("sincronize").style.display = "block"; 
	}*/
   $scope.Show_Select_Vehicule = true;
   $scope.VisitPoint = Obj;
   $scope.VisitPoint.Estimated_Date = /*new Date(*/Obj.Estimated_Date/*).format("yyyy-mm-dd")*/;
   $scope.Array_VisitPoint_Task_Edit = Obj.Jobs;
   $scope.VisitPoint_Add_Task_Edit = {};
   $scope.Tareas = false;
   $("#Modal_Edit_VisitPoint").modal("show"); 
   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Visualize_VisitPoint",
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

$scope.Save_Job_Edit = function(Obj){
		try{
		var Json = Obj;
		
	
Json.Control.Modification_Date = new Date().getTime();
Json.Control.Modify_User= eflowDTS.Session.Current_User.UserName;
Json.Estimated_Date = new Date(Obj.Estimated_Date.replace(/-/g,'\/')).format("yyyy-mm-dd");
		
			if(Json.Visit_State === "Unassigned"){	
				if(Json.ID_Truck==null || Json.ID_Truck==undefined||Json.User==null || Json.User==undefined)
			    {
				    Json.Visit_State = "Unassigned";
				}
				else{
					Json.Visit_State = "In_Process";
				}
		   }
		   
		 if(Json.Visit_State === "Aborted"){
		 	
		   	Json.Visit_State = "In_Process";
		 }
		 
		   if(Json.ID_Truck==null || Json.ID_Truck==undefined||Json.User==null || Json.User==undefined)
			    {
				    Json.Visit_State = "Unassigned";
				}
		
		delete Json['$$hashKey'];
		
		Json.Jobs = $scope.Array_VisitPoint_Task_Edit;
		delete Json.Jobs ['$$hashKey'];
		
		var JsonData = 
				{
					'Method_Name': 'Update_Jobs',
					'Data': Json,
            'DB':eflowDTS.Session.DB
				};
				
		var onSuccess = function(Response){
			$scope.Select_VisitPoint();
			};
				
		var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Save_Job_Edit",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
			
			};
				
	Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
								

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Save_Job_Edit",
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

$scope.Edit_In_Array = function(Obj,Array){
	try{
		
      /*  var Tareas_Edit = true;	
		if($scope.Tareas===true){
        $scope.Tareas=false;		
		}
		else{*/
        $scope.Tareas=true;
        
        $scope.VisitPoint_Add_Task={};
        //$scope.VisitPoint_Add_Task=Obj;
        $scope.VisitPoint_Add_Task.JobClass = Obj.JobClass;
		$scope.VisitPoint_Add_Task.JobID=Obj.JobID ;
		$scope.VisitPoint_Add_Task.JobType=Obj.JobType;
		$scope.VisitPoint_Add_Task.JobName=Obj.JobName;
		$scope.VisitPoint_Add_Task.JobDescription=Obj.JobDescription;
	    $scope.VisitPoint_Add_Task.JobInstructions=Obj.JobInstructions;
	    $scope.VisitPoint_Add_Task.BarCode=Obj.BarCode;
	    $scope.VisitPoint_Add_Task.UOM=Obj.UOM;
	    $scope.VisitPoint_Add_Task.Quantity=Obj.Quantity;
	    $scope.VisitPoint_Add_Task.JobWeight=Obj.JobWeight;
	    $scope.VisitPoint_Add_Task.JobCubics=Obj.JobCubics;
		$scope.VisitPoint_Add_Task.Serial_List=Obj.Serial_List;
	    $scope.Show_Serial_Edit($scope.VisitPoint_Add_Task);
        
        //}
        
       

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Edit_In_Array",
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
	
$scope.Remove_In_Array = function(Obj,Array){
	try{
		//obj.JobWeight = Task_Obj.JobWeight;					
		$scope.Weight=$scope.Weight+Obj.JobWeight;
		$scope.freeWeight =$scope.Weight;				
		$scope.Cubics=$scope.Cubics+Obj.JobCubics;
		$scope.freeCubics =$scope.Cubics;
	Array_Remove(Array,Obj);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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

$scope.Checking_Checkboxes = function(){
	try{
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	
	if($scope.Check === false){
	for (var i = 0; i < CheckBoxes_Array.length ; i++ ){
	CheckBoxes_Array[i].checked = true;
	}
	$scope.Check = true;
	}else{
	for ( i = 0; i < CheckBoxes_Array.length ; i++ ){
	CheckBoxes_Array[i].checked = false;
	}
	$scope.Check = false;
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Checking_Checkboxes",
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

$scope.Delete_Job_DB = function(){
	try{
	var Success = function(result){
	
	if(result === true){
		
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_Delete_ID=[];
	
		for (var i=0; i < CheckBoxes_Array.length ;i++){
		if (CheckBoxes_Array[i].checked === true){
			//var Obj = JSON.parse(CheckBoxes_Array[i].value);
			Array_Delete_ID.push(CheckBoxes_Array[i].attributes.id_check.value);
			//Array_Remove($scope.ArrayJobs,Obj);
			}
			$scope.Show_Actions=false;
	}
		
	
	
	var JsonData = {
            'Method_Name': 'Delete_Task',
            'Data': Array_Delete_ID,
            'DB':eflowDTS.Session.DB
        };
        
	var onSuccess = function(JsonData){
		$scope.Select_VisitPoint();
		};
	
	var onError =function(JsonData){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Delete_Job_DB",
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
	 
	 
	 }
	 };
	 
	 bootbox.confirm("¿Realmente desea borrar los elementos seleccionados?",Success);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Delete_Job_DB",
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

$scope.Change = function(){try{
	var x=document.getElementById("change");
//	x.style.display="block";
	if(x.style.display === "block")
	{
		x.style.display = "none";
	}else{
		x.style.display = "block";
	}	 

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Change",
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
$scope.SaveChange = function(txtUser,txtVehicle){try{
	if(txtUser==null||txtUser===""||txtVehicle==null||txtVehicle===""){
		alert("Debe asignar un usuario y un vehiculo");
$.notify({message: "Debe asignar un usuario y un vehiculo"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	
	}
	else{
		$scope.VerificarCheckBoxes();
	}

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "SaveChange",
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

function IDS_CheckBoxes(){
	try{
	var CheckBoxes_Array = document.getElementsByName("CheckBox_Options");
	var Array_ID_Check = [];
	
	for (var i=0; i < CheckBoxes_Array.length ;i++){
			if (CheckBoxes_Array[i].checked === true){
				Array_ID_Check.push(CheckBoxes_Array[i].attributes.id_check.value);
			}
		}
		
		return Array_ID_Check;

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "IDS_CheckBoxes",
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
$scope.Message=function(user,matter,detail){
try{
	var JsonData =	{
					'Method_Name': 'Insert_Notification',
					'Data': 
					{
						"Collection_Info": 
						{
							"COLLECTION_NAME": "Store_Notification",
							"COLLECTION_SCHEMA": "'_id.$id,User,ID_Truck,Company,Estimated_Date,State,Matter,Details,[User+ID_Truck+Company],Transferring_State'"
						},
						"User": user,
						"State": "Unread",
						"Date": new Date(eflowDTS.Session.Ram.Calendar_Date).format("yyyy-mm-dd"),
						"Matter": matter,
						"Detail": detail,
						"Transferring_State": "Pending_To_Mobile"
					},
            'DB':eflowDTS.Session.DB
				};
				var onSuccess = function(JsonData){
				};
				var onError =function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Message",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
				
				Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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


$scope.Assign_Status = function(status){
try{
		if(status === null||status ===""){
			//alert("Debe digitar o selecionar al menos un campo");
$.notify({message: "Debe digitar o selecionar al menos un campo"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	
		}
		else{
			
			var ArrayID = IDS_CheckBoxes();
			if(ArrayID.length > 0){
				for(var i = 0; i < $scope.ArrayJobs.length; i++){
					for(var j = 0; j < ArrayID.length; j++){
						if($scope.ArrayJobs[i]._id.$id === ArrayID[j]){
							
							if($scope.ArrayJobs[i].Visit_State !== "Finalized"){
								$scope.ArrayJobs[i].Visit_State = status;
								$scope.ArrayJobs[i].Control.Modification_Date = new Date().getTime();
								$scope.ArrayJobs[i].Control.Modify_User= eflowDTS.Session.Current_User.UserName;
								delete $scope.ArrayJobs[i].$$hashKey;
								var JsonData = 
								{
									'Method_Name': 'Update_Jobs',
									'Data': $scope.ArrayJobs[i],
            'DB':eflowDTS.Session.DB
								};
								var onSuccess = function(JsonData){
									$scope.Select_VisitPoint();
								};
								var onError = function(e){
				};
				var onError =function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Assign_Status",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);	
			
			}else{			
			
			
$.notify({title:"¡Alerta!",message:"No se puede realizar cambios a trabajos ya terminados"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	
			
			/*bootbox.dialog({
			title:"¡Alerta!",
			message:"No se puede realizar cambios a trabajos ya terminados",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}
				
			});*/
					}
				}
				}	
			}			
		}			
	}	

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Assign_Status",
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

$scope.Assign_All = function(Assign){
try{
		var user,oldUser,date,truck;
		if(Assign == undefined){
	$.notify({title:"¡Alerta!",message:"Debe seleccionar al menos un registro."},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	
			/*bootbox.dialog({
			title:"¡Alerta!",
			message:"Debe seleccionar al menos un registro.",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}
				
			});*/
		}
		else{
			var ArrayID = IDS_CheckBoxes();
			if(ArrayID.length > 0){
				for(var i = 0; i < $scope.ArrayJobs.length; i++){
					for(var j = 0; j < ArrayID.length; j++){
						if(Assign.hasOwnProperty("User")===true){
							user = Assign.User;
							oldUser = $scope.ArrayJobs[i].User;
						}
						else{
							user = $scope.ArrayJobs[i].User;
						}
						if(Assign.hasOwnProperty("ID_Truck")===true){
						   truck = Assign.ID_Truck;
						}
						else{
						   truck = $scope.ArrayJobs[i].ID_Truck;
						}
						if(Assign.hasOwnProperty("Estimated_Date")===true){
						   date = Assign.Estimated_Date;
						}
						else{
						   date = $scope.ArrayJobs[i].Estimated_Date;
						}
						if($scope.ArrayJobs[i]._id.$id === ArrayID[j]){
							if($scope.ArrayJobs[i].Visit_State !== "Finalized"){
								if($scope.ArrayJobs[i].Visit_State === "Aborted"){
									$scope.Message(oldUser,"Cambio de Trabajo","Se le ha desasignado un trabajo");
									$scope.Message(user,"Cambio de Trabajo","Se le ha asignado un nuevo trabajo");
								}
								$scope.ArrayJobs[i].User = user;
								$scope.ArrayJobs[i].ID_Truck = truck; 
								$scope.ArrayJobs[i].Control.Modification_Date = new Date().getTime(); 
								$scope.ArrayJobs[i].Control.Modify_User = eflowDTS.Session.Current_User.UserName; 
								
								$scope.ArrayJobs[i].Estimated_Date = date;
								$scope.ArrayJobs[i].Visit_State = "In_Process";
								delete $scope.ArrayJobs[i].$$hashKey;
								var JsonData = 
								{
									'Method_Name': 'Update_Jobs',
									'Data': $scope.ArrayJobs[i],
            'DB':eflowDTS.Session.DB
								};
								var onSuccess = function(JsonData){
									$scope.Select_VisitPoint();
								};
								var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Assign_All",
            Description: "onError",
           User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;	
		};
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);	
			
			}else{
				
$.notify({title:"¡Alerta!",message: "No se puede realizar cambios a trabajos ya terminados"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	/*bootbox.dialog({
					title:"¡Alerta!",
					message:"No se puede realizar cambios a trabajos ya terminados",
					buttons:{
						main:{
							label:"Ok!",
							className:"btn-primary"
							}
						}
					});*/
							}										
						}
					}
				}	
			}			
		}	

}catch (e) { 
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Assign_All",
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
	
$scope.Open_Modal_Add_VisitPoint = function(){
	try{
	$scope.Show_Alert = true;
			$scope.Show_Alerta=false;
	$scope.Show_Select_Vehicule = false;
	$scope.VisitPoint_Add = {};
	$scope.VisitPoint_Add_Task = {};
	$scope.VisitPoint_Add_Array_Task = [];
	$scope.VisitPoint_Add.Estimated_Date = new Date(eflowDTS.Session.Ram.Calendar_Date.replace(/-/g,'\/')).format("yyyy-mm-dd");

	$("#Modal_Add_VisitPoint").modal("show");	
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
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

$scope.Open_Modal_Change = function(){
	try{
	document.getElementById("Usuario").selectedIndex = "-1";
	document.getElementById("Vehicle").selectedIndex = "-1";
	//$scope.Assign={};
	//$scope.Assign.Estimated_Date = new Date(eflowDTS.Session.Calendar_Date).format("yyyy-mm-dd");
	$("#Modal_Change").modal("show");	
	

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Open_Modal_Change",
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
$scope.Open_Modal_Change_Status = function(){
	try{
	$("#Modal_Change_Status").modal("show");	

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Open_Modal_Change_Status",
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
 
 
 
$scope.Add_New_VisitPoint = function(New_Job){
try{
		var obj_Job = {};
		//obj_Job.VisitPoint = {};
		obj_Job.Control={};
		obj_Job.Control.Creation_Date = new Date().getTime();
		obj_Job.Control.Created_User = eflowDTS.Session.Current_UserUserName;
		obj_Job.ID_Location = New_Job.PV_Info.ID_Location;
		obj_Job.Manager = New_Job.PV_Info.Manager;
		obj_Job.Name = New_Job.PV_Info.Name;
		obj_Job.Address = New_Job.PV_Info.Address;
		obj_Job.Telephone_Number = New_Job.PV_Info.Telephone_Number;
		obj_Job.Mail = New_Job.PV_Info.Mail;
		obj_Job.Company= eflowDTS.Session.Company.Identifier;	
		obj_Job.Legal_Cedula = New_Job.PV_Info.Legal_Cedula;
		obj_Job.Route = {};
		obj_Job.Notes = [];
		obj_Job.Route.Route_Name=New_Job.PV_Info.Route.Route_Name;
		obj_Job.Route.ID_Route=New_Job.PV_Info.Route.ID_Route;
		//obj_Job.Visit_State = "Incompleted";
		obj_Job.Latitude = New_Job.PV_Info.Latitude;
		obj_Job.Longitude = New_Job.PV_Info.Longitude;
		obj_Job.Country = New_Job.PV_Info.Country;
		obj_Job.District = New_Job.PV_Info.District;
		obj_Job.Province = New_Job.PV_Info.Province;
		obj_Job.Canton = New_Job.PV_Info.Canton;
		obj_Job.ID_Truck = New_Job.ID_Truck;
		obj_Job.Order_Number = New_Job.Order_Number;
		obj_Job.Invoice = New_Job.Invoice;
		obj_Job.Collection_Info = {};
		obj_Job.Collection_Info.Collection_Name = "Store_Jobs";
		obj_Job.Collection_Info.Collection_Schema = "'_id.$id,Name,Visit_State,Transferring_State,Sequence,ID_Location,Order_Number,User,Estimated_Date,ID_Truck,Company,[User+ID_Truck+Company]'";
		obj_Job.Visit_Point_Incidents = [];
		obj_Job.Visit_Point_Incidents_Type = [{"text":"Problemas con la mercaderia.","value":"Mercaderia"},
											  {"text":"Problemas con la ubicación.","value":"Ubicacion"},
											  {"text":"Problemas con el vehículo.","value":"Vehiculo"},
											  {"text":"Problema con Encargado.","value":"Encargado"},
        									  {"text": "Retraso.", "value": "Delay_Incidents"},
											  {"text":"No Visita.","value":"NoVisito"},
											  {"text":"Otros.","value":"Otros"}];
		obj_Job.Visit_Point_States = [{"name":"Pendiente"},
									  {"name":"En Proceso"},
									  {"name":"Finalizado"},
									  {"name":"Abortado"}];
									  
		obj_Job.Visit_Point_Abort = " var incident = {}; eflowDTS_lib.GetServerTime().getTime();  incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = [] ;incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;",
        obj_Job.Visit_Point_Confirm = " var incident = {}; eflowDTS_lib.GetServerTime().getTime(); incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = [];incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;",
		/*							  
		 " var incident = {}; eflowDTS_lib.GetServerTime(); incident.Description = \"Visita Abortada\";incident.Detail = \"Visita Abortada\";incident.Problems_Option = \"Visita_Abortada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Aborted\";return obj;";
        " var incident = {}; eflowDTS_lib.GetServerTime(); incident.Description = \"Visita Confirmada\";incident.Detail = \"Visita Confirmada\";incident.Problems_Option = \"Visita_Confirmada\";incident.Notes = \"No hay notas\";incident.Latitude = pos.coords.latitude;incident.Longitude = pos.coords.longitude;obj.Visit_Point_Incidents.push(incident);obj.Visit_State = \"Finalized\";return obj;";
      */obj_Job.Sequence = New_Job.Sequence;
		//obj_Job.Estimated_Date = new Date(New_Job.Estimated_Date).getTime() + eflowDTS.Time.Difference;
		obj_Job.Estimated_Date = new Date(New_Job.Estimated_Date.replace(/-/g, '\/')).format("yyyy-mm-dd");
		obj_Job.Estimated_Delivery_Time = New_Job.Estimated_Delivery_Time;
		obj_Job.User = New_Job.User;
		obj_Job.Transferring_State = "Pending_To_Mobile";
		obj_Job.Delivery_Period_Start = New_Job.Delivery_Period_Start; 
		obj_Job.Delivery_Period_End = New_Job.Delivery_Period_End;
		obj_Job.Jobs = $scope.VisitPoint_Add_Array_Task;
		
		if(obj_Job.ID_Truck==null || obj_Job.ID_Truck==undefined||obj_Job.User==null || obj_Job.User==undefined)
    {
	    obj_Job.Visit_State = "Unassigned";
	}
	else{
		obj_Job.Visit_State = "In_Process";
	}
	 
        $scope.ArrayJobs.push(obj_Job);
		var Array_Save = [];
		Array_Save.push(obj_Job);
		var JsonData = 
				{
					'Method_Name': 'Insert_Job',
					'Data': Array_Save,
            'DB':eflowDTS.Session.DB
				};
				var onSuccess = function(Response){
				$scope.Select_VisitPoint(); 
				$('#Modal_Add_VisitPoint').modal('hide');
				};
				var onError = function(e){
			var erro={
			Generated: true,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_New_VisitPoint",
            Description: "onError",
            User: eflowDTS.Session.Current_User.UserName,
                Company: eflowDTS.Session.Company.Identifier,
                Date: new Date().getTime(),
            Error: e
        };
			throw erro;
		};
			Send_JSON(eflowDTS.Configuration.URLs.eflow_Post, JsonData, onSuccess, onError);
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_New_VisitPoint",
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

$scope.Validator=function(Task_Obj){
	try {
    var array = ["JobType", "JobName", "JobDescription", "UOM", "JobWeight", "JobCubics", "JobInstructions", "JobClass"];
    var result = true;
    for (var i = 0; i < array.length; i++) {
        if (Task_Obj.hasOwnProperty(array[i]) === false || Task_Obj[array[i]] === null || Task_Obj[array[i]] === "") {
            result = false;
            break;
        }
    }
    return result;
} catch (e) {
    var err;
    if (e.hasOwnProperty("Generated") === false) {
        err = {
            Generated: false,
            Page: "Scr_VisitPoint_DB_Controller",
            Method: "Validator",
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

$scope.Add_Task_In_VisitPoint_Array_edit = function(Task_Obj){
	try{
	
      if ($scope.Validator(Task_Obj) === false) {
        
        $.notify({message: "Todos los campos son necesarios"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	//alert("Todos los campos son necesarios");
        
    } else {
    	
    	
    	$scope.create_Task(Task_Obj);
    
  /* if(typeof Task_Obj.JobID === 'undefined'){
   		Task_Obj.JobID = (new Date().getTime()).toString();
    //$scope.Array_VisitPoint_Task_Edit.push(Task_Obj);
	
  }else{
    for(var i = 0; i < $scope.Array_VisitPoint_Task_Edit.length; i++){
       if($scope.Array_VisitPoint_Task_Edit[i].JobID === Task_Obj.JobID){
	$scope.create_Task(Task_Obj);
	$scope.X[i] = obj;
              break;
       }
    }
  }*/
  $scope.Task_Obj = {};

	
	}
		
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_Task_In_VisitPoint_Array",
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


$scope.create_Task = function(Task_Obj) {
try{
var obj = {};
		  if(Task_Obj.JobType === "delivery"){
		  	obj.JobTypeEs = "Entrega";
		  }else{
		  	obj.JobTypeEs = "Recolección";
		  }
		switch(Task_Obj.JobClass) {
		    case "SS":
		        {
		        	obj.JobClass="SS";
					obj.JobID = Task_Obj.JobID;
					obj.JobType = Task_Obj.JobType;
					obj.JobName = Task_Obj.JobName;
					obj.JobDescription = Task_Obj.JobDescription;
					obj.JobInstructions = Task_Obj.JobInstructions;
					obj.BarCode = Task_Obj.BarCode;
					obj.UOM = Task_Obj.UOM;
					obj.Quantity = Task_Obj.Quantity;
					obj.JobWeight = Task_Obj.JobWeight;
					obj.JobCubics = Task_Obj.JobCubics;
					obj.Quantity_Register = 0;
					obj.JobState = "Uninitiated";
					obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
					obj.JobImage = "Funcion de Photos('Task.Photo')";
					obj.JobActions = [];
					  if(typeof Task_Obj.JobID === 'undefined'){
				   		Task_Obj.JobID = (new Date().getTime()).toString();
						if($scope.Array_VisitPoint_Task_Edit){
							$scope.Array_VisitPoint_Task_Edit.push(obj);			
						}else{
							$scope.Array_VisitPoint_Task_Edit = [];
							$scope.Array_VisitPoint_Task_Edit.push(obj);	
						}
				  }else{
				    for(var i = 0; i < $scope.Array_VisitPoint_Task_Edit.length; i++){
				       if($scope.Array_VisitPoint_Task_Edit[i].JobID === Task_Obj.JobID){
				       	$scope.Array_VisitPoint_Task_Edit[i] = obj;
				              break;
				       }
				    }
				  }
					$scope.VisitPoint_Add_Task = {};
					
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
           $scope.Tareas=false;
		        	break;
		        }
		    case "SU":
		   		{
		        	obj.JobClass="SU";
					obj.JobID = Task_Obj.JobID;
					obj.JobType = Task_Obj.JobType;
					obj.JobName = Task_Obj.JobName;
					obj.JobDescription = Task_Obj.JobDescription;
					obj.JobInstructions = Task_Obj.JobInstructions;
					obj.UOM = Task_Obj.UOM;
					obj.Quantity = Task_Obj.Quantity;
					
					obj.JobWeight = Task_Obj.JobWeight;
					obj.JobCubics = Task_Obj.JobCubics;
					obj.Quantity_Register = 0;
					obj.JobState = "Uninitiated";
					obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
					obj.JobImage = "Funcion de Photos('Task.Photo')";
					obj.JobActions = [];
						  if(typeof Task_Obj.JobID === 'undefined'){
				   		Task_Obj.JobID = (new Date().getTime()).toString();
						if($scope.Array_VisitPoint_Task_Edit){
							$scope.Array_VisitPoint_Task_Edit.push(obj);			
						}else{
							$scope.Array_VisitPoint_Task_Edit = [];
							$scope.Array_VisitPoint_Task_Edit.push(obj);	
						}
				  }else{
				    for(var i = 0; i < $scope.Array_VisitPoint_Task_Edit.length; i++){
				       if($scope.Array_VisitPoint_Task_Edit[i].JobID === Task_Obj.JobID){
				       	$scope.Array_VisitPoint_Task_Edit[i] = obj;
				              break;
				       }
				    }
				  }
					$scope.VisitPoint_Add_Task = {};
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
           $scope.Tareas=false;
		        	break;
		        }
		    case "SP":
		    	{
		        	obj.JobClass="SP";
					obj.JobID = Task_Obj.JobID;
					obj.JobType = Task_Obj.JobType;
					obj.JobName = Task_Obj.JobName;
					obj.Serial_List= Task_Obj.Serial_List;//$scope.Array_Serials;
					obj.JobDescription = Task_Obj.JobDescription;
					obj.JobInstructions = Task_Obj.JobInstructions;
					obj.UOM = Task_Obj.UOM;
					obj.Quantity = ($scope.Array_Serials.length);
					obj.JobWeight = Task_Obj.JobWeight;
					obj.JobCubics = Task_Obj.JobCubics;
					obj.Quantity_Register = 0;
					obj.JobState = "Uninitiated";
					obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
					obj.JobImage = "Funcion de Photos('Task.Photo')";
					obj.JobActions = [];		
						  if(typeof Task_Obj.JobID === 'undefined'){
				   		Task_Obj.JobID = (new Date().getTime()).toString();
				    if($scope.Array_VisitPoint_Task_Edit){
							$scope.Array_VisitPoint_Task_Edit.push(obj);			
						}else{
							$scope.Array_VisitPoint_Task_Edit = [];
							$scope.Array_VisitPoint_Task_Edit.push(obj);	
						}
				  }else{
				    for(var i = 0; i < $scope.Array_VisitPoint_Task_Edit.length; i++){
				       if($scope.Array_VisitPoint_Task_Edit[i].JobID === Task_Obj.JobID){
				       	$scope.Array_VisitPoint_Task_Edit[i] = obj;
				              break;
				       }
				    }
				  }
					$scope.VisitPoint_Add_Task = {};
					$scope.Array_Serials = [];
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
           $scope.Tareas=false;
		        	break;
		        }
		}
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "create_Task",
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

$scope.Add_Task_In_VisitPoint_Array = function(Task_Obj){
	try{
		
	if(Task_Obj.Type === "" || Task_Obj.Type === 0 ||
	Task_Obj.Name === "" || Task_Obj.Name === undefined ||
	Task_Obj.Serial === "" || Task_Obj.Serial === undefined ||
	Task_Obj.Description === "" || Task_Obj.Description === undefined ||
	Task_Obj.Instruction === "" || Task_Obj.Instruction === undefined ||
	Task_Obj.UoM === "" || Task_Obj.UoM === undefined ||
	Task_Obj.JobWeight === "" || Task_Obj.JobWeight === undefined ||
	Task_Obj.JobCubics === "" || Task_Obj.JobCubics === undefined ){
			
//$.notify({title:"¡Alerta!",message: "Debe completar todos los campos"},{type: 'success',animate: {enter: 'animated fadeInRight',exit: 'animated fadeOutRight'},offset: {x: 50,y: 100}});
	bootbox.dialog({
			title:"¡Alerta!",
			message:"Debe completar todos los campos",
			buttons:{
				main:{
					label:"Ok!",
					className:"btn-primary"
				}
			}
				
			});  
		}
		else{

		/*
		var cantidad={};
		var id=$scope.VisitPoint_Add.ID_Truck;*/
		        	var obj = {};
		  if(Task_Obj.Type === "delivery"){
		  	obj.JobTypeEs = "Entrega";
		  }else{
		  	obj.JobTypeEs = "Recolección";
		  }
		switch(Task_Obj.Serial) {
		    case "SS":
		        {
		        	obj.JobClass="SS";
					obj.JobID = (new Date().getTime()).toString();
					obj.JobType = Task_Obj.Type;
					obj.JobName = Task_Obj.Name;
					obj.JobDescription = Task_Obj.Description;
					obj.JobInstructions = Task_Obj.Instruction;
					obj.BarCode = Task_Obj.BarCode;
					obj.UOM = Task_Obj.UoM;
					obj.Quantity = Task_Obj.Quantity;
    	            obj.Status_Created = "Admin";
				/*	cantidad.JobWeight = Task_Obj.JobWeight;
					cantidad.JobCubics = Task_Obj.JobCubics;*/
				//	var Weight=($scope.ObjVeh.Weight-$scope.Data_Vehicule[ArrayVehicle[i].ID_Truck])
					if(Task_Obj.JobWeight>$scope.Weight){
						$scope.VisitPoint_Add_Task.alert=("El peso indicado sobre pasa en "+(Task_Obj.JobWeight-$scope.Weight)+" el peso disponible en la unidad de transporte, solo se cuenta con "+$scope.Weight);
						Task_Obj.JobWeight="";
						 document.getElementById("TaskWeight").focus();
		        	break;
					}else{						
					obj.JobWeight = Task_Obj.JobWeight;					
					$scope.Weight=$scope.Weight-obj.JobWeight;
		$scope.freeWeight =$scope.Weight;					
					}
					if(Task_Obj.JobCubics>$scope.Cubics){
						$scope.VisitPoint_Add_Task.alert=("El volumen indicado sobre pasa en "+(Task_Obj.JobWeight-$scope.Cubics)+" el volumen disponible en la unidad de transporte, solo se cuenta con "+$scope.Cubics);
						Task_Obj.JobCubics="";
						 document.getElementById("TaskCubics").focus();
		        	break;
					}else{						
					obj.JobCubics = Task_Obj.JobCubics;					
					$scope.Cubics=$scope.Cubics-obj.JobCubics;
		$scope.freeCubics =$scope.Cubics;					
					}
					
					//obj.JobCubics = Task_Obj.JobCubics;
					obj.Quantity_Register = 0;
					obj.JobState = "Uninitiated";
					obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
					obj.JobImage = "Funcion de Photos('Task.Photo')";
					obj.JobActions = [];
					if($scope.VisitPoint_Add_Array_Task){
						//$scope.Verify_Weight_Volume(id,cantidad);
						$scope.VisitPoint_Add_Array_Task.push(obj);			
					}else{
						$scope.VisitPoint_Add_Array_Task = [];
						//$scope.Verify_Weight_Volume(id,cantidad);
						$scope.VisitPoint_Add_Array_Task.push(obj);	
					}
					$scope.VisitPoint_Add_Task = {};
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
		        	break;
		        }
		    case "SU":
		   		{
		        	obj.JobClass="SU";
					obj.JobID = (new Date().getTime()).toString();
					obj.JobType = Task_Obj.Type;
					obj.JobName = Task_Obj.Name;
					obj.JobDescription = Task_Obj.Description;
					obj.JobInstructions = Task_Obj.Instruction;
					obj.UOM = Task_Obj.UoM;
					obj.Quantity = Task_Obj.Quantity;
    	            obj.Status_Created = "Admin";
					if(Task_Obj.JobWeight>$scope.Weight){
						$scope.VisitPoint_Add_Task.alert("El peso indicado sobre pasa en "+(Task_Obj.JobWeight-$scope.Weight)+" el peso disponible en la unidad de transporte, solo se cuenta con "+$scope.Weight);
						Task_Obj.JobWeight="";
						 document.getElementById("TaskWeight").focus();
		        	break;
					}else{						
					obj.JobWeight = Task_Obj.JobWeight;		
					$scope.Weight=$scope.Weight-obj.JobWeight;
		$scope.freeWeight =$scope.Weight;
					}
					//obj.JobWeight = Task_Obj.JobWeight;
					
					if(Task_Obj.JobCubics>$scope.Cubics){
						$scope.VisitPoint_Add_Task.alert=("El volumen indicado sobre pasa en "+(Task_Obj.JobWeight-$scope.Cubics)+" el volumen disponible en la unidad de transporte, solo se cuenta con "+$scope.Cubics);
						Task_Obj.JobCubics="";
						 document.getElementById("TaskCubics").focus();
		        	break;
					}else{						
					obj.JobCubics = Task_Obj.JobCubics;					
					$scope.Cubics=$scope.Cubics-obj.JobCubics;
		$scope.freeCubics =$scope.Cubics;					
					}
					
					//obj.JobCubics = Task_Obj.JobCubics;
					obj.Quantity_Register = 0;
					obj.JobState = "Uninitiated";
					obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
					obj.JobImage = "Funcion de Photos('Task.Photo')";
					obj.JobActions = [];
					if($scope.VisitPoint_Add_Array_Task){
						$scope.VisitPoint_Add_Array_Task.push(obj);			
					}else{
						$scope.VisitPoint_Add_Array_Task = [];
						$scope.VisitPoint_Add_Array_Task.push(obj);	
					}
					$scope.VisitPoint_Add_Task = {};
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
		        	break;
		        }
		    case "SP":
		    	{
		        	obj.JobClass="SP";
					obj.JobID = (new Date().getTime()).toString();
					obj.JobType = Task_Obj.Type;
					obj.JobName = Task_Obj.Name;
					obj.Serial_List= $scope.Array_Serials;
					obj.JobDescription = Task_Obj.Description;
					obj.JobInstructions = Task_Obj.Instruction;
    	            obj.Status_Created = "Admin";
					obj.UOM = Task_Obj.UoM;
					obj.Quantity = ($scope.Array_Serials.length);
					if(Task_Obj.JobWeight>$scope.Weight){
						$scope.VisitPoint_Add_Task.alert("El peso indicado sobre pasa en "+(Task_Obj.JobWeight-$scope.Weight)+" el peso disponible en la unidad de transporte, solo se cuenta con "+$scope.Weight);
						Task_Obj.JobWeight="";
						 document.getElementById("TaskWeight").focus();
		        	break;
					}else{						
					obj.JobWeight = Task_Obj.JobWeight;		
					$scope.Weight=$scope.Weight-obj.JobWeight;
		$scope.freeWeight =$scope.Weight;
					}
					//obj.JobWeight = Task_Obj.JobWeight;
					
					if(Task_Obj.JobCubics>$scope.Cubics){
						$scope.VisitPoint_Add_Task.alert=("El volumen indicado sobre pasa en "+(Task_Obj.JobWeight-$scope.Cubics)+" el volumen disponible en la unidad de transporte, solo se cuenta con "+$scope.Cubics);
						Task_Obj.JobCubics="";
						 document.getElementById("TaskCubics").focus();
		        	break;
					}else{						
					obj.JobCubics = Task_Obj.JobCubics;					
					$scope.Cubics=$scope.Cubics-obj.JobCubics;
		$scope.freeCubics =$scope.Cubics;					
					}
					
					//obj.JobCubics = Task_Obj.JobCubics;
					obj.Quantity_Register = 0;
					obj.JobState = "Uninitiated";
					obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
					obj.JobImage = "Funcion de Photos('Task.Photo')";
					obj.JobActions = [];					
					if($scope.VisitPoint_Add_Array_Task){
						$scope.VisitPoint_Add_Array_Task.push(obj);			
					}else{
						$scope.VisitPoint_Add_Array_Task = [];
						$scope.VisitPoint_Add_Array_Task.push(obj);	
					}
					$scope.VisitPoint_Add_Task = {};
					$scope.Array_Serials = [];
	       $scope.Show_Serie=false;
           $scope.Show_Code=false;
           $scope.Show_Quantity=false;
		        	break;
		        }
		}
		}
		
		/*
		var obj = {};
		obj.JobID = (new Date().getTime()).toString();
		obj.JobType = Task_Obj.Type;
		obj.JobName = Task_Obj.Name;
		obj.JobDescription = Task_Obj.Description;
		obj.JobInstructions = Task_Obj.Instruction;
		
		obj.BarCode = Task_Obj.BarCode;
		obj.UOM = Task_Obj.UoM;
		obj.Quantity = Task_Obj.Quantity;
		obj.JobWeight = Task_Obj.JobWeight;
		obj.JobCubics = Task_Obj.JobCubics;
		obj.Quantity_Register = 0;
		obj.JobState = "Uninitiated";
		obj.JobValidator = "var arr = obj.JobActions;var suma = 0; for (var j = 0; j < arr.length; j++) {suma = suma + arr[j].Quantity;} if(suma == 0){return \"Not_Started\";} else if(suma == obj.Quantity){return \"Finalized\";} else if(suma > 0 && suma < obj.Quantity){return \"In_Process\";}";
		obj.JobImage = "Funcion de Photos('Task.Photo')";
		obj.JobActions = [];
		if($scope.VisitPoint_Add_Array_Task){
			$scope.VisitPoint_Add_Array_Task.push(obj);			
		}else{
			$scope.VisitPoint_Add_Array_Task = [];
			$scope.VisitPoint_Add_Array_Task.push(obj);	
		}
		$scope.VisitPoint_Add_Task = {};*/
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Add_Task_In_VisitPoint_Array",
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
	
function Delete_Attributes(arr){
	try{
	var Json_Array = arr;
	
	for(var i = 0; i < Json_Array.length; i++){
		
		var Obj = Json_Array[i];
		
		delete Obj._id;
		delete Obj.Visit_Point_Incidents;
		delete Obj.Visit_Point_Incidents_Type;
		delete Obj.Visit_Point_States;
		delete Obj.Visit_State;
		delete Obj.Visit_Point_Abort;
		delete Obj.Visit_Point_Confirm;
		delete Obj.Transferring_State;
		delete Obj.$$hashKey;
		
		for(var y = 0; y < Obj.Jobs.length; y++){
			
			var Job = Obj.Jobs[y];
			
			delete Job.JobActions;
			delete Job.Quantity_Register;
			delete Job.JobState;		
			delete Job.JobImage;
			delete Job.JobValidator;
			delete Job.$$hashKey;
				
		}
		
	}	
	
	return Json_Array;
	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Delete_Attributes",
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


function Export_JSON(arr){
	try{
	var text = [];
	
	text.push(JSON.stringify(Delete_Attributes(arr)));
    
    var file = new Blob(text, {
        type: 'application/json'
    });
	
	
    Download_File(file, 'Puntos_de_Visita.json');

	
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_JSON",
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


function Download_File(contenidoEnBlob, nombreArchivo) {
   try{
   var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Download_File",
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

function Export_XML(arr){
	try{
	Download_File(Generate_XML(arr), 'Puntos_de_Visita.xml');

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_XML",
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

function Generate_XML(arr) {
	try{
	var datos = arr ; 
    var texto = [];
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
	texto.push('<Data>\n');
	for(var i = 0; i < datos.length; i++){
		texto.push('<VisitPoint>\n');
		
		texto.push('\t<ID_Location>' + datos[i].ID_Location + '</ID_Location>\n');
		texto.push('\t<Manager>' + datos[i].Manager + '</Manager>\n');
		texto.push('\t<Name>' + datos[i].Name + '</Name>\n');
		texto.push('\t<Address>' + datos[i].Address + '</Address>\n');
		texto.push('\t<TelephoneNumber>' + datos[i].Telephone_Number + '</TelephoneNumber>\n');
		texto.push('\t<Mail>' + datos[i].Mail + '</Mail>\n');
		texto.push('\t<Latitude>' + datos[i].Latitude + '</Latitude>\n');
		texto.push('\t<Longitude>' + datos[i].Longitude + '</Longitude>\n');
		texto.push('\t<Order_Number>' + datos[i].Order_Number + '</Order_Number>\n');
		texto.push('\t<ID_Truck>' + datos[i].ID_Truck + '</ID_Truck>\n');
		texto.push('\t<Invoice>' + datos[i].Invoice + '</Invoice>\n');
		texto.push('\t<Sequence>' + datos[i].Sequence + '</Sequence>\n');
		texto.push('\t<EstimatedDate>' + datos[i].Estimated_Date + '</EstimatedDate>\n');
		texto.push('\t<EstimatedDeliveryTime>'+ datos[i].Estimated_Delivery_Time+'</EstimatedDeliveryTime>\n');
		texto.push('<DeliveryPeriod>\n');
		texto.push('\t<Start>' + datos[i].Delivery_Period_Start + '</Start>\n');
		texto.push('\t<End>' + datos[i].Delivery_Period_End + '</End>\n');
		texto.push('</DeliveryPeriod>\n');
		texto.push('\t<User>' + datos[i].User + '</User>\n');
		
		for(var j = 0; j < datos[i].Jobs.length; j++){
			texto.push('<Jobs>\n');
			
	texto.push('\t<JobID>' + datos[i].Jobs[j].JobID + '</JobID>\n');
	texto.push('\t<JobType>' + datos[i].Jobs[j].JobType + '</JobType>\n');
	texto.push('\t<JobName>' + datos[i].Jobs[j].JobName + '</JobName>\n');
	texto.push('\t<BarCode>' + datos[i].Jobs[j].BarCode + '</BarCode>\n');
	texto.push('\t<JobDescription>' + datos[i].Jobs[j].JobDescription + '</JobDescription>\n');
	texto.push('\t<UOM>' + datos[i].Jobs[j].UOM + '</UOM>\n');
	texto.push('\t<Quantity>' + datos[i].Jobs[j].Quantity + '</Quantity>\n');
	texto.push('\t<JobWeight>' + datos[i].Jobs[j].JobWeight+ '</JobWeight>\n');
	texto.push('\t<JobCubics>' + datos[i].Jobs[j].JobCubics+ '</JobCubics>\n');
	texto.push('\t<JobInstructions>' + datos[i].Jobs[j].JobInstructions + '</JobInstructions>\n');
	
			texto.push('</Jobs>\n');
		}
		texto.push('</VisitPoint>\n');
	}
	texto.push('</Data>\n');
    
    return new Blob(texto, {
        type: 'application/xml'
    });

}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Generate_XML",
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
function Export_CSV(arr) {
	try{
    
    var arrData = arr;
    var CSV = '';    
    
        var row = "";
           
   		    row += '"ID_Location",';
			row += '"Manager",';
			row += '"Name",';
			row += '"Address",';
			row += '"Telephone_Number",';
			row += '"Mail",';
			row += '"Latitude",';
			row += '"Longitude",';
			row += '"Sequence",';
			row += '"Order_Number",';
			row += '"ID_Truck",';
			row += '"Invoice",';
			row += '"Estimated_Date",';
			row += '"Estimated_Delivery_Time",';
			row += '"Delivery_Period_Start",';
			row += '"Delivery_Period_End",';
			row += '"User",';
			row += '"JobID",';
			row += '"JobType",';
			row += '"JobName",';
		//	row += '"BarCode",';
			row += '"JobDescription",';
			row += '"UOM",';
		//	row += '"Quantity",';
			row += '"JobWeight",';
			row += '"JobCubics",';
			row += '"JobInstructions",';
			
			row += '"JobClass",';
			row += '"JobInfo",';
			row += '"Canton",';
			row += '"Province",';
			row += '"District",';
			row += '"Country",';
			row += '"Legal_Cedula",';
			row += '"Route_Name",';
			row += '"ID_Route",';
			row += '"",';
			
        
        row = row.slice(0, -1);
         
        CSV += row + '\r\n';
    	
    for (var i = 0; i < arrData.length; i++) {
      
		for(var j = 0; j < arrData[i].Jobs.length; j++){
		row = "";
		row += '"' + arrData[i].ID_Location + '",';
		row += '"' + arrData[i].Manager + '",';
		row += '"' + arrData[i].Name + '",';
		row += '"' + arrData[i].Address + '",';
		row += '"' + arrData[i].Telephone_Number + '",';
		row += '"' + arrData[i].Mail + '",';
		row += '"' + arrData[i].Latitude + '",';
		row += '"' + arrData[i].Longitude + '",';
		row += '"' + arrData[i].Sequence + '",';
		row += '"' + arrData[i].Order_Number + '",';
		row += '"' + arrData[i].ID_Truck + '",';
		row += '"' + arrData[i].Invoice + '",';
		row += '"' + arrData[i].Estimated_Date + '",';
		//console.log(arrData[i].Estimated_Date);
		row += '"' + arrData[i].Estimated_Delivery_Time + '",';
		row += '"' + arrData[i].Delivery_Period_Start + '",';
		row += '"' + arrData[i].Delivery_Period_End + '",';
		row += '"' + arrData[i].User + '",';	
		row += '"' + arrData[i].Jobs[j].JobID + '",';
		row += '"' + arrData[i].Jobs[j].JobType + '",';
		row += '"' + arrData[i].Jobs[j].JobName + '",';
		//row += '"' + arrData[i].Jobs[j].BarCode + '",';
		row += '"' + arrData[i].Jobs[j].JobDescription + '",';
		row += '"' + arrData[i].Jobs[j].UOM + '",';
		//row += '"' + arrData[i].Jobs[j].Quantity + '",';
		row += '"' + arrData[i].Jobs[j].JobWeight + '",';
		row += '"' + arrData[i].Jobs[j].JobCubics + '",';
		row += '"' + arrData[i].Jobs[j].JobInstructions + '",';
		
		row += '"' + arrData[i].Jobs[j].JobClass + '",';
		 switch(arrData[i].Jobs[j].JobClass){
	 case 'SP':{
	 	var BarCode="";
		for(var K = 0; K < arrData[i].Jobs[j].Serial_List.length; K++){
			BarCode=arrData[i].Jobs[j].Serial_List[K].Serial+"|"+BarCode;
		}
	    row += '"' + BarCode+arrData[i].Jobs[j].Quantity+'",';		 
			break;   
      } 
      case 'SS':{
	    row += '"' + arrData[i].Jobs[j].BarCode + "|"+arrData[i].Jobs[j].Quantity+'",';
			break;          
      } 
     case 'SU':{       
	    row += '"' + arrData[i].Jobs[j].Quantity+'",';
			break;
      }

	}
		
		row += '"' + arrData[i].Canton + '",';
		row += '"' + arrData[i].Province + '",';
		row += '"' + arrData[i].District + '",';
		row += '"' + arrData[i].Country + '",';
		row += '"' + arrData[i].Legal_Cedula + '",';
		row += '"' + arrData[i].Route.Route_Name + '",';
		row += '"' + arrData[i].Route.ID_Route + '",';
		row += '"",';
		
	//	row += '"' + arrData[i].Jobs[j].JobInfo + '",';
		//row += '"' + arrData[i].Jobs[j].Quantity + '",';
		//row += '"' + arrData[i].Jobs[j].BarCode + '",';
		
		
		row.slice(0, row.length - 1);
       
        CSV += row + '\r\n';
		}        
    }  
    
    if (CSV === '') {        
        alert("Invalid data");
        return;
    }  

    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = "Puntos_de_Visita.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   
   
   
}catch (e) {
        
        var err;
        
        if (e.hasOwnProperty("Generated") === false) {
            err = {
                Generated: false,
                Page: "Scr_VisitPoint_DB_Controller",
                Method: "Export_CSV",
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