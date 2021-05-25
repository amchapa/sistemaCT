<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigoItem']) && isset($_POST['_codigoReemplazar'])){

    //GUARDAR PARAMETROS EN VARIABLES
    $codigoItem= $_POST['_codigoItem'];
    $codigoReemplazar = $_POST['_codigoReemplazar'];
    $descripcion= $_POST['_descripcion'];
    $nombreitem= $_POST['_nombreitem'];
    $cantidad= $_POST['_cantidad'];
    $unidad= $_POST['_unidadMedida'];
    $observacion= $_POST['_observacion'];
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->actualizarItem($codigoItem,$codigoReemplazar,$descripcion,$nombreitem,$cantidad,$unidad,$observacion)){                        
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