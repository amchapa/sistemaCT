<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Proveedor.php");

$Model_Proveedor = new Model_Proveedor();


if(isset($_POST['_razonSocial'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $razonSocial = $_POST['_razonSocial'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Proveedor->validarProveedor($razonSocial)){       
        
        $data = $Model_Proveedor->validarProveedor($razonSocial);                      
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{
        
        $data = array(
            "response" => 1,
            "message" => "No existen registros del proveedor. Registrar."                      
            );  
    }
}else{
    
    $data = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($data); 

?>