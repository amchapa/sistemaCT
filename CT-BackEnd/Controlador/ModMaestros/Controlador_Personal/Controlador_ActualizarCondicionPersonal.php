<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();

if(isset($_POST['_codigo'])){
    
    $variable = $_POST['_codigo'];
    $condicion = $_POST['_condicion'];
    $empresa = $_POST['_empresa'];
    
    if($Model_Personal->actualizarCondicionPersonal($variable,$empresa,$condicion)){
        
        $data = $Model_Personal->actualizarCondicionPersonal($variable,$empresa,$condicion);
        
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