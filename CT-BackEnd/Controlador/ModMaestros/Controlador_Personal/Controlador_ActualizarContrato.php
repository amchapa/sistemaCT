<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_estado']) && isset($_POST['_fIngresoPlanilla']) && isset($_POST['_codigo']) && isset($_POST['_codContrato']) && isset($_POST['_empresa'])){

    //GUARDAR PARAMETROS EN VARIABLES
    
    $estado = $_POST['_estado'];
    $fIngresoPlanilla = $_POST['_fIngresoPlanilla'];
    $codigo = $_POST['_codigo'];
    $codContrato = $_POST['_codContrato'];
    $empresa = $_POST['_empresa'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->actualizarContrato($codigo,$estado, $fIngresoPlanilla,$codContrato,$empresa)){                        
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