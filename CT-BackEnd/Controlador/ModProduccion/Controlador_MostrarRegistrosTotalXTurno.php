<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();

if(isset($_POST['_fInicial']) && isset($_POST['_fFinal'])){
    
    $turno = $_POST['_turno'];
    $fInicial = $_POST['_fInicial'];
    $fFinal = $_POST['_fFinal'];
    
    if($Model_Produccion->mostrarRegistrosTotalXTurno($turno,$fInicial,$fFinal)){
        
        $data = $Model_Produccion->mostrarRegistrosTotalXTurno($turno,$fInicial,$fFinal);
        
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