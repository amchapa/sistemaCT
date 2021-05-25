<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR ORDEN

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UNA NUEVA ORDEN
===========================================*/

class Model_Costos{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: CARGAR TIPO ACABADOS
    ===========================================*/

    
    public function mostrarAcabados() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM TIPO_ACABADO" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: CARGAR TIPO ACABADOS X CODIGO
    ===========================================*/

    
    public function mostrarAcabadoXcodigo($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM TIPO_ACABADO where TIPACABCODIGO='".$codigo."';" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
  
    /*==============================================
        CONSULTA: MOSTRAR OP DEL CONTROL DE INSUMO
    ===============================================*/
    
    public function mostrarControlInsumoOP($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM CONTROL_INSUMO WHERE OPCODIGO='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
  
    /*==============================================
        CONSULTA: REGISTRAR CONTROL DE INSUMO
    ===============================================*/

    public function registrarControlInsumo($codigo,$op,$costopreprensa,$costoplacas,$costopapel,$costotinta,$costimpresion,$costomanoobra,$costocorte,$costotroquelado,$costodoblez,$costoalce,$costobarnizado,$costocontado,$costocontraplacado,$costoencolado,$costodesglozado,$costoengrapado,$costopegado,$costonumerado,$costoplastificado,$costofajillado,$costoempaquetado,$costoacabadoextra,$costosupervision,$costootros,$costomovilidad,$costoenergiaelectrica,$costopreciototal,$costovalorventa,$costoporcentaje){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `control_insumo` VALUES ('".$codigo."','".$op."','".$costopreprensa."','".$costoplacas."','".$costopapel."','".$costotinta."','".$costimpresion."','".$costomanoobra."','".$costocorte."','".$costotroquelado."','".$costodoblez."','".$costoalce."','".$costobarnizado."','".$costocontado."','".$costocontraplacado."','".$costoencolado."','".$costodesglozado."','".$costoengrapado."','".$costopegado."','".$costonumerado."','".$costoplastificado."','".$costofajillado."','".$costoempaquetado."','".$costoacabadoextra."','".$costosupervision."','".$costootros."','".$costomovilidad."','".$costoenergiaelectrica."','".$costopreciototal."','".$costovalorventa."','".$costoporcentaje."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR CONTROL DE INSUMO
    ===============================================*/

    public function actualizarControlInsumo($codigo,$op,$costopreprensa,$costoplacas,$costopapel,$costotinta,$costimpresion,$costomanoobra,$costocorte,$costotroquelado,$costodoblez,$costoalce,$costobarnizado,$costocontado,$costocontraplacado,$costoencolado,$costodesglozado,$costoengrapado,$costopegado,$costonumerado,$costoplastificado,$costofajillado,$costoempaquetado,$costoacabadoextra,$costosupervision,$costootros,$costomovilidad,$costoenergiaelectrica,$costopreciototal,$costovalorventa,$costoporcentaje){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE ...";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR COSTOS ACABADO
    ===============================================*/

    public function registrarCostosAcabado($controlinsumo,$itemnumero,$fecharegistro,$acabado,$personal,$fechainicio,$fechafinal,$horainicio,$horafinal,$observaciones,$costo,$usuario){
        
        $sql = "INSERT INTO `costos_acabado` (`COSTACACODIGO`, `CRINSCODIGO`, `ITEMNUMERO`, `COSTACAFECHA_REGISTRO`, `TIPACABCODIGO`, `PERSCODIGO`, `COSTACAFECHA_INICIO`, `COSTACAFECHA_FINAL`, `COSTACAHORA_INICIO`, `COSTACAHORA_FIN`, `COSTACAOBSERVACION`, `COSTACACOSTO`, `USUACODIGO`) VALUES (NULL,'".$controlinsumo."','".$itemnumero."','".$fecharegistro."','".$acabado."','".$personal."','".$fechainicio."','".$fechafinal."','".$horainicio."','".$horafinal."','".$observaciones."','".$costo."','".$usuario."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR COSTOS ACABADO
    ===============================================*/

    public function actualizarCostosAcabado($controlinsumo,$itemnumero,$fecharegistro,$acabado,$personal,$fechainicio,$fechafinal,$horainicio,$horafinal,$observaciones,$costo,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE ...";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR COSTOS ACABADO
    ===============================================*/

    public function eliminarCostosAcabado($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `costos_acabado` WHERE COSTACACODIGO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR COSTOS FACTURA
    ===============================================*/

    public function registrarCostosFactura($controlinsumo,$comprobante,$fecharegistro,$acabado,$proveedor,$observaciones,$importe,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `costos_factura` (`COSTFACCODIGO`, `CRINSCODIGO`, `COSTFACCOMPROBANTE`, `COSTFACFECHA_REGISTRO`, `TIPACABCODIGO`, `PROVEEDCODIGO`, `COSTFACOBSERVACION`, `COSTFACIMPORTE`, `USUACODIGO`) VALUES (NULL, '".$controlinsumo."','".$comprobante."','".$fecharegistro."','".$acabado."','".$proveedor."','".$observaciones."','".$importe."','".$usuario."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR ACABADO
    ===============================================*/

    public function registrarAcabado($codigo,$nombre,$costo,$estado){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `tipo_acabado`(`TIPACABCODIGO`, `TIPACABNOMBRE`, `TIPACABCOSTO`, `ESTCODIGO`) VALUES ('".$codigo."','".$nombre."','".$costo."','".$estado."'); ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR ACABADO
    ===============================================*/

    public function actualizarAcabado($codigo,$nombre,$costo,$estado){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `tipo_acabado` SET `TIPACABNOMBRE`= '".$nombre."', `TIPACABCOSTO`= '".$costo."', `ESTCODIGO`='".$estado."' WHERE `TIPACABCODIGO`='".$codigo."'; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR COSTOS MAQUINA
    ===============================================*/

    public function registrarCostosMaquina($controlinsumo,$itemnumero,$maquina,$fecharegistro,$personal,$ayudante,$trabajo,$fechainicio,$fechafinal,$horainicio,$horafinal,$costo,$observaciones,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `costos_maquina`(`COSTMAQCODIGO`, `CRINSCODIGO`, `ITEMNUMERO`, `MAQUICODIGO`, `COSTMAQFECHA_REGISTRO`, `COSTMAQCOD_PER_MAQUI`, `COSTMAQCOD_PER_AYUDANTE`, `COSTMAQTIPTRABAJO`, `COSTMAQFECHA_INICIO`, `COSTMAQFECHA_FINAL`, `COSTMAQHORA_INICIO`, `COSTMAQHORA_FINAL`, `COSTMAQCOSTO`, `COSTMAQOBSERVACION`, `USUACODIGO`) VALUES (NULL,'".$controlinsumo."','".$itemnumero."','".$maquina."','".$fecharegistro."','".$personal."','".$ayudante."','".$trabajo."','".$fechainicio."','".$fechafinal."','".$horainicio."','".$horafinal."','".$costo."','".$observaciones."','".$usuario."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR FAMILIA PRODUCTOS -- ALMACEN
    ===============================================*/

    public function registrarFamiliaProductos($nombre,$fecha,$estado,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO familia_productos VALUES (NULL,'".$nombre."','".$fecha."','".$estado."','".$usuario."') ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR FAMILIA PRODUCTOS -- ALMACEN
    ===============================================*/

    public function mostrarFamiliaProductos(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM familia_productos order by (FAMPROCODIGO)";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR FAMILIA PRODUCTOS -- ALMACEN
    ===============================================*/

    public function actualizarFamiliaProductos($codigo,$nombre,$fecha,$estado,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        if($nombre=="NO"){
          $sql = "UPDATE familia_productos SET `FAMPROCODIGOFECHA_REGISTRO`='".$fecha."',`ESTCODIGO`='".$estado."',`USUACODIGO`='".$usuario."' WHERE FAMPROCODIGO='".$codigo."' ";
        }else{
          $sql = "UPDATE familia_productos SET `FAMPRONOMBRE`= '".$nombre."',`FAMPROCODIGOFECHA_REGISTRO`='".$fecha."',`ESTCODIGO`='".$estado."',`USUACODIGO`='".$usuario."' WHERE FAMPROCODIGO='".$codigo."' ";
        }
        
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR FAMILIA PAPEL -- ALMACEN
    ===============================================*/

    public function registrarFamiliaPapel($corto,$nombre,$fecha,$estado,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO familia_papel VALUES (NULL,'".$corto."','".$nombre."','".$fecha."','".$estado."','".$usuario."') ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR FAMILIA PAPEL -- ALMACEN
    ===============================================*/

    public function mostrarFamiliaPapel(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM familia_papel";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR FAMILIA PAPEL -- ALMACEN
    ===============================================*/

    public function actualizarFamiliaPapel($codigo,$corto,$nombre,$fecha,$estado,$usuario){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        if($corto=="NO"){
          $sql = "UPDATE familia_papel SET `FAMPACODIGOFECHA_REGISTRO`= '".$fecha."',`ESTCODIGO`='".$estado."',`USUACODIGO`='".$usuario."' WHERE `FAMPANUMERO` = '".$codigo."'";
        }else{
          $sql = "UPDATE familia_papel SET `FAMPACODIGO`='".$corto."',`FAMPANOMBRE`='".$nombre."',`FAMPACODIGOFECHA_REGISTRO`= '".$fecha."',`ESTCODIGO`='".$estado."',`USUACODIGO`='".$usuario."' WHERE `FAMPANUMERO` = '".$codigo."'";
        }
        
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR FAMILIA PAPEL -- ALMACEN
    ===============================================*/

    public function verificarExistencia($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM producto WHERE PROCODIGO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function registrarProducto($codigo,$fecha,$nombre,$descripcion,$unidad,$tipoProducto,$FamiliaPapel,$gramaje,$marca,$tamano,$tipocosto,$estado,$usuario){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `producto` VALUES (NULL, '".$codigo."', '".$fecha."', '".$nombre."', '".$descripcion."', '".$unidad."', '".$tipoProducto."', '".$FamiliaPapel."', '".$gramaje."', '".$marca."', '".$tamano."', '".$tipocosto."', '".$estado."', '".$usuario."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR PRECIOS X KILO -- ALMACEN
    ===============================================*/

    public function mostrarPreciosXKilo(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM precios_kilo";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR PRODUCTOS -- ALMACEN
    ===============================================*/

    public function mostrarProductos(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *, p.ESTCODIGO as ESTADOPRODUCTO FROM producto p inner join familia_productos fp on fp.FAMPROCODIGO=p.FAMPROCODIGO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR PRODUCTO X CODIGO -- ALMACEN
    ===============================================*/

    public function mostrarProductoXCodigo($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,ifnull(ip.IPROUNITARIO,0) as P_UNITARIO,STODISPONIBLE as STOCK,P.PRONUMERO as PRONUMERO, P.ESTCODIGO as ESTADOCODIGO FROM producto P inner join familia_productos fp on fp.FAMPROCODIGO=P.FAMPROCODIGO INNER JOIN stock s on s.PRONUMERO=p.PRONUMERO left join ingreso_producto ip on ip.PRONUMERO=P.PRONUMERO WHERE P.PRONUMERO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR PRODUCTO X CODIGO -- ALMACEN
    ===============================================*/

    public function mostrarProductoXFamilia($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,ifnull(ip.IPROUNITARIO,0) as P_UNITARIO,p.PRONUMERO as PRONUMERO, P.ESTCODIGO as ESTADOCODIGO FROM producto P inner join familia_productos fp on fp.FAMPROCODIGO=P.FAMPROCODIGO inner join stock sto on sto.PRONUMERO=P.PRONUMERO left join ingreso_producto ip on ip.PRONUMERO=P.PRONUMERO WHERE fp.FAMPROCODIGO='".$codigo."' GROUP BY (P.PRONUMERO) ORDER BY(P.PRONUMERO)";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function actualizarProducto($numero,$codigo,$fecha,$nombre,$descripcion,$unidad,$tipoProducto,$FamiliaPapel,$gramaje,$marca,$tamano,$tipocosto,$estado,$usuario){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE producto SET PROCODIGO='".$codigo."', PROFECHA_REGISTRO='".$fecha."', PRONOMBRE='".$nombre."', PRODESCRIPCION='".$descripcion."', PROUNIDAD='".$unidad."', FAMPROCODIGO='".$tipoProducto."', FAMPANUMERO='".$FamiliaPapel."', PROGRAMAJE='".$gramaje."', PROMARCA='".$marca."', PROTAMAÑO='".$tamano."', PROTIPOCOSTO='".$tipocosto."', ESTCODIGO='".$estado."', USUACODIGO='".$usuario."' WHERE PRONUMERO='".$numero."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR STOCK PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function registrarStock($codigo){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO stock VALUES(NULL,'".$codigo."','0','0','0','0','0','0','0','0')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: SUMAR ACCION (INGRESOS, SALIDAS) PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function sumarAccion($codigo,$accion){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        if($accion=="INGRESOS"){
          $sql = "SELECT ifnull(SUM(IPROCANTIDAD),0) AS CANTIDAD FROM `ingreso_producto` WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="SALIDASOT"){
          $sql = "SELECT ifnull(SUM(SPROCOCANTIDAD),0) AS CANTIDAD FROM `salida_producto_c_orden` WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="CT"){
          $sql = "SELECT SUM(IPROCANTIDAD) AS INGRESOS FROM ingreso_producto WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='CT' GROUP BY EMPCODIGO";
        }else if($accion=="ER"){
          $sql = "SELECT SUM(IPROCANTIDAD) AS INGRESOS FROM ingreso_producto WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='ER' GROUP BY EMPCODIGO";
        }else if($accion=="ED"){
          $sql = "SELECT SUM(IPROCANTIDAD) AS INGRESOS FROM ingreso_producto WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='ED' GROUP BY EMPCODIGO";
        }else if($accion=="GR"){
          $sql = "SELECT SUM(IPROCANTIDAD) AS INGRESOS FROM ingreso_producto WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='GR' GROUP BY EMPCODIGO";
        }else if($accion=="SCT"){
          $sql = "SELECT SUM(SPROSOCANTIDAD) AS SALIDAS FROM salida_producto_s_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='CT' GROUP BY EMPCODIGO";
        }else if($accion=="SER"){
          $sql = "SELECT SUM(SPROSOCANTIDAD) AS SALIDAS FROM salida_producto_s_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='ER' GROUP BY EMPCODIGO";
        }else if($accion=="SED"){
          $sql = "SELECT SUM(SPROSOCANTIDAD) AS SALIDAS FROM salida_producto_s_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='ED' GROUP BY EMPCODIGO";
        }else if($accion=="SGR"){
          $sql = "SELECT SUM(SPROSOCANTIDAD) AS SALIDAS FROM salida_producto_s_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='GR' GROUP BY EMPCODIGO";
        }else if($accion=="CCT"){
          $sql = "SELECT SUM(SPROCOCANTIDAD) AS SALIDASOT FROM salida_producto_c_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='CT' GROUP BY EMPCODIGO";
        }else if($accion=="CER"){
          $sql = "SELECT SUM(SPROCOCANTIDAD) AS SALIDASOT FROM salida_producto_c_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='ER' GROUP BY EMPCODIGO";
        }else if($accion=="CED"){
          $sql = "SELECT SUM(SPROCOCANTIDAD) AS SALIDASOT FROM salida_producto_c_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='ED' GROUP BY EMPCODIGO";
        }else if($accion=="CGR"){
          $sql = "SELECT SUM(SPROCOCANTIDAD) AS SALIDASOT FROM salida_producto_c_orden WHERE PRONUMERO='".$codigo."' AND EMPCODIGO='GR' GROUP BY EMPCODIGO";
        }else{
          $sql = "SELECT ifnull(SUM(SPROSOCANTIDAD),0) AS CANTIDAD FROM `salida_producto_s_orden` WHERE PRONUMERO='".$codigo."'";
        }
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
  
    /*==============================================
        CONSULTA: ACTUALIZAR STOCK PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function actualizarStock($codigo,$accion,$cantidad){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        if($accion=="INGRESOS"){
          $sql = "UPDATE stock SET STOSUMA_INGRESOS='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="SALIDASOT"){
          $sql = "UPDATE stock SET STOSUMA_SALIDACONOT='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="CT"){
          $sql = "UPDATE stock SET STO_CT='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="ER"){
          $sql = "UPDATE stock SET STO_ER='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="ED"){
          $sql = "UPDATE stock SET STO_ED='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="GR"){
          $sql = "UPDATE stock SET STO_GR='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }else if($accion=="SALIDAS"){
          $sql = "UPDATE stock SET STOSUMA_SALIDASINOT='".$cantidad."' WHERE PRONUMERO='".$codigo."'";
        }
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: GENERAR STOCK PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function generarStock($codigo){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        
        $sql = "UPDATE stock as dest, (SELECT `STOSUMA_INGRESOS`-`STOSUMA_SALIDACONOT`- `STOSUMA_SALIDASINOT` AS STODISPONIBLE FROM `stock` WHERE `PRONUMERO`='".$codigo."') as srt SET dest.STODISPONIBLE= srt.STODISPONIBLE WHERE dest.PRONUMERO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR INGRESO PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function registrarIngresoProducto($fecha,$nroguia,$nrofactura,$proveedor,$cantidad,$unitario,$empresa,$producto,$usuario){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO ingreso_producto VALUES(NULL,'".$fecha."','".$nroguia."','".$nrofactura."','".$proveedor."','".$cantidad."','".$unitario."','".$empresa."','".$producto."','".$usuario."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR INGRESO PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function mostrarIngresos($fechainicio,$fechafin){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,ip.EMPCODIGO as EMPRESACODIGO FROM ingreso_producto ip INNER JOIN producto p on p.PRONUMERO = ip.PRONUMERO INNER JOIN personal pe on pe.USUACODIGO=ip.USUACODIGO INNER JOIN proveedor pro on pro.PROVEEDCODIGO=ip.PROVEEDCODIGO WHERE (ip.IPROFECHA_REGISTRO > '".$fechainicio."' && ip.IPROFECHA_REGISTRO < '".$fechafin." 23:59:59')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR INGRESO PRODUCTO X CODIGO -- ALMACEN
    ===============================================*/    
    
    public function mostrarIngresosXCodigo($fechainicio,$fechafin,$codigo){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,ip.EMPCODIGO as EMPRESACODIGO FROM ingreso_producto ip INNER JOIN producto p on p.PRONUMERO = ip.PRONUMERO INNER JOIN personal pe on pe.USUACODIGO=ip.USUACODIGO INNER JOIN proveedor pro on pro.PROVEEDCODIGO=ip.PROVEEDCODIGO WHERE (ip.IPROFECHA_REGISTRO > '".$fechainicio."' && ip.IPROFECHA_REGISTRO < '".$fechafin." 23:59:59' && ip.PRONUMERO='".$codigo."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR INGRESO PRODUCTO X TIPO PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function mostrarIngresosXTipoProducto($fechainicio,$fechafin,$tipo){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,ip.EMPCODIGO as EMPRESACODIGO FROM ingreso_producto ip INNER JOIN producto p on p.PRONUMERO = ip.PRONUMERO INNER JOIN personal pe on pe.USUACODIGO=ip.USUACODIGO INNER JOIN proveedor pro on pro.PROVEEDCODIGO=ip.PROVEEDCODIGO WHERE (ip.IPROFECHA_REGISTRO > '".$fechainicio."' && ip.IPROFECHA_REGISTRO < '".$fechafin." 23:59:59' && p.FAMPROCODIGO='".$tipo."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR INGRESO PRODUCTO X EMPRESA -- ALMACEN
    ===============================================*/    
    
    public function mostrarIngresosXEmpresa($fechainicio,$fechafin,$empresa){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,ip.EMPCODIGO as EMPRESACODIGO FROM ingreso_producto ip INNER JOIN producto p on p.PRONUMERO = ip.PRONUMERO INNER JOIN personal pe on pe.USUACODIGO=ip.USUACODIGO INNER JOIN proveedor pro on pro.PROVEEDCODIGO=ip.PROVEEDCODIGO WHERE (ip.IPROFECHA_REGISTRO > '".$fechainicio."' && ip.IPROFECHA_REGISTRO < '".$fechafin." 23:59:59' && ip.EMPCODIGO='".$empresa."')";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: REGISTRAR SALIDA PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function registrarSalidaProducto($fecha,$opcodigo,$personal,$cantidad,$tipotrabajo,$empresa,$producto,$observaciones,$familia,$subfamilia,$usuario){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        if($opcodigo==""){
          $sql = "INSERT INTO `salida_producto_s_orden` VALUES (NULL,'".$fecha."','".$personal."','".$cantidad."','".$tipotrabajo."','".$empresa."','".$producto."','".$observaciones."','".$familia."','".$subfamilia."','".$usuario."')";
        }else{
          $sql = "INSERT INTO `salida_producto_c_orden` VALUES (NULL,'".$fecha."','".$opcodigo."','".$personal."','".$cantidad."','".$tipotrabajo."','".$empresa."','".$producto."','".$observaciones."','".$familia."','".$subfamilia."','".$usuario."')";
        }
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR SALIDAS PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function mostrarSalidas($fechainicio,$fechafin){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql= "SELECT `SPROCOCODIGO` AS CODIGO, `SPROCOFECHA_REGISTRO` AS FECHA_REGISTRO, co.`PERSCODIGO`, `SPROCOCANTIDAD` AS CANTIDAD, `SPROCOTIPOTRABAJO`AS TIPOTRABAJO, co.`EMPCODIGO`, co.`PRONUMERO`, `SPROCOOBSERVACIONES` AS OBSERVACIONES, `SPROCOFAMILIA` AS FAMILIA, `SPROCOSUBFAMILIA` AS SUBFAMILIA, co.`USUACODIGO`, `OPCODIGO` AS OPCODIGO, CONCAT(pl.PERSNOMBRE,' ',pl.PERSAPELLIDO_PATERNO) AS OPERADOR , p.*, per.* FROM salida_producto_c_orden co inner join producto p on p.PRONUMERO=co.PRONUMERO inner join personal per on per.PERSCODIGO=co.PERSCODIGO INNER JOIN personal pl ON pl.USUACODIGO=co.USUACODIGO WHERE co.SPROCOFECHA_REGISTRO >'".$fechainicio."' && co.SPROCOFECHA_REGISTRO < '".$fechafin." 23:59:59' UNION SELECT `SPROSOCODIGO`, `SPROSOFECHA_REGISTRO`, so.`PERSCODIGO`, `SPROSOCANTIDAD`, `SPROSOTIPOTRABAJO`, so.`EMPCODIGO`, so.`PRONUMERO`, `SPROSOOBSERVACIONES`, `SPROSOFAMILIA`, `SPROSOSUBFAMILIA`, so.`USUACODIGO`, IFNULL(`SPROSOOBSERVACIONES`,''), CONCAT(pl.PERSNOMBRE,' ',pl.PERSAPELLIDO_PATERNO) AS OPERADOR , p.*,pe.* FROM salida_producto_s_orden so  inner join producto p on p.PRONUMERO=so.PRONUMERO inner join personal pe on pe.PERSCODIGO=so.PERSCODIGO INNER JOIN personal pl ON pl.USUACODIGO=so.USUACODIGO WHERE so.SPROSOFECHA_REGISTRO >'".$fechainicio."' && so.SPROSOFECHA_REGISTRO < '".$fechafin." 23:59:59'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR SALIDAS PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function mostrarOrdenProduccionSalidas(){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql= "SELECT OPCODIGO FROM `salida_producto_c_orden` GROUP BY (OPCODIGO)";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
  
    /*==============================================
        CONSULTA: MOSTRAR SALIDAS PRODUCTO -- ALMACEN
    ===============================================*/    
    
    public function mostrarSalidasXOrdenProduccion($ordenProduccion){
      
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql= "SELECT `SPROCOCODIGO` AS CODIGO, `SPROCOFECHA_REGISTRO` AS FECHA_REGISTRO, co.`PERSCODIGO`, `SPROCOCANTIDAD` AS CANTIDAD, `SPROCOTIPOTRABAJO`AS TIPOTRABAJO, co.`EMPCODIGO`, co.`PRONUMERO`, `SPROCOOBSERVACIONES` AS OBSERVACIONES, `SPROCOFAMILIA` AS FAMILIA, `SPROCOSUBFAMILIA` AS SUBFAMILIA, co.`USUACODIGO`, `OPCODIGO` AS OPCODIGO, CONCAT(pl.PERSNOMBRE,' ',pl.PERSAPELLIDO_PATERNO) AS OPERADOR , p.*, per.* FROM salida_producto_c_orden co inner join producto p on p.PRONUMERO=co.PRONUMERO inner join personal per on per.PERSCODIGO=co.PERSCODIGO INNER JOIN personal pl ON pl.USUACODIGO=co.USUACODIGO where OPCODIGO='".$ordenProduccion."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
}
?>