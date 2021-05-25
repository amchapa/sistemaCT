<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();

if(isset($_POST['_codigo']) && isset($_POST['_codigovaca']) && isset($_POST['_finicio']) && isset($_POST['_dias']) &&  isset($_POST['_estado']) ){
    
    $variable1 = $_POST['_codigo'];
    $variable2 = $_POST['_codigovaca'];
    $variable3 = $_POST['_finicio'];
    $variable4 = $_POST['_dias'];
    $variable5 = $_POST['_estado'];
    $variable6 = $_POST['_obs'];
    
    if($Model_Personal->guardarVacaciones($variable1,$variable2,$variable3,$variable4,$variable5,$variable6)){
        
        $data = $Model_Personal->guardarVacaciones($variable1,$variable2,$variable3,$variable4,$variable5,$variable6);
        
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