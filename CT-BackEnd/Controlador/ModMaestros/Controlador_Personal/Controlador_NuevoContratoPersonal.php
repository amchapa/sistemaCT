<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();

if( isset($_POST['_fechacontrato']) && isset($_POST['_tiempo'])){
    
    $variable1 = $_POST['_codigocontrato'];
    $variable2 = $_POST['_fechacontrato'];
    $variable3 = $_POST['_tiempo'];
    $variable5 = $_POST['_contrcodigo'];
    
    if($Model_Personal->nuevoContratoPersonal($variable1,$variable2,$variable3,$variable5)){
        
        $data = $Model_Personal->nuevoContratoPersonal($variable1,$variable2,$variable3,$variable5);
        
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