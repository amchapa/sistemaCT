<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR EMPRESA

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UNA NUEVA EMPRESA
===========================================*/

class Model_Empresa{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/
    
    public function mostrarEstado(){
        
        $sql = "SELECT * FROM `estado` WHERE `ESTTIPO`='EMPRESA' ORDER BY ESTDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
   /*===========================================
        CONSULTA: REGISTRAR EMPRESA
    ===========================================*/
    
    public function registrarEmpresa($descripcion, $ruc, $abreviatura, $domicilio, $estado, $fax, $telf1, $telf2){
        
        $sql = "INSERT INTO `empresa` (`EMPCODIGO`, `EMPDESCRIPCION`, `EMPDOMICILIO`, `EMPFAX`, `EMPTELEFONO1`, `EMPTELEFONO2`, `ESTCODIGO`, `EMPRUC`) VALUES ('" . $abreviatura . "', '" . $descripcion . "', '" . $domicilio . "', '" . $fax . "', '" . $telf1 . "', '" . $telf2 . "', '" . $estado . "', '" . $ruc . "')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }    
    
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DE LA EMPRESA
    ===========================================*/
    
    public function mostrarDatosEmpresa($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM EMPRESA WHERE EMPCODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS DATOS DE LA EMPRESA
    ===========================================*/
    
    public function mostrarTodosEmpresa() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM EMPRESA";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZA EMPRESA 
    ===========================================*/
    
    public function actualizarEmpresa($codigo,$facturas,$serieFactura,$boletas,$serieBoletas,$ordServ,$letras,$debito,$serieDebito,$credito,$serieCredito,$guias,$serieGuias,$chica,$grande ) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `empresa` SET `EMPNUM_FACTURA` = '".$facturas."', `EMPSERIE_FACTURA` = '".$serieFactura."', `EMPNUM_BOLETA` = '".$boletas."', `EMPSERIE_BOLETA` = '".$serieBoletas."', `EMPORDEN_SERVICIO` = '".$ordServ."', `EMPLETRA` = '".$letras."', `EMPNOTA_DEBITO` = '".$debito."', `EMPSERIE_NOTA_DEBITO` = '".$serieDebito."', `EMPNOTA_CREDITO` = '".$credito."', `EMPSERIE_NOTA_CREDITO` = '".$serieCredito."', `EMPNUM_GUIA` = '".$guias."', `EMPSERIE_GUIA` = '".$serieGuias."',`EMPCAJA_CHICA` = '".$chica."', `EMPCAJA_GRANDE` = '".$grande."' WHERE `empresa`.`EMPCODIGO` = '".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();

    }
    
    
}

?>