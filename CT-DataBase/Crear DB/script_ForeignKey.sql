-- *****************************************************
-- Definimos los fk de las tablas
-- *****************************************************

-- ==============================
--      TABLAS MAESTRAS
-- ==============================

    -- TABLA CLIENTE

    ALTER TABLE CLIENTE 
        ADD CONSTRAINT FK_CLIEN_DISTR FOREIGN KEY (DISTRCODIGO) REFERENCES DISTRITO(DISTRCODIGO),
        ADD CONSTRAINT FK_CLIEN_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO),
        ADD CONSTRAINT FK_CLIEN_EMP FOREIGN KEY (EMPCODIGO) REFERENCES EMPRESA(EMPCODIGO);
    
    -- TABLA EMPRESA
    
    ALTER TABLE EMPRESA ADD CONSTRAINT FK_EMP_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO);
    
    -- TABLA BANCO
    
    ALTER TABLE BANCO ADD CONSTRAINT FK_BANC_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO);
    
    -- TABLA PERSONAL
    
    ALTER TABLE PERSONAL 
        ADD CONSTRAINT FK_PERS_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO),
        ADD CONSTRAINT FK_PERS_EMP FOREIGN KEY (EMPCODIGO) REFERENCES EMPRESA(EMPCODIGO),
        ADD CONSTRAINT FK_PERS_AREA FOREIGN KEY (AREACODIGO) REFERENCES AREA(AREACODIGO),
        ADD CONSTRAINT FK_PERS_DISTR FOREIGN KEY (DISTRCODIGO) REFERENCES DISTRITO(DISTRCODIGO),
        ADD CONSTRAINT FK_PERS_USUA FOREIGN KEY (USUACODIGO) REFERENCES USUARIO(USUACODIGO);
    
    -- TABLA SERVICIO

    ALTER TABLE SERVICIO 
        ADD CONSTRAINT FK_SERV_SUBFAM FOREIGN KEY (SUBFAMCODIGO) REFERENCES SUB_FAMILIA(SUBFAMCODIGO),
        ADD CONSTRAINT FK_SERV_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO);
    
    -- TABLA MAQUINA
    
    ALTER TABLE MAQUINA 
        ADD CONSTRAINT FK_MAQUI_AREA FOREIGN KEY (AREAMAQCODIGO) REFERENCES AREA_MAQUINA(AREAMAQCODIGO),
        ADD CONSTRAINT FK_MAQUI_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO);
    
    -- TABLA ITEM
    
    ALTER TABLE ITEM 
        ADD CONSTRAINT FK_ITEM_DETACAB FOREIGN KEY (DETACABCODIGO) REFERENCES DETALLES_ACABADO(DETACABCODIGO),
        ADD CONSTRAINT FK_ITEM_OP FOREIGN KEY (OPCODIGO) REFERENCES ORDEN_PRODUCCION (OPCODIGO),
        ADD CONSTRAINT FK_ITEM_PPREN FOREIGN KEY (PPRENCODIGO) REFERENCES PRE_PRENSA (PPRENCODIGO);
    
    
