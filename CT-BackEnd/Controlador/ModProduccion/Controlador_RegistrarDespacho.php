<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../Modelo/Model_Produccion.php");

$Model_Produccion = new Model_Produccion();


if(isset($_POST['_personal']) && isset($_POST['_direccion']) && isset($_POST['_fechaDestino']) && isset($_POST['_tipoMensajeria'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    $provincia= $_POST['_provincia'];
    $distrito= $_POST['_distrito'];
    $ordProd= $_POST['_ordProd'];
    $personal= $_POST['_personal'];
    $tipMensajeria= $_POST['_tipMensajeria'];
    $seleccione= $_POST['_seleccione'];
    $otros= $_POST['_otros'];
    $direccion= $_POST['_direccion'];
    $descripcion= $_POST['_descripcion'];
    $comentario= $_POST['_comentario'];
    $despachoMaterial= $_POST['_despachoMaterial'];
    $mensajeriaDocumentos= $_POST['_mensajeriaDocumentos'];
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
    $fechaRegistro= $_POST['_fechaRegistro'];
    $tipoMensajeria= $_POST['_tipoMensajeria'];
    $vehiculo= $_POST['_vehiculo'];
    $mensajero= $_POST['_mensajero'];
    $mensajeroInput= $_POST['_mensajeroInput'];
    $grupo= $_POST['_grupo'];
    $respuesta= $_POST['_respuesta'];
    $costoEstado= $_POST['_costoEstado'];
    $costoObjeto= $_POST['_costoObjeto'];
    $usuario= $_POST['_usuario'];
    $estado= $_POST['_estado'];
    $accion= $_POST['_accion'];
    $kmi= $_POST['_kmi'];
    $kmf= $_POST['_kmf'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Produccion->registrarDespacho($provincia,$distrito,$ordProd,$personal,$tipMensajeria,$seleccione,$otros,$direccion,$descripcion,$comentario,$despachoMaterial,$mensajeriaDocumentos,$guia,$factura,$monto,$pesoBruto,$numPaq,$fechaDestino,$horario,$horarioInicial,$horarioFinal,$contactoEntrega,$telefonoContacto,$fechaRegistro,$tipoMensajeria,$vehiculo,$mensajero,$mensajeroInput,$grupo,$respuesta,$costoEstado,$costoObjeto,$usuario,$estado,$accion,$kmi,$kmf)){                        
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