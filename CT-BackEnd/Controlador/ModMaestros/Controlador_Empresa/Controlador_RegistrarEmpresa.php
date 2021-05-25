<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//

require_once(__DIR__."/../../../Modelo/ConexionBD.php");
require_once(__DIR__."/../../../Modelo/ModMaestros/Model_Empresa.php");

$Model_Empresa = new Model_Empresa();



if(isset($_POST['_descripcion']) && isset($_POST['_ruc']) && isset($_POST['_abreviatura']) && isset($_POST['_domicilio']) && isset($_POST['_estado']) && isset($_POST['_fax']) && isset($_POST['_telf1']) ){
    
    
    // GUARDAR PARAMETROS EN VARIABLE
    
    
    
    $descripcion = $_POST['_descripcion'];
    $ruc =$_POST['_ruc'];
    $abreviatura =$_POST['_abreviatura'];
    $domicilio =$_POST['_domicilio'];
    $estado =$_POST['_estado'];
    $fax =$_POST['_fax'];
    $telf1 =$_POST['_telf1'];
    $telf2 =$_POST['_telf2'];
    
    if($telf2==null){
        $telf2=0;
    }
    
    if($fax==null){
        $fax=0;
    }
 
    
        //MENSAJE A MOSTRAR SI ENCUENTRA RESULTADOS

    if($Model_Empresa->registrarEmpresa($descripcion, $ruc, $abreviatura, $domicilio, $estado, $fax, $telf1, $telf2)){  
        
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
    

}

else{
    
   $msg = array(
            "response" => 0,
            "message" => "Parametros no encontrados"                      
            );
    
}

header('Content-type: application/json; charset=utf-8');

//array_push($datos,$msg);
echo json_encode($msg); 


?>