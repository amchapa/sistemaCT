<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST{'_codigo'})){
    
    $variable = $_POST{'_codigo'};

    if($Model_Presupuesto->mostrarItemDetPresupuestoXnumero($variable)){
    
        $array = $Model_Presupuesto->mostrarItemDetPresupuestoXnumero($variable);
    
    
    }else{
    
    $array = array(
            "response" => 0,
            "message" => "Presupuesto no encontradas"                      
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