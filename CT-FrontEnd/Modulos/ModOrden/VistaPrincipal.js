var unidadInicial = "";

function ventanaNuevaOrden(code){ 
    $.ajax({  
        url: 'Modulos/ModOrden/NuevaOrden.html',  
        success: function(data) {  
            var codigo=code;
            console.log(codigo)
            codigo.split("-")[0]!="codigo" ? setTimeout(slider0.cargarDatos,300,codigo) : setTimeout(slider1.cargarDatosEditItem,300,codigo.split("-")[1])
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

       $('.toast').addClass('visualizar');
          break;
          
  }
         $(".toast").toast("show");
}

/*VARIABLE(S) GLOBAL(ES) DE VISTAPRINCIPAL*/
var VISTAPRINCIPAL = function(){
    this.datosVerificar;
    this.cantidadItem=0;
    this.palabraReservada="";
}

/*CARGAR ORDENES DE PRODUCCION QUE SE VAN A CREAR SU(S) ITEM(S)*/   
VISTAPRINCIPAL.prototype.mostrarOrProducACrear = function(){
    var boxPresAprobados="";
    
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarTodoOrdenes.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxPresAprobados+="<option value='' selected>Elegir Orden de Produccion</option>";
            $("#ordenesAprobados").html(boxPresAprobados);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxPresAprobados+="<option value='' selected>Elegir Orden de Produccion</option>";
            }else{
                for(var i=0; i<datos.length;i++){
                    var $codigo={'_codigo':datos[i].OPCODIGO, '_opcion':'cantidad'}
                    if(i==0){
                        boxPresAprobados+="<option value='' selected>Elegir Orden de Produccion</option>";
                    }
                    if(vPrincipal.datosExistentes($codigo)!=datos[i].OPNUM_ITEM){
                        boxPresAprobados+="<option value='"+datos[i].OPCODIGO+"'>"+datos[i].OPCODIGO+"</option>";
                    }
                }
            }
            $("#ordenesAprobados").html(boxPresAprobados);
        }
    });   
}

/* BUSCAR LO(S) ITEM(S) DE LA ORDEN DE PRODUCCION SELECCIONADO*/
VISTAPRINCIPAL.prototype.mostrarSubItemXOrProduccion = function(opcion){
    var boxSubItem="";
    var groupSubItem="";
    var codigoAenviar="";
    var $codigo={
        '_codigo': opcion 
    };
    var $datos={
        '_codigo':opcion,
        '_opcion':'cantidad'
    };
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarSubItemXOrdProduccion.php',
        type: 'POST',
        data: $codigo,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
              mostrarMensaje("error","Archivos no encontrados");
            }
            else{
              mostrarMensaje("error","Error no identificado");
            }
            boxSubItem+="<option value='0' selected>Elegir SubItem</option>";
            $("#subItems").html(boxSubItem);
        },
        success: function(datos){
          if(datos.response=="1"){
              boxSubItem+="<option value='0' selected>Elegir SubItem</option>";
          }else{
              boxSubItem+="<option value='0' selected>Elegir SubItem</option>";
                 for(var i=1; i<=datos.length;i++){
                     for(var j=0; j<datos.length;j++){
                         if(datos[j].ESTDESCRIPCION=='ACEPTADO'){
                             if(i==datos[j].ITPRESUCODIGO.split("-")[2]){
                                 groupSubItem += datos[j].ITPRESUDESCRIPCION + "-";
                                 codigoAenviar = datos[j].ITPRESUCODIGO;
                             }
                         } 
                     }
                     if(groupSubItem!=""){
                         groupSubItem = groupSubItem.substring(0,groupSubItem.length-1);
                         boxSubItem +="<option value='"+ codigoAenviar +"'>"+groupSubItem+"</option>";
                         vPrincipal.cantidadItem+=1;
                     }
                    groupSubItem="";
                }
              vPrincipal.cantidadItem=parseInt(vPrincipal.cantidadItem)-parseInt(vPrincipal.datosExistentes($datos));
              if(vPrincipal.cantidadItem==1){
                  vPrincipal.palabraReservada="*CAMBIO_DE_ESTADO";
              }
          }
            $("#subItems").html(boxSubItem);
        }
    });
  }
   
/*VERIFICAR CUANTOS ITEMS AUN FALTAN POR CREARSE (POR ORDEN DE PRODUCCION)*/
VISTAPRINCIPAL.prototype.datosExistentes = function($codigo){
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarItemXOrdProduccion.php',
        type: 'POST',
        async: false,
        data: $codigo,
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
            vPrincipal.datosVerificar = datos.CANTIDAD;
        }
    });  
    return vPrincipal.datosVerificar
}

/*VALIDACION Y PERMISO PARA MOSTRAR DATOS DEL ITEM SELECCIONADO*/
VISTAPRINCIPAL.prototype.mostrarDatosItem = function(){
    
    if ($("#subItems option:selected").text() != "Elegir SubItem"){
        codigo = $("#subItems").val();
        var $codigo={
            '_codigo': codigo 
        }
        $.ajax({
            url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarExistenciaDeItem.php',
            type: 'POST',
            data: $codigo,
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
              if(datos.response=="1"){
                  ventanaNuevaOrden(codigo.concat(vPrincipal.palabraReservada));
              }else{
                  $("#resultado").text("ORDEN DE PAPEL DEL ITEM SELECCIONADO YA CREADO");
              }
            }
        });
    }
}
  
/*OBJETO DE VISTAPRINCIPAL*/
var vPrincipal = new VISTAPRINCIPAL();

/*VARIABLE(S) GLOBAL(ES) DE NUEVAORDEN*/
var NUEVAORDEN = function(){
    this.precioItem = 0;
    this.codigoPres = "";
    this.cambioEstado = false;
};

/*FUNCION DE CARGAR DATOS GENERALES DEL ITEM*/
NUEVAORDEN.prototype.cargarDatos = function(codigo){
    
    var nombres="";
    var colores="";
    var tipImpre="";
    var detalle="";
    var acabados="";
    
    var $codigo={
        '_codigo' : codigo.split("*")[0]
   }
    
    if(codigo.split("*")[1]=="CAMBIO_DE_ESTADO"){slider0.cambioEstado=true;}
    
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_CargarDatosOrden.php',
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
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{      
                document.querySelector("#codigoOP").setAttribute("value",datos[0].OPCODIGO);
                $("#cliente option[value="+datos[0].CLIENCODIGO +"]").attr("selected",true);
                for (var i=0; i<datos.length;i++){
                    nombres+=datos[i].ITPRESUDESCRIPCION+"-";
                    detalle=slider0.generarAcabados(datos,i,detalle,colores,acabados,tipImpre);
                }
                document.querySelector("#nombreitem").setAttribute("value",nombres.substring(0,nombres.length-1) );
                document.querySelector("#cantidadPedido").setAttribute("value",datos[0].PRESUPCANT_ITEM);
                document.querySelector("#item").setAttribute("value",datos[0].ITPRESUCODIGO.split("-")[2]);
                document.querySelector("#codigoItem").setAttribute("value",datos[0].OPCODIGO+"-"+datos[0].ITPRESUCODIGO.split("-")[2] );
                $("#ejecutiva option[value="+datos[0].PRESUPVENDEDOR  +"]").attr("selected",true);
                document.querySelector("#detalle").innerText=detalle;
                slider0.codigoPres=datos[0].ITPRESUCODIGO;    
            }
        }
    });
}

/*FUNCION PARA GENERAR EL TEXTO DE ACABADOS (DETALLE)*/
NUEVAORDEN.prototype.generarAcabados = function(datos,i,detalle,colores,acabados,tipImpre){
    
    if(datos[i].ITPRESUIMPORTE.substr(0,1)=="S"){
        slider0.precioItem+=parseFloat(datos[i].ITPRESUIMPORTE.substr(3));
    }else{
        slider0.precioItem+=parseFloat(datos[i].ITPRESUIMPORTE.substr(1));
    }

    detalle+= datos[i].DETPRESUPTIRAJE_TOTAL + " UNIDADES " + datos[i].ITPRESUDESCRIPCION +" "+ datos[i].ITPRESUMEDIDAS+ " ";

    switch(datos[i].DETPRESUPNUM_COLOR){
      case ("1"):
            colores =" 1 COLOR ";
        break;
      case ("4"):
            colores = " FULL COLOR ";
        break;
        default: colores = datos[0].DETPRESUPNUM_COLOR +" colores "
    }

    detalle+=colores;
    colores="";

    switch(datos[i].DETPRESUPTIPO_IMPRESION){
      case ("1"):
            tipImpre =" SOLO TIRA ";
        break;
      case ("2"):
            tipImpre = " T/R APARTE ";
        break;
      case ("3"):
            tipImpre = " T/R JUNTA ";
        break;
      case ("4"):
            tipImpre = " DOBLE PINZA ";
        break;
    }

    detalle +=tipImpre
    tipImpre="";

    detalle+= " PAPEL " + datos[i].DETPRESUPTIP_PAPEL + " DE " + datos[i].DETPRESUPGRAMAJE + " GRAMOS"

    if (datos[i].DETPRESUPBARNIZ_PLASTI!=0 || datos[i].DETPRESUPBARNIZ_PLASTI!=null || datos[i].DETPRESUPBARNIZ_PLASTI.length!=0){acabados+=" "+datos[i].DETPRESUPBARNIZ_PLASTI;}

    if (datos[i].DETPRESUPBARNIZ_PLASTI1!=0 || datos[i].DETPRESUPBARNIZ_PLASTI1!=null || datos[i].DETPRESUPBARNIZ_PLASTI1.length!=0){acabados+=" "+datos[i].DETPRESUPBARNIZ_PLASTI1;}

    if (datos[i].DETPRESUPBARNIZ_PLASTI2!=0 || datos[i].DETPRESUPBARNIZ_PLASTI2!=null || datos[i].DETPRESUPBARNIZ_PLASTI2.length!=0){acabados+=" "+datos[i].DETPRESUPBARNIZ_PLASTI2;}

    if (datos[i].DETPRESUPTROQUEL!="-" || datos[i].DETPRESUPTROQUEL!=""){acabados+=" TROQUELADO - "+datos[i].DETPRESUPTROQUEL;}

    if (datos[i].DETPRESUPDOBLADO_ALCE!="NO"){acabados+=" DOBLADO - "+datos[i].DETPRESUPDOBLADO_ALCE;}

    if (datos[i].DETPRESUPCOSIDO_COLA_GRAPA!="NO"){acabados+=" ALCE - "+datos[i].DETPRESUPCOSIDO_COLA_GRAPA}

    if (datos[i].DETPRESUPCOSTO_COLA_FORRO!=0){acabados+=" ENCOLADO Y FORRAD";}

    if (datos[i].DETPRESUPCOSTO_CORTE!=0){acabados+=" DEGOLLADO Y CORTE";}

    if (datos[i].DETPRESUPCOSTO_ARMADO!=0){acabados+=" ARMADO Y PEGADO DE BOLSILLO";}

    if (datos[i].DETPRESUPCOSTO_OJAL!=0){acabados+=" PUESTA DE OJALILLOS";}

    if (datos[i].DETPRESUPCOSTO_NYLON!=0){acabados+=" NYLON 0.7mm";}

    detalle+=acabados;
    acabados="";
    
    return detalle
}

/*FUNCION PARA GUARDAR DATOS DE LA ORDEN DE PAPEL*/
NUEVAORDEN.prototype.obtenerDatos = function(){
    
    var array = new Array();
    var inputs = new Array();
    var otroArray = new Array();
    var detallePliego = new Array();


    $(".numero").parent("tr").find("td").find("select").each(function() {
        array.push($(this).val());
    });

    $(".numero").parent("tr").find("td").find("input").each(function() {
        inputs.push($(this).val());
    });

    if(array.length==1){
        for(var i=0;i<2;i++){
            array.push("0");
        }
    }else if(array.length==2){
        for(var i=0;i<1;i++){
        array.push("0");
        }
    }

    if(inputs.length==6){
        for(var i=0;i<12;i++){
            inputs.push("0");
        }
    }else if(inputs.length==12){
        for(var i=0;i<6;i++){
        inputs.push("0");
        }
    }

    var arrayFinal = array.concat(inputs);

    otroArray.push(arrayFinal[0],arrayFinal[3],arrayFinal[4],arrayFinal[5],arrayFinal[6],arrayFinal[7],arrayFinal[8],arrayFinal[1],arrayFinal[9],arrayFinal[10],arrayFinal[11],arrayFinal[12],arrayFinal[13],arrayFinal[14],arrayFinal[2],arrayFinal[15],arrayFinal[16],arrayFinal[17],arrayFinal[18],arrayFinal[19],arrayFinal[20]);


    $(".descripcion").parent("tr").find("td").find("input").each(function() {
        detallePliego.push($(this).val());
    });
     detallePliego.shift();
     detallePliego.shift();

    if(detallePliego.length==6){
        for(var i=1;i<24;i+=4){
            detallePliego.splice(i, 0, '0', '0', '0');
        }
    }else if(detallePliego.length==12){
        for(var i=2;i<24;i+=4){
            detallePliego.splice(i, 0, '0', '0');
        }
    }else if(detallePliego.length==18){
        for(var i=3;i<24;i+=4){
            detallePliego.splice(i, 0, '0');
        }
    }
    
    return [otroArray,detallePliego]
}

/*FUNCION DE VALIDACION DE DATOS DE LA ORDEN DE PAPEL*/
NUEVAORDEN.prototype.confirmarValidacion = function(otroArray,detallePliego){
    
    var answer = slider0.validar();
    if(answer == true){
        slider0.verificarCodigoOPa(otroArray,detallePliego);
    }
}

