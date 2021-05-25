<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Servicios.php");

$Model_Servicios = new Model_Servicios();

if( isset($_POST['_codigo'])  && isset($_POST['_nombre'])  &&  isset($_POST['_cal'])&&  isset($_POST['_ancho']) &&  isset($_POST['_precio']) &&  isset($_POST['_serv']) &&  isset($_POST['_factor']) &&  isset($_POST['_moneda']) &&  isset($_POST['_estado']) &&  isset($_POST['_descuento']) &&  isset($_POST['_subfamilia']) &&  isset($_POST['_papel']) ){
    
    $codigo = $_POST['_codigo'];  
    $nombre = $_POST['_nombre'];
    $cal = $_POST['_cal'];
    $ancho = $_POST['_ancho'];
    $precio = $_POST['_precio'];
    $servicio = $_POST['_serv']; 
    $factor = $_POST['_factor'];
    $moneda = $_POST['_moneda'];
    $estado = $_POST['_estado'];
    $descuento = $_POST['_descuento'];
    $sub = $_POST['_subfamilia'];
    $papel = $_POST['_papel'];
    
    if($Model_Servicios->actualizarServicio($codigo,$nombre,$cal,$ancho,$precio,$servicio,$factor,$moneda,$estado,$descuento,$sub,$papel)){
        
        $data = $Model_Servicios->actualizarServicio($codigo,$nombre,$cal,$ancho,$precio,$servicio,$factor,$moneda,$estado,$descuento,$sub,$papel);
        
    }else{
        
        $data = array(
            "response" => 0,
            "message" => "Bancos no registrados"                      
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