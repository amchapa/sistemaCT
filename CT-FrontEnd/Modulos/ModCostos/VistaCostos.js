function mostrarAcabados(){
  var boxAcabados="";
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/Controlador_MostrarAcabados.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxAcabados+="<option value='0' selected>Elegir Acabados</option>";
            $("#acabados").html(boxAcabados);
            $("#acabado").html(boxAcabados);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxAcabados+="<option value='0' selected>Elegir Acabados</option>";
                $("#acabados").html(boxAcabados);
                $("#acabado").html(boxAcabados);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAcabados+="<option value='0' selected>Elegir Acabados</option>";
                    }
                     
                    boxAcabados+="<option value='"+datos[i].TIPACABCODIGO+"'>"+datos[i].TIPACABNOMBRE+"</option>";
                  
                }
                $("#acabados").html(boxAcabados);
                $("#acabado").html(boxAcabados);
            }
        }
    });  
}

function mostrarMaquinas(){
  var boxMaquinas="";
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModMaestros/Controlador_Maquinas/Controlador_MostrarTodosMaquinas.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxMaquinas+="<option value='0' selected>Elegir Máquina</option>";
            $("#maquinas").html(boxMaquinas);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxMaquinas+="<option value='0' selected>Elegir Máquina</option>";
                $("#maquinas").html(boxMaquinas);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxMaquinas+="<option value='0' selected>Elegir Máquina</option>";
                    }
                     
                    boxMaquinas+="<option value='"+datos[i].MAQUICODIGO+"'>"+datos[i].MAQUINOMBRE+"</option>";
                  
                }
                $("#maquinas").html(boxMaquinas);
            }
        }
    });  
}

function mostrarProveedor(){
    var boxProveedor="";
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Proveedor/Controlador_MostrarTodosProveedores.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                console.log("Archivos no encontrados");
            }
            else{
                console.log("Error no identificado");
            }
            boxProveedor+="<option value='0' selected>Elegir Proveedor</option>";
            $("#proveedor").html(boxProveedor);
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxProveedor+="<option value='0' selected>Elegir Proveedor</option>";
                $("#proveedor").html(boxProveedor);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxProveedor+="<option value='0' selected>Elegir Proveedor</option>";
                    }
                    boxProveedor+="<option value='"+datos[i].PROVEEDCODIGO+"'>"+datos[i].PROVEEDRAZON_SOCIAL+"</option>";
                }
                $("#proveedor").html(boxProveedor);
            }
        }
    }); 
}

function mostrarPersonal(){
    var boxPersonal="";
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModMaestros/Controlador_Personal/Controlador_MostrarTodosPersonal.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxPersonal+="<option value='0' selected>Elegir Personal</option>";
            $("#personal").html(boxPersonal);
            $("#ayudante").html(boxPersonal);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxPersonal+="<option value='0' selected>Elegir Personal</option>";
                $("#personal").html(boxPersonal);
                $("#ayudante").html(boxPersonal);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxPersonal+="<option value='0' selected>Elegir Personal</option>";
                    }
                  if(datos[i].AREADESCRIPCION=="IMPRESION" || datos[i].AREADESCRIPCION=="ACABADOS" || datos[i].AREADESCRIPCION=="PREPRENSA"){
                     
                    boxPersonal+="<option value='"+datos[i].PERSCODIGO+"'>"+datos[i].PERSAPELLIDO_PATERNO+" "+datos[i].PERSAPELLIDO_MATERNO+" "+datos[i].PERSNOMBRE+"</option>";
                  }
                }
                $("#personal").html(boxPersonal);
                $("#ayudante").html(boxPersonal);
            }
        }
    });  
}

function evaluar(){
  
  var $datos = {
    '_dato': $("#codigo").val()
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
            if(datos.response=="0"){
              mostrarMensaje("error","LA ORDEN INGRESADA NO EXISTE");
              $("#codigo").val("");
            }
            else{
              mostrarMensaje("exito","CARGANDO DATOS");
              $("#opcodigotexto").html("LLENAR COSTOS ACABADOS POR FACTURA - " +datos[0].OPCODIGO)
              document.getElementById("llenadoprincipal").style.display='none';
              document.getElementById("llenadosecundario").style.display=null;
              mostrarItemsOp(datos[0].OPCODIGO);
            }
        }
    });
}

function mostrarItemsOp(codigo){
   var $datos={
        '_codigo':codigo,
        '_opcion': "datos"
    };
    
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarItemXOrdProduccion.php',
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
          if(datos.response=="1"){
            mostrarMensaje("error","NO TIENE ITEM");
          }else{
              var items=""
              for( var i=0; i<datos.length; i++){
                items+="<button class='btn principal' name='"+datos[i].ITEMDESCRIPCION+"' id='"+datos[i].ITEMNUMERO+"' onclick='mostrarFormulario(this.id,this.name);return false'>"+datos[i].ITEMCODIGO+"</button>";
                arrayBotones[i]=datos[i].ITEMNUMERO;
              }
            $("#item").html(items)
            $("#contenedor-item").html("");
            document.getElementById("return").style.display=null;
          }
        }
    });
}

function botonActivo(boton){
  for(var i=0;i<arrayBotones.length;i++){
    if(arrayBotones[i]==boton){
       document.getElementById(boton).style.background="blue";
    }else{
      document.getElementById(arrayBotones[i]).style.background="red";
    }
  } 
}

function registrarControlInsumo(texto,op){
  
  var $datos = {
    '_codigo': "CI-"+op,
    '_op':op,
    '_preprensa':0,
    '_placas':0,
    '_papel':0,
    '_tinta':0,
    '_impresion':0,
    '_manoobra':0,
    '_corte':0,
    '_troquelado':0,
    '_doblez':0,
    '_alce':0,
    '_barnizado':0,
    '_contado':0,
    '_contraplacado':0,
    '_encolado':0,
    '_desglozado':0,
    '_engrapado':0,
    '_pegado':0,
    '_numerado':0,
    '_plastificado':0,
    '_fajillado':0,
    '_empaquetado':0,
    '_acabadoextra':0,
    '_supervision':0,
    '_otros':0,
    '_movilidad':0,
    '_energiaelectrica':0,
    '_preciototal':0,
    '_valorventa':0,
    '_porcentaje':"%100",
  }
  
  $.ajax({
        url: '../CT-BackEnd/Controlador/ModCostos/Controlador_RegistrarControlInsumo.php',
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
            mostrarMensaje("error","REGISTRO INCORRECTO! ERROR: "+datos.message);
          }else{
            if(texto=="guardarxPersonal"){
              mostrarCostoxAcabado("CI-"+op, $("#acabado").val());
            }else{
              registrarCostosFactura("CI-"+op);
            }
          }
        }
    });
  

}

function mostrarCostoxAcabado(codigocontrolinsumo,codigoacabado){
  var $datos = {
    '_codigo': codigoacabado
  }
   $.ajax({
        url: '../CT-BackEnd/Controlador/ModCostos/Controlador_MostrarAcabadoXcodigo.php',
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
          registrarCostosAcabados(codigocontrolinsumo,datos.TIPACABCOSTO);
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