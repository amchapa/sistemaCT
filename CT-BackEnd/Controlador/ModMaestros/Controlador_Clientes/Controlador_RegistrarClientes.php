<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Clientes.php");

$Model_Clientes = new Model_Clientes();


if(isset($_POST['_razonSocial']) && isset($_POST['_nombreCorto']) && isset($_POST['_fechaRegistro']) && isset($_POST['_tipiden']) && isset($_POST['_numIdentificacion']) && isset($_POST['_domicilio']) && isset($_POST['_distrito']) && isset($_POST['_tipo']) && isset($_POST['_estado']) && isset($_POST['_empresa']) && isset($_POST['_nombreContacto']) && isset($_POST['_vendedor'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $razonSocial = $_POST['_razonSocial'];
    $nombreCorto = $_POST['_nombreCorto'];
    $fechaRegistro = $_POST['_fechaRegistro'];
    $tipoidentificacion = $_POST['_tipiden'];
    $numIdentificacion = $_POST['_numIdentificacion'];
    $domicilio = $_POST['_domicilio'];
    $distrito = $_POST['_distrito'];
    $telefono1 = $_POST['_telefono1'];
    $telefono2 = $_POST['_telefono2'];
    $anexTelefono = $_POST['_anexTelefono'];
    $tipo = $_POST['_tipo'];
    $estado = $_POST['_estado'];
    $empresa = $_POST['_empresa'];
    $nombreContacto = $_POST['_nombreContacto'];
    $cargoContacto = $_POST['_cargoContacto'];
    $giroEmpresa = $_POST['_giroEmpresa'];
    $correoContacto = $_POST['_correoContacto'];
    $vendedor = $_POST['_vendedor'];
    $observacion = $_POST['_observacion'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Clientes->registrarCliente($razonSocial,$nombreCorto,$fechaRegistro,$tipoidentificacion,$numIdentificacion,$domicilio,$distrito,$telefono1,$telefono2 ,$anexTelefono,$tipo,$estado,$empresa,$nombreContacto,$cargoContacto,$giroEmpresa,$correoContacto,$vendedor,$observacion)){                        
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