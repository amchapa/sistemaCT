/*=============================================
    FUNCIONES DE CAMBIO DE VISTA
=============================================*/

//--REDIRIGIR A VISTA NUEVO PERSONAL--
function NuevoPersonal(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/NuevoPersonal.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

//--REDIRIGIR A VISTA LISTAR PERSONAL--
function ListarPersonal(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/ListadoPersonal.html',   
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo) 
        }  
    }); 
    
}

//--REDIRIGIR A VISTA SEGUN LA OPCION SELECCIONADA--
function VistasEspecificas(pers,op){
    var url="";
    
    switch (op){
        case "actualizarPersonal": 
            url= "Modulos/ModMaestros/VistaPersonal/ActualizarPersonal.html";
        break;
            
        case "personalBaja":
            url= "Modulos/ModMaestros/VistaPersonal/ActualizarPersonalBaja.html";
        break;
        
        case "condicionLaboral":
            url= "Modulos/ModMaestros/VistaPersonal/CondicionLaboral.html";
        break;
            
        case "renovarContrato":
            url= "Modulos/ModMaestros/VistaPersonal/RenovarContrato.html";
        break;
      
        case "historialLaboral":
            url= "Modulos/ModMaestros/VistaPersonal/HistorialLaboral.html";
        break;
        
        case "programarVacaciones":
            url= "Modulos/ModMaestros/VistaPersonal/ProgramarVacaciones.html";
        break;
        
        case "registrarSobretiempos":
            url= "";
        break;
        
        case "asistenciaDiaria":
            url= "";
        break;
        
        case "asignarPermisos":
            url= "Modulos/ModMaestros/VistaUsuarios/AsignarPermisos.html";
        break;
        
    }
  
    $.ajax({  
        url: url,   
        success: function(data) {  
            $('#cuerpo').html(data); 
            var personal=pers;
            clearInterval(intervalo)
        }  
    }); 
    
}

//--REDIRIGIR A VISTA CONSOLIDADO CONTRATOS--
function ConsolidadoContratos(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/ConsolidadoContratos.html',   
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo) 
        }  
    }); 
    
}

//--REDIRIGIR A VISTA CONTROL DE HORARIO--
 function AsignarVacaciones(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/AsignarVacaciones.html',   
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo) 
        }  
    }); 
    
}

//--REDIRIGIR A VISTA VACACIONES EXIGIBLES--
function VacacionesExigibles(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/VacacionesExigibles.html',   
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo) 
        }  
    }); 
    
}

//--REDIRIGIR A VISTA CONTROL DE HORARIO--
function ControlHorario(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/ControlHorario.html',   
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo) 
        }  
    }); 
    
}

function ListarControlHorario(selectListar,opcionListar){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaPersonal/ListadoControlHorario.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            
            var select = selectListar;
            
            var opcion = opcionListar;
            
            clearInterval(intervalo);
        }  
    }); 
}

function mostrarMensaje(tipo,msj){
  switch(tipo){
    case 'exito':
      toastr.success(msj)
      break;
    case 'error':
      toastr.error(msj)
      break;
    case 'advertencia':
      toastr.warning(msj)
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

/*=============================================
    FUNCIONES GENERALES
=============================================*/

var vistaPersonal = function (){}

//--SELECT CAMBIABLE DEPENDE DEL TIPO DE HORARIO--
vistaPersonal.prototype.cambioSelect = function(){
    var select = document.getElementById("tHorario");
    if(select.value=="Fijo"){
        var selectPre="<option value='Mañana'>Mañana</option><option value='Tarde'>Tarde</option><option value='Noche'>Noche</option>"
    }else{
        selectPre="<option value='G1'>Grupo 1</option><option value='G2'>Grupo 2</option> <option value='G3'>Grupo 3</option"
    }
    $("#turno").html(selectPre);
}

//--CARGAR DATOS E LOS GRUPOS EXISTENTES--
vistaPersonal.prototype.cargarGrupos = function(dato){
    var boxGrupos="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarTodosGrupos.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxGrupos+="<option value='' selected>Elegir Grupo</option>";
            $("#grupo").html(boxGrupos);
            $("#turno").html(boxGrupos);
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxGrupos+="<option value='' selected>Elegir Grupo</option>";
                $("#grupo").html(boxGrupos);
                $("#turno").html(boxGrupos);
            }else{
                for(var i=0; i<datos.length;i++){
                    boxGrupos+="<option value='"+datos[i].GRUPCODIGO+"'>"+datos[i].GRUPDESCRIPCION+"</option>";
                }
                $("#grupo").html(boxGrupos);
                $("#turno").html(boxGrupos);
                $("#turno option[value="+ dato +"]").attr("selected",true); 
            }
        }
    });
}

