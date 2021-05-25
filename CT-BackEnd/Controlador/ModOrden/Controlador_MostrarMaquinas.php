<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();

if($Model_Orden->mostrarMaquinas()){
    
    $array = $Model_Orden->mostrarMaquinas();
    
    
}else{
    
    $array = array(
            "response" => 0,
            "message" => "Informacion no encontrada"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($array);  

?>