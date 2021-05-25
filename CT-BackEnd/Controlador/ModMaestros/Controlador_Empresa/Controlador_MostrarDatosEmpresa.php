<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Empresa.php");

$Model_Empresa = new Model_Empresa();

if(isset($_POST['_empresa'])){
    
    $variable = $_POST['_empresa'];
    
    if($Model_Empresa->mostrarDatosEmpresa($variable)){
        
        $data = $Model_Empresa->mostrarDatosEmpresa($variable);
        
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