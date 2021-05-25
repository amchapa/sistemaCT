<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Servicios.php");

$Model_Servicios = new Model_Servicios();

if(isset($_POST{'_servfam'})){
    
    $variable = $_POST{'_servfam'};

    if($Model_Servicios->mostrarSubFamilia($variable)){
    
        $array = $Model_Servicios->mostrarSubFamilia($variable);
    
    
    }else{
    
    $array = array(
            "response" => 0,
            "message" => "SubFamilias no encontradas"                      
            );
    }
 }else{
        
        $array = array (
                "response" =>0,
                "message" => "Parametros no encontrados"
            );
    }

header('Content-type: application/json; charset=utf-8');
echo json_encode($array);

?>