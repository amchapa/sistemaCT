<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();


if(isset($_POST['_fecha']) && isset($_POST['_cantHoras']) && isset($_POST['_fechaRegistro']) && isset($_POST['_codigoitem']) && isset($_POST['_codmaquina']) && isset($_POST['_prioridad']) && isset($_POST['_ejecutiva']) && isset($_POST['_observacion']) && isset($_POST['_usuario'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $fecha= $_POST['_fecha'];
    $cantHoras= $_POST['_cantHoras'];
    $fechaRegistro= $_POST['_fechaRegistro'];
    $codigoItem= $_POST['_codigoitem'];
    $codMaquina= $_POST['_codmaquina'];
    $codEjecutiva= $_POST['_ejecutiva'];
    $prioridad= $_POST['_prioridad'];
    $observaciones= $_POST['_observacion'];
    $usuario= $_POST['_usuario'];
    $fechaProg= $_POST['_fechaPredet'];
    $estado= $_POST['_estado'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Produccion->registrarPrograMaq($fecha,$cantHoras,$fechaRegistro,$codigoItem,$codMaquina,$codEjecutiva,$prioridad,$observaciones,$usuario,$fechaProg,$estado)){                        
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