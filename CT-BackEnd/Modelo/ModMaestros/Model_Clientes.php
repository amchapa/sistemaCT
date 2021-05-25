<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR CLIENTES

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO CLIENTE
===========================================*/

class Model_Clientes{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: VALIDAR REGISTRO CLIENTE
    ===========================================*/

    
    public function validarClientes($razonSocial,$nombreCorto,$numIdentificacion) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT CLIENRAZON_SOCIAL,CLIENNOMBRE_CORTO, CLIENNUM_IDENTIFICACION FROM  CLIENTE WHERE CLIENRAZON_SOCIAL='" . $razonSocial . "' OR CLIENNOMBRE_CORTO='".$nombreCorto."' OR CLIENNUM_IDENTIFICACION='".$numIdentificacion."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    
    /*===========================================
        CONSULTA: REGISTRAR CLIENTE
    ===========================================*/

    public function registrarCliente($razonSocial,$nombreCorto,$fechaRegistro,$tipoidentificacion,$numIdentificacion,$domicilio,$distrito,$telefono1,$telefono2 ,$anexTelefono,$tipo,$estado,$empresa,$nombreContacto,$cargoContacto,$giroEmpresa,$correoContacto,$vendedor,$observacion) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `cliente` VALUES (NULL, '" . $razonSocial . "', '".$nombreCorto."' , '" . $fechaRegistro . "', '" . $tipoidentificacion . "', '" . $numIdentificacion ."', '" . $domicilio ."', '" . $distrito ."','" . $telefono1 ."', '" . $telefono2 ."',' " . $anexTelefono ."', '" . $tipo . "', '" . $estado . "', '" . $empresa . "', '" . $nombreContacto . "', '" . $cargoContacto . "','" . $giroEmpresa . "' , '" . $correoContacto . "', '" . $vendedor . "', NULL, NULL, NULL, NULL, NULL, NULL, '" . $observacion . "');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR EMPRESAS
    ===========================================*/
    
    public function mostrarEmpresa() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT `EMPCODIGO`, `EMPDESCRIPCION` FROM EMPRESA ORDER BY EMPDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/
    
    public function mostrarEstado() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT `ESTCODIGO`,`ESTDESCRIPCION` FROM `estado` WHERE `ESTTIPO`='CLIENTE' ORDER BY ESTDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR PAIS
    ===========================================*/
    
    public function mostrarPais() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT PAISCODIGO, PAISNOMBRE FROM PAIS ORDER BY PAISNOMBRE";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR PROVINCIA
    ===========================================*/
    