/*FUNCION PARA CONFIRMAR QUE LA VALIDACION ESTA CORRECTA*/
NUEVAORDEN.prototype.validar = function(){
    
    var empaquetado = document.getElementById('empaque').checked;
    var R1 = $("#grs1").val();
    var R2 = $("#hr1").val();
    var R3 = $("#medidaResma1").val();
    var R4 = $("#medidaCorte1").val();
    var R5 = $("#pliegosHoja1").val();
    var R6 = $("#panneau1").val();
    var R7 = $("#maquinas").val();
    var R8 = $("#cuadroa0").val();
    var R9 = $("#cuadroa1").val();
    var R10 = $("#cuadroa2").val();
    var R11 = $("#cuadroa3").val();
    var R12 = $("#cuadroa4").val();
    var R13 = $("#cuadroa5").val();
    var R14 = $("#colores").val();
    var R15 = $("#listadoTipoImpresion").val();
    var R16 = $("#nDePliegos").val();
    var R17 = $("#nDePlacas").val();
    var pinza = $("#pinza1").val();
    var R18 = pinza.split(":")[1];
    var R19 = $("#cantidad").val();
    
    if(R1 == null || R1.length == 0 || /^\s+$/.test(R1)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#grs1").focus();
    }
    else if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#hr1").focus();
    }
    else if(R3 == null || R3.length == 0 || /^\s+$/.test(R3)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#medidaResma1").focus();
    }
    else if(R4 == null || R4.length == 0 || /^\s+$/.test(R4)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#medidaCorte1").focus();
    }
    else if(R5 == null || R5.length == 0 || /^\s+$/.test(R5)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#pliegosHoja1").focus();
    }
    else if(R6 == null || R6.length == 0 || /^\s+$/.test(R6)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#panneau1").focus();
    }
    else if(R7 == null || R7.length == 0 || /^\s+$/.test(R7) || R7=="0"){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#maquinas").focus();
    }
    else if(R8 == null || R8.length == 0 || /^\s+$/.test(R8)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cuadroa0").focus();
    }
    else if(R9 == null || R9.length == 0 || /^\s+$/.test(R9)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cuadroa1").focus();
    }
    else if(R10 == null || R10.length == 0 || /^\s+$/.test(R10)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cuadroa2").focus();
    }
    else if(R11 == null || R11.length == 0 || /^\s+$/.test(R11)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cuadroa3").focus();
    }
    else if(R12 == null || R12.length == 0 || /^\s+$/.test(R12)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cuadroa4").focus();
    }
    else if(R13 == null || R13.length == 0 || /^\s+$/.test(R13)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cuadroa5").focus();
    }
    else if(R14 == null || R14.length == 0 || /^\s+$/.test(R14)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#colores").focus();
    }
    else if(R15 == null || R15.length == 0 || /^\s+$/.test(R15)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#listadoTipoImpresion").focus();
    }
    else if(R16 == null || R16.length == 0 || /^\s+$/.test(R16)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#nDePliegos").focus();
    }
    else if(R17 == null || R17.length == 0 || /^\s+$/.test(R17)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#nDePlacas").focus();
    }
    else if(R18 == null || R18.length == 0 || /^\s+$/.test(R18)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#pinza1").focus();
    }
    else if(R19 == null || R19.length == 0 || /^\s+$/.test(R19)){
        mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
        $("#cantidad").focus();
    }
    
    else if(empaquetado){
        var R19 = $("#inputPaquete1").val();
        var R20 = $("#inputUnid1").val();
        
        if(R19 == null || R19.length == 0 || /^\s+$/.test(R19)){
            mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
            $("#inputPaquete1").focus();
        }
        else if(R20 == null || R20.length == 0 || /^\s+$/.test(R20)){
            mostrarMensaje("advertencia","ADVERTENCIA: El campo no debe ir vacío o lleno solamente espacios en blanco");
            $("#inputUnid1").focus();
        }else{
            return true
        }
    }else{
        return true
    }
    
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE ORDEN DE PAPEL A REGISTRAR*/
NUEVAORDEN.prototype.verificarCodigoOPa =function (otroArray,detallePliego){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarCodigoOPA.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "OPA1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].OPACODIGO.substring(3));
                }else{
                    if(mayor < parseInt(datos[i].OPACODIGO.substring(3))){
                        mayor = parseInt(datos[i].OPACODIGO.substring(3));
                    }
                }

            }
              code= "OPA".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarOrPapel(otroArray,code,detallePliego);
      }
    });
    

    
}

/*FUNCION PARA GUARDAR LOS DATOS DE LA ORDEN DE PAPEL*/
NUEVAORDEN.prototype.guardarOrPapel = function(otroArray,code,detallePliego){
    
    var $personal={
        '_codigo' : code ,
        '_material1' : otroArray[0],
        '_gramos1' : otroArray[1],
        '_hojaResma1' : otroArray[2],
        '_medidaResma1' : otroArray[3],
        '_medidaCorte1' : otroArray[4],
        '_pliegoHoja1' : otroArray[5],
        '_panneau1' : otroArray[6],
        '_material2' : otroArray[7],
        '_gramos2' : otroArray[8],
        '_hojaResma2' : otroArray[9],
        '_medidaResma2' : otroArray[10],
        '_medidaCorte2' : otroArray[11],
        '_pliegoHoja2' : otroArray[12],
        '_panneau2' : otroArray[13],
        '_material3' : otroArray[14],
        '_gramos3' : otroArray[15],
        '_hojaResma3' : otroArray[16],
        '_medidaResma3' : otroArray[17],
        '_medidaCorte3' : otroArray[18],
        '_pliegoHoja3' : otroArray[19],
        '_panneau3' : otroArray[20],
    }
    
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarOrdenPapel.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.verificarCodigoDetPliego(detallePliego,code)
            }
        }
    });
    
   
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE DETALLE PLIEGO A REGISTRAR*/
NUEVAORDEN.prototype.verificarCodigoDetPliego = function(detallePliego,codigoOPA){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarCodigoDetPliego.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "DPL1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].DETPLIENUMERO.substring(3));
                }else{
                    if(mayor < parseInt(datos[i].DETPLIENUMERO.substring(3))){
                        mayor = parseInt(datos[i].DETPLIENUMERO.substring(3));
                    }
                }

            }
              code= "DPL".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarDetPliego(detallePliego,code,codigoOPA);
      }
    });
    
}

/*FUNCION PARA GUARDAR LOS DATOS DEL DETALLE PLIEGO*/
NUEVAORDEN.prototype.guardarDetPliego = function(detallePliego,code,codigoOPA){
    
    var $datos={
        '_codigo' : code ,
        '_descripcion1' : detallePliego[0],
        '_descripcion2' : detallePliego[1],
        '_descripcion3' : detallePliego[2],
        '_descripcion4' : detallePliego[3],
        '_medMaquina1' : detallePliego[4],
        '_medMaquina2' : detallePliego[5],
        '_medMaquina3' : detallePliego[6],
        '_medMaquina4' : detallePliego[7],
        '_cantMaquina1' : detallePliego[8],
        '_cantMaquina2' : detallePliego[9],
        '_cantMaquina3' : detallePliego[10],
        '_cantMaquina4' : detallePliego[11],
        '_demasiaMaquina1' : detallePliego[12],
        '_demasiaMaquina2' : detallePliego[13],
        '_demasiaMaquina3' : detallePliego[14],
        '_demasiaMaquina4' : detallePliego[15],
        '_totalPapelEntregado1' : detallePliego[16],
        '_totalPapelEntregado2' : detallePliego[17],
        '_totalPapelEntregado3' : detallePliego[18],
        '_totalPapelEntregado4' : detallePliego[19],
        '_totalHojaResma1' : detallePliego[20],
        '_totalHojaResma2' : detallePliego[21],
        '_totalHojaResma3' : detallePliego[22],
        '_totalHojaResma4' : detallePliego[23],
        '_codOPa' : codigoOPA,
        
    }    
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarDetPliego.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.verificarModelo(code)
            }
        }
    });
    
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE MODELO A REGISTRAR*/
NUEVAORDEN.prototype.verificarModelo = function(codigoDetPliego){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarModelo.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "MOD1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].MODCODIGO.substring(3));
                }else{
                    if(mayor < parseInt(datos[i].MODCODIGO.substring(3))){
                        mayor = parseInt(datos[i].MODCODIGO.substring(3));
                    }
                }

            }
              code= "MOD".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarModelo(code,codigoDetPliego);
      }
    });
    
}

/*FUNCION PARA GUARDAR LOS DATOS DEL MODELO*/
NUEVAORDEN.prototype.guardarModelo = function(code,codigoDetPliego){
    var rutaFoto1, nombreFoto1, rutaFoto2, nombreFoto2;
    if(document.getElementById("listadoTipoImpresion").value== "1"){
        rutaFoto2="";
        if(document.getElementById('fotoTira').files.length == 0){
          if(document.getElementById('imgfotoTira').src==""){
            rutaFoto1="";
          }else{
            nombreFoto1=document.getElementById('imgfotoTira').src.split("/img/");
            rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto1[1];
          }
        }else{
          rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoTira').files[0].name;
        }
    }else if(document.getElementById("listadoTipoImpresion").value== "3"){
        rutaFoto2="";
        if(document.getElementById('fotoTira').files.length == 0){
          if(document.getElementById('imgfotoTira').src==""){
            rutaFoto1="";
          }else{
            nombreFoto1=document.getElementById('imgfotoTira').src.split("/img/");
            rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto1[1];
          }
        }else{
          rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoTira').files[0].name;
        }    
    }else if(document.getElementById("listadoTipoImpresion").value== "2"){
        if(document.getElementById('fotoTira').files.length == 0){
          if(document.getElementById('imgfotoTira').src==""){
            rutaFoto1="";
          }else{
            nombreFoto1=document.getElementById('imgfotoTira').src.split("/img/");
            rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto1[1];
          }
        }else{
          rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoTira').files[0].name;
        } 
        
        if(document.getElementById('fotoRetira').files.length == 0){
          if(document.getElementById('imgfotoRetira').src==""){
            rutaFoto2="";
          }else{
            nombreFoto2=document.getElementById('imgfotoRetira').src.split("/img/");
            rutaFoto2="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto2[1];
          }
        }else{
          rutaFoto2="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoRetira').files[0].name;
        } 
    }
    
    var pliego = $("#maquinaMostrar").val();
    var nDePliegos = $("#nDePliegos").val();
    var nDePlacas = $("#nDePlacas").val();
    var pinza = $("#pinza1").val();
    var pinza1 = pinza.split(":")[1];
    var indicaciones = $("#indicaciones").val();
    var $datos={
        '_codigo' : code ,
        '_tamañoPliego' : pliego,
        '_numeroPliego' : nDePliegos,
        '_numeroPlaca' : nDePlacas,
        '_pinza' : pinza1,
        '_imagen1' : rutaFoto1,
        '_imagen2' : rutaFoto2,
        '_indicaciones' : indicaciones,
        
    }
        
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarModelo.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.guardarImagen();
                slider0.verificarImpresion(code,codigoDetPliego);
            }
        }
    }); 
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE IMPRESION A REGISTRAR*/
NUEVAORDEN.prototype.verificarImpresion = function(codigoModelo,codigoDetPliego){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarImpresion.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "IMP1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].IMPRENCODIGO.substring(3));
                }else{
                    if(mayor < parseInt(datos[i].IMPRENCODIGO.substring(3))){
                        mayor = parseInt(datos[i].IMPRENCODIGO.substring(3));
                    }
                }

            }
              code= "IMP".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarImpresion(code,codigoModelo,codigoDetPliego);
      }
    });
}

/*FUNCION PARA GUARDAR LOS DATOS DEL IMPRESION*/
NUEVAORDEN.prototype.guardarImpresion = function(code,codigoModelo,codigoDetPliego){
    
    var maquinas = $("#maquinas").val();
    var colorEspecial = $("#colorEspecial").val();
    var barnizOffset = $("#barnizOffset").val();
    var barnizAcrilico = $("#barnizAcrilico").val();
    var detallePapel = $("#detallePapel").val();
    
    var $datos={
        '_codigo' : code ,
        '_maquina' : maquinas,
        '_colorEspecial' : colorEspecial,
        '_barnizOffset' : barnizOffset,
        '_barnizAcrilico' : barnizAcrilico,
        '_observacion' : detallePapel,
        '_modelo' : codigoModelo,
        '_detPliego' : codigoDetPliego,
        
    }
    
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarImpresion.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.verificarPrePrensa(code);
            }
        }
    });
    
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE PREPRENSA A REGISTRAR*/
NUEVAORDEN.prototype.verificarPrePrensa = function(codigoImpresion){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarPrePrensa.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "PPRE1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].PPRENCODIGO.substring(4));
                }else{
                    if(mayor < parseInt(datos[i].PPRENCODIGO.substring(4))){
                        mayor = parseInt(datos[i].PPRENCODIGO.substring(4))
                    }
                }

            }
              code= "PPRE".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarPrePrensa(code,codigoImpresion);
      }
    });
}

/*FUNCION PARA GUARDAR LOS DATOS DEL PRE PRENSA*/
NUEVAORDEN.prototype.guardarPrePrensa = function(code,codigoImpresion){
    
    var isChecked1 = document.getElementById('pruebaColor').checked;
    var isChecked2 = document.getElementById('machote').checked;
    var isChecked3 = document.getElementById('laserBN').checked;
    if(isChecked1){isChecked1="SI";}else{isChecked1="NO";}
    if(isChecked2){isChecked2="SI";}else{isChecked2="NO";}
    if(isChecked3){isChecked3="SI";}else{isChecked3="NO";}    
    var fAbierto = $("#fAbierto").val();
    var fCerrado = $("#fCerrado").val();
    var selectColores = $("#selectColores").val();
    var colores = $("#colores").val();
    var lpi = $("#lpi").val();
    var listadoTipoImpresion = $("#listadoTipoImpresion").val();
    var listadoDuplicado = $("#listadoDuplicado").val();
    
    if(listadoDuplicado == undefined){
        listadoDuplicado="";
    }
    
    var $datos={
        '_codigo' : code ,
        '_pruebaColor' : isChecked1,
        '_machote' : isChecked2,
        '_laser' : isChecked3,
        '_fabierto' : fAbierto,
        '_fcerrado' : fCerrado,
        '_cantColor' : selectColores,
        '_descripcionColor' : colores,
        '_lpi' : lpi,
        '_tipImpresion1' : listadoTipoImpresion,
        '_tipImpresion2' : listadoDuplicado,
        '_impresion' : codigoImpresion,
        
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarPrePrensa.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.verificarDetAcabado(code);
                
            }
        }
    });
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE DETALLE ACABADO A REGISTRAR*/
NUEVAORDEN.prototype.verificarDetAcabado = function(codigoPrePrensa){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarDetAcabado.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "DACAB1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].DETACABCODIGO.substring(5));
                }else{
                    if(mayor < parseInt(datos[i].DETACABCODIGO.substring(5))){
                        mayor = parseInt(datos[i].DETACABCODIGO.substring(5));
                    }
                }

            }
              code= "DACAB".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarDetAcabado(code,codigoPrePrensa);
      }
    });
}

