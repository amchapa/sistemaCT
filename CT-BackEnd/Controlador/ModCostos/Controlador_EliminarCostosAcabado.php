<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();

if(isset($_POST['_codigo'])){
    
    $codigo = $_POST['_codigo'];
    
    if($Model_Costos->eliminarCostosAcabado($codigo)){
        
        $data = $Model_Costos->eliminarCostosAcabado($codigo);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Informacion no encontrada"                      
            );  
    }
}else{
    
    $data = array(
            "response" => 1,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($data);  
