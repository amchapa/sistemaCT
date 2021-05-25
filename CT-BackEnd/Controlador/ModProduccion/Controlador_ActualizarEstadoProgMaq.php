<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();

if(isset($_POST['_codigo'])){
    
    $codigo = $_POST['_codigo'];
    $estado = $_POST['_estado'];
    $fecha = $_POST['_fecha'];
    $palabra = $_POST['_palabra'];
    
    if($Model_Produccion->actualizarEstadoPrograMaq($codigo,$estado,$fecha,$palabra)){
        
        $msg = array(
            "response" => 1,
            "message" => "Actualizacion correcta"                      
            );   
        
    }else{
        
        $msg = array(
            "response" => 0,
            "message" => "Ingrese correctamente los datos"                    
            );  
    }
}else{
    
    $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($msg);  

?>