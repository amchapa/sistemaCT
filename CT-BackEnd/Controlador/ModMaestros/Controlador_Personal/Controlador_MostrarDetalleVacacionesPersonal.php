<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


$codigo = $_POST['_codigo'];
$empresa = $_POST['_empresa'];

if($Model_Personal->mostrarDetalleVacacionesPersonal($codigo,$empresa)){
    
    $data = $Model_Personal->mostrarDetalleVacacionesPersonal($codigo,$empresa);

}else{

    $data = array(
        "response" => 0,
        "message" => "Informacion no encontrada"                      
        );  
}


header('Content-type: application/json; charset=utf-8');
echo json_encode($data);  

?>