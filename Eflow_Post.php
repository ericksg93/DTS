<?php
try{
//Header access
header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Credentials: true ');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
//Json to Array      
$json = file_get_contents('php://input');
$dataObject = json_decode($json);
switch($dataObject->Method_Name){
    
   case 'Change_Password':
    {
      require 'Change_Password.php';
      break;
    }     
  case 'Update_Jobs':
    {
      require 'Update_Jobs.php';
      break;
    } 
    case 'Update_Change_Password':
    {
      require 'Update_Change_Password.php';
      break;
    } 
    case 'Update_Invited_User':
    {
      require 'Update_Invited_User.php';
      break;
    }     
  case 'Update_Company':
    {
      require 'Update_Company.php';
      break;
    } 
  case 'Update_Users':
    {
      require 'Update_Users.php';
      break;
    } 
  case 'Update_Visit_Point':
    {
      require 'Update_Visit_Point.php';
      break;
    } 
  case 'Update_Vehicles':
    {
      require 'Update_Vehicles.php';
      break;
    } 
  case 'Update_Route':
    {
      require'Update_Route.php';
      break;      
    }
  case 'Update_Info_Vehicle':
    {
      require 'Update_Info_Vehicle.php';
      break;
    } 
  case 'Update_Store_Case_Change_GPS':
    {
      require 'Update_Store_Case_Change_GPS.php';
      break;
    } 
  case 'Insert_Binnacle':
    {
      require 'Changes_Binnacle.php';
      break;
    }
  case 'Company_Registration':
    {
      require 'Company_Registration.php';
      break;
    } 
  case 'Insert_Geolocation':
    {
      require 'Insert_Geolocation.php';
      break;
    }
  case 'Insert_VisitPoint':
    {
      //require 'Insert_Notification.php';
      require 'Insert_Jobs.php';
      break;
    }
  case 'Send_Invited_Mail':
    {
      require'Send_Invited_Mail.php';
      break;
    }
  case 'Insert_DataSet':
    {
      require'Insert_DataSet.php';
      break;
    }
  case 'Insert_Visit_Point':
    {
     
      require'Insert_Visit_Point.php';
      break;
    }
  case 'Insert_Job':
    {
      //require 'Insert_Notification.php';
      require'Insert_Jobs.php';
      break;
    }
  case 'Insert_Company':
    {
      //require 'Insert_Company.php';
      require'Insert_Company.php';
      break;
    }
  case 'Insert_User':
    {
      require'Insert_User.php';
      break;
    }
  case 'Insert_Vehicle':
    {
      require'Insert_Vehicle.php';
      break; 
    }
  case 'Insert_Notification':
    {
      require 'Insert_Notification.php';
     // require'Insert_Jobs.php';
      break;
    }
  case 'Insert_Data':
    {
      require'Insert_Data_Ap.php';
      break;
    }
  case 'Insert_Route':
    {
      require'Insert_Route.php';
      break;
    }
  case 'Insert_Error_Back':
    {
      require'Insert_Error_Back.php';
      break;
    }
  case 'Insert_Error':
    {
      require'Insert_Error.php';
      break;
    }
  case 'Insert_DB_Manager':
    {
      require 'Insert_DB_Manager.php';
      break;
    } 
  case 'Delete_Task':
    {
      require'Delete_Task.php';
      break;
    }
  case 'Delete_Invited_User':
    {
      require'Delete_Invited_User.php';
      break;
    }
  case 'Delete_User':
    {
      require'Delete_User.php';
      break;
    }
  case 'Delete_Visit_Point':
    {
      require'Delete_Visit_Point.php';
      break;
    }
  case 'Delete_Vehicle':
    {
      require'Delete_Vehicle.php';
      break;
    }
  case 'Delete_Case_GPS':
    {
      require'Delete_Store_Case_Change_GPS.php';
      break;
    }
  case 'Delete_Message':
    {
      require'Delete_Message.php';
      break;
    }
  case 'Delete_Route':
    {
      require 'Delete_Route.php';
      break;
    }
  case 'Check_Connectivity':
    {
      require 'Check_Connectivity.php';
      break;
    } 
  case 'Confirm_Synch':
    {
      require 'Confirm_Synch.php';
      break;
    } 
  case 'Insert_Tutorial':
    {
      require 'Insert_Tutorial.php';
      break;
    }
  case 'Insert_Dashboard':
    {
      require 'Insert_Dashboard.php';
      break;
    }
  case 'Invited_User':
    {
      require 'Invited_User.php';
      break;
    }
  default:
    {
    echo json_encode( array('Error' => 'Metodo Incorrecto'));
      break;
    }
}
}catch(Exception $e){
  echo json_encode( array('Error' => $e->getMessage()));
}

?>