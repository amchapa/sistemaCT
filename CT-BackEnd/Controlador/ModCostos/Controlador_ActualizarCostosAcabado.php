<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_codigo'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $controlinsumo = $_POST['_controlinsumo'];
    $itemnumero = $_POST['_itemnumero'];
    $fecharegistro = $_POST['_fecharegistro'];
    $acabado = $_POST['_acabado'];
    $personal = $_POST['_personal'];
    $fechainicio = $_POST['_fechainicio'];
    $fechafinal = $_POST['_fechafinal'];
    $horainicio = $_POST['_horainicio'];
    $horafinal = $_POST['_horafinal'];
    $observaciones = $_POST['_observaciones'];
    $costo = $_POST['_costo'];
    $usuario = $_POST['_usuario'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->actualizarCostosAcabado($controlinsumo,$itemnumero,$fecharegistro,$acabado,$personal,$fechainicio,$fechafinal,$horainicio,$horafinal,$observaciones,$costo,$usuario)){                        
        $msg =$Model_Costos->actualizarCostosAcabado($controlinsumo,$itemnumero,$fecharegistro,$acabado,$personal,$fechainicio,$fechafinal,$horainicio,$horafinal,$observaciones,$costo,$usuario);                        
    
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