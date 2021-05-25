<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR PROVEEDOR

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO PROVEEDOR
===========================================*/

class Model_Proveedor{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: VALIDAR REGISTRO PROVEEDOR
    ===========================================*/    
    
    public function validarProveedor($razonSocial) {

        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT PROVEEDRAZON_SOCIAL FROM proveedor WHERE PROVEEDRAZON_SOCIAL='" . $razonSocial . "'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: REGISTRAR PROVEEDOR
    ===========================================*/

    public function registrarProveedor($codigo,$razonSocial,$ruc,$telefonoEmpresa,$contactoEmpresa,$telefonoContacto) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `proveedor` VALUES ('" . $codigo . "', '" . $razonSocial . "', '" . $ruc . "', '" . $telefonoEmpresa . "', '" . $contactoEmpresa . "', '" . $telefonoContacto . "');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
   /*===========================================
        CONSULTA: MOSTRAR TODOS PROVEEDORES
    ===========================================*/
    
    public function mostrarTodosProveedor(){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM proveedor";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
}

?>