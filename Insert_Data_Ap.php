<?php

      switch($dataObject->Collection_Name){
    
             case 'Store_Error':
                {
                  require 'Insert_Error.php';
                  break;
                } 
             case 'Store_Answers_Polls':
                {
                  require 'Insert_Answers_Polls.php';
                  break;
                } 
              case 'Store_Geolocation':
                {
                  require 'Insert_Geolocation.php';
                  break;
                } 
              case 'Store_Jobs':
                {
                  require 'Update_Jobs_Ap.php';
                  break;
                } 
              case 'Store_Trip':
                {
                  require 'Insert_Summary_Trip.php';
                  break;
                }  
              case 'Store_VisitPoint':
                {
                  require 'Insert_Summary_VisitPoint.php';
                  break;
                } 
              case 'Store_Item':
                {
                  require 'Insert_Summary_Item.php';
                  break;
                } 
        
             case 'Store_Notification':
                {
                  require 'Update_Notification.php';
                  break;
                } 
        
             case 'Store_Case_Change_GPS':
                {
                  require 'Insert_Store_Case_Change_GPS.php';
                  break;
                } 
              default:
                {
                  require 'Insert_Default.php';
                  break;
                } 
      } 
     
   
?>