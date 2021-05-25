<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../Modelo/ConexionBD.php");
require_once(__DIR__."/../Modelo/Model_Login.php");

$Model_Login = new Model_Login();

if(isset($_POST['_username']) && isset($_POST['_password'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $username = $_POST['_username'];
    $password = $_POST['_password'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Login->ingresoUsuario($username,$password)){                        
        $msg = array(
            "response" => 1,
            "message" => "Ingreso correcto"                      
            );                        
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                        
        $msg = array(
            "response" => 0,
            "message" => "Ingrese correctamente los datos"                    
            );                        
    }
    
// MENSAJE A MOSTRAR SI NO SE REALIZA LA CONSULTA    
    
}else{
    
   $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg);             

?>