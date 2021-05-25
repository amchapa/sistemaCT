<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Servicios.php");

$Model_Servicios = new Model_Servicios();



if(isset($_POST['_codigo']) && isset($_POST['_nombre']) && isset($_POST['_calculo']) && isset($_POST['_preciou']) && isset($_POST['_tipo']) && isset($_POST['_moneda']) && isset($_POST['_estado']) && isset($_POST['_subfam'])  ){
    
    
    // GUARDAR PARAMETROS EN VARIABLE
    
    $codigo = $_POST['_codigo'];
    $nombre =$_POST['_nombre'];
    $calculo =$_POST['_calculo'];
    $ancho =$_POST['_ancho'];
    $preciou =$_POST['_preciou'];
    $tipo =$_POST['_tipo'];
    $factor =$_POST['_factor'];
    $moneda =$_POST['_moneda'];
    $descuento =$_POST['_descuento'];
    $estado =$_POST['_estado'];
    $subfamilia =$_POST['_subfam'];
    $papel =$_POST['_papel'];
 
    if($ancho==null){
        $ancho=0.00;
    }
    
    if($factor==null){
        $factor=0.00000;
    }
    
    if($descuento==null){
        $descuento=0.00;
    }
    
    if($papel==null){
        $papel=0.000;
    }
    
        //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Servicios->registrarServicio($codigo, $nombre, $calculo, $ancho, $preciou, $tipo, $factor, $moneda, $descuento, $estado, $subfamilia, $papel)){  
        
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
    

}

else{
    
   $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 


?>