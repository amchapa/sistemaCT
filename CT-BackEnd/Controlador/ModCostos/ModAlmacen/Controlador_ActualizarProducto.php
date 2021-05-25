<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/Model_Costos.php");

$Model_Costos = new Model_Costos();


if(isset($_POST['_codigo'])){
    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $numero = $_POST['_numero'];
    $codigo = $_POST['_codigo'];
    $fecha = $_POST['_fecharegistro'];
    $nombre = $_POST['_nombre'];
    $descripcion = $_POST['_descripcion'];
    $unidad = $_POST['_unidad'];
    $tipoProducto = $_POST['_tipoProducto'];
    $FamiliaPapel = $_POST['_FamiliaPapel'];
    $gramaje = $_POST['_gramaje'];
    $marca = $_POST['_marca'];
    $tamano = $_POST['_tamaño'];
    $estado = $_POST['_estado'];
    $tipocosto = $_POST['_tipocosto'];
    $usuario = $_POST['_usuario'];
    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Costos->actualizarProducto($numero,$codigo,$fecha,$nombre,$descripcion,$unidad,$tipoProducto,$FamiliaPapel,$gramaje,$marca,$tamano,$tipocosto,$estado,$usuario)){                        
        $msg = array(
            "response" => 1,
            "message" => "Registro Actualizado Correctamente"                    
            );
    // MENSAJE A MOSTRAR NO ENCUENTRA RESULTADOS    
        
    }else{                        
        $msg = array(
            "response" => 0,
            "message" => "Ingrese los datos correctamente"                    
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