//--VALIDAR DATOS DEL FORMULARIO--  
vistaPersonal.prototype.validarFormulario = function(op){
  
    var R1 = $("#nombre").val();
    var R2 = $("#aPaterno").val();
    var R3 = $("#aMaterno").val();
    var R4 = $("#tipiden").val();
    var R5 = $("#numIdentificacion").val();
    var R6 = $("#sexo").val();
    var R7 = $("#fIngreso").val();
    var R8 = $("#fNacimiento").val();
    var R9 = $("#empresa").val();
    var R10 = $("#area").val();
    var R11 = $("#estado").val();
    var R12 = $("#tHorario").val();
    var R13 = $("#turno").val();
    var R14 = $("#distrito").val();
    var R15 = $("#correo1").val();
    var R16 = $("#telefono1").val();
    var R17 = $("#correo2").val();
    
    if(R1 == null || R1.length == 0 || /^\s+$/.test(R1)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#nombre").focus();
    }
    else if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#aPaterno").focus();
    }
    else if(R3 == null || R3.length == 0 || /^\s+$/.test(R3)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#aMaterno").focus();
    }
    else if(R4 == null || R4.length == 0 || /^\s+$/.test(R4)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#tipiden").focus();
    }
    else if(R5 == null || R5.length == 0 || /^\s+$/.test(R5)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#numIdentificacion").focus();
    }
    else if(R6 == null || R6.length == 0 || /^\s+$/.test(R6)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#sexo").focus();
    }
    else if(R7 == null || R7.length == 0 || /^\s+$/.test(R7)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#fIngreso").focus();
    }
    else if(R8 == null || R8.length == 0 || /^\s+$/.test(R8)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#fNacimiento").focus();
    }
    else if(R9 == null || R9.length == 0 || /^\s+$/.test(R9)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#empresa").focus();
    }
    else if(R10 == null || R10.length == 0 || /^\s+$/.test(R10)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#area").focus();
    }
    else if(R11 == null || R11.length == 0 || /^\s+$/.test(R11)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#estado").focus();
    }
    else if(R12 == null || R12.length == 0 || /^\s+$/.test(R12)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#tHorario").focus();
    }
    else if(R13 == null || R13.length == 0 || /^\s+$/.test(R13)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#turno").focus();
    }
    else if(R14 == null || R14.length == 0 || /^\s+$/.test(R14)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#distrito").focus();
    }
    else if(R16 == null || R16.length == 0 || /^\s+$/.test(R16)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#telefono1").focus();
    }
    else if(R15 == null || R15.length == 0 || /^\s+$/.test(R15)){
        if(R17 == null || R17.length == 0 || /^\s+$/.test(R17)){
            mostrarMensaje("exito","EXITO: Validación de datos correcta...");
            switch(op){
              case "REGISTRAR":vPersonal.verificarExistencia();break;
              case "ACTUALIZAR":vPersonal.actualizarPersonal();break;
            }
        }else{
            if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(R17)){
                mostrarMensaje("exito","EXITO: Validación de datos correcta...");
                switch(op){
                  case "REGISTRAR":vPersonal.verificarExistencia();break;
                  case "ACTUALIZAR":vPersonal.actualizarPersonal();break;
                }
            }
            else{
                mostrarMensaje("error","ERROR: Ingresar una direccion electrónica valida.");
                $("#correo2").focus();
            }
        }
    }else{
        if(R17 == null || R17.length == 0 || /^\s+$/.test(R17)){
            if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(R15)){
                mostrarMensaje("exito","EXITO: Validación de datos correcta...");
                switch(op){
                  case "REGISTRAR":vPersonal.verificarExistencia();break;
                  case "ACTUALIZAR":vPersonal.actualizarPersonal();break;
                }
            }else{
                mostrarMensaje("error","ERROR: Ingresar una direccion electrónica valida.");
                $("#correo1").focus();
            }
        }else{
             if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(R15) && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(R17)){
                mostrarMensaje("exito","EXITO: Validación de datos correcta...");
                switch(op){
                  case "REGISTRAR":vPersonal.verificarExistencia();break;
                    case "ACTUALIZAR":vPersonal.actualizarPersonal();break;
                }
            }else{
                mostrarMensaje("error","ERROR: Ingresar una direccion electrónica valida.");
                $("#correo2").focus();
            }
        }        
    }
} 

//--VERIFICAR EXISTENCIA DEL PERSONAL--
vistaPersonal.prototype.verificarExistencia = function(){
    var $validar={
        '_numIdentificacion': $("#numIdentificacion").val()
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ValidarPersonal.php',
        type: 'POST',
        data: $validar,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 1){
                vPersonal.RegistrarPersonal();
            }
            else{
                if(datos.response == 0){
                  mostrarMensaje("error","REGISTRO INCORRECTO! ERROR: "+datos.message);
                }
                else{
                  mostrarMensaje("error","REGISTRO INCORRECTO! El personal ya existe. Por favor verificar el numero de identificación.");
                }
            }
        }
    });
} 

