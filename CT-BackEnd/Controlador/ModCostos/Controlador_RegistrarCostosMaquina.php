<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_controlinsumo'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $controlinsumo = $_POST['_controlinsumo'];
    $itemnumero = $_POST['_itemnumero'];
    $maquina = $_POST['_maquina'];
    $fecharegistro = $_POST['_fecharegistro'];
    $personal = $_POST['_personal'];
    $ayudante = $_POST['_ayudante'];
    $trabajo = $_POST['_trabajo'];
    $fechainicio = $_POST['_fechainicio'];
    $fechafinal = $_POST['_fechafinal'];
    $horainicio = $_POST['_horainicio'];
    $horafinal = $_POST['_horafinal'];
    $costo = $_POST['_costo'];
    $observaciones = $_POST['_observaciones'];
    $usuario = $_POST['_usuario'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->registrarCostosMaquina($controlinsumo,$itemnumero,$maquina,$fecharegistro,$personal,$ayudante,$trabajo,$fechainicio,$fechafinal,$horainicio,$horafinal,$costo,$observaciones,$usuario)){                        
        $msg = array(
            "response" => 2,
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
            "response" => 1,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 