<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();

if(isset($_POST['_code'])){
    
    $variable = $_POST['_code'];
    
    if($Model_Presupuesto->eliminarPresupuestoGeneral($variable)){
        
        $data = $Model_Presupuesto->eliminarPresupuestoGeneral($variable);
        
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