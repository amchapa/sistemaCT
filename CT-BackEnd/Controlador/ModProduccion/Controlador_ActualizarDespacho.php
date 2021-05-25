<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();

if(isset($_POST['_codigo']) && isset($_POST['_direccion']) && isset($_POST['_fechaDestino'])){
    
    $codigo= $_POST['_codigo'];
    $provincia= $_POST['_provincia'];
    $distrito= $_POST['_distrito'];
    $tipMensajeria= $_POST['_tipMensajeria'];
    $seleccione= $_POST['_seleccione'];
    $otros= $_POST['_otros'];
    $direccion= $_POST['_direccion'];
    $descripcion= $_POST['_descripcion'];
    $comentario= $_POST['_comentario'];
    $guia= $_POST['_guia'];
    $factura= $_POST['_factura'];
    $monto= $_POST['_monto'];
    $pesoBruto= $_POST['_pesoBruto'];
    $numPaq= $_POST['_numPaq'];
    $fechaDestino= $_POST['_fechaDestino'];
    $horario= $_POST['_horario'];
    $horarioInicial= $_POST['_horarioInicial'];
    $horarioFinal= $_POST['_horarioFinal'];
    $contactoEntrega= $_POST['_contactoEntrega'];
    $telefonoContacto= $_POST['_telefonoContacto'];
    
    if($Model_Produccion->actualizarDespacho($codigo,$provincia,$distrito,$tipMensajeria,$seleccione,$otros,$direccion,$descripcion,$comentario,$guia,$factura,$monto,$pesoBruto,$numPaq,$fechaDestino,$horario,$horarioInicial,$horarioFinal,$contactoEntrega,$telefonoContacto)){
        
        $msg = array(
            "response" => 1,
            "message" => "Actualizacion correcta"                      
            );   
        
    }else{
        
        $msg = array(
            "response" => 0,
            "message" => "Ingrese correctamente los datos"                    
            );  
    }
}else{
    
    $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($msg);  

?>