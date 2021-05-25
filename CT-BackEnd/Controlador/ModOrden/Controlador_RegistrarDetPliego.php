<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigo']) && isset($_POST['_codOPa'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $codigo= $_POST['_codigo'];
    $descripcion1= $_POST['_descripcion1'];
    $descripcion2= $_POST['_descripcion2'];
    $descripcion3= $_POST['_descripcion3'];
    $descripcion4= $_POST['_descripcion4'];
    $medMaquina1= $_POST['_medMaquina1'];
    $medMaquina2= $_POST['_medMaquina2'];
    $medMaquina3= $_POST['_medMaquina3'];
    $medMaquina4= $_POST['_medMaquina4'];
    $cantMaquina1= $_POST['_cantMaquina1'];
    $cantMaquina2= $_POST['_cantMaquina2'];
    $cantMaquina3= $_POST['_cantMaquina3'];
    $cantMaquina4= $_POST['_cantMaquina4'];
    $demasiaMaquina1= $_POST['_demasiaMaquina1'];
    $demasiaMaquina2= $_POST['_demasiaMaquina2'];
    $demasiaMaquina3= $_POST['_demasiaMaquina3'];
    $demasiaMaquina4= $_POST['_demasiaMaquina4'];
    $totalPapelEntregado1= $_POST['_totalPapelEntregado1'];
    $totalPapelEntregado2= $_POST['_totalPapelEntregado2'];
    $totalPapelEntregado3= $_POST['_totalPapelEntregado3'];
    $totalPapelEntregado4= $_POST['_totalPapelEntregado4'];
    $totalHojaResma1= $_POST['_totalHojaResma1'];
    $totalHojaResma2= $_POST['_totalHojaResma2'];
    $totalHojaResma3= $_POST['_totalHojaResma3'];
    $totalHojaResma4= $_POST['_totalHojaResma4'];
    $codOPA= $_POST['_codOPa'];
    

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->registrarDetPliego($codigo,$descripcion1,$descripcion2,$descripcion3,$descripcion4,$medMaquina1,$medMaquina2,$medMaquina3,$medMaquina4,$cantMaquina1,$cantMaquina2,$cantMaquina3,$cantMaquina4,$demasiaMaquina1,$demasiaMaquina2,$demasiaMaquina3,$demasiaMaquina4,$totalPapelEntregado1,$totalPapelEntregado2,$totalPapelEntregado3,$totalPapelEntregado4,$totalHojaResma1,$totalHojaResma2,$totalHojaResma3,$totalHojaResma4,$codOPA)){                        
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