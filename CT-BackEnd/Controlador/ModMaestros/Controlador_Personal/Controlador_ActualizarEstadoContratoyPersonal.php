<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_codigo']) && isset($_POST['_estPersonal']) && isset($_POST['_estContrato']) && isset($_POST['_conLaboral']) && isset($_POST['_estDetalle'])){

    
    //GUARDAR PARAMETROS EN VARIABLES
    $codigo = $_POST['_codigo'];
    $estPersonal = $_POST['_estPersonal'];
    $estContrato = $_POST['_estContrato'];
    $conLaboral = $_POST['_conLaboral'];
    $meses = $_POST['_meses'];
    $estDetalle = $_POST['_estDetalle'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->actualizarEstadoContratoyPersonal($codigo,$estPersonal,$estContrato,$conLaboral,$estDetalle,$meses)){                        
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