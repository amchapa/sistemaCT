<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Clientes.php");

$Model_Clientes = new Model_Clientes();


if(isset($_POST['_razonsocial']) && isset($_POST['_nombreCorto']) && isset($_POST['_tipiden']) && isset($_POST['_numIdentificacion']) && isset($_POST['_emp']) && isset($_POST['_tipo']) && isset($_POST['_estado']) && isset($_POST['_vendedor']) && isset($_POST['_distr']) && isset($_POST['_domicilio'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $nombreCorto = $_POST['_nombreCorto'];
    $razonSocial = $_POST['_razonsocial'];
    $tipiden = $_POST['_tipiden'];
    $numIdentificacion = $_POST['_numIdentificacion'];
    $emp = $_POST['_emp'];
    $tipo = $_POST['_tipo'];
    $estado = $_POST['_estado'];
    $vendedor = $_POST['_vendedor'];
    $distr = $_POST['_distr'];
    $domicilio = $_POST['_domicilio'];
    $telefono1 = $_POST['_telefono1'];
    $telefono2 = $_POST['_telefono2'];
    $anexTelefono = $_POST['_anexTelefono'];
    $nombreContacto = $_POST['_nombreContacto'];
    $cargoContacto = $_POST['_cargoContacto'];
    $correoContacto = $_POST['_correoContacto'];
    $giroEmpresa=$_POST['_giroEmpresa'];
    $observacion = $_POST['_observacion'];
    $credito = $_POST['_credito'];
    $moneda = $_POST['_moneda'];
    $plazo = $_POST['_plazo'];
    $fpago = $_POST['_fpago'];
    $comprob = $_POST['_comprob'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Clientes->ActualizarCliente($codigo,$nombreCorto,$razonSocial,$tipiden,$numIdentificacion,$emp,$tipo,$estado,$vendedor,$distr,$domicilio,$telefono1,$telefono2,$anexTelefono,$nombreContacto,$cargoContacto,$correoContacto,$giroEmpresa,$observacion,$credito,$moneda,$plazo,$fpago,$comprob)){                        
        $msg = array(
            "response" => 1,
            "message" => "Actualizacion correcta"                      
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