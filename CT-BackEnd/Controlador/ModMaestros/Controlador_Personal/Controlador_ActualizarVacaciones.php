<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_codigo']) && isset($_POST['_finicio'])  && isset($_POST['_dias'])  && isset($_POST['_estado'])  && isset($_POST['_obs']) ){

    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $finicio = $_POST['_finicio'];
    $dias = $_POST['_dias'];
    $estado = $_POST['_estado'];
    $obs = $_POST['_obs'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->actualizarVacaciones($codigo,$finicio,$dias,$estado,$obs)){                        
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