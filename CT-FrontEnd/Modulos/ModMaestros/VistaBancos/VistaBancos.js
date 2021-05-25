function ActivarBanco(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaBancos/ActivarBanco.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function NuevoBanco(){
    
     $.ajax({  
        url: 'Modulos/ModMaestros/VistaBancos/NuevoBanco.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
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

var vistaBanco = function (){}

//--VALIDAR FORMULARIO--
vistaBanco.prototype.validar = function(op){
   
    var R2 = $("#nombre").val();
    var R3 = $("#estado").val();
        
     if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#nombre").focus();
        }
    else if(R3 == null || R3.length == 0 || /^\s+$/.test(R3)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#estado").focus();
    } else{
        switch(op) {
          case 'REGISTRAR':
                vBanco.RegistrarBanco();
            break;
          case 'ACTUALIZAR':
                vBanco.actualizarBanco();
            break;
        }
        
    }
}

//--REGISTRAR NUEVO BANCO--
vistaBanco.prototype.RegistrarBanco = function(){
    
    var $banco={
        '_nombre':$("#nombre").val(),
        '_estado':$("#estado").val(),       
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Bancos/Controlador_RegistrarBancos.php',
        type: 'POST',
        data: $banco,
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

            if(datos.response == 0){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }
            else{
              $("#resultado").text("Resultados grabados satisfactoriamente");
            }
        }
    });
}

//--ACTUALIZAR BANCO--
vistaBanco.prototype.actualizarBanco = function(){
    var $banco={
        
        '_nombre':$("#nombre").val(),
        '_estado':$("#estado").val(),       
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Bancos/Controlador_ActualizarBancos.php',
        type: 'POST',
        data: $banco,
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
            if(datos.response == 0){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }
            else{
              $("#resultado").text("Resultados grabados satisfactoriamente");
            }
        }
    });
    
    
}

//--GENERAR OPCIONES DE ESTADO-- 
vistaBanco.prototype.mostrarEstado = function(){
    var boxestado="";
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Bancos/Controlador_MostrarEstados.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxestado+="<option value='' selected>Elegir Banco</option>";
            $("#estado").html(boxestado);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxestado+="<option value='' selected>Elegir Estado</option>";
                $("#estado").html(boxestado);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxestado+="<option value='' selected>Elegir Estado</option>";
                    }
                    boxestado+="<option value='"+datos[i].ESTCODIGO+"'>"+datos[i].ESTDESCRIPCION+"</option>";
                }
                $("#estado").html(boxestado);
            }
        }
    });

}

var vBanco = new vistaBanco();
