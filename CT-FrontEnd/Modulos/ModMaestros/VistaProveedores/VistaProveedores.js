function NuevoProveedor(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/NuevoProveedor.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListadoProveedor(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/ListadoProveedores.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function NuevoGato(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/NuevoGasto.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListarFechas(fInicio,fFinal){
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaProveedores/ListadoGastos.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            var FInicio =fInicio;
            var FFinal=fFinal;
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



