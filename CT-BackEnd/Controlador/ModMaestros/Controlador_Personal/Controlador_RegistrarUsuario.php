<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_nombre']) && isset($_POST['_aPaterno']) && isset($_POST['_numIdentificacion']) && isset($_POST['_area'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $nombre = $_POST['_nombre'];
    $aPaterno = $_POST['_aPaterno'];
    $numIdentificacion = $_POST['_numIdentificacion'];
    $area = $_POST['_area'];
    
    //CREAR EL CODIGO DE USUARIO A PARTIR DE LAS 2 PRIMERAS LETRAS
    //DEL NOMBRE Y APELLIDO PATERNO
    $dimNombre = substr($nombre,0,1);
    $dimNombre = strtoupper($dimNombre);
    
    $dimPaterno = substr($aPaterno,0,1);
    $dimPaterno = strtoupper($dimPaterno);
    
    $dimIdentificacion = substr($numIdentificacion,0,2);
    
    $codigo = $dimNombre.$dimPaterno.$dimIdentificacion;
    
    //CREAR EL USUARIO A PARTIR DE LA PRIMERA LETRA DEL NOMBRE
    //Y EL APELLIDO
    $uNombre = substr($nombre,0,1);
    $uNombre = strtolower($uNombre);
    $uPaterno = strtolower($aPaterno);
    
    $usuario = $uNombre.$uPaterno;
    
    //HALLAR EL NIVEL DE ACCESO
    switch ($area) {
        case "A1":
            $nivel = 6;
            break;
        case "A2":
            $nivel = 1;
            break;
        case "A3":
            $nivel = 3;
            break;
        case "A4":
            $nivel = 2;
            break;
        case "A5":
            $nivel = 4;
            break;
        case "A6":
            $nivel = 7;
            break;
        case "A7":
            $nivel = 5;
            break;
        case "A8":
            $nivel = 0;
            break;
    }
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->registrarUsuario($codigo,$usuario,$numIdentificacion,$nivel)){                        
        $msg = array(
            "response" => 1,
            "message" => "Registro correcto"                      
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