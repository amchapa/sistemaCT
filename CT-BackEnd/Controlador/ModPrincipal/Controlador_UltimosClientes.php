<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Principal.php");

$Model_Principal = new Model_Principal();

if($Model_Principal->mostrarUltimosClientes()){                        
    
    $array = $Model_Principal->mostrarUltimosClientes();  

}else{                        
    $array = array(
        "response" => 0,
        "message" => "Informacion no encontrada"                    
        );                        
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($array);             

?>