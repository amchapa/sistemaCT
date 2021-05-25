<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR ORDEN

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UNA NUEVA ORDEN
===========================================*/

class Model_Orden{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: CARGAR MAQUINAS
    ===========================================*/

    
    public function mostrarMaquinas() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT MAQUINA.MAQUICODIGO , MAQUINA.MAQUINOMBRE FROM AREA_MAQUINA INNER JOIN MAQUINA ON AREA_MAQUINA.AREAMAQCODIGO=MAQUINA.AREAMAQCODIGO WHERE AREA_MAQUINA.AREAMAQCODIGO='TIM07' OR AREA_MAQUINA.AREAMAQCODIGO='TIM10'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: CARGAR PRESUPUESTOS ACEPTADOS
    ===========================================*/

    
    public function mostrarPresupuestosXEstados($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM presupuesto p INNER JOIN estado e on p.ESTCODIGO=e.ESTCODIGO INNER JOIN cliente c on c.CLIENCODIGO = p.CLIENCODIGO WHERE p.ESTCODIGO='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: CARGAR ORDENES
    ===========================================*/

    
    public function mostrarItemXOrProduccion($codigo,$opcion) {
        
        if($opcion == 'cantidad'){
            //FUNCION CON LA CONSULTA A REALIZAR
            $sql = "SELECT count(i.OPCODIGO) AS CANTIDAD FROM orden_produccion o INNER JOIN item i on o.OPCODIGO = i.OPCODIGO  WHERE o.OPCODIGO='" . $codigo . "'" ;
            $this->_conexion->ejecutar_sentencia($sql);
            return $this->_conexion->retornar_array();
        }else{
            $sql = "SELECT o.*, i.* FROM orden_produccion o INNER JOIN item i on o.OPCODIGO = i.OPCODIGO  WHERE o.OPCODIGO='" . $codigo . "' ORDER BY i.ITEMCODIGO  ASC" ;
            $this->_conexion->ejecutar_sentencia($sql);
            return $this->_conexion->retorna_select();
        }
        
        
        
        
    }
    
    /*===========================================
        CONSULTA: CARGAR SUB-ITEMS
    ===========================================*/

    
    public function mostrarSubItemXOrProduccion($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT p.* , it.*, op.*,e.* from presupuesto p INNER JOIN item_presupuesto it on p.PRESUPNUMERO=it.PRESUPNUMERO INNER JOIN ESTADO e on e.ESTCODIGO=it.ESTCODIGO INNER JOIN orden_produccion op ON p.PRESUPNUMERO=op.PRESUPNUMERO WHERE op.OPCODIGO='" . $codigo . "';" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    
    /*==================================================
        CONSULTA: CARGAR ITEMS POR ORDEN DE PRODUCCION
    ==================================================*/

    
    public function mostrarTodoOrdenes() {
        
        //FUNCION CON LA CONSULTA A REALIZAR

        $sql = "SELECT * FROM ORDEN_PRODUCCION O INNER JOIN ESTADO E ON E.ESTCODIGO=O.ESTCODIGO INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=O.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=============================================
        CONSULTA: CARGAR DATOS ORDEN PRODUCCION
    =============================================*/

    
    public function cargarDatosOrden($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT p.* , o.*, i.* ,dp.*, m.* FROM presupuesto P INNER JOIN orden_produccion o on p.PRESUPNUMERO=o.PRESUPNUMERO INNER JOIN item_presupuesto i on i.PRESUPNUMERO = p.PRESUPNUMERO INNER JOIN detalle_presupuesto dp on dp.DETPRESUPCODIGO = i.DETPRESUPCODIGO INNER JOIN maquina m on dp.MAQUICODIGO=m.MAQUICODIGO  WHERE i.ITPRESUCODIGO = '".$variable."'; " ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=============================================
        CONSULTA: CARGAR DATOS DEL ITEM
    =============================================*/

    
    public function cargarDatosItem($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM item i INNER JOIN detalles_acabado da on i.DETACABCODIGO=da.DETACABCODIGO INNER JOIN pre_prensa pp on i.PPRENCODIGO=pp.PPRENCODIGO INNER JOIN empaquetado em on i.EMPAQCODIGO=em.EMPAQCODIGO INNER JOIN impresion im ON pp.IMPRENCODIGO=im.IMPRENCODIGO INNER JOIN modelo mo on im.MODCODIGO=mo.MODCODIGO INNER JOIN detalles_pliego dp on im.DETPLIENUMERO=dp.DETPLIENUMERO INNER JOIN orden_papel op on dp.OPACODIGO=op.OPACODIGO INNER JOIN orden_produccion orpro on orpro.OPCODIGO=i.OPCODIGO INNER JOIN presupuesto presup on presup.PRESUPNUMERO=orpro.PRESUPNUMERO WHERE i.ITEMNUMERO = '".$variable."'; " ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE ORDEN DE PAPEL
    =================================================*/

    
    public function verificarCodigoOPA(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM orden_papel" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE ORDEN DE PAPEL
    =================================================*/

    
    public function verificarCodigoDetPliego(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM detalles_pliego" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE MODELO
    =================================================*/

    
    public function verificarModelo(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM modelo" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE IMPRESION
    =================================================*/

    
    public function verificarImpresion(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM impresion" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE PRE PRENSA
    =================================================*/

    
    public function verificarPrePrensa(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM pre_prensa" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE DETALLE ACABADO
    =================================================*/

    
    public function verificarDetAcabado(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM detalles_acabado" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=================================================
        CONSULTA: VERIFICAR CODIGO DE EMPAQUETADO
    =================================================*/

    
    public function verificarEmpaquetado(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM empaquetado" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=============================================
        CONSULTA: REGISTRAR ORDEN DE PAPEL
    =============================================*/

    
    public function registrarOrdenPapel($codigo,$material1,$gramos1,$hojaResma1,$medidaResma1,$medidaCorte1,$pliegoHoja1,$panneau1,$material2,$gramos2,$hojaResma2,$medidaResma2,$medidaCorte2,$pliegoHoja2,$panneau2,$material3,$gramos3,$hojaResma3,$medidaResma3,$medidaCorte3,$pliegoHoja3,$panneau3){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `orden_papel` VALUES ('".$codigo."','".$material1."','".$gramos1."','".$hojaResma1."','".$medidaResma1."','".$medidaCorte1."','".$pliegoHoja1."','".$panneau1."','".$material2."','".$gramos2."','".$hojaResma2."','".$medidaResma2."','".$medidaCorte2."','".$pliegoHoja2."','".$panneau2."','".$material3."','".$gramos3."','".$hojaResma3."','".$medidaResma3."','".$medidaCorte3."','".$pliegoHoja3."','".$panneau3."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR DETALLE PLIEGO
    =================================================*/

    
    public function registrarDetPliego($codigo,$descripcion1,$descripcion2,$descripcion3,$descripcion4,$medMaquina1,$medMaquina2,$medMaquina3,$medMaquina4,$cantMaquina1,$cantMaquina2,$cantMaquina3,$cantMaquina4,$demasiaMaquina1,$demasiaMaquina2,$demasiaMaquina3,$demasiaMaquina4,$totalPapelEntregado1,$totalPapelEntregado2,$totalPapelEntregado3,$totalPapelEntregado4,$totalHojaResma1,$totalHojaResma2,$totalHojaResma3,$totalHojaResma4,$codOPA){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `detalles_pliego` VALUES ('".$codigo."','".$descripcion1."','".$medMaquina1."','".$cantMaquina1."','".$demasiaMaquina1."','".$totalPapelEntregado1."','".$totalHojaResma1."','".$descripcion2."','".$medMaquina2."','".$cantMaquina2."','".$demasiaMaquina2."','".$totalPapelEntregado2."','".$totalHojaResma2."','".$descripcion3."','".$medMaquina3."','".$cantMaquina3."','".$demasiaMaquina3."','".$totalPapelEntregado3."','".$totalHojaResma3."','".$descripcion4."','".$medMaquina4."','".$cantMaquina4."','".$demasiaMaquina4."', '".$totalPapelEntregado4."' , '".$totalHojaResma4."' , '".$codOPA."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR MODELO
    =================================================*/

    
    public function registrarModelo($codigo,$tamanoPliego,$numeroPliego,$numeroPlaca,$pinza,$imagen1,$imagen2,$indicaciones){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `modelo` VALUES ('".$codigo."','".$tamanoPliego."','".$numeroPliego."','".$numeroPlaca."','".$pinza."','".$imagen1."','".$imagen2."','".$indicaciones."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR IMPRESION
    =================================================*/

    
    public function registrarImpresion($codigo,$maquina,$colorEspecial,$barnizaOffset,$barnizAcrilico,$observacion,$modelo,$detPliego){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `impresion` VALUES ('".$codigo."','".$maquina."','".$colorEspecial."','".$barnizaOffset."','".$barnizAcrilico."','".$observacion."','".$modelo."','".$detPliego."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR PRE PRENSA
    =================================================*/

    
    public function registrarPrePrensa($codigo,$pruebaColor,$machote,$laser,$fabierto,$fcerrado,$cantColor,$descripcionColor,$lpi,$tipImpresion1,$tipImpresion2,$impresion){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `pre_prensa` VALUES ('".$codigo."','".$pruebaColor."','".$machote."','".$laser."','".$fabierto."','".$fcerrado."','".$cantColor."','".$descripcionColor."','".$lpi."','".$tipImpresion1."','".$tipImpresion2."','".$impresion."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR DETALLE ACABADO
    =================================================*/

    
    public function registrarDetAcabado($codigo,$doblez,$compaginado,$encolado,$barniz,$plastificado,$pegado,$corteFinal,$refilado,$troquelado,$numerado,$perforado,$fajillado,$alce,$contado,$contraplacado,$otros1,$otros2,$otros3){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `detalles_acabado` VALUES ('".$codigo."','".$barniz."','".$plastificado."','".$troquelado."','".$doblez."','".$compaginado."','".$encolado."','".$perforado."','".$corteFinal."','".$fajillado."','".$alce."','".$contado."','".$numerado."', '".$pegado."', '".$contraplacado."', '".$refilado."', '".$otros1."', '".$otros2."', '".$otros3."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR EMPAQUETADO
    =================================================*/

    
    public function registrarEmpaquetado($codigo,$tipo,$catnEmpaq1,$catnEmpaq2,$catnEmpaq3,$catnEmpaq4,$catnEmpaq5,$catnEmpaq6,$catnEmpaq7,$catnEmpaq8,$catnEmpaq9,$catnEmpaq10,$totalUnidades){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `empaquetado` VALUES ('".$codigo."','".$tipo."','".$catnEmpaq1."','".$catnEmpaq2."','".$catnEmpaq3."','".$catnEmpaq4."','".$catnEmpaq5."','".$catnEmpaq6."','".$catnEmpaq7."','".$catnEmpaq8."','".$catnEmpaq9."','".$catnEmpaq10."','".$totalUnidades."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=================================================
        CONSULTA: REGISTRAR ITEM
    =================================================*/

    
    public function registrarItem($codigoItem,$codigoDetAcabado,$codigoPPrensa,$codigoOrProduccion,$codigoEmpaquetado,$nombreItem,$descripcion,$cantidad,$unidad,$importe,$observacion,$numPresu){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `item` VALUES (NULL,'".$codigoItem."','".$codigoDetAcabado."','".$codigoPPrensa."','".$codigoOrProduccion."','".$codigoEmpaquetado."','".$nombreItem."','".$descripcion."','".$cantidad."','".$unidad."','".$importe."','58','".$observacion."','".$numPresu."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===============================================
        CONSULTA: GUARDAR ORDEN DE PRODUCCION
    ===============================================*/

    
    public function registrarOrdenProduccion($code,$vendedor,$cantItem,$estado,$numPresup,$detalle,$fecha){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `orden_produccion`(`OPCODIGO`, `OPVENDEDOR`, `OPNUM_ITEM`, `OPDETALLE`, `OPFECHAENTREGA`, `ESTCODIGO`, `PRESUPNUMERO`)VALUES ('".$code."' , '".$vendedor."' , '".$cantItem."' , '".$detalle."','".$fecha."' ,'".$estado."' , '".$numPresup."')" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
        
    /*===============================================
        CONSULTA: MOSTRAR ORDEN DE PRODUCCION
    ===============================================*/

    
    public function mostrarPresAprob(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT o.* from orden_produccion o left join item i on o.OPCODIGO=i.OPCODIGO WHERE i.OPCODIGO is null and o.ESTCODIGO ='19' " ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR ESTADO DEL PRESUPUESTO A PRODUCCION
    ================================================================*/
    
    public function actualizarEstadoPresupuesto($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `presupuesto` SET `ESTCODIGO`=16 WHERE PRESUPNUMERO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR ORDEN DE PAPEL DEL ITEM
    ================================================================*/
    
    public function actualizarOrPapel($codigo,$material1,$gramos1,$hojaResma1,$medidaResma1,$medidaCorte1,$pliegoHoja1,$panneau1,$material2,$gramos2,$hojaResma2,$medidaResma2,$medidaCorte2,$pliegoHoja2,$panneau2,$material3,$gramos3,$hojaResma3,$medidaResma3,$medidaCorte3,$pliegoHoja3,$panneau3){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `orden_papel` SET `OPAMATERIAL1`='".$material1."',`OPAGRAMOS1`='".$gramos1."',`OPAHOJA_RESMA1`='".$hojaResma1."',`OPAMEDIDA_RESMA1`='".$medidaResma1."',`OPAMEDIDA_CORTE1`='".$medidaCorte1."',`OPAPLIEGO_HOJA1`='".$pliegoHoja1."',`OPAPANNEAU1`='".$panneau1."',`OPAMATERIAL2`='".$material2."',`OPAGRAMOS2`='".$gramos2."',`OPAHOJA_RESMA2`='".$hojaResma2."',`OPAMEDIDA_RESMA2`='".$medidaResma2."',`OPAMEDIDA_CORTE2`='".$medidaCorte2."',`OPAPLIEGO_HOJA2`='".$pliegoHoja2."',`OPAPANNEAU2`='".$panneau2."',`OPAMATERIAL3`='".$material3."',`OPAGRAMOS3`='".$gramos3."',`OPAHOJA_RESMA3`='".$hojaResma3."',`OPAMEDIDA_RESMA3`='".$medidaResma3."',`OPAMEDIDA_CORTE3`='".$medidaCorte3."',`OPAPLIEGO_HOJA3`='".$pliegoHoja3."',`OPAPANNEAU3`='".$panneau3."' WHERE OPACODIGO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR DETALLE PLIEGO DEL ITEM
    ================================================================*/
    
    public function actualizarDetPliego($codigo,$descripcion1,$descripcion2,$descripcion3,$descripcion4,$medMaquina1,$medMaquina2,$medMaquina3,$medMaquina4,$cantMaquina1,$cantMaquina2,$cantMaquina3,$cantMaquina4,$demasiaMaquina1,$demasiaMaquina2,$demasiaMaquina3,$demasiaMaquina4,$totalPapelEntregado1,$totalPapelEntregado2,$totalPapelEntregado3,$totalPapelEntregado4,$totalHojaResma1,$totalHojaResma2,$totalHojaResma3,$totalHojaResma4){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `detalles_pliego` SET `DETPLIEDESCRIPCION1`='".$descripcion1."',`DETPLIEMED_MAQUINA1`='".$medMaquina1."',`DETPLIECANT_MAQUINA1`='".$cantMaquina1."',`DETPLIEDEMASIA_MAQUINA1`='".$demasiaMaquina1."',`DETPLIETOTAL_PAPEL_ENTREGADO1`='".$totalPapelEntregado1."',`DETPLIETOTAL_HOJA_RESMA1`='".$totalHojaResma1."',`DETPLIEDESCRIPCION2`='".$descripcion2."',`DETPLIEMED_MAQUINA2`='".$medMaquina2."',`DETPLIECANT_MAQUINA2`='".$cantMaquina2."',`DETPLIEDEMASIA_MAQUINA2`='".$demasiaMaquina2."',`DETPLIETOTAL_PAPEL_ENTREGADO2`='".$totalPapelEntregado2."',`DETPLIETOTAL_HOJA_RESMA2`='".$totalHojaResma2."',`DETPLIEDESCRIPCION3`='".$descripcion3."',`DETPLIEMED_MAQUINA3`='".$medMaquina3."',`DETPLIECANT_MAQUINA3`='".$cantMaquina3."',`DETPLIEDEMASIA_MAQUINA3`='".$demasiaMaquina3."',`DETPLIETOTAL_PAPEL_ENTREGADO3`='".$totalPapelEntregado3."',`DETPLIETOTAL_HOJA_RESMA3`='".$totalHojaResma3."',`DETPLIEDESCRIPCION4`='".$descripcion4."',`DETPLIEMED_MAQUINA4`='".$medMaquina4."',`DETPLIECANT_MAQUINA4`='".$cantMaquina4."',`DETPLIEDEMASIA_MAQUINA4`='".$demasiaMaquina4."',`DETPLIETOTAL_PAPEL_ENTREGADO4`='".$totalPapelEntregado4."',`DETPLIETOTAL_HOJA_RESMA4`='".$totalHojaResma4."' WHERE `DETPLIENUMERO`='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR MODELO DEL ITEM
    ================================================================*/
    
    public function actualizarModelo($codigo,$tamanoPliego,$numeroPliego,$numeroPlaca,$pinza,$imagen1,$imagen2,$indicaciones){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `modelo` SET `MODTAMAÑO_PLIEGO`='".$tamanoPliego."',`MODNUMERO_PLIEGO`='".$numeroPliego."',`MODNUMERO_PLACA`='".$numeroPlaca."',`MODPINZA`='".$pinza."',`MODIMAGEN1`='".$imagen1."',`MODIMAGEN2`='".$imagen2."',`MODINDICACIONES`='".$indicaciones."' WHERE `MODCODIGO`='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR IMPRESION DEL ITEM
    ================================================================*/
    
    public function actualizarImpresion($codigo,$maquina,$colorEspecial,$barnizaOffset,$barnizAcrilico,$observacion){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `impresion` SET `MAQUICODIGO`='".$maquina."',`IMPRENCOLOR_ESPECIAL`='".$colorEspecial."',`IMPRENBARNIZ_OFFSET`='".$barnizaOffset."',`IMPRENBARNIZ_ACRILICO`='".$barnizAcrilico."',`IMPRENOBSERVACION`='".$observacion."' WHERE `IMPRENCODIGO`='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR PRE PRENSA DEL ITEM
    ================================================================*/
    
    public function actualizarPrePrensa($codigo,$pruebaColor,$machote,$laser,$fabierto,$fcerrado,$cantColor,$descripcionColor,$lpi,$tipImpresion1,$tipImpresion2){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `pre_prensa` SET `PPRENPRUEBA_COLOR`='".$pruebaColor."',`PPRENMACHOTE`='".$machote."',`PPRENLASER_BN`='".$laser."',`PPRENFORMATO_ABIERTO`='".$fabierto."',`PPRENFORMATO_CERRADO`='".$fcerrado."',`PPRENCANTIDAD_COLOR`='".$cantColor."',`PPRENDESCRIPCION_COLOR`='".$descripcionColor."',`PPRE_LPI`='".$lpi."',`PPRENTIPO_IMPRESION_1`='".$tipImpresion1."',`PPRENTIPO_IMPRESION_2`='".$tipImpresion2."' WHERE `PPRENCODIGO`='".$codigo."' " ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR DETALLE ACABADO DEL ITEM
    ================================================================*/
    
    public function actualizarDetAcabado($codigo,$doblez,$compaginado,$encolado,$barniz,$plastificado,$pegado,$corteFinal,$refilado,$troquelado,$numerado,$perforado,$fajillado,$alce,$contado,$contraplacado,$otros1,$otros2,$otros3){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `detalles_acabado` SET `DETACABTIPO_BARNIZADO`='".$barniz."',`DETACABTIPO_PLASTIFICADO`='".$plastificado."',`DETACABTIPO_TROQUELADO`='".$troquelado."',`DETACABTIPO_DOBLEZ`='".$doblez."',`DETACABTIPO_COMPAGINADO`='".$compaginado."',`DETACABTIPO_ENCOLADO`='".$encolado."',`DETACABTIPO_PERFORADO`='".$perforado."',`DETACABTIPO_CORTE`='".$corteFinal."',`DETACABTIPO_FAJILLADO`='".$fajillado."',`DETACABTIPO_ALCE`='".$alce."',`DETACABTIPO_CONTADO`='".$contado."',`DETACABTIPO_NUMERADO`='".$numerado."',`DETACABTIPO_PEGADO`='".$pegado."',`DETACABTIPO_CONTRAPLACADO`='".$contraplacado."',`DETACABTIPO_REFILADO`='".$refilado."',`DETACABTIPOOTROS1`='".$otros1."',`DETACABTIPOOTROS2`='".$otros2."',`DETACABTIPOOTROS3`='".$otros3."' WHERE `DETACABCODIGO`='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR EMPAQUETADO DEL ITEM
    ================================================================*/
    
    public function actualizarEmpaquetado($codigo,$tipo,$catnEmpaq1,$catnEmpaq2,$catnEmpaq3,$catnEmpaq4,$catnEmpaq5,$catnEmpaq6,$catnEmpaq7,$catnEmpaq8,$catnEmpaq9,$catnEmpaq10,$totalUnidades){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `empaquetado` SET `EMPAQTIPO`='".$tipo."',`EMPAQCANT_PAQ1`='".$catnEmpaq1."',`EMPAQCANT_PAQ2`='".$catnEmpaq2."',`EMPAQCANT_PAQ3`='".$catnEmpaq3."',`EMPAQCANT_PAQ4`='".$catnEmpaq4."',`EMPAQCANT_PAQ5`='".$catnEmpaq5."',`EMPAQCANT_PAQ6`='".$catnEmpaq6."',`EMPAQCANT_PAQ7`='".$catnEmpaq7."',`EMPAQCANT_PAQ8`='".$catnEmpaq8."',`EMPAQCANT_PAQ9`='".$catnEmpaq9."',`EMPAQCANT_PAQ10`='".$catnEmpaq10."',`EMPAQTOTAL_UNID`='".$totalUnidades."' WHERE `EMPAQCODIGO`='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*================================================================
        CONSULTA: ACTUALIZAR ITEM
    ================================================================*/
    
    public function actualizarItem($codigoItem,$codigoReemplazar,$descripcion,$nombreitem,$cantidad,$unidad,$observacion){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `item` SET `ITEMCODIGO`='".$codigoReemplazar."',`ITEMDESCRIPCION`='".$descripcion."',`ITEMNOMBRE`='".$nombreitem."',`ITEMCANTIDAD`='".$cantidad."',`ITEMUNID_MEDIDA`='".$unidad."',`ITEMOBSERVACION`='".$observacion."' WHERE `ITEMCODIGO`='".$codigoItem."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
       /*===========================================
        CONSULTA: MOSTRAR OT X ESTADO
    ===========================================*/
    
    public function mostrarOrdenesXEstado($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ORDEN_PRODUCCION O INNER JOIN item i on O.OPCODIGO=i.OPCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=O.ESTCODIGO INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=O.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO WHERE O.ESTCODIGO='".$codigo."' GROUP by O.OPCODIGO ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }//SELECT o.* from orden_produccion o INNER JOIN item i on o.OPCODIGO=i.OPCODIGO 

    /*===========================================
        CONSULTA: MOSTRAR OT X CODIGO
    ===========================================*/
    
    public function mostrarOrdenesXCodigo($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ORDEN_PRODUCCION O INNER JOIN ESTADO E ON E.ESTCODIGO=O.ESTCODIGO INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=O.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO WHERE O.OPCODIGO='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }

    /*===========================================
        CONSULTA: MOSTRAR OT X CLIENTE
    ===========================================*/
    
    public function mostrarOrdenesXCliente($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ORDEN_PRODUCCION O INNER JOIN ESTADO E ON E.ESTCODIGO=O.ESTCODIGO INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=O.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO WHERE C.CLIENCODIGO='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }


    /*===========================================
        CONSULTA: MOSTRAR OT X VENDEDOR
    ===========================================*/
    
    public function mostrarOrdenesXVendedor($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ORDEN_PRODUCCION O INNER JOIN ESTADO E ON E.ESTCODIGO=O.ESTCODIGO INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=O.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO WHERE O.OPVENDEDOR='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }


    /*===========================================
        CONSULTA: ACTUALIZAR ESTADO DE LA OT REEMPLAZADA
    ===========================================*/
    
    public function actualizarEstadoOrdenReemplazada($codigo,$estado,$descripcion) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE ORDEN_PRODUCCION SET ESTCODIGO='".$estado."' , OPDETALLE ='".$descripcion."' WHERE OPCODIGO='".$codigo."' ";
	    $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }


    /*===========================================
        CONSULTA: ACTUALIZAR ESTADO DE LA OT
    ===========================================*/
    
    public function actualizarEstadoOrden($codigo,$estado) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE ORDEN_PRODUCCION SET ESTCODIGO='".$estado."' WHERE OPCODIGO='".$codigo."' ";
	    $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }


    /*===========================================
        CONSULTA: MOSTRAR CLIENTES CON ITEM - OP
    ===========================================*/
    
    public function mostrarClientesItemOP() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ITEM I INNER JOIN ORDEN_PRODUCCION OP ON OP.OPCODIGO=I.OPCODIGO INNER JOIN PRESUPUESTO P ON P.PRESUPNUMERO=OP.PRESUPNUMERO INNER JOIN CLIENTE C ON C.CLIENCODIGO=P.CLIENCODIGO GROUP BY C.CLIENCODIGO";
	    $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/

    public function mostrarEstados() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ESTADO WHERE ESTTIPO ='ORDEN DE PRODUCCION' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
     /*===========================================
        CONSULTA: MOSTRAR OT X CLIENTE
    ===========================================*/
    
    public function mostrarExistenciaDeItem($codigo) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM ITEM WHERE NUM_PRESUP='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*==================================================
        CONSULTA: CARGAR OP CON SUS ITEMS
    ==================================================*/

    
    public function mostrarOpItem() {
        
        //FUNCION CON LA CONSULTA A REALIZAR

        $sql = "SELECT * FROM orden_produccion op INNER JOIN item i on op.OPCODIGO=i.OPCODIGO GROUP BY op.OPCODIGO " ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=======================================================
        CONSULTA: ACTUALIZAR ESTADO ITEM ORDEN DE PRODUCCION
    =======================================================*/
  
    public function actualizarEstadoItemOrdenProduccion($codigo,$estado){
      //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE item SET ESTCODIGO='".$estado."' WHERE NUM_PRESUP='".$codigo."' ";
	    $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
    /*===========================================================================
        CONSULTA: ACTUALIZAR LA CANTIDAD DE ITEMS ACTIVOS DE ORDEN DE PRODUCCION
    ===========================================================================*/
    
    public function actualizarCantidadOrdenProduccion($codigo,$cantidad){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE orden_produccion SET OPNUM_ITEM='".$cantidad."' WHERE PRESUPNUMERO='".$codigo."' ";
	    $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
     /*================================================
        CONSULTA: MOSTRAR SEGUIMIENTO ORDEN POR FECHA
    ================================================*/
    
    public function mostrarSeguimientoxFecha($fInicial,$fFinal) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM orden_produccion op INNER JOIN estado e on op.ESTCODIGO=e.ESTCODIGO  WHERE op.OPFECHAENTREGA>='".$fInicial."' && op.OPFECHAENTREGA<='".$fFinal."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    
    
    

}

?>