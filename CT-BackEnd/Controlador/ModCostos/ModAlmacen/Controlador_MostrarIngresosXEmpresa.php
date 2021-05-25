<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_fechaInicio'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $fechainicio = $_POST['_fechaInicio'];
    $fechafin = $_POST['_fechafin'];
    $empresa = $_POST['_empresa'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->mostrarIngresosXEmpresa($fechainicio,$fechafin,$empresa)){
      
        $msg = $Model_Costos->mostrarIngresosXEmpresa($fechainicio,$fechafin,$empresa);
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                  
        $msg = array(
            "response" => 0,
            "message" => "Ingrese los datos correctamente"                    
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