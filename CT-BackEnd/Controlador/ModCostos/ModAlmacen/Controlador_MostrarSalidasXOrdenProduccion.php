<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_ordenProduccion'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $ordenProduccion = $_POST['_ordenProduccion'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->mostrarSalidasXOrdenProduccion($ordenProduccion)){
      
        $msg = $Model_Costos->mostrarSalidasXOrdenProduccion($ordenProduccion);
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                  
        $msg = array(
            "response" => 0,
            "message" => "Ingrese los datos correctamente"                    
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