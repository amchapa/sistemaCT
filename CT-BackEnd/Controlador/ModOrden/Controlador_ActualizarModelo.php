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
    $tamanoPliego= $_POST['_tamañoPliego'];
    $numeroPliego= $_POST['_numeroPliego'];
    $numeroPlaca= $_POST['_numeroPlaca'];
    $pinza= $_POST['_pinza'];
    $imagen1= $_POST['_imagen1'];
    $imagen2= $_POST['_imagen2'];
    $indicaciones= $_POST['_indicaciones'];
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->actualizarModelo($codigo,$tamanoPliego,$numeroPliego,$numeroPlaca,$pinza,$imagen1,$imagen2,$indicaciones)){                        
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