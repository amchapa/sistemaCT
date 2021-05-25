<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_descripcion']) && isset($_POST['_monto'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $code = $_POST['_code'];
    $medidas = $_POST['_medidas'];
    $descripcion = $_POST['_descripcion'];
    $monto = $_POST['_monto'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->actualizarDatosItem($code,$medidas,$descripcion,$monto)){                        
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