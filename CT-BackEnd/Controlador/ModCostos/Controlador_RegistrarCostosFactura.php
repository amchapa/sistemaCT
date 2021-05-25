<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_controlinsumo'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $controlinsumo = $_POST['_controlinsumo'];
    $comprobante = $_POST['_comprobante'];
    $fecharegistro = $_POST['_fecharegistro'];
    $acabado = $_POST['_acabado'];
    $proveedor = $_POST['_proveedor'];
    $observaciones = $_POST['_observaciones'];
    $importe = $_POST['_importe'];
    $usuario = $_POST['_usuario'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->registrarCostosFactura($controlinsumo,$comprobante,$fecharegistro,$acabado,$proveedor,$observaciones,$importe,$usuario)){                        
        $msg = array(
            "response" => 2,
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
            "response" => 1,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 