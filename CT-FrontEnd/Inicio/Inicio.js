/*==========================================================

ACCIONES A REALIZAR AL CARGAR LA PAGINA

1) Verificar que el usuario haya iniciado sesion.
    -Se evaluan que los parametros usuario y password sean validos
    
2) Si la sesion es valida ajustar los menues lateral y superior segun 
el tamaño de la pantalla.

==========================================================*/

var original=window.innerWidth;

$(document).ready(function() {
    if ((sessionStorage.usuario != undefined) && (sessionStorage.password != undefined)) {
        ventanaPrincipal();
      
    }else{
        window.location="index.php";   
    }
    
});


$(window).resize(function(){

    if (window.innerWidth>991){
        // ## agregar clase
        $('#barraIzq').addClass('show'); 
    }else{
        // ## eliminar clase
        $('#barraIzq').removeClass('show');
    }

});

/*==========================================================

FUNCION DESHABILITAR RETROCESO
>>deshabilitaRetroceso()

Funcion que deshabilitar el boton retroceder del navegador.

==========================================================*/

function deshabilitaRetroceso(){
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
}

/*==========================================================

FUNCION LIMPIAR SESION
>>limpiarSesion()

Funcion que permite borrar los datos de la sesion almacenada en el sessionStorage

==========================================================*/

function limpiarSesion(){
    sessionStorage.clear();
    window.location="index.php";
    mostrarMensajeOpcion("Se ha borrado la sesion");
}


