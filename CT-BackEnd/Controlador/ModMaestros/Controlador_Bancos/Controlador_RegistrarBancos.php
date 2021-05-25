<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Bancos.php");

$Model_Bancos = new Model_Bancos();

if( isset($_POST['_nombre'])  &&  isset($_POST['_estado'])  ){
    
    
    $variable2 = $_POST['_nombre'];
    $variable3 = $_POST['_estado'];
    
    if($Model_Bancos->registrarBanco($variable2,$variable3)){
        
        $data = $Model_Bancos->registrarBanco($variable2,$variable3);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Bancos no registrados"                      
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