<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Proveedor.php");

$Model_Proveedor = new Model_Proveedor();


if(isset($_POST['_razonSocial']) && isset($_POST['_codigo']) ){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $codigo = $_POST['_codigo'];
    $razonSocial = $_POST['_razonSocial'];
    $ruc = $_POST['_ruc'];
    $telefonoEmpresa = $_POST['_telefonoEmpresa'];
    $contactoEmpresa = $_POST['_contactoEmpresa'];
    $telefonoContacto = $_POST['_telefonoContacto'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Proveedor->registrarProveedor($codigo,$razonSocial,$ruc,$telefonoEmpresa,$contactoEmpresa,$telefonoContacto)){                        
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