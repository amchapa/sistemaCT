<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_producto'])){
    
    //GUARDAR PARAMETROS EN VARIABLES

    $fecha = $_POST['_fecha'];
    $opcodigo = $_POST['_opcodigo'];
    $personal = $_POST['_personal'];
    $cantidad = $_POST['_cantidad'];
    $tipotrabajo = $_POST['_tipotrabajo'];
    $empresa = $_POST['_empresa'];
    $producto = $_POST['_producto'];
    $observaciones = $_POST['_observaciones'];
    $familia = $_POST['_familia'];
    $subfamilia = $_POST['_subfamilia'];
    $usuario = $_POST['_usuario'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS  

    if($Model_Costos->registrarSalidaProducto($fecha,$opcodigo,$personal,$cantidad,$tipotrabajo,$empresa,$producto,$observaciones,$familia,$subfamilia,$usuario)){                        
        $msg = array(
            "response" => 1,
            "message" => "Registro Ingresado Correctamente"                    
            );
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