/*==========================================================

FUNCION PARA VERIFICAR EL ACCESO DEL USUARIO

==========================================================*/
var USUACODIGO="";
var AREACODIGO="";
verificarAcceso();
function verificarAcceso(){
    var $usuario={
        '_usuario' : sessionStorage.usuario,
     }
    $.ajax({
        url:'../CT-BackEnd/Controlador/ModMaestros/Controlador_Usuario/Controlador_AccesosDelPersonal.php',
        type: 'POST',
        data: $usuario,
        datatype: 'json',
        error: function(error){   
        },
        success: function(datos){
            if(datos.response=="0"){
                if(sessionStorage.usuario=="ASISTENCIA"){
                  $("#cuerpo").addClass("d-none")
                  $("#cuerpo2").removeClass("d-none");
                  var toastcuerpo="";
                  toastcuerpo+="<div class='toast' data-autohide='true' data-delay='9000'></div>";
                  $("#toastasistencia").html(toastcuerpo);
                  $("#scanner").focus();
                }
            }else{
              USUACODIGO=datos.USUACODIGO;
              AREACODIGO =datos.AREACODIGO
                if(datos.ACCCLIENTE == 0){
                    $("#ACCCLIENTE").addClass("d-none");
                }
                if(datos.ACCSERVICIO==0){
                    $("#ACCSERVICIO").addClass("d-none");
                }
                if(datos.ACCEMPRESA == 0){
                    $("#ACCEMPRESA").addClass("d-none");
                }
                if(datos.ACCMAQUINA == 0){
                    $("#ACCMAQUINA").addClass("d-none");
                }
                if(datos.ACCBANCO == 0){
                    $("#ACCBANCO").addClass("d-none");
                }
                if(datos.ACCPROVEEDOR == 0){
                    $("#ACCPROVEEDOR").addClass("d-none");
                }
                if(datos.ACCPERSONAL == "0000"){
                    $("#ACCPERSONAL").addClass("d-none");
                }else{
                    if(datos.ACCPERSONAL.substr(0,1)=="0"){
                    $("#menuPersonal-Generales").addClass("d-none");
                    }
                    if(datos.ACCPERSONAL.substr(1,1)=="0"){
                        $("#menuPersonal-Contrato").addClass("d-none");
                    } 
                    if(datos.ACCPERSONAL.substr(2,1)=="0"){
                        $("#menuPersonal-Vacaciones").addClass("d-none");         
                    }
                    if(datos.ACCPERSONAL.substr(3,1)=="0"){
                        $("#menuPersonal-Control").addClass("d-none");
                    }
                }  
                
                if(datos.ACCUSUARIO == 0){
                    $("#ACCUSUARIO").addClass("d-none");
                }
                if(datos.ACCNUEVO_PRESUPUESTO == 0){
                    $("#ACCNUEVO_PRESUPUESTO").addClass("d-none");
                    $("#P-NuevoPresupuesto").addClass("d-none");
                }
                if(datos.ACCACTUALIZAR_PRESUPUESTO == 0){
                    $("#ACCACTUALIZAR_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCCAMBIAR_ESTADO_PRESUPUESTO == 0){
                    $("#ACCCAMBIAR_ESTADO_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCBUSCAR_PRESUPUESTO == 0){
                    $("#ACCBUSCAR_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCLISTAR_PRESUPUESTO == 0){
                    $("#ACCLISTAR_PRESUPUESTO").addClass("d-none");
                }
                if(datos.ACCF1810 == 0){
                    $("#ACCF1810").addClass("d-none");
                }
                if(datos.ACCCREAR_ORDEN == 0){
                    $("#ACCCREAR_ORDEN").addClass("d-none");
                    $("#P-NuevaOrden").addClass("d-none");
                }
                if(datos.ACCACTUALIZAR_ORDEN == 0){
                    $("#ACCACTUALIZAR_ORDEN").addClass("d-none");
                }
                if(datos.ACCCAMBIAR_ESTADO_ORDEN == 0){
                    $("#ACCCAMBIAR_ESTADO_ORDEN").addClass("d-none");
                    $("#P-CambiarEstadoOrden").addClass("d-none");
                }
                if(datos.ACCBUSCAR_ORDEN == 0){
                    $("#ACCBUSCAR_ORDEN").addClass("d-none");
                }
                if(datos.ACCREEMPLAZAR_ORDEN == 0){
                    $("#ACCREEMPLAZAR_ORDEN").addClass("d-none");
                }
                if(datos.ACCSEGUIMIENTO_ORDEN == 0){
                    $("#ACCSEGUIMIENTO_ORDEN").addClass("d-none");
                }
                if(datos.ACCLISTAR_ORDENES == 0){
                    $("#ACCLISTAR_ORDENES").addClass("d-none");
                }
                if(datos.ACCSEGUIMIENTO_PRODUCCION == 0){
                    $("#ACCSEGUIMIENTO_PRODUCCION").addClass("d-none");
                }
                if(datos.ACCPROGRAMAR_MAQUINAS == 0){
                    $("#ACCPROGRAMAR_MAQUINAS").addClass("d-none");
                }
                if(datos.ACCCONTROL_DESPACHOS == 0){
                    $("#ACCCONTROL_DESPACHOS").addClass("d-none");
                }
                if(datos.ACCCONTROL_INSUMOS == 0){
                    $("#ACCCONTROL_INSUMOS").addClass("d-none");
                }
                if(datos.ACCCOSTOS_MAQUINA == 0){
                    $("#ACCCOSTOS_MAQUINA").addClass("d-none");
                }
                if(datos.ACCCOSTOS_ACABADOS == 0){
                    $("#ACCCOSTOS_ACABADOS").addClass("d-none");
                }
                if(datos.ACCCOSTOS_TINTA == 0){
                    $("#ACCCOSTOS_TINTA").addClass("d-none");
                }
                if(datos.ACCLISTADO_COSTOS == 0){
                    $("#ACCLISTADO_COSTOS").addClass("d-none");
                }
                if(datos.ACCCOSTOS_TRABAJO == 0){
                    $("#ACCCOSTOS_TRABAJO").addClass("d-none");
                }
                if(datos.ACCFACTURACION == 0){
                    $("#ACCFACTURACION").addClass("d-none");
                }
                if(datos.ACCARQUEO == 0){
                    $("#ACCARQUEO").addClass("d-none");
                }
                if(datos.ACCNOTA == 0){
                    $("#ACCNOTA").addClass("d-none");
                }
                if(datos.ACCLETRA == 0){
                    $("#ACCLETRA").addClass("d-none");
                }
                if(datos.ACCGUIA == 0){
                    $("#ACCGUIA").addClass("d-none");
                }
                if(datos.ACCRECIBO == 0){
                    $("#ACCRECIBO").addClass("d-none");
                }
                if(datos.ACCFINANZAS == 0){
                    $("#ACCFINANZAS").addClass("d-none");
                }
                if(datos.ACCCLIENTE == 0&& datos.ACCSERVICIO==0 && datos.ACCEMPRESA == 0 && datos.ACCMAQUINA == 0 && datos.ACCBANCO == 0 && datos.ACCPROVEEDOR == 0 && datos.ACCPERSONAL == 0 && datos.ACCUSUARIO == 0  ){
                    $("#MAESTROS").addClass("d-none");
                }
                if( datos.ACCNUEVO_PRESUPUESTO == 0 && datos.ACCACTUALIZAR_PRESUPUESTO == 0 && datos.ACCCAMBIAR_ESTADO_PRESUPUESTO == 0 && datos.ACCBUSCAR_PRESUPUESTO == 0 && datos.ACCF1810 == 0){
                  $("#PRESUPUESTO").addClass("d-none"); 
                }
                if(datos.ACCCREAR_ORDEN == 0 && datos.ACCACTUALIZAR_ORDEN == 0 && datos.ACCCAMBIAR_ESTADO_ORDEN == 0 && datos.ACCREEMPLAZAR_ORDEN == 0 && datos.ACCSEGUIMIENTO_ORDEN == 0 && datos.ACCLISTAR_ORDENES == 0){
                  $("#ORDENES").addClass("d-none"); 
                }
                if(datos.ACCSEGUIMIENTO_PRODUCCION == 0 && datos.ACCPROGRAMAR_MAQUINAS == 0 && datos.ACCCONTROL_DESPACHOS == 0){
                  $("#PRODUCCION").addClass("d-none"); 
                }
                if(datos.ACCCONTROL_INSUMOS == 0 && datos.ACCCOSTOS_MAQUINA == 0 && datos.ACCCOSTOS_ACABADOS == 0 && datos.ACCCOSTOS_TINTA == 0 && datos.ACCLISTADO_COSTOS == 0){
                  $("#COSTOS").addClass("d-none"); 
                }
                if(datos.ACCFACTURACION == 0 && datos.ACCARQUEO == 0 && datos.ACCNOTA == 0 && datos.ACCLETRA == 0 && datos.ACCGUIA == 0 && datos.ACCRECIBO == 0 && datos.ACCFINANZAS == 0){
                  $("#CONTABILIDAD").addClass("d-none"); 
                }
              
                if(datos.USUAUSUARIO=="ASISTENCIA"){
                  $("#cuerpo").addClass("d-none")
                  $("#cuerpo2").removeClass("d-none");
                  $("#scanner").focus();
                }
            } 
        }
    });
}


/*==========================================================

FUNCION PARA MOSTRAR MENSAJE

==========================================================*/

function mostrarMensajeOpcion(tipo,msj){
  switch(tipo){
    case 'exito':
      $(".toast").html("<i class='fas fa-check fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#00c851");
      $('.toast').toast('show');
      $('.toast').addClass('visualizar');    
      break;
    case 'error':
      $(".toast").html("<i class='fas fa-times fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#ff3547");
      $('.toast').toast('show');
      $('.toast').addClass('visualizar'); 
      break;
    case 'advertencia':
      $(".toast").html("<i class='fas fa-exclamation fa-lg pr-2'></i>"+msj); 
      $(".toast").css("background-color","#fb3");
      $('.toast').toast('show');
      $('.toast').addClass('visualizar');
      break;
    case 'informativo':
      $(".toast").html("<div class='toast-header'>\
                         <svg class='' rounded mr-2' width='20' height='20' xmlns=http://www.w3.org/2000/svg'preserveAspectRatio='xMidYMid slice' focusable='false' role='img'>\
                         <rect fill='#007aff' width='100%' height='100%' /></svg>\
                         <strong class=' ml-1 mr-auto'>Pasos para renovar un contrato</strong>\
                         <button type='button' class='ml-2 mb-1 close' data-dismiss='toast' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='toast-body'>\
                          <li>1. Cambiar la empresa asignada al personal(Solo en caso de renovación de contrato por expiración del mismo).</li>\
                          <li>2. Aceptar el mensaje de confirmación y dirigirse a la sección Condición Laboral e ingresar los nuevos datos del personal.</li>\
                          <li>3. Verificar los datos, cerrar este mensaje, y hacer click en el boton 'Actualizar'</li>\
                        </div>");
       $('.toast').css("background-color","#007bff");
       $('.toast').toast('show');
       $('.toast').addClass('visualizar');
          break;
          
  }
}

$("#scanner").on('keydown', function(e) {
      if (e.which == 13) {
          verificarControlAsistencia($("#scanner").val())
          return false;
      }
  });

function verificarControlAsistencia(codigo){
    var Hoy = new Date();
  
    var fechaRegistrar="";
    
   if(Hoy.getDate().toString().length==1){
     
     if((Hoy.getMonth()+1).toString().length==1){
       
        fechaRegistrar=Hoy.getFullYear() + "-0" + (Hoy.getMonth() +1) + "-0" + Hoy.getDate();
     }else{
       
        fechaRegistrar=Hoy.getFullYear() + "-" + (Hoy.getMonth() +1) + "-0" + Hoy.getDate();
     }
   }else{
     
     if((Hoy.getMonth()+1).toString().length==1){
       
        fechaRegistrar=Hoy.getFullYear() + "-0" + (Hoy.getMonth() +1) + "-" + Hoy.getDate();
     }else{
       
       fechaRegistrar=Hoy.getFullYear() + "-" + (Hoy.getMonth() +1) + "-" + Hoy.getDate();
     }
   }

  
    var hSalida=Hoy.getHours() + ":" + Hoy.getMinutes() + ":" +Hoy.getSeconds(); 
    
    var $valores={
        '_codigo':codigo,
        '_fecha': fechaRegistrar
    }
    
    /* REGISTRAR ENTRADA*/
    var $datos={
        '_numIdentificacion':codigo,
        '_aDEntrada':fechaRegistrar,
        '_aDSalida':fechaRegistrar,
        '_hEntrada':hSalida,
        '_hSalida':"",
        '_observaciones':""
    }
    
    /* REGISTRAR SALIDA */
    var $actualizar={
        '_numIdentificacion':codigo,
        '_aDEntrada':fechaRegistrar,
        '_aDSalida':fechaRegistrar,
        '_hSalida':hSalida
    }
    
    /* REGISTRAR SALIDA TURNO NOCHE*/
    var $diaSgte={
        '_numIdentificacion':codigo,
        '_aDEntrada':Hoy.getFullYear() + "-" + (Hoy.getMonth() +1) + "-" + (Hoy.getDate()-1),
        '_aDSalida':fechaRegistrar,
        '_hSalida':hSalida
    }
    
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_VerificarControlHorario.php",
        type: 'POST',
        data: $valores, 
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensajeOpcion("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensajeOpcion("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                registrarControlHorario($datos,"verificar",codigo);
            }else{
                if(datos.FECHA_CONT_HOR_INGRESO == fechaRegistrar){
                    if(datos.FECHA_CONT_HOR_SALIDA==null  || datos.HORA_SALIDA == "00:00:00"){
                        var diferencial=0;
                        var hora1 = moment(datos.HORA_INGRESO,' HH:mm:ss');
                        var hora2 = moment(hSalida,' HH:mm:ss');
                        diferencial= hora2.diff(hora1,'s');
                        if(diferencial>300){
                          actualizarControlHorario($actualizar,codigo,"actualizar")
                        }else{
                          mostrarMensajeOpcion("exito","Registro de Entrada ya realizado");
                          cargarDatosDeIngreso("REGISTRO YA REALIZADO , ESPERAR " + ((300 - diferencial)/60).toFixed(2) + " MINUTOS ",codigo);
                        }
                        
                    }else{
                        mostrarMensajeOpcion("exito","Registro del dia ya realizado");
                        cargarDatosDeIngreso("",codigo);
                        
                    }  
                }else if(new Date(calculoFechaFinalxDias1(datos.FECHA_CONT_HOR_INGRESO,1).replace(/-/g, '\/').replace(/T.+/, '')).getTime() == new Date(fechaRegistrar).getTime() || ( datos.HORA_SALIDA == "00:00:00")){
                    actualizarControlHorario($diaSgte,codigo,"diaSgte")
                }else{
                    var diferencial2=0;
                    var hora12 = moment(datos.HORA_SALIDA,' HH:mm:ss');
                    var hora22 = moment(hSalida,' HH:mm:ss');
                    diferencial2= hora22.diff(hora12,'s');
                    if(diferencial2>300){
                          registrarControlHorario($datos,"verificar",codigo)
                        }else{
                          mostrarMensajeOpcion("exito","Registro de Salida ya realizado");
                          cargarDatosDeIngreso("SALIDA YA REALIZADO, ESPERAR " + ((300 - diferencial2)/60).toFixed(2) + " MINUTOS",codigo);
                        }
                }
            }
            $("#scanner").val("");
            $("#scanner").focus();
        }
    }); 
} 