//--REGISTRAR PERSONAL--
vistaPersonal.prototype.RegistrarPersonal = function(){
    var grabar=false;
    var rutaFoto;
    
    if(document.getElementById('foto').files.length == 0){
      if($("#sexo").val() == "Femenino"){
        rutaFoto="../../../../CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/CT-DefaultMujer.jpg"
      }else{
        rutaFoto="../../../../CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/CT-DefaultHombre.jpg"
      }
    }else{
      rutaFoto="../../../../CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/"+document.getElementById('foto').files[0].name
    }
    var hoy = new Date();
    hoy=  hoy.getFullYear()+"-" + (hoy.getMonth() +1) + "-"+ hoy.getDate() ;
    var $personal={
        
        '_fechaRegistro': hoy,
        '_nombre': $("#nombre").val(),
        '_aPaterno': $("#aPaterno").val(),
        '_aMaterno': $("#aMaterno").val(),
        '_tipiden': $("#tipiden").val(),
        '_numIdentificacion': $("#numIdentificacion").val(),
        '_sexo': $("#sexo").val(),
        '_fIngreso': $("#fIngreso").val(),
        '_fNacimiento': $("#fNacimiento").val(),
        '_telefono1': $("#telefono1").val(),
        '_telefono2': $("#telefono2").val(),
        '_correo1': $("#correo1").val(),
        '_correo2': $("#correo2").val(),
        '_empresa': $("#empresa").val(),
        '_area': $("#area").val(),
        '_especialidad': $("#especialidad").val(),
        '_estado': $("#estado").val(),
        '_tHorario': $("#tHorario").val(),
        '_turno': $("#turno").val(),
        '_distrito': $("#distrito").val(),
        '_domicilio': $("#domicilio").val(),
        '_tipoContrato': "ReciboxHonorarios",
        '_rutaFoto': rutaFoto
    }
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarUsuario.php',
        type: 'POST',
        data: $personal,
        async: false,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error","REGISTRO DE USUARIO INCORRECTO! ERROR: "+datos.message);
            }
            else{
                grabar=true;
            }
        }
    });
    if(grabar){
       $.ajax({
            url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarPersonal.php',
            type: 'POST',
            data: $personal,
            dataType: 'json',
            error: function(error){
                if(error.status == 401){
                    mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
                }
                else{
                    mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
                }
            },
            success: function(datos){
                if(datos.response == 0){
                    mostrarMensaje("error","REGISTRO DE PERSONAL INCORRECTO! ERROR: "+datos.message);
                }
                else{
                    mostrarMensaje("exito","REGISTRO EXITOSO!");
                    vPersonal.guardarImagen();
                }
            }
        });
    }
    $('#mensajeAsignacion').modal('show');
    document.getElementById("guardar").disabled=true;
}

//--REGISTRAR ACCESO--
vistaPersonal.prototype.RegistrarAcceso = function(){
    
    var dimNombre, dimApellido,dimIdentificacion, codigoUsuario;
    var arrayAcceso = new Array();
    dimNombre=$("#nombre").val().substr(0,1);
    dimNombre=dimNombre.toUpperCase();
    
    dimApellido=$("#aPaterno").val().substr(0,1);
    dimApellido=dimApellido.toUpperCase();
    
    dimIdentificacion=$("#numIdentificacion").val().substr(0,2);
    
    codigoUsuario=dimNombre.concat(dimApellido).concat(dimIdentificacion);
    
    arrayAcceso=[0,0,0,0,0,0,String("0000"),0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    
    var $acceso = {
        '_codigoUsuario':codigoUsuario,
        '_accesos':arrayAcceso
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Usuario/Controlador_RegistrarAcceso.php',
        type: 'POST',
        data: $acceso,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error","REGISTRO DE PERSONAL INCORRECTO! ERROR: "+datos.message);
            }
            else{
                mostrarMensaje("exito","REGISTRO EXITOSO - Acceso!");
            }
        }
    })
    
} 

//--ACTUALIZAR PERSONAL--
vistaPersonal.prototype.actualizarPersonal = function(){
    var rutaFoto,nombreFoto;
  
    if(document.getElementById('foto').files.length == 0){
      if(document.getElementById('previewFoto').src==""){
        rutaFoto="";
      }else{
        nombreFoto=document.getElementById('previewFoto').src.split("/img/");
        rutaFoto="../../../../CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/"+nombreFoto[1];
      }
    }else{
      rutaFoto="../../../../CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/"+document.getElementById('foto').files[0].name
    }
    datos = $("#datos").html().split("*");
    var $personal={
        '_codigo': $("#codigo").text(),
        '_nombre': $("#nombre").val(),
        '_aPaterno': $("#aPaterno").val(),
        '_aMaterno': $("#aMaterno").val(),
        '_tipiden': $("#tipiden").val(),
        '_numIdentificacion': $("#numIdentificacion").val(),
        '_sexo': $("#sexo").val(),
        '_fIngreso': $("#fIngreso").val(),
        '_fNacimiento': $("#fNacimiento").val(),
        '_telefono1': $("#telefono1").val(),
        '_telefono2': $("#telefono2").val(),
        '_correo1': $("#correo1").val(),
        '_correo2': $("#correo2").val(),
        '_empresa': $("#empresa").val(),
        '_area': $("#area").val(),
        '_especialidad': $("#especialidad").val(),
        '_estado': $("#estado").val(),
        '_tHorario': $("#tHorario").val(),
        '_turno': $("#turno").val(),
        '_distrito': $("#distrito").val(),
        '_domicilio': $("#domicilio").val(),
        '_rutaFoto': rutaFoto,
        '_condLaboral': datos[1]
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ActualizarPersonal.php',
        type: 'POST',
        data: $personal,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ACTUALIZACION DE PERSONAL INCORRECTA! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","ACTUALIZACION DE PERSONAL INCORRECTA! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error","ACTUALIZACION DE PERSONAL INCORRECTA! ERROR: "+datos.message);
            }
            else{
                vPersonal.guardarImagen();
                mostrarMensaje("exito","ACTUALIZACION EXITOSA! Personal actualizado.");
            }
        }
    });
}

