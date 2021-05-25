<?php

/*===========================================
CLASE: MODELO DEL CONTROLADOR PERSONAL

    ALMACENA LAS FUNCIONES CORRESPONDIENTES
    AL REGISTRO DE UN NUEVO PERSONAL
===========================================*/

class Model_Personal{
    
    private $_conexion;
    
    public function __construct() {
        $this->_conexion = new conexion();
    }
    
    public function retornar_SELECT() {
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS DATOS DEL PERSONAL
    ===========================================*/
    
    public function mostrarTodosPersonal() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, A.AREADESCRIPCION FROM PERSONAL P INNER JOIN AREA A ON P.AREACODIGO=A.AREACODIGO WHERE P.ESTCODIGO=8 ORDER BY PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS DATOS DEL PERSONAL DE BAJA
    ===========================================*/
    
    public function mostrarTodosPersonalBaja() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, A.AREADESCRIPCION FROM PERSONAL P INNER JOIN AREA A ON P.AREACODIGO=A.AREACODIGO ORDER BY PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS DATOS DEL PERSONAL DE BAJA
    ===========================================*/
    
    public function mostrarTodosPersonalVacaciones() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, V.* FROM VACACIONES V INNER JOIN PERSONAL P ON P.PERSCODIGO=V.PERSCODIGO GROUP BY (P.PERSCODIGO) ORDER BY PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR AREAS DEL PERSONAL
    ===========================================*/
    
    public function mostrarAreasPersonal() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM AREA";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: VALIDAR REGISTRO PERSONAL
    ===========================================*/

    public function validarPersonal($numIdentificacion) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM PERSONAL WHERE PERSNUM_IDENTIFICACION='".$numIdentificacion."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR PERSONAL
    ===========================================*/

    public function registrarUsuario($codigo,$usuario,$numIdentificacion,$nivel) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `usuario` VALUES ('".$codigo."', '".$usuario."', '".$numIdentificacion."', '".$nivel."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR PERSONAL
    ===========================================*/

    public function registrarPersonal($fechaRegistro,$nombre,$aPaterno,$aMaterno,$tipiden,$numIdentificacion,$sexo,$fIngreso ,$fNacimiento,$telefono1,$telefono2,$correo1,$correo2,$empresa,$area,$especialidad,$estado,$tHorario,$turno,$distrito,$domicilio,$codigo,$rutaFoto,$tipoContrato) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `personal` VALUES (NULL, '".$fechaRegistro."', '".$tipiden."', '".$numIdentificacion."', '".$nombre."', '".$aPaterno."', '".$aMaterno."', '".$telefono1."','".$telefono2."', '".$sexo."', '".$fNacimiento."', '".$fIngreso."', '".$correo1."', '".$correo2."', '".$estado."', '".$empresa."', '".$area."', '".$especialidad."', '".$rutaFoto."' , '".$tHorario."', '".$turno."', '".$domicilio."', '".$distrito."', '".$codigo."', '".$tipoContrato."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL PERSONAL
    ===========================================*/
    
    public function mostrarDatosPersonal($variable) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, D.*, PROV.*, A.AREADESCRIPCION FROM PERSONAL P INNER JOIN DISTRITO D ON P.DISTRCODIGO= D.DISTRCODIGO INNER JOIN PROVINCIA PROV ON PROV.PROVCODIGO=D.PROVCODIGO INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO WHERE P.PERSCODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR ESTADO
    ===========================================*/
    
    public function mostrarEstado() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT `ESTCODIGO`,`ESTDESCRIPCION` FROM `estado` WHERE `ESTTIPO`='PERSONAL' ORDER BY ESTDESCRIPCION";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
  
    /*===========================================
        CONSULTA: ACTUALIZAR DATOS DEL PERSONAL
    ===========================================*/
 
    
    public function actualizarPersonal($codigo,$nombre,$aPaterno,$aMaterno,$tipiden,$numIdentificacion,$sexo,$fIngreso ,$fNacimiento,$telefono1,$telefono2,$correo1,$correo2,$empresa,$area,$especialidad,$estado,$tHorario,$turno,$distrito,$domicilio,$rutaFoto,$condicionLaboral){
        
        $sql="UPDATE PERSONAL SET PERSNOMBRE='" .$nombre. "', PERSAPELLIDO_PATERNO='" .$aPaterno. "', PERSAPELLIDO_MATERNO='" .$aMaterno. "', PERSTELEFONO1='" . $telefono1 . "' , PERSTELEFONO2='" . $telefono2 . "' , PERSGENERO='" . $sexo . "' ,  PERSFECHA_NACIMIENTO='" . $fNacimiento . "' ,  PERSFECHA_INGRESO = '" . $fIngreso . "' , PERSCORREO1='" . $correo1 . "' , PERSCORREO2='" . $correo2 . "' , ESTCODIGO='" . $estado . "' , EMPCODIGO = '" . $empresa . "' , AREACODIGO='" . $area . "' , PERSESPECIALIDAD='" . $especialidad . "' , PERSFOTO='" .$rutaFoto. "', PERSTIPHORARIO='" . $tHorario . "', PERSTURNO='" . $turno . "' , PERSDOMICILIO ='" . $domicilio . "' , DISTRCODIGO='" . $distrito . "', PERSNUM_IDENTIFICACION='" . $numIdentificacion . "', PERSCONDICION_LABORAL ='".$condicionLaboral."' WHERE PERSCODIGO='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
     
    /*===========================================
        CONSULTA: MOSTRAR TODOS DEL PERSONAL
    ===========================================*/
    
    public function mostrarPersonal() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `personal` ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS CONTRATOS
    ===========================================*/
    
    public function mostrarTodosContrato() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT C.*, P.EMPCODIGO AS 'EMP_PERSONAL' FROM contrato C INNER JOIN personal P ON C.PERSCODIGO=P.PERSCODIGO WHERE P.ESTCODIGO='8' ORDER BY P.EMPCODIGO, P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*=======================================================
        CONSULTA: MOSTRAR TODOS LOS CONTRATOS SIN EXCEPCION
    =======================================================*/
    
    public function mostrarTodosContratoSinExcepcion() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT C.*, P.EMPCODIGO AS 'EMP_PERSONAL' FROM contrato C INNER JOIN personal P ON C.PERSCODIGO=P.PERSCODIGO ORDER BY P.EMPCODIGO, P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR CONTRATO
    ===========================================*/
    
    public function registrarContrato($code,$codePersonal,$estado,$fIngresoPlanilla,$empresa) {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `contrato` VALUES ('".$code."', '".$codePersonal."', '".$estado."', '".$fIngresoPlanilla."', '".$empresa."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }

    /*===========================================
        CONSULTA: REGISTRAR EN DETALLE_CONTRATO
    ===========================================*/
    
    public function registrarDetalleContrato($codigoDetalle,$fContratacion,$codigo,$cantidadIngresada,$liquidar,$estado){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `detalle_contrato` VALUES ('".$codigoDetalle."', '".$fContratacion."','".$cantidadIngresada."','".$estado."','".$codigo."','".$liquidar."');";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    
    /*===================================================
        CONSULTA: MOSTRAR CONDICION LABORAL DEL PERSONAL
    =====================================================*/
    
    public function mostrarCondLaboral($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, C.*, DC.* FROM PERSONAL P INNER JOIN CONTRATO C ON P.PERSCODIGO=C.PERSCODIGO INNER JOIN DETALLE_CONTRATO DC ON C.CONTRCODIGO=DC.CONTRCODIGO WHERE P.PERSCODIGO= '".$variable."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR CONTRATO
    ===========================================*/
    
    public function actualizarContrato($codigo,$estado, $fIngresoPlanilla,$codContrato,$empresa){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE CONTRATO SET ESTCODIGO='" . $estado . "' , CONTRINGRESO_PLANILLA='" . $fIngresoPlanilla . "' WHERE PERSCODIGO='".$codigo."' AND EMPCODIGO='". $empresa ."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*==================================================
        CONSULTA: ACTUALIZAR DATOS DEL DETALLE PERSONAL
    ====================================================*/
    
    public function actualizarDetalleContrato($fContratacion,$inputCantidad,$detUltimoContrato,$liquidar,$estado){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE detalle_contrato SET DETCONTRFECHA_CONTRATACION='" . $fContratacion . "' , DETCONTRTIEMPO='" . $inputCantidad . "' , ESTCODIGO='".$estado."' , DETCONTRLIQUIDACION='".$liquidar."' WHERE DETCONTRCODIGO='".$detUltimoContrato."' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR DATOS DE VACACIONES
    ===========================================*/
    
    public function mostrarTodosVacaciones(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `vacaciones` ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR DATOS DE VACACIONES
    ===========================================*/
    
    public function registrarVacaciones($codeVacaciones,$codePersonal,$periodo,$dias){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `vacaciones` VALUES ('".$codeVacaciones."', '".$codePersonal."', '".$periodo."','".$dias."',0,0);";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: AGREGAR CONTRATO DEL PERSONAL
    ===========================================*/

    public function nuevoContratoPersonal($variable1,$variable2,$variable3,$variable5){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO DETALLE_CONTRATO VALUES ('".$variable1."', '".$variable2."','".$variable3."', '".$variable5."') ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    /*===========================================
        CONSULTA: PERSONAL CON CONTRATO
    ===========================================*/
    
    public function personalConContrato(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*,C.* FROM CONTRATO C INNER JOIN PERSONAL P ON P.PERSCODIGO = C.PERSCODIGO WHERE P.ESTCODIGO='8' AND P.EMPCODIGO=C.EMPCODIGO ORDER BY P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL CONTRATO DEL PERSONAL
    ===========================================*/
    
    public function mostrarPersonalContrato($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT  *, C.EMPCODIGO AS EMPCODIGO2  FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO INNER JOIN CONTRATO C ON C.PERSCODIGO=P.PERSCODIGO INNER JOIN DETALLE_CONTRATO DC ON DC.CONTRCODIGO=C.CONTRCODIGO WHERE P.PERSCODIGO='".$variable."' AND P.EMPCODIGO=C.EMPCODIGO AND P.ESTCODIGO='8' ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
     /*===========================================
        CONSULTA: MOSTRAR DATOS DE TODOS LOS CONTRATOS DEL PERSONAL
    ===========================================*/
    
    public function mostrarPersonalTodoContrato($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT  *, C.EMPCODIGO AS EMPCODIGO2  FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO INNER JOIN CONTRATO C ON C.PERSCODIGO=P.PERSCODIGO INNER JOIN DETALLE_CONTRATO DC ON DC.CONTRCODIGO=C.CONTRCODIGO WHERE P.PERSCODIGO='".$variable."' AND P.ESTCODIGO='8' ORDER BY P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: MOSTRAR  PERSONAL CON CONTRATO
    ===========================================*/
    
    public function mostrarPersonalConHistorial(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT  *, C.EMPCODIGO AS EMPCODIGO2  FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO INNER JOIN CONTRATO C ON C.PERSCODIGO=P.PERSCODIGO INNER JOIN DETALLE_CONTRATO DC ON DC.CONTRCODIGO=C.CONTRCODIGO WHERE P.ESTCODIGO='8' GROUP by (P.PERSCODIGO) ORDER BY P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  

    /*===========================================
        CONSULTA: MOSTRAR DATOS DEL CONTRATO DEL PERSONAL Y VACACIONES
    ===========================================*/
  
    public function mostrarPersonalContratoVacaciones($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT A.*,P.*,V.* FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO INNER JOIN VACACIONES V ON V.PERSCODIGO=P.PERSCODIGO WHERE P.PERSCODIGO='".$variable."' AND P.ESTCODIGO='8'  ORDER BY V.VACAPERSPERIODO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
  
    /*===========================================
        CONSULTA: ELIMINAR CONTRATO
    ===========================================*/
    
    public function eliminarcontrato($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `detalle_contrato` WHERE `DETCONTRCODIGO`='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: ELIMINAR CONTRATO PRINCIPAL
    ===========================================*/
    
    public function eliminarcontratoPrincipal($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `contrato` WHERE `CONTRCODIGO`='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    
    /*===========================================
        CONSULTA: ACTUALIZAR CONDICION LABORAL
    ===========================================*/
    
    public function actualizarCondicionPersonal($variable,$empresa,$condicion){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "UPDATE `personal` SET `PERSCONDICION_LABORAL`='".$condicion."',  `EMPCODIGO`='".$empresa."' WHERE PERSCODIGO='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    /*===========================================
        CONSULTA: ELIMINAR VACACIONES DEL DETALLE CONTRATO
    ===========================================*/
    
    public function eliminarVacaciones($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `vacaciones` WHERE `VACAPERSCODIGO`='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*==================================================
        CONSULTA: ACTUALIZAR ESTADO DEL PERSONAL
    ====================================================*/
    
    public function actualizarEstadoPersonal($codigo,$estado,$fecha){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE personal SET ESTCODIGO='" . $estado . "', PERSFECHA_INGRESO='".$fecha."' WHERE PERSCODIGO='".$codigo."';";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    public function actualizarEstadoContratoyPersonal($codigo,$estPersonal,$estContrato,$conLaboral,$estDetalle,$meses){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE personal p INNER JOIN contrato c on p.PERSCODIGO=c.PERSCODIGO INNER JOIN detalle_contrato dc on c.CONTRCODIGO=dc.CONTRCODIGO SET p.ESTCODIGO='".$estPersonal."', c.ESTCODIGO='".$estContrato."', p.PERSCONDICION_LABORAL='".$conLaboral."',dc.DETCONTRTIEMPO='".$meses."' , dc.ESTCODIGO='".$estDetalle."' WHERE dc.DETCONTRCODIGO = '".$codigo."' ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
        
    /*===========================================
        CONSULTA: MOSTRAR PERSONAL CONTRATO - VACACIONES
    ===========================================*/
    
    public function mostrarPersonalVacaciones($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT E.*,V.*,DV.* FROM VACACIONES V INNER JOIN DETALLE_VACACIONES DV ON DV.VACAPERSCODIGO=V.VACAPERSCODIGO INNER JOIN ESTADO E ON DV.ESTCODIGO=E.ESTCODIGO WHERE V.VACAPERSCODIGO='".$variable."' ORDER BY DV.DETVACAPERSINICIO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    
    /*===========================================
        CONSULTA: GUARDAR VACACIONES
    ===========================================*/
    
    public function guardarVacaciones($variable1,$variable2,$variable3,$variable4,$variable5,$variable6){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `detalle_vacaciones` VALUES ('".$variable2."', '".$variable3."', '".$variable4."', '".$variable5."', '".$variable6."', '".$variable1."')  ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    /*===========================================
        CONSULTA: ELIMINAR DETALLE VACACIONES
    ===========================================*/
    
    public function eliminarDetalleVacaciones($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `detalle_vacaciones` WHERE VACAPERSCODIGO ='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: ELIMINAR DETALLE VACACIONES PERSONAL
    ===========================================*/
    
    public function eliminarDetalleVacacionesPersonal($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `detalle_vacaciones` WHERE DETVACAPERSCODIGO ='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    /*===========================================
        CONSULTA: MOSTRAR VACACIONES DEL CONTRATO
    ===========================================*/
    
    public function mostrarVacacionesdelContrato($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM VACACIONES WHERE VACAPERSCODIGO ='".$variable."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
        
    }
    
    
    /*===========================================
        CONSULTA: MOSTRAR TODAS LAS VACACIONES    
    ===========================================*/
    
    public function mostrarDetallesTotalVacaciones(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO INNER JOIN VACACIONES V ON P.PERSCODIGO=V.PERSCODIGO INNER JOIN DETALLE_VACACIONES DV ON DV.VACAPERSCODIGO=V.VACAPERSCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=DV.ESTCODIGO ORDER BY V.VACAPERSPERIODO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: MOSTRAR TODAS LAS VACACIONES    
    ===========================================*/
    
    public function mostrarTotalVacaciones(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO  INNER JOIN VACACIONES V ON P.PERSCODIGO=V.PERSCODIGO WHERE P.ESTCODIGO = 8 ORDER BY P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO, PERSNOMBRE, VACAPERSCODIGO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
  
    /*===========================================
        CONSULTA: ACTUALIZAR DIAS DE VACACIONES   
    ===========================================*/
    
    public function actualizarDiasVacaciones($codigo,$dias){
        
         //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE vacaciones SET VACAPERSEFECTIVAS='" . $dias . "' WHERE VACAPERSCODIGO='".$codigo."';";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    /*=======================================================
        CONSULTA: ACTUALIZAR DIAS PROGRAMADOS DE VACACIONES   
    ========================================================*/
    
    public function actualizarDiasProgramados($codigo,$dias){
        
         //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE vacaciones SET VACAPERSPROGRAMADAS='" . $dias . "' WHERE VACAPERSCODIGO='".$codigo."';";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    /*===================================================
        CONSULTA: ACTUALIZAR ESTADO DEL DETALLE CONTRATO  
    ===================================================*/
    
    public function actualizarEstadoDetContrato($detcodigo,$estado){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE detalle_vacaciones SET ESTCODIGO='" . $estado . "' WHERE DETVACAPERSCODIGO='".$detcodigo."';";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
     /*===========================================
        CONSULTA: MOSTRAR TODOS PERSONAL ROTATIVO
    ===========================================*/
    
    public function mostrarTodosRotativos() {
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, A.* ,G.* FROM personal P INNER JOIN area A ON P.AREACODIGO=A.AREACODIGO INNER JOIN grupo G ON P.PERSTURNO=G.GRUPCODIGO where PERSTIPHORARIO ='ROTATIVO' AND P.ESTCODIGO=8";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR GRUPO DEL PERSONAL  
    ===========================================*/
    
    public function actualizarGrupo($codigo,$grupo){
        
         //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE personal SET PERSTURNO='" . $grupo . "' WHERE PERSCODIGO='".$codigo."';";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: ACTUALIZAR TODO EL CAMPO VACACIONES
    ===========================================*/
    
    public function actualizarTodoVacaciones($codigo,$personal,$periodo,$dias){
        
         //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE `vacaciones` SET `PERSCODIGO`='".$personal."',`VACAPERSPERIODO`='".$periodo."',`VACAPERSDIAS`='".$dias."' WHERE `VACAPERSCODIGO`='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
  
    /*===========================================
        CONSULTA: ACTUALIZAR DETALLE VACACIONES
    ===========================================*/
    
    public function actualizarVacaciones($codigo,$finicio,$dias,$estado,$obs){
        
         //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE detalle_vacaciones SET `DETVACAPERSINICIO`='".$finicio."',`DETVACAPERSDIAS`='".$dias."',`ESTCODIGO`='".$estado."',`DETVACAPERSOBS`='".$obs."' WHERE `DETVACAPERSCODIGO`='".$codigo."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*==================================================
        CONSULTA: CAMBIAR TURNO POR GRUPO
    ====================================================*/
    
    public function cambiarTurnoxGrupo($grupo,$turno){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE grupo SET GRUPTURNO='" . $turno . "'  WHERE GRUPCODIGO='".$grupo."';";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: REGISTRAR NUEVO GRUPO
    ===========================================*/
    
    public function registrarGrupo($code,$descripcion,$turno){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "INSERT INTO `grupo` VALUES ('".$code."', '".$descripcion."','".$turno."') ; ";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }  
    
    /*===========================================
        CONSULTA: MOSTRAR TODOS LOS GRUPOS
    ===========================================*/
    
    public function mostrarTodosGrupos(){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `GRUPO`;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    } 
    
    /*=====================================================
        CONSULTA: MOSTRAR TODOS PERSONAL ROTATIVO x GRUPOS
    ======================================================*/
    
    public function mostrarPersonalXGrupo($variable){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT P.*, A.* ,G.* FROM personal P INNER JOIN area A ON P.AREACODIGO=A.AREACODIGO INNER JOIN grupo G ON P.PERSTURNO=G.GRUPCODIGO where PERSTIPHORARIO ='ROTATIVO' AND PERSTURNO='".$variable."' AND P.ESTCODIGO = 8 ORDER BY P.PERSAPELLIDO_PATERNO, PERSAPELLIDO_MATERNO;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }  
    
    
    /*=====================================================
        CONSULTA: MOSTRAR CONTROL HORARIA X PERSONAL
    ======================================================*/
    
    public function mostrarControlHorarioxPersonal($variable,$finicio,$ffinal){
        
        if($variable==0){
            //FUNCION CON LA CONSULTA A REALIZAR
            $sql = "SELECT p.*, ch.* FROM personal p INNER JOIN control_horario ch on p.PERSNUM_IDENTIFICACION=ch.COD_BARRA WHERE ch.FECHA_CONT_HOR_INGRESO>='".$finicio."' AND ch.FECHA_CONT_HOR_SALIDA<='".$ffinal."' order by ch.FECHA_CONT_HOR_INGRESO ASC;";

        }else{
            //FUNCION CON LA CONSULTA A REALIZAR
            $sql = "SELECT p.*, ch.* FROM personal p INNER JOIN control_horario ch on p.PERSNUM_IDENTIFICACION=ch.COD_BARRA WHERE p.PERSCODIGO='".$variable."' AND ch.FECHA_CONT_HOR_INGRESO>='".$finicio."' AND ch.FECHA_CONT_HOR_SALIDA<='".$ffinal."' order by ch.FECHA_CONT_HOR_INGRESO ASC;";
        }
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }  
    
    /*=====================================================
        CONSULTA: MOSTRAR CONTROL HORARIA X PERSONAL
    ======================================================*/
    
    public function mostrarControlHorarioxFechas($codigo,$finicio,$ffinal){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT p.*, ch.* FROM personal p INNER JOIN control_horario ch on p.PERSNUM_IDENTIFICACION=ch.COD_BARRA WHERE p.EMPCODIGO='".$codigo."' AND ch.FECHA_CONT_HOR_INGRESO>='".$finicio."' AND ch.FECHA_CONT_HOR_SALIDA<='".$ffinal."' order by ch.FECHA_CONT_HOR_INGRESO ASC ;";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
        
    }
    
    public function registrarPersonalAControlHorario($numIdentificacion,$aDEntrada,$aDSalida,$hEntrada,$hSalida,$observaciones){
        //FUNCION CON LA CONSULTA A REALIZAR
        if($aDSalida==""){
          $sql = "INSERT INTO `control_horario` VALUES (NULL, '".$numIdentificacion."', '".$aDEntrada."', NULL , '".$hEntrada."', '".$hSalida."', '".$observaciones."');";
        }else{
          $sql = "INSERT INTO `control_horario` VALUES (NULL, '".$numIdentificacion."', '".$aDEntrada."', '".$aDSalida."', '".$hEntrada."', '".$hSalida."', '".$observaciones."');";
        }
      
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
    }
    

    /*============================================================
        CONSULTA: MOSTRAR DETALLE VACACIONES X PERSONAL Y EMPRESA
    =============================================================*/
    
    public function mostrarDetalleVacacionesPersonal($codigo,$empresa){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM PERSONAL P INNER JOIN AREA A ON A.AREACODIGO=P.AREACODIGO INNER JOIN VACACIONES V ON P.PERSCODIGO=V.PERSCODIGO INNER JOIN DETALLE_VACACIONES DV ON DV.VACAPERSCODIGO=V.VACAPERSCODIGO INNER JOIN ESTADO E ON E.ESTCODIGO=DV.ESTCODIGO WHERE P.PERSCODIGO='".$codigo."' OR P.EMPCODIGO='".$empresa."' ORDER BY DV.DETVACAPERSINICIO";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retorna_select();
    }
    
    /*============================================================
        CONSULTA: VERIFICAR CONTROL HORARIO
    =============================================================*/
    
    public function validarControlHorario($codBarra,$fecha){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "SELECT * FROM `control_horario` WHERE COD_BARRA='".$codBarra."' AND FECHA_CONT_HOR_INGRESO<='".$fecha."' order by FECHA_CONT_HOR_INGRESO desc limit 1";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->retornar_array();
    }
    
    /*===========================================
        CONSULTA: ACTUALIZAR CONTROL HORARIO
    ===========================================*/
    
    public function actualizarControlHorario($numIdentificacion,$aDEntrada,$aDSalida,$hSalida){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql="UPDATE control_horario SET FECHA_CONT_HOR_SALIDA='" . $aDSalida . "' , HORA_SALIDA='" . $hSalida . "' WHERE COD_BARRA='".$numIdentificacion."' AND FECHA_CONT_HOR_INGRESO='". $aDEntrada ."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    /*===========================================
        CONSULTA: ELIMINAR CONTROL HORARIO
    ===========================================*/
    
    public function eliminarControlHorario($numIdentificacion,$aDEntrada,$aDSalida,$hEntrada,$hSalida,$observaciones){
        
        //FUNCION CON LA CONSULTA A REALIZAR
        $sql = "DELETE FROM `control_horario` WHERE COD_BARRA='".$numIdentificacion."' AND FECHA_CONT_HOR_INGRESO='".$aDEntrada."' AND FECHA_CONT_HOR_SALIDA='".$aDSalida."' AND OBSERVACIONES='".$observaciones."'";
        $this->_conexion->ejecutar_sentencia($sql);
        return $this->_conexion->insert_registro();
        
    }
    
    
    
    
    
    
}

?>