//OR  ||
//--GENERAR FECHA FINAL DEL CONTRATO DEPENDIENDO DE LA CANTIDAD DE DIAS--
function calculoFechaFinalxDias1(diaInicial,diasAgregados){
    
    var fechainicial= moment(diaInicial,"YYYY-MM-DD").add('days',diasAgregados);
    var day = fechainicial.format('DD');
    var month = fechainicial.format('MM');
    var year = fechainicial.format('YYYY');                    
    var dias= year + '-' + month + '-' + day
    return dias
}
//--REGISTRAR CONTROL DE HORARIO(ENTRADA)
function registrarControlHorario($datos,tipo,codigobarra){
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarPersonalAControlHorario.php',
        type: 'POST',
        data: $datos,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensajeOpcion("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensajeOpcion("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensajeOpcion("error",'ERROR: '+datos.message);
            }else{
               $("#scanner").val("")               
                mostrarMensajeOpcion("exito","ENTRADA REGISTRADA");
                cargarDatosDeIngreso("ENTRADA DE",codigobarra)
            }
        }
    });
}

//--ACTUALIZAR COTNROL DE HORARIO/(SALIDA)
function actualizarControlHorario($actualizar,codigobarra){
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ActualizarControlHorario.php',
        type: 'POST',
        data: $actualizar,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensajeOpcion("error","ERROR AL GUARDAR LOS DATOS! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensajeOpcion("error","ERROR AL GUARDAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensajeOpcion("error",'ERROR: '+datos.message);
            }else{ 
                $("#scanner").val("");
                mostrarMensajeOpcion("exito","SALIDA REGISTRADA");
                cargarDatosDeIngreso("SALIDA DE",codigobarra)
            } 
        }
    });
    
}

