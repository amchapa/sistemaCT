<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Personal.php");

$Model_Personal = new Model_Personal();


if(isset($_POST['_codigo']) && isset($_POST['_nombre']) && isset($_POST['_aPaterno']) && isset($_POST['_aMaterno']) && isset($_POST['_tipiden']) && isset($_POST['_numIdentificacion']) && isset($_POST['_sexo']) && isset($_POST['_fIngreso']) && isset($_POST['_fNacimiento']) && isset($_POST['_telefono1']) && isset($_POST['_empresa']) && isset($_POST['_area']) && isset($_POST['_estado']) && isset($_POST['_tHorario']) && isset($_POST['_turno']) && isset($_POST['_distrito'])){

    
    //GUARDAR PARAMETROS EN VARIABLES
    
    $codigo = $_POST['_codigo'];
    $nombre = $_POST['_nombre'];
    $aPaterno = $_POST['_aPaterno'];
    $aMaterno = $_POST['_aMaterno'];
    $tipiden = $_POST['_tipiden'];
    $numIdentificacion = $_POST['_numIdentificacion'];
    $sexo = $_POST['_sexo'];
    $fIngreso = $_POST['_fIngreso'];
    $fNacimiento = $_POST['_fNacimiento'];
    $telefono1= $_POST['_telefono1'];
    $telefono2= $_POST['_telefono2'];
    $correo1 = $_POST['_correo1'];
    $correo2 = $_POST['_correo2'];
    $empresa = $_POST['_empresa'];
    $area = $_POST['_area'];
    $especialidad = $_POST['_especialidad'];
    $estado = $_POST['_estado'];
    $tHorario = $_POST['_tHorario'];
    $turno = $_POST['_turno'];
    $distrito = $_POST['_distrito'];
    $domicilio = $_POST['_domicilio'];
    $rutaFoto = $_POST['_rutaFoto'];
    $condicionLaboral = $_POST['_condLaboral'];

    
    //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Personal->actualizarPersonal($codigo, $nombre,$aPaterno,$aMaterno,$tipiden,$numIdentificacion,$sexo,$fIngreso ,$fNacimiento,$telefono1,$telefono2,$correo1,$correo2,$empresa,$area,$especialidad,$estado,$tHorario,$turno,$distrito,$domicilio,$rutaFoto,$condicionLaboral)){                        
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