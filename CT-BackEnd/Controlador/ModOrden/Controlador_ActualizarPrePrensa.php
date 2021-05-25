<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigo'])){

    //GUARDAR PARAMETROS EN VARIABLES
    $codigo= $_POST['_codigo'];
    $pruebaColor= $_POST['_pruebaColor'];
    $machote= $_POST['_machote'];
    $laser= $_POST['_laser'];
    $fabierto= $_POST['_fabierto'];
    $fcerrado= $_POST['_fcerrado'];
    $cantColor= $_POST['_cantColor'];
    $descripcionColor= $_POST['_descripcionColor'];
    $lpi= $_POST['_lpi'];
    $tipImpresion1= $_POST['_tipImpresion1'];
    $tipImpresion2= $_POST['_tipImpresion2'];
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->actualizarPrePrensa($codigo,$pruebaColor,$machote,$laser,$fabierto,$fcerrado,$cantColor,$descripcionColor,$lpi,$tipImpresion1,$tipImpresion2)){                        
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