<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_total1'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $code = $_POST['_code'];
    $total1 = $_POST['_total1'];
    $total2 = $_POST['_total2'];
    $total3 = $_POST['_total3'];
    $total4 = $_POST['_total4'];
    $total5 = $_POST['_total5'];
    $rango1 = $_POST['_rango1'];
    $rango2 = $_POST['_rango2'];
    $rango3 = $_POST['_rango3'];
    $rango4 = $_POST['_rango4'];
    $precios1 = $_POST['_precios1'];
    $precios2 = $_POST['_precios2'];
    $precios3 = $_POST['_precios3'];
    $precios4 = $_POST['_precios4'];
    $precios5 = $_POST['_precios5'];
    $precios6 = $_POST['_precios6'];
    $precios7 = $_POST['_precios7'];
    $precios8 = $_POST['_precios8'];
    $precios9 = $_POST['_precios9'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->registrarDatosPrecios($code,$total1,$total2,$total3,$total4,$total5,$rango1,$rango2,$rango3,$rango4 ,$precios1,$precios2,$precios3,$precios4,$precios5,$precios6,$precios7,$precios8,$precios9)){                        
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