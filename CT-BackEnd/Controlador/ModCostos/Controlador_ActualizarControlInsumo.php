<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_codigo'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $op = $_POST['_op'];
    $costopreprensa = $_POST['_preprensa'];
    $costoplacas = $_POST['_placas'];
    $costopapel = $_POST['_papel'];
    $costotinta = $_POST['_tinta'];
    $costimpresion = $_POST['_impresion'];
    $costomanoobra= $_POST['_manoobra'];
    $costocorte = $_POST['_corte'];
    $costotroquelado = $_POST['_troquelado'];
    $costodoblez = $_POST['_doblez'];
    $costoalce = $_POST['_alce'];
    $costobarnizado = $_POST['_barnizado'];
    $costocontado = $_POST['_contado'];
    $costocontraplacado = $_POST['_contraplacado'];
    $costoencolado = $_POST['_encolado'];
    $costodesglozado = $_POST['_desglozado'];
    $costoengrapado = $_POST['_engrapado'];
    $costopegado = $_POST['_pegado'];
    $costonumerado = $_POST['_numerado'];
    $costoplastificado = $_POST['_plastificado'];
    $costofajillado = $_POST['_fajillado'];
    $costoempaquetado = $_POST['_empaquetado'];
    $costoacabadoextra = $_POST['_acabadoextra'];
    $costosupervision = $_POST['_supervision'];
    $costootros = $_POST['_otros'];
    $costomovilidad = $_POST['_movilidad'];
    $costoenergiaelectrica = $_POST['_energiaelectrica'];
    $costopreciototal = $_POST['_preciototal'];
    $costovalorventa = $_POST['_valorventa'];
    $costoporcentaje = $_POST['_porcentaje'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->actualizarControlInsumo($codigo,$op,$costopreprensa,$costoplacas,$costopapel,$costotinta,$costimpresion,$costomanoobra,$costocorte,$costotroquelado,$costodoblez,$costoalce,$costobarnizado,$costocontado,$costocontraplacado,$costoencolado,$costodesglozado,$costoengrapado,$costopegado,$costonumerado,$costoplastificado,$costofajillado,$costoempaquetado,$costoacabadoextra,$costosupervision,$costootros,$costomovilidad,$costoenergiaelectrica,$costopreciototal,$costovalorventa,$costoporcentaje)){                        
        $msg =$Model_Costos->actualizarControlInsumo($codigo,$op,$costopreprensa,$costoplacas,$costopapel,$costotinta,$costimpresion,$costomanoobra,$costocorte,$costotroquelado,$costodoblez,$costoalce,$costobarnizado,$costocontado,$costocontraplacado,$costoencolado,$costodesglozado,$costoengrapado,$costopegado,$costonumerado,$costoplastificado,$costofajillado,$costoempaquetado,$costoacabadoextra,$costosupervision,$costootros,$costomovilidad,$costoenergiaelectrica,$costopreciototal,$costovalorventa,$costoporcentaje);                        
    
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
            "response" => 1,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 
