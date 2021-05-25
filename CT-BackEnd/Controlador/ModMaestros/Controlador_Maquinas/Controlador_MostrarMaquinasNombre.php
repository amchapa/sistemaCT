<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Maquinas.php");

$Model_Maquinas = new Model_Maquinas();

if(isset($_POST['_nombre'])){
    
    $variable = $_POST['_nombre'];
    
    if($Model_Maquinas->mostrarMaquinasNombre($variable)){
        
        $data = $Model_Maquinas->mostrarMaquinasNombre($variable);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Maquinas no encontrados"                      
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