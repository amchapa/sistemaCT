<?php

/*================================================
CLASE: MODELO DEL CONTROLADOR PRODUCCION

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UNA NUEVA ORDEN DE PRODUCCION
================================================*/

class Model_Produccion{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*========================================================
        CONSULTA: VALIDACION DEL CODIGO DE PROGRAMAR_MAQUINA
    ========================================================*/
    public function validarRegistro($codigo){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM programar_maquina where ITEMNUMERO='".$codigo."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*================================================
        CONSULTA: REGISTRAR PROGRAMACION DE MAQUINA
    ================================================*/
    public function registrarPrograMaq($fecha,$cantHoras,$fechaRegistro,$codigoItem,$codMaquina,$codEjecutiva,$prioridad,$observaciones,$usuario,$fechaProg,$estado) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `programar_maquina` VALUES (NULL, '".$fecha."', '".$cantHoras."', '".$fechaRegistro."', '".$codigoItem."', '".$codMaquina."', '".$codEjecutiva."','".$prioridad."', '".$observaciones."','".$usuario."','".$fechaProg."','".$fechaProg."','".$estado."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }

    /*==================================================================
        CONSULTA: MOSTRAR LA DATA DEL PROGRESO DE ORDEN DE PRODUCCION
    ==================================================================*/
    public function mostrarProgresoOrdProd($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,pm.USUACODIGO AS USUAREGISTRO FROM `programar_maquina` pm INNER JOIN item i on pm.itemnumero = i.ITEMNUMERO INNER JOIN maquina m on pm.maquicodigo = m.MAQUICODIGO INNER JOIN area_maquina am on m.AREAMAQCODIGO  = am.AREAMAQCODIGO  INNER JOIN personal p on pm.perscodigo = p.PERSCODIGO WHERE pm.ITEMNUMERO = '".$variable."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }           
        
    /*==================================================================
        CONSULTA: FUNCION PARA MOSTRAR TODOS LOS DATOS DE CIERTO ITEM
    ==================================================================*/
    public function mostrarDatosItem($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `programar_maquina` WHERE PROMACODIGO  = '".$variable."'" ;
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }   
    
    /*==============================================================
        CONSULTA: ACTUALIZAR DATOS DEL REGISTRO EN PROGRAMAR_MAQUINA
    ================================================================*/
    public function actualizarRegistroPrograMaq($codigo,$maquina,$fecha,$tiempo,$prioridad,$personal,$obs){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE programar_maquina SET PROMAFECHA_PROGRA ='" . $fecha . "' , PROMACANTIDAD_HORAS='" . $tiempo . "' , MAQUICODIGO ='".$maquina."' , PERSCODIGO ='".$personal."' , PROMAPRIORIDAD ='".$prioridad."' , PROMAOBSERVACION  ='".$obs."' WHERE PROMACODIGO ='".$codigo."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=====================================================
        CONSULTA: ELIMINAR REGISTRO DE PROGRAMAR_MAQUINA
    =====================================================*/
    public function eliminarRegistroPrograMaq($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `programar_maquina` WHERE PROMACODIGO='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*=====================================================
        CONSULTA: MOSTRAR INFORMACION POR MAQUINA
    =====================================================*/
    public function mostrarDataXMaq($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM programar_maquina pm INNER JOIN item i on pm.ITEMNUMERO=i.ITEMNUMERO INNER JOIN maquina mc on pm.MAQUICODIGO=mc.MAQUICODIGO INNER JOIN personal p on pm.PERSCODIGO=p.PERSCODIGO  WHERE pm.MAQUICODIGO='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }   
    
    /*=====================================================
        CONSULTA: ACTUALIZAR EL ESTADO DE LA MAQUINA
    =====================================================*/
    public function actualizarEstadoPrograMaq($codigo,$estado,$fecha,$palabra){
        if($palabra=="cambiar_iniciado"){
            //FUNCION CON LA CONSULTA A REALIZAR
            $sql = "UPDATE programar_maquina SET PROMA_ESTADO ='" . $estado . "' , PROGRA_FECHA_INICIO='" . $fecha . "' WHERE PROMACODIGO ='".$codigo."'";
        }else{
            //FUNCION CON LA CONSULTA A REALIZAR
            $sql = "UPDATE programar_maquina SET PROMA_ESTADO ='" . $estado . "' , PROGRA_FECHA_FINAL='" . $fecha . "' WHERE PROMACODIGO ='".$codigo."'";
        }
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }   
    
    /*========================================================
        CONSULTA: MOSTRAR INFORMACION POR ORD PRODUCCION
    ========================================================*/
    public function mostrarDataXOrdProd($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *,pm.USUACODIGO AS USUAREGISTRO FROM `programar_maquina` pm INNER JOIN item i on pm.itemnumero = i.ITEMNUMERO INNER JOIN maquina m on pm.maquicodigo = m.MAQUICODIGO INNER JOIN area_maquina am on m.AREAMAQCODIGO  = am.AREAMAQCODIGO  INNER JOIN personal p on pm.perscodigo = p.PERSCODIGO WHERE i.OPCODIGO = '".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }  
    
    /*===========================================================
        CONSULTA: FUNCION PARA REGISTRAR REGISTRO DE DESPACHO
    ===========================================================*/
    public function registrarDespacho($provincia,$distrito,$ordProd,$personal,$tipMensajeria,$seleccione,$otros,$direccion,$descripcion,$comentario,$despachoMaterial,$mensajeriaDocumentos,$guia,$factura,$monto,$pesoBruto,$numPaq,$fechaDestino,$horario,$horarioInicial,$horarioFinal,$contactoEntrega,$telefonoContacto,$fechaRegistro,$tipoMensajeria,$vehiculo,$mensajero,$mensajeroInput,$grupo,$respuesta,$costoEstado,$costoObjeto,$usuario,$estado,$accion,$kmi,$kmf){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `programar_despacho` VALUES (NULL,'".$provincia."', '".$distrito."', '".$ordProd."','".$personal."', '".$tipMensajeria."', '".$seleccione."', '".$otros."', '".$direccion."','".$descripcion."', '".$comentario."','".$despachoMaterial."','".$mensajeriaDocumentos."','".$guia."','".$factura."','".$monto."','".$pesoBruto."','".$numPaq."','".$fechaDestino."','".$horario."','".$horarioInicial."','".$horarioFinal."','".$contactoEntrega."','".$telefonoContacto."','".$fechaRegistro."','".$tipoMensajeria."','".$vehiculo."','".$mensajero."','".$mensajeroInput."','".$grupo."','".$respuesta."','".$costoEstado."','".$costoObjeto."','".$usuario."','".$estado."','".$accion."','".$kmi."','".$kmf."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
    /*========================================================
        CONSULTA: MOSTRAR PERSONAL POR AREA
    ========================================================*/
    public function mostrarPersonalxArea($variable){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `personal`  WHERE AREACODIGO  = '".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*========================================================
        CONSULTA: MOSTRAR INFORMACION POR ORD PRODUCCION
    ========================================================*/
    public function mostrarDatosXOt($variable){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM item i INNER JOIN orden_produccion op on i.OPCODIGO=op.OPCODIGO INNER JOIN presupuesto p on op.PRESUPNUMERO=p.PRESUPNUMERO INNER JOIN cliente c on p.CLIENCODIGO=c.CLIENCODIGO where op.OPCODIGO= '".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*========================================================
        CONSULTA: MOSTRAR TODOS LOS TIPO DE MENSAJERIAS
    ========================================================*/
    public function mostrarTodosTipMensajeria(){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT OPCODIGO ,PRODESCODIGO,PRODESTIPO_MENSAJERIA FROM programar_despacho";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*==============================================================
        CONSULTA: MOSTRAR TODOS LOS REGISTROS POR ORD. PRODUCCION
    ==============================================================*/
    public function mostrarRegistrosTotalXOt($variable){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT pd.*, d.DISTRNOMBRE, p.PERSNOMBRE,p.PERSAPELLIDO_PATERNO,p.PERSAPELLIDO_MATERNO,c.CLIENRAZON_SOCIAL, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on p.PERSCODIGO=pd.PERSCODIGO inner join presupuesto pre on pre.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on c.CLIENCODIGO =pre.CLIENCODIGO where pd.OPCODIGO= '".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*========================================================
        CONSULTA: MOSTRAR TODOS LOS REGISTROS POR COD. CLIENTE
    ========================================================*/
    
    public function mostrarRegistrosTotalXCliente($variable){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT pd.*, d.DISTRNOMBRE, p.PERSNOMBRE,p.PERSAPELLIDO_PATERNO,p.PERSAPELLIDO_MATERNO,c.CLIENRAZON_SOCIAL, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on p.PERSCODIGO=pd.PERSCODIGO inner join presupuesto pre on pre.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on c.CLIENCODIGO =pre.CLIENCODIGO where c.CLIENCODIGO = '".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*========================================================
        CONSULTA: MOSTRAR INFORMACION POR REGISTRO DESPACHO
    ========================================================*/
    public function mostrarDatosXRegistroDespacho($variable){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT *, pd.DISTRCODIGO as codigoDistrito, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on pd.PERSCODIGO=p.PERSCODIGO inner join presupuesto pr on pr.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on pr.CLIENCODIGO=c.CLIENCODIGO where pd.PRODESCODIGO= '".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
    
    /*========================================================
        CONSULTA: ACTUALIZAR INFORMACION POR COD.DESPACHO
    ========================================================*/
    public function actualizarDespacho($codigo,$provincia,$distrito,$tipMensajeria,$seleccione,$otros,$direccion,$descripcion,$comentario,$guia,$factura,$monto,$numPaq,$pesoBruto,$fechaDestino,$horario,$horarioInicial,$horarioFinal,$contactoEntrega,$telefonoContacto){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE programar_despacho SET PROVCODIGO ='" . $provincia . "' , DISTRCODIGO ='" . $distrito . "' , PRODESTIP_MENSAJERIA  ='".$tipMensajeria."' , PRODES_SELECCIONE  ='".$seleccione."' , PRODES_OTROS  ='".$otros."' , PRODES_DIRECCION   ='".$direccion."' , PRODES_DESCRIPCION   ='".$descripcion."' , PRODES_COMENTARIO    ='".$comentario."' , PRODES_GUIA   ='".$guia."', PRODES_FACTURA    ='".$factura."', PRODES_MONTO='".$monto."', PRODES_PESO_BRUTO='".$pesoBruto."',PRODES_NUM_PAQ ='".$numPaq."', PRODES_FECHA_DESTINO ='".$fechaDestino."', PRODES_HORARIO ='".$horario."', PRODES_HORARIO_INICIO ='".$horarioInicial."', PRODES_HORARIO_FINAL ='".$horarioFinal."', PRODES_CONTACTO ='".$contactoEntrega."', PRODES_TELEFONO ='".$telefonoContacto."'  WHERE PRODESCODIGO  ='".$codigo."'; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*========================================================
        CONSULTA: ACTUALIZAR EL ESTADO POR COD. DESPACHO
    ========================================================*/    
    public function actualizarEstadoDespacho($codigo,$estado,$accion,$respuesta,$costoEstado,$costoObjeto,$vehiculo,$mensajero,$mensajeroInput,$kmi,$kmf){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE programar_despacho SET ESTCODIGO ='" . $estado . "' , PRODES_ACCION  ='" . $accion . "' , PRODES_RESPUESTA  ='".$respuesta."' , PRODES_COSTO_ESTADO  ='".$costoEstado."' , PRODES_COSTO_OBJETO ='".$costoObjeto."' , PRODES_VEHICULO  ='".$vehiculo."' , PRODES_MENSAJERO ='".$mensajero."' , PRODES_MENSAJERO_INPUT  ='".$mensajeroInput."' , PRODES_KMI    ='".$kmi."', PRODES_KMF     ='".$kmf."' WHERE PRODESCODIGO  ='".$codigo."'; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*========================================================
        CONSULTA: MOSTRAR INFORMACION POR TURNO DE DESPACHO
    ========================================================*/    
    public function mostrarRegistrosTotalXTurno($turno,$fInicial,$fFinal){
        //FUNCION CON LA CONSULTA A REALIZAR
        if($turno != "turno"){
            $sql = "SELECT pd.*, d.DISTRNOMBRE, p.PERSNOMBRE,p.PERSAPELLIDO_PATERNO,p.PERSAPELLIDO_MATERNO,c.CLIENRAZON_SOCIAL, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on p.PERSCODIGO=pd.PERSCODIGO inner join presupuesto pre on pre.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on c.CLIENCODIGO =pre.CLIENCODIGO where pd.PRODES_HORARIO= '".$turno."' && pd.PRODES_FECHA_DESTINO >= '".$fInicial."' && pd.PRODES_FECHA_DESTINO <= '".$fFinal."' ";
        }else{
            $sql = "SELECT pd.*, d.DISTRNOMBRE, p.PERSNOMBRE,p.PERSAPELLIDO_PATERNO,p.PERSAPELLIDO_MATERNO,c.CLIENRAZON_SOCIAL, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on p.PERSCODIGO=pd.PERSCODIGO inner join presupuesto pre on pre.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on c.CLIENCODIGO =pre.CLIENCODIGO where pd.PRODES_FECHA_DESTINO >= '".$fInicial."' && pd.PRODES_FECHA_DESTINO <= '".$fFinal."' ";
        }
        
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*================================================================
        CONSULTA: MOSTRAR INFORMACION POR SOLICITANTE DE DESPACHO
    ================================================================*/    
    public function mostrarRegistrosTotalXSolicitante($solicitante,$fInicial,$fFinal){
        //FUNCION CON LA CONSULTA A REALIZAR
        if($solicitante != "solicitante"){
            $sql = "SELECT pd.*, d.DISTRNOMBRE, p.PERSNOMBRE,p.PERSAPELLIDO_PATERNO,p.PERSAPELLIDO_MATERNO,c.CLIENRAZON_SOCIAL, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on p.PERSCODIGO=pd.PERSCODIGO inner join presupuesto pre on pre.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on c.CLIENCODIGO =pre.CLIENCODIGO where pd.PERSCODIGO = '".$solicitante."' && pd.PRODES_FECHA_DESTINO >= '".$fInicial."' && pd.PRODES_FECHA_DESTINO <= '".$fFinal."' ";
        }else{
            $sql = "SELECT pd.*, d.DISTRNOMBRE, p.PERSNOMBRE,p.PERSAPELLIDO_PATERNO,p.PERSAPELLIDO_MATERNO,c.CLIENRAZON_SOCIAL, pd.ESTCODIGO as estadoDespacho FROM programar_despacho pd inner join distrito d on pd.DISTRCODIGO=d.DISTRCODIGO inner join orden_produccion o on pd.OPCODIGO=o.OPCODIGO inner join personal p on p.PERSCODIGO=pd.PERSCODIGO inner join presupuesto pre on pre.PRESUPNUMERO=o.PRESUPNUMERO inner join cliente c on c.CLIENCODIGO =pre.CLIENCODIGO where pd.PRODES_FECHA_DESTINO >= '".$fInicial."' && pd.PRODES_FECHA_DESTINO <= '".$fFinal."' ";
        }
        
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    public function registrarPadronDespacho($proveedor,$ot,$mPliego,$cantidad,$descripcion,$pEntrega,$estado,$fTransporte,$fRegistro,$usuario){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `padron_tercero` VALUES (NULL,'".$proveedor."', '".$ot."', '".$mPliego."','".$cantidad."', '".$descripcion."', '".$pEntrega."', '".$estado."', '".$fTransporte."','".$fRegistro."', '".$usuario."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
    /*==============================================================
        CONSULTA: MOSTRAR INFORMACION DE PADRON DESPACHO X ESTADO
    ==============================================================*/    
    public function mostrarPadronTerceroXEstado($estado,$fInicial,$fFinal){
        //FUNCION CON LA CONSULTA A REALIZAR
        if($estado != "padron"){
            $sql = "SELECT pt.*, p.PROVEEDRAZON_SOCIAL, e.ESTDESCRIPCION FROM padron_tercero pt INNER JOIN proveedor p on pt.PROVEEDCODIGO=p.PROVEEDCODIGO INNER JOIN orden_produccion o on pt.OPCODIGO=o.OPCODIGO INNER JOIN estado e on pt.ESTCODIGO=e.ESTCODIGO where pt.ESTCODIGO= '".$estado."' && pt.PADFECHA_REGISTRO >= '".$fInicial."' && pt.PADFECHA_REGISTRO <= '".$fFinal."' ";
        }else{
            $sql = "SELECT pt.*, p.PROVEEDRAZON_SOCIAL, e.ESTDESCRIPCION FROM padron_tercero pt INNER JOIN proveedor p on pt.PROVEEDCODIGO=p.PROVEEDCODIGO INNER JOIN orden_produccion o on pt.OPCODIGO=o.OPCODIGO INNER JOIN estado e on pt.ESTCODIGO=e.ESTCODIGO where pt.PADFECHA_REGISTRO >= '".$fInicial."' && pt.PADFECHA_REGISTRO <= '".$fFinal."' ";
        }
        
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*==============================================================
        CONSULTA: MOSTRAR INFORMACION DE PADRON DESPACHO X OT
    ==============================================================*/    
    public function mostrarRegistrosTotalXOtPT($ot){
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT pt.*, p.PROVEEDRAZON_SOCIAL, e.ESTDESCRIPCION FROM padron_tercero pt INNER JOIN proveedor p on pt.PROVEEDCODIGO=p.PROVEEDCODIGO INNER JOIN orden_produccion o on pt.OPCODIGO=o.OPCODIGO INNER JOIN estado e on pt.ESTCODIGO=e.ESTCODIGO where pt.OPCODIGO = '".$ot."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    
}

?>