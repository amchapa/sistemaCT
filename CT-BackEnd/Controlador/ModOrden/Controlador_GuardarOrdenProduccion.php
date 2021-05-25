<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigo']) && isset($_POST['_vendedor']) && isset($_POST['_cantitem']) && isset($_POST['_estado']) && isset($_POST['_numPresup'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $code = $_POST['_codigo'];
    $vendedor = $_POST['_vendedor'];
    $cantItem = $_POST['_cantitem'];
    $estado = $_POST['_estado'];
    $numPresup = $_POST['_numPresup'];
    $detalle = $_POST['_detalleOT'];
    $fecha = $_POST['_fechaEntrega'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->registrarOrdenProduccion($code,$vendedor,$cantItem,$estado,$numPresup,$detalle,$fecha)){                        
        $msg = array(
            "response" => 1,
            "message" => "Registro correcto"                      
            );                        
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                        
        $msg = array(
            "response" => 0,
            "message" => "Ingrese correctamente los datos"                    
            );                        
    }
    
// MENSAJE A MOSTRAR SI NO SE REALIZA LA CONSULTA    
    
}else{
    
   $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 

?>