<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Maquinas.php");

$Model_Maquinas = new Model_Maquinas();


if(isset($_POST['_nombre']) && isset($_POST['_costo']) && isset($_POST['_area']) && isset($_POST['_estado'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $nombre = $_POST['_nombre'];
    $costo = $_POST['_costo'];
    $descripcion = $_POST['_descripcion'];
    $area = $_POST['_area'];
    $estado = $_POST['_estado'];
    
    $str= substr($codigo,0,2);
    $string = substr($codigo,2,2);
    $string = (int) $string;
    $string++;
    $nuevocodigo=$str.$string;
    $nuevocodigo=(string) $nuevocodigo;
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Maquinas->registrarNuevaMaquina($nuevocodigo,$nombre,$descripcion,$costo,$area,$estado)){                        
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