//--ACTUALIZAR CONDICIONAL LABORAL DEL PERSONAL  
vistaPersonal.prototype.actualizarCondicionPersonal = function(pers,empresa,condicion){
    var $codigo={
        '_codigo' : pers,
        '_condicion': condicion,
        '_empresa': empresa
   } 
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ActualizarCondicionPersonal.php',
        type: 'POST',
        data: $codigo,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{ 
                mostrarMensaje("exito","DATOS ACTUALIZADOS");
            } 
        }
    }); 
}

//--DEVOLVER FECHA Y/O HORA--
vistaPersonal.prototype.fechaActual = function(opcion){
    var hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    switch(opcion){
      case 'fecha': $("#fechaRegistro").text(fecha); break;
      case 'hora': $("#fechaRegistro").text(hora); break;
      case 'fechaXhora': $("#fechaRegistro").text(fecha + ' ' + hora); break;
    }
}

//--GENERAR OPCIONES DE EMPRESA--
vistaPersonal.prototype.mostrarEmpresa = function(select,dato){
    var boxEmpresa="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Clientes/Controlador_MostrarEmpresa.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxEmpresa+="<option value='' selected>Elegir Empresa</option>";
            $("#empresa").html(boxEmpresa);
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxEmpresa+="<option value='' selected>Elegir Empresa</option>";
                $("#empresa").html(boxEmpresa);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxEmpresa+="<option value='' selected>Elegir Empresa</option>";
                    }
                    boxEmpresa+="<option value='"+datos[i].EMPCODIGO+"'>"+datos[i].EMPDESCRIPCION+"</option>";
                }
                $("#empresa").html(boxEmpresa);
              
                if(select==true){
                  $("#empresa option[value="+ dato +"]").attr("selected",true);
                }
            }
        }
    });  
}

//--GENERAR OPCIONES DE ESTADO--
vistaPersonal.prototype.mostrarEstado = function(select,dato){
    var boxEstado="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarEstado.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxEstado+="<option value='' selected>Elegir Estado</option>";
            $("#estado").html(boxEstado);
        },
        success: function(datos){

            if(datos.response=="0"){
                boxEstado+="<option value='' selected>Elegir Estado</option>";
                $("#estado").html(boxEstado);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxEstado+="<option value='' selected>Elegir Estado</option>";
                    }
                    boxEstado+="<option value='"+datos[i].ESTCODIGO+"'>"+datos[i].ESTDESCRIPCION+"</option>";
                }
                $("#estado").html(boxEstado);
                if(select==true){
                  $("#estado option[value="+ dato +"]").attr("selected",true);
                }
            }
        }
    });  
}

//--GENERAR OPCIONES DE AREAS--
vistaPersonal.prototype.mostrarAreas = function(select,dato){
    var boxAreas="";
    
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarAreasPersonal.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxAreas+="<option value='' selected>Elegir Area</option>";
            $("#area").html(boxAreas);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxAreas+="<option value='' selected>Elegir Area</option>";
                $("#area").html(boxAreas);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAreas+="<option value='' selected>Elegir Area</option>";
                    }
                    boxAreas+="<option value='"+datos[i].AREACODIGO+"'>"+datos[i].AREADESCRIPCION+"</option>";
                }
                $("#area").html(boxAreas);
                if(select==true){
                  $("#area option[value="+ dato +"]").attr("selected",true);
                }
            }
        }
    }); 
}

//--GENERAR OPCIONES DE PROVINCIA--
vistaPersonal.prototype.mostrarProvincia = function(opcion,select,dato){
    var boxProvincia="";
    
    var $pais={
        '_pais': opcion
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Clientes/Controlador_MostrarProvincia.php',
        type: 'POST',
        data: $pais,
        datatype: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxProvincia+="<option value='' selected>Elegir Provincia</option>";
            $("#prov").html(boxProvincia);
        },
        success: function(datos){
 
            if(datos.response=="0"){
                boxProvincia+="<option value='' selected>Elegir Provincia</option>";
                $("#prov").html(boxProvincia);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxProvincia+="<option value='' selected>Elegir Provincia</option>";
                    }
                    boxProvincia+="<option value='"+datos[i].PROVCODIGO+"'>"+datos[i].PROVNOMBRE+"</option>";
                }
                $("#prov").html(boxProvincia);
                if(select==true){
                  $("#prov option[value="+ dato +"]").attr("selected",true);
                }
            }
        } 
    });
}

//--GENERAR OPCIONES DE DISTRITO--
vistaPersonal.prototype.mostrarDistrito = function(opcion,select,dato){
    var boxDistrito="";
    
    var $provincia={
        '_provincia': opcion
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Clientes/Controlador_MostrarDistrito.php',
        type: 'POST',
        data: $provincia,
        datatype: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxDistrito+="<option value='' selected>Elegir Distrito</option>";
            $("#distrito").html(boxDistrito);
        },
        success: function(datos){

            if(datos.response=="0"){
                boxDistrito+="<option value='' selected>Elegir Distrito</option>";
                $("#distrito").html(boxDistrito);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxDistrito+="<option value='' selected>Elegir Distrito</option>";
                    }
                    boxDistrito+="<option value='"+datos[i].DISTRCODIGO+"'>"+datos[i].DISTRNOMBRE+"</option>";
                }
                $("#distrito").html(boxDistrito);
                if(select==true){
                  $("#distrito option[value="+ dato +"]").attr("selected",true);
                }
            }
        } 
    });
}

