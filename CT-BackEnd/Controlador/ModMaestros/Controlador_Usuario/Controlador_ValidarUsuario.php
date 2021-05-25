<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Usuario.php");

$Model_Usuario = new Model_Usuario();


if(isset($_POST['_usuario'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $usuario = $_POST['_usuario'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Usuario->validarUsuario($usuario)){       
        
        $data = $Model_Usuario->validarUsuario($usuario);                      
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{
        
        $data = array(
            "response" => 1,
            "message" => "No existen registros del usuario. Registrar."                      
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