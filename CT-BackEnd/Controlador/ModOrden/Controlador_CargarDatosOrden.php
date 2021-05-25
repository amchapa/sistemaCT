<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();

if(isset($_POST['_codigo'])){
    
    $variable = $_POST['_codigo'];
    
    if($Model_Orden->cargarDatosOrden($variable)){
        
        $data = $Model_Orden->cargarDatosOrden($variable);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Informacion no encontrada"                      
            );  
    }
}else{
    
    $data = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($data);  

?>