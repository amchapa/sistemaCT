<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();

if($Model_Costos->mostrarAcabados()){
    
    $array = $Model_Costos->mostrarAcabados();
    
    
}else{
    
    $array = array(
            "response" => 0,
            "message" => "Informacion no encontrada"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($array);  

?>