-- ==============================
--      TABLAS GENERALES
-- ==============================

    -- TABLA DISTRITO

    ALTER TABLE DISTRITO ADD CONSTRAINT FK_DISTR_PROV FOREIGN KEY (PROVCODIGO) REFERENCES  PROVINCIA(PROVCODIGO);
    
    -- TABLA PROVINCIA
    
    ALTER TABLE PROVINCIA ADD CONSTRAINT FK_PROV_PAIS FOREIGN KEY (PAISCODIGO) REFERENCES  PAIS(PAISCODIGO);
    
    -- TABLA SUB_FAMILIA
    
    ALTER TABLE SUB_FAMILIA ADD CONSTRAINT FK_SUBFAM_FAM FOREIGN KEY (FAMCODIGO) REFERENCES FAMILIA(FAMCODIGO);
    
    -- TABLA IMPRESION
    
    ALTER TABLE IMPRESION 
        ADD CONSTRAINT FK_IMPREN_MAQUI FOREIGN KEY (MAQUICODIGO) REFERENCES MAQUINA(MAQUICODIGO),
        ADD CONSTRAINT FK_IMPREN_MOD FOREIGN KEY (MODCODIGO) REFERENCES MODELO(MODCODIGO);
        
    -- TABLA PRESUPUESTO
    
    ALTER TABLE PRESUPUESTO 
        ADD CONSTRAINT FK_PRESUP_CLIEN FOREIGN KEY (CLIENCODIGO) REFERENCES CLIENTE(CLIENCODIGO),
        ADD CONSTRAINT FK_PRESUP_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO);
    
    -- TABLA DETALLES_PLIEGO
    
    ALTER TABLE DETALLES_PLIEGO 
        ADD CONSTRAINT FK_DETPLIE_OPA FOREIGN KEY (OPACODIGO) REFERENCES ORDEN_PAPEL(OPACODIGO),
        ADD CONSTRAINT FK_DETPLIE_IMPREN FOREIGN KEY (IMPRENCODIGO) REFERENCES IMPRESION(IMPRENCODIGO);
    
    -- TABLA PRE_PRENSA
    
    ALTER TABLE PRE_PRENSA ADD CONSTRAINT FK_PPREN_IMPREN FOREIGN KEY (IMPRENCODIGO) REFERENCES IMPRESION(IMPRENCODIGO);
    
    -- TABLA ORDEN_PRODUCCION
    
    ALTER TABLE ORDEN_PRODUCCION 
        ADD CONSTRAINT FK_OP_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO),
        ADD CONSTRAINT FK_OP_PRESUP FOREIGN KEY (PRESUPNUMERO) REFERENCES PRESUPUESTO(PRESUPNUMERO);
        
    -- TABLA COSTOS_ACABADO
    
    ALTER TABLE COSTOS_ACABADO 
        ADD CONSTRAINT FK_COSTACAB_CRINS FOREIGN KEY (CRINSCODIGO) REFERENCES CONTROL_INSUMO(CRINSCODIGO),
        ADD CONSTRAINT FK_COSTACAB_TIPACAB FOREIGN KEY (TIPACABCODIGO) REFERENCES TIPO_ACABADO(TIPACABCODIGO),
        ADD CONSTRAINT FK_COSTACAB_PERS FOREIGN KEY (PERSCODIGO) REFERENCES PERSONAL(PERSCODIGO),
        ADD CONSTRAINT FK_COSTACAB_USUA FOREIGN KEY (USUACODIGO) REFERENCES USUARIO(USUACODIGO);
        
    -- TABLA COSTOS_MAQUINA
    
    ALTER TABLE COSTOS_MAQUINA 
        ADD CONSTRAINT FK_COSTMAQ_CRINS FOREIGN KEY (CRINSCODIGO) REFERENCES CONTROL_INSUMO(CRINSCODIGO),
        ADD CONSTRAINT FK_COSTMAQ_MAQUI FOREIGN KEY (MAQUICODIGO) REFERENCES MAQUINA(MAQUICODIGO),
        ADD CONSTRAINT FK_COSTMAQ_USUA FOREIGN KEY (USUACODIGO) REFERENCES USUARIO(USUACODIGO);
    
    -- TABLA CONTROL_INSUMO
    
    
    ALTER TABLE CONTROL_INSUMO ADD CONSTRAINT FK_CRINS_OP FOREIGN KEY (OPCODIGO) REFERENCES ORDEN_PRODUCCION(OPCODIGO);
    
    -- TABLA PROGRAMAR_MAQUINA
    
    ALTER TABLE PROGRAMAR_MAQUINA 
        ADD CONSTRAINT FK_PROMA_OP FOREIGN KEY (OPCODIGO) REFERENCES ORDEN_PRODUCCION(OPCODIGO), 
        ADD CONSTRAINT FK_PROMA_MAQUI FOREIGN KEY (MAQUICODIGO) REFERENCES MAQUINA(MAQUICODIGO);
        
    -- TABLA ITEM_PRESUPUESTO
    
    ALTER TABLE ITEM_PRESUPUESTO 
        ADD CONSTRAINT FK_ITPRESU_DETPRESUP FOREIGN KEY (DETPRESUPCODIGO) REFERENCES DETALLE_PRESUPUESTO(DETPRESUPCODIGO), 
        ADD CONSTRAINT FK_ITPRESU_PRECIOPRESUP FOREIGN KEY (PRECIOPRESUPCODIGO) REFERENCES PRECIO_PRESUPUESTO(PRECIOPRESUPCODIGO),
        ADD CONSTRAINT FK_ITPRESU_PRESUP FOREIGN KEY (PRESUPNUMERO) REFERENCES PRESUPUESTO(PRESUPNUMERO);
    
    -- TABLA F1810_MAQUI
    
    ALTER TABLE F1810_MAQUI
        ADD CONSTRAINT FK_FMAQUI_USUA FOREIGN KEY (USUACODIGO) REFERENCES USUARIO(USUACODIGO);
   
   -- TABLA F1810_INSU
         
    ALTER TABLE F1810_MAQUI
        ADD CONSTRAINT FK_FINSU_USUA FOREIGN KEY (USUACODIGO) REFERENCES USUARIO(USUACODIGO);
        
        
    -- TABLA CONTRATO
    
    ALTER TABLE CONTRATO 
            ADD CONSTRAINT FK_CONTR_PERS FOREIGN KEY (PERSCODIGO) REFERENCES PERSONAL(PERSCODIGO),
            ADD CONSTRAINT FK_CONTR_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO);
            
    -- TABLA DETALLE_CONTRATO
    
    ALTER TABLE DETALLE_CONTRATO 
            ADD CONSTRAINT FK_DETCONTR_CONTR FOREIGN KEY (CONTRCODIGO) REFERENCES CONTRATO(CONTRCODIGO);
            
    -- TABLA VACACIONES
    
    ALTER TABLE VACACIONES 
            ADD CONSTRAINT FK_VACAPERS_DETCONTR FOREIGN KEY (DETCONTRCODIGO) REFERENCES DETALLE_CONTRATO(DETCONTRCODIGO);
    
    -- TABLA DETALLE_VACACIONES
    
    ALTER TABLE DETALLE_VACACIONES 
        ADD CONSTRAINT FK_DETVACAPERS_EST FOREIGN KEY (ESTCODIGO) REFERENCES ESTADO(ESTCODIGO),
        ADD CONSTRAINT FK_DETVACAPERS_VACAPERS FOREIGN KEY (VACAPERSCODIGO) REFERENCES VACACIONES(VACAPERSCODIGO);
        


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    