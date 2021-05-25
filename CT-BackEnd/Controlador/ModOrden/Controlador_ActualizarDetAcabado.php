<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Orden.php");

$Model_Orden = new Model_Orden();


if(isset($_POST['_codigo'])){

    //GUARDAR PARAMETROS EN VARIABLES
    $codigo= $_POST['_codigo'];
    $doblez= $_POST['_doblez'];
    $compaginado= $_POST['_compaginado'];
    $encolado= $_POST['_encolado'];
    $barniz= $_POST['_barniz'];
    $plastificado= $_POST['_plastificado'];
    $pegado= $_POST['_Pegado'];
    $corteFinal= $_POST['_corteFinal'];
    $refilado= $_POST['_refilado'];
    $troquelado= $_POST['_troquelado'];
    $numerado= $_POST['_numerado'];
    $perforado= $_POST['_perforado'];
    $fajillado= $_POST['_fajillado'];
    $alce= $_POST['_alce'];
    $contado= $_POST['_contado'];
    $contraplacado= $_POST['_contraplacado'];
    $otros1= $_POST['_otro1'];
    $otros2= $_POST['_otro2'];
    $otros3= $_POST['_otro3'];
    
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Orden->actualizarDetAcabado($codigo,$doblez,$compaginado,$encolado,$barniz,$plastificado,$pegado,$corteFinal,$refilado,$troquelado,$numerado,$perforado,$fajillado,$alce,$contado,$contraplacado,$otros1,$otros2,$otros3)){                        
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