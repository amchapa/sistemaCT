
<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Servicios.php");

$Model_Servicios = new Model_Servicios();

if(isset($_POST['_servicio'])){
    
    $variable = $_POST['_servicio'];
    
    if($Model_Servicios->mostrarDatosServicio($variable)){
        
        $data = $Model_Servicios->mostrarDatosServicio($variable);
        
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