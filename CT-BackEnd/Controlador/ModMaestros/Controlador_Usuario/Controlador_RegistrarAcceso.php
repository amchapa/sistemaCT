<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Usuario.php");

$Model_Usuario = new Model_Usuario();


if(isset($_POST['_codigoUsuario']) && isset($_POST['_accesos'])){

    //GUARDAR PARAMETROS EN VARIABLES
    
    $codeUser = $_POST['_codigoUsuario'];
    $acceso = $_POST['_accesos'];
    $acceso1=$acceso[0];
    $acceso2=$acceso[1];
    $acceso3=$acceso[2];
    $acceso4=$acceso[3];
    $acceso5=$acceso[4];
    $acceso6=$acceso[5];
    $acceso7=$acceso[6];
    $acceso8=$acceso[7];
    $acceso9=$acceso[8];
    $acceso10=$acceso[9];
    $acceso11=$acceso[10];
    $acceso12=$acceso[11];
    $acceso13=$acceso[12];
    $acceso14=$acceso[13];
    $acceso15=$acceso[14];
    $acceso16=$acceso[15];
    $acceso17=$acceso[16];
    $acceso18=$acceso[17];
    $acceso19=$acceso[18];
    $acceso20=$acceso[19];
    $acceso21=$acceso[20];
    $acceso22=$acceso[21];
    $acceso23=$acceso[22];
    $acceso24=$acceso[23];
    $acceso25=$acceso[24];
    $acceso26=$acceso[25];
    $acceso27=$acceso[26];
    $acceso28=$acceso[27];
    $acceso29=$acceso[28];
    $acceso30=$acceso[29];
    $acceso31=$acceso[30];
    $acceso32=$acceso[31];
    $acceso33=$acceso[32];
    $acceso34=$acceso[33];
    $acceso35=$acceso[34];
    $acceso36=$acceso[35];
    $acceso37=$acceso[36];
    
  
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Usuario->registrarAcceso($codeUser,$acceso1,$acceso2,$acceso3,$acceso4,$acceso5,$acceso6,$acceso7,$acceso8,$acceso9,$acceso10,$acceso11,$acceso12,$acceso13,$acceso14,$acceso15,$acceso16,$acceso17,$acceso18,$acceso19,$acceso20,$acceso21,$acceso22,$acceso23,$acceso24,$acceso25,$acceso26,$acceso27,$acceso28,$acceso29,$acceso30,$acceso31,$acceso32,$acceso33,$acceso34,$acceso35,$acceso36,$acceso37)){   

        $msg = array(
            "response" => 1,
            "message" => "Registro correcto: "                     
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