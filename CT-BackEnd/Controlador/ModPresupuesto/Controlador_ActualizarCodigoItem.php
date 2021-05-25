<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_codAnterior']) && isset($_POST['_codNuevo']) && isset($_POST['_codDetalle']) && isset($_POST['_codPrecio']) ){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigoAnterior = $_POST['_codAnterior'];
    $codigoNuevo = $_POST['_codNuevo'];
    $codigoDetalle = $_POST['_codDetalle'];
    $codigoPrecio = $_POST['_codPrecio'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->actualizarCodItem($codigoAnterior,$codigoNuevo,$codigoDetalle,$codigoPrecio)){                        
        $msg =$Model_Presupuesto->actualizarCodItem($codigoAnterior,$codigoNuevo,$codigoDetalle,$codigoPrecio);                        
    
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
