<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Maquinas.php");

$Model_Maquinas = new Model_Maquinas();


if(isset($_POST['_nombreMaquina'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $nombre = $_POST['_nombreMaquina'];
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Maquinas->validarMaquinas($nombre)){       
        
        $data = $Model_Maquinas->validarMaquinas($nombre);                      
    
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{
        
        $data = array(
            "response" => 1,
            "message" => "No existen registros de la Maquina. Registrar."                      
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