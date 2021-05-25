<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();

if(isset($_POST['_codigo'])){
    
    $codigo = $_POST['_codigo'];
    $maquina = $_POST['_maq'];
    $fecha = $_POST['_date'];
    $tiempo = $_POST['_hours'];
    $prioridad = $_POST['_prio'];
    $personal = $_POST['_pers'];
    $obs = $_POST['_obs'];
    
    if($Model_Produccion->actualizarRegistroPrograMaq($codigo,$maquina,$fecha,$tiempo,$prioridad,$personal,$obs)){
        
        $msg = array(
            "response" => 1,
            "message" => "Actualizacion correcta"                      
            );   
        
    }else{
        
        $msg = array(
            "response" => 0,
            "message" => "Ingrese correctamente los datos"                    
            );  
    }
}else{
    
    $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($msg);  

?>