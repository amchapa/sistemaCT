<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR MAQUINAS

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UNA NUEVA MAQUINA
===========================================*/

class Model_Maquinas{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    /*===========================================
     CONSULTA: VALIDAR MAQUINA
    ===========================================*/
    
     public function validarMaquinas($nombre) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT MAQUINOMBRE FROM  MAQUINA WHERE MAQUINOMBRE='" . $nombre . "'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/
    
    public function mostrarEstado() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT `ESTCODIGO`,`ESTDESCRIPCION` FROM `estado` WHERE `ESTTIPO`='MAQUINA' ORDER BY ESTDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    
    /*===========================================
        CONSULTA: MOSTRAR AREA
    ===========================================*/
    
    public function mostrarArea() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM AREA_MAQUINA ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ULTIMO REGISTRO
    ===========================================*/
    
    public function ultimoRegistro() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT MAX(MAQUICODIGO) AS CODIGO FROM MAQUINA";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR NUEVA MAQUINA
    ===========================================*/
    
    public function registrarNuevaMaquina($nuevocodigo,$nombre,$descripcion,$costo,$area,$estado){
       
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `maquina` VALUES ('" . $nuevocodigo . "', '" . $nombre . "', '" . $descripcion . "', '" . $costo . "',  '" . $area ."', '" . $estado ."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }   
    
    
    /*======================================================
        CONSULTA: MOSTRAR DATOS DEL MAQUINA EN ESTADO ACTIVO
    ======================================================*/
    
    public function mostrarTodosMaquinas() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT M.*, A.*, E.* FROM MAQUINA M INNER JOIN area_maquina A ON M.AREAMAQCODIGO=A.AREAMAQCODIGO INNER JOIN ESTADO E ON M.ESTCODIGO=E.ESTCODIGO WHERE E.ESTCODIGO != 11 ORDER BY M.MAQUINOMBRE";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DE LA MAQUINA
    ===========================================*/
    
    public function mostrarDatosMaquina($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM MAQUINA WHERE MAQUICODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR MAQUINA
    ===========================================*/
    
    public function actualizarMaquina($codigo,$nombre,$descripcion,$costo,$area,$estado) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `maquina` SET `MAQUINOMBRE` = '" . $nombre . "', `MAQUIDESCRIPCION` = '" . $descripcion . "', `MAQUICOSTO_HORA` = '" . round($costo,3) . "', `AREAMAQCODIGO` = '" . $area . "', `ESTCODIGO` = '" . $estado . "' WHERE `MAQUICODIGO` = '" . $codigo . "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();

    } 
    
    /*================================================
        CONSULTA: MOSTRAR DATOS DE LA MAQUINA POR AREA
    =================================================*/
    
    public function mostrarMaquinasArea($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT MAQUINA.MAQUICODIGO, MAQUINA.MAQUINOMBRE, MAQUINA.MAQUIDESCRIPCION, MAQUINA.MAQUICOSTO_HORA, ESTADO.ESTDESCRIPCION, AREA_MAQUINA.AREAMAQDESCRIPCION FROM MAQUINA INNER JOIN ESTADO ON MAQUINA.ESTCODIGO=ESTADO.ESTCODIGO INNER JOIN AREA_MAQUINA ON AREA_MAQUINA.AREAMAQCODIGO=MAQUINA.AREAMAQCODIGO  WHERE MAQUINA.AREAMAQCODIGO = '".$variable."' ORDER BY MAQUINOMBRE";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*================================================
        CONSULTA: MOSTRAR DATOS DE LA MAQUINA POR NOMBRE
    =================================================*/
    
    
    public function mostrarMaquinasNombre($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT MAQUINA.MAQUICODIGO, MAQUINA.MAQUINOMBRE, MAQUINA.MAQUIDESCRIPCION, MAQUINA.MAQUICOSTO_HORA, ESTADO.ESTDESCRIPCION, AREA_MAQUINA.AREAMAQDESCRIPCION FROM MAQUINA INNER JOIN ESTADO ON MAQUINA.ESTCODIGO=ESTADO.ESTCODIGO INNER JOIN AREA_MAQUINA ON AREA_MAQUINA.AREAMAQCODIGO=MAQUINA.AREAMAQCODIGO WHERE MAQUINA.MAQUICODIGO = '".$variable."' ORDER BY MAQUINOMBRE";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
        
        
    }


?>