<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();

if(isset($_POST['_codigo']) && isset($_POST['_estado'])){
    
    $codigo= $_POST['_codigo'];
    $estado= $_POST['_estado'];
    $accion= $_POST['_accion'];
    $respuesta= $_POST['_respuesta'];
    $costoEstado= $_POST['_costoEstado'];
    $costoObjeto= $_POST['_costoObjeto'];
    $vehiculo= $_POST['_vehiculo'];
    $mensajero= $_POST['_mensajero'];
    $mensajeroInput= $_POST['_mensajeroInput'];
    $kmi= $_POST['_kmi'];
    $kmf= $_POST['_kmf'];
    
    if($Model_Produccion->actualizarEstadoDespacho($codigo,$estado,$accion,$respuesta,$costoEstado,$costoObjeto,$vehiculo,$mensajero,$mensajeroInput,$kmi,$kmf)){
        
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