/*FUNCION PARA GUARDAR LOS DATOS DEL DETALLE ACABADO*/
NUEVAORDEN.prototype.guardarDetAcabado = function(code,codigoPrePrensa){
    
    var otros1input = $("#otros1input").val();
    var otros2input = $("#otros2input").val();
    var otros3input = $("#otros3input").val();
    
    var isChecked1 = document.getElementById('pegadoAcabado').checked;
    var isChecked2 = document.getElementById('corteFinalAcabado').checked;
    var isChecked3 = document.getElementById('refiladosAcabado').checked;
    var isChecked4 = document.getElementById('troqueladoAcabado').checked;
    var isChecked5 = document.getElementById('numeradoAcabado').checked;
    var isChecked6 = document.getElementById('perforadoAcabado').checked;
    var isChecked7 = document.getElementById('fajilladoAcabado').checked;
    var isChecked8 = document.getElementById('alceAcabado').checked;
    var isChecked9 = document.getElementById('contadoAcabado').checked;
    var isChecked10 = document.getElementById('contraplacadoAcabado').checked;
    
    
    if(isChecked1){isChecked1="SI";}else{isChecked1="NO";}
    if(isChecked2){isChecked2="SI";}else{isChecked2="NO";}
    if(isChecked3){isChecked3="SI";}else{isChecked3="NO";}
    if(isChecked4){isChecked4="SI";}else{isChecked4="NO";}
    if(isChecked5){isChecked5="SI";}else{isChecked5="NO";}
    if(isChecked6){isChecked6="SI";}else{isChecked6="NO";}
    if(isChecked7){isChecked7="SI";}else{isChecked7="NO";}
    if(isChecked8){isChecked8="SI";}else{isChecked8="NO";}
    if(isChecked9){isChecked9="SI";}else{isChecked9="NO";}
    if(isChecked10){isChecked10="SI";}else{isChecked10="NO";}

    if(otros2input==undefined){otros2input="";}
    if(otros3input==undefined){otros3input="";}
    
    var tipoDoblez = $("#tipoDoblez").val();
    var tipoCompaginado = $("#tipoCompaginado").val();
    var tipoEncolado = $("#tipoEncolado").val();
    var tipoBarniz = $("#tipoBarniz").val();
    var tipoPlastificado = $("#tipoPlastificado").val();
    
    var $datos={
        '_codigo' : code ,
        '_doblez' : tipoDoblez,
        '_compaginado' : tipoCompaginado,
        '_encolado' : tipoEncolado,
        '_barniz' : tipoBarniz,
        '_plastificado' : tipoPlastificado,
        '_Pegado' : isChecked1,
        '_corteFinal' : isChecked2,
        '_refilado' : isChecked3,
        '_troquelado' : isChecked4,
        '_numerado' : isChecked5,
        '_perforado' : isChecked6,
        '_fajillado' : isChecked7,
        '_alce' : isChecked8,
        '_contado' : isChecked9,
        '_contraplacado' : isChecked10,
        '_otro1' : otros1input,
        '_otro2' : otros2input,
        '_otro3' : otros3input,
        
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarDetAcabado.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.verificarEmpaquetado(code,codigoPrePrensa);
            }
        }
    });
}

/*FUNCION PARA CONSEGUIR EL CODIGO DE EMPAQUETADO A REGISTRAR*/
NUEVAORDEN.prototype.verificarEmpaquetado = function(codigoDetAcabado,codigoPrePrensa){
    
    var mayor;
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_VerificarEmpaquetado.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
          var code = "";
          if(datos.response == 0){
            code = "EMPAQ1";
          }else{
            for(var i=0; i< datos.length; i++){
                if(i==0){
                    mayor = parseInt(datos[i].EMPAQCODIGO.substring(5));
                }else{
                    if(mayor < parseInt(datos[i].EMPAQCODIGO.substring(5))){
                        mayor = parseInt(datos[i].EMPAQCODIGO.substring(5));
                    }
                }
                

            }
              code= "EMPAQ".concat((parseInt(mayor)+1).toString());
          }
          slider0.guardarEmpaquetado(code,codigoDetAcabado,codigoPrePrensa);
      }
    });
}

/*FUNCION PARA GUARDAR LOS DATOS DEL EMPAQUETADO*/
NUEVAORDEN.prototype.guardarEmpaquetado = function(code,codigoDetAcabado,codigoPrePrensa){
    
    var arrayCaja = new Array();
    var totalUnidades = 0;
    
    var isChecked1 = document.getElementById('caja').checked;
    var isChecked2 = document.getElementById('empaque').checked;
    
    $("#inputPaquete1").val()

    if(isChecked1){
        isChecked1="caja";
        for(var i=1; i<=10;i++){
            arrayCaja.push("0 de 0");     
        }
                
    switch($("#c").val()){
        case ("unidad"):
            totalUnidades = $("#cantidad").val();
        break;
        case("ciento"):
            totalUnidades = 100*parseInt($("#cantidad").val());
        break;
        case("millar"):
            totalUnidades = 1000*parseInt($("#cantidad").val());
        break;
    }
        
    }else{
        isChecked1="empaque";
        for(var i=1; i<=10;i++){
            if($("#inputPaquete"+i).val()==undefined && $("#inputUnid"+i).val()==undefined){
                arrayCaja.push("0 de 0");
            }else{
                arrayCaja.push($("#inputPaquete"+i).val()+" de "+$("#inputUnid"+i).val());
            }
            
        }
        totalUnidades=$("#totalFinalDatos").val();
    }
    
    var $datos={
        '_codigo' : code ,
        '_tipo' : isChecked1,
        '_cantEmpaq1' : arrayCaja[0],
        '_cantEmpaq2' : arrayCaja[1],
        '_cantEmpaq3' : arrayCaja[2],
        '_cantEmpaq4' : arrayCaja[3],
        '_cantEmpaq5' : arrayCaja[4],
        '_cantEmpaq6' : arrayCaja[5],
        '_cantEmpaq7' : arrayCaja[6],
        '_cantEmpaq8' : arrayCaja[7],
        '_cantEmpaq9' : arrayCaja[8],
        '_cantEmpaq10' : arrayCaja[9],
        '_totalUnidades' : totalUnidades,
        
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarEmpaquetado.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
                slider0.guardarItem(code,codigoDetAcabado,codigoPrePrensa);
            }
        }
    });
}

/*FUNCION PARA GUARDAR LOS DATOS DEL ITEM*/
NUEVAORDEN.prototype.guardarItem = function(codigoEmpaquetado,codigoDetAcabado,codigoPrePrensa){
    
    
    var OPCodigo = $("#codigoOP").val();
    var codigoItem = $("#codigoItem").val();
    var cantItem = $("#cantidad").val();
    var nombreItem = $("#nombreitem").val();
    var unidad = $("#c").val();
    var observacion = $("#textarea").val();
    var descripcionItem = $("#detalle").val();
    
    
    var $datos={
        '_codigoItem' : codigoItem ,
        '_detAcabado' : codigoDetAcabado,
        '_pPrenCodigo' : codigoPrePrensa,
        '_oProduccionCodigo' : OPCodigo,
        '_empaqCodigo' : codigoEmpaquetado,
        '_nombre' : nombreItem,
        '_descripcion' : descripcionItem,
        '_cantidad' : cantItem,
        '_unidadMedida' : unidad,
        '_importe' : slider0.precioItem,
        '_observacion' : observacion,
        '_numPresu': slider0.codigoPres 
    }
        
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarItem.php',
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
                if(slider0.cambioEstado==true){
                    slider0.actualizarEstado();
                }
                buscarNuevaOrden();
                
            }
        }
    });
}

/*FUNCION PARA ACTUALIZAR(CAMBIAR) EL ESTADO DE LA ORDEN DE PRODUCCION A 'PRE FACTURADA'*/
NUEVAORDEN.prototype.actualizarEstado=function(){
  
  var codPresupuesto = $("#codigoOP").val();
  var estado = 20
  
  var $datos={
        '_codigo' : codPresupuesto,
        '_estado' : estado  
    }  
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarEstadoOrden.php',
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
                //mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
            }
        }
    });
} 

/*FUNCION PARA CAMBIAR A SU EQUIVALENTE EN EL CAMPO DE 'UNIDAD'*/
NUEVAORDEN.prototype.cambioUnidad = function(){
    
    var cantidad = $("#cantidad").val();
    var unidad = $("#c").val();
    
    switch(unidadInicial) {
      case ("unidad"):
            if(unidad == "ciento"){
               cantidad = cantidad/100;
               }else if(unidad == "millar"){
                cantidad = cantidad/1000;
            }
        break;
      case ("ciento"):
            if(unidad == "unidad"){
               cantidad = cantidad*100;
               }else if(unidad == "millar"){
                cantidad = cantidad/10;
            }
        break;
      case ("millar"):
            if(unidad == "unidad"){
               cantidad = cantidad*1000;
               }else if(unidad == "ciento"){
                cantidad = cantidad*10;
            }
            
        break;
    }
    unidadInicial=unidad;
    $("#cantidad").val(cantidad);
}

/*FUNCION PARA HABILITAR LOS CAMPOS TIRA/RETIRA DEPENDIENDO DEL TIPO DE IMPRESION*/
NUEVAORDEN.prototype.tipoImpresion = function(tipImpresion){
    switch(parseInt(tipImpresion)) {
      case (1):
            $("#divTira").removeClass("d-none");  
            $("#divRetira").addClass("d-none");  
        break;
      case (2):
            $("#divTira").removeClass("d-none");  
            $("#divRetira").removeClass("d-none");  
        break;
      case (3):
            $("#divTira").removeClass("d-none");  
            $("#divRetira").addClass("d-none");  
        break;
      case (4):
            $("#pinzaSuperior1").removeClass("d-none");  
            $("#pinzaSuperior2").removeClass("d-none");  
        break;
    }          
}

/*FUNCION SELECCIONAR IMAGEN (TIRA O RETIRA)*/
NUEVAORDEN.prototype.seleccionarImagen = function(id){
    //--LLAMAR A FUNCION MOSTRAR IMAGEN AL CARGAR IMAGEN--    
    var inputFile = document.getElementById(id);
    inputFile.addEventListener('change', slider0.colocarImagen, false);
} 

/*FUNCION PARA COLOCAR LA IMAGEN SELECCIONADA EN EL DIV CORRESPONDIENTE*/
NUEVAORDEN.prototype.colocarImagen = function(event){
  var file = event.target.files[0];
  var consulta = event.target.attributes[1].nodeValue;
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = document.getElementById('img'+consulta);
    img.src= event.target.result;
  }
  reader.readAsDataURL(file);

}

/*FUNCION PARA GUARDAR IMAGEN(ES) SELLECIONADOS*/
NUEVAORDEN.prototype.guardarImagen = function(){
  var nuevoFormulario = new FormData();   
  $('#fotoTira').each(function() {
      if( document.getElementById("fotoTira").files.length != 0 ){
          var elemento= this;
            //Si recibe tipo archivo 'file'
            if(elemento.type === 'file'){
                  for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                      nuevoFormulario.append(elemento.name, $('#'+elemento.id).prop("files")[i]);
                   }     
             }
          $.ajax({
              url: "../CT-BackEnd/Controlador/ModOrden/Controlador_GuardarImagen.php",
              type: "POST",
              data: nuevoFormulario,
              contentType: false,
              processData: false,
              success: function(datos){
                  //mostrarMensaje("exito","REGISTRO EXITOSO! Imagen guardada correctamente.");
              }
          });
      }
  });
    
  var newForm = new FormData();
    $('#fotoRetira').each(function() {
        if( document.getElementById("fotoRetira").files.length != 0 ){
            var elemento= this;
            //Si recibe tipo archivo 'file'
            if(elemento.type === 'file'){
                  for(var i=0; i< $('#'+elemento.id).prop("files").length; i++){
                      nuevoFormulario.append(elemento.name, $('#'+elemento.id).prop("files")[i]);
                   }     
             }
            $.ajax({
              url: "../CT-BackEnd/Controlador/ModOrden/Controlador_GuardarImagen.php",
              type: "POST",
              data: nuevoFormulario,
              contentType: false,
              processData: false,
              success: function(datos){
                  mostrarMensaje("exito","REGISTRO EXITOSO! Imagen guardada correctamente.");
              }
          });
        }
  });
    
    
    
}

/*FUNCION AJUSTAR TEXTAREA*/   
NUEVAORDEN.prototype.autoTextarea = function (id) {
  document.getElementById(id).addEventListener('keyup', function() {
    this.style.overflow = 'hidden';
    this.style.height = 0;
    this.style.height = this.scrollHeight + 'px';
  }, false);
}

/*FUNCION PASAR VALOR DEL INPUT PLIEGO*/
NUEVAORDEN.prototype.fAgrega = function(){
    document.querySelector("#pliego").setAttribute("value",document.getElementById("medidaCorte1").value);
    document.querySelector("#cuadroa1").setAttribute("value",document.getElementById("medidaCorte1").value);
    document.querySelector("#cuadroa5").setAttribute("value",document.getElementById("hr1").value);
    document.querySelector("#pinza2").setAttribute("value",document.getElementById("pinza1").value);
    document.querySelector("#pinza1Superior").setAttribute("value",document.getElementById("pinza1").value);
    document.querySelector("#pinza2Superior").setAttribute("value",document.getElementById("pinza1").value);
}

