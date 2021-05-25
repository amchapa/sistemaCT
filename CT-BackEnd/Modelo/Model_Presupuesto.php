<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR PRESUPUESTO

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO PRESUPUESTO
===========================================*/

class Model_Presupuesto{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: REGISTRAR DATOS COTIZACION
    ===========================================*/

    public function registrarDatosCotizacion($code,$dato1,$dato2,$dato3,$dato4,$dato6,$dato7,$dato8,$dato9 ,$dato10,$dato11,$dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,$dato29,$dato30,$dato31,$dato32,$dato33) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `detalle_presupuesto` VALUES ('".$code."', '".$dato1."', '".$dato2."', '".$dato3."', '".$dato4."','".$dato6."', '".$dato7."', '".$dato8."', '".$dato9."', '".$dato10."', '".$dato11."', '".$dato12."', '".$dato13."', '".$dato14."', '".$dato15."', '".$dato16."', '".$dato17."', '".$dato18."', '".$dato19."', '".$dato20."', '".$dato21."', '".$dato22."', '".$dato23."', '".$dato24."', '".$dato25."', '".$dato26."', '".$dato27."', '".$dato28."', '".$dato29."', '".$dato30."', '".$dato31."', '".$dato32."','".$dato33."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: REGISTRAR DATOS PRECIOS
    ===========================================*/

    public function registrarDatosPrecios($code,$total1,$total2,$total3,$total4,$total5,$rango1,$rango2,$rango3,$rango4 ,$precios1,$precios2,$precios3,$precios4,$precios5,$precios6,$precios7,$precios8,$precios9){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `precio_presupuesto` VALUES ('".$code."', '".$total1."', '".$total2."', '".$total3."', '".$total4."', '".$total5."', '".$rango1."', '".$rango2."', '".$rango3."', '".$rango4."', '".$precios1."', '".$precios2."', '".$precios3."', '".$precios4."', '".$precios5."', '".$precios6."', '".$precios7."', '".$precios8."', '".$precios9."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: REGISTRAR DATOS PRESUPUESTO
    ===========================================*/

    public function registrarDatosPresupuesto($code,$cliente,$vendedor,$fecha,$cantItem,$pContacto,$totalSoles,$totalDolares,$detalle) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `presupuesto` VALUES ('".$code."', '".$cliente."', '".$fecha."', '14', '".$vendedor."', '".$cantItem."' , '".$pContacto."', '".$totalSoles."' , '".$totalDolares."' , '".$detalle."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: REGISTRAR DATOS ITEM
    ===========================================*/

    public function registrarDatosItem($numero,$code,$medidas,$descripcion,$monto,$codeC,$codeP,$codePresup) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        if($numero==0){
          $sql = "INSERT INTO `item_presupuesto` VALUES (NULL,'".$code."', '".$medidas."'  , '".$descripcion."', '".$monto."', '".$codeC."', '".$codeP."', '".$codePresup."', '56') ;";
        }else{
          $sql = "INSERT INTO `item_presupuesto` VALUES ('".$numero."','".$code."', '".$medidas."'  , '".$descripcion."', '".$monto."', '".$codeC."', '".$codeP."', '".$codePresup."', '56') ;";
        }
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: LISTAR PPTOS
    ===========================================*/

    public function mostrarTodos() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*,E.*,C.* FROM PRESUPUESTO P INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=P.ESTCODIGO ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS ITEM
    ===========================================*/

    public function mostrarTodosItem() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ITEM_PRESUPUESTO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/

    public function mostrarEstados() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ESTADO WHERE ESTTIPO ='PRESUPUESTO' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: VALIDAR PRESUPUESTO
    ===========================================*/

    public function validarPresupuesto($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, P.ESTCODIGO as ESTADO,L.PERSNOMBRE,L.PERSAPELLIDO_PATERNO,L.PERSAPELLIDO_MATERNO,C.*,R.* , D.* ,O.*,E.* FROM PRESUPUESTO P INNER JOIN CLIENTE C ON P.CLIENCODIGO=C.CLIENCODIGO INNER JOIN item_presupuesto R ON R.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN detalle_presupuesto D ON D.DETPRESUPCODIGO=R.DETPRESUPCODIGO INNER JOIN personal L ON L.PERSCODIGO=P.PRESUPVENDEDOR INNER JOIN PRECIO_PRESUPUESTO O ON O.PRECIOPRESUPCODIGO=R.PRECIOPRESUPCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=R.ESTCODIGO WHERE P.PRESUPNUMERO='" . $codigo . "' ORDER BY `R`.`ITPRESUCODIGO` ASC ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: VALIDAR PRESUPUESTO
    ===========================================*/

    public function mostrarSubItem($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, P.ESTCODIGO as ESTADO,L.PERSNOMBRE,L.PERSAPELLIDO_PATERNO,L.PERSAPELLIDO_MATERNO,C.*,R.* , D.* ,O.* FROM PRESUPUESTO P INNER JOIN CLIENTE C ON P.CLIENCODIGO=C.CLIENCODIGO INNER JOIN item_presupuesto R ON R.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN detalle_presupuesto D ON D.DETPRESUPCODIGO=R.DETPRESUPCODIGO INNER JOIN personal L ON L.PERSCODIGO=P.PRESUPVENDEDOR INNER JOIN PRECIO_PRESUPUESTO O ON O.PRECIOPRESUPCODIGO=R.PRECIOPRESUPCODIGO WHERE R.ITPRESUCODIGO='" . $codigo . "' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR ESTADO DEL PRESUPUESTO
    ===========================================*/

    public function actualizarestadoPresupuesto($codigo,$estado) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE PRESUPUESTO SET ESTCODIGO= '".$estado."' WHERE PRESUPNUMERO='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR PRESUPUESTO
    ===========================================*/

    public function actualizarPresupuesto($codigo,$cantItem){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE PRESUPUESTO SET PRESUPCANT_ITEM= '".$cantItem."' WHERE PRESUPNUMERO='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR PRESUPUESTO
    ===========================================*/

    public function actualizarPresupuestoReemplazado($codigo,$estado,$descripcion){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE PRESUPUESTO SET  ESTCODIGO='".$estado."', PRESUPDETALLE= '".$descripcion."' WHERE PRESUPNUMERO='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
  

    /*===========================================
        CONSULTA: MOSTRAR DATOS X CODIGO DEL PRESUPUPUESTO
    ===========================================*/

    public function mostrarTodoXCodigo($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT DISTINCT P.*,C.*,E.*  FROM ITEM_PRESUPUESTO I INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=I.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=P.ESTCODIGO WHERE I.PRESUPNUMERO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL PRESUPUESTO X CLIENTE
    ===========================================*/

    public function mostrarTodoXCliente($cliente) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT DISTINCT P.*,C.*,E.* FROM ITEM_PRESUPUESTO I INNER JOIN  PRESUPUESTO P ON I.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=P.ESTCODIGO WHERE C.CLIENNOMBRE_CORTO LIKE '%".$cliente."%'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL PRESUPUESTO X VENDEDOR
    ===========================================*/

    public function mostrarTodoXVendedor($vendedor){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT DISTINCT P.*,C.*,E.* FROM ITEM_PRESUPUESTO I INNER JOIN PRESUPUESTO P ON I.PRESUPNUMERO=P.PRESUPNUMERO INNER JOIN PERSONAL V ON V.PERSCODIGO=P.PRESUPVENDEDOR INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=P.ESTCODIGO WHERE V.PERSNOMBRE LIKE '%".$vendedor."%'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
      
    /*=========================================================================
        CONSULTA: MOSTRAR DATOS PRESUPUESTO MEDIANTE EL NUMERO DE PRESUPUESTO
    ==========================================================================*/

    public function mostrarDatosPresupuesto($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.PRESUPNUMERO, P.PRESUPVENDEDOR, C.CLIENCODIGO FROM PRESUPUESTO P INNER JOIN CLIENTE C ON (P.CLIENCODIGO=C.CLIENCODIGO) WHERE P.PRESUPNUMERO='" . $variable ."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*=========================================================================
        CONSULTA: MOSTRAR DATOS DE LOS PRESUPUESTO DEL CLIENTE POR SU CODIGO
    ==========================================================================*/

    public function mostrarPresupuestoCliente($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, C.*, P.ESTCODIGO AS ESTADOPRESUPUESTO, E.* FROM CLIENTE C INNER JOIN PRESUPUESTO P ON C.CLIENCODIGO=P.CLIENCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=P.ESTCODIGO  WHERE C.CLIENCODIGO='" . $variable ."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTILOS
    ===========================================*/

    public function mostrarEstilos() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `estilos` ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR DATOS PRECIOS
    ===========================================*/

    public function registrarEstilo($descripcion,$tamano,$medResma,$medCorte,$pliegos,$panneau,$maquinas,$cantidad){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `estilos` VALUES (NULL, '".$descripcion."', '".$tamano."', '".$medResma."', '".$medCorte."', '".$pliegos."', '".$panneau."', '".$maquinas."', '".$cantidad."') ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
/*===========================================
        CONSULTA: ACTUALIZAR DATOS COTIZACION
    ===========================================*/

    public function actualizarDatosCotizacion($code,$dato1,$dato2,$dato3,$dato4,$dato6,$dato7,$dato8,$dato9 ,$dato10,$dato11,$dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,$dato29,$dato30,$dato31,$dato32,$dato33){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE detalle_presupuesto SET MAQUICODIGO = '".$dato1."' , DETPRESUPTIPO_PLIEGO = '".$dato2."' , DETPRESUPNUM_PM = '".$dato3."' , DETPRESUPTIRAJE_TOTAL = '".$dato4."' , DETPRESUPPIEZAS_GRAFICAS = '".$dato6."' , DETPRESUPNUM_PLIEGO = '".$dato7."' , DETPRESUPTIPO_IMPRESION = '".$dato8."' , DETPRESUPNUM_COLOR = '".$dato9."' , DETPRESUPTIP_PAPEL = '".$dato10."' , DETPRESUPQUALITY = '".$dato11."' , DETPRESUPCONTRATO = '".$dato12."' , DETPRESUPGRAMAJE = '".$dato13."' , DETPRESUPTAMAÑO_PAPEL = '".$dato14."' , DETPRESUPPRUEBA = '".$dato15."' , DETPRESUPMENSAJERIA = '".$dato16."' , DETPRESUPBARNIZ_PLASTI = '".$dato17."' , DETPRESUPBARNIZ_PLASTI1 = '".$dato18."' , DETPRESUPBARNIZ_PLASTI2 = '".$dato19."' , DETPRESUPTROQUEL = '".$dato20."' , DETPRESUPDOBLADO_ALCE = '".$dato21."' , DETPRESUPCOSIDO_COLA_GRAPA = '".$dato22."' ,  DETPRESUPCAJA_PAQUETE = '".$dato23."' , DETPRESUPCOSTO_PLASTICO = '".$dato24."' , DETPRESUPCOSTO_SERV_PLASTIFICADO = '".$dato25."' , DETPRESUPCOSTO_CAJA = '".$dato26."' , DETPRESUPCOSTO_COLA_FORRO = '".$dato27."' , DETPRESUPCOSTO_CORTE = '".$dato28."' , DETPRESUPCOSTO_ARMADO = '".$dato29."' , DETPRESUPCOSTO_OJAL = '".$dato30."' , DETPRESUPCOSTO_NYLON = '".$dato31."' , DETPRESUPCOSTO_PNYLON = '".$dato32."' , DETPRESUPEXTRAS = '".$dato33."' WHERE DETPRESUPCODIGO='".$code."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    
    
    /*===========================================
        CONSULTA: ACTUALIZAR DATOS PRECIOS
    ===========================================*/

    public function actualizarDatosPrecios($code,$total1,$total2,$total3,$total4,$total5,$rango1,$rango2,$rango3,$rango4 ,$precios1,$precios2,$precios3,$precios4,$precios5,$precios6,$precios7,$precios8,$precios9){
            
        $sql = "UPDATE `precio_presupuesto` SET `PRECIOPRESUPDOLAR` = '".$total1."' , `PRECIOPRESUPSOLES` = '".$total2."' , `PRECIOPRESUPXMILLAR` = '".$total3."' , `PRECIOPRESUPUNITARIO` = '".$total4."' , `PRECIOPRESUPXPAQUETE` = '".$total5."' , `PRECIOPRESUP18010_DOLAR` = '".$rango1."' , `PRECIOPRESUP18010_SOLES` = '".$rango2."' , `PRECIOPRESUPNORMAL_DOLAR` = '".$rango3."' , `PRECIOPRESUPNORMAL_SOLES` = '".$rango4."' , `PRECIOPRESUPINSUMOS` = '".$precios1."' , `PRECIOPRESUPTALLERRES` = '".$precios2."' , `PRECIOPRESUPFLETE` = '".$precios3."' , `PRECIOPRESUPGASTOS` = '".$precios4."' , `PRECIOPRESUPMARGEN` = '".$precios5."' , `PRECIOPRESUPNETO` = '".$precios6."' , `PRECIOPRESUPIMPUESTO` = '".$precios7."' , `PRECIOPRESUPTOTAL` = '".$precios8."' , `PRECIOPRESUPUNITARIO_I` = '".$precios9."'  WHERE `PRECIOPRESUPCODIGO` = '".$code."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: ACTUALIZAR DATOS ITEM
    ===========================================*/

    public function actualizarDatosItem($code,$medidas,$descripcion,$monto) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE item_presupuesto SET ITPRESUMEDIDAS = '".$medidas."' , ITPRESUDESCRIPCION = '".$descripcion."' ,  ITPRESUIMPORTE = '".$monto."' WHERE ITPRESUNUMERO = '".$code."' ; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    
    /*=========================================================================
        CONSULTA: MOSTRAR DATOS DEL DETALLE DEL ITEM DEL PRESUPUESTO
    ==========================================================================*/

    public function mostrarItemDetPresupuesto($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT it.* , dp.* , pp.* , p.* FROM item_presupuesto it INNER JOIN detalle_presupuesto dp ON it.DETPRESUPCODIGO=dp.DETPRESUPCODIGO INNER JOIN precio_presupuesto pp on it.PRECIOPRESUPCODIGO=pp.PRECIOPRESUPCODIGO INNER JOIN presupuesto p on it.PRESUPNUMERO=p.PRESUPNUMERO WHERE it.ITPRESUCODIGO ='" . $variable ."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
  
    
    /*=========================================================================
        CONSULTA: MOSTRAR DATOS DEL DETALLE DEL ITEM DEL PRESUPUESTO
    ==========================================================================*/

    public function mostrarItemDetPresupuestoXnumero($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT it.* , dp.* , pp.* , p.* FROM item_presupuesto it INNER JOIN detalle_presupuesto dp ON it.DETPRESUPCODIGO=dp.DETPRESUPCODIGO INNER JOIN precio_presupuesto pp on it.PRECIOPRESUPCODIGO=pp.PRECIOPRESUPCODIGO INNER JOIN presupuesto p on it.PRESUPNUMERO=p.PRESUPNUMERO WHERE it.ITPRESUNUMERO ='" . $variable ."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: ELIMINAR ITEM PRESUPUESTO
    ===========================================*/
    
    public function eliminarItemPresupuesto($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE i,p,d FROM item_presupuesto i INNER JOIN precio_presupuesto p on i.PRECIOPRESUPCODIGO=p.PRECIOPRESUPCODIGO INNER JOIN detalle_presupuesto d on i.DETPRESUPCODIGO=d.DETPRESUPCODIGO WHERE i.ITPRESUCODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ELIMINAR ITEM PRESUPUESTO
    ===========================================*/
    
    public function eliminarItemPresupuestoXNumero($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE i,p,d FROM item_presupuesto i INNER JOIN precio_presupuesto p on i.PRECIOPRESUPCODIGO=p.PRECIOPRESUPCODIGO INNER JOIN detalle_presupuesto d on i.DETPRESUPCODIGO=d.DETPRESUPCODIGO WHERE i.ITPRESUNUMERO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR CODIGO DE ITEM
    ===========================================*/
    
    public function actualizarCodItem($codigoAnterior,$codigoNuevo,$codigoDetalle,$codigoPrecio){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `item_presupuesto` SET `ITPRESUCODIGO`  = '".$codigoAnterior."' , `DETPRESUPCODIGO`  = '".$codigoDetalle."' , `PRECIOPRESUPCODIGO` = '".$codigoPrecio."' WHERE `ITPRESUCODIGO`  = '".$codigoNuevo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: ACTUALIZAR CODIGO DEL DETALLE ITEM
    =================================================*/
    
    public function actualizarCodDetalleItem($codigoAnterior,$codigoNuevo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `detalle_presupuesto` SET `DETPRESUPCODIGO`  = '".$codigoAnterior."' WHERE `DETPRESUPCODIGO`  = '".$codigoNuevo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: ACTUALIZAR CODIGO DEL PRECIO ITEM
    =================================================*/
    
    public function actualizarCodPrecioItem($codigoAnterior,$codigoNuevo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `precio_presupuesto` SET `PRECIOPRESUPCODIGO`  = '".$codigoAnterior."' WHERE `PRECIOPRESUPCODIGO`  = '".$codigoNuevo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*======================================================
        CONSULTA: ACTUALIZAR PRESUPUESTO EL PRECIO TOTAL
    ======================================================*/
    
    public function actualizarPresupuestoTotal($codigo,$cantItem,$totalSoles,$totalDolares){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `presupuesto` SET `PRESUPCANT_ITEM`  = '".$cantItem."' , `PRESUPTOTAL_SOLES` = '".$totalSoles."' , `PRESUPTOTAL_DOLARES` = '".$totalDolares."'  WHERE `PRESUPNUMERO`  = '".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================================
        CONSULTA: ELIMINAR TODOS LOS REGISTROS DEL PRESUPUESTO
    ===========================================================*/
    
    public function eliminarTotalRegistroPresupuesto($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE i, d ,pr FROM presupuesto p INNER JOIN item_presupuesto i on p.PRESUPNUMERO = i.PRESUPNUMERO INNER JOIN detalle_presupuesto d on i.DETPRESUPCODIGO=d.DETPRESUPCODIGO INNER JOIN precio_presupuesto pr on i.PRECIOPRESUPCODIGO=pr.PRECIOPRESUPCODIGO WHERE p.PRESUPNUMERO = '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================================
        CONSULTA: ELIMINAR PRESUPUESTO
    ===========================================================*/
    
    public function eliminarPresupuestoGeneral($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM PRESUPUESTO WHERE PRESUPNUMERO = '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================================
        CONSULTA: ELIMINAR PRESUPUESTO
    ===========================================================*/
    
    public function actualizarEstadoItemPrespuesto($codigo,$estado){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `item_presupuesto` SET `ESTCODIGO`= ".$estado." WHERE `ITPRESUNUMERO` = '".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
}

?>