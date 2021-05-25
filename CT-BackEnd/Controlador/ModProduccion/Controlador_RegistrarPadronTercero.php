<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();


if(isset($_POST['_proveedor']) && isset($_POST['_ot']) && isset($_POST['_fTransporte']) && isset($_POST['_fRegistro'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $proveedor= $_POST['_proveedor'];
    $ot= $_POST['_ot'];
    $mPliego= $_POST['_mPliego'];
    $cantidad= $_POST['_cantidad'];
    $descripcion= $_POST['_descripcion'];
    $pEntrega= $_POST['_pEntrega'];
    $estado= $_POST['_estado'];
    $fTransporte= $_POST['_fTransporte'];
    $fRegistro= $_POST['_fRegistro'];
    $usuario= $_POST['_usuario'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Produccion->registrarPadronDespacho($proveedor,$ot,$mPliego,$cantidad,$descripcion,$pEntrega,$estado,$fTransporte,$fRegistro,$usuario)){                        
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