/*CALCULAR EL IMPORTE TOTAL DE EMPAQUETADO*/  
NUEVAORDEN.prototype.multi=function(){
    var subtotal = 1;
    $(".monto1").each(function(){
        if((parseInt($(this).val()))==""){subtotal =0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal1").setAttribute("value",subtotal);
	});var sub1=document.getElementById("subtotal1").value;document.querySelector("#totalFinalDatos").setAttribute("value",sub1);
    
    subtotal=1;
    $(".monto2").each(function(){
        if((parseInt($(this).val()))==""){subtotal =0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal2").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal2")!=null){var sub2=document.getElementById("subtotal2").value;sub2=parseInt(sub1)+parseInt(sub2);document.querySelector("#totalFinalDatos").setAttribute("value",sub2);}
    
    
    subtotal=1;
    $(".monto3").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal3").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal3")!=null){var sub3=document.getElementById("subtotal3").value;sub3=parseInt(sub2)+parseInt(sub3);document.querySelector("#totalFinalDatos").setAttribute("value",sub3);}
    
    subtotal=1;
    $(".monto4").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal4").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal4")!=null){var sub4=document.getElementById("subtotal4").value;sub4=parseInt(sub3)+parseInt(sub4);document.querySelector("#totalFinalDatos").setAttribute("value",sub4);}
    
    subtotal=1;
    $(".monto5").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal5").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal5")!=null){var sub5=document.getElementById("subtotal5").value;sub5=parseInt(sub4)+parseInt(sub5);document.querySelector("#totalFinalDatos").setAttribute("value",sub5);}
    
    subtotal=1;
    $(".monto6").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal6").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal6")!=null){var sub6=document.getElementById("subtotal6").value;sub6=parseInt(sub5)+parseInt(sub6);document.querySelector("#totalFinalDatos").setAttribute("value",sub6);}
    
    subtotal=1;
    $(".monto7").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal7").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal7")!=null){var sub7=document.getElementById("subtotal7").value;sub7=parseInt(sub6)+parseInt(sub7);document.querySelector("#totalFinalDatos").setAttribute("value",sub7);}

    subtotal=1;
    $(".monto8").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal8").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal8")!=null){var sub8=document.getElementById("subtotal8").value;sub8=parseInt(sub7)+parseInt(sub8);document.querySelector("#totalFinalDatos").setAttribute("value",sub8);}
    
    subtotal=1;
    $(".monto9").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal9").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal9")!=null){var sub9=document.getElementById("subtotal9").value;sub9=parseInt(sub8)+parseInt(sub9);document.querySelector("#totalFinalDatos").setAttribute("value",sub9);}
    
    subtotal=1;
    $(".monto10").each(function(){
        if((parseInt($(this).val()))==""){subtotal=0;}else{subtotal*=parseInt($(this).val());}document.querySelector("#subtotal10").setAttribute("value",subtotal);
	});if(document.getElementById("subtotal10")!=null){var sub10=document.getElementById("subtotal10").value;sub10=parseInt(sub9)+parseInt(sub10);document.querySelector("#totalFinalDatos").setAttribute("value",sub10);}
}

/*FUNCION PARA PASAR VALOR DE SELECT MAQUINA A INPUT MAQUINA*/ 
NUEVAORDEN.prototype.pasarValorMaquina=function(){
    var tamaño=maquinas.length;
    var op=document.getElementById("maquinas"); 
    var text =op.options[op.selectedIndex].innerText;
    var tt=document.getElementById("maquinaMostrar"); 
    for (var i=0; i<tamaño; i++){
        if(i==0){
            tt.setAttribute("value","");
        }else{
            if (op.selectedIndex==i)tt.setAttribute("value",text);
        }
    }
}

/*GENERAR COLUMNAS DE LA TABLA DESCRIPCION*/    
NUEVAORDEN.prototype.createCell=function(cell,style,style2, style3,style4) {
    var input = document.createElement('input')
    input.setAttribute('class', style); 
    input.setAttribute('type',style2);
    input.setAttribute('id', style3);
    if(style4=="readonly"){input.setAttribute('readonly',style4);}
    input.setAttribute('onkeyup',style4);
    cell.appendChild(input); 
} 

/*FUNCION PARA REALIZAR SUMA DE CANTIDAD CON DEMASIA*/      
NUEVAORDEN.prototype.sumaTablaDescripcion=function(){
    var suma=0;
    $(".cantidad1").each(function(){
        if((parseInt($(this).val()))=="") {suma +=0;} else {suma+= parseInt($(this).val());}$("#cuadroa4").val(suma);});if(isNaN(suma)){ var cuadro="";$("#cuadroa4").val(cuadro);}
    suma=0;
    $(".cantidad2").each(function(){
        if((parseInt($(this).val()))=="") {suma +=0;} else {suma+= parseInt($(this).val());}$("#cuadrob4").val(suma);});if(isNaN(suma)){ var cuadro=""; $("#cuadrob4").val(cuadro);}
    suma=0;
    $(".cantidad3").each(function(){
        if((parseInt($(this).val()))=="") {suma +=0;} else {suma+= parseInt($(this).val());}$("#cuadroc4").val(suma);});if(isNaN(suma)){ var cuadro=""; $("#cuadroc4").val(cuadro);}
    suma=0;
    $(".cantidad4").each(function(){
        if((parseInt($(this).val()))=="") {suma +=0;} else {suma+= parseInt($(this).val());}$("#cuadrod4").val(suma);});if(isNaN(suma)){ var cuadro=""; $("#cuadrod4").val(cuadro);}
}

/*FUNCION PARA HABILITAR LOS INPUTS DE LA TABLA OTROS*/     
NUEVAORDEN.prototype.habilitarInput=function(id){
    if(document.getElementById(id).checked == true){
        document.getElementById(id+"input").disabled = false;
    }else{
        document.getElementById(id+"input").disabled = true;
    }
}

/*OBJETO DE NUEVAORDEN*/
var slider0 = new NUEVAORDEN();

var EDITARORDEN = function(){}

/*FUNCION CARGAR ORDEN(ES) DE PRODUCCION*/
EDITARORDEN.prototype.cargarOrdenProduccion = function(){
  var boxOrProduccion="";
  $.ajax({
    url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOpItem.php',
    type:'GET',
    dataType: 'json',
   error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
            boxOrProduccion+="<option value='0' selected>Elegir Orden de Produccion</option>";
            $("#orProduccion").html(boxOrProduccion);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxOrProduccion+="<option value='0' selected>Elegir Orden de Produccion</option>";
                $("#orProduccion").html(boxOrProduccion);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxOrProduccion+="<option value='0' selected>Elegir Orden de Produccion</option>";
                    }
                    boxOrProduccion+="<option value='"+datos[i].OPCODIGO+"'>"+datos[i].OPCODIGO+"</option>";
                }
                $("#orProduccion").html(boxOrProduccion);
            }
        }
  });
}

/*BUSCAR LOS ITEMS DE LA ORDEN DE PRODUCCION SELECCIONADO*/
EDITARORDEN.prototype.mostrarItemXOrProduccion = function(opcion){
    var boxItem="";
    var $codigo={
        '_codigo': opcion,
        '_opcion': 'datos'
    }
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarItemXOrdProduccion.php',
        type: 'POST',
        data: $codigo,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
              mostrarMensaje("error","Archivos no encontrados");
            }
            else{
              mostrarMensaje("error","Error no identificado");
            }
            boxItem+="<option value='0' selected>Elegir Item</option>";
            $("#item").html(boxItem);
        },
        success: function(datos){
          if(datos.response=="1"){
              boxItem+="<option value='0' selected>Elegir Item</option>";
              $("#item").html(boxItem);
          }else{
             for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxItem+="<option value='0' selected>Elegir Item</option>";
                    }
                    boxItem+="<option value='codigo-"+datos[i].ITEMNUMERO+"'>"+datos[i].ITEMNOMBRE+"</option>";
                }
                $("#item").html(boxItem);
          }
        }
    });
  } 
 
