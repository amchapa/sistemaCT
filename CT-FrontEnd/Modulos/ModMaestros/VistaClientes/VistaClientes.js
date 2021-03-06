/*=============================================
    FUNCIONES DE CAMBIO DE VISTA
=============================================*/

function RegistrarClientes(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/RegistrarClientes.html',  
        success: function(data) {  
            $('#cuerpo').html(data); 
            clearInterval(intervalo)
        }  
    }); 
    
}

function ActualizarClientes(clien){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/ActualizarClientes.html',   
        success: function(data) {  
            $('#cuerpo').html(data); 
            var cliente=clien;
            clearInterval(intervalo)
            
        }  
    }); 
    
}

function NuevoClienteCredito(clien){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/NuevoClienteCredito.html',   
        success: function(data) {  
            $('#cuerpo').html(data);  
            var cliente=clien;
            clearInterval(intervalo)
            
        }  
    }); 
    
}

function ListarClientes(){
    
    $.ajax({  
        url: 'Modulos/ModMaestros/VistaClientes/ListadoClientes.html',   
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
                          <li>1. Cambiar la empresa asignada al personal(Solo en caso de renovaci??n de contrato por expiraci??n del mismo).</li>\
                          <li>2. Aceptar el mensaje de confirmaci??n y dirigirse a la secci??n Condici??n Laboral e ingresar los nuevos datos del personal.</li>\
                          <li>3. Verificar los datos, cerrar este mensaje, y hacer click en el boton 'Actualizar'</li>\
                        </div>");
       $('.toast').css("background-color","#007bff");
       $('.toast').toast('show');
       $('.toast').addClass('visualizar');
          break;
          
  }
}
