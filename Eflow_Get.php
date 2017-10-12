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
    
   case 'Select_All_Change_GPS':
    {
      require'Select_All_Change_GPS.php';
      break;
    }
    case 'Select_User':
    {
      require'Select_User.php';
      break;
    }
    case 'Update_User_Registration':
    {
      require'Update_User_Registration.php';
      break;
    }
    case 'Update_Change_Password':
    {
      require 'Update_Change_Password.php';
      break;
    } 
   case 'Login_Appery':
    {
      require'Login_Appery.php';
      break;
    }
   case 'Login_Admin':
    {
   
      
      require'Login_Admin_db.php';
      break;
    }
    case 'Check_Truck_ID':
    {
      require'Check_Truck_ID.php';
      break;
    }
    case 'Check_DB_Exist':
    {
      require'Check_DB_Exist.php';
      break;
    }
   case 'Get_Data':
    {
      require'Get_Data.php';
      break;
    }
   case 'Select_User_Change_Password_Case':
    {
      require'Select_User_Change_Password_Case.php';
      break;
    }
    case 'Select_User_Registration_Case':
    {
      require'Select_User_Registration_Case.php';
      break;
    }
    case 'Get_Data_Assistant':
    {
      require'Get_Data_Assistant.php';
      break;
    }
   case 'Insert_Info_Vehicle':
    {
      require'Insert_Info_Vehicle.php';
      break;
    }
   case 'Select_All_Vehicle':
    {
      require'Select_All_Vehicle.php';
      break;
    }
   case 'Select_Vehicle':
    {
      require'Select_Vehicle.php';
      break;
    }
   case 'Select_Vehicle_AP':
    {
      require'Select_Vehicle_AP.php';
      break;
    }
    case 'Select_Subscription':
    {
		require 'Select_Subscription.php';
      break;
    }
   case 'Select_All_Route':
    {
      require'Select_All_Route.php';
      break;
    }
   case 'Select_All_User':
    {
      require'Select_All_User.php';
      break;
    }
   case 'Select_Invited_User':
    {
      require'Select_Invited_User.php';
      break;
    }
   case 'Select_All_Visit_Point':
    {
      require'Select_All_Visit_Point1.php';
      break;
    }
   case 'Select_Company':
    {
      require'Select_Company.php';
      break;
    }
   case 'Select_Jobs':
    {
      require'Select_Jobs.php';
      break;
    }
   case 'Select_Notification':
    {
      require'Select_Notification.php';
      break;
    }
   case 'Select_User_Online':
    {
      require'Select_User_Online.php';
      break;
    }
   case 'Select_Item':
    {
      require'Select_Item.php';
      break;
    }
   case 'Select_DataSet':
    {
      require'Select_DataSet.php';
      break;
    }
    case 'Select_Summary_Item':
    {
      require'Select_Summary_Item.php';
      break;
    }
    case 'Select_Summary_Visit_Point':
    {
      require'Select_Summary_Visit_Point.php';
      break;
    }
    case 'Select_Summary_Trip':
    {
      require'Select_Summary_Trip.php';
      break;
    }  
   case 'Select_Info_Vehicle':
    {
      require'Select_Info_Vehicle.php';
      break;
    }
   case 'Select_Geolocation':
    {
      require'Select_Geolocation.php';
      break;
    } 
   case 'Select_DB_Manager':
    {
      require 'Select_DB_Manager.php';
      break;
    }
   case 'Select_Tutorial':
    {
      require 'Select_Tutorial.php';
      break;
    }
    case 'Select_Data_Graph':
    {
      require 'Select_Data_Graph.php';
      break;
    }
    case 'Select_All_Change_GPS':
    {
      require 'Select_All_Change_GPS.php';
      break;
    }
    case 'Select_Dashboard':
    {
      require 'Select_Dashboard.php';
      break;
    }
   default:
    {
      echo json_encode( array('Error' => 'Metodo_Incorrecto'));
      break;
    }
}
}catch(Exception $e){
  echo json_encode( array('Error' => $e->getMessage()));
}

?>