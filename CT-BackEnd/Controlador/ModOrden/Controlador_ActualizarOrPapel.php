<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigo']) && isset($_POST['_material1']) && isset($_POST['_gramos1']) && isset($_POST['_hojaResma1']) && isset($_POST['_medidaResma1']) && isset($_POST['_medidaCorte1']) && isset($_POST['_pliegoHoja1']) && isset($_POST['_panneau1'])){

    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $material1= $_POST['_material1'];
    $gramos1= $_POST['_gramos1'];
    $hojaResma1= $_POST['_hojaResma1'];
    $medidaResma1= $_POST['_medidaResma1'];
    $medidaCorte1= $_POST['_medidaCorte1'];
    $pliegoHoja1= $_POST['_pliegoHoja1'];
    $panneau1= $_POST['_panneau1'];
    $material2= $_POST['_material2'];
    $gramos2= $_POST['_gramos2'];
    $hojaResma2= $_POST['_hojaResma2'];
    $medidaResma2= $_POST['_medidaResma2'];
    $medidaCorte2= $_POST['_medidaCorte2'];
    $pliegoHoja2= $_POST['_pliegoHoja2'];
    $panneau2= $_POST['_panneau2'];
    $material3= $_POST['_material3'];
    $gramos3= $_POST['_gramos3'];
    $hojaResma3= $_POST['_hojaResma3'];
    $medidaResma3= $_POST['_medidaResma3'];
    $medidaCorte3= $_POST['_medidaCorte3'];
    $pliegoHoja3= $_POST['_pliegoHoja3'];
    $panneau3= $_POST['_panneau3'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->actualizarOrPapel($codigo,$material1,$gramos1,$hojaResma1,$medidaResma1,$medidaCorte1,$pliegoHoja1,$panneau1,$material2,$gramos2,$hojaResma2,$medidaResma2,$medidaCorte2,$pliegoHoja2,$panneau2,$material3,$gramos3,$hojaResma3,$medidaResma3,$medidaCorte3,$pliegoHoja3,$panneau3)){                        
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