//--MOSTRAR IMAGEN DE PERFIL DEL PERSONAL--
vistaPersonal.prototype.mostrarImagen = function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = document.getElementById('previewFoto');
    img.src= event.target.result;
  }
  reader.readAsDataURL(file);
}

//--GUARDAR IMAGEN DE PERFIL DEL PERSONAL--
vistaPersonal.prototype.guardarImagen = function(){
  
  var nuevoFormulario = new FormData();   
  $("#form").find(':input').each(function() {
    var elemento= this;
    //Si recibe tipo archivo 'file'
    if(elemento.type === 'file'){
       if(elemento.value !== ''){
          for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
              nuevoFormulario.append(elemento.name, $('#'+elemento.id).prop("files")[i]);
           }
       }              
     }
  });
  
  $.ajax({
      url: "../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_GuardarImagen.php",
      type: "POST",
      data: nuevoFormulario,
      contentType: false,
      processData: false,
      success: function(datos){
          mostrarMensaje("exito","REGISTRO EXITOSO! Imagen guardada correctamente.");
      }
  });
}  

//--GENERAR FECHA DE CONTRATACION--           
vistaPersonal.prototype.fechaContratacion = function(fechaContrato,tiempo){

    //capturar fecha de inicio del contrato
    var fecha = new Date(fechaContrato);
    fecha.setDate(fecha.getDate() + 1);
    var options = {  day: 'numeric', month: 'long', year: 'numeric'};
    cinicio= fecha.toLocaleDateString("es-ES", options);

    //capturar vigencia del contrato
    fecha = new Date(fechaContrato.replace(/-/g, '\/').replace(/T.+/, ''));
    fecha.setMonth(fecha.getMonth() + parseFloat(tiempo));
    fecha.setDate(fecha.getDate()-1 );
    cvigencia= fecha.toLocaleDateString("es-ES", options);

    var respuesta = "Periodo "+cinicio +" al " + cvigencia;
    
    return respuesta
          
}

//--GENERAR CODIGO DE CONTRATO-- 
vistaPersonal.prototype.generarCodigoContrato = function(codePersonal,liquidar){
    var $personal={
            '_personal' : codePersonal
    } 
      
    $.ajax({
            url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarPersonalTodoContratado.php',
            type: 'POST',
            data: $personal,
            dataType: 'json',
            error: function(error){
                if(error.status == 401){
                    mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
                }
                else{
                    mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
                }
            },
            success: function(datos){
                if(datos.response=="0"){
                    vPersonal.generarPrimerCodigoContrato(codePersonal,liquidar);
                    vPersonal.actualizarCondicionPersonal(personal,$("#empresa").val(),$("#situacionLaboral").val());
                    
                }else{
                    alert("#das")
                    var contratos = new Array();
                    var detallecontratos = new Array();
                    var empresa = new Array();
                    var tiempos = new Array(); 
                    var grabar="NO";
                    for (var i=0;i<datos.length;i++){
                        grabar = vPersonal.rangoFechas($("#fContrato").val(),$("#tiempo").val(), datos[i].DETCONTRFECHA_CONTRATACION,datos[i].DETCONTRTIEMPO);
                        if (grabar=="NO") {
                            i==datos.length-1;
                        }
                        contratos[i]=datos[i].CONTRCODIGO;
                    }
                    if(grabar=="SI"){
                        var contrato = contratos.filter(function(item, index, array) {
                          return array.indexOf(item) === index;
                        });
                        for (var i=0;i<contrato.length;i++){
                            tiempos[i]=0;
                             for (var j=0;j<datos.length;j++){
                                 if(contrato[i]==datos[j].CONTRCODIGO ){
                                     tiempos[i]=tiempos[i]+ parseInt(datos[j].DETCONTRTIEMPO);
                                     empresa[i]=datos[j].EMPCODIGO;
                                 }
                             }
                        }
                        var r=0,detalle;
                        for(var k=0;k<empresa.length;k++){
                            if($("#empresa").val()== empresa[k]){
                                var suma=tiempos[k]+parseInt($("#tiempo").val());
                                if(parseInt(suma)<61){
                                    for (var i=0;i<datos.length;i++){

                                        if(datos[i].DETCONTRLIQUIDACION=="SI" ||  datos[i].ESTCODIGO =="53"){
                                            vPersonal.editarContrato(datos[i].DETCONTRCODIGO,datos[i].DETCONTRFECHA_CONTRATACION,datos[i].DETCONTRTIEMPO,"NO","55");
                                        }
                                        if(contrato[k]==datos[i].CONTRCODIGO){
                                            detalle=datos[i].DETCONTRCODIGO;
                                            detalle=detalle.split("-");
                                            detallecontratos[r]=(detalle[1]);
                                            r=r+1;
                                        }
                                    }
                                    detallecontratos.sort();
                                    if(suma==60){
                                        liquidar="SI";
                                    }
                                    vPersonal.guardarDetalleContrato(contrato[k]+"-"+(parseInt(detallecontratos[detallecontratos.length-1])+1),contrato[k],liquidar);
                                    vPersonal.actualizarCondicionPersonal(personal,$("#empresa").val(),$("#situacionLaboral").val());
                                }else{
                                    mostrarMensaje("advertencia","LA EMPRESA SELECCIONADA SOLO TIENE "+ (60-parseInt(tiempos[k]))+ " MESES LIBRES");
                                    document.getElementById("guardar").disabled=false; 
                                }
                                k=empresa.length;
                            }else if(k== empresa.length-1){
                                vPersonal.generarPrimerCodigoContrato(codePersonal,liquidar);
                                vPersonal.actualizarCondicionPersonal(personal,$("#empresa").val(),$("#situacionLaboral").val());
                            }
                        }
                        
                    }else{
                        alert("LA FECHA DE CONTRATACION COINCIDE CON UN CONTRATO EXISTENTE, ELEGIR OTRA FECHA");
                    }
                    
                }
            }
       });
}

