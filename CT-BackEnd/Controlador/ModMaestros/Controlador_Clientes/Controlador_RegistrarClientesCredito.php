<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Clientes.php");

$Model_Clientes = new Model_Clientes();


if(isset($_POST['_codigo']) && isset($_POST['_credito']) && isset($_POST['_moneda']) && isset($_POST['_plazo']) && isset($_POST['_fpago']) && isset($_POST['_comprob'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $credito = $_POST['_credito'];
    $moneda = $_POST['_moneda'];
    $plazo = $_POST['_plazo'];
    $fpago = $_POST['_fpago'];
    $comprob = $_POST['_comprob'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Clientes->registrarClienteCredito($codigo,$credito,$moneda,$plazo,$fpago,$comprob)){                        
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