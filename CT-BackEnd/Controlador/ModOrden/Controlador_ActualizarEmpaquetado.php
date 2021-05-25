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
    $tipo= $_POST['_tipo'];
    $catnEmpaq1= $_POST['_cantEmpaq1'];
    $catnEmpaq2= $_POST['_cantEmpaq2'];
    $catnEmpaq3= $_POST['_cantEmpaq3'];
    $catnEmpaq4= $_POST['_cantEmpaq4'];
    $catnEmpaq5= $_POST['_cantEmpaq5'];
    $catnEmpaq6= $_POST['_cantEmpaq6'];
    $catnEmpaq7= $_POST['_cantEmpaq7'];
    $catnEmpaq8= $_POST['_cantEmpaq8'];
    $catnEmpaq9= $_POST['_cantEmpaq9'];
    $catnEmpaq10= $_POST['_cantEmpaq10'];
    $totalUnidades= $_POST['_totalUnidades'];
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->actualizarEmpaquetado($codigo,$tipo,$catnEmpaq1,$catnEmpaq2,$catnEmpaq3,$catnEmpaq4,$catnEmpaq5,$catnEmpaq6,$catnEmpaq7,$catnEmpaq8,$catnEmpaq9,$catnEmpaq10,$totalUnidades)){                        
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