//--GENERAR PRIMER CONTRATO-EMPRESA--
vistaPersonal.prototype.generarPrimerCodigoContrato = function(codePersonal,liquidar){
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarTodosContratosSinExpresion.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
          }
      },
      success: function(datos){
          if(datos.response == 0){
            code = "C1";
          }
          else{
            var mayor=0;
              for (var i=0; i<datos.length;i++){
                  if(i==0){
                      mayor=parseInt(datos[i].CONTRCODIGO.substr(1));
                  }else{
                      if(mayor<parseInt(datos[i].CONTRCODIGO.substr(1))){
                          mayor=parseInt(datos[i].CONTRCODIGO.substr(1));
                      }
                  }
              }
              
            code = "C"+(mayor+1); 
          }
          vPersonal.guardarContrato(codePersonal,code,liquidar);
        }
    });
}

//--GUARDAR CONTRATO--    
vistaPersonal.prototype.guardarContrato = function(codePersonal,code,liquidacion){
    
    var estado=47;
    
    var $contrato={
        '_code': code,
        '_codePersonal': codePersonal,    
        '_estado': estado,
        '_fIngresoPlanilla': $("#fContrato").val(),
        '_empresa': $("#empresa").val()
    }
            
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarContrato.php',
        type: 'POST',
        data: $contrato,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error","REGISTRO INCORRECTO! "+datos.message);
            }else{
                vPersonal.guardarDetalleContrato(code+"-1",code,liquidacion);
            }
        }
    }); 
}

//--REGISTRAR DETALLE CONTRATO--
vistaPersonal.prototype.guardarDetalleContrato = function(codigodetalle,code,liquidacion){
    
    var $detalles={
        '_codigoDetalle' : codigodetalle,
        '_fContratacion': $("#fContrato").val(),
        '_cantidadIngresada': $("#tiempo").val(),
        '_estado' : 53,
        '_codigo': code,
        '_liquidar': liquidacion
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarDetallesContrato.php',
        type: 'POST',
        data: $detalles,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error","REGISTRO INCORRECTO! "+datos.message);
            }
            else{
                mostrarMensaje("exito","DETALLE CONTRATO REGISTRADO");
            }
        }
    });
}  

//--EDITAR CONTRATO--
vistaPersonal.prototype.editarContrato = function(codigocontrato,fecha,tiempo,liquidar,estado){
    var $contrato={
        '_contrato': codigocontrato,
        '_fecha': fecha,
        '_tiempo': tiempo,
        '_estado': estado,
        '_liquidar': liquidar
    }
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ActualizarDetalleContrato.php',
        type: 'POST',
        data: $contrato,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                 mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                 mostrarMensaje("error","Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                 mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                 mostrarMensaje("exito","DETALLE CONTRATO ACTUALIZADO");
            }
        }
    });
}

//--GENERAR CODIGO DE VACACIONES--   
vistaPersonal.prototype.generarCodigoVacaciones = function(personal,periodo,dias){
    
    var codeVacaciones="";

    $.ajax({
      url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarTodosVacaciones.php',
      type: 'GET',
      async:false,
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
          }
      },
      success: function(datos){
          if(datos.response == 0){
            codeVacaciones = "V1";
          }
          else{
              var mayor=0;
              for (var i=0; i<datos.length;i++){
                  if(i==0){
                      mayor=parseInt(datos[i].VACAPERSCODIGO.substr(1));
                  }else{
                      if(mayor<parseInt(datos[i].VACAPERSCODIGO.substr(1))){
                          mayor=parseInt(datos[i].VACAPERSCODIGO.substr(1));
                      }
                  }
              }
              codeVacaciones = "V"+(mayor+1); 
          }
          vPersonal.guardarVacaciones(codeVacaciones,personal,periodo,dias);
        }
    });
    
}
    
//--GUARDAR REGISTRO DE VACACIONES--   
vistaPersonal.prototype.guardarVacaciones = function(codigo,personal,periodo,dias){

    var vacaciones={
        '_codigo': codigo,
        '_personal' : personal,
        '_periodo' : periodo,
        '_dias' : dias,
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarVacaciones.php',
        type: 'POST',
        async:false,
        data: vacaciones,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","REGISTRO INCORRECTO! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","REGISTRO INCORRECTO! Error no identificado.");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error","REGISTRO INCORRECTO! "+datos.message);
            }
            else{
                mostrarMensaje("exito","Registro Exitoso!");
            }
        }
    });
    
} 

