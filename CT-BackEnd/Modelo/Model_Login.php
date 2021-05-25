<?php

/*===========================================
CLASE: MODELO DEL LOGIN

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL INICIO DE SESION DEL USUARIO
===========================================*/

class Model_Login{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    public function ingresoUsuario($username, $password) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.PERSNOMBRE 'NOMBRE', P.PERSAPELLIDO_PATERNO 'APELLIDO' FROM PERSONAL P INNER JOIN USUARIO U ON P.USUACODIGO=U.USUACODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=P.ESTCODIGO WHERE P.ESTCODIGO='8' AND U.USUAUSUARIO='" . $username . "' AND U.USUAPASSWORD='" . $password . "' AND E.ESTDESCRIPCION='ACTIVO'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
}

?>