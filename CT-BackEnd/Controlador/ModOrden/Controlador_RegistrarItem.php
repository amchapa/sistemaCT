<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigoItem']) && isset($_POST['_detAcabado']) && isset($_POST['_pPrenCodigo']) && isset($_POST['_oProduccionCodigo']) && isset($_POST['_empaqCodigo']) && isset($_POST['_numPresu'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $codigoItem= $_POST['_codigoItem'];
    $codigoDetAcabado= $_POST['_detAcabado'];
    $codigoPPrensa= $_POST['_pPrenCodigo'];
    $codigoOrProduccion= $_POST['_oProduccionCodigo'];
    $codigoEmpaquetado= $_POST['_empaqCodigo'];
    $nombreItem= $_POST['_nombre'];
    $descripcion= $_POST['_descripcion'];
    $cantidad= $_POST['_cantidad'];
    $unidad= $_POST['_unidadMedida'];
    $importe= $_POST['_importe'];
    $observacion= $_POST['_observacion'];
    $numPresu= $_POST['_numPresu'];
   
    

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->registrarItem($codigoItem,$codigoDetAcabado,$codigoPPrensa,$codigoOrProduccion,$codigoEmpaquetado,$nombreItem,$descripcion,$cantidad,$unidad,$importe,$observacion,$numPresu)){                        
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