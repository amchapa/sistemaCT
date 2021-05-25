<?php

/*===========================================
CLASE: MODELO DE LA VISTA PRINCIPAL

    PERMITE REALIZAR LAS CONSULTAS PARA MOSTRAR
     - LA CANTIDAD DE OT X ESTADO
     - TRABAJADORES X TURNO
     - ULTIMOS CLIENTES
     - OT EN PRODUCCION
===========================================*/

class Model_Principal{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    
    /*===========================================
        CONSULTA: MOSTRAR ORDENES X ESTADO
    ===========================================*/
    
    public function mostrarOPEstado() {
   
        $sql = "select e.estdescripcion as estadoOP , count(o.estcodigo) as cantidad from ESTADO e left join orden_produccion o on e.ESTCODIGO=o.ESTCODIGO where (e.ESTCODIGO >18)and (e.ESTCODIGO < 29 ) GROUp by (e.ESTDESCRIPCION)";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR TRABAJADORES X TURNO
    ===========================================*/
    
    public function mostrarTrabajadoresTurno() {
        
        $hora_actual = date("H");
        //hora acutal adelantada por 5 horas
        $hora_actual = $hora_actual -5;
        $a = "8";
        $b = "15";
        $c = "23";
     
        if ( $hora_actual >= $a && $hora_actual < $b){ 
        
        $sql = "select concat(P.persnombre,' ',P.persapellido_paterno,' ',P.persapellido_materno)as nombre  ,G.GRUPTURNO FROM Personal P INNER JOIN GRUPO G ON P.PERSTURNO=G.GRUPCODIGO  where  G.GRUPTURNO='Mañana'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
        } elseif(( $hora_actual >=$b && $hora_actual < $c)  or ($hora_actual < -1)){
            
        
        $sql = "select concat(P.persnombre,' ',P.persapellido_paterno,' ',P.persapellido_materno)as nombre  ,G.GRUPTURNO FROM Personal P INNER JOIN GRUPO G ON P.PERSTURNO=G.GRUPCODIGO  where  G.GRUPTURNO='Tarde'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
        } 
        
        
        elseif($hora_actual >= $c ){
             
        $sql = "select concat(P.persnombre,' ',P.persapellido_paterno,' ',P.persapellido_materno) as nombre ,G.GRUPTURNO FROM Personal P INNER JOIN GRUPO G ON P.PERSTURNO=G.GRUPCODIGO  where  G.GRUPTURNO='Noche'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
       } elseif ($hora_actual < $a && $hora_actual >=-1){
        $sql = "select concat(P.persnombre,' ',P.persapellido_paterno,' ',P.persapellido_materno) as nombre ,G.GRUPTURNO FROM Personal P INNER JOIN GRUPO G ON P.PERSTURNO=G.GRUPCODIGO  where  G.GRUPTURNO='Noche'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        }
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ULTIMOS CLIENTES
    ===========================================*/
    
    public function mostrarUltimosClientes() {
        
        $sql = "SELECT CLIENRAZON_SOCIAL as cliente FROM `cliente` ORDER BY CLIENFECHA_REGISTRO DESC";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
}

?>