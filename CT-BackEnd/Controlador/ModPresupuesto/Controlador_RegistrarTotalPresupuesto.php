<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_code']) && isset($_POST['_cantItem']) ){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_code'];
    $cantItem = $_POST['_cantItem'];
    $totalSoles = $_POST['_totalSoles'];
    $totalDolares = $_POST['_totalDolares'];
        
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->actualizarPresupuestoTotal($codigo,$cantItem,$totalSoles,$totalDolares)){                        
        $msg =$Model_Presupuesto->actualizarPresupuestoTotal($codigo,$cantItem,$totalSoles,$totalDolares);                        
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                        
        $msg = array(
            "response" => 0,
            "message" => "No existen datos"                    
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