DTS_APP.controller('Scr_Info_Controller',function($scope) {

$scope.Dictionary =[
  {
    "Icon": "fa fa-user",
    "Name": "Usuarios",
    "Description": "empleados que pertenecan a la compañía pueden ser choferes auxiliares administradores entre otros."
  },
  {
    "Icon": "fa fa-truck",
    "Name": "Vehículos",
    "Description": "medio de transporte utilizado para la entrega y recoleccion de los productos que ofrece la empresa."
  },
  {
    "Icon": "fa fa-road",
    "Name": "Sector",
    "Description": "cuadrante o área en la que se dividen las entregas o recolecciones ya previamente creadas."
  },
  {
    "Icon": "fa fa-university",
    "Name": "Establecimientos",
    "Description": "local o compañía a la que se le hace una visita por una accion especifica."
  },
  {
    "Icon": "fa fa-location-arrow",
    "Name": "Puntos de visita",
    "Description": "el establecimiento que tiene asociado trabajos para realizar en una fecha especifica."
  },
  {
    "Icon": "fa fa-archive",
    "Name": "Entregas",
    "Description": "entrega de pedidos a un establecimiento en especifico en una fecha ya antes coordinada o puede ser no coordinada. "
  },
  {
    "Icon": "fa fa-archive",
    "Name": "Recolecciones",
    "Description": "Recolecciones de productos a un establecimiento en especifico en una fecha ya antes coordinada o puede ser no coordinada."
  },
  {
    "Icon": "fa fa-envelope",
    "Name": "Notificaciones",
    "Description": "mensaje que es enviado por el administrador o el sistema informando sobre algun cambio en el sistema ya sea puntos de visita como problemas con la ruta."
  },
  {
    "Icon": "fa fa-warning ",
    "Name": "Incidentes",
    "Description": "cualquier tipo de problema que se pueda presentar con la mercaderia o con el vehiculo que dificulte percial o totalmente dicho punto de visita."
  },
  {
    "Icon": "fa fa-barcode",
    "Name": "Sin Serie",
    "Description": "son todos los productos que tienen la misma serie sin importar el lote del que salió."
  },
  {
    "Icon": "fa fa-barcode",
    "Name": "Serie Única",
    "Description": "son todos los productos que no poseen serie por ejemplo las frutas o la ropa."
  },
  {
    "Icon": "fa fa-barcode",
    "Name": "Serie Programada",
    "Description": "son todos los productos que tienen una única serie por producto sin importar que los dos sean iguales tienen una serie propia por ejemplo los artículos tecnológicos. "
  }
];

$scope.init = function(){
	
	$scope.Show_Dic = false;
	
};



























});