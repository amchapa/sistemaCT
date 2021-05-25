<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Empresa.php");

$Model_Empresa = new Model_Empresa();


if(isset($_POST['_codigo']) && isset($_POST['_facturas']) && isset($_POST['_serieFactura']) && isset($_POST['_boletas']) && isset($_POST['_serieBoletas']) && isset($_POST['_ordServ']) && isset($_POST['_letras']) && isset($_POST['_debito']) && isset($_POST['_serieDebito']) && isset($_POST['_credito']) && isset($_POST['_serieCredito']) && isset($_POST['_guias']) && isset($_POST['_serieGuias']) && isset($_POST['_chica']) && isset($_POST['_grande'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $facturas = $_POST['_facturas'];
    $serieFactura = $_POST['_serieFactura'];
    $boletas = $_POST['_boletas'];
    $serieBoletas = $_POST['_serieBoletas'];
    $ordServ = $_POST['_ordServ'];
    $letras = $_POST['_letras'];
    $debito = $_POST['_debito'];
    $serieDebito = $_POST['_serieDebito'];
    $credito = $_POST['_credito'];
    $serieCredito = $_POST['_serieCredito'];
    $guias = $_POST['_guias'];
    $serieGuias = $_POST['_serieGuias'];
    $chica = $_POST['_chica'];
    $grande = $_POST['_grande'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Empresa->actualizarEmpresa($codigo,$facturas,$serieFactura,$boletas,$serieBoletas,$ordServ,$letras,$debito,$serieDebito,$credito,$serieCredito,$guias,$serieGuias,$chica,$grande )){                        
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