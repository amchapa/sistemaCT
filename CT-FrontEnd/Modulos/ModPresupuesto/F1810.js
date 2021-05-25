/*================================================================================
  FUNCIONES GENERALES
================================================================================*/

//--INICIALIZAR VARIABLES--
var contador=1;

$("#F1810MAQUINAS :input").prop("readonly",true);
$("#F1810INSUMOS :input").prop("readonly",true);

//  PAUSAR CAROUSEL
$('.carousel').carousel('pause');

//  FUNCION CLICK PARA IR AL SIGUIENTE SLIDER
$("#btnAdelantar").click(function(){
    $("#guardar").addClass("disabled");
    $("#habilitar").addClass("disabled");
   contador++;
   if(contador<1 || contador>5){
       contador=1;
   }
   if( contador>=1 && contador<=5){
      switch(contador) {
        case 1:document.getElementById("F1810Titulo").innerHTML = "NUEVO PRESUPUESTO";break;
        case 2:document.getElementById("F1810Titulo").innerHTML = "FORMULA DE PRESUPUESTOS";break;
        case 3:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - PRINCIPAL";break;
        case 4:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - MAQUINAS";$("#guardar").removeClass("disabled");
    $("#habilitar").removeClass("disabled");break;
        case 5:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - INSUMOS";$("#guardar").removeClass("disabled");
    $("#habilitar").removeClass("disabled");break;
      }
   }
});

//  FUNCION CLICK PARA IR AL ANTERIOR SLIDER
$("#btnRetroceder").click(function(){
    $("#guardar").addClass("disabled");
    $("#habilitar").addClass("disabled");
   contador--;
   if(contador<1 || contador>5){
       contador=5;
   }
   if( contador>=1 && contador<=5){
       switch(contador) {
          case 1:document.getElementById("F1810Titulo").innerHTML = "NUEVO PRESUPUESTO";break;
          case 2:document.getElementById("F1810Titulo").innerHTML = "FORMULA DE PRESUPUESTOS";break;
          case 3:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - PRINCIPAL";break;
          case 4:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - MAQUINAS";$("#guardar").removeClass("disabled");
    $("#habilitar").removeClass("disabled");break;
          case 5:document.getElementById("F1810Titulo").innerHTML = "FORMULA 1810 - INSUMOS";$("#guardar").removeClass("disabled");
    $("#habilitar").removeClass("disabled");break;
       }
   }
});


//  FUNCION PARA HABILITAR/DESHABILITAR LOS INPUT
//  DE INGRESO DE DATOS
function HABILITAR(){
  if($("#habilitar").html()=="HABILITAR"){
      $("#F1810MAQUINAS :input").prop("readonly",false);
      $("#F1810INSUMOS :input").prop("readonly",false);
    
      $("#CPOS-TOTAL").prop("readonly",true);
      $("#habilitar").html("DESHABILITAR");
  }else{
      $("#F1810MAQUINAS :input").prop("readonly",true);
      $("#F1810INSUMOS :input").prop("readonly",true);
      $("#habilitar").html("HABILITAR");
  }
}

function keydown(number){
  $("#descripcion"+number).on('keydown', function(e) {
      if (e.which == 13) {
        if($("#clientex").val()=="0"){
           $("#clientex").focus();
           }else{
             $("#-"+number).trigger('click');
             return false;
           }
          
      }
  });
}

//  FUNCION PARA ELEGIR EL TIPO DE MONEDA
$(document).ready(function(){
    var inputNombre=document.getElementById("facturacion");
    
    $("#soles").click(function(){
        if(inputNombre.value!="" && document.getElementById("dolares").checked == true){
          inputNombre.value =(parseFloat(inputNombre.value)*parseFloat($("#F1810INSUMOS #tipocambio").val())).toFixed(2);
        }
        document.getElementById("dolares").checked = false;
        this.checked = true;
    });
    $("#dolares").click(function(){
        if(inputNombre.value!="" && document.getElementById("soles").checked == true){
          inputNombre.value = (parseFloat(inputNombre.value)/parseFloat($("#F1810INSUMOS #tipocambio").val())).toFixed(2);
        }
        document.getElementById("soles").checked = false;
        this.checked = true;
    });
});
  
//  FUNCION PARA VERIFICAR EL RANGO DEL PRECIO
function verificar(){
    var facturacion=$("#facturacion").val();
  
    var fSoles=$("#Fsoles").val().replace("S/.","");
    var nSoles=$("#Nsoles").val().replace("S/.","");
    var nDolares=$("#Ndolares").val().replace("$","");
    var fDolares=$("#Fdolares").val().replace("$","");
  
    var maximo="", minimo="";
  
    if(document.getElementById("soles").checked == true){
        maximo=Math.max(fSoles,nSoles);
        minimo=Math.min(fSoles,nSoles);
    }else{
        maximo=Math.max(fDolares,nDolares);
        minimo=Math.min(fDolares,nDolares);
    }
  
    if(facturacion>=minimo && facturacion<=maximo){
      aceptado="SI"
    }else{
      alert("Facturacion fuera de rango!!!");
      $("#facturacion").val("");
      aceptado="NO"
    }
}

//  FUNCION PARA LLAMAR A LAS FUNCIONES DE COTIZACION
//  LUEGO DE QUE EL USUARIO CAMBIE LOS DATOS YA INGRESADOS
$("#PRINCIPAL input, #PRINCIPAL select").change(function(){
  slider0.cotizar();
  slider1.F1810_Calcular();
  slider3.valoresIniciales();
  slider3.resultado();
  slider0.precios();
});

$("#F1810MAQ input,#F1810MAQ td, #F1810INSUMOS input, #F1810INSUMOS td").change(function(){
  slider0.cotizar();
  slider1.F1810_Calcular();
  slider3.valoresIniciales();
  slider3.resultado();
  slider0.precios();
});

var NUEVOPRESUPUESTO = function(){
    this.cantidadDiv = 1 ;
  this.bloqueado = "";
};

// FUNCION PARA GENERAR EL CODIGO DEL ITEM 
NUEVOPRESUPUESTO.prototype.cargarItem = function(id){
    id=parseInt(id)+1;
    var fecha = new Date();
    var code = 0;
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
        var numberYear =  fecha.getFullYear().toString().substr(2);
          if(datos.response == 0){
            code = "0001";
            $("#codigoPresupuestoItem"+id).val(code+"-"+numberYear+"-"+id);
          }
          else{
            if(numberYear==datos[datos.length-1].PRESUPNUMERO.slice(5,7)){
              code = parseInt((datos[datos.length-1].PRESUPNUMERO).slice(0,4)) +1;
              switch(code.toString().length){
                  case(1): code= "000".concat(code);break;
                  case(2): code= "00".concat(code);break;
                  case(3): code= "0".concat(code);break;
              }
            }else{
              code = "0001"
            }
          }
          $("#codigoPresupuestoItem"+id).val(code+"-"+numberYear+"-"+id);
          codigoparapresupuesto=(code+"-"+numberYear.substr(2));
          var cod = document.getElementById('codigoPresupuesto');
          cod.id=code+"-"+numberYear;
          $("#nPresupuesto").html("Presupuesto "+codigoparapresupuesto);
      }
  });
}

NUEVOPRESUPUESTO.prototype.mostrarSubItems = function(codigoitem, numero){
  var $codigo={
        '_codigo': codigoitem 
    }
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarSubItem.php',
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
           if(datos.response == 0){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }
            else{
                var boxItem="";
                boxItem+="<table id=tablaItem"+numero+"><tr id=fila"+numero+">"
                for(var i=0;i<datos.length;i++){
                    if(i%2==0 || i==0){
                          boxItem+="<td><div class='btn btn-titulo col-12 principal col-md mx-5 text-center hover' ><h2 class=' mb-0 hover' id='fila-"+numero+"-"+datos[i].ITPRESUNUMERO+"' onclick='slider4.agregarSubItem(this.id);return false'>"+datos[i].ITPRESUMEDIDAS+"</h2>"+datos[i].ITPRESUDESCRIPCION+"</div></td>";
                    }else{
                      boxItem+="<td><div class='btn btn-titulo col-12 secundario col-md mx-5 text-center hover' ><h2 class=' mb-0 hover' id='fila-"+numero+"-"+datos[i].ITPRESUNUMERO+"' onclick='slider4.agregarSubItem(this.id);return false'>"+datos[i].ITPRESUMEDIDAS+"</h2>"+datos[i].ITPRESUDESCRIPCION+"</div></td>";
                    }
                }
                boxItem+="<td><div class='btn btn-titulo col-12 secundario col-md mx-5 text-center hover' ><h2 class=' mb-0 hover' id='fila-"+numero+"-agregar' onclick='slider4.agregarSubItem(this.id);return false'>+</h2>AGREGAR SUB - ITEM</div></td>";
                boxItem+="</tr></table>"
                $("#deslizableEstilos"+numero).html(boxItem);
            }
        }
    });
}

NUEVOPRESUPUESTO.prototype.agregarSubItem = function(Codigo){
  var cod = Codigo.split("-");
    if(cod[2]=='agregar'){
        slider4.CrearPresupuesto(Codigo);
    }else{
        $("#codigonumeroItem").val(cod[2]);
        $("#tituloEstilo").html("OPCIONES DE SUB-ITEM");
        $('#modalOpcion').modal('show');
        $("#eliminarSubItem").removeClass("d-none");
        $("#eliminarPresupuesto").addClass("d-none");
    }
}

NUEVOPRESUPUESTO.prototype.eliminarSubItem = function(){
  var codigo = $("#codigonumeroItem").val();
  
  var $valor={
        '_codigo' : codigo
   }
  
  $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_EliminarItemDetPresupuestoXNumero.php',
        type: 'POST',
        data: $valor,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                mostrarMensaje("exito","SUB - ITEM ELIMINADO");
                for(var i=0;i<cantidadDiv;i++){
                    slider4.mostrarSubItems($("#codigoPresupuestoItem"+(i+1)+"").val(),(i+1));
                    slider4.vistaPrevia($("#nPresupuesto").html().split(" ")[1]);
                }
            }
        }
    });
}

NUEVOPRESUPUESTO.prototype.editarSubItem = function(){
  
  var codigo = $("#codigonumeroItem").val();
  document.getElementById("actualizarButton").style.display = null;
  document.getElementById("guardarButton").style.display = "none";
  pagina = "f1810";
  
  $("#btnAdelantar").click();
        
  var $valor={
        '_codigo' : codigo
   }
    
  $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarItemDetPresupuestoXNumero.php',
        type: 'POST',
        data: $valor,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                $("#vendedor").val(datos.PRESUPVENDEDOR);
                $("#PRINCIPAL #numeroItem").val(datos.ITPRESUCODIGO);
                $("#PRINCIPAL #maquinas option[value="+ datos.MAQUICODIGO +"]").attr("selected",true);
                $("#PRINCIPAL input:eq(3)").val(datos.ITPRESUDESCRIPCION);
                $("#PRINCIPAL input:eq(4)").val(datos.DETPRESUPNUM_PM);
                $("#PRINCIPAL input:eq(5)").val(datos.DETPRESUPTIRAJE_TOTAL);
                $("#PRINCIPAL input:eq(7)").val(datos.DETPRESUPPIEZAS_GRAFICAS);
                $("#PRINCIPAL input:eq(8)").val(datos.DETPRESUPNUM_PLIEGO);
                $("#PRINCIPAL input:eq(9)").val(datos.DETPRESUPNUM_COLOR);
                $("#PRINCIPAL input:eq(10)").val(datos.DETPRESUPGRAMAJE);
                $("#PRINCIPAL input:eq(11)").val(parseInt(datos.DETPRESUPTAMAÑO_PAPEL));
                $("#PRINCIPAL input:eq(12)").val(datos.DETPRESUPCAJA_PAQUETE);
                $("#PRINCIPAL input:eq(13)").val(datos.DETPRESUPCOSTO_PLASTICO);
                $("#PRINCIPAL input:eq(14)").val(datos.DETPRESUPCOSTO_SERV_PLASTIFICADO);
                $("#PRINCIPAL input:eq(15)").val(datos.DETPRESUPCOSTO_CAJA);
                $("#PRINCIPAL input:eq(16)").val(datos.DETPRESUPCOSTO_COLA_FORRO );
                $("#PRINCIPAL input:eq(17)").val(datos.DETPRESUPCOSTO_CORTE);
                $("#PRINCIPAL input:eq(18)").val(datos.DETPRESUPCOSTO_ARMADO);
                $("#PRINCIPAL input:eq(19)").val(datos.DETPRESUPCOSTO_OJAL);
                $("#PRINCIPAL input:eq(20)").val(datos.DETPRESUPCOSTO_NYLON);
                $("#PRINCIPAL input:eq(21)").val(datos.DETPRESUPCOSTO_PNYLON);
                $("#PRINCIPAL input:eq(22)").val(datos.DETPRESUPEXTRAS);
                
                $("#PRINCIPAL select:eq(3)").val((datos.DETPRESUPTIPO_PLIEGO.toLowerCase()));
                $("#PRINCIPAL select:eq(4)").val(datos.DETPRESUPTIPO_IMPRESION);
                //$("#PRINCIPAL select:eq(5)").val(datos.DETPRESUPTIPO_IMPRESION);
                $("#PRINCIPAL select:eq(6)").val(datos.DETPRESUPQUALITY );
                $("#PRINCIPAL select:eq(7)").val(datos.DETPRESUPCONTRATO);
                $("#PRINCIPAL select:eq(8)").val(datos.DETPRESUPPRUEBA);
                $("#PRINCIPAL select:eq(9)").val(datos.DETPRESUPMENSAJERIA);
                $("#PRINCIPAL select:eq(10)").val(datos.DETPRESUPBARNIZ_PLASTI);
                $("#PRINCIPAL select:eq(11)").val(datos.DETPRESUPBARNIZ_PLASTI1);
                $("#PRINCIPAL select:eq(12)").val(datos.DETPRESUPBARNIZ_PLASTI2);
                $("#PRINCIPAL select:eq(13)").val(datos.DETPRESUPTROQUEL );
                $("#PRINCIPAL select:eq(14)").val(datos.DETPRESUPDOBLADO_ALCE);
                $("#PRINCIPAL select:eq(15)").val(datos.DETPRESUPCOSIDO_COLA_GRAPA);
                $("#medidasItem").val(datos.ITPRESUMEDIDAS);
                $("#codigoactualizar").val(datos.ITPRESUNUMERO);
                slider0.cotizar();
                slider1.F1810_Calcular();
                slider3.valoresIniciales();
                slider3.resultado();
                slider0.precios();
            }
        }
    });
}

// FUNCION DE VALIDACION PARA AGREGAR NUEVO ITEM
NUEVOPRESUPUESTO.prototype.validar = function(number){
    var R1 = $("#clientex").val();
    var R2 = $("#vendedorx").val();
    var R3 = $("#cantidad"+number+"").val();
    var R4 = $("#descripcion"+number+"").val();
    
    if(R1 == null || R1.length == 0 || /^\s+$/.test(R1)){
        $("#clientex").focus();
    }
    else if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
        $("#vendedorx").focus();
    }
    else if(R3 == null || R3.length == 0 || /^\s+$/.test(R3) || R3<=0){
        $("#cantidad"+number+"").focus();
    }
    else if(R4 == null || R4.length == 0 || /^\s+$/.test(R4)){
        $("#descripcion"+number+"").focus();
    }else{
        slider4.nuevoItem(number);
    }  
}

//FUNCION PARA AGREGAR UN NUEVO ITEM
NUEVOPRESUPUESTO.prototype.nuevoItem = function(number){
    number=parseInt(number)+1;
    var codigoprincipal = $("#nPresupuesto").html().split(" ")[1].split("-");
    var cuerpo ="<div class='card contDiv'><h5 class='card-header h5'><label id='ITEM"+number+"'>ITEM "+number+"</label>\
                  <button id='"+number+"' class='btn btn-titulo' onclick='slider4.validar(this.id);return false' >NUEVO ITEM</button>\
                  <button id='*-"+number+"' class='btn btn-titulo' onclick='slider4.eliminarItem(this.id);return false'>ELIMINAR ITEM</button>\
                  <button id='-"+number+"' class='btn btn-titulo2' onclick='slider4.CrearPresupuesto(this.id);return false'>PERSONALIZADO</button>\
                </h5>\
                <div class='card-body'>\
                  <div class='form-row'>\
                    <div class='col-12 col-md-2 form-group'>\
                      <label for='codigoPresupuestoItem"+number+"'>Código</label>\
                      <input readonly type='text' class='form-control'  value ='"+codigoprincipal[0]+"-"+codigoprincipal[1]+"-"+number+"' id='codigoPresupuestoItem"+number+"' aria-describedby='codigoPresupuestoItemHelp"+number+"'>\
                      <small id='codigoPresupuestoItemHelp"+number+"' class='form-text text-muted'>Campo autogenerado.</small>\
                    </div>\
                    <div class='col-12 col-md-2 form-group'>\
                      <label for='cantidad"+number+"'>Cantidad</label>\
                      <input required type='number' min='1' class='form-control' id='cantidad"+number+"' aria-describedby='cantidadHelp"+number+"'>\
                      <small id='cantidadHelp"+number+"' class='form-text text-muted'>Campo obligatorio.</small>\
                    </div>\
                    <div class='col-12 col-md form-group'>\
                      <label for='medidas"+number+"'>Medidas</label>\
                      <input required class='form-control' id='medidas"+number+"' aria-describedby='medidasHelp"+number+"' placeholder='21 x 19 cm, abierto' style='text-transform:uppercase;' onkeyup='javascript:this.value=this.value.toUpperCase();'></input>\
                      <small id='medidasHelp"+number+"' class='form-text text-muted'></small>\
                    </div>\
                    <div class='col-12 col-md form-group'>\
                      <label for='descripcion"+number+"'>Descripcion</label>\
                      <textarea required class='form-control' id='descripcion"+number+"' aria-describedby='descripcionHelp"+number+"' style='text-transform:uppercase;' onkeyup='javascript:this.value=this.value.toUpperCase();'></textarea>\
                      <small id='descripcionHelp"+number+"' class='form-text text-muted'>Recomendación: Usar palabras claves como volantes, afiches,...</small>\
                    </div>\
                    <div style='max-width: 1260px; overflow-y: scroll;width: 80%' id='deslizableEstilos"+number+"'>\
                    </div>\
                    </div>\
                  </div>\
                </div></div>";
    
    $("#siguiente"+number+"").html(cuerpo);
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "siguiente"+(parseInt(number) +1)+"");
    $(newDiv).insertAfter($("#siguiente"+number+""));
    $("#cantidad"+number+"").focus();
    cantidadDiv=parseInt(cantidadDiv)+1;
    slider4.leerBloqueados();
    keydown(number);
    //slider4.cargarDatos(number);
}

// FUNCION PARA ELIMINAR ITEM
NUEVOPRESUPUESTO.prototype.eliminarItem = function (id){
    
    var codAConsultar = $("#codigoPresupuestoItem"+id.split("-")[1]).val();
    var valor = id.split("-");
    var imagen = document.getElementById("siguiente"+valor[1]);
    var padre = imagen.parentNode;
    padre.removeChild(imagen);
    $("#descripcion"+(parseInt(valor[1])-1)).focus();
    slider4.eliminarTodoItemPresupuesto(codAConsultar);
    if( parseInt(valor[1]) == cantidadDiv){
        var actual=document.getElementById("siguiente"+(parseInt(valor[1])+1)); actual.id='siguiente'+parseInt(valor[1]);
    }else{
        for(var i=parseInt(valor[1]); i<= parseInt(cantidadDiv) ; i++){
            if(i==cantidadDiv){
                var actualizador=document.getElementById("siguiente"+(i+1)); actualizador.id='siguiente'+i;
            }else{
                var actual=document.getElementById("siguiente"+(i+1)); actual.id='siguiente'+i;
                var numeroItem=document.getElementById("ITEM"+(i+1)); numeroItem.id='ITEM'+i;
                $("#ITEM"+i).html("ITEM "+i)
                var nuevoItemBtn=document.getElementById(""+(i+1)); nuevoItemBtn.id=''+i;
                var eliminarItem=document.getElementById("*-"+(i+1)); eliminarItem.id='*-'+i;
                var personalizado=document.getElementById("-"+(i+1)); personalizado.id='-'+i;
                var codigo=document.getElementById("codigoPresupuestoItem"+(i+1)); codigo.id='codigoPresupuestoItem'+i;
                var cantidad=document.getElementById("cantidad"+(i+1)); cantidad.id='cantidad'+i;
                var medida=document.getElementById("medidas"+(i+1)); medida.id='medidas'+i;
                var descripcion=document.getElementById("descripcion"+(i+1)); descripcion.id='descripcion'+i;
                var antiguoId = $("#codigoPresupuestoItem"+i).val();
                var NuevoId = antiguoId.split("-");
                var nuevCodigo = NuevoId[0].concat("-").concat(NuevoId[1]).concat("-").concat(parseInt(NuevoId[2])-1);
                $("#codigoPresupuestoItem"+i).val(nuevCodigo);
                //actualizar a item 1
                slider4.actualizarAItem1(antiguoId);
                setTimeout(slider4.cambioCodDetalle,1000,nuevCodigo,antiguoId);
                setTimeout(slider4.cambioCodPrecio,1000,nuevCodigo,antiguoId);
                setTimeout(slider4.cambioCodItem,1000,nuevCodigo,antiguoId);
            }
        }
    }
    cantidadDiv=parseInt(cantidadDiv)-1;
    slider4.leerBloqueados();
    var codd = $("#codigoPresupuestoItem1").val().split("-");
    setTimeout(slider4.vistaPrevia,1000,codd[0].concat("-").concat(codd[1]));
}

// FUNCION PARA CAMBIAR DETALLE Y PRECIO DE LA TABLA ITEM_PRESUPUESTO A CODIGO-1
NUEVOPRESUPUESTO.prototype.actualizarAItem1 = function (nuevCodigo){
    
    var code = $("#codigoPresupuestoItem1").val();
    var codDetalle = 'C'+code;
    var codPrecio = 'P'+code;
    
    var $datos = {
        '_codAnterior' : nuevCodigo,
        '_codNuevo' : nuevCodigo,
        '_codDetalle' : codDetalle,
        '_codPrecio' : codPrecio
    }
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarCodigoItem.php',
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
      success: function(datos){

          if(datos.response == 0){
              mostrarMensaje("error",'ERROR: '+datos.message);
          }
        }
    });
}

// FUNCION PARA CAMBIAR LOS CODIGOS DE LOS ITEMS EN ITEM_PRESUPUESTO
NUEVOPRESUPUESTO.prototype.cambioCodItem = function (nuevCodigo,antiguoId){
    
    var codDetalle = 'C'+nuevCodigo;
    var codPrecio = 'P'+nuevCodigo;
    
    var $datos = {
        '_codAnterior' : nuevCodigo,
        '_codNuevo' : antiguoId,
        '_codDetalle' : codDetalle,
        '_codPrecio' : codPrecio
    }
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarCodigoItem.php',
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
      success: function(datos){

          if(datos.response == 0){
              mostrarMensaje("error",'ERROR: '+datos.message);
          }
        }
    });
}

// FUNCION PARA CAMBIAR LOS CODIGOS DE LOS ITEMS EN DETALLE_PRESUPUESTO
NUEVOPRESUPUESTO.prototype.cambioCodDetalle = function(nuevCodigo,antiguoId){
    
    var nuevoCodigo = 'C'+nuevCodigo;
    var antiguooId = 'C'+antiguoId;
    
    var $datos = {
        '_codAnterior' : nuevoCodigo,
        '_codNuevo' : antiguooId
    }
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarCodigoDetalleItem.php',
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
      success: function(datos){

          if(datos.response == 0){
              mostrarMensaje("error",'ERROR: '+datos.message);
          }
        }
    });
}

// FUNCION PARA CAMBIAR LOS CODIGOS DE LOS ITEMS EN PRECIO_PRESUPUESTO
NUEVOPRESUPUESTO.prototype.cambioCodPrecio = function(nuevCodigo,antiguoId){
    
    var nuevoCodigo = 'P'+nuevCodigo;
    var antiguooId = 'P'+antiguoId;
    
    var $datos = {
        '_codAnterior' : nuevoCodigo,
        '_codNuevo' : antiguooId
    }
    
    $.ajax({
      url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarCodigoPrecioItem.php',
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
      success: function(datos){

          if(datos.response == 0){
              mostrarMensaje("error",'ERROR: '+datos.message);
          }
          else{
              mostrarMensaje("exito","ITEM ELIMINADO CORRECTAMENTE")
            }
        }
    });
}

// FUNCION PARA ELIMINAR LOS REGISTROS DE ITEM, DETALLE Y PRECIO _PRESUPUESTO AL CANCELAR UN PRESUPUESTO
NUEVOPRESUPUESTO.prototype.eliminarTodoItemPresupuesto = function(code){
    
    var $codigo = {
        '_codigo' : code
    }
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_EliminarItemPresupuesto.php',
        type: 'POST',
        data: $codigo,
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
        }
    });
}

// FUNCION PARA BLOQUEAR EL BOTON DE NUEVO ITEM
NUEVOPRESUPUESTO.prototype.leerBloqueados = function(){
    if(cantidadDiv==1){
        document.getElementById(""+cantidadDiv).disabled=false;
    }else{
        for( var i=1;i<=cantidadDiv ; i++){
            if(i==cantidadDiv){
                document.getElementById(""+i).disabled=false;
            }else{
                document.getElementById(""+i).disabled=true;
            }
        }
    }
}

// FUNCION PARA MOSTRAR UN MODAL, PARA CREAR UN NUEVO ESTILO
NUEVOPRESUPUESTO.prototype.nuevoEstilo = function(number){
      $("#tituloEstilo").html("REGISTRAR ESTILO");
      $("#descripcionDatos").val("");
      $("#tamanoDatos").val("");
      $("#medidaResmaDatos").val("");
      $("#medidaCorteDatos").val("");
      $("#pliegosDatos").val("");
      $("#panneauDatos").val("");
      $("#maquinaDatos").val("");
      $("#maquinaDatos").val("");
      $('#modalDatos').modal('show');
      $("#btnUsar").addClass("d-none");
      $("#guardarEstilo").removeClass("d-none");
      $("#maquinaEstiloLista").addClass("d-none");
      $("#maquinaEstiloElegir").removeClass("d-none");
      $("#cantidadDatosListo").removeClass("d-none");
}

// FUNCION PARA LA CREACION DE UN NUEVO PRESUPUESTO
NUEVOPRESUPUESTO.prototype.CrearPresupuesto = function(number){
  document.getElementById("actualizarButton").style.display = "none";
  document.getElementById("guardarButton").style.display = null;

  bloqueado = number.split("-");

  number= number.split("-");
  var R3 = $("#cantidad"+number[1]+"").val();
  var R4 = $("#descripcion"+number[1]+"").val();

  if(R3 == null || R3.length == 0 || /^\s+$/.test(R3)){
      $("#cantidad"+number[1]).focus();
  }
  else if(R4 == null || R4.length == 0 || /^\s+$/.test(R4)){
      $("#descripcion"+number[1]).focus();
  }else{
    $("#PRINCIPAL #numeroItem").val($("#codigoPresupuestoItem"+number[1]).val());
    $("#PRINCIPAL input:eq(3)").val($("#descripcion"+number[1]).val());
    $("#medidasItem").val($("#medidas"+number[1]).val());
    $("#PRINCIPAL input:eq(5)").val($("#cantidad"+number[1]).val());
    $("#vendedor").val($("#vendedorx").val());
    $("#cliente").val($("#clientex").val());
    $("#btnAdelantar").click();
  }
}
 
// FUNCION PARA USAR ALGUN ESTILO Y ENVIAR LOS DATOS AL TABLA DE COTIZACION
NUEVOPRESUPUESTO.prototype.mostrarDatosFormula = function(){
    
    var number = document.getElementById("noVisible").innerHTML;
    
    var R1 = $("#clientex").val();
    var R2 = $("#vendedorx").val();
    var R3 = $("#cantidad"+number).val();
    var R4 = $("#descripcion"+number).val();
    
    if(R1 == null || R1.length == 0 || /^\s+$/.test(R1)){
        $("#clientex").focus();
    }
    else if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
        $("#vendedorx").focus();
    }
    else if(R3 == null || R3.length == 0 || /^\s+$/.test(R3) || R3<=0){
        $("#cantidad"+number+"").focus();
    }
    else if(R4 == null || R4.length == 0 || /^\s+$/.test(R4)){
        $("#descripcion"+number+"").focus();
    }else{
        slider4.enviarDatosF1810(number);
    }
}

// FUNCION PARA MOSTRAR LOS DATOS DE ALGUN ESTILO EN LA TABLA DE COTIZACION
NUEVOPRESUPUESTO.prototype.enviarDatosF1810 = function(number){
    
    var codigo = $("#codigoPresupuestoItem"+number).val();
    var codigoCliente = $("#clientex").val();
    var vendedor = $("#vendedorx").val();
    var cantidad = $("#cantidad"+number).val();
    var descripcionDatos = $("#descripcionDatos").val();
    var medidaResmaDatos = $("#medidaResmaDatos").val();
    var maquinaDatos = $("#maquinaDatos").val();
    switch(maquinaDatos) {
      case "GTO":
            var maquina = "MQ15";
        break;
      case "ADAST":
            var maquina = "MQ01";
        break;
      case "KBA":
            var maquina = "MQ21";
        break;
      case "R700":
            var maquina = "MQ29";
        break;
      case "SM":
            var maquina = "MQ30";
        break;
    }
    medidaResmaDatos = medidaResmaDatos.split("*");
    $("#cliente").val(codigoCliente);
    $("#PRINCIPAL #numeroItem").val(codigo);
    $("#vendedor").val(vendedor);
    $("#maquinas option[value="+ maquina +"]").attr("selected",true);
    $("#PRINCIPAL input:eq(3)").val(descripcionDatos);
    $("#PRINCIPAL input:eq(5)").val(cantidad);
    $("#PRINCIPAL input:eq(11)").val(medidaResmaDatos[0]);
    slider0.cotizar();
    $("#btnAdelantar").click();
}

// FUNCION PARA GUARDAR DATOS DEL ITEM
NUEVOPRESUPUESTO.prototype.enviar = function(){
  
  var R1 = $("#PRINCIPAL input:eq(10)").val();
  var R2 = $("#PRINCIPAL input:eq(11)").val();
    
  if(R1 == null || R1.length == 0 || /^\s+$/.test(R1)){
      $("#PRINCIPAL input:eq(10)").focus();
  }
  else if(R2 == null || R2.length == 0 || /^\s+$/.test(R2)){
      $("#PRINCIPAL input:eq(11)").focus();
  }else{
    if ( $("#clientex").val()!="0"){
      slider4.bloquearBotones();
    }
    slider4.mostrarTodosItem();
  }
}

// FUNCION PARA OBTENER EL NUMERO ITEM //

NUEVOPRESUPUESTO.prototype.mostrarTodosItem = function (){

    $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarTodosItem.php',
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
                var mayor=0;
            }else{
              var mayor=0;
              for (var i=0; i<datos.length;i++){
                  if(i==0){
                      mayor=parseInt(datos[i].ITPRESUNUMERO);
                  }else{
                      if(mayor<parseInt(datos[i].ITPRESUNUMERO)){
                          mayor=parseInt(datos[i].ITPRESUNUMERO);
                      }
                  }
              }
            }
          var numerodelItem = (mayor+1);
          slider0.guardarDatos(numerodelItem);
        }
    });
}
// FUNCION PARA VALIDAR DATOS DEL PRESUPUESTO HA MOSTRARSE EN LA VISTA PREVIA
NUEVOPRESUPUESTO.prototype.vistaPrevia = function(opcion){
     
    var $codigo={
        '_codigo': opcion 
    }
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
          slider4.mostrarVistaPrevia(datos);
        }
    });
    document.forms['PRINCIPAL'].reset();
 }

// FUNCION PARA MOSTRAR LOS DATOS DEL PRESUPUESTO EN LA PARTE INFERIOR DE LA VISTA
NUEVOPRESUPUESTO.prototype.mostrarVistaPrevia = function(datos){ 
  
  if(datos.response=="0"){
      mostrarMensaje("exito",'ITEM ELIMINADO');
  }else{
    switch(datos[0].EMPCODIGO){
          case 'CT': imagen="<img src='Modulos/ModPresupuesto/Logo-Computextos.png' width='220' height='65'>";break;
          case 'ER': imagen="<img src='Modulos/ModPresupuesto/Logo-EdicionesReales.png' width='220' height='65'>";break;
          case 'ED': imagen="<img src='Modulos/ModPresupuesto/Logo-EditorialEImprentaDesa.png' width='220' height='65'>";break;
          case 'GR': imagen="<img src='Modulos/ModPresupuesto/Logo-GraficaReal.png' width='220' height='65'>";break;
         default : imagen="<img src='Modulos/ModPresupuesto/Logo-Computextos.png' width='220' height='65'>";break;
      }
    $("#logoEmpresa").html(imagen); 
    $("#clienteEmpresa").html(datos[0].CLIENRAZON_SOCIAL);
    $("#nPresupuesto").html("Presupuesto "+datos[0].PRESUPNUMERO);

    var tablaItem="";
    var preciototal=0;
    var precioSoles=0;
    var precioDolares=0;
    var tipoMonedaSoles ="";
    var itemstotales = 0;
    var tipoMonedaDolares ="";
    var valorTotal= "";
    var valorVenta= "Total : ";
    var valorTotalSoles = "VALOR TOTAL EN SOLES : ";
    var valorTotalDolares = "VALOR TOTAL EN DOLARES : ";
    var elementos = new Array();      
    var precio = new Array();      
    for(var i=0; i<datos.length; i++){
      elementos[i] = datos[i].ITPRESUCODIGO;
      if(datos[i].ITPRESUIMPORTE.substr(0,1)=="S"){
          precio[i] = datos[i].ITPRESUIMPORTE.substr(3);
      }else{
          precio[i] = datos[i].ITPRESUIMPORTE.substr(1);
      }
    }
    var cantidad = [];
    var costoItem = [];
    var repetidos = [];
    var temporal = [];
    var texto = [];
    elementos.forEach((value,index)=>{
    temporal = Object.assign([],elementos);
    temporal.splice(index,1);

    if(temporal.indexOf(value)!=-1 && repetidos.indexOf(value)==-1)      repetidos.push(value);
    }); 
    var repeat = 0;
    var dinner = 0;
    for(var i=0; i<repetidos.length; i++){
      for(var j=0; j<elementos.length; j++){
           if(repetidos[i]==elementos[j]){
             repeat=repeat+1;
             dinner=dinner+parseFloat(precio[j]);
           }
         }
      cantidad[i]=repeat;
      repeat=0;
      costoItem[i]=dinner;
      dinner=0;
     }     
    var contador = 0;
    var posicion = 0;
    var respuesta = "NO";
    var tipoItem = "NO";
    for(var i=0; i<datos.length; i++){
      var item=datos[i].ITPRESUCODIGO;
      for(var k=0; k<repetidos.length; k++){
        if(datos[i].ITPRESUCODIGO == repetidos[k]){
          tipoItem="SI";
          contador= contador+1;
          if (contador==cantidad[k]){
            respuesta="SI";
            posicion=k;
            contador=0;
          }
        }
      }

      item = item.substr(8);
      itemstotales= item
      var impresion;
      var colores;
      if(datos[i].DETPRESUPNUM_COLOR==4){
        colores="FULL COLOR";
      }
      else{
        colores=datos[i].DETPRESUPNUM_COLOR+" colores";
      }
      if(datos[i].DETPRESUPTIPO_IMPRESION==1){
            impresion="SOLO TIRA";
      }
      else if(datos[i].DETPRESUPTIPO_IMPRESION==2){
            impresion="T/R APARTE";
      }
      else  if(datos[i].DETPRESUPTIPO_IMPRESION==3){
            impresion="T/R JUNTA";
      }
      var acabados="";
      if (datos[i].DETPRESUPBARNIZ_PLASTI==0 || datos[i].DETPRESUPBARNIZ_PLASTI==null || datos[i].DETPRESUPBARNIZ_PLASTI.length==0){}else{    acabados+=""+datos[i].DETPRESUPBARNIZ_PLASTI+ " <br />"; }

      if (datos[i].DETPRESUPBARNIZ_PLASTI1==0 || datos[i].DETPRESUPBARNIZ_PLASTI1==null || datos[i].DETPRESUPBARNIZ_PLASTI1.length==0){}else{    acabados+=""+datos[i].DETPRESUPBARNIZ_PLASTI1+"  <br />"; }

      if (datos[i].DETPRESUPBARNIZ_PLASTI2==0 || datos[i].DETPRESUPBARNIZ_PLASTI2==null || datos[i].DETPRESUPBARNIZ_PLASTI2.length==0){}else{    acabados+=""+datos[i].DETPRESUPBARNIZ_PLASTI2+" <br />"; }

      if (datos[i].DETPRESUPTROQUEL=="-" || datos[i].DETPRESUPTROQUEL==""){}else{    acabados+="TROQUELADO - "+datos[i].DETPRESUPTROQUEL+" <br />"; } 

      if (datos[i].DETPRESUPDOBLADO_ALCE=="NO"){}else{    acabados+="DOBLADO - "+datos[i].DETPRESUPDOBLADO_ALCE+" <br />"; } 

      if (datos[i].DETPRESUPCOSIDO_COLA_GRAPA=="NO"){}else{    acabados+="ALCE - "+datos[i].DETPRESUPCOSIDO_COLA_GRAPA+" <br />"; }

      if (datos[i].DETPRESUPCAJA_PAQUETE==0 || datos[i].DETPRESUPCAJA_PAQUETE==null || datos[i].DETPRESUPCAJA_PAQUETE.length==0){}
      else{
        if(datos[i].DETPRESUPCAJA_PAQUETE=="CAJA"){
              acabados+="ENCAJONADO <br />";
          }
          else{
             acabados+="EMPAQUETADO DE "+datos[i].DETPRESUPCAJA_PAQUETE+" unidades X PAQUETE <br />";
          }
      }

      if (datos[i].DETPRESUPCOSTO_COLA_FORRO==0){}else{    acabados+="ENCOLADO Y FORRADO <br />"; } 

      if (datos[i].DETPRESUPCOSTO_CORTE==0){}else{    acabados+="DEGOLLADO Y CORTE <br />"; } 

      if (datos[i].DETPRESUPCOSTO_ARMADO==0){}else{    acabados+="ARMADO Y PEGADO DE BOLSILLO <br />"; } 

      if (datos[i].DETPRESUPCOSTO_OJAL==0){}else{    acabados+="PUESTA DE OJALILLOS <br />"; } 

      if (datos[i].DETPRESUPCOSTO_NYLON==0){}else{    acabados+="NYLON 0.7mm <br />";}

      tablaItem+="<tr>\
                    <td class='font-weight-bold pt-3' colspan='3' style='text-decoration: underline' >"+ item+ ". "+ datos[i].ITPRESUDESCRIPCION+"</td>\
                  </tr>\
                  <tr>\
                    <td>Cantidad</td>\
                    <td>:</td>\
                    <td class='descripcion'>"+datos[i].DETPRESUPTIRAJE_TOTAL+" unidades</td>\
                  </tr>\
                  <tr>\                                                 <td>Impresión</td>\
                    <td>:</td>\
                    <td class='descripcion'>"+colores+" "+ impresion+"</td>\
                  </tr>\
                  <tr>\                                                 <td>Material</td>\
                    <td>:</td>\
                    <td class='descripcion'>"+datos[i].DETPRESUPTIP_PAPEL+" "+ datos[i].DETPRESUPGRAMAJE +" GRS."+"</td>\
                  </tr>\
                  <tr>\                                                 <td>Medidas</td>\
                    <td>:</td>\
                    <td class='descripcion'>"+datos[i].ITPRESUMEDIDAS +"</td>\
                  </tr>";

      if(acabados!=""){
          tablaItem+="<tr>\                                                 <td>Acabados</td>\
                        <td>:</td>\
                        <td class='descripcion'>"+acabados+"</td>\
                    </tr>";
      }
      if(tipoItem=="NO"){
          tablaItem+="<tr>\                                                 <td>Valor de Venta</td>\
                    <td>:</td>\
                    <td class='descripcion red-text font-weight-bold text-left'>"+datos[i].ITPRESUIMPORTE+ " + IGV"+"</td>\
                  </tr>";
      }
      if(respuesta=="SI" ){
        if(datos[i].ITPRESUIMPORTE.substr(0,1)=="S"){
             tablaItem+="<tr>\                                                 <td>Valor de Venta</td>\
                    <td>:</td>\
                    <td class='descripcion red-text font-weight-bold text-left'>S./"+costoItem[posicion]+ " + IGV"+"</td>\
                  </tr>";
        }else{
             tablaItem+="<tr>\                                                 <td>Valor de Venta</td>\
                    <td>:</td>\
                    <td class='descripcion red-text font-weight-bold text-left'>$"+costoItem[posicion]+ " + IGV"+"</td>\
                  </tr>";
        }
        respuesta="NO";
        tipoItem="NO";
      }

      var inicial=datos[i].ITPRESUIMPORTE.substr(0,1);
      if( inicial=='$'){
          tipoMonedaDolares = inicial; 
          precioDolares += parseFloat(datos[i].ITPRESUIMPORTE.substr(1)); 
      }else if (inicial=='S'){
          tipoMonedaSoles = inicial;
          precioSoles += parseFloat(datos[i].ITPRESUIMPORTE.substr(3));
      }  

    }
    if(precioSoles !=""){
        valorTotalSoles += tipoMonedaSoles+"/"+precioSoles+" + IGV" + "<br/>";
        valorVenta += tipoMonedaSoles+"/"+precioSoles+" + IGV" + "<br/>";
    }
    if(precioDolares != ""){
       valorTotalDolares += tipoMonedaDolares + precioDolares +"+ IGV " + "<br/>";
        valorVenta += tipoMonedaDolares + precioDolares +"+ IGV" + "<br/>";
    }
    if(valorTotalSoles!="VALOR TOTAL EN SOLES : "){
        valorTotal+=valorTotalSoles;
    }
    if(valorTotalDolares !="VALOR TOTAL EN DOLARES : "){
        valorTotal += valorTotalDolares;
    }

    $("#cuerpovista").html(tablaItem);
    $("#totalVenta").html(valorVenta);
    $("#valorTotal").html(valorTotal);
    $("#ejecutiva").html(" "+datos[0].PERSNOMBRE+" "+datos[0].PERSAPELLIDO_PATERNO+" "+datos[0].PERSAPELLIDO_MATERNO+"");
    document.forms['PRINCIPAL'].reset();
  }
}

// FUNCION PARA BLOQUEAR LOS BOTONES DE PERSONALIZADO Y NUEVO ESTILO Y DESBLOQUEAR EL BOTON DE EDITAR
NUEVOPRESUPUESTO.prototype.bloquearBotones = function(){
    document.getElementById("-"+bloqueado[1]).disabled=true;
}

// FUNCION PARA EDITAR DATOS DE UN ITEM
NUEVOPRESUPUESTO.prototype.editarItem = function(id){
    
    document.getElementById("actualizarButton").style.display = null;
    document.getElementById("guardarButton").style.display = "none";
    pagina = "actualizar";
    
    $("#btnAdelantar").click();
        
    var $valor={
        '_codigo' : id
   }
    
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarItemDetPresupuestoXNumero.php',
        type: 'POST',
        data: $valor,
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                $("#vendedor").val(datos.PRESUPVENDEDOR);
                $("#PRINCIPAL #numeroItem").val(datos.ITPRESUCODIGO);
                $("#PRINCIPAL #maquinas option[value="+ datos.MAQUICODIGO +"]").attr("selected",true);
                $("#PRINCIPAL input:eq(3)").val(datos.ITPRESUDESCRIPCION);
                $("#PRINCIPAL input:eq(4)").val(datos.DETPRESUPNUM_PM);
                $("#PRINCIPAL input:eq(5)").val(datos.DETPRESUPTIRAJE_TOTAL);
                $("#PRINCIPAL input:eq(7)").val(datos.DETPRESUPPIEZAS_GRAFICAS);
                $("#PRINCIPAL input:eq(8)").val(datos.DETPRESUPNUM_PLIEGO);
                $("#PRINCIPAL input:eq(9)").val(datos.DETPRESUPNUM_COLOR);
                $("#PRINCIPAL input:eq(10)").val(datos.DETPRESUPGRAMAJE);
                $("#PRINCIPAL input:eq(11)").val(parseInt(datos.DETPRESUPTAMAÑO_PAPEL));
                $("#PRINCIPAL input:eq(12)").val(datos.DETPRESUPCAJA_PAQUETE);
                $("#PRINCIPAL input:eq(13)").val(datos.DETPRESUPCOSTO_PLASTICO);
                $("#PRINCIPAL input:eq(14)").val(datos.DETPRESUPCOSTO_SERV_PLASTIFICADO);
                $("#PRINCIPAL input:eq(15)").val(datos.DETPRESUPCOSTO_CAJA);
                $("#PRINCIPAL input:eq(16)").val(datos.DETPRESUPCOSTO_COLA_FORRO );
                $("#PRINCIPAL input:eq(17)").val(datos.DETPRESUPCOSTO_CORTE);
                $("#PRINCIPAL input:eq(18)").val(datos.DETPRESUPCOSTO_ARMADO);
                $("#PRINCIPAL input:eq(19)").val(datos.DETPRESUPCOSTO_OJAL);
                $("#PRINCIPAL input:eq(20)").val(datos.DETPRESUPCOSTO_NYLON);
                $("#PRINCIPAL input:eq(21)").val(datos.DETPRESUPCOSTO_PNYLON);
                $("#PRINCIPAL input:eq(22)").val(datos.DETPRESUPEXTRAS);
                
                $("#PRINCIPAL select:eq(3)").val((datos.DETPRESUPTIPO_PLIEGO.toLowerCase()));
                $("#PRINCIPAL select:eq(4)").val(datos.DETPRESUPTIPO_IMPRESION);
                //$("#PRINCIPAL select:eq(5)").val(datos.DETPRESUPTIPO_IMPRESION);
                $("#PRINCIPAL select:eq(6)").val(datos.DETPRESUPQUALITY );
                $("#PRINCIPAL select:eq(7)").val(datos.DETPRESUPCONTRATO);
                $("#PRINCIPAL select:eq(8)").val(datos.DETPRESUPPRUEBA);
                $("#PRINCIPAL select:eq(9)").val(datos.DETPRESUPMENSAJERIA);
                $("#PRINCIPAL select:eq(10)").val(datos.DETPRESUPBARNIZ_PLASTI);
                $("#PRINCIPAL select:eq(11)").val(datos.DETPRESUPBARNIZ_PLASTI1);
                $("#PRINCIPAL select:eq(12)").val(datos.DETPRESUPBARNIZ_PLASTI2);
                $("#PRINCIPAL select:eq(13)").val(datos.DETPRESUPTROQUEL );
                $("#PRINCIPAL select:eq(14)").val(datos.DETPRESUPDOBLADO_ALCE);
                $("#PRINCIPAL select:eq(15)").val(datos.DETPRESUPCOSIDO_COLA_GRAPA);
                $("#medidasItem").val(datos.ITPRESUMEDIDAS);
                $("#PRINCIPAL input:eq(44)").val(datos.ITPRESUNUMERO);
                $("#codigonumeroItem").val(datos.ITPRESUNUMERO);
                slider0.cotizar();
                slider1.F1810_Calcular();
                slider3.valoresIniciales();
                slider3.resultado();
                slider0.precios();
            }
        }
    });
}

// FUNCION DE GUARDAR DATOS EDITADOS DE UN ITEM
NUEVOPRESUPUESTO.prototype.actualizarItem = function(){
  var numeroPrincipalItem =  $("#codigoactualizar").val()
  var datosSelect =[],datosInput  =[];

  for(var i=0; i<16; i++){
    if(i==0 || i==4 || i==5 || i==10 || i==11 || i==12 || i==14 || i==15){
      datosSelect[i]=$("#PRINCIPAL select:eq("+i+")").val();
    }else{
      datosSelect[i]=$("#PRINCIPAL select:eq("+i+") option:selected").text();
    }
  }
  for(var i=0; i<19; i++){
    datosInput[i]=$("#PRINCIPAL input:eq("+(i+4)+")").val();
  }
  
  var code = $("#PRINCIPAL #numeroItem").val();
  var item = code.split("-")[2];
  $("#medidas"+item).val($("#medidasItem").val());
  var $datosCotizacion={
    '_code': "C"+code+"-"+numeroPrincipalItem,
    '_dato1': $("#maquinas").val(),
    '_dato2': datosSelect[3],
    '_dato3': datosInput[0],
    '_dato4': datosInput[1],
    //'_dato5': datosInput[2],
    '_dato6': datosInput[3],
    '_dato7': datosInput[4],
    '_dato8': datosSelect[4],
    '_dato9': datosInput[5],
    '_dato10': $("#PRINCIPAL select:eq(5) option:selected").text(),
    '_dato11': datosSelect[6],
    '_dato12': datosSelect[7],
    '_dato13': datosInput[6],
    '_dato14': datosInput[7],
    '_dato15': datosSelect[8],
    '_dato16': datosSelect[9],
    '_dato17': datosSelect[10],
    '_dato18': datosSelect[11],
    '_dato19': datosSelect[12],
    '_dato20': datosSelect[13],
    '_dato21': datosSelect[14],
    '_dato22': datosSelect[15],
    '_dato23': datosInput[8],
    
    '_dato24': datosInput[9],
    '_dato25': datosInput[10],
    '_dato26': datosInput[11],
    '_dato27': datosInput[12],
    '_dato28': datosInput[13],
    '_dato29': datosInput[14],
    '_dato30': datosInput[15],
    '_dato31': datosInput[16],
    '_dato32': datosInput[17],
    '_dato33': datosInput[18],
  }
  
  var $datosPrecios={
    '_code': "P"+code+"-"+numeroPrincipalItem,
    '_total1': $("#PRINCIPAL input.strong:eq(0)").val(),
    '_total2': $("#PRINCIPAL input.strong:eq(1)").val(),
    '_total3': $("#PRINCIPAL input.strong:eq(2)").val(),
    '_total4': $("#PRINCIPAL input.strong:eq(3)").val(),
    '_total5': $("#PRINCIPAL input.strong:eq(4)").val(),
    
    '_rango1': $("#PRINCIPAL input.enfasis3:eq(0)").val(),
    '_rango2': $("#PRINCIPAL input.enfasis3:eq(1)").val(),
    '_rango3': $("#PRINCIPAL input.enfasis3:eq(2)").val(),
    '_rango4': $("#PRINCIPAL input.enfasis3:eq(3)").val(),
    
    '_precios1': $("#PRINCIPAL input.strong2:eq(0)").val(),
    '_precios2': $("#PRINCIPAL input.strong2:eq(1)").val(),
    '_precios3': $("#PRINCIPAL input.strong2:eq(2)").val(),
    '_precios4': $("#PRINCIPAL input.strong2:eq(3)").val(),
    '_precios5': $("#PRINCIPAL input.strong2:eq(4)").val(),
    '_precios6': $("#PRINCIPAL input.strong3:eq(0)").val(),
    '_precios7': $("#PRINCIPAL input.strong2:eq(5)").val(),
    '_precios8': $("#PRINCIPAL input.strong3:eq(1)").val(),
    '_precios9': $("#PRINCIPAL input.strong3:eq(2)").val(),
  }
  
  if(document.getElementById("soles").checked == true){
    var monto = "S/."+$("#PRINCIPAL #facturacion").val();
  }
  else{
    var monto = "$"+$("#PRINCIPAL #facturacion").val();
  }
  
  var $datosItem={
    '_code': numeroPrincipalItem,
    '_medidas' : $("#medidasItem").val(),
    '_descripcion': $("#PRINCIPAL input:eq(3)").val(),
    '_monto': monto
  }
  
  for(var i=0;i<3;i++){
    
  if(i==0){
          
      $.ajax({
            url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarDatosCotizacion.php',
            type: 'POST',
            data: $datosCotizacion,
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
            }
        });
      
    }else if(i==1){
        
        $.ajax({
            url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarDatosPrecios.php',
            type: 'POST',
            data: $datosPrecios,
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
            }
        });
        
    }else{
        
      $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarDatosItem.php',
        type: 'POST',
        data: $datosItem,
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
                if(pagina == "f1810"){
                  slider4.vistaPrevia(code.split("-")[0].concat("-").concat(code.split("-")[1]));
                  for(var i=0;i<cantidadDiv;i++){
                    slider4.mostrarSubItems($("#codigoPresupuestoItem"+(i+1)+"").val(),(i+1));
                  }
                  $("#btnRetroceder").click();
                
                }else{
                  slider4.enviarActualizar(code.split("-")[0].concat("-").concat(code.split("-")[1]));
                }
                mostrarMensaje("exito","CAMBIOS SATISFACTORIOS")
              }
          }
      });
        
    }
  }  
}

// FUNCION PARA IMPRIMIR EL RESUMEN DEL PRESUPUESTO
NUEVOPRESUPUESTO.prototype.imprimir = function(nombreDiv){

  var contenido= document.getElementById(nombreDiv).innerHTML;
  var contenidoOriginal= document.body.innerHTML;
  document.body.innerHTML = contenido;
  window.print();
  document.body.innerHTML = contenidoOriginal;
  slider4.cargarItem(0);
}

// FUNCION PARA GUARDAR TODOS LOS DATOS GENERALES DEL PRESUPUESTO
NUEVOPRESUPUESTO.prototype.guardarPresupuestoTotal = function(){
    
    var mayor=0;
    var cantidadDeItem=0;
    
    var texto = $("#valorTotal").text().split("+ IGV");
    
    var texto1 = texto[0].split(":");
    var texto2 = texto[1].split(":");
    var soles="S/0"; var dolares="$0";
    switch(texto1[0]){
      case('VALOR TOTAL EN SOLES '): soles=texto1[1].substr(1); break;
      case('VALOR TOTAL EN DOLARES '): dolares=texto1[1].substr(1); break;
    }
  
    if( texto2 == " " || texto2 == ""){
    }else{
      dolares= texto2[1].substr(1);
    }
    
    var code = $("#codigoPresupuestoItem1").val();
    var codigoPrespuestoPrincipal = code.split("-");
    for(var i=0;i<2;i++){
      if(i==0){
          
        $.ajax({
            url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_MostrarTodosItem.php',
            type: 'GET',
            dataType: 'json',
            async: false,
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
                    mayor=0;
              }else{ 
                for (var i=0; i<datos.length;i++){
                  if(datos[i].ITPRESUCODIGO.substr(0,7)==codigoPrespuestoPrincipal[0].concat("-").concat(codigoPrespuestoPrincipal[1])){
                      if(datos[i].ITPRESUCODIGO.substr(8)=="1"){
                        mayor=parseInt(datos[i].ITPRESUCODIGO.substr(8));
                      }else{
                        if(mayor<parseInt(datos[i].ITPRESUCODIGO.substr(8))){
                          mayor=parseInt(datos[i].ITPRESUCODIGO.substr(8));
                        }
                      }
                   }
                }
              }
              cantidadDeItem=mayor;
            }
        });
        
      }
      if(i==1){
        var $datos = {
          '_code': codigoPrespuestoPrincipal[0]+"-"+codigoPrespuestoPrincipal[1],
          '_cantItem' : cantidadDeItem,
          '_totalSoles' : soles,
          '_totalDolares' : dolares,
        }
        $.ajax({
          url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarTotalPresupuesto.php',
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
          success: function(datos){

              if(datos.response == 0){
                  mostrarMensaje("error",'ERROR: '+datos.message);
              }
              else{
                  mostrarMensaje("exito","PRESUPUESTO GUARDADO CORRECTAMENTE");
                  $('#form')[0].reset.click();
                  ventanaNuevoPresupuesto();
                }
            }
        });
      }
    }
}

// FUNCION PARA CANCELAR Y ELIMINAR EL PRESUPUESTO
NUEVOPRESUPUESTO.prototype.cancelarPresupuestoTotal = function(){
    
    $("#tituloEstilo").html("¿DESEA ELIMINAR ESTE PRESUPUESTO?");
    $('#modalOpcion').modal('show');
    $("#eliminarPresupuesto").removeClass("d-none");
    $("#eliminarSubItem").addClass("d-none");
}

NUEVOPRESUPUESTO.prototype.cancelarPresupuestoTotal2 = function(){
  var code = $("#codigoPresupuestoItem1").val();
  var codigoPrespuestoPrincipal = code.split("-");
    
  var $datos = {
    '_code': codigoPrespuestoPrincipal[0]+"-"+codigoPrespuestoPrincipal[1],
  }
    
  $.ajax({
    url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_EliminarTotalRegistroPresupuesto.php',
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
    success: function(datos){

        if(datos.response == 0){
            mostrarMensaje("error",'ERROR: '+datos.message);
        }
        else{
            slider4.eliminarPresupuestoGeneral($datos);
      }
    }
  });
}

// FUNCION PARA ELIMINAR EL REGISTRO DE PRESUPUESTO
NUEVOPRESUPUESTO.prototype.eliminarPresupuestoGeneral = function($datos){
    $.ajax({
          url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_EliminarPresupuestoGeneral.php',
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
          success: function(datos){

              if(datos.response == 0){
                  mostrarMensaje("error",'ERROR: '+datos.message);
              }
              else{
                  mostrarMensaje("exito","PRESUPUESTO CANCELADO");
                  ventanaNuevoPresupuesto();
            }
          }
        });
}

//FUNCION PARA MOSTRAR NOMBRE DEL CLIENTE Y EL VENDEDOR EN EL RESUMEN DEL PRESUPUESTO
NUEVOPRESUPUESTO.prototype.colocarPContactoYCliente = function(){
    $("#pContactoTd").html("Atencion, "+$("#pContacto").val());
    $("#clienteEmpresa").html(document.getElementById("clientex").options[document.getElementById("clientex").selectedIndex].text);
}

//FUNCION PARA REENVIAR A ACTUALIZAR PRESUPUESTO
NUEVOPRESUPUESTO.prototype.enviarActualizar = function(code){
  var presupcodigo = code;
  $.ajax({
        url: 'Modulos/ModPresupuesto/ActualizarPresupuesto.html',
        success: function(data) {
            $('#cuerpo').html(data);
            clearInterval(intervalo);
            $("#presupuestos").val(presupcodigo);
            mostrarItem(presupcodigo);
            mostrarMensaje("exito","ITEM PRESUPUESTO ACTUALIZADO")
        }
    });
}

var slider4 = new NUEVOPRESUPUESTO();

/*================================================================================
  SLIDER 0: FORMULA DE PRESUPUESTOS
================================================================================*/

//  FUNCION PRINCIPAL
var FORMULAPRESUPUESTO =function(){
  
  this.datosSelect = [];
  this.datosInput = [];
  
};

//  FUNCION ENVIAR DATOS DE COTIZACION
FORMULAPRESUPUESTO.prototype.cotizar = function(){
  
  var datosSelect =[],
      datosInput  =[];

  for(var i=0; i<16; i++){
    if(i==0 || i==4 || i==5 || i==10 || i==11 || i==12 || i==14 || i==15){
      datosSelect[i]=$("#PRINCIPAL select:eq("+i+")").val();
    }else{
      datosSelect[i]=$("#PRINCIPAL select:eq("+i+") option:selected").text();
    }
  }
  for(var i=0; i<19; i++){
    datosInput[i]=$("#PRINCIPAL input:eq("+(i+4)+")").val();
  }
  
  $("#F1810 td:eq(4)").html(datosSelect[1]);    //   VENDEDOR
  $("#F1810 td:eq(8)").html(datosSelect[2]);    //   MAQUINA
  $("#F1810 td:eq(12)").html(datosSelect[3]);   //   TAMAÑO DEL PLIEGO DE MAQUINA
  $("#F1810 td:eq(15)").html(datosInput[0]);    //   # DE P/M's POR HOJA/RESMA
  $("#F1810 td:eq(18)").html(datosInput[1]);    //   TIRAJE TOTAL DE PIEZAS GRAFICAS
  $("#F1810 td:eq(22)").html(datosInput[3]);    //   # DE PIEZAS GRAFICAS POR P/M
  
  $("#F1810 td:eq(38)").html(datosInput[4]);    //   # DE PLIEGOS DE MAQUINA DEL TRABAJO 
  $("#F1810 td:eq(42)").html((datosSelect[4]==1)? 1:2);   //   TIPO DE IMPRESION
  $("#F1810 td:eq(46)").html(datosInput[5]);    //   # DE COLORES
  $("#F1810 td:eq(50)").html(datosSelect[5]);   //   TIPO DE PAPEL
  $("#F1810 td:eq(54)").html(datosInput[6]);    //   GRAMAJE DE PAPEL EJ 90; 115; 150; 300
  $("#F1810 td:eq(58)").html(datosInput[7]);    //   TAMAÑO DEL PAPEL 61, 69, 70, 72
  $("#F1810 td:eq(62)").html(datosSelect[8]);   //   PRUEBA DE COLOR?
  $("#F1810 td:eq(66)").html(datosSelect[9]);   //   MENSAJERIAS
  $("#F1810 td:eq(70)").html(datosSelect[10]);  //   TIPO DE PLASTIFICADO O BARNIZADO
  $("#F1810 td:eq(74)").html(datosSelect[11]);  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 1
  $("#F1810 td:eq(78)").html(datosSelect[12]);  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 2

  $("#F1810 td:eq(82)").html(datosSelect[13]);                  //   TROQUELADO?
  $("#F1810 td:eq(86)").html(datosSelect[14]);                  //   DOBLADO Y ALZE?
  $("#F1810 td:eq(90)").html(datosSelect[14].substr(0,3));      //   DOBLADO EN MAQUINA
  $("#F1810 td:eq(94)").html(datosSelect[14].substr(3,1));      //   DOBLADO MANUAL
  
  $("#F1810 td:eq(102)").html(datosSelect[15]); //   COSIDO HILO, ENCOLADO O ENGRAPADO
  $("#F1810 td:eq(106)").html(datosInput[8]);   //   EMPAQUETADO O ENCAJONADO
  $("#F1810 td:eq(109)").html("-");             //   MOVILIDAD O DESPACHO ($$$)
  
  $("#F1810 td:eq(113)").html("-");             //   SERVICIOS DE TERCEROS($$$)
  
  var terceros =parseFloat(datosInput[9])+parseFloat(datosInput[10])+parseFloat(datosInput[11])+parseFloat(datosInput[12])+
              parseFloat(datosInput[13])+parseFloat(datosInput[14])+parseFloat(datosInput[15])+parseFloat(datosInput[16])+parseFloat(datosInput[17]);
  $("#F1810 td:eq(114)").html(terceros);        //   SERVICIOS DE TERCEROS($$$)
  $("#F1810 td:eq(133)").html("-");             //   TOTAL SEGUN ESCALA
  
  this.datosSelect = datosSelect;
  this.datosInput = datosInput;
  
  
  // DES/HABILITAR SEGUN LOS CAMPOS OBLIGATORIOS
  if($("#PRINCIPAL #cliente").val()!="" && $("#PRINCIPAL input:eq(3)").val()!="" && datosSelect[2]!="Elegir Maquina" && $("#PRINCIPAL #facturacion").val()!=""){
      $("#guardarButton").removeAttr("disabled");
      $("#actualizarButton").removeAttr("disabled");
  }else{
      document.getElementById("guardarButton").disabled = true;
      document.getElementById("actualizarButton").disabled = true;
  }
  
}

//  FUNCION PARA CALCULAR LOS PRECIOS DE COTIZACION
FORMULAPRESUPUESTO.prototype.precios = function(){
  
  //  TOTAL
  var cambio=parseFloat($("#F1810INSUMOS #tipocambio").val());
  
  var pDolares  = parseFloat(slider1.total)+ slider1.extra;
  var pDolaresNormal  = parseFloat(slider1.totalNormal + slider1.extra);
  $("#PRINCIPAL input.strong:eq(0)").val("$"+pDolares.toFixed(2)); //DOLARES
  
  var pSoles  = (pDolares + slider1.extra)*cambio;
  var pSolesNormal  = (pDolaresNormal + slider1.extra)*cambio ;
  $("#PRINCIPAL input.strong:eq(1)").val("S/."+pSoles.toFixed(2)); //SOLES
  
  var pMillar = pSoles/(parseFloat($("#PRINCIPAL input:eq(5)").val())/1000);
  $("#PRINCIPAL input.strong:eq(2)").val("S/."+pMillar.toFixed(2)); //MILLAR
  
  var pUnit = pSoles/parseFloat($("#PRINCIPAL input:eq(5)").val());
  $("#PRINCIPAL input.strong:eq(3)").val("S/."+pUnit.toFixed(2)); //UNIDAD
  
  $("#PRINCIPAL input.strong:eq(4)").val("S/."+(pUnit*500).toFixed(2)); //500 HOJAS
  
  
  
  //  RANGO DE PRECIOS
  
  $("#PRINCIPAL input.enfasis3:eq(0)").val("$"+pDolares.toFixed(2)); //F1810 DOLARES
  $("#PRINCIPAL input.enfasis3:eq(1)").val("S/."+pSoles.toFixed(2)); //F1810 SOLES
  $("#PRINCIPAL input.enfasis3:eq(2)").val("$"+pDolaresNormal.toFixed(2)); //NORMAL DOLARES
  $("#PRINCIPAL input.enfasis3:eq(3)").val("S/."+pSolesNormal.toFixed(2)); //NORMAL SOLES
  
  
  
  //  PRECIOS GENERALES
  
  var insumos=slider1.insumos*parseFloat($("#F1810INSUMOS #tipocambio").val());
  $("#PRINCIPAL input.strong2:eq(0)").val("S/."+insumos.toFixed(2)); //INSUMOS
  
  
  var talleres=slider1.talleres*parseFloat($("#F1810INSUMOS #tipocambio").val());
  $("#PRINCIPAL input.strong2:eq(1)").val("S/."+talleres.toFixed(2)); //TALLERES
  
  
  var flete=slider1.flete*parseFloat($("#F1810INSUMOS #tipocambio").val());
  $("#PRINCIPAL input.strong2:eq(2)").val("S/."+flete.toFixed(2)); //EMB/FLETE
  
  
  var gg=(insumos+talleres+flete)*0.18;
  $("#PRINCIPAL input.strong2:eq(3)").val("S/."+gg.toFixed(2)); //GG
  
  
  var margen=(insumos+talleres+flete+gg)*0.10;
  $("#PRINCIPAL input.strong2:eq(4)").val("S/."+margen.toFixed(2)); //MARGEN
  
  
  var neto=insumos+talleres+flete+gg+margen;
  $("#PRINCIPAL input.strong3:eq(0)").val("S/."+neto.toFixed(2)); //TOTAL NETO
  
  
  var impuesto=neto*0.18;
  $("#PRINCIPAL input.strong2:eq(5)").val("S/."+impuesto.toFixed(2)); //IMPUESTOS
  
  
  var total=neto+impuesto;
  $("#PRINCIPAL input.strong3:eq(1)").val("S/."+total.toFixed(2)); //TOTAL
  
  
  var unidades=total/parseFloat($("#PRINCIPAL input:eq(5)").val());
  $("#PRINCIPAL input.strong3:eq(2)").val("S/."+unidades.toFixed(2)); //PREC. UNIT
  
}

//  FUNCION PARA REGISTRAR LOS DATOS DEL PRESUPUESTO
FORMULAPRESUPUESTO.prototype.guardarDatos = function(numerodelItem){
  var code = $("#PRINCIPAL #numeroItem").val();
  var codigoPrespuestoPrincipal = code.split("-");
  
  var $datosCotizacion={
    '_code': "C"+code+"-"+numerodelItem,
    '_dato1': $("#maquinas").val(),
    '_dato2': this.datosSelect[3],
    '_dato3': this.datosInput[0],
    '_dato4': this.datosInput[1],
    //'_dato5': this.datosInput[2],
    '_dato6': this.datosInput[3],
    '_dato7': this.datosInput[4],
    '_dato8': this.datosSelect[4],
    '_dato9': this.datosInput[5],
    '_dato10': $("#PRINCIPAL select:eq(5) option:selected").text(),
    '_dato11': this.datosSelect[6],
    '_dato12': this.datosSelect[7],
    '_dato13': this.datosInput[6],
    '_dato14': this.datosInput[7],
    '_dato15': this.datosSelect[8],
    '_dato16': this.datosSelect[9],
    '_dato17': this.datosSelect[10],
    '_dato18': this.datosSelect[11],
    '_dato19': this.datosSelect[12],
    '_dato20': this.datosSelect[13],
    '_dato21': this.datosSelect[14],
    '_dato22': this.datosSelect[15],
    '_dato23': this.datosInput[8],
    
    '_dato24': this.datosInput[9],
    '_dato25': this.datosInput[10],
    '_dato26': this.datosInput[11],
    '_dato27': this.datosInput[12],
    '_dato28': this.datosInput[13],
    '_dato29': this.datosInput[14],
    '_dato30': this.datosInput[15],
    '_dato31': this.datosInput[16],
    '_dato32': this.datosInput[17],
    '_dato33': this.datosInput[18]

  }
  
  var $datosPrecios={
    '_code': "P"+code+"-"+numerodelItem,
    '_total1': $("#PRINCIPAL input.strong:eq(0)").val(),
    '_total2': $("#PRINCIPAL input.strong:eq(1)").val(),
    '_total3': $("#PRINCIPAL input.strong:eq(2)").val(),
    '_total4': $("#PRINCIPAL input.strong:eq(3)").val(),
    '_total5': $("#PRINCIPAL input.strong:eq(4)").val(),
    
    '_rango1': $("#PRINCIPAL input.enfasis3:eq(0)").val(),
    '_rango2': $("#PRINCIPAL input.enfasis3:eq(1)").val(),
    '_rango3': $("#PRINCIPAL input.enfasis3:eq(2)").val(),
    '_rango4': $("#PRINCIPAL input.enfasis3:eq(3)").val(),
    
    '_precios1': $("#PRINCIPAL input.strong2:eq(0)").val(),
    '_precios2': $("#PRINCIPAL input.strong2:eq(1)").val(),
    '_precios3': $("#PRINCIPAL input.strong2:eq(2)").val(),
    '_precios4': $("#PRINCIPAL input.strong2:eq(3)").val(),
    '_precios5': $("#PRINCIPAL input.strong2:eq(4)").val(),
    '_precios6': $("#PRINCIPAL input.strong3:eq(0)").val(),
    '_precios7': $("#PRINCIPAL input.strong2:eq(5)").val(),
    '_precios8': $("#PRINCIPAL input.strong3:eq(1)").val(),
    '_precios9': $("#PRINCIPAL input.strong3:eq(2)").val(),
  }
  if(codigoPrespuestoPrincipal[2]=="1"){
    slider0.crearPresupuesto($datosCotizacion,$datosPrecios,code,numerodelItem);
  }
  else{
    slider0.registrarDetallePresupuesto($datosCotizacion,$datosPrecios,code,numerodelItem);
  }
  
}

// FUNCION PARA GUARDAR DATOS GENERALES DEL PRESUPUESTO
FORMULAPRESUPUESTO.prototype.crearPresupuesto = function ($datosCotizacion,$datosPrecios,code,numerodelItem){
  
  var code = $("#codigoPresupuestoItem1").val();
  var codigoPrespuestoPrincipal = code.split("-");
  
  var fecha = new Date();
  var $datosPresupuesto={
    '_code': codigoPrespuestoPrincipal[0]+"-"+codigoPrespuestoPrincipal[1],
    '_cliente': $("#clientex").val(),
    '_vendedor': $("#PRINCIPAL select:eq(1)").val(),
    '_fecha': fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),
    '_cantItem': codigoPrespuestoPrincipal[2],
    '_pContacto' : $("#pContacto").val(),
    '_totalSoles' : 0,
    '_totalDolares' : 0,
    '_detalle' : "",
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
              slider0.registrarDetallePresupuesto($datosCotizacion,$datosPrecios,code,numerodelItem);
            }
        }
    });
}

// FUNCION PARA GUARGAR LOS DATOS DEL ITEM
FORMULAPRESUPUESTO.prototype.registrarDetallePresupuesto = function($datosCotizacion,$datosPrecios,code,numerodelItem){
  $.ajax({
    url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosCotizacion.php',
    type: 'POST',
    data: $datosCotizacion,
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
          slider0.registrarPrecioPrespuesto($datosPrecios,code,numerodelItem);
        }
    }
});
}

// FUNCIONP PARA GUARADR LOS PRECIOS DEL ITEM
FORMULAPRESUPUESTO.prototype.registrarPrecioPrespuesto = function($datosPrecios,code,numerodelItem){
  $.ajax({
    url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_RegistrarDatosPrecios.php',
    type: 'POST',
    data: $datosPrecios,
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
          slider0.nuevoItem(code,numerodelItem);
        }
    }
  });
}

//FUNCION PARA REGISTRAR EL ITEM
FORMULAPRESUPUESTO.prototype.nuevoItem = function(code,numerodelItem){
  
  var codigoPrespuestoPrincipal = code.split("-");
  if(document.getElementById("soles").checked == true){
    var monto = "S/."+$("#PRINCIPAL #facturacion").val();
  }
  else{
    var monto = "$"+$("#PRINCIPAL #facturacion").val();
  }
  
  var $datosItem={
    '_numero':numerodelItem,
    '_code': code,
    '_medidas': $("#medidasItem").val(),
    '_descripcion': $("#PRINCIPAL input:eq(3)").val(),
    '_monto': monto,
    '_codeC': "C"+code+"-"+numerodelItem,
    '_codeP': "P"+code+"-"+numerodelItem,
    '_codePresup': codigoPrespuestoPrincipal[0]+ "-" +codigoPrespuestoPrincipal[1],
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
            else{
                mostrarMensaje("error","Error no identificado");
            }
        },
        success: function(datos){

            if(datos.response == 0){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }
            else{
              var codigopresupuestoo = $("#PRINCIPAL #numeroItem").val().split("-");
             
              if($("#clientex").val()=="0"){
                slider0.actualizarPresupuesto(codigopresupuestoo[0].concat("-").concat(codigopresupuestoo[1]),codigopresupuestoo[2]);
                slider4.enviarActualizar(codigopresupuestoo[0].concat("-").concat(codigopresupuestoo[1]));
              }else{
                $("#btnRetroceder").click();
                slider4.vistaPrevia(codigopresupuestoo[0].concat("-").concat(codigopresupuestoo[1]));
                slider4.mostrarSubItems(code,codigoPrespuestoPrincipal[2])
              }
            }
          }
      });
}

// FUNCION PARA GUARDAR Y/O ACTUALIZAR LOS DATOS DEL PRESUPUESTO EXISTENTE
FORMULAPRESUPUESTO.prototype.actualizarPresupuesto = function (codigoPrespuesto, cantItem){
  var $datoPresupuesto={
    '_code': codigoPrespuesto,
    '_cantItem': cantItem,
  }
  $.ajax({
        url: '../CT-BackEnd/Controlador/ModPresupuesto/Controlador_ActualizarPresupuesto.php',
        type: 'POST',
        data: $datoPresupuesto,
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
        }
    });
  
}

//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider0 = new FORMULAPRESUPUESTO();


/*================================================================================
  SLIDER 1: TABLA F1810 - PRINCIPAL
================================================================================*/

//  FUNCION PRINCIPAL
var F1810PRINCIPAL = function(){
    this.insumos=0;
    this.talleres=0;
    this.flete=0;
    this.total=0;
    this.totalNormal=0;
    this.arrayPrecios= new Array();
    this.mtrCuadrados=0;
    this.extra = 0;
};


//  FUNCION PARA CALCULAR EL IMPORTE DEL PRESUPUESTO
F1810PRINCIPAL.prototype.F1810_Calcular = function() {
    
    this.insumos=0;
    this.talleres=0;
    this.flete=0;
    this.total=0;
    this.totalNormal=0;
    
    //  VENDEDOR - TASA COMISION
    $("#F1810 td:eq(5)").html(1);

    //  MAQUINA - VALOR
    switch($("#F1810 td:eq(8)").html()){
      case "GTO": $("#F1810 td:eq(9)").html(2);break;
      case "SM": $("#F1810 td:eq(9)").html(4);break;
      case "R700": $("#F1810 td:eq(9)").html(8);break;
      case "ADAST": $("#F1810 td:eq(9)").html(1);break;
      case "KBA": $("#F1810 td:eq(9)").html(1);break;
      default:$("#F1810 td:eq(9)").html("¿Qué máquina?");break;
    }
    var maquina = $("#F1810 td:eq(9)").html();

    //  TAMAÑO DEL PLIEGO DE MAQUINA
    $("#F1810 td:eq(13)").html("-");

    //  # DE P/M's POR HOJA/RESMA

    if($("#F1810 td:eq(12)").html()=="NORMAL"){
      switch(maquina){
        case '8' : $("#F1810 td:eq(16)").html(1);break;
        case '2' : $("#F1810 td:eq(16)").html(4);break;
        default: $("#F1810 td:eq(16)").html(2);break;
      }
    }else{$("#F1810 td:eq(16)").html(0);}
  
    // TIRAJE DEL TRABAJO EN P/M  
    var a1 = parseFloat($("#F1810 td:eq(18)").html());  //   TIRAJE TOTAL DE PIEZAS GRAFICAS
    var a2 = parseFloat($("#F1810 td:eq(22)").html());  //   # DE PIEZAS GRAFICAS POR P/M
    var tirajeTrabajo = (a1/a2);
  
    $("#F1810 td:eq(30)").html(tirajeTrabajo);
      
      
    // DEMASIA DEL TRABAJO EN P/M  
    var demasia = 0;
    if(tirajeTrabajo<=300){
        demasia= tirajeTrabajo;
      
    }else if(tirajeTrabajo<=10000){
        demasia= 200;
      
    }else if(tirajeTrabajo<=20000){
        demasia= tirajeTrabajo*0.022;
      
    }else if(tirajeTrabajo<=30000){
        demasia= tirajeTrabajo*0.02;
      
    }else if(tirajeTrabajo<=50000){
        demasia= tirajeTrabajo*0.015;
      
    }else if(tirajeTrabajo>=150000){
        demasia= 1200;
      
    }else{
        demasia= 1000;
    }
    $("#F1810 td:eq(34)").html(demasia.toFixed(0));
      
    //  TIRAJE TOTAL EN HOJAS RESMA
    var pliegosMaq = parseFloat($("#F1810 td:eq(38)").html());  //  # DE PLIEGOS DE MAQUINA DEL TRABAJO
    var cantPliegos = parseFloat($("#F1810 td:eq(16)").html()); //  # DE P/M's POR HOJA/RESMA

    var tiraje=(tirajeTrabajo+demasia)/(cantPliegos*pliegosMaq);
    $("#F1810 td:eq(19)").html(tiraje.toFixed(0));
  
    // AREA CON HOJA PAPEL
    switch ($("#F1810 td:eq(58)").html()){
        case '61' : $("#F1810 td:eq(23)").html(0.5246);break;
        case '69' : $("#F1810 td:eq(23)").html(0.6141);break;
        case '72' : $("#F1810 td:eq(23)").html(0.7344);break;
        case '70' : $("#F1810 td:eq(23)").html(0.7);break;
        case '' : $("#F1810 td:eq(23)").html(0);break;
        default : $("#F1810 td:eq(23)").html($("#F1810 td:eq(58)").html());break;
    } 
    
    // MTS CUADRADOS DE PAPEL
    var mtrCuadrados =tiraje * parseFloat($("#F1810 td:eq(23)").html());
    $("#F1810 td:eq(27)").html(mtrCuadrados.toFixed(2));  
    this.mtrCuadrados=mtrCuadrados;
  
    // KGS DE PAPEL
    var kgsPapel;
    var gramaje = $("#F1810 td:eq(54)").html();
  
    if(gramaje==""){
        gramaje=0;
        kgsPapel=0;
        $("#F1810 td:eq(31)").html(0);
    }else{
        kgsPapel = mtrCuadrados* parseFloat(gramaje)/1000;
        $("#F1810 td:eq(31)").html(kgsPapel.toFixed(2));
    }
       
    //  # DE PLACAS
    var nDePlacas;
    var tipoImpresion = $("#F1810 td:eq(42)").html();
    var numColores = $("#F1810 td:eq(46)").html();;
    
    if(maquina=="¿Qué máquina?"){
        $("#F1810 td:eq(35)").html("¿Qué máquina?");
    } else{
        if($("#PRINCIPAL td:eq(25) select option:selected").val()==2){
            nDePlacas = pliegosMaq*2*numColores;
        }else{
            nDePlacas = pliegosMaq*numColores;
        }
        $("#F1810 td:eq(35)").html(nDePlacas);  
    } 
      
    // PLACAS
    var nPlaca=0;  
    var contrato=$("#PRINCIPAL td:eq(33) select option:selected").text(); //  CONTRATO MARCO PARA TELEFONICA
  
    if(contrato == "SI"){
        $("#F1810 td:eq(39)").html(0);  
    }else {
        switch(maquina){
            case '2': nPlaca = nDePlacas*parseFloat(slider3.gtoTotal);break;
            case '4': nPlaca = nDePlacas*parseFloat(slider3.smTotal);break;
            case '8': nPlaca = nDePlacas*parseFloat(slider3.r700Total);break;
            case '1': nPlaca = nDePlacas*parseFloat(slider3.smTotal);break;
            default:  $("#F1810 td:eq(39)").html("NRO DE MAQUINA!!!");break;
        }
        if(nPlaca!=0){
            $("#F1810 td:eq(39)").html(nPlaca.toFixed(4));
        }
    }
    this.insumos = this.insumos + nPlaca;
      
    //  PAPEL
  
    var tamañoPapel = parseFloat($("#F1810 td:eq(58)").html()); //  TAMAÑO DEL PAPEL 61, 69, 70, 72
    var qualityPaper =$("#PRINCIPAL td:eq(31) select option:selected").text(); //  QUALITY PAPER
    var tipoPapel = $("#F1810 td:eq(50)").html(); //   TIPO DE PAPEL
    var d1=0, dp =document.getElementById("papel");
    var papel=0;
  
    switch(tipoPapel){
        case "ADHE": d1= parseFloat(dp.getElementsByTagName('input')[26].value);break;
        case "LYNE": d1= parseFloat(dp.getElementsByTagName('input')[22].value);break;
        case "COUC":
          
          if(qualityPaper=="SI"){
              if(gramaje==90){
                d1= parseFloat(dp.getElementsByTagName('input')[1].value);
              }else{
                if(gramaje<251){
                  d1= parseFloat(dp.getElementsByTagName('input')[3].value);
                }else{
                  d1= parseFloat(dp.getElementsByTagName('input')[5].value);
                }
              }
                
          }else {
              if(gramaje==90){
                  d1= parseFloat(dp.getElementsByTagName('input')[0].value);

              }else if(gramaje<251 && gramaje!=90){
                  d1= parseFloat(dp.getElementsByTagName('input')[2].value);

              }else{
                  d1= parseFloat(dp.getElementsByTagName('input')[4].value);

              }
          } 
          break;
        
        case "BOND":
          if(gramaje==56){
              d1= parseFloat(dp.getElementsByTagName('input')[8].value);
          }else{
              d1= parseFloat(dp.getElementsByTagName('input')[6].value);
          }
          break;
        
        case "PERI":
          d1= parseFloat(dp.getElementsByTagName('input')[24].value);
          break; 
        
        case "FOLK":
          d1= parseFloat(dp.getElementsByTagName('input')[16].value);
          break;
        
        case "DUPL":
          if(gramaje<286){
            d1= parseFloat(dp.getElementsByTagName('input')[18].value);
                      }
          else{
            d1= parseFloat(dp.getElementsByTagName('input')[14].value);
          }
          break;
        
        case "COPY":
          d1= parseFloat(dp.getElementsByTagName('input')[20].value);
          break; 
        
        default:
          $("#F1810 td:eq(43)").html(tipoPapel);break;    
    }
  
    if(d1 != 0){
        papel = kgsPapel*d1;
        $("#F1810 td:eq(43)").html(papel.toFixed(6)); 
        this.insumos = this.insumos + papel;
    }

    //FOTOLITOS
    var fotolitos = 0;
    $("#F1810 td:eq(47)").html(fotolitos);
    this.insumos = this.insumos + fotolitos;
      
    //REPOSICION DE PLACAS
    var reposicionPlacas
    if(tipoImpresion==1){
        if(tirajeTrabajo<=60000){
            $("#F1810 td:eq(51)").html(0);
        }else{
            reposicionPlacas=tirajeTrabajo/60000*nPlaca;
            $("#F1810 td:eq(51)").html(reposicionPlacas.toFixed(2));
            this.insumos = this.insumos + reposicionPlacas;
        }
    }else if(tirajeTrabajo<=60000){
        $("#F1810 td:eq(51)").html(0);
    }else{
        reposicionPlacas=tirajeTrabajo/60000*nPlaca*2;
        $("#F1810 td:eq(51)").html(reposicionPlacas.toFixed(2));
        this.insumos = this.insumos + reposicionPlacas;
    }
    
    //FORMULA TINTA
    var formulaTinta;
  
    switch(tipoPapel){
        case "COUC": formulaTinta = mtrCuadrados*numColores*0.25/1000*7.2;break;
        case "BOND": formulaTinta= mtrCuadrados*numColores*0.2875/1000*7.2;break;
        case "PERI": formulaTinta= mtrCuadrados*numColores*0.325/1000*7.2;break;
        default:     formulaTinta= mtrCuadrados*numColores*0.3125/1000*7.2;break;
    }
    $("#F1810 td:eq(55)").html(formulaTinta.toFixed(2));
    this.insumos = this.insumos + formulaTinta;
  
    //VERIFICAR FORMULA TINTA
    var verificarTinta=0;
    if(tipoImpresion==1){
        $("#F1810 td:eq(59)").html(0);
    }else{
        verificarTinta=formulaTinta;
        $("#F1810 td:eq(59)").html(formulaTinta.toFixed(2));
    }
    this.insumos = this.insumos + verificarTinta;

    //COSTO PRUEBA DE COLOR
    var pruebaColor = $("#F1810 td:eq(62)").html();  //  PRUEBA DE COLOR?
    var pruebaColorCosto=0;
    if(contrato=="SI"){
        $("#F1810 td:eq(63)").html(0);
    }else if(pruebaColor=="NO"){
        $("#F1810 td:eq(63)").html(0);
    }else{
        pruebaColorCosto=5;
        $("#F1810 td:eq(63)").html(5);
    }
    this.insumos = this.insumos + pruebaColorCosto;
    
    //COSTO MENSAJERIA
    var mensajeria = $("#F1810 td:eq(66)").html();
    var mensajeriaCosto =0;
    if(mensajeria=="SI" || mensajeria.length==0 || mensajeria==""){
        mensajeriaCosto =5;
        $("#F1810 td:eq(67)").html(5);
    }else{
         $("#F1810 td:eq(67)").html(0);
    }
    this.insumos = this.insumos + mensajeriaCosto;
    
    //MONTO PLST O BARNZ
    var tipoPlastificado = $("#F1810 td:eq(70)").html();  //   TIPO DE PLASTIFICADO O BARNIZADO
    var tipoPlastificadoAdic1 = $("#F1810 td:eq(74)").html();  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 1
    var tipoPlastificadoAdic2 = $("#F1810 td:eq(78)").html();  //   TIPO DE PLASTIFICADO O BARNIZADO ADICIONAL 2
    var tdTabla = $("#item td").length;
    var arrayItem=[],arrayValor=[];
    var a=0,b=0;
    var montoPlast=0, valorPlast=0, valorPlastAdic1=0, valorPlastAdic2=0;
  
    var di =document.getElementById("item");

    for(var j=0;j<156;j+=6){
        switch(j){
            case(0): d1= parseFloat(slider3.uvbprecio);break;
            case(6): d1= parseFloat(slider3.uvbprecio)*2;break;
            case(48): d1= parseFloat(slider3.offbprecio);break;
            case(54): d1= parseFloat(slider3.offbprecio)*2;break;
            case(60): d1= parseFloat(slider3.offmprecio);break;
            case(66): d1= parseFloat(slider3.offmprecio)*2;break;
            case(72): d1= parseFloat(slider3.acrbprecio);break;
            case(78): d1= parseFloat(slider3.acrbprecio)*2;break;
            case(84): d1= parseFloat(slider3.acrmprecio);break;
            case(90): d1= parseFloat(slider3.acrmprecio)*2;break;
            default: d1= parseFloat(di.getElementsByTagName('input')[j].value); break;
        }
        arrayValor[a]=d1;
        a++;
    }
    this.arrayPrecios = arrayValor;
    for(var i=8;i<tdTabla;i+=7){
        arrayItem[b]=$("#item td:eq("+i+")").html();
        if(tipoPlastificado==arrayItem[b]){
            montoPlast=arrayValor[b];
            valorPlast=montoPlast*mtrCuadrados;
            $("#F1810 td:eq(71)").html(valorPlast.toFixed(3));
            this.insumos = this.insumos + valorPlast;
            
        }
        if(tipoPlastificadoAdic1==arrayItem[b]){
            montoPlast=arrayValor[b];
            valorPlastAdic1=montoPlast*mtrCuadrados;
            $("#F1810 td:eq(75)").html(valorPlastAdic1.toFixed(3));
            this.insumos = this.insumos + valorPlastAdic1;
        }
        if(tipoPlastificadoAdic2==arrayItem[b]){
            montoPlast=arrayValor[b];
            valorPlastAdic2=montoPlast*mtrCuadrados;
            $("#F1810 td:eq(79)").html(valorPlastAdic2.toFixed(3));
            this.insumos = this.insumos + valorPlastAdic2;
        }
        b++;
    }

    if(montoPlast==0){
      $("#F1810 td:eq(71)").html(montoPlast);
      $("#F1810 td:eq(75)").html(montoPlast);
      $("#F1810 td:eq(79)").html(montoPlast);
      this.insumos = this.insumos + montoPlast;
    }
  
  
    //SACAR BIEN EL COSTO - COSTO TROQUELADO?
    var troquelado=$("#F1810 td:eq(82)").html();
    var valorH16=slider2.f88;
    var sacarCosto=0;
    if(troquelado=="TROQ"){
        switch(maquina){
            case '8': sacarCosto=(tirajeTrabajo*2/2000+1)*valorH16+75;break;
            case '2': sacarCosto=(tirajeTrabajo/2000+1)*valorH16+20; break;
            default : sacarCosto=(tirajeTrabajo/2000+1)*valorH16+50; break;
        }
    }else{
        if(troquelado=="RAYA"){
            sacarCosto=(a1/1500+2)*valorH16+12;
        }else{
            if(troquelado=="GRND"){
                sacarCosto=tirajeTrabajo/1000*10+75;
            }else{
                sacarCosto=0;
            }
        }
    }
    
    $("#F1810 td:eq(83)").html(sacarCosto.toFixed(5));
    this.talleres = this.talleres+sacarCosto;
    
    // MONTO DOBLADO Y ALZE
    var valorH25=slider2.f124;
    var montoDoblado=0;
    var doblado=$("#F1810 td:eq(86)").html();
    if(doblado=="REVI"){
        switch(maquina){
            case '8' : montoDoblado=(1+tirajeTrabajo*pliegosMaq/5000)*valorH25*2;break;
            default : montoDoblado=(1+tirajeTrabajo*pliegosMaq/5000)*valorH25;break;
        }
    }else{
        montoDoblado=0;
    }
    $("#F1810 td:eq(87)").html(montoDoblado.toFixed(3));
    this.talleres = this.talleres+montoDoblado;
    
    //MONTO DOBLADO EN MAQUINA
    var montoDobladoMaquina=0;
    switch (doblado){
        case "DIPT" : montoDobladoMaquina=(0.5+a1/12000)*valorH25;break;
        case "TRIP" : montoDobladoMaquina=(a1/9000+0.75)*valorH25;break;
        case "CUAD" : montoDobladoMaquina=(a1/7000+1)*valorH25;break;
        case "CRUZ" : montoDobladoMaquina=(a1/5000+1)*valorH25;break;
        default : montoDobladoMaquina=0;break;
    }
    $("#F1810 td:eq(91)").html(montoDobladoMaquina.toFixed(3));
    this.talleres = this.talleres+montoDobladoMaquina;
    
    //MONTO DOBLADO MANUAL
    var montoDobladoManual=0;
    var valorC2=$("#F1810INSUMOS #tipocambio").val();
    
    if($("#F1810 td:eq(90)").html()=="MAN"){
        switch($("#F1810 td:eq(94)").html()){
            case '1' : montoDobladoManual=a1/1000*pliegosMaq*1*8/valorC2;break;
            case '2' : montoDobladoManual=a1/1000*pliegosMaq*2*8/valorC2;break;
            case '3' : montoDobladoManual=a1/1000*pliegosMaq*3*8/valorC2;break;
            default  : montoDobladoManual=0;break;
        }
    }else{
        montoDobladoManual=0;
    }
    $("#F1810 td:eq(95)").html(montoDobladoManual.toFixed(3));
    this.talleres = this.talleres+montoDobladoManual;
    
    
    //MONTO ALZE
    var montoAlze=0;
    var valorC4=$("#F1810INSUMOS #milsolcista").val();
    if(doblado=="REVI"){
        montoAlze=a1*a2*pliegosMaq/1000*valorC4;
    }else{
        montoAlze=0;
    }
    $("#F1810 td:eq(99)").html(montoAlze.toFixed(3));
    this.talleres = this.talleres+montoAlze;
  
  
  
    //	REVISAR COSTOS - COSTO COSIDO HILO, ENCOLADO O ENGRAPADO
    var cosido = $("#F1810 td:eq(102)").html(); // COSIDO HILO, ENCOLADO O ENGRAPADO
    var costocosido=0;
  
    
    if (cosido=="NO"){
        costocosido=0;
    }else if( cosido=="GRAP"){
        costocosido=a1/1000*5;     //a1 = TIRAJE TOTAL DE PIEZAS GRAFICAS
    }else if( cosido=="COLA"){
        costocosido=a1/1000*pliegosMaq*6;
    }else if(  a2/tipoImpresion < 25){    // a2 =  # DE PIEZAS GRAFICAS POR P/M
        costocosido=a1/1000*pliegosMaq*10;
    }else if( a2/tipoImpresion < 49 ){
        costocosido=a1/1000*pliegosMaq*10*2;
    }else {
        costocosido=a1/1000*pliegosMaq*10*4;
    }
    $("#F1810 td:eq(103)").html(costocosido);
    this.talleres = this.talleres+costocosido;
    
    // - COSTO EMPAQUETADO O ENCAJONADO
    var empaquetado = $("#F1810 td:eq(106)").html(); //EMPAQUETADO O ENCAJONADO 
    var tipocambio = $("#F1810INSUMOS #tipocambio").val(); // TIPO CAMBIO DE LA HOJA 4
  
    var costoempaquetado=0;

    if (qualityPaper=="SI"){
        costoempaquetado=0;
    }else if( empaquetado=="CAJA"){
        costoempaquetado=kgsPapel/18*3.5/tipocambio;
    }else if( empaquetado==0 || empaquetado==""){
        costoempaquetado=kgsPapel/15*(0.09 + 0.02 + 0.15);
    }else {
        costoempaquetado=a1/empaquetado*(0.09 + 0.02 + 0.15);
    }
    
    $("#F1810 td:eq(107)").html(costoempaquetado.toFixed(6));
    this.flete=this.flete+costoempaquetado;
    
    // - COSTO MOVILIDAD O DESPACHO $$
    var costomovilidad;
    if (kgsPapel>36000){
        costomovilidad="MUCHO FLETE";
    }else if(kgsPapel<=20 ){
        costomovilidad=10;
    }else if(kgsPapel<=500 ){
        costomovilidad=20;
    }else if(kgsPapel<=800 ){
        costomovilidad=30;
    }else if(kgsPapel<=1800 ){
        costomovilidad=60;
    }else if(kgsPapel<=5000 ){
        costomovilidad=75;
    }else if(kgsPapel<=9000 ){
        costomovilidad=90;
    }else if(kgsPapel<=12000 ){
        costomovilidad=100;
    }else if(kgsPapel<=18000 ){
        costomovilidad=180;
    }else if(kgsPapel<=24000 ){
        costomovilidad=200;
    }else{
        costomovilidad=300;
    }
  
    $("#F1810 td:eq(110)").html(costomovilidad);
    if(costomovilidad!="MUCHO FLETE"){
      this.flete=this.flete+costomovilidad;
    } 
  
    // TRABAJAR EL NUMERADO - SERVICIOS DE TERCEROS($$$)
    var montoTerceros=parseFloat($("#F1810 td:eq(114)").html());
    this.talleres = this.talleres+montoTerceros;
      
    // VELOCIDAD DE MAQUINA
    var velocidadMaquina;
  
    if (tipoPapel=="COUC"){
        if(parseFloat(gramaje)<200){
            velocidadMaquina=8500;
       }
        else{
           velocidadMaquina=7000;
       }
    }
    else if(tipoPapel=="BOND"){
        velocidadMaquina=8000;        
    }
    else{
        velocidadMaquina=7000;
    }
  
    $("#F1810 td:eq(117)").html(velocidadMaquina);
      
    // HORAS/IMPRESORA PREVISTAS 
    var valorHorasImpresora;
      
    if(maquina==1){
        if(tirajeTrabajo<=5000){
            valorHorasImpresora = (tirajeTrabajo/6000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
          
        }
        else if(tirajeTrabajo<=10000){
            valorHorasImpresora = (tirajeTrabajo/7000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
          
        }
        else{
            valorHorasImpresora = (tirajeTrabajo/8000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
          
        }
   }
    else if(tirajeTrabajo<=5000){
        valorHorasImpresora = (tirajeTrabajo/(1250*maquina)*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion); 
     
   }
    else if(maquina>2){
        valorHorasImpresora = (tirajeTrabajo/velocidadMaquina*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
     
   }
    else{
        valorHorasImpresora = (tirajeTrabajo/4000*pliegosMaq*tipoImpresion)+(0.5*pliegosMaq*tipoImpresion);
   }
  
    $("#F1810 td:eq(119)").html(valorHorasImpresora.toFixed(8)); 
  
  
    // TODO TRABAJO DEBE PAGAR - COSTO HORAS/IMPRESORA PREVISTAS 
    var trabajoPagar=0;
    var valorH11=parseFloat(slider2.f8);
    var valorH12=parseFloat(slider2.f25);
    var valorH13=parseFloat(slider2.f42);
    if(numColores>4){
        trabajoPagar=maquina*valorHorasImpresora*(6.5)*2;
    }
    else{
        switch(maquina){
            case '8': trabajoPagar=valorHorasImpresora*valorH11;break;
            case '4': trabajoPagar=valorHorasImpresora*valorH12;break;
            default : trabajoPagar=valorHorasImpresora*valorH13;break;
        }
    }
  
    $("#F1810 td:eq(120)").html(trabajoPagar.toFixed(8));
    this.talleres = this.talleres+trabajoPagar;
    
    //HORAS DE GUILLOTINA PREVISTAS
    var guillotina1=0;
    guillotina1=(tiraje/12000)/2;
    $("#F1810 td:eq(123)").html(guillotina1.toFixed(8));
    
    //HORAS DE GUILLOTINA PREVISTAS 2
    var guillotina2=0;
    if(a2<=2){
        guillotina2=guillotina1;
    }
    else{
        if(a2<=4){
            guillotina2=guillotina1*1.5;
        }
        else{
            if(a2<=8){
              guillotina2= guillotina1*2.25;
            }
            else{
               if(a2<=16){
                   guillotina2=guillotina1*3.5;
               }
                else{
                   if(a<=32){
                       guillotina2=guillotina1*5;  
                   }
                    else{
                       guillotina2=guillotina1*6;
                   }
               }
            }
        }
    }
    $("#F1810 td:eq(127)").html(guillotina2.toFixed(8));
    
    
    // CORTE INICIAL - COSTO HORAS DE GUILLOTINA PREVISTAS
    var corteInicial=0;
    var valorH15=slider2.f76;
    if($("#F1810 td:eq(8)").html()==0){
        corteInicial=0;
    }
    else{
        corteInicial=guillotina1*valorH15;
    }
    $("#F1810 td:eq(124)").html(corteInicial.toFixed(4));
    this.talleres = this.talleres+corteInicial;
    
    //CORTE POSTPRENSA - COSTO HORAS DE GUILLOTINA PREVISTAS 2
    var cortePostPrensa=0;
    cortePostPrensa=guillotina2*valorH15;
    $("#F1810 td:eq(128)").html(cortePostPrensa.toFixed(4));
    this.talleres = this.talleres+cortePostPrensa;
    
    //SUMA
    var F1810suma=0;
    F1810suma=this.insumos+this.talleres+this.flete;
    $("#F1810 td:eq(131)").html(F1810suma.toFixed(4));
    
    //GASTOS GENERALES 18%
    var ggF1810=0;
    ggF1810=F1810suma*0.18;
    $("#F1810 td:eq(136)").html(ggF1810.toFixed(4));
    
    //UTILIDADES Y REINERSIONES 10%
    var utilidadesF1810=0;
    utilidadesF1810=(F1810suma+ggF1810)*0.1;
    $("#F1810 td:eq(139)").html(utilidadesF1810.toFixed(4));
  
    //EXTRAS
    var extras = 0;
     extras = parseFloat($("#PRINCIPAL input:eq(22)").val());
     extras = parseFloat($("#PRINCIPAL input:eq(22)").val());
    this.extra = extras;
    
    //TOTAL NETO
    var totalNetoF1810=0;
    totalNetoF1810=F1810suma+ggF1810+utilidadesF1810;
    $("#F1810 td:eq(142)").html(totalNetoF1810.toFixed(4));
    
    //TOTAL INC COMISION
    var totalComisionF1810=0;
    var comision=$("#F1810 td:eq(5)").html();   // TASA COMISION
    totalComisionF1810=totalNetoF1810*comision;
    $("#F1810 td:eq(145)").html(totalComisionF1810.toFixed(4));
  
    this.total=totalComisionF1810;
    /*====================================================
    
              COSTO NORMAL
    
    =====================================================*/
    
    //  --HORAS/IMPRESORA PREVISTAS ** DATO
    var normalprevistas=0;
 
    if (maquina==1){
        if (tirajeTrabajo <= 5000){
            normalprevistas= (tirajeTrabajo+demasia)/2000*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
        }
        else if (tirajeTrabajo <= 10000){
            normalprevistas= (tirajeTrabajo+demasia)/3500*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
        }
        else {
            normalprevistas= (tirajeTrabajo)/4000*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
        }   
    }
    else if(tirajeTrabajo<=5000){
        normalprevistas= (tirajeTrabajo+demasia)/(1250*maquina)*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);       
    }
    else if(maquina>2){
        normalprevistas= (tirajeTrabajo+demasia)/velocidadMaquina*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);     
    }
    else{
        normalprevistas= tirajeTrabajo/4000*pliegosMaq*tipoImpresion + (0.5*pliegosMaq*tipoImpresion);
    }

    //  --HORAS/IMPRESORA PREVISTAS ** VALOR
    var costonormalprevistas=0;

    var precioroland = slider2.f10,          // PRECIO ROLAND EN DOLARES
        preciosm = slider2.f27,              // PRECIOS SM EN DOLARES
        preciogto = slider2.f44;             // PRECIOS GTO EN DOLARES
    
    precioroland = parseFloat(precioroland.substr(1));  //CONVERTIR A NUMERO
    preciosm = parseFloat(preciosm.substr(1));          //CONVERTIR A NUMERO
    preciogto = parseFloat(preciogto.substr(1));        //CONVERTIR A NUMERO
    
    if (numColores > 8){
        costonormalprevistas = maquina*normalprevistas*8*6; 
    }
    else if(numColores >4){
          if (maquina==8){
              if ( numColores ==5){
                  costonormalprevistas = normalprevistas*precioroland*1.25;
              }
              else{
                  costonormalprevistas = normalprevistas*precioroland*2;
              }
          }
          else if (maquina==2){
                  costonormalprevistas = normalprevistas*preciosm*2;
          }
          else{
                  costonormalprevistas = normalprevistas*preciogto*2;
              }
    }
    else if (maquina==8){
          costonormalprevistas = normalprevistas*precioroland;
    }
    else if(maquina==4){
          costonormalprevistas = normalprevistas*preciosm;
    }
    else{
          costonormalprevistas = normalprevistas*preciogto;
    }
    
    
    //TOTAL +SUBTOTAL NORMAL
    var factor = $("#F1810INSUMOS #factor").val();     // FACTOR SOBRE CD -- cambio ES DEL LLAMADO DEL TIPO CAMBIO DE LA HOJA 4
    
    var normalsuma = F1810suma - trabajoPagar + costonormalprevistas ;  // SUMA NORMAL
    
    var normalinsumos12 = (papel + formulaTinta + verificarTinta + valorPlast + montoTerceros)*1.12;   //TOTAL INSUMOS + 12 %
    var normalservicios24 = (normalsuma - (normalinsumos12/1.12))*factor;                              //TOTAL SERVICIO + 24 %
    var normaltotalneto = normalinsumos12 + normalservicios24;                                         // TOTAL NETO
    var normalcomision = normaltotalneto * comision;
    this.totalNormal=normalcomision;

};


//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider1 = new F1810PRINCIPAL();


/*================================================================================
  SLIDER 2: TABLA F1810MAQ
================================================================================*/

//  FUNCION PRINCIPAL
var F1810MAQ = function() {

  //--INICIALIZAR VARIABLES--
  this.cambio=0;
  this.hsOperario=0;
  this.hsMaqAux=0;
  this.hsMaqImp=0;
  this.supervisor=0;
  this.x=0;
  this.y=0;
  this.z=0;
  this.tinta72=0;
  this.tinta61=0;
  this.barniz72=0;
  this.barniz61=0;
  this.hExtras=0;
  this.d1=0;
  this.d2=0;
  this.a1=0;
  this.a2=0;
  this.p1=0;
  this.p2=0;
  
/*FILA 1  Impresora Roland 700*/  
this.f1,this.f2,this.f3,this.f4,this.f5,this.f6,this.f7,this.f8,this.f9,this.f10,this.f11,this.f12,this.f13,this.f14,this.f15,this.f16,this.f17,

/*FILA 2  Impresora Speed Master*/  
this.f18,this.f19,this.f20,this.f21,this.f22,this.f23,this.f24,this.f25,this.f26,this.f27,this.f28,this.f29,this.f30,this.f31,this.f32,this.f33,this.f34,
  
/*FILA 3  Impresora GTO y KBA*/  
this.f35,this.f36,this.f37,this.f38,this.f39,this.f40,this.f41,this.f42,this.f43,this.f44,this.f45,this.f46,this.f47,this.f48,this.f49,this.f50,this.f51,

/*FILA 4  Imp. Digital CP1000 (COSTS X COPY A3)*/
this.f52,this.f53,this.f54,this.f55,this.f56,this.f57,this.f58,this.f59,this.f60,this.f61,this.f62,this.f63,this.f64,this.f65,this.f66,this.f67,this.f68,
  
/*FILA 5  Guillotina Wholemberg 115*/
this.f69,this.f70,this.f71,this.f72,this.f73,this.f74,this.f75,this.f76,this.f77,this.f78,this.f79,this.f80,
  
/*FILA 6  Troqueladora Atenas*/
this.f81,this.f82,this.f83,this.f84,this.f85,this.f86,this.f87,this.f88,this.f89,this.f90,this.f91,this.f92,
  
/*FILA 7  Barnizadora Invicta 33*/
this.f93,this.f94,this.f95,this.f96,this.f97,this.f98,this.f99,this.f100,this.f101,this.f102,this.f103,this.f104,
  
/*FILA 8  Barnizadora Adast Dominant 724*/
this.f105,this.f106,this.f107,this.f108,this.f109,this.f110,this.f111,this.f112,this.f113,this.f114,this.f115,this.f116,
  
/*FILA 9  Dobladora Stahl*/
this.f117,this.f118,this.f119,this.f120,this.f121,this.f122,this.f123,this.f124,this.f125,this.f126,this.f127,
  
/*FILA 10-11  extra*/
this.f128,this.f129,this.f130,
this.f131,this.f132,this.f133;
  
this.realestate=0;

}


//  FUNCION PARA HALLAR CPOS_TOTAL
F1810MAQ.prototype.CPOS_TOTAL = function(){
  x = parseFloat(document.getElementById("CPOS-R700").value);
  y = parseFloat(document.getElementById("CPOS-SM").value);
  z = parseFloat(document.getElementById("CPOS-GTO").value);
  $("#CPOS-TOTAL").val(x+y+z);
}


//  FUNCION QUE PERMITE LLENAR LOS DATOS DE LA TABLA SEGUN LA INFORMACION INGRESADA
F1810MAQ.prototype.calcular = function(){

  cambio=parseFloat(document.getElementById("cambio").value);
  hsOperario = parseFloat(document.getElementById("hsOperario").value);
  hsMaqAux = parseFloat(document.getElementById("hsMaqAux").value);
  hsMaqImp = parseFloat(document.getElementById("hsMaqImp").value);

  supervisor = parseFloat(document.getElementById("supervisor").value);
  x = parseFloat(document.getElementById("CPOS-R700").value);
  y = parseFloat(document.getElementById("CPOS-SM").value);
  z = parseFloat(document.getElementById("CPOS-GTO").value);

  tinta72 = parseFloat(document.getElementById("tinta72").value);
  tinta61 = parseFloat(document.getElementById("tinta61").value);
  barniz72 = parseFloat(document.getElementById("barniz72").value);
  barniz61 = parseFloat(document.getElementById("barniz61").value);

  hExtras = parseFloat(document.getElementById("hExtras").value);
  d1 = parseFloat(document.getElementById("d1").value);
  d2 = parseFloat(document.getElementById("d2").value);

  a1 = parseFloat(document.getElementById("a1").value);
  a2 = parseFloat(document.getElementById("a2").value);

  p1 = parseFloat(document.getElementById("p1").value);
  p2 = parseFloat(document.getElementById("p2").value);
  
  realestate = $("#MAQ td:eq(32)").text().substr(1);
  //HOJA 4 - F1810INSUMOS
  var cambio2=parseFloat($("#tipocambio").val());

  /*--=================================================
      FILA 1  Impresora Roland 700
  =================================================--*/
  // f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17;

  this.f1=(500*realestate/hsMaqImp);
  $("#MAQ td:eq(49)").html("$"+this.f1.toFixed(2));
  
  this.f2=(750000/(p1*p2));
  $("#MAQ td:eq(50)").html("$"+this.f2.toFixed(2));

  this.f3=((200000*2+5000*12*10)/(p1*p2));
  $("#MAQ td:eq(51)").html("$"+this.f3.toFixed(2));
  
  this.f4=0;
  $("#MAQ td:eq(52)").html("$"+this.f4.toFixed(2));
  
  this.f5=0;
  $("#MAQ td:eq(53)").html("$"+this.f5.toFixed(2));  

  this.f6=(((2500+1500+supervisor/(x+y+z)*x)*d2/cambio)/hsOperario);
  $("#MAQ td:eq(54)").html("$"+this.f6.toFixed(2));

  this.f7=(((2500+1400)*d1/hsOperario)*hExtras/cambio/hsOperario);
  $("#MAQ td:eq(55)").html("$"+this.f7.toFixed(2));

  this.f8=this.f1+this.f2+this.f3+this.f4+this.f5+this.f6+this.f7;
  $("#MAQ td:eq(56)").html("$"+this.f8.toFixed(2));

  this.f9=this.f8*cambio;
  $("#MAQ td:eq(57)").html("S/."+this.f9.toFixed(2));
  
  this.f10=$("#MAQ td:eq(58)").html();  
  this.f11=$("#MAQ td:eq(59)").html(); 
  
  this.f12=160*a1*a2;
  $("#MAQ td:eq(60)").html("$"+this.f12.toFixed(2));
  
  this.f13=$("#MAQ td:eq(61)").html();
  this.f14=$("#MAQ td:eq(62)").html();
  this.f15=$("#MAQ td:eq(63)").html();
  this.f16=$("#MAQ td:eq(64)").html();
  this.f17=$("#MAQ td:eq(65)").html();

  /*--=================================================
      FILA 2  Impresora Speed Master
  =================================================--*/
  // f18

  this.f18=(80*realestate/(hsMaqImp));
  $("#MAQ td:eq(66)").html("$"+this.f18.toFixed(2));
  
  this.f19=(350000/(p1*p2));
  $("#MAQ td:eq(67)").html("$"+this.f19.toFixed(2));

  this.f20=((100000*2+2500*12*10)/(p1*p2));
  $("#MAQ td:eq(68)").html("$"+this.f20.toFixed(2));
  
  this.f21=0;
  $("#MAQ td:eq(69)").html("$"+this.f21.toFixed(2));
  
  this.f22=0;
  $("#MAQ td:eq(70)").html("$"+this.f22.toFixed(2));

  this.f23=(((2500+supervisor/(x+y+z)*y)*d2/cambio)/hsOperario);
  $("#MAQ td:eq(71)").html("$"+this.f23.toFixed(2));

  this.f24=((2500*d2/hsOperario)*hExtras/cambio/hsOperario);
  $("#MAQ td:eq(72)").html("$"+this.f24.toFixed(2));

  this.f25=this.f18+this.f19+this.f20+this.f21+this.f22+this.f23+this.f24;
  $("#MAQ td:eq(73)").html("$"+this.f25.toFixed(2));

  this.f26=this.f25*cambio;
  $("#MAQ td:eq(74)").html("S/."+this.f26.toFixed(2));
  
  this.f27=$("#MAQ td:eq(75)").html();
  this.f28=$("#MAQ td:eq(76)").html();
  
  this.f29=80*a1*a2;
  $("#MAQ td:eq(77)").html("$"+this.f29.toFixed(2));

  this.f30=$("#MAQ td:eq(78)").html();
  this.f31=$("#MAQ td:eq(79)").html();
  this.f32=$("#MAQ td:eq(80)").html();
  this.f33=$("#MAQ td:eq(81)").html();
  this.f34=$("#MAQ td:eq(82)").html();

  /*--=================================================
      FILA 3  Impresora GTO y KBA
  =================================================--*/
  // f35

  this.f35=(35*realestate/hsMaqImp);
  $("#MAQ td:eq(83)").html("$"+this.f35.toFixed(2));
  
  this.f36=(150000/(p1*p2));
  $("#MAQ td:eq(84)").html("$"+this.f36.toFixed(2));

  this.f37=((50000*2+1250*12*10)/(p1*p2));
  $("#MAQ td:eq(85)").html("$"+this.f37.toFixed(2));

  this.f38=0;
  $("#MAQ td:eq(86)").html("$"+this.f38.toFixed(2));
  
  this.f39=0;
  $("#MAQ td:eq(87)").html("$"+this.f39.toFixed(2));

  this.f40=(((2000+supervisor/(x+y+z)*z)*d2/cambio)/hsOperario);
  $("#MAQ td:eq(88)").html("$"+this.f40.toFixed(2));

  this.f41=((2000*d2/hsOperario)*hExtras/cambio/hsOperario);
  $("#MAQ td:eq(89)").html("$"+this.f41.toFixed(2));

  this.f42=this.f35+this.f36+this.f37+this.f38+this.f40+this.f41;
  $("#MAQ td:eq(90)").html("$"+this.f42.toFixed(2));

  this.f43=this.f42*cambio;
  $("#MAQ td:eq(91)").html("S/."+this.f43.toFixed(2));
  
  this.f44=$("#MAQ td:eq(92)").html();
  this.f45=$("#MAQ td:eq(93)").html();

  this.f46=40*a1*a2;
  $("#MAQ td:eq(94)").html("$"+this.f46.toFixed(2));
  
  this.f47=$("#MAQ td:eq(95)").html();
  this.f48=$("#MAQ td:eq(96)").html();
  this.f49=$("#MAQ td:eq(97)").html();
  this.f50=$("#MAQ td:eq(98)").html();
  this.f51=$("#MAQ td:eq(99)").html();

  /*--=================================================
      FILA 4  Imp. Digital CP1000 (COSTS X COPY A3) Solo 1 cara
  =================================================--*/
  // f52

  this.f52=(50*realestate/hsMaqImp);
  $("#MAQ td:eq(100)").html("$"+this.f52.toFixed(2));
  
  this.f53=(100000/2257740);
  $("#MAQ td:eq(101)").html("$"+this.f53.toFixed(6));

  this.f54=(39758.93/1128870);
  $("#MAQ td:eq(102)").html("$"+this.f54.toFixed(6));

  this.f55=0;
  $("#MAQ td:eq(103)").html("$"+this.f55.toFixed(2));

  this.f56=0;
  $("#MAQ td:eq(104)").html("$"+this.f56.toFixed(2));

  this.f57=((1000+2000)*d2/47036)/cambio2;//<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOJA4 (CAMBIO)
  $("#MAQ td:eq(105)").html("$"+this.f57.toFixed(6));

  this.f58=0;
  $("#MAQ td:eq(106)").html("$"+this.f58.toFixed(2));

  this.f59=this.f52+this.f53+this.f54+this.f55+this.f56+this.f57+this.f58;
  $("#MAQ td:eq(107)").html("$"+this.f59.toFixed(2));

  this.f60=this.f59*cambio2;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< HOJA4 (CAMBIO)
  $("#MAQ td:eq(108)").html("S/."+this.f60.toFixed(6));
  
  this.f61=$("#MAQ td:eq(109)").html();
  this.f62=$("#MAQ td:eq(110)").html();

  this.f63=40*a1*a2;
  $("#MAQ td:eq(111)").html("$"+this.f63.toFixed(2));
  
  this.f64=$("#MAQ td:eq(112)").html();
  this.f65=$("#MAQ td:eq(113)").html();
  this.f66=$("#MAQ td:eq(114)").html();
  this.f67=$("#MAQ td:eq(115)").html();
  this.f68=$("#MAQ td:eq(116)").html();

  /*--=================================================
      FILA 5  Guillotina Wholemberg 115
  =================================================--*/
  // f69

  this.f69=(25*realestate/hsMaqImp);
  $("#MAQ td:eq(117)").html("$"+this.f69.toFixed(2));
  
  this.f70=(1534.00/hsMaqAux);
  $("#MAQ td:eq(118)").html("$"+this.f70.toFixed(2));

  this.f71=(100*2/hsMaqAux);
  $("#MAQ td:eq(119)").html("$"+this.f71.toFixed(2));

  this.f72=(380.00/6/hsMaqAux);
  $("#MAQ td:eq(120)").html("$"+this.f72.toFixed(2));

  this.f73=10/16;
  $("#MAQ td:eq(121)").html("$"+this.f73.toFixed(2));

  this.f74=((1500)*d1/cambio)/hsOperario;
  $("#MAQ td:eq(122)").html("$"+this.f74.toFixed(2));

  this.f75=(1500*d1/hsOperario)*hExtras/cambio/hsOperario;
  $("#MAQ td:eq(123)").html("$"+this.f75.toFixed(2));

  this.f76=this.f69+this.f70+this.f71+this.f72+this.f73+this.f74+this.f75;
  $("#MAQ td:eq(124)").html("$"+this.f76.toFixed(2));

  this.f77=this.f76*cambio;
  $("#MAQ td:eq(125)").html("S/."+this.f77.toFixed(2));
  
  this.f78=$("#MAQ td:eq(126)").html();
  
  this.f79=$("#MAQ td:eq(127)").html();

  this.f80=30*a1*a2;
  $("#MAQ td:eq(128)").html("$"+this.f80.toFixed(2));
  

  /*--=================================================
      FILA 6  Troqueladora Atenas
  =================================================--*/
  // f86

  this.f81=(25*realestate/hsMaqImp);
  $("#MAQ td:eq(134)").html("$"+this.f81.toFixed(2));
  
  this.f82=(12000/(p1*p2));
  $("#MAQ td:eq(135)").html("$"+this.f82.toFixed(2));

  this.f83=((5000*3)+(400*12*10))/(p1*p2);
  $("#MAQ td:eq(136)").html("$"+this.f83.toFixed(2));
  
  this.f84=0;
  $("#MAQ td:eq(137)").html("$"+this.f84.toFixed(2));

  this.f85=500/hsMaqImp;
  $("#MAQ td:eq(138)").html("$"+this.f85.toFixed(2));

  this.f86=((1500)*d2/cambio)/hsOperario;
  $("#MAQ td:eq(139)").html("$"+this.f86.toFixed(2));

  this.f87=(1500*d2/hsOperario)*hExtras/cambio/hsOperario;
  $("#MAQ td:eq(140)").html("$"+this.f87.toFixed(2));

  this.f88=this.f81+this.f82+this.f83+this.f84+this.f85+this.f86+this.f87;
  $("#MAQ td:eq(141)").html("$"+this.f88.toFixed(2));

  this.f89=this.f88*cambio;
  $("#MAQ td:eq(142)").html("S/."+this.f89.toFixed(2));
  
  this.f90= $("#MAQ td:eq(143)").html();
  this.f91= $("#MAQ td:eq(144)").html();
  
  
  /*--=================================================
      FILA 7  Barnizadora Invicta 33
  =================================================--*/
  // f103

  this.f93=(45*realestate/hsMaqImp);
  $("#MAQ td:eq(168)").html("$"+this.f93.toFixed(2));
  
  this.f94=(8000/(p1*p2));
  $("#MAQ td:eq(169)").html("$"+this.f94.toFixed(2));

  this.f95=((3000*3)+(300*12*10))/(p1*p2);
  $("#MAQ td:eq(170)").html("$"+this.f95.toFixed(2));

  this.f96=390*3/(500*12);
  $("#MAQ td:eq(171)").html("$"+this.f96.toFixed(2));

  this.f97=(500/hsMaqImp);
  $("#MAQ td:eq(172)").html("$"+this.f97.toFixed(2));

  this.f98=((1300+1000)*d1/cambio)/hsOperario;
  $("#MAQ td:eq(173)").html("$"+this.f98.toFixed(2));

  this.f99=0;
  $("#MAQ td:eq(174)").html("$"+this.f99.toFixed(2));

  this.f100=this.f93+this.f94+this.f95+this.f96+this.f97+this.f98+this.f99;
  $("#MAQ td:eq(175)").html("$"+this.f100.toFixed(2));

  this.f101=this.f100*cambio;
  $("#MAQ td:eq(176)").html("S/."+this.f101.toFixed(2));
  
  this.f102= $("#MAQ td:eq(177)").html();
  this.f103= $("#MAQ td:eq(178)").html();
  
  /*--=================================================
      FILA 8  Barnizadora Adast Dominant 724
  =================================================--*/
  // f120

  this.f105=(30*realestate/hsMaqImp);
  $("#MAQ td:eq(185)").html("$"+this.f105.toFixed(2));
  
  this.f106=(8000/(p1*p2));
  $("#MAQ td:eq(186)").html("$"+this.f106.toFixed(2));

  this.f107=((3000*3)+(300*12*10))/(p1*p2);
  $("#MAQ td:eq(187)").html("$"+this.f107.toFixed(2));

  this.f108=390*3/(500*12);
  $("#MAQ td:eq(188)").html("$"+this.f108.toFixed(2));

  this.f109=(500/hsMaqImp);
  $("#MAQ td:eq(189)").html("$"+this.f109.toFixed(2));

  this.f110=((1300+1000)*d1/cambio)/hsOperario;
  $("#MAQ td:eq(190)").html("$"+this.f110.toFixed(2));

  this.f111=0;
  $("#MAQ td:eq(191)").html("$"+this.f111.toFixed(2));

  this.f112=this.f105+this.f106+this.f107+this.f108+this.f109+this.f110+this.f111;
  $("#MAQ td:eq(192)").html("$"+this.f112.toFixed(2));

  this.f113=this.f112*cambio;
  $("#MAQ td:eq(193)").html("S/."+this.f113.toFixed(2));
  
  this.f114= $("#MAQ td:eq(194)").html();
  this.f115= $("#MAQ td:eq(195)").html();
  
  /*--=================================================
      FILA 9  Dobladora Stahl
  =================================================--*/
  // f137

  this.f117=(30*realestate/hsMaqImp);
  $("#MAQ td:eq(224)").html("$"+this.f117.toFixed(2));
  
  this.f118=1534/hsMaqAux;
  $("#MAQ td:eq(225)").html("$"+this.f118.toFixed(2));

  this.f119=100/hsMaqAux;
  $("#MAQ td:eq(226)").html("$"+this.f119.toFixed(2));

  this.f120=1176.47/6/hsMaqAux;
  $("#MAQ td:eq(227)").html("$"+this.f120.toFixed(2));

  this.f121=0/16;
  $("#MAQ td:eq(228)").html("$"+this.f121.toFixed(2));

  this.f122=561/hsOperario;
  $("#MAQ td:eq(229)").html("$"+this.f122.toFixed(2));

  this.f123=116.88/hsOperario;
  $("#MAQ td:eq(230)").html("$"+this.f123.toFixed(2));

  this.f124=this.f117+this.f118+this.f119+this.f120+this.f121+this.f122+this.f123;
  $("#MAQ td:eq(231)").html("$"+this.f124.toFixed(2));

  this.f125=this.f124*cambio;
  $("#MAQ td:eq(232)").html("S/."+this.f125.toFixed(2));
  
  this.f126= $("#MAQ td:eq(233)").html();
  this.f127= $("#MAQ td:eq(234)").html();
  
  /*--=================================================
      FILA 10-11  extra
  =================================================--*/
  
  this.f128=(40*realestate/hsMaqImp);
  $("#MAQ td:eq(235)").html("$"+this.f128.toFixed(2));
  
  this.f129= $("#MAQ td:eq(244)").html();
  this.f130= $("#MAQ td:eq(245)").html();
  
  this.f131=(30*realestate/hsMaqImp);
  $("#MAQ td:eq(246)").html("$"+this.f131.toFixed(2));
  
  this.f132= $("#MAQ td:eq(255)").html();
  this.f133= $("#MAQ td:eq(256)").html();
}

//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider2 = new F1810MAQ();


/*================================================================================
  SLIDER 3: TABLA F1810INSUMOS
================================================================================*/

//  FUNCION PRINCIPAL
var F1810INSUMOS = function() {
    this.gtoTotal=0;
    this.smTotal=0;
    this.r700Total=0;
    this.uvbprecio = 0;
    this.offbprecio = 0;
    this.offmprecio = 0;
    this.acrbprecio = 0;
    this.acrmprecio = 0;
};

// FUNCION PARA OBTENER DATOS DE LOS OTROS SLIDERS
F1810INSUMOS.prototype.valoresIniciales = function(){

  //EXTRAYENDO DATOS DE F1810- GENERAL
  var f1810 =document.getElementById("F1810");
  var codmaquina= $(f1810).find("td:eq(9)").text();
  var tiraje= $(f1810).find("td:eq(30)").text();
  var mtspapel= slider1.mtrCuadrados;
  var piezas= $(f1810).find("td:eq(18)").text();
  


  if (tiraje == "" ){
      tiraje = 0;

  } else{
      tiraje=parseFloat(tiraje);
  }
  if (mtspapel == "" ){
      mtspapel=1;

  } else{
      mtspapel=parseFloat(mtspapel);
  }
  if (piezas == "" ){
      piezas = 0;

  } else{
      piezas=parseFloat(piezas);
  }

  //EXTRAYENDO DATOS DE F1810- MAQUINAS
  var costoadast= slider2.f112;
  var costoroland= slider2.f8;
  var costobarnizadora= slider2.f100;


  //--FORMULA DE LOS VALORES INCIALES
  if (codmaquina==8) {
      extrauvb=(tiraje*piezas/3000*costobarnizadora)/mtspapel + 0.035;   
  }else{
      extrauvb=(tiraje/2500*costoadast)/mtspapel + 0.035;
  }
  extraoffb = (tiraje/2500*costoadast)/mtspapel + 0.010978;
  extraoffm = (tiraje/2500*costoadast)/mtspapel + 0.012807;
  extraacrb = costoroland/mtspapel+ 0.0098;
  extraacrm = costoroland/mtspapel+ 0.0098;


  //--ASIGNACION DE VALORES INICIALES--
  document.getElementById("uvb").value=extrauvb.toFixed(3); 
  document.getElementById("offb").value=extraoffb.toFixed(3); 
  document.getElementById("offm").value=extraoffm.toFixed(3); 
  document.getElementById("acrb").value=extraacrb.toFixed(3); 
  document.getElementById("acrm").value=extraacrm.toFixed(3); 
  
  this.uvbprecio = extrauvb;
  this.offbprecio = extraoffb;
  this.offmprecio = extraoffm;
  this.acrbprecio = extraacrb;
  this.acrmprecio = extraacrm;

}

//  FUNCION PARA CALCULAR EL VALOR DE LAS CELDAS EN LAS TABLAS
F1810INSUMOS.prototype.resultado = function(){

  //  DATOS DINAMICOS INICIALES
  var S1 = $("#tipocambio").val();
  var S2 = $("#factor").val();
  var S3 = $("#milsolcista").val();

  //  DETALLES DE PLACAS X HORA
  var dp =document.getElementById("dplacas");
  var d1= parseFloat(dp.getElementsByTagName('input')[0].value);
  var d2= parseFloat(dp.getElementsByTagName('input')[1].value);
  var d3= parseFloat(dp.getElementsByTagName('input')[2].value);
  var d4= parseFloat(dp.getElementsByTagName('input')[3].value);
  var d5= parseFloat(dp.getElementsByTagName('input')[4].value);
  var d6= parseFloat(dp.getElementsByTagName('input')[5].value);

  //  DETALLES DE PLACAS X MAQUINA
  var mp =document.getElementById("mplacas");
  var m1= parseFloat(mp.getElementsByTagName('input')[0].value);
  var m2= parseFloat(mp.getElementsByTagName('input')[1].value);
  var m3= parseFloat(mp.getElementsByTagName('input')[2].value);
  var m4= parseFloat(mp.getElementsByTagName('input')[3].value);
  var m5= parseFloat(mp.getElementsByTagName('input')[4].value);
  var m6= parseFloat(mp.getElementsByTagName('input')[5].value);

  //  DETALLES DEL OPERARIO
  var o = document.getElementById("operario");
  var o1= parseFloat(o.getElementsByTagName('input')[0].value);
  var o2= parseFloat(o.getElementsByTagName('input')[1].value);

  //  VALOR AGREGADO DEL ITEM
  var i= document.getElementById("vitem");
  var i1= parseFloat(i.getElementsByTagName('input')[0].value);
  var i2= parseFloat(i.getElementsByTagName('input')[1].value);
  var i3= parseFloat(i.getElementsByTagName('input')[2].value);
  var i4= parseFloat(i.getElementsByTagName('input')[3].value);
  var i5= parseFloat(i.getElementsByTagName('input')[4].value);

  /*================================================================

              ITEM -- TABLA DE BARNICES O REVESTIMIENTOS

  ================================================================*/
  var it= document.getElementById("item"); 

      //UV-B
  var uvb1= parseFloat(it.getElementsByTagName('input')[0].value);    
  var uvb2= parseFloat(it.getElementsByTagName('input')[1].value);    
  var uvb3= parseFloat(it.getElementsByTagName('input')[2].value);    
  var uvb4= (it.getElementsByTagName('input')[3].value);    
  var uvb5= parseFloat(it.getElementsByTagName('input')[4].value);    
  var uvb6= parseFloat(it.getElementsByTagName('input')[5].value);

      //UV-B-2C
  var uvbc1= parseFloat(it.getElementsByTagName('input')[6].value);    
  var uvbc2= parseFloat(it.getElementsByTagName('input')[7].value);    
  var uvbc3= parseFloat(it.getElementsByTagName('input')[8].value);    
  var uvbc4= (it.getElementsByTagName('input')[9].value);    
  var uvbc5= parseFloat(it.getElementsByTagName('input')[10].value);    
  var uvbc6= parseFloat(it.getElementsByTagName('input')[11].value);

      //UV-M
  var uvm1= parseFloat(it.getElementsByTagName('input')[12].value);
  var uvm2= parseFloat(it.getElementsByTagName('input')[13].value);
  var uvm3= parseFloat(it.getElementsByTagName('input')[14].value);
  var uvm4= (it.getElementsByTagName('input')[15].value);
  var uvm5= parseFloat(it.getElementsByTagName('input')[16].value);
  var uvm6= parseFloat(it.getElementsByTagName('input')[17].value);

      //UV-M-2C
  var uvmc1= parseFloat(it.getElementsByTagName('input')[18].value);
  var uvmc2= parseFloat(it.getElementsByTagName('input')[19].value);
  var uvmc3= parseFloat(it.getElementsByTagName('input')[20].value);
  var uvmc4= (it.getElementsByTagName('input')[21].value);
  var uvmc5= parseFloat(it.getElementsByTagName('input')[22].value);
  var uvmc6= parseFloat(it.getElementsByTagName('input')[23].value);

      //UVSB
  var uvsb1= parseFloat(it.getElementsByTagName('input')[24].value);
  var uvsb2= parseFloat(it.getElementsByTagName('input')[25].value);
  var uvsb3= parseFloat(it.getElementsByTagName('input')[26].value);
  var uvsb4= (it.getElementsByTagName('input')[27].value);
  var uvsb5= parseFloat(it.getElementsByTagName('input')[28].value);
  var uvsb6= parseFloat(it.getElementsByTagName('input')[29].value);

      //UVSB-C
  var uvsbc1= parseFloat(it.getElementsByTagName('input')[30].value);
  var uvsbc2= parseFloat(it.getElementsByTagName('input')[31].value);
  var uvsbc3= parseFloat(it.getElementsByTagName('input')[32].value);
  var uvsbc4= (it.getElementsByTagName('input')[33].value);
  var uvsbc5= parseFloat(it.getElementsByTagName('input')[34].value);
  var uvsbc6= parseFloat(it.getElementsByTagName('input')[35].value);

      //UVSM
  var uvsm1= parseFloat(it.getElementsByTagName('input')[36].value);
  var uvsm2= parseFloat(it.getElementsByTagName('input')[37].value);
  var uvsm3= parseFloat(it.getElementsByTagName('input')[38].value);
  var uvsm4= (it.getElementsByTagName('input')[39].value);
  var uvsm5= parseFloat(it.getElementsByTagName('input')[40].value);
  var uvsm6= parseFloat(it.getElementsByTagName('input')[41].value);

      //UVSM-2C
  var uvsmc1= parseFloat(it.getElementsByTagName('input')[42].value);
  var uvsmc2= parseFloat(it.getElementsByTagName('input')[43].value);
  var uvsmc3= parseFloat(it.getElementsByTagName('input')[44].value);
  var uvsmc4= (it.getElementsByTagName('input')[45].value);
  var uvsmc5= parseFloat(it.getElementsByTagName('input')[46].value);
  var uvsmc6= parseFloat(it.getElementsByTagName('input')[47].value);

      //OFFB
  var offb1= parseFloat(it.getElementsByTagName('input')[48].value);
  var offb2= parseFloat(it.getElementsByTagName('input')[49].value);
  var offb3= parseFloat(it.getElementsByTagName('input')[50].value);
  var offb4= (it.getElementsByTagName('input')[51].value);
  var offb5= parseFloat(it.getElementsByTagName('input')[52].value);
  var offb6= parseFloat(it.getElementsByTagName('input')[53].value);

      //OFFB-2C
  var offbc1= parseFloat(it.getElementsByTagName('input')[54].value);
  var offbc2= parseFloat(it.getElementsByTagName('input')[55].value);
  var offbc3= parseFloat(it.getElementsByTagName('input')[56].value);
  var offbc4= (it.getElementsByTagName('input')[57].value);
  var offbc5= parseFloat(it.getElementsByTagName('input')[58].value);
  var offbc6= parseFloat(it.getElementsByTagName('input')[59].value);

      //OFFM
  var offm1= parseFloat(it.getElementsByTagName('input')[60].value);
  var offm2= parseFloat(it.getElementsByTagName('input')[61].value);
  var offm3= parseFloat(it.getElementsByTagName('input')[62].value);
  var offm4= (it.getElementsByTagName('input')[63].value);
  var offm5= parseFloat(it.getElementsByTagName('input')[64].value);
  var offm6= parseFloat(it.getElementsByTagName('input')[65].value);

      //OFFM-2C
  var offmc1= parseFloat(it.getElementsByTagName('input')[66].value);
  var offmc2= parseFloat(it.getElementsByTagName('input')[67].value);
  var offmc3= parseFloat(it.getElementsByTagName('input')[68].value);
  var offmc4= (it.getElementsByTagName('input')[69].value);
  var offmc5= parseFloat(it.getElementsByTagName('input')[70].value);
  var offmc6= parseFloat(it.getElementsByTagName('input')[71].value);

      //ACRB
  var acrb1= parseFloat(it.getElementsByTagName('input')[72].value);
  var acrb2= parseFloat(it.getElementsByTagName('input')[73].value);
  var acrb3= parseFloat(it.getElementsByTagName('input')[74].value);
  var acrb4= (it.getElementsByTagName('input')[75].value);
  var acrb5= parseFloat(it.getElementsByTagName('input')[76].value);
  var acrb6= parseFloat(it.getElementsByTagName('input')[77].value);

      //ACRB-2C
  var acrbc1= parseFloat(it.getElementsByTagName('input')[78].value);
  var acrbc2= parseFloat(it.getElementsByTagName('input')[79].value);
  var acrbc3= parseFloat(it.getElementsByTagName('input')[80].value);
  var acrbc4= (it.getElementsByTagName('input')[81].value);
  var acrbc5= parseFloat(it.getElementsByTagName('input')[82].value);
  var acrbc6= parseFloat(it.getElementsByTagName('input')[83].value);

      //ACRM
  var acrm1= parseFloat(it.getElementsByTagName('input')[84].value);
  var acrm2= parseFloat(it.getElementsByTagName('input')[85].value);
  var acrm3= parseFloat(it.getElementsByTagName('input')[86].value);
  var acrm4= (it.getElementsByTagName('input')[87].value);
  var acrm5= parseFloat(it.getElementsByTagName('input')[88].value);
  var acrm6= parseFloat(it.getElementsByTagName('input')[89].value);

      //ACRM-2C
  var acrmc1= parseFloat(it.getElementsByTagName('input')[90].value);
  var acrmc2= parseFloat(it.getElementsByTagName('input')[91].value);
  var acrmc3= parseFloat(it.getElementsByTagName('input')[92].value);
  var acrmc4= (it.getElementsByTagName('input')[93].value);
  var acrmc5= parseFloat(it.getElementsByTagName('input')[94].value);
  var acrmc6= parseFloat(it.getElementsByTagName('input')[95].value);

      //PL-B
  var plb1= parseFloat(it.getElementsByTagName('input')[96].value);
  var plb2= parseFloat(it.getElementsByTagName('input')[97].value);
  var plb3= parseFloat(it.getElementsByTagName('input')[98].value);
  var plb4= (it.getElementsByTagName('input')[99].value);
  var plb5= parseFloat(it.getElementsByTagName('input')[100].value);
  var plb6= parseFloat(it.getElementsByTagName('input')[101].value);

      //PL-B-2C
  var plbc1= parseFloat(it.getElementsByTagName('input')[102].value);
  var plbc2= parseFloat(it.getElementsByTagName('input')[103].value);
  var plbc3= parseFloat(it.getElementsByTagName('input')[104].value);
  var plbc4= (it.getElementsByTagName('input')[105].value);
  var plbc5= parseFloat(it.getElementsByTagName('input')[106].value);
  var plbc6= parseFloat(it.getElementsByTagName('input')[107].value);

      //PL-M
  var plm1= parseFloat(it.getElementsByTagName('input')[108].value);
  var plm2= parseFloat(it.getElementsByTagName('input')[109].value);
  var plm3= parseFloat(it.getElementsByTagName('input')[110].value);
  var plm4= (it.getElementsByTagName('input')[111].value);
  var plm5= parseFloat(it.getElementsByTagName('input')[112].value);
  var plm6= parseFloat(it.getElementsByTagName('input')[113].value);

      //PL-M-2C
  var plmc1= parseFloat(it.getElementsByTagName('input')[114].value);
  var plmc2= parseFloat(it.getElementsByTagName('input')[115].value);
  var plmc3= parseFloat(it.getElementsByTagName('input')[116].value);
  var plmc4= (it.getElementsByTagName('input')[117].value);
  var plmc5= parseFloat(it.getElementsByTagName('input')[118].value);
  var plmc6= parseFloat(it.getElementsByTagName('input')[119].value);

      //PL-H
  var plh1= parseFloat(it.getElementsByTagName('input')[120].value);
  var plh2= parseFloat(it.getElementsByTagName('input')[121].value);
  var plh3= parseFloat(it.getElementsByTagName('input')[122].value);
  var plh4= (it.getElementsByTagName('input')[123].value);
  var plh5= parseFloat(it.getElementsByTagName('input')[124].value);
  var plh6= parseFloat(it.getElementsByTagName('input')[125].value);

      //PL-H-2C
  var plhc1= parseFloat(it.getElementsByTagName('input')[126].value);
  var plhc2= parseFloat(it.getElementsByTagName('input')[127].value);
  var plhc3= parseFloat(it.getElementsByTagName('input')[128].value);
  var plhc4= (it.getElementsByTagName('input')[129].value);
  var plhc5= parseFloat(it.getElementsByTagName('input')[130].value);
  var plhc6= parseFloat(it.getElementsByTagName('input')[131].value);

      //ESCH
  var esch1= parseFloat(it.getElementsByTagName('input')[132].value);
  var esch2= parseFloat(it.getElementsByTagName('input')[133].value);
  var esch3= parseFloat(it.getElementsByTagName('input')[134].value);
  var esch4= (it.getElementsByTagName('input')[135].value);
  var esch5= parseFloat(it.getElementsByTagName('input')[136].value);
  var esch6= parseFloat(it.getElementsByTagName('input')[137].value);

      //ESCH-2C
  var eschc1= parseFloat(it.getElementsByTagName('input')[138].value);
  var eschc2= parseFloat(it.getElementsByTagName('input')[139].value);
  var eschc3= parseFloat(it.getElementsByTagName('input')[140].value);
  var eschc4= (it.getElementsByTagName('input')[141].value);
  var eschc5= parseFloat(it.getElementsByTagName('input')[142].value);
  var eschc6= parseFloat(it.getElementsByTagName('input')[143].value);

      //HOST
  var host1= parseFloat(it.getElementsByTagName('input')[144].value);
  var host2= parseFloat(it.getElementsByTagName('input')[145].value);
  var host3= parseFloat(it.getElementsByTagName('input')[146].value);
  var host4= (it.getElementsByTagName('input')[147].value);
  var host5= parseFloat(it.getElementsByTagName('input')[148].value);
  var host6= parseFloat(it.getElementsByTagName('input')[149].value);

      //HOST-2C
  var hostc1= parseFloat(it.getElementsByTagName('input')[150].value);
  var hostc2= parseFloat(it.getElementsByTagName('input')[151].value);
  var hostc3= parseFloat(it.getElementsByTagName('input')[152].value);
  var hostc4= (it.getElementsByTagName('input')[153].value);
  var hostc5= parseFloat(it.getElementsByTagName('input')[154].value);
  var hostc6= parseFloat(it.getElementsByTagName('input')[155].value);



  /*================================================================

              PRECIO DE PLACAS

  ================================================================*/

//DEPRECIACION Y MANTENIMIENTO
    var gto1 = ((d2+d3)*m2)*d1;
    $("#placas td:eq(7)").html(gto1.toFixed(3));

    var sm1 = ((d2+d3)*m4)*d1;
    $("#placas td:eq(12)").html(sm1.toFixed(3));

    var r7001 = ((d2+d3)*m6)*d1;
    $("#placas td:eq(17)").html(r7001.toFixed(3));

//CD + MERMA + PROD AUX
    var gto2 = (d4*d5*m1);
    $("#placas td:eq(8)").html(gto2.toFixed(3));

    var sm2 = (d4*d5*m3);
    $("#placas td:eq(13)").html(sm2.toFixed(3));

    var r7002 = (d4*d5*m5);
    $("#placas td:eq(18)").html(r7002.toFixed(3));

// MANO DE OBRA
    //NOTAAAAAA 1.43 OBTENER DE HOJA 3
    var gto3 = (o1*1.43/o2*d6*m2/4/S1);
    $("#placas td:eq(9)").html(gto3.toFixed(3)); 

    var sm3 = (o1*1.43/o2*d6*m4/4/S1);
    $("#placas td:eq(14)").html(sm3.toFixed(3)); 

    var r7003 = (o1*1.43/o2*d6*m6/4/S1);
    $("#placas td:eq(19)").html(r7003.toFixed(3));

// PRECIO DE PLACA
    var gtoTotal = gto1+gto2+gto3;
    this.gtoTotal=gtoTotal;
    $("#placas td:eq(10)").html(gtoTotal.toFixed(3));

    var smTotal = sm1+sm2+sm3;
    this.smTotal=smTotal;
    $("#placas td:eq(15)").html(smTotal.toFixed(3)); 

    var r700Total = r7001+r7002+r7003;
    this.r700Total=r700Total;
    $("#placas td:eq(20)").html(r700Total.toFixed(3));
    

// ----------------  COSTO ITEM -----------------------  

    var preciouvbc = 2*uvb1;
    document.getElementById("uvbc").value=preciouvbc.toFixed(3);

    var preciouvmc = 2*uvm1;
    document.getElementById("uvmc").value=preciouvmc.toFixed(3);


    var preciooffbc = 2*offb1;
    document.getElementById("offbc").value=preciooffbc.toFixed(3);


    var preciooffmc = 2*offm1;
    document.getElementById("offmc").value=preciooffmc.toFixed(3);


    var precioacrbc = 2*acrb1;
    document.getElementById("acrbc").value=precioacrbc.toFixed(3);


    var precioacrmc = 2*acrm1;
    document.getElementById("acrmc").value=precioacrmc.toFixed(3);
}


//  CREAR OBJETO DE LA FUNCION PRINCIPAL
var slider3 = new F1810INSUMOS();

/*================================================================================
  INICIALIZAR FUNCIONES
================================================================================*/

slider2.CPOS_TOTAL();
slider2.calcular();

slider0.cotizar();
slider1.F1810_Calcular();
slider3.valoresIniciales();
slider3.resultado();
