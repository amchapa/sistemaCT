<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_cliente']) && isset($_POST['_vendedor']) && isset($_POST['_pContacto'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $code = $_POST['_code'];
    $cliente = $_POST['_cliente'];
    $vendedor = $_POST['_vendedor'];
    $fecha = $_POST['_fecha'];
    $cantItem = $_POST['_cantItem'];
    $pContacto = $_POST['_pContacto'];
    $totalSoles = $_POST['_totalSoles'];
    $totalDolares = $_POST['_totalDolares'];
    $detalle = $_POST['_detalle'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->registrarDatosPresupuesto($code,$cliente,$vendedor,$fecha,$cantItem,$pContacto,$totalSoles,$totalDolares,$detalle)){                        
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