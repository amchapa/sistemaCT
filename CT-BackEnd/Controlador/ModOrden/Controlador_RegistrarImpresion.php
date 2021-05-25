<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigo']) && isset($_POST['_maquina']) && isset($_POST['_modelo']) && isset($_POST['_detPliego'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $codigo= $_POST['_codigo'];
    $maquina= $_POST['_maquina'];
    $colorEspecial= $_POST['_colorEspecial'];
    $barnizaOffset= $_POST['_barnizOffset'];
    $barnizAcrilico= $_POST['_barnizAcrilico'];
    $observacion= $_POST['_observacion'];
    $modelo= $_POST['_modelo'];
    $detPliego= $_POST['_detPliego'];
   
    

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->registrarImpresion($codigo,$maquina,$colorEspecial,$barnizaOffset,$barnizAcrilico,$observacion,$modelo,$detPliego)){                        
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