function MensajeriaNueva(opcion,personal,tipo){
    $.ajax({  
        url: 'Modulos/ModProduccion/MensajeriaNueva.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            //var varia=opc;
            clearInterval(intervalo)
        }  
    }); 
    
}

function MensajeriaSimilar(opcion,personal){
    $.ajax({  
        url: 'Modulos/ModProduccion/MensajeriaSimilar.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
    
}

function DetalleMensajeria(enviarCodigo){
    $.ajax({  
        url: 'Modulos/ModProduccion/DetalleMensajeria.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            //var varia=opc;
            clearInterval(intervalo)
        }  
    }); 
    
}

function ActualizarEstado(enviarCodigo){
    $.ajax({  
        url: 'Modulos/ModProduccion/ActualizarEstado.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            //var varia=opc;
            clearInterval(intervalo)
        }  
    }); 
    
}

function DetalleDistrito(enviarCodigo){
    $.ajax({  
        url: 'Modulos/ModProduccion/DetalleDistrito.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            //var varia=opc;
            clearInterval(intervalo)
        }  
    }); 
    
}

function ListarDespacho(opcion,tipo){
    $.ajax({  
        url: 'Modulos/ModProduccion/ListadoDespacho.html',  
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
  }
}

var vistaProduccion = function(){}

/*FUNCION DE CONVERTIR DIA DE LA SEMANA EN LETRAS A FORMATO FECHA(DATE)*/ 
vistaProduccion.prototype.convertirAFecha = function(fecha){
    if(fecha!=""){
        var arrayMes = ["Ene","01","Feb","02","Mar","03","Abr","04","May","05","Jun","06","Jul","07","Ago","08","Set","09","Oct","10","Nov","11","Dic","12"];
        var mes = "" ;
        for (var i=0; i<arrayMes.length; i+=2){
            if(fecha.substr(3,3)==arrayMes[i]){
                mes= arrayMes[i+1];
            }
        }
        fecha = fecha.substr(8,4)+"-"+mes+"-"+fecha.substr(0,2);
    }else{
        fecha="";
    }
    return fecha
}

/*FUNCION PARA CONVERTIR EL VALUE A TEXTO EL TIPO DE HORARIO*/
vistaProduccion.prototype.cambiarTextoHorario = function(tipHorario){
    var horario="";
    switch(tipHorario) {
          case "dia":
                horario="Durante el Dia";
            break;
          case "mañana":
                horario="En la Mañana";
            break;
          case "tarde":
                horario="En la Tarde";
            break;
          case "noche":
                horario="En la Noche";
            break;
          case "madrugada":
                horario="En la Madrugada";
          case "entrega":
                horario="Plazo Entrega";
            break;
        }
    return horario;
}

/*FUNCION PARA CONVERTIR EL VALUE A TETO EL TIPO DE MENSAJERIA*/
vistaProduccion.prototype.cambiarTextoTipMensajeria = function(tipMensajeria){
    var tipo_mensajeria="";
    
    switch(tipMensajeria) {
          case "archivo":
                tipo_mensajeria="Archivos";
            break;
          case "prueba":
                tipo_mensajeria="Pruebas";
            break;
          case "servTercero":
                tipo_mensajeria="Servicios de Terceros";
            break;
          case "trabTermin":
                tipo_mensajeria="Trabajos Terminados";
            break;
          case "otros":
                tipo_mensajeria="Otros";
            break;
        }
    return tipo_mensajeria;
}

/*FUNCION PARA CONVERTIR FECHA(DATE) A FORMATO DESEADO(DD-MM-YY)*/
vistaProduccion.prototype.formatFechaOriginal = function(fecha){
    var fechaOriginal = fecha.split("-")[2]+"/"+fecha.split("-")[1]+"/"+fecha.split("-")[0].substr(2,2);
    return fechaOriginal
}

/*FUNCION PARA CONVERTIR VALUE A TEXTO LA HORA DESEADA (HH:MM TI)*/
vistaProduccion.prototype.changeValueToText = function(value){
    var salida="";
    switch(value) {
          case "100AM":
                salida="1:00 AM";
            break;
          case "200AM":
                salida="2:00 AM";
            break;
          case "300AM":
                salida="3:00 AM";
            break;
          case "400AM":
                salida="4:00 AM";
            break;
          case "500AM":
                salida="5:00 AM";
            break;
          case "600AM":
                salida="6:00 AM";
            break;
          case "700AM":
                salida="7:00 AM";
            break;
          case "800AM":
                salida="8:00 AM";
            break;
          case "900AM":
                salida="9:00 AM";
            break;
          case "1000AM":
                salida="10:00 AM";
            break;
          case "1100AM":
                salida="11:00 AM";
            break;
          case "1200PM":
                salida="12:00 PM";
            break;
          case "1300PM":
                salida="13:00 PM";
            break;
          case "1400PM":
                salida="14:00 PM";
            break;
          case "1500PM":
                salida="15:00 PM";
            break;
          case "1600PM":
                salida="16:00 PM";
            break;
          case "1700PM":
                salida="17:00 PM";
            break;
          case "1800PM":
                salida="18:00 PM";
            break;
          case "1900PM":
                salida="19:00 PM";
            break;
          case "2000PM":
                salida="20:00 PM";
            break;
          case "2100PM":
                salida="21:00 PM";
            break;
          case "2200PM":
                salida="22:00 PM";
            break;
          case "2300PM":
                salida="23:00 PM";
            break;
        }
    return salida;
    
}

/*FUNCION PARA CONVERTIR VALUE A TEXTO EL TIPO DE SELECCIONE DESEADO*/
vistaProduccion.prototype.cambiarTextoSeleccione = function(seleccione){
    var tipo="";
    switch(seleccione) {
          case "TipoArchivos":
                tipo="Tipo Archivos";
            break;
          case "TipoPruebas":
                tipo="Tipo Pruebas";
            break;
          case "TipoServicio":
                tipo="Tipo Servicio";
            break;
          case "TipoTrabajos":
                tipo="Tipo Trabajos";
            break;
          case "EntregaParcial":
                tipo="Entrega Parcial";
          case "EntregaTotal":
                tipo="Entrega Total";
            break;
          default:
                tipo=seleccione;
        }
    return tipo;
}

/*FUNCION PARA CONVERTIR VALUE A TEXTO EL VEHICULO*/
vistaProduccion.prototype.changeTextTrasportation = function(codVehiculo){
    
    var vehiculo=" ";
        switch(codVehiculo) {
          case "1":
                vehiculo="A Pie";
            break;
          case "2":
                vehiculo="Bicicleta";
            break;
          case "3":
                vehiculo="Camioneta";
            break;
          case "4":
                vehiculo="Combi";
            break;
          case "5":
                vehiculo="Moto";
            break;
          case "6":
                vehiculo="Taxi";
            break;
        }
    return vehiculo
}

/*FUNCION PARA CONVERTIR VALUE A TEXTO EL ESTADO DEL DESPACHO*/
vistaProduccion.prototype.estadoPrograDespacho = function(codEstado){
    var estado=" ";
        switch(codEstado) {
          case "68":
                estado="Terminada";
            break;
          case "69":
                estado="Abierta";
            break;
          case "70":
                estado="Atendida";
            break;
          case "71":
                estado="Anulada";
            break;
        }
    return estado
}

/*FUNCION PARA CONVERTIR VALUE A TEXTO EL MENSAJERO*/
vistaProduccion.prototype.changeValueToTextmensajero = function(codMensajero){
    var mensajero=" ";
        switch(codMensajero) {
          case "9":
                mensajero="Ramiro Campos";
            break;
          case "21":
                mensajero="Reyes Rodolfo Flores";
            break;
          case "25":
                mensajero="Cesar Alberto Gilbonio";
            break;
          case "29":
                mensajero="Jorge Luis Heath";
            break;
          case "30":
                mensajero="Herbert Huaman";
            break;
          case "taxi":
                mensajero="Servicio Taxi";
            break;
          case "otro":
                mensajero="Otro";
            break;
        }
    return mensajero
}

var vProduccion = new vistaProduccion();