<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();

if(isset($_POST['_codigo']) && isset($_POST['_finicio']) && isset($_POST['_ffinal'])){
    
    $codigo = $_POST['_codigo'];
    $finicio = $_POST['_finicio'];
    $ffinal = $_POST['_ffinal'];
    
    if($Model_Personal->mostrarControlHorarioxFechas($codigo,$finicio,$ffinal)){
        
        $data = $Model_Personal->mostrarControlHorarioxFechas($codigo,$finicio,$ffinal);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Informacion no encontrada"                      
            );  
    }
}else{
    
    $data = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($data);  

?>