//--CARGAR DATOS DEL PERSONAL CON CONTRATO--    
vistaPersonal.prototype.cargarDatos = function(personal){
   var $personal={
        '_personal' : personal
   } 
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarPersonalContratado.php',
        type: 'POST',
        data: $personal,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                var mayor,meses=0;
                var obtenidos=vPersonal.ultimoRegistroIngresado(datos);
                var j=obtenidos[0];
                meses=obtenidos[1];
                if (meses==60){
                    vPersonal.editarContrato(datos[j].DETCONTRCODIGO,datos[j].DETCONTRFECHA_CONTRATACION,datos[j].DETCONTRTIEMPO,"SI","53");//53
                }
                $("#codigoOculto").val(datos[j].DETCONTRCODIGO);
                $("#fIngreso").val(datos[j].CONTRINGRESO_PLANILLA);         
                $("#nombre").val(datos[j].PERSNOMBRE);         
                $("#apellido").val(datos[j].PERSAPELLIDO_PATERNO+" "+datos[j].PERSAPELLIDO_MATERNO);         
                $("#empresa").val(datos[j].EMPCODIGO);         
                $("#area").val(datos[j].AREADESCRIPCION);         
                $("#turno").val(datos[j].PERSTURNO);         
                $("#especialidad").val(datos[j].PERSESPECIALIDAD); 
                $("#contratofecha").val(datos[j].DETCONTRFECHA_CONTRATACION); 
                $("#contratotiempo").val(datos[j].DETCONTRTIEMPO);            
                $("#tHorario").val(datos[j].PERSTIPHORARIO);            
                $("#contratoVigente").val(vPersonal.fechaContratacion(datos[j].DETCONTRFECHA_CONTRATACION,datos[j].DETCONTRTIEMPO));
                var tablavacaciones="";
                for (var i=0;i<datos.length;i++){
                    var ncontrato=0;
                    if(datos[i].CONTRCODIGO.length==2){
                        ncontrato= datos[i].DETCONTRCODIGO.substr(3);
                    }else if(datos[i].CONTRCODIGO.length==3){
                        ncontrato= datos[i].DETCONTRCODIGO.substr(4);    
                    }else if(datos[i].CONTRCODIGO.length==4){
                        ncontrato= datos[i].DETCONTRCODIGO.substr(5);    
                    }else{
                        ncontrato= datos[i].DETCONTRCODIGO.substr(6);
                    }
                    var periodo = vPersonal.fechaContratacion(datos[i].DETCONTRFECHA_CONTRATACION,datos[i].DETCONTRTIEMPO)
                    var fincontrato = periodo.split("al");
                    tablavacaciones+="<tr>\
                                          <td class='text-center'>"+ncontrato+"</td class='text-center'>\
                                          <td class='text-center'>"+periodo+"</td class='text-center'>\
                                          <td class='text-center'>"+datos[i].DETCONTRFECHA_CONTRATACION +"</td>\
                                          <td class='text-center'>"+fincontrato[1]+"</td>\
                                          <td class='text-center'>"+datos[i].DETCONTRTIEMPO +" meses</td>\
                                          <td class='text-center'>"+ datos[i].CONTRCODIGO+"</td>\
                                          <td class='text-center'><input id="+ datos[i].DETCONTRCODIGO+"* type='button' class='btn py-0 px-3 green'  value='/' data-toggle='modal' data-target='#ModalContrato'  onclick='cargarContrato(this.id)'><input id="+ datos[i].DETCONTRCODIGO+" type='button' class='btn py-0 px-3 red' value='X' onclick='alerta(this.id)'></td>\
                                    </tr>";
                  }
                }
            mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
           $("#historial").html(tablavacaciones);
        }
    }); 
 }

//--GENERAR FECHA FINAL DEL PERIODO--
vistaPersonal.prototype.calcularPeriodo = function(inicial){
    var fecha = new Date(inicial);
    var options = { month: 'long', year: 'numeric'};
    fecha.setDate(fecha.getDate() + 1);
    fecha.setFullYear(fecha.getFullYear());
    var inicio=fecha.toLocaleDateString("es-ES", options);

    //capturar fecha final 
    fecha = new Date(inicial);
    fecha.setFullYear(fecha.getFullYear() + 1);
    var final=fecha.toLocaleDateString("es-ES", options);
    var periodo = inicio + " a " + final;

    return periodo
    
}

//--GENERAR FECHA FINAL DEL CONTRATO DEPENDIENDO DE LA CANTIDAD DE DIAS--
vistaPersonal.prototype.calculoFechaFinalxDias = function(diaInicial,diasAgregados){
    
    var fechainicial= moment(diaInicial,"YYYY-MM-DD").add('days',diasAgregados);
    var day = fechainicial.format('DD');
    var month = fechainicial.format('MM');
    var year = fechainicial.format('YYYY');                    
    var dias= year + '-' + month + '-' + day
    return dias
}

