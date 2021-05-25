<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR BANCOS

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO BANCO
===========================================*/

class Model_Bancos{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: REGISTRAR NUEVO BANCO
    ===========================================*/
    
    function registrarBanco($variable2,$variable3){
        
        $sql = "INSERT INTO `banco` (`BANCCODIGO`, `BANCDESCRIPCION`, `ESTCODIGO`) VALUES (NULL, '". $variable2 . "', '" . $variable3 . "')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR ESTADO DEL BANCO
    ===========================================*/
    
    function actualizarBanco($variable2,$variable3){
        $sql = "UPDATE BANCO SET ESTCODIGO='" . $variable3 . "' WHERE BANCCODIGO='" . $variable2 . "'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS BANCOS
    ===========================================*/

    function mostrarTodosBancos(){
        $sql = "SELECT B.*, E.* FROM BANCO B INNER JOIN ESTADO E ON (B.ESTCODIGO=E.ESTCODIGO) ORDER BY BANCDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/
    
    function mostrarEstado(){
        $sql = "SELECT B.ESTCODIGO,E.ESTDESCRIPCION FROM BANCO B INNER JOIN ESTADO E ON (B.ESTCODIGO=E.ESTCODIGO) GROUP BY (B.ESTCODIGO)";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
}