function cargarDatosDeIngreso(tipo,personal){
    
   var $personal={
        '_numIdentificacion' : personal
   }
    
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ValidarPersonal.php',
        type: 'POST',
        data: $personal,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensajeOpcion("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensajeOpcion("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="1"){
                $("#respuestadelPersonal").html("NO EXISTE EL PERSONAL")
            }else{
               $("#respuestadelPersonal").html(tipo + " " + datos.PERSNOMBRE + " " + datos.PERSAPELLIDO_PATERNO + " " + datos.PERSAPELLIDO_MATERNO);
            }
        }
    }); 
 }
/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PRINCIPAL

==========================================================*/

function ventanaPrincipal(){
    
    $.ajax({  
        url: 'Modulos/ModPrincipal/VistaPrincipal.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CLIENTES

==========================================================*/

function ventanaClientes(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/VistaClientes.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA SERVICIOS

==========================================================*/

function ventanaServicios(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaServicios/VistaServicios.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA EMPRESAS

==========================================================*/

function ventanaEmpresas(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaEmpresas/VistaEmpresas.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA MAQUINAS

==========================================================*/

function ventanaMaquinas(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaMaquinas/VistaMaquinas.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA BANCOS

==========================================================*/

function ventanaBancos(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaBancos/VistaBancos.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PERSONAL

==========================================================*/

function ventanaProveedor(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/VistaProveedores.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PERSONAL

==========================================================*/

function ventanaPersonal(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/VistaPersonal.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
    verificarAcceso();
}

function clock() {// We create a new Date object and assign it to a variable called "time".
    var time = new Date(),

        // Access the "getHours" method on the Date object with the dot accessor.
        hours = time.getHours(),

        // Access the "getMinutes" method with the dot accessor.
        minutes = time.getMinutes(),


        seconds = time.getSeconds();

    document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

    function harold(standIn) {
        if (standIn < 10) {
          standIn = '0' + standIn
        }
        return standIn;
    }
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PERSONAL

==========================================================*/

function ventanaUsuario(){
     
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaUsuarios/VistaUsuario.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    });
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA NUEVO PRESUPUESTO

==========================================================*/

function ventanaNuevoPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/F1810.html',  
        success: function(data) {
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
          $("#cabezal").addClass("d-none");
          $("#TituloNuevoPresupuesto").removeClass("d-none");
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA ACTUALIZAR PRESUPUESTO

==========================================================*/

function ventanaActualizarPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/ActualizarPresupuesto.html',  
        success: function(data) {
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    });  
}


/*==========================================================

FUNCION PARA LLAMAR A LA VISTA FORMULA PRESUPUESTO

========================================================== */

function ventanaF1810(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/F1810.html',  
        success: function(data) {
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
            $("#cabezal").removeClass("d-none");
            $("#TituloNuevoPresupuesto").addClass("d-none");
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA BUSCAR PRESUPUESTO

==========================================================*/

function ventanaBuscarPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/BuscarPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CAMBIAR ESTADO PRESUPUESTO

==========================================================*/

function ventanaCambiarEstadoPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/CambiarEstadoPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA LISTAR PRESUPUESTOS

==========================================================*/

function ventanaListarPresupuesto(){
    
    $.ajax({  
        url: 'Modulos/ModPresupuesto/ListarPresupuesto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA NUEVA ORDEN

==========================================================*/

function buscarNuevaOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/VistaPrincipalNuevaOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA NUEVA ORDEN

==========================================================*/

function ventanaActualizarOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/ActualizarOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CAMBIAR ESTADO ORDEN

==========================================================*/

function ventanaCambiarEstadoOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/CambiarEstadoOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA BUSCAR ORDEN

==========================================================*/

function ventanaBuscarOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/BuscarOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA REEMPLAZAR ORDEN

==========================================================*/

function ventanaReemplazarOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/ReemplazarOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA SEGUIMIENTO ORDEN

==========================================================*/

function ventanaSeguimientoOrden(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/SeguimientoOrden.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA LISTAR ORDENENES

==========================================================*/

function ventanaListarOrdenes(){
    
    $.ajax({  
        url: 'Modulos/ModOrden/ListarOrdenes.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA SEGUIMIENTO PRODUCCION

==========================================================*/

function ventanaSeguimientoProduccion(){
    
    $.ajax({  
        url: 'Modulos/ModProduccion/SeguimientoProduccion.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA PROGRAMAR MAQUINAS

==========================================================*/

function ventanaProgramarMaquinas(){
    
    $.ajax({  
        url: 'Modulos/ModProduccion/ProgramarMaquinas.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CONTROL DESPACHO

==========================================================*/

function ventanaControlDespachos(){
    
    $.ajax({  
        url: 'Modulos/ModProduccion/ControlDespacho.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA CONTROL INSUMOS

==========================================================*/

function ventanaControlInsumos(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/ControlInsumos.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA COSTOS MAQUINA

==========================================================*/

function ventanaCostosMaquina(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/CostosMaquina.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA COSTOS ACABADOS

==========================================================*/

function ventanaCostosAcabados(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/CostosAcabados.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA COSTOS TINTA

==========================================================*/

function ventanaCostosTinta(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/CostosTinta.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA LISTADO COSTOS

==========================================================*/

function ventanaListadoCostos(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/ListadoCostos.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA LISTADO COSTOS

==========================================================*/

function ventanaCostosTrabajo(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/CostosTrabajo.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}

/*==========================================================

FUNCION PARA LLAMAR A LA VISTA LISTADO COSTOS

==========================================================*/

function ventanaAlmacen(){
    
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/VentanaAlmacen.html',  
        success: function(data) {  
            $('#cuerpo').html(data);  
            clearInterval(intervalo)
        }  
    }); 
}