//--RANGO DE FECHAS--
vistaPersonal.prototype.rangoFechas = function(fechaingresada,tiempoingresado,fechadata,tiempodata){
    
    var fechafija = new Date(fechaingresada.replace(/-/g, '\/').replace(/T.+/, '')); 
    var fechafijasalida = new Date(fechafija.getFullYear(),fechafija.getMonth()+parseInt(tiempoingresado), fechafija.getDate()-1);

    var fechacambio = new Date(fechadata.replace(/-/g, '\/').replace(/T.+/, '')); 
    var fechadatasalida =new Date(fechacambio.getFullYear(),fechacambio.getMonth()+parseInt(tiempodata), fechacambio.getDate()-1);
 
    var fechafija1 = moment(fechaingresada); // FECHA INGRESADA
    fechafijasalida = moment(fechafijasalida) // FECHA DE SALIDA
    
    var fechacambio1 = moment(fechadata); // FECHA DE CAMBIO INGRESADA
    fechadatasalida = moment(fechadatasalida) // FECHA DE CAMBIO DE SALIDA
    
    var resultado = new Array();
    resultado[0]=fechafija1.diff(fechacambio1, 'days') ;
    resultado[1]=fechafija1.diff(fechadatasalida, 'days') ;
    resultado[2]=fechafijasalida.diff(fechacambio1, 'days') ;
    resultado[3]=fechafijasalida.diff(fechadatasalida, 'days') ;
    
    var grabar="NO";
    if( resultado[0]>0 && resultado[1]>0 && resultado[2]>0 && resultado[3]>0){
        grabar="SI";
    }else if (resultado[0]<0 && resultado[1]<0 && resultado[2]<0 && resultado[3]<0){
        grabar="SI";
    }else{
        grabar="NO";
    }
    return grabar
}

//--ULTIMO REGISTRO INGRESADO--
vistaPersonal.prototype.ultimoRegistroIngresado = function(datos){
    var q,mayor,meses;
    for(var i=0;i<datos.length;i++){
        meses=meses+ parseInt(datos[i].DETCONTRTIEMPO);
        if(i==0){
            mayor= datos[i].DETCONTRFECHA_CONTRATACION;
            q=0;
        }
        if(mayor<datos[i].DETCONTRFECHA_CONTRATACION){
            mayor=datos[i].DETCONTRFECHA_CONTRATACION;
            q=i;
        }    
    }
    return [q,meses];
}

//--COMPARACION DE FECHAS--
vistaPersonal.prototype.comparacionFechas= function(InicioTabla,FinalTabla,fechaInicioEvaluar,fechaFinalEvaluar){
    var fechaArrayInicio=new Array();
    var fechaArrayFinal=new Array();
        
    var fecha = fechaInicioEvaluar.split("-");
    var f1 = new Date(fecha[0], fecha[1]-1, fecha[2]);
    var final = fechaFinalEvaluar.split("-");
    var f2 = new Date(final[0], final[1]-1, final[2]);
    
    for (var i=0;i<InicioTabla.length;i++){
        var fechaArrayInicioTotal = InicioTabla[i].split("-");
        fechaArrayInicio[i]=new Date(fechaArrayInicioTotal[0], fechaArrayInicioTotal[1]-1, fechaArrayInicioTotal[2]);
        var fechaArrayFinalTotal = FinalTabla[i].split("-");
        fechaArrayFinal[i]=new Date(fechaArrayFinalTotal[0], fechaArrayFinalTotal[1]-1 , fechaArrayFinalTotal[2]);
    }
    
    var cumple=true;
    for (var j=0;j<InicioTabla.length;j++){
        
        if(cumple!=false){
            if(f1<=fechaArrayInicio[j]&&f2<=fechaArrayInicio[j]){
                cumple=true;
            }else if(f1>=fechaArrayFinal[j]&&f2>=fechaArrayFinal[j]){
                cumple=true;
            }else{
                cumple=false;
            }
        }
    }    
    return cumple
}

//--CAMBIO DE FECHAS--
vistaPersonal.prototype.cambioFechaDate = function (fechaCambiar){
    var fechaArray=fechaCambiar.split("-");
    fechaArray= new Date(fechaArray[0],fechaArray[1]-1,fechaArray[2]);
    return fechaArray
}

//--REGISTRAR CONTROL DE HORARIO(ENTRADA)
vistaPersonal.prototype.registrarControlHorario = function($datos,tipo){
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_RegistrarPersonalAControlHorario.php',
        type: 'POST',
        data: $datos,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                mostrarMensaje("exito","DATOS GRABADOS");
                switch(tipo){
                    case "añadir":
                        $("#formularioAñadir").addClass("d-none");
                        $("#listadoSelect").removeClass("d-none");
                        $("#personal").val("");
                        $("#aDEntrada").val("");
                        $("#aDSalida").val("");
                        $("#aObservaciones").val("");
                    break;    
                }     
            }
        }
    });
}

//--ACTUALIZAR COTNROL DE HORARIO/(SALIDA)
vistaPersonal.prototype.actualizarControlHorario = function($actualizar){
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_ActualizarControlHorario.php',
        type: 'POST',
        data: $actualizar,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{ 
                mostrarMensaje("exito","DATOS ACTUALIZADOS");
            } 
        }
    });
    
}

vistaPersonal.prototype.eliminarControlHorario = function($personal){
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_EliminarControlHorario.php',
        type: 'POST',
        data: $personal,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }
        }
    });
}


var vPersonal = new vistaPersonal();
