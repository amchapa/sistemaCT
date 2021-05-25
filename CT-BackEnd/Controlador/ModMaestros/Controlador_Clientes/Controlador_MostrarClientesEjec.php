<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Clientes.php");

$Model_Clientes = new Model_Clientes();

if(isset($_POST['_Ejecutiva'])){
    
    $variable = $_POST['_Ejecutiva'];
    
    if($Model_Clientes->mostrarClientesEjec($variable)){
        
        $data = $Model_Clientes->mostrarClientesEjec($variable);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Clientes no encontrados"                      
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