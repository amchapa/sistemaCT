<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Presupuesto.php");

$Model_Presupuesto = new Model_Presupuesto();


if(isset($_POST['_dato1'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $code = $_POST['_code'];
    $dato1 = $_POST['_dato1'];
    $dato2 = $_POST['_dato2'];
    $dato3 = $_POST['_dato3'];
    $dato4 = $_POST['_dato4'];
    $dato6 = $_POST['_dato6'];
    $dato7 = $_POST['_dato7'];
    $dato8 = $_POST['_dato8'];
    $dato9 = $_POST['_dato9'];
    $dato10 = $_POST['_dato10'];
    $dato11 = $_POST['_dato11'];
    $dato12 = $_POST['_dato12'];
    $dato13 = $_POST['_dato13'];
    $dato14 = $_POST['_dato14'];
    $dato15 = $_POST['_dato15'];
    $dato16 = $_POST['_dato16'];
    $dato17 = $_POST['_dato17'];
    $dato18 = $_POST['_dato18'];
    $dato19 = $_POST['_dato19'];
    $dato20 = $_POST['_dato20'];
    $dato21 = $_POST['_dato21'];
    $dato22 = $_POST['_dato22'];
    $dato23 = $_POST['_dato23'];
    $dato24 = $_POST['_dato24'];
    $dato25 = $_POST['_dato25'];
    $dato26 = $_POST['_dato26'];
    $dato27 = $_POST['_dato27'];
    $dato28 = $_POST['_dato28'];
    $dato29 = $_POST['_dato29'];
    $dato30 = $_POST['_dato30'];
    $dato31 = $_POST['_dato31'];
    $dato32 = $_POST['_dato32'];
    $dato33 = $_POST['_dato33'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Presupuesto->actualizarDatosCotizacion($code,$dato1,$dato2,$dato3,$dato4,$dato6,$dato7,$dato8,$dato9 ,$dato10,$dato11,$dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,$dato29,$dato30,$dato31,$dato32,$dato33)){                        
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