/*FUNCION PARA CARGAR DATOS EN LA VISTA DE EDITAR*/
EDITARORDEN.prototype.cargarDatosEditItem = function(codigo){
    
    $("#actualizar").removeClass("d-none");
    $("#guardar").addClass("d-none");
    
    var $codigo={
        '_codigo' : codigo,
   }
    
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_CargarDatosItem.php',
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
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                $("#codigoNumero").html(datos.ITEMNUMERO)
                //ORDEN DE PRODUCCION
                document.querySelector("#codigoOP").setAttribute("value",datos.OPCODIGO);
                $("#cliente option[value="+datos.CLIENCODIGO +"]").attr("selected",true);
                document.querySelector("#nombreitem").setAttribute("value",datos.ITEMNOMBRE );
                document.querySelector("#cantidad").setAttribute("value",datos.ITEMCANTIDAD );
                $("#c option[value="+document.getElementById("c").value+"]").attr("selected", false);
                $("#c option[value="+datos.ITEMUNID_MEDIDA+"]").attr("selected",true);
                //document.getElementById("detalle").value = datos.ITEMDESCRIPCION;
                document.querySelector("#detalle").innerText=datos.ITEMDESCRIPCION;
                document.querySelector("#cantidadPedido").setAttribute("value",datos.PRESUPCANT_ITEM);
                document.querySelector("#item").setAttribute("value",datos.NUM_PRESUP.split("-")[2]);
                document.querySelector("#codigoItem").setAttribute("value",datos.ITEMCODIGO );
                $("#ejecutiva option[value="+datos.PRESUPVENDEDOR+"]").attr("selected",true);
                unidadInicial=datos.ITEMUNID_MEDIDA;
                
                //PRE PRENSA
                if(datos.PPRENPRUEBA_COLOR=="SI"){document.querySelector("#pruebaColor").setAttribute("checked","true")}else{document.querySelector("#pruebaColor").removeAttribute("checked");};
                if(datos.PPRENMACHOTE=="SI"){document.querySelector("#machote").setAttribute("checked","true")}else{document.querySelector("#machote").removeAttribute("checked");};
                if(datos.PPRENLASER_BN =="SI"){document.querySelector("#laserBN").setAttribute("checked","true")}else{document.querySelector("#laserBN").removeAttribute("checked");};
                document.querySelector("#fAbierto").setAttribute("value",datos.PPRENFORMATO_ABIERTO);
                document.querySelector("#fCerrado").setAttribute("value",datos.PPRENFORMATO_CERRADO);
                $("#selectColores option[value="+datos.PPRENCANTIDAD_COLOR+"]").attr("selected",true);
                document.querySelector("#colores").setAttribute("value",datos.PPRENDESCRIPCION_COLOR);
                document.querySelector("#lpi").setAttribute("value",datos.PPRE_LPI);
                $("#listadoTipoImpresion option[value="+datos.PPRENTIPO_IMPRESION_1+"]").attr("selected",true);
                if(datos.PPRENTIPO_IMPRESION_1!=""){
                    switch(parseInt(datos.PPRENTIPO_IMPRESION_1)){
                      case (1):
                            document.getElementById('imgfotoTira').src = datos.MODIMAGEN1;
                      break;
                      case (2):
                            document.getElementById('imgfotoTira').src = datos.MODIMAGEN1;
                            document.getElementById('imgfotoRetira').src = datos.MODIMAGEN2;
                      break;
                      case (3):
                          document.getElementById('imgfotoTira').src = datos.MODIMAGEN1;
                      break;
                    }
                }
                slider0.tipoImpresion(datos.PPRENTIPO_IMPRESION_1);
                
                pasarValorImpresion(listadoTipoImpresion);
                if(datos.PPRENTIPO_IMPRESION_2!=""){
                    $("#añadirImpresion").click();
                    $("#listadoDuplicado option[value="+datos.PPRENTIPO_IMPRESION_2+"]").attr("selected",true);
                    slider0.tipoImpresion(datos.PPRENTIPO_IMPRESION_2);
                    pasarValorImpresion(listadoDuplicado);
                }
                if(datos.DETPRESUPQUALITY=="SI"){document.querySelector("#qualityPaper").setAttribute("checked","true")}else{document.querySelector("#qualityPaper").removeAttribute("checked");}
                if(datos.DETPRESUPCONTRATO=="SI"){document.querySelector("#contratoMarco").setAttribute("checked","true")}else{document.querySelector("#contratoMarco").removeAttribute("checked");}
                
                //EMPAQUETADO
                if(datos.EMPAQTIPO=="caja"){
                    $("#caja").click();
                }else{
                    $("#empaque").click();
                    if(datos.EMPAQCANT_PAQ1!="0 de 0"){
                        var paquetes = datos.EMPAQCANT_PAQ1.split(" de ");
                        document.querySelector("#inputPaquete1").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid1").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ2!="0 de 0"){
                        $("#añadirCosto").click();
                        paquetes = datos.EMPAQCANT_PAQ2.split(" de ");
                        document.querySelector("#inputPaquete2").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid2").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ3!="0 de 0"){
                        $("#añadirCosto").click();
                        paquetes = datos.EMPAQCANT_PAQ3.split(" de ");
                        document.querySelector("#inputPaquete3").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid3").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ4!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ4.split(" de ");
                        document.querySelector("#inputPaquete4").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid4").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ5!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ5.split(" de ");
                        document.querySelector("#inputPaquete5").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid5").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ6!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ6.split(" de ");
                        document.querySelector("#inputPaquete6").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid6").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ7!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ7.split(" de ");
                        document.querySelector("#inputPaquete7").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid7").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ8!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ8.split(" de ");
                        document.querySelector("#inputPaquete8").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid8").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ9!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ9.split(" de ");
                        document.querySelector("#inputPaquete9").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid9").setAttribute("value",paquetes[1]);
                    }
                    if(datos.EMPAQCANT_PAQ10!="0 de 0"){
                        $("#añadirCosto").click();
                        var paquetes = datos.EMPAQCANT_PAQ10.split(" de ");
                        document.querySelector("#inputPaquete10").setAttribute("value",paquetes[0]);
                        document.querySelector("#inputUnid10").setAttribute("value",paquetes[1]);
                    }
                    slider0.multi();
                }
                
                //ORDEN DE PAPEL
                //$("#tablaSuperior select:eq(0)").val(datos.OPAMATERIAL1);
                $("#tablaSuperior select:eq(0) option[value="+datos.OPAMATERIAL1+"]").attr("selected",true);
                document.querySelector("#grs1").setAttribute("value",datos.OPAGRAMOS1);
                document.querySelector("#hr1").setAttribute("value",datos.OPAHOJA_RESMA1);
                document.querySelector("#medidaResma1").setAttribute("value",datos.OPAMEDIDA_RESMA1);
                document.querySelector("#medidaCorte1").setAttribute("value",datos.OPAMEDIDA_CORTE1);
                document.querySelector("#pliegosHoja1").setAttribute("value",datos.OPAPLIEGO_HOJA1);
                document.querySelector("#panneau1").setAttribute("value",datos.OPAPANNEAU1);
                
                if(datos.OPAMATERIAL2!="0"){
                    $("#agregar").click();
                    $("#material2 option[value="+document.getElementById("material2").value+"]").attr("selected", false);
                    $("#tablaSuperior select:eq(1) option[value="+datos.OPAMATERIAL2+"]").attr("selected",true);
                    document.querySelector("#grs2").setAttribute("value",datos.OPAGRAMOS2);
                    document.querySelector("#hr2").setAttribute("value",datos.OPAHOJA_RESMA2);
                    document.querySelector("#medidaResma2").setAttribute("value",datos.OPAMEDIDA_RESMA2);
                    document.querySelector("#medidaCorte2").setAttribute("value",datos.OPAMEDIDA_CORTE2);
                    document.querySelector("#pliegosHoja2").setAttribute("value",datos.OPAPLIEGO_HOJA2);
                    document.querySelector("#panneau2").setAttribute("value",datos.OPAPANNEAU2);
                }
                
                if(datos.OPAMATERIAL3!="0"){
                    $("#agregar").click();
                    $("#material3 option[value="+document.getElementById("material3").value+"]").attr("selected", false);
                    $("#tablaSuperior select:eq(2) option[value="+datos.OPAMATERIAL3+"]").attr("selected",true);
                    document.querySelector("#grs3").setAttribute("value",datos.OPAGRAMOS3);
                    document.querySelector("#hr3").setAttribute("value",datos.OPAHOJA_RESMA3);
                    document.querySelector("#medidaResma3").setAttribute("value",datos.OPAMEDIDA_RESMA3);
                    document.querySelector("#medidaCorte3").setAttribute("value",datos.OPAMEDIDA_CORTE3);
                    document.querySelector("#pliegosHoja3").setAttribute("value",datos.OPAPLIEGO_HOJA3);
                    document.querySelector("#panneau3").setAttribute("value",datos.OPAPANNEAU3);
                }
                
                //IMPRESION
                document.querySelector("#detallePapel").setAttribute("value",datos.IMPRENOBSERVACION);
                $("#maquinas option[value="+datos.MAQUICODIGO+"]").attr("selected",true);
                slider0.pasarValorMaquina();
                document.querySelector("#colorEspecial").setAttribute("value",datos.IMPRENCOLOR_ESPECIAL);
                $("#barnizOffset option[value="+document.getElementById("barnizOffset").value+"]").attr("selected", false);
                $("#barnizOffset option[value="+datos.IMPRENBARNIZ_OFFSET+"]").attr("selected",true);
                $("#barnizAcrilico option[value="+document.getElementById("barnizAcrilico").value+"]").attr("selected", false);
                $("#barnizAcrilico option[value="+datos.IMPRENBARNIZ_ACRILICO+"]").attr("selected",true);
                
                //DETALLE PLIEGO
                if(datos.DETPLIETOTAL_PAPEL_ENTREGADO1!="0"){
                    document.querySelector("#cuadroa0").setAttribute("value",datos.DETPLIEDESCRIPCION1);
                    document.querySelector("#cuadroa1").setAttribute("value",datos.DETPLIEMED_MAQUINA1);
                    document.querySelector("#cuadroa2").setAttribute("value",datos.DETPLIECANT_MAQUINA1);
                    document.querySelector("#cuadroa3").setAttribute("value",datos.DETPLIEDEMASIA_MAQUINA1);
                    document.querySelector("#cuadroa4").setAttribute("value",datos.DETPLIETOTAL_PAPEL_ENTREGADO1);
                    document.querySelector("#cuadroa5").setAttribute("value",datos.DETPLIETOTAL_HOJA_RESMA1);
                }
                
                if(datos.DETPLIETOTAL_PAPEL_ENTREGADO2!="0"){
                    $("#añadir").click();
                    document.querySelector("#cuadrob0").setAttribute("value",datos.DETPLIEDESCRIPCION2);
                    document.querySelector("#cuadrob1").setAttribute("value",datos.DETPLIEMED_MAQUINA2);
                    document.querySelector("#cuadrob2").setAttribute("value",datos.DETPLIECANT_MAQUINA2);
                    document.querySelector("#cuadrob3").setAttribute("value",datos.DETPLIEDEMASIA_MAQUINA2);
                    document.querySelector("#cuadrob4").setAttribute("value",datos.DETPLIETOTAL_PAPEL_ENTREGADO2);
                    document.querySelector("#cuadrob5").setAttribute("value",datos.DETPLIETOTAL_HOJA_RESMA2);
                }
                
                if(datos.DETPLIETOTAL_PAPEL_ENTREGADO3!="0"){
                    $("#añadir").click();
                    document.querySelector("#cuadroc0").setAttribute("value",datos.DETPLIEDESCRIPCION3);
                    document.querySelector("#cuadroc1").setAttribute("value",datos.DETPLIEMED_MAQUINA3);
                    document.querySelector("#cuadroc2").setAttribute("value",datos.DETPLIECANT_MAQUINA3);
                    document.querySelector("#cuadroc3").setAttribute("value",datos.DETPLIEDEMASIA_MAQUINA3);
                    document.querySelector("#cuadroc4").setAttribute("value",datos.DETPLIETOTAL_PAPEL_ENTREGADO3);
                    document.querySelector("#cuadroc5").setAttribute("value",datos.DETPLIETOTAL_HOJA_RESMA3);
                }
                
                if(datos.DETPLIETOTAL_PAPEL_ENTREGADO4!="0"){
                    $("#añadir").click();
                    document.querySelector("#cuadrod0").setAttribute("value",datos.DETPLIEDESCRIPCION4);
                    document.querySelector("#cuadrod1").setAttribute("value",datos.DETPLIEMED_MAQUINA4);
                    document.querySelector("#cuadrod2").setAttribute("value",datos.DETPLIECANT_MAQUINA4);
                    document.querySelector("#cuadrod3").setAttribute("value",datos.DETPLIEDEMASIA_MAQUINA4);
                    document.querySelector("#cuadrod4").setAttribute("value",datos.DETPLIETOTAL_PAPEL_ENTREGADO4);
                    document.querySelector("#cuadrod5").setAttribute("value",datos.DETPLIETOTAL_HOJA_RESMA4);
                }
                
                //DETALLE ACABADO
                $("#tipoBarniz option[value="+document.getElementById("tipoBarniz").value+"]").attr("selected", false);
                $("#tipoBarniz option[value="+datos.DETACABTIPO_BARNIZADO+"]").attr("selected",true);
                $("#tipoPlastificado option[value="+document.getElementById("tipoPlastificado").value+"]").attr("selected", false);
                $("#tipoPlastificado option[value="+datos.DETACABTIPO_PLASTIFICADO+"]").attr("selected",true);
                $("#tipoDoblez option[value="+document.getElementById("tipoDoblez").value+"]").attr("selected", false);
                $("#tipoDoblez option[value="+datos.DETACABTIPO_DOBLEZ+"]").attr("selected",true);
                $("#tipoCompaginado option[value="+document.getElementById("tipoCompaginado").value+"]").attr("selected", false);
                $("#tipoCompaginado option[value="+datos.DETACABTIPO_COMPAGINADO+"]").attr("selected",true);
                $("#tipoEncolado option[value="+document.getElementById("tipoEncolado").value+"]").attr("selected", false);
                $("#tipoEncolado option[value="+datos.DETACABTIPO_ENCOLADO+"]").attr("selected",true);
                if(datos.DETACABTIPO_PEGADO=="SI"){document.querySelector("#pegadoAcabado").setAttribute("checked","true")}else{document.querySelector("#pegadoAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_CORTE=="SI"){document.querySelector("#corteFinalAcabado").setAttribute("checked","true")}else{document.querySelector("#corteFinalAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_REFILADO=="SI"){document.querySelector("#refiladosAcabado").setAttribute("checked","true")}else{document.querySelector("#refiladosAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_TROQUELADO=="SI"){document.querySelector("#troqueladoAcabado").setAttribute("checked","true")}else{document.querySelector("#troqueladoAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_NUMERADO=="SI"){document.querySelector("#numeradoAcabado").setAttribute("checked","true")}else{document.querySelector("#numeradoAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_PERFORADO=="SI"){document.querySelector("#perforadoAcabado").setAttribute("checked","true")}else{document.querySelector("#perforadoAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_FAJILLADO=="SI"){document.querySelector("#fajilladoAcabado").setAttribute("checked","true")}else{document.querySelector("#fajilladoAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_ALCE=="SI"){document.querySelector("#alceAcabado").setAttribute("checked","true")}else{document.querySelector("#alceAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_CONTADO=="SI"){document.querySelector("#contadoAcabado").setAttribute("checked","true")}else{document.querySelector("#contadoAcabado").removeAttribute("checked");}
                if(datos.DETACABTIPO_CONTRAPLACADO=="SI"){document.querySelector("#contraplacadoAcabado").setAttribute("checked","true")}else{document.querySelector("#contraplacadoAcabado").removeAttribute("checked");}
                        
                if(datos.DETACABTIPOOTROS1!=""){
                    $('#otros1').click();
                    document.querySelector("#otros1").setAttribute("checked","true");
                    document.querySelector("#otros1input").setAttribute("value",datos.DETACABTIPOOTROS1);
                }else{
                     document.querySelector("#otros1").setAttribute("checked","false");
                    document.querySelector("#otros1input").removeAttribute("value");
                }
                $("#otros1").each(function() {$(this).prop( "disabled", true );});
                if(datos.DETACABTIPOOTROS2!=""){
                    $("#añadirOtros").click();
                    $('#otros2').click();
                    document.querySelector("#otros2").setAttribute("checked","true");
                    document.querySelector("#otros2input").setAttribute("value",datos.DETACABTIPOOTROS2);
                    $("#otros2").each(function() {$(this).prop( "disabled", true );});
                }
                if(datos.DETACABTIPOOTROS3!=""){
                    $("#añadirOtros").click();
                    $('#otros3').click();
                    document.querySelector("#otros3").setAttribute("checked","true");
                    document.querySelector("#otros3input").setAttribute("value",datos.DETACABTIPOOTROS3);
                    $("#otros3").each(function() {$(this).prop( "disabled", true );});
                }
                
                document.querySelector("#textarea").innerText=datos.ITEMOBSERVACION;
                
                //MODELO
                document.querySelector("#nDePliegos").setAttribute("value",datos.MODNUMERO_PLIEGO);//CAMBIO DEPENDE DEL SELECT
                document.querySelector("#nDePlacas").setAttribute("value",datos.MODNUMERO_PLACA);
                document.querySelector("#indicaciones").innerText=datos.MODINDICACIONES;
                document.querySelector("#pinza1").setAttribute("value","PINZA :"+datos.MODPINZA);
                slider0.fAgrega();
                
                
            }
        }
    });
    
}

/*FUNCION QUE ORDENA A TODOS LOS BLOQUES DE INFO A QUE SE ACTUALICEN*/
EDITARORDEN.prototype.codigosPrincipales = function(codigo,first,second){
    
    var $codigo={
        '_codigo' : codigo
   }
    
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_CargarDatosItem.php',
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
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                slider1.actualizarOrPapel(datos.OPACODIGO,first,second);
                slider1.actualizarDetPliego(datos.DETPLIENUMERO,second);
                slider1.actualizarModelo(datos.MODCODIGO);
                slider1.actualizarImpresion(datos.IMPRENCODIGO);
                slider1.actualizarPrePrensa(datos.PPRENCODIGO);
                slider1.actualizarDetAcabado(datos.DETACABCODIGO);
                slider1.actualizarEmpaquetado(datos.EMPAQCODIGO);
                slider1.actualizarItem(datos.ITEMCODIGO)
            }
        }
    });
    
}

/*FUNCION PARA ACTUALIZAR LA TABLA ORDEN DE PAPEL*/
EDITARORDEN.prototype.actualizarOrPapel = function(code,otroArray,detallePliego){
      
    var $personal={
        '_codigo' : code ,
        '_material1' : otroArray[0],
        '_gramos1' : otroArray[1],
        '_hojaResma1' : otroArray[2],
        '_medidaResma1' : otroArray[3],
        '_medidaCorte1' : otroArray[4],
        '_pliegoHoja1' : otroArray[5],
        '_panneau1' : otroArray[6],
        '_material2' : otroArray[7],
        '_gramos2' : otroArray[8],
        '_hojaResma2' : otroArray[9],
        '_medidaResma2' : otroArray[10],
        '_medidaCorte2' : otroArray[11],
        '_pliegoHoja2' : otroArray[12],
        '_panneau2' : otroArray[13],
        '_material3' : otroArray[14],
        '_gramos3' : otroArray[15],
        '_hojaResma3' : otroArray[16],
        '_medidaResma3' : otroArray[17],
        '_medidaCorte3' : otroArray[18],
        '_pliegoHoja3' : otroArray[19],
        '_panneau3' : otroArray[20],
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarOrPapel.php',
        type: 'POST',
        data: $personal,
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
                 //mostrarMensaje("exito","DETALLE CONTRATO ACTUALIZADO");
            }
        }
    });
}

