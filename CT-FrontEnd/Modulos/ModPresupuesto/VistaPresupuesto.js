function NuevoPresupuesto(){
  var item = $("#item").val();
    $.ajax({
        url: 'Modulos/ModPresupuesto/F1810.html',
        success: function(data) {
            $('#cuerpo').html(data);
            clearInterval(intervalo)
            $("#cabezal").addClass("d-none");
            $("#TituloNuevoPresupuesto").addClass("d-none");
            slider4.editarItem(item);
        }
    });
}

function BuscarPresupuesto(codigo){
  var cod = codigo;
  $.ajax({
        url: 'Modulos/ModPresupuesto/BuscarPresupuesto.html',
        success: function(data) {
            $('#cuerpo').html(data);
            clearInterval(intervalo)
            vistaPrevia(codigo);
            $("#valor").val(codigo)
        }
    });
}

function CambiarEstadoPresupuesto(codigo){
  var code = codigo.split("*");
  $.ajax({
        url: 'Modulos/ModPresupuesto/CambiarEstadoPresupuesto.html',
        success: function(data) {
            $('#cuerpo').html(data);
            clearInterval(intervalo)
            $("#codpresupuesto").val(code[1]);
            validarcodigo();
        }
    });
}

function NuevoItem(cod, vende,emp){

    $.ajax({
        url: 'Modulos/ModPresupuesto/F1810.html',
        success: function(data) {
            $('#cuerpo').html(data);
            $("#PRINCIPAL #numeroItem").val(cod);
            $("#vendedor").val(vende);
            datos.mostrarCliente(emp);
            $("#medidasItem-P").modal('show');
            $("#btnAdelantar").click();
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

var CLIENTES =function(){};

CLIENTES.prototype.mostrarCliente = function(seleccionado){
    var boxCliente="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Clientes/Controlador_MostrarTodosClientes.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
            boxCliente+="<option value='0' selected>Elegir Cliente</option>";
            $("#cliente").html(boxCliente);
            $("#clientex").html(boxCliente);
        },
        success: function(datos){
            cliente=datos;
            if(datos.response=="0"){
                boxCliente+="<option value='0' selected>Elegir Cliente</option>";
                $("#cliente").html(boxCliente);
                $("#clientex").html(boxCliente);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxCliente+="<option value='0' selected>Elegir Cliente</option>";
                    }
                    boxCliente+="<option value='"+datos[i].CLIENCODIGO+"'>"+datos[i].CLIENNOMBRE_CORTO+"</option>";
                }
                $("#cliente").html(boxCliente);
                $("#clientex").html(boxCliente);
                $("#cliente option[value="+seleccionado+"]").attr("selected",true);
            }
        }
    }); 
}

CLIENTES.prototype.HoyDia = function(){
    var fecha = new Date();
    var mes=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return ("Lince, "+ fecha.getDate()  + ' de ' + mes[fecha.getMonth()]+ ' del ' + fecha.getFullYear())
}

CLIENTES.prototype.mostrarPresupuestos = function(){
  var boxPrespuestos="<option value='0' selected>Elegir Presupuesto</option>";
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarTodosPptos.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
            $("#presupuestos").html(boxPrespuestos);
        },
        success: function(datos){
            if(datos.response=="0"){
                $("#presupuestos").html(boxPrespuestos);
            }else{
                for(var i=0; i<datos.length;i++){    
                    boxPrespuestos+="<option value='"+datos[i].PRESUPNUMERO+"'>"+datos[i].PRESUPNUMERO+"</option>";
                }
                $("#presupuestos").html(boxPrespuestos);
            }
        }
    }); 
}
var datos = new CLIENTES();