    public function mostrarProvincia($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.PROVCODIGO, P.PROVNOMBRE FROM  PROVINCIA P INNER JOIN PAIS A ON (P.PAISCODIGO=A.PAISCODIGO) WHERE A.PAISNOMBRE='" . $variable . "' ORDER BY P.PROVNOMBRE";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DISTRITO
    ===========================================*/
    
    public function mostrarDistrito($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT D.DISTRCODIGO, D.DISTRNOMBRE FROM DISTRITO D INNER JOIN PROVINCIA P ON (D.PROVCODIGO =P.PROVCODIGO) WHERE P.PROVNOMBRE='" . $variable . "' ORDER BY D.DISTRNOMBRE";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL CLIENTE
    ===========================================*/
    
    public function mostrarDatosClientes($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT c.*, e.ESTDESCRIPCION, p.EMPDESCRIPCION FROM cliente c  INNER JOIN estado e  on c.ESTCODIGO=e.ESTCODIGO INNER JOIN empresa p on c.EMPCODIGO=p.EMPCODIGO  WHERE c.CLIENCODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR CLIENTE CON CREDITO 
    ===========================================*/
    
    public function registrarClienteCredito($codigo,$credito,$moneda,$plazo,$fpago,$comprob) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `cliente` SET `CLIENCREDITO` = '" . round($credito, 3) . "', `CLIENMONEDA` = '" . $moneda . "', `CLIENPLAZO_PAGO` = '" . $plazo . "', `CLIENFORMPAGO` = '" . $fpago . "', `CLIENTIPCOMPROB` = '" . $comprob . "' WHERE `cliente`.`CLIENCODIGO` = '" . $codigo . "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();

    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL CLIENTE
    ===========================================*/
    
    public function mostrarTodosClientes() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM CLIENTE WHERE ESTCODIGO != 2 ORDER BY CLIENRAZON_SOCIAL";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL CLIENTE X EJEC
    ===========================================*/
    
    public function mostrarClientesEjec($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM CLIENTE WHERE CLIENVENDEDOR = '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL CLIENTE X EMP
    ===========================================*/
    
    public function mostrarClientesEmp($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM CLIENTE WHERE EMPCODIGO = '".$variable."' ORDER BY CLIENRAZON_SOCIAL";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=====================================================
        CONSULTA: MOSTRAR DATOS DE LA DIRECCION DEL CLIENTE
    ======================================================*/
    
    
    public function mostrarDireccionCliente($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT PAIS.PAISCODIGO, PAIS.PAISNOMBRE, PROVINCIA.PROVCODIGO,  PROVINCIA.PROVNOMBRE, 
        DISTRITO.DISTRCODIGO, DISTRITO.DISTRNOMBRE, CLIENTE.CLIENDOMICILIO  FROM PAIS INNER JOIN PROVINCIA ON PAIS.PAISCODIGO=PROVINCIA.PAISCODIGO INNER JOIN DISTRITO ON PROVINCIA.PROVCODIGO=DISTRITO.PROVCODIGO INNER JOIN CLIENTE ON DISTRITO.DISTRCODIGO=CLIENTE.DISTRCODIGO WHERE CLIENTE.CLIENCODIGO= '".$variable."' "; 
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();    
          
    }
    
    
    /*===========================================
        CONSULTA: ACTUALIZAR CLIENTE 
    ===========================================*/
    
    public function ActualizarCliente($codigo,$nombreCorto,$razonSocial,$tipiden,$numIdentificacion,$emp,$tipo,$estado,$vendedor,$distr,$domicilio,$telefono1,$telefono2,$anexTelefono,$nombreContacto,$cargoContacto,$correoContacto,$giroEmpresa,$observacion,$credito,$moneda,$plazo,$fpago,$comprob) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE CLIENTE SET CLIENRAZON_SOCIAL = '" . $razonSocial . "', CLIENNOMBRE_CORTO = '".$nombreCorto."', CLIENTIPIDEN = '" . $tipiden . "', CLIENNUM_IDENTIFICACION = '" . $numIdentificacion . "', CLIENDOMICILIO = '" . $domicilio . "', DISTRCODIGO = '" . $distr . "', CLIENTELEFONO1 = '" . $telefono1 . "', CLIENTELEFONO2 = '" . $telefono2 . "', `CLIENANEX_TELEFONO` = '" . $anexTelefono . "', CLIENTIPO = '" . $tipo . "', ESTCODIGO = '" . $estado . "', EMPCODIGO = '" . $emp . "', CLIENNOMBRE_CONTACTO = '" . $nombreContacto . "', CLIENCARGO_CONTACTO = '" . $cargoContacto . "', CLIENGIRO_EMPRESA = '" . $giroEmpresa . "', CLIENCORREO_CONTACTO = '" . $correoContacto . "', CLIENVENDEDOR = '" . $vendedor . "', CLIENCREDITO = '" . round($credito, 3) . "', CLIENMONEDA = '" . $moneda . "', CLIENPLAZO_PAGO = " . $plazo . " , CLIENFORMPAGO = '" . $fpago . "', CLIENTIPCOMPROB = '" . $comprob . "' WHERE CLIENCODIGO = '" . $codigo . "'";
        
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();

    }
    
}

?>