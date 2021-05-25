<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_codigo']) && isset($_POST['_fecha'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codBarra = $_POST['_codigo'];
    $fecha = $_POST['_fecha'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->validarControlHorario($codBarra,$fecha)){       
        
        $data = $Model_Personal->validarControlHorario($codBarra,$fecha);                      
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "No hay registro"                      
            );  
    }
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($data); 

?>