/*FUNCION PARA ACTUALIZAR LA TABLA DETALLE PLIEGO*/
EDITARORDEN.prototype.actualizarDetPliego = function(code,detallePliego){
    
    var $datos={
        '_codigo' : code ,
        '_descripcion1' : detallePliego[0],
        '_descripcion2' : detallePliego[1],
        '_descripcion3' : detallePliego[2],
        '_descripcion4' : detallePliego[3],
        '_cantMaquina1' : detallePliego[4],
        '_cantMaquina2' : detallePliego[5],
        '_cantMaquina3' : detallePliego[6],
        '_cantMaquina4' : detallePliego[7],
        '_medMaquina1' : detallePliego[8],
        '_medMaquina2' : detallePliego[9],
        '_medMaquina3' : detallePliego[10],
        '_medMaquina4' : detallePliego[11],
        '_demasiaMaquina1' : detallePliego[12],
        '_demasiaMaquina2' : detallePliego[13],
        '_demasiaMaquina3' : detallePliego[14],
        '_demasiaMaquina4' : detallePliego[15],
        '_totalPapelEntregado1' : detallePliego[16],
        '_totalPapelEntregado2' : detallePliego[17],
        '_totalPapelEntregado3' : detallePliego[18],
        '_totalPapelEntregado4' : detallePliego[19],
        '_totalHojaResma1' : detallePliego[20],
        '_totalHojaResma2' : detallePliego[21],
        '_totalHojaResma3' : detallePliego[22],
        '_totalHojaResma4' : detallePliego[23],        
    } 
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarDetPliego.php',
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
                
                               
            }
        }
    });
    
}

/*FUNCION PARA ACTUALIZAR LA TABLA MODELO*/
EDITARORDEN.prototype.actualizarModelo = function(code){
    
    var rutaFoto1, nombreFoto1, rutaFoto2, nombreFoto2;
    if(document.getElementById("listadoTipoImpresion").value== "1"){
        rutaFoto2="";
        if(document.getElementById('fotoTira').files.length == 0){
          if(document.getElementById('imgfotoTira').src==""){
            rutaFoto1="";
          }else{
            nombreFoto1=document.getElementById('imgfotoTira').src.split("/img/");
            rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto1[1];
          }
        }else{
          rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoTira').files[0].name;
        }
    }else if(document.getElementById("listadoTipoImpresion").value== "3"){
        rutaFoto2="";
        if(document.getElementById('fotoTira').files.length == 0){
          if(document.getElementById('imgfotoTira').src==""){
            rutaFoto1="";
          }else{
            nombreFoto1=document.getElementById('imgfotoTira').src.split("/img/");
            rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto1[1];
          }
        }else{
          rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoTira').files[0].name;
        }    
    }else if(document.getElementById("listadoTipoImpresion").value== "2"){
        if(document.getElementById('fotoTira').files.length == 0){
          if(document.getElementById('imgfotoTira').src==""){
            rutaFoto1="";
          }else{
            nombreFoto1=document.getElementById('imgfotoTira').src.split("/img/");
            rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto1[1];
          }
        }else{
          rutaFoto1="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoTira').files[0].name;
        } 
        
        if(document.getElementById('fotoRetira').files.length == 0){
          if(document.getElementById('imgfotoRetira').src==""){
            rutaFoto2="";
          }else{
            nombreFoto2=document.getElementById('imgfotoRetira').src.split("/img/");
            rutaFoto2="../CT-FrontEnd/Modulos/ModOrden/img/"+nombreFoto2[1];
          }
        }else{
          rutaFoto2="../CT-FrontEnd/Modulos/ModOrden/img/"+document.getElementById('fotoRetira').files[0].name;
        } 
    }
    
    var pliego = $("#maquinaMostrar").val();
    var nDePliegos = $("#nDePliegos").val();
    var nDePlacas = $("#nDePlacas").val();
    var pinza = $("#pinza1").val();
    var pinza1 = pinza.split(":")[1];
    var indicaciones = $("#indicaciones").val();
    var $datos={
        '_codigo' : code ,
        '_tamañoPliego' : pliego,
        '_numeroPliego' : nDePliegos,
        '_numeroPlaca' : nDePlacas,
        '_pinza' : pinza1,
        '_imagen1' : rutaFoto1,
        '_imagen2' : rutaFoto2,
        '_indicaciones' : indicaciones,   
    }
    
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarModelo.php',
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
                slider0.guardarImagen();
                               
            }
        }
    });
}

/*FUNCION PARA ACTUALIZAR LA TABLA IMPRESION*/
EDITARORDEN.prototype.actualizarImpresion = function(code){
    
    var maquinas = $("#maquinas").val();
    var colorEspecial = $("#colorEspecial").val();
    var barnizOffset = $("#barnizOffset").val();
    var barnizAcrilico = $("#barnizAcrilico").val();
    var detallePapel = $("#detallePapel").val();
    
    var $datos={
        '_codigo' : code ,
        '_maquina' : maquinas,
        '_colorEspecial' : colorEspecial,
        '_barnizOffset' : barnizOffset,
        '_barnizAcrilico' : barnizAcrilico,
        '_observacion' : detallePapel, 
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarImpresion.php',
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
                
                               
            }
        }
    });
    
}

/*FUNCION PARA ACTUALIZAR LA TABLA PRE PRENSA*/
EDITARORDEN.prototype.actualizarPrePrensa = function(code){
    
    var isChecked1 = document.getElementById('pruebaColor').checked;
    var isChecked2 = document.getElementById('machote').checked;
    var isChecked3 = document.getElementById('laserBN').checked;
    if(isChecked1){isChecked1="SI";}else{isChecked1="NO";}
    if(isChecked2){isChecked2="SI";}else{isChecked2="NO";}
    if(isChecked3){isChecked3="SI";}else{isChecked3="NO";}    
    var fAbierto = $("#fAbierto").val();
    var fCerrado = $("#fCerrado").val();
    var selectColores = $("#selectColores").val();
    var colores = $("#colores").val();
    var lpi = $("#lpi").val();
    var listadoTipoImpresion = $("#listadoTipoImpresion").val();
    var listadoDuplicado = $("#listadoDuplicado").val();
    
    if(listadoDuplicado == undefined){
        listadoDuplicado="";
    }
    
    var $datos={
        '_codigo' : code ,
        '_pruebaColor' : isChecked1,
        '_machote' : isChecked2,
        '_laser' : isChecked3,
        '_fabierto' : fAbierto,
        '_fcerrado' : fCerrado,
        '_cantColor' : selectColores,
        '_descripcionColor' : colores,
        '_lpi' : lpi,
        '_tipImpresion1' : listadoTipoImpresion,
        '_tipImpresion2' : listadoDuplicado,
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarPrePrensa.php',
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
                
                               
            }
        }
    });
    
    
}

/*FUNCION PARA ACTUALIZAR LA TABLA DETALLE ACABADO*/
EDITARORDEN.prototype.actualizarDetAcabado = function(code){
    
    var otros1input = $("#otros1input").val();
    var otros2input = $("#otros2input").val();
    var otros3input = $("#otros3input").val();
    
    var isChecked1 = document.getElementById('pegadoAcabado').checked;
    var isChecked2 = document.getElementById('corteFinalAcabado').checked;
    var isChecked3 = document.getElementById('refiladosAcabado').checked;
    var isChecked4 = document.getElementById('troqueladoAcabado').checked;
    var isChecked5 = document.getElementById('numeradoAcabado').checked;
    var isChecked6 = document.getElementById('perforadoAcabado').checked;
    var isChecked7 = document.getElementById('fajilladoAcabado').checked;
    var isChecked8 = document.getElementById('alceAcabado').checked;
    var isChecked9 = document.getElementById('contadoAcabado').checked;
    var isChecked10 = document.getElementById('contraplacadoAcabado').checked;
    
    
    if(isChecked1){isChecked1="SI";}else{isChecked1="NO";}
    if(isChecked2){isChecked2="SI";}else{isChecked2="NO";}
    if(isChecked3){isChecked3="SI";}else{isChecked3="NO";}
    if(isChecked4){isChecked4="SI";}else{isChecked4="NO";}
    if(isChecked5){isChecked5="SI";}else{isChecked5="NO";}
    if(isChecked6){isChecked6="SI";}else{isChecked6="NO";}
    if(isChecked7){isChecked7="SI";}else{isChecked7="NO";}
    if(isChecked8){isChecked8="SI";}else{isChecked8="NO";}
    if(isChecked9){isChecked9="SI";}else{isChecked9="NO";}
    if(isChecked10){isChecked10="SI";}else{isChecked10="NO";}

    if(otros2input==undefined){otros2input="";}
    if(otros3input==undefined){otros3input="";}
    
    var tipoDoblez = $("#tipoDoblez").val();
    var tipoCompaginado = $("#tipoCompaginado").val();
    var tipoEncolado = $("#tipoEncolado").val();
    var tipoBarniz = $("#tipoBarniz").val();
    var tipoPlastificado = $("#tipoPlastificado").val();
    
    var $datos={
        '_codigo' : code ,
        '_doblez' : tipoDoblez,
        '_compaginado' : tipoCompaginado,
        '_encolado' : tipoEncolado,
        '_barniz' : tipoBarniz,
        '_plastificado' : tipoPlastificado,
        '_Pegado' : isChecked1,
        '_corteFinal' : isChecked2,
        '_refilado' : isChecked3,
        '_troquelado' : isChecked4,
        '_numerado' : isChecked5,
        '_perforado' : isChecked6,
        '_fajillado' : isChecked7,
        '_alce' : isChecked8,
        '_contado' : isChecked9,
        '_contraplacado' : isChecked10,
        '_otro1' : otros1input,
        '_otro2' : otros2input,
        '_otro3' : otros3input,  
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarDetAcabado.php',
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
                
                               
            }
        }
    });
    
}

/*FUNCION PARA ACTUALIZAR LA TABLA EMPAQUETADO*/
EDITARORDEN.prototype.actualizarEmpaquetado = function(code){
    
    var arrayCaja = new Array();
    var totalUnidades = 0;
    
    var isChecked1 = document.getElementById('caja').checked;
    var isChecked2 = document.getElementById('empaque').checked;
    
    $("#inputPaquete1").val()

    if(isChecked1){
        isChecked1="caja";
        for(var i=1; i<=10;i++){
            arrayCaja.push("0 de 0");     
        }
        totalUnidades=0;
    }else{
        isChecked1="empaque";
        for(var i=1; i<=10;i++){
            if($("#inputPaquete"+i).val()==undefined && $("#inputUnid"+i).val()==undefined){
                arrayCaja.push("0 de 0");
            }else{
                arrayCaja.push($("#inputPaquete"+i).val()+" de "+$("#inputUnid"+i).val());
            }
            
        }
        totalUnidades=$("#totalFinalDatos").val();
    }
    
    var $datos={
        '_codigo' : code ,
        '_tipo' : isChecked1,
        '_cantEmpaq1' : arrayCaja[0],
        '_cantEmpaq2' : arrayCaja[1],
        '_cantEmpaq3' : arrayCaja[2],
        '_cantEmpaq4' : arrayCaja[3],
        '_cantEmpaq5' : arrayCaja[4],
        '_cantEmpaq6' : arrayCaja[5],
        '_cantEmpaq7' : arrayCaja[6],
        '_cantEmpaq8' : arrayCaja[7],
        '_cantEmpaq9' : arrayCaja[8],
        '_cantEmpaq10' : arrayCaja[9],
        '_totalUnidades' : totalUnidades,
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarEmpaquetado.php',
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
                
                               
            }
        }
    });
    
}

/*FUNCION PARA ACTUALIZAR LA TABLA ITEM(DATOS GENEARLES)*/
EDITARORDEN.prototype.actualizarItem = function(codigoItem){
    
    var codigoReemplazar = $("#codigoItem").val();
    var descripcionItem = $("#detalle").val();
    var cantItem = $("#cantidad").val();
    var unidad = $("#c").val();
    var observacion = $("#textarea").val();
    
    var $datos={
        '_codigoItem' : codigoItem,
        '_codigoReemplazar' : codigoReemplazar,
        '_descripcion' : descripcionItem,
        '_nombreitem' : $("#nombreitem").val(),
        '_cantidad' : cantItem,
        '_unidadMedida' : unidad,
        '_observacion' : observacion,
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarItem.php',
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
                mostrarMensaje("exito","ITEM ACTUALIZADO CORRECTAMENTE")
                               
            }
        }
    });
    
}

var slider1 = new EDITARORDEN();

var INFORMACION = function(){}

INFORMACION.prototype.mostrarCliente =function(){
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
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxCliente+="<option value='' selected>Elegir Cliente</option>";
                $("#cliente").html(boxCliente);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxCliente+="<option value='0' selected>Elegir Cliente</option>";
                    }
                    boxCliente+="<option value='"+datos[i].CLIENCODIGO+"'>"+datos[i].CLIENNOMBRE_CORTO+"</option>";
                }
                $("#cliente").html(boxCliente);
            }
        }
    }); 
}

INFORMACION.prototype.mostrarClientesConItemOP = function(seleccionado){
  var boxCliente="";
    
  $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarClientesItemOP.php',
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

INFORMACION.prototype.mostrarMaquina = function(){
  var boxMaquina="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarMaquinas.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
            boxMaquina+="<option value='0' selected>Elegir Maquina</option>";
            $("#maquinas").html(boxMaquina);
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxMaquina+="<option value='0' selected>Elegir Maquina</option>";
                $("#maquinas").html(boxMaquina);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxMaquina+="<option value='0' selected>Elegir Maquina</option>";
                    }
                    boxMaquina+="<option value='"+datos[i].MAQUICODIGO+"'>"+datos[i].MAQUINOMBRE+"</option>";
                }
                $("#maquinas").html(boxMaquina);
            }
        }
    }); 
}

