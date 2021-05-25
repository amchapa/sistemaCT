<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR DE SERVICIOS

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO SERVICIO
===========================================*/

class Model_Servicios{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    
     /*===========================================
        CONSULTA: REGISTRAR NUEVO SERVICIO
    ===========================================*/
    
    public function registrarServicio($codigo, $nombre, $calculo, $ancho, $preciou, $tipo, $factor, $moneda, $descuento, $estado, $subfamilia, $papel){
        $sql = "INSERT INTO `servicio` VALUES ('" . $codigo . "', '" . $nombre . "', '" . $calculo . "', '" . $ancho . "', '" . $preciou . "', '" . $tipo . "', '" . $factor . "', '" . $moneda . "', '" . $descuento . "' , '" . $estado . "', '" . $subfamilia . "', '" . $papel . "')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR SERVICIOS
    ===========================================*/
    
    public function actualizarServicio($codigo,$nombre,$cal,$ancho,$precio,$servicio,$factor,$moneda,$estado,$descuento,$sub,$papel){
        $sql="UPDATE SERVICIO SET SERVDESCRIPCION='" . $nombre . "', SERVCALCULO_LINEAL='" . $cal . "', SERVANCHO = '" . $ancho . "' , SERVPRECIO_UNITARIO='" . $precio . "', SERVTIPO='" . $servicio . "', SERVFACTOR ='" . $factor . "', SERVMONEDA= '" . $moneda . "', SERVDESCUENTO='" . $descuento . "', ESTCODIGO='" . $estado . "', SUBFAMCODIGO='" . $sub . "', SERVPRECIO_PAPEL='" . $papel . "' WHERE SERVCODIGO='" . $codigo . "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/
    
    public function mostrarEstado(){
        
        $sql = "SELECT * FROM `estado` WHERE `ESTTIPO`='SERVICIO' ORDER BY ESTDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR FAMILIA
    ===========================================*/
    
    public function mostrarFamilia(){
        
        $sql = "SELECT * FROM `familia` ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR SUBFAMILIAS
    ===========================================*/
    
    public function mostrarSubFamilia($variable){
        
        $sql = "SELECT F.FAMDESCRIPCION, S.* FROM SUB_FAMILIA S INNER JOIN FAMILIA F ON (S.FAMCODIGO=F.FAMCODIGO) WHERE F.FAMCODIGO='" . $variable . "'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS SERVICIOS
    ===========================================*/
    
    public function mostrarTodosServicios(){
        
        $sql = "SELECT * FROM SERVICIO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL SERVICIOS 
        SEGUN SU NOMBRE
    ===========================================*/
    
    public function mostrarDatosServicio($variable){
        $sql = "SELECT S.*, E.*, B.*, F.* FROM SERVICIO S INNER JOIN ESTADO E ON (S.ESTCODIGO= E.ESTCODIGO) INNER JOIN SUB_FAMILIA B ON (S.SUBFAMCODIGO=B.SUBFAMCODIGO) INNER JOIN FAMILIA F ON (B.FAMCODIGO=F.FAMCODIGO) WHERE S.SERVCODIGO='" . $variable . "'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: LISTAR SERVICIOS X FAMILIA
    ===========================================*/
    
    public function mostrarServicioFam($variable){
        $sql="SELECT S.*, F.FAMDESCRIPCION,B.SUBFAMDESCRIPCION, E.ESTDESCRIPCION FROM SERVICIO S INNER JOIN SUB_FAMILIA B ON (S.SUBFAMCODIGO=B.SUBFAMCODIGO) INNER JOIN FAMILIA F ON (B.FAMCODIGO=F.FAMCODIGO) INNER JOIN ESTADO E ON(E.ESTCODIGO=S.ESTCODIGO) WHERE F.FAMCODIGO='" . $variable . "'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: LISTAR SERVICIOS X NOMBRE
    ===========================================*/
    
    public function mostrarServicioDes($variable){
        
        $sql="SELECT S.*, F.*, B.*, E.* FROM SERVICIO S INNER JOIN SUB_FAMILIA B ON (S.SUBFAMCODIGO=B.SUBFAMCODIGO) INNER JOIN FAMILIA F ON (B.FAMCODIGO=F.FAMCODIGO) INNER JOIN ESTADO E ON(E.ESTCODIGO=S.ESTCODIGO) WHERE S.SERVDESCRIPCION LIKE '%" . $variable . "%'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
}