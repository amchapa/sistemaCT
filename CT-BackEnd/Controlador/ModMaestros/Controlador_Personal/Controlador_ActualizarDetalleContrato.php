<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_fecha']) && isset($_POST['_tiempo']) && isset($_POST['_contrato']) && isset($_POST['_estado'])){

    //GUARDAR PARAMETROS EN VARIABLES
   
    $fContratacion = $_POST['_fecha'];
    $inputCantidad = $_POST['_tiempo'];
    $detUltimoContrato = $_POST['_contrato'];
    $estado = $_POST['_estado'];
    $liquidar = $_POST['_liquidar'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->actualizarDetalleContrato($fContratacion,$inputCantidad,$detUltimoContrato,$liquidar,$estado)){                        
        $msg = array(
            "response" => 1,
            "message" => "Actualizacion correcta"                      
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