INFORMACION.prototype.mostrarOrdProduccion = function(){
  var boxOrProduccion="";
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarTodoOrdenes.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
            boxOrProduccion+="<option value='0' selected>Elegir Orden de Produccion</option>";
            $("#orProduccion").html(boxOrProduccion);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxOrProduccion+="<option value='0' selected>Elegir Orden de Produccion</option>";
                $("#orProduccion").html(boxOrProduccion);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxOrProduccion+="<option value='0' selected>Elegir Orden de Produccion</option>";
                    }
                    boxOrProduccion+="<option value='"+datos[i].OPCODIGO+"'>"+datos[i].OPCODIGO+"</option>";
                }
                $("#orProduccion").html(boxOrProduccion);
            }
        }
    }); 
}

/* CARGAR TODAS LAS ORDEN DE PRODUCCION DE LA BASE DE DATOS*/ 
INFORMACION.prototype.cargarOT = function(codigo){
  var boxPresAprobados="";
  var $datos = {
    '_dato': codigo
  }
  $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOrdenesXCliente.php',
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
            boxPresAprobados+="<option value='0' selected>Elegir Orden de Produccion</option>";
            $("#ordenTrabajo").html(boxPresAprobados);
        },
        success: function(datos){

            if(datos.response=="0"){
                boxPresAprobados+="<option value='0' selected>Elegir Orden de Produccion</option>";
                $("#ordenTrabajo").html(boxPresAprobados);

            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxPresAprobados+="<option value='0' selected>Elegir Orden de Produccion</option>";
                    }
                    boxPresAprobados+="<option value='"+datos[i].OPCODIGO+"'>"+datos[i].OPCODIGO+"</option>";
                }
                $("#ordenTrabajo").html(boxPresAprobados);

            }
        }
    });
}

var slider2 = new INFORMACION();

var CAMBIARESTADO = function(){}

/*CARGANDO ESTADOS DE ORDEN DE PRODUCCION*/    
CAMBIARESTADO.prototype.Estado = function(seleccionado){
     var boxestado="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarEstados.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
            boxestado+="<option value='0' selected>Elegir Banco</option>";
            $("#estado").html(boxestado);
        },
        success: function(datos){
            if(datos.response=="0"){
                boxestado+="<option value='0' selected>Elegir Estado</option>";
                $("#estado").html(boxestado);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxestado+="<option value='0' selected>Elegir Estado</option>";
                    }
                    boxestado+="<option value='"+datos[i].ESTCODIGO+"'>"+datos[i].ESTDESCRIPCION+"</option>";
                }
                $("#estado").html(boxestado);
              
              $("#estado option[value="+seleccionado+"]").attr("selected",true);
            }
        }
    });      
        
}

/*FUNCION PARA VALIDAR CODIGO DE ORDEN DE PRODUCCION*/
CAMBIARESTADO.prototype.validarcodigo = function(){
  
  var codigoOrden = $("#numOrden").val();
  var $codigo={'_dato': codigoOrden}
  $.ajax({
    url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOrdenXCodigo.php',
    type: 'POST',
    data: $codigo,
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
        $("#numOrden").val("");
      }else{
            var codigoEstado=0;
            var estado= datos[0].ESTDESCRIPCION;
            switch(estado){
            case'ABIERTA': codigoEstado=19;break;
            case'PREFACTURADA': codigoEstado=20;break;
            case'ENTREGADA': codigoEstado=21;break;
            case'FACTURADA': codigoEstado=22;break;
            case'BOLETA': codigoEstado=23;break;       
            case'CANCELADA': codigoEstado=24;break;      
            case'LETRA': codigoEstado=25;break;      
            case'ANULADA': codigoEstado=26;break;      
            case'STAND BY': codigoEstado=27;break;      
            case'REEMPLAZADA': codigoEstado=28;break;
              default: codigoEstado=0;              
            };
          slider3.Estado(codigoEstado);
      }
    }
  });
}

/*FUNCION PARA ACTUALIZAR EL ESTADO DE LA ORDEN DE PRODUCCION*/
CAMBIARESTADO.prototype.actualizarEstado = function(){
  
  var codPresupuesto = $("#numOrden").val();
  var estado = $("#estado").val();
  
  var $datos={
        '_codigo' : codPresupuesto,
        '_estado' : estado  
    }  
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarEstadoOrden.php',
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
                mostrarMensaje("exito",'INFORMACION CARGADA EXITOSAMENTE');
            }
        }
    });
}

var slider3 = new CAMBIARESTADO();

var BUSCARORDEN = function(){}

BUSCARORDEN.prototype.cargarOrdProduccion = function(){
    var boxOrdProduccion="";
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOpItem.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxOrdProduccion+="<option value='0' selected>Buscar ...</option>";
            $("#ordProduccion").html(boxOrdProduccion);
      },
      success: function(datos){
          if(datos.response=="0"){
                boxOrdProduccion+="<option value='0' selected>Buscar ...</option>";
                $("#ordProduccion").html(boxOrdProduccion);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxOrdProduccion+="<option value='0' selected>Buscar ...</option>";
                    }
                    boxOrdProduccion+="<option value='"+datos[i].OPCODIGO+"'>"+datos[i].OPCODIGO+"</option>";
                }
                $("#ordProduccion").html(boxOrdProduccion);
            }
        }
    });
}

BUSCARORDEN.prototype.restaurarFormulario = function(){
    document.querySelector("#totalFinalDatos").removeAttribute("value"); 
    $("#maquinas option[value="+document.getElementById("maquinas").value+"]").attr("selected", false);
    $("#cliente option[value="+document.getElementById("cliente").value+"]").attr("selected", false);
    $("#ejecutiva option[value="+document.getElementById("ejecutiva").value+"]").attr("selected", false);
    $("#material1 option[value="+document.getElementById("material1").value+"]").attr("selected", false);
    $("#listadoTipoImpresion option[value="+document.getElementById("listadoTipoImpresion").value+"]").attr("selected", false);
    var ext=$("#costos tr").length;
    var columnas=($("#tablaAgregar td").length/6)-1;
    var total =$("#tablaSuperior tr").length;
    var otros =$("#otros tr").length;
    var select=$(".pprensa select").length;
    
    for (var k=4; k<ext; k++){
      $("#eliminarCosto").click();
    }
    for (var i=1; i<columnas; i++){
      $("#desaparecer").click();
    }
    for (var l=4; l<total; l++){
      $("#eliminar").click();
    }
    for (var p=6; p<otros; p++){
      $("#eliminarOtros").click();
    }
    if(select==3){
       $("#añadirImpresion").click();
    }
    document.getElementById("inputPaquete1").disabled = false;
    document.getElementById("inputUnid1").disabled = false;
    document.getElementById("añadirCosto").disabled = false;
    document.getElementById("eliminarCosto").disabled = false; 
    document.getElementById("empaque").checked = false;
}

BUSCARORDEN.prototype.cargarItemsXOrProduccion = function(codigo){
    var boxItem="";
    var $codigo={
        '_codigo': codigo,
        '_opcion': 'datos'
    }
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarItemXOrdProduccion.php',
        type: 'POST',
        data: $codigo,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
              mostrarMensaje("error","Archivos no encontrados");
            }
            else{
              mostrarMensaje("error","Error no identificado");
            }
            boxItem+="<option value='0' selected>Elegir Item</option>";
            $("#items").html(boxItem);
        },
        success: function(datos){
          if(datos.response=="1"){
              boxItem+="<option value='0' selected>Elegir Item</option>";
              $("#items").html(boxItem);
          }else{
             for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxItem+="<option value='0' selected>Elegir Item</option>";
                    }
                    boxItem+="<option value='"+datos[i].ITEMNUMERO+"'>"+datos[i].ITEMCODIGO+"</option>";
                }
                $("#items").html(boxItem);
          }
        }
    });
}

BUSCARORDEN.prototype.ocultarBotones = function(){
    document.getElementById('agregar').style.display = 'none';
    document.getElementById('eliminar').style.display = 'none';
    document.getElementById('añadir').style.display = 'none';
    document.getElementById('desaparecer').style.display = 'none';
    document.getElementById('añadirImpresion').style.display = 'none';
    document.getElementById('añadirCosto').style.display = 'none';
    document.getElementById('eliminarCosto').style.display = 'none';
    document.getElementById('añadirOtros').style.display = 'none';
    document.getElementById('eliminarOtros').style.display = 'none';
    $("#form").find("input").each(function() {$(this).prop('readonly', true);});
    $("#form").find("textarea").each(function() {$(this).prop('readonly', true);});
    $("#form").find("select").each(function() {$(this).prop( "disabled", true );});
    $(".bloquear").each(function() {$(this).prop( "disabled", true );});
}

var slider4 = new BUSCARORDEN();

var REEMPLAZAR = function(){
    this.arrayOTs= new Array();
    this.arrayPresup= new Array();
    this.c=0;
    this.arrayItem = new Array();
    this.w=0;
    this.posicion=0;
}

/* MOSTRAR EN LA TABLA LA ORDEN QUE DESEA AGREGAR */
REEMPLAZAR.prototype.mostrarOTSeleccionada = function(){
  var titulos="";
  var tablaOT="";
  var respuesta="SI"
  titulos+="<th  class='th-sm text-center'>CLIENTE</th>\
              <th  class='th-sm text-center'>ORDEN DE TRABAJO</th>\
              <th  class='th-sm text-center'>ITEMS</th>\
              <th  class='th-sm text-center'>FECHA DE ENTREGA</th>\
              <th  class='th-sm text-center'>ESTADO</th>\
              <th  class='th-sm text-center'>ACCION</th>\
            ";
  $("#cabezalTabla").html(titulos);
  if(slider5.c!=0){
    for(var i=0;i<slider5.arrayOTs.length;i++){
      if ($("#ordenTrabajo").val()== slider5.arrayOTs[i]){
          respuesta="NO";
      }
    }
  }
  if(respuesta=="SI" && $("#ordenTrabajo").val()!=0){
   var $datos = {
    '_dato': $("#ordenTrabajo").val()
  }
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOrdenXCodigo.php',
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
            $("#resultado").text("NO HAY RESULTADOS PARA LA BÚSQUEDA");
            $("#cuerpoTabla").html("");
        },
        success: function(datos){
            slider5.arrayOTs[slider5.c]=$("#ordenTrabajo").val();
            slider5.arrayPresup[slider5.c]=datos[0].PRESUPNUMERO;
            slider5.c=slider5.c+1;
            slider5.validarPresupuestoArray(datos[0].PRESUPNUMERO)
            tablaOT+="<tr>\
                <td class='text-center font-weight-bold ' >"+datos[0].CLIENRAZON_SOCIAL+"</td>\
                <td class='text-center font-weight-bold ' >"+$("#ordenTrabajo").val()+"</td>\
                <td class='text-center font-weight-bold ' >"+datos[0].OPNUM_ITEM+"</td>\
                <td class='text-center font-weight-bold ' >"+datos[0].OPFECHAENTREGA+"</td>\
                <td class='text-center font-weight-bold ' >"+datos[0].ESTDESCRIPCION+"</td>\
                <td class='text-center font-weight-bold ' ><button style='width:30%;background:red; color:white' type='button' id='"+$("#ordenTrabajo").val()+"' class='borrar hover' onclick='slider5.eliminarOTSeleccionada(this.id);return false' value='Eliminar' >X</button></td>\
            </tr>";
            $("#vendedor").val(datos[0].OPVENDEDOR);
            $("#cuerpoTabla").append(tablaOT);
            slider5.evaluar();
        }
    });
    
  }else{
    mostrarMensaje("exito","ORDEN DE PRODUCCIÓN YA AGREGADA")
  }
  if($("#ordenTrabajo").val()=='0'){
    mostrarMensaje("advertencia","ELEGIR ORDEN DE PRODUCCION")
  }
}

/* EVALUAR LA CANTIDAD DE ITEMS */ 
REEMPLAZAR.prototype.evaluar = function(){
  var ene=0;
  for(var i=0;i<slider5.arrayOTs.length;i++){ 
    if(slider5.arrayOTs[i]== undefined || slider5.arrayOTs[i] == "" || slider5.arrayOTs[i] == null){
    }else{
      ene=ene+1;
    }
  }
  if(ene==1 || ene== 0){
    document.getElementById("reemplazar").disabled=true;
  }else{
    document.getElementById("reemplazar").disabled=false;
  }
}

/* ELIMINAR ORDEN ARREGADA DEL ARRAY */ 
REEMPLAZAR.prototype.eliminarOTSeleccionada = function(ot){
  for(var i=0;i<slider5.arrayOTs.length;i++){
    if(ot==slider5.arrayOTs[i]){
      slider5.arrayOTs[i]=0;
      for(var j=0;j<slider5.arrayItem.length;j++){
        if(slider5.arrayPresup[i]==slider5.arrayItem[j].substr(0,7)){
            slider5.arrayItem[j]=0;
            slider5.w=slider5.w-1;
        }
      }  
      slider5.arrayPresup[i]=0;
    }
  }

  var elementosRemovidos = slider5.arrayItem.splice(0, slider5.arrayItem.length);
  var contador=0;
  for(i=0;i<elementosRemovidos.length;i++){
      if(elementosRemovidos[i]!=0){
          slider5.arrayItem[contador]=elementosRemovidos[i];
          contador=contador+1;
      }
  }
  console.log(slider5.arrayPresup)
  console.log(slider5.arrayOTs)
  console.log(slider5.arrayItem)
  slider5.evaluar();
}

/* CREAR NUMERO DE ORDEN DE REEMPLAZO */  
REEMPLAZAR.prototype.crearCodigoOT = function(){
  var Hoy = new Date();
    
  if((Hoy.getMonth() +1).toString()>=1 && (Hoy.getMonth() +1).toString()<=9){
      var mes = "0"+(Hoy.getMonth() +1).toString();
  }else{
      mes = (Hoy.getMonth() +1).toString();
  }

  if(Hoy.getDate().toString()>=1 && Hoy.getDate().toString()<=9){
      var dia = "0"+Hoy.getDate().toString();
  }else{
      dia = Hoy.getDate().toString();
  }

  Hoy = Hoy.getFullYear().toString().substring(2,4) + mes + dia ;
  var cantItem=0;
  var reemplazarOT="SI";
  for(var i=0;i<$("#cuerpoTabla tr").length;i++){
    if($("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="REEMPLAZADA" || $("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="FACTURADA" || $("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="CANCELADA" || $("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="STAND BY" || $("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="ANULADA" || $("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="LETRA" || $("#cuerpoTabla tr:eq("+i+") td:eq(4)").html()=="BOLETA"  ){
      reemplazarOT="NO";
    }
  }
  if(reemplazarOT=="SI"){
      $.ajax({
          url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarTodoOrdenes.php',
          type: 'GET',
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
                  var codigo = Hoy + "001";
              }else{
                  var total = 0; 
                  for (var i=0; i< datos.length ; i++){
                      if(Hoy == (datos[i].OPCODIGO).toString().substring(0,6)){
                          total = total+1;
                          if(total.toString().length == 1){
                              var numOP = "00" + (total+1).toString();
                          }else if(total.length == 2){
                              numOP = "0" + (total+1).toString();
                          }else{
                               numOP = (total+1).toString();
                          }
                          codigo = Hoy + numOP.toString();

                      }else{
                          codigo = Hoy + "001";
                      }
                  }
              }
              var todoloscodigos="";
              for(var j=0; j<slider5.arrayOTs.length; j++){
                if(slider5.arrayOTs[j]!=0){
                  todoloscodigos+=slider5.arrayOTs[j] + ", ";
                }
              }
              for(var i=0; i< $("#cuerpoTabla tr").length; i++){
                cantItem= parseInt($("#cuerpoTabla tr:eq("+i+") td:eq(2)").html())+cantItem;
              }
              $("#codigoNuevaOP").html("NUEVO CODIGO DE REEMPLAZO - " + codigo)
              $("#NuevaOrdendeProduccion").removeClass("d-none");
              $("#itemsReemplaza").val(cantItem);
              $("#estado").val(20);
              $("#detallesReemplaza").val("ESTA ORDEN REEMPLAZA A LOS CODIGOS " + todoloscodigos);
              $("#fechaentregaReemplaza").focus();            
          }
      });
  }else{
      mostrarMensaje("error","VERIFICAR EL ESTADO DE CADA ORDEN DE PRODUCCIÓN");
  }
}

/* GUARDAMOS TODO COMENZANDO POR ACTUALIZAR Y CREAR UN NUEVO PRESUPUESTO GENERALIZADO */
REEMPLAZAR.prototype.guardarTodo = function(){
  var fecha = new Date();
  var codigoparapresupuesto;
  $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarTodosPptos.php',
      type: 'GET',
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){
        
        var code;
        code = parseInt((datos[datos.length-1].PRESUPNUMERO).slice(0,4)) +1;
        if(code.toString().length==1){
          code="000"+code.toString();
        }else if(code.toString().length==2){
          code="00"+code.toString();
        }else if(code.toString().length==3){
          code="0"+code.toString();
        }else if(code.toString().length==4){
          code=code.toString();
        }
        codigoparapresupuesto=(code+"-"+(fecha.getFullYear()).toString().substr(2));
        var totalSoles=0,totalDolares=0;
        for(var i=0;i<slider5.arrayPresup.length;i++){
            for(var j=0;j<datos.length;j++){
              if(slider5.arrayPresup[i]==datos[j].PRESUPNUMERO){
                if(datos[j].PRESUPTOTAL_SOLES!="S/0"){
                  totalSoles= totalSoles + parseFloat(datos[j].PRESUPTOTAL_SOLES.substr(2));
                }
                if(datos[j].PRESUPTOTAL_DOLARES!="$0"){
                  totalDolares=totalDolares + parseFloat(datos[j].PRESUPTOTAL_DOLARES.substr(1));
                }
              }
            }
          }
        slider5.registrarNuevoPresupuestoReemplazo(codigoparapresupuesto,$("#itemsReemplaza").val(),"","S/".concat(totalSoles),"$".concat(totalDolares));
        
      }
  });
}
  
/* CREAR UNA NUEVA PRESUPUESTO DE REEMPLAZO */
REEMPLAZAR.prototype.registrarNuevoPresupuestoReemplazo = function(codigoPresupuesto,cantidadItems,contacto,totalSoles,totalDolares){
  var todoslospresupuestos="";
  for(var i=0;i<slider5.arrayPresup.length;i++){
    if(slider5.arrayPresup[i]!=0){
      todoslospresupuestos+= slider5.arrayPresup[i] + ", ";
      slider5.actualizarEstadoPresupuesto(slider5.arrayPresup[i],52, "ESTE PRESUPUESTO FUE REEMPLAZADO POR EL CODIGO " + codigoPresupuesto);
    }
  }
  var fecha = new Date();
  var $datosPresupuesto={
    '_code': codigoPresupuesto,
    '_cliente': $("#cliente").val(),
    '_vendedor': $("#vendedor").val(),
    '_fecha': fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),
    '_cantItem': cantidadItems,
    '_pContacto' : contacto ,
    '_totalSoles' : totalSoles,
    '_totalDolares' : totalDolares,
    '_detalle' : "ESTE PRESUPUESTO REEMPLAZADA A LOS PRESUPUESTOS " +todoslospresupuestos,
  }

  $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosPresupuesto.php',
        type: 'POST',
        data: $datosPresupuesto,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","No se pudo establecer conexion con el servidor");
            }
            else{
                mostrarMensaje("error","Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response == 0){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }
            else{
                var codigonuevecito;
                var nuevoitem12 = new Array();
                var cambio="SI";
                var cantidad=1;

                for( var i=0; i<slider5.arrayItem.length;i++){

                  if(cambio=="SI"){
                      codigonuevecito=slider5.arrayItem[i];
                      cambio="NO";
                  } 
                  if(slider5.arrayItem[i]==codigonuevecito){
                      nuevoitem12[i]=cantidad;

                  }else{
                      codigonuevecito=slider5.arrayItem[i];
                      cantidad=parseInt(cantidad)+1;
                      nuevoitem12[i]=cantidad;
                  }
                }
                for(var i=0;i<slider5.arrayPresup.length;i++){
                  if(slider5.arrayPresup[i]!=0){                    
                      slider5.validarPresupuesto(slider5.arrayPresup[i],codigoPresupuesto,nuevoitem12);
                  }
                }
                slider5.registrarNuevaOrdenReemplazo(cantidadItems,codigoPresupuesto);
            }
        }
    });

}

/* BUSQUEDA VALIDA DE ITEMS DEL PRESUPUESTO */
REEMPLAZAR.prototype.validarPresupuestoArray = function(codigo){
  var $codigo={'_codigo': codigo}

  $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ValidarPresupuesto.php',
      type: 'POST',
      data: $codigo,
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
            for(var i=0;i<datos.length;i++){
                slider5.arrayItem[slider5.w]=datos[i].ITPRESUCODIGO;
                slider5.w= slider5.w+1;
             }
          }
      }
  });
}

/* BUSQUEDA VALIDA DE ITEMS DEL PRESUPUESTO */
REEMPLAZAR.prototype.validarPresupuesto = function(codigo,codigoPresupuesto,nuevoitem12){
  var $codigo={'_codigo': codigo}

  $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ValidarPresupuesto.php',
      type: 'POST',
      data: $codigo,
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
            
            for(var i=0;i<datos.length;i++){
              slider5.registrarItemPresupuesto(datos,i,codigoPresupuesto,nuevoitem12[slider5.posicion]);
              slider5.posicion=slider5.posicion+1;
             }
          }
      }
  });
}
  
/* REGISTRAR NUEVO ITEM PARA EL NUEVO PRESUPUESTO CON LOS DETALLES Y PRECIOS DEL YA EXISTENTE*/
REEMPLAZAR.prototype.registrarItemPresupuesto = function(datos,j,codigoPresupuesto,posicion){
 
  var $datosItem={
    '_numero':0,
    '_code': codigoPresupuesto.concat("-").concat(posicion),
    '_medidas': datos[j].ITPRESUMEDIDAS,
    '_descripcion': datos[j].ITPRESUDESCRIPCION,
    '_monto': datos[j].ITPRESUIMPORTE,
    '_codeC': datos[j].DETPRESUPCODIGO,
    '_codeP': datos[j].PRECIOPRESUPCODIGO,
    '_codePresup':codigoPresupuesto
  }
  $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosItem.php',
        type: 'POST',
        data: $datosItem,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","No se pudo establecer conexion con el servidor");
            }
        },
    });
}
  
/* ACTUALIZAR LOS PRESUPUESTOS A ESTADO REEMPLAZADA */
REEMPLAZAR.prototype.actualizarEstadoPresupuesto = function(presupcodigo,estado,descripcion){
  var $datos ={
    '_codigo':presupcodigo,
    '_estado':estado,
    '_descripcion': descripcion
  }
  $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarPresupuestoReemplazado.php',
      type: 'POST',
      data: $datos,
      dataType: 'json',
      error: function(error){
          if(error.status == 401){
              mostrarMensaje("error","No se pudo establecer conexion con el servidor");
          }
          else{
              mostrarMensaje("error","Error no identificado");
          }
      },
      success: function(datos){ var code;
          if(datos.response == 0){
             mostrarMensaje("error","Error " +datos.message);
          }
      }
  }); 
}
  
/* REGISTRAR NUEVA ORDEN DE REEMPLAZO */  
REEMPLAZAR.prototype.registrarNuevaOrdenReemplazo = function(cantItem,codePresupuesto){
  
  for(var j=0; j<slider5.arrayOTs.length; j++){
    slider5.actualizarEstadoOT(slider5.arrayOTs[j],"ESTA ORDEN FUE REEMPLAZADA POR LA NUEVA ORDEN "+ $("#codigoNuevaOP").html().split(" - ")[1]);
  }
  
  var $datos={
        '_codigo': $("#codigoNuevaOP").html().split(" - ")[1],
        '_vendedor' : $("#vendedor").val(),
        '_cantitem': cantItem,
        '_estado': $("#estado").val(),
        '_numPresup' : codePresupuesto,
        '_detalleOT' : $("#detallesReemplaza").val(),
        '_fechaEntrega' : $("#fechaentregaReemplaza").val(),
    }
    
  $.ajax({
    url: '../CT-BackEnd/Controlador/ModOrden/Controlador_GuardarOrdenProduccion.php',
    type: 'POST',
    data: $datos,
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
            mostrarMensaje("error","No se puede registrar");
        }else{
            mostrarMensaje("exito","LA NUEVA ORDEN HA SIDO CREADA");
            for(var i=0;i<slider5.arrayOTs.length;i++){
              if(slider5.arrayOTs[i]!=0){                    
                  slider5.validarOrdenProduccion(slider5.arrayOTs[i],$("#codigoNuevaOP").html().split(" - ")[1],codePresupuesto);
              }
            }
        }
    }
  });
}
  
/*ACTUALIZAR LA ORDEN AGREGADA A ESTADO REEMPLAZA*/
REEMPLAZAR.prototype.actualizarEstadoOT = function(OT,descripcion){
  var $datos = {
    '_codigo': OT,
    '_estado': 28,
    '_descripcion': descripcion
  }
  $.ajax({
     url: '../CT-BackEnd/Controlador/ModOrden/Controlador_ActualizarEstadoOrdenReemplazada.php',
     type: 'POST',
     data:$datos,
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
        }
     }
  });
} 

/*BUSQUEDA VALIA DEL ITEM DE ORDEN DE PRODUCCION*/
REEMPLAZAR.prototype.validarOrdenProduccion = function(codigoOT,codigoOTNuevo,codePresupuesto){
  var $codigo={'_codigo': codigoOT,
               '_opcion': "datos"}

  $.ajax({
      url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarItemXOrdProduccion.php',
      type: 'POST',
      data: $codigo,
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
            for(var i=0;i<datos.length;i++){
              slider5.registrarItemOrden(datos,i,codigoOTNuevo,codePresupuesto);
             }
          }
      }
  });
  
}

REEMPLAZAR.prototype.registrarItemOrden = function (datos,j,codigoOrden,codePresupuesto){
  var $datos={
        '_codigoItem' : datos[j].ITEMCODIGO ,
        '_detAcabado' : datos[j].DETACABCODIGO,
        '_pPrenCodigo' : datos[j].PPRENCODIGO,
        '_oProduccionCodigo' : codigoOrden,
        '_empaqCodigo' : datos[j].EMPAQCODIGO,
        '_nombre' : datos[j].ITEMNOMBRE,
        '_descripcion' : datos[j].ITEMDESCRIPCION,
        '_cantidad' : datos[j].ITEMCANTIDAD,
        '_unidadMedida' : datos[j].ITEMUNID_MEDIDA,
        '_importe' : datos[j].ITEMIMPORTE,
        '_observacion' : datos[j].ITEMOBSERVACION,
        '_numPresu': codePresupuesto.concat("-").concat(parseInt(j)+1), 
    }
        
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_RegistrarItem.php',
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
        success: function(dato){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+dato.message);
            }
        }
    });
  
    
}
var slider5 = new REEMPLAZAR();

var IMPORTAR = function(){}

IMPORTAR.prototype.imprimirContenido = function(nombreDiv){
    var win = window.open('','','left=0,top=0,width=552,height=477,toolbar=0,scrollbars=0,status =0');
    var content = "<html>";
    content += "<body onload=\"window.print(); window.close();\">";
    content += "<head><title></title><link href='Bootstrap/css/select2.min.css' rel='stylesheet'/><link href='Bootstrap/css/estilosTabla.css' rel='stylesheet'/> <link href='Inicio/inicio.css' rel='stylesheet'/> <link href='Bootstrap/css/bootstrap.min.css' rel='stylesheet'/>   </head>";
    content += document.getElementById(nombreDiv).innerHTML ;
    content += "</body>";
    content += "</html>";
    win.document.write(content);
    win.document.close();
}

var slider6 = new IMPORTAR();
