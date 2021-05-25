/*=============================================
    FUNCIONES DE CAMBIO DE VISTA
=============================================*/

//--REDIRIGIR A VISTA SEGUN LA OPCION EN CONTROL USUARIO--
function ControlUsuario(pers,op){
  
    var url="";
    
    switch (op){
        case "actualizarUsuario": 
            url= "Modulos/ModMaestros/VistaUsuarios/ActualizarUsuario.html";
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

var vistaUsuario = function(){}
//--FUNCION PARA MOSTRAR PERMISOS PERMITIDOS AL PERSONAL--
vistaUsuario.prototype.cargarPermisos = function(personal){
    var $codigo={
        '_codigo' : personal
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Usuario/Controlador_MostrarPermisosUsuario.php',
        type: 'POST',
        data: $codigo,
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
                mostrarMensaje("error",'El usuario no tiene ningún permiso.');
            }else{
                var compuesto =datos.ACCPERSONAL.split("","4");
                for(var i=0;i<compuesto.length;i++){
                    if(compuesto[i]==1){
                        document.getElementById('personal'+(i+1)).checked=true;
                    } 
                }
                Object.keys(datos).forEach(function(key) {
                    if(datos[key]=="1"){
                        document.getElementById(key.toLowerCase()).checked=true;
                    }
                });

            }
        }
    });
}

var vUsuario = new vistaUsuario();
