// script.js

    // create the module and name it DTS_APP
        // also include ngRoute for all our routing needs
    var DTS_APP = angular.module('DTS_APP', ['ngRoute','checklist-model']);

    // configure our routes
    DTS_APP.config(function($routeProvider) {
        $routeProvider
//Rutas que existen en la página para crear una nueva basta con copiar y pegar
//y remplazar los valores
            .when('/', {
                templateUrl : 'views/Scr_Login.html'
            })
            .when('/Data_Summary',{
            	templateUrl : 'views/Scr_Summary.html'
            })
            .when('/Calendar', {
                templateUrl : 'views/Scr_Calendar.html'
            })
            .when('/ChangeGPS', {
                templateUrl : 'views/Scr_View_Change_GPS.html'
            })
            .when('/Job_Import',{
                templateUrl : 'views/Scr_Job_Import.html'
            })
			.when('/User_Import',{
            	templateUrl : 'views/Scr_User_Import.html'
            })
			.when('/Vehicle_Import',{
            	templateUrl : 'views/Scr_Vehicle_Import.html'
            })
			.when('/Route_Import',{
            	templateUrl : 'views/Scr_Route_Import.html'
            })
			.when('/Establishment_Import',{
            	templateUrl : 'views/Scr_Establishment_Import.html'
            })
            .when('/PV_DB', {
                templateUrl : 'views/Scr_VisitPoint_DB.html'
            })
            .when('/Login', {
                templateUrl : 'views/Scr_Login.html'
            })
             .when('/user', {
                templateUrl : 'views/Scr_User.html'
            })
             .when('/Establishment', {
                templateUrl : 'views/Scr_Establishment.html'
            })
            .when('/vehicle', {
                templateUrl : 'views/Scr_Vehicle.html'  
            })
            .when('/detail',{
            	templateUrl : 'views/Scr_Vehicles_Detail.html'
            })         
            .when('/Vehicles_Online', {
                templateUrl : 'views/Scr_Vehicles_Online.html'
            })
            .when('/Company_Registration',{
                templateUrl : 'views/Scr_Company_Registration.html'
            }) 
            .when('/User_Registration',{
                templateUrl : 'views/Scr_User_Registration.html'
            }) 
            .when('/User_Change_Password',{
            	templateUrl: 'views/Scr_User_Change_Password.html'
            })
            .when('/Routes',{
            	templateUrl : 'views/Scr_Route.html'
            })
            .when('/tracking',{
            	templateUrl : 'views/Scr_Tracking.html'
            })
            .when('/VisitPoint_General_View',{
            	templateUrl : 'views/Scr_VisitPoint_General_View.html'
            })
            .when('/General_Detail',{
            	templateUrl : 'views/Scr_General_Detail.html'
            })
            .when('/Settings',{
            	templateUrl : 'views/Scr_Settings.html'
            })
            .when('/404',{
            	templateUrl: 'views/Scr_404.html'
            })
            .when('/Historic_Information',{
            	templateUrl: 'views/Scr_Historic_Information.html'
            })
            .when('/Restoring_DB',{
            	templateUrl: 'views/Scr_Restoring_DB.html'
            })
            .when('/Info',{
            	templateUrl: 'views/Scr_Info.html'
            })
            .when('/Subscription',{
            	templateUrl: 'views/Scr_Subscription.html'
            })
            .when('/Notification',{
            	templateUrl: 'views/Scr_Notification.html'
            })
            .when('/Tuto',{
            	templateUrl: 'views/Scr_Tutorial.html'
            })
            .when('/Dashboard',{
            	templateUrl: 'views/Scr_Dashboard.html'
            })
            .when('/Password',{
            	templateUrl: 'views/Scr_Password.html'
            })
            .when('/Full_View',{
            	templateUrl: 'views/Scr_Full_View.html'
            })
            .otherwise({
            	redirectTo : '/404'
            });
			
    });
     
    
    
    DTS_APP.filter('startFrom',function(){
    	return function(input,start){
    		start = +start;
    		if(input){
    	    return input.slice(start);
	        }
	        return;
	    };
    });
