<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Clientes.php");

$Model_Clientes = new Model_Clientes();


if(isset($_POST['_razonSocial']) && isset($_POST['_nombreCorto']) && isset($_POST['_numIdentificacion'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $razonSocial = $_POST['_razonSocial'];
    $nombreCorto = $_POST['_nombreCorto'];
    $numIdentificacion = $_POST['_numIdentificacion'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Clientes->validarClientes($razonSocial,$nombreCorto,$numIdentificacion)){       
        
        $data = $Model_Clientes->validarClientes($razonSocial,$nombreCorto,$numIdentificacion);                      
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{
        
        $data = array(
            "response" => 1,
            "message" => "No existen registros del cliente. Registrar."                      
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