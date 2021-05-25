function ventanaRegistrarProductos(registro){
    var familiax= registro;
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/RegistrarTiposFamilia.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
          mostrarRegistro(familiax)
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaListadoTiposFamilia(texto){
    var tipo= texto;
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/ListadoTiposFamilia.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            cargarDatos(tipo,0)
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaRegistrarProducto(codigo){
  var accion=codigo;
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/RegistroProducto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            mostrarOpciones(accion)
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaListadoProductos(){
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/ListadoProductos.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaListadoPreciosXKilo(){
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/ListadoPreciosXKilo.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaRegistrarSalidaProducto(){
  $.ajax({  
        url: 'Modulos/ModCostos/Almacen/RegistrarSalidaProducto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaRegistrarIngresoProducto(codigoProducto){
  
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/RegistroIngresoProducto.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            mostrarProductoDetalles(codigoProducto);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaListadoStock(){
    $.ajax({  
        url: 'Modulos/ModCostos/Almacen/ListadoStock.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaListadoIngresos(){
  $.ajax({  
        url: 'Modulos/ModCostos/Almacen/ListadoIngresos.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaListadoSalidas(){
  $.ajax({  
        url: 'Modulos/ModCostos/Almacen/ListadoSalidas.html',  
        success: function(data) {  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function ventanaFactura(){
  $.ajax({  
        url: 'Modulos/ModCostos/Almacen/FacturaSimulador.html',
        success: function(data){  
            $('#cuerpo').html(data);
            clearInterval(intervalo)
        }  
    }); 
}

function mostrarRegistro(register){
  if(register=="producto"){
  $("#tituloRegistro").html("REGISTRO DE TIPOS DE PRODUCTOS");
  document.getElementById('familiapapel').style.display='none'
  }else{
    $("#tituloRegistro").html("REGISTRO DE FAMILIA PAPEL");
    document.getElementById('tipoproducto').style.display='none'
  }
}

/* MOSTRA INFORMACION DEL PRODUCTO */
function mostrarProductoDetalles(codigoProducto){

  var $codigo={
    '_codigo':codigoProducto
  }
   $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_MostrarProductoXCodigo.php",
        type: 'POST',
        data:$codigo,
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
              mostrarMensaje("error","" + datos.message);
          }else{
            mostrarMensaje("exito", "DATOS CARGADOS CORRECTAMENTE");
            if(datos.ESTADOCODIGO=="66"){
              var estado="ACTIVO";
            }else{
              var estado="INACTIVO"
            }
            var datosProducto1="";
            var datosProducto2="";
            var datosProducto3="";
            var datosProducto4="";
            $("#codigoProductoPrincipal").val(datos.PRONUMERO)
            datosProducto1+="<tr >\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>CÓDIGO</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PROCODIGO+"</td>\
                    </tr>\
                    <tr >\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>NOMBRE</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PRONOMBRE+"</td>\
                    </tr>\
                    <tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>UNIDAD</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PROUNIDAD+"</td>\
                    </tr>";
            datosProducto2+="<tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>TIPO DE PRODUCTO</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.FAMPRONOMBRE+"</td>\
                    </tr>\
                    <tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>COSTO</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PROTIPOCOSTO.toUpperCase()+"</td>\
                    </tr>\
                    <tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>ESTADO</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+estado+"</td>\
                    </tr>";

            if(datos.PROMARCA!=""){
              datosProducto3+="<tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>MARCA</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PROMARCA+"</td>\
                    </tr>";
            }
            if(datos.PROTAMAÑO!=""){
              datosProducto3+="<tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>TAMAÑO</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PROTAMAÑO+"</td>\
                    </tr>";
            }
            if(datos.PROGRAMAJE!=""){
              datosProducto3+="<tr>\
                      <td class='text-center font-weight-bold mx-2' style='font-size:120%'>GRAMAJE</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td class='text-center mx-2'>"+datos.PROGRAMAJE+"</td>\
                    </tr>";
            }
            if(datos.STO_CT=='0'){
              datosProducto4+="<tr>\
                      <td id='disponible' class='text-center red-text font-weight-bold mx-2' style='font-size:120%'>STOCK CT</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleCT' class='text-center mx-2'>"+datos.STO_CT+"</td>\
                    </tr>";
            }else{
             datosProducto4+="<tr>\
                      <td id='disponible' class='text-center blue-text font-weight-bold mx-2' style='font-size:120%'>STOCK CT</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleCT' class='text-center mx-2'>"+datos.STO_CT+"</td>\
                    </tr>";
            }
            if(datos.STO_ER=='0'){
              datosProducto4+="<tr>\
                      <td id='disponible' class='text-center red-text font-weight-bold mx-2' style='font-size:120%'>STOCK ER</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleER' class='text-center mx-2'>"+datos.STO_ER+"</td>\
                    </tr>";
            }else{
             datosProducto4+="<tr>\
                      <td id='disponible' class='text-center blue-text font-weight-bold mx-2' style='font-size:120%'>STOCK ER</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleER' class='text-center mx-2'>"+datos.STO_ER+"</td>\
                    </tr>";
            }
            if(datos.STO_ED=='0'){
              datosProducto4+="<tr>\
                      <td id='disponible' class='text-center red-text font-weight-bold mx-2' style='font-size:120%'>STOCK ED</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleED' class='text-center mx-2'>"+datos.STO_ED+"</td>\
                    </tr>";
            }else{
             datosProducto4+="<tr>\
                      <td id='disponible' class='text-center blue-text font-weight-bold mx-2' style='font-size:120%'>STOCK ED</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleED' class='text-center mx-2'>"+datos.STO_ED+"</td>\
                    </tr>";
            }
            if(datos.STO_GR=='0'){
              datosProducto4+="<tr>\
                      <td id='disponible' class='text-center red-text font-weight-bold mx-2' style='font-size:120%'>STOCK GR</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleGR' class='text-center mx-2'>"+datos.STO_GR+"</td>\
                    </tr>";
            }else{
             datosProducto4+="<tr>\
                      <td id='disponible' class='text-center blue-text font-weight-bold mx-2' style='font-size:120%'>STOCK GR</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponibleGR' class='text-center mx-2'>"+datos.STO_GR+"</td>\
                    </tr>";
            }
            if(datos.STOCK=='0'){
              datosProducto4+="<tr>\
                      <td id='disponible' class='text-center red-text font-weight-bold mx-2' style='font-size:120%'>DISPONIBLE</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponible' class='text-center mx-2'>"+datos.STOCK+"</td>\
                    </tr>";
            }else{
             datosProducto4+="<tr>\
                      <td id='disponible' class='text-center blue-text font-weight-bold mx-2' style='font-size:120%'>DISPONIBLE</td>\
                      <td class='text-center mx-2'>:</td>\
                      <td id='stockDisponible' class='text-center mx-2'>"+datos.STOCK+"</td>\
                    </tr>";
            }
            
            $("#resumen1").html(datosProducto1);
            $("#resumen2").html(datosProducto2);
            $("#resumen3").html(datosProducto3);
            $("#resumen4").html(datosProducto4);
            if($("#tituloRegistro").html()=="REGISTRO DE SALIDA DE PRODUCTO"){
              if(datos.STOCK=="0"){
                  document.getElementById("registrarSalidaAprobada").disabled=true;
                }else{
                  document.getElementById('registrarSalidaAprobada').disabled=false;
                }
                mostrarEmpresa('empresa')
             }
          }
        }
    });
}

function mostrarFamiliaProductos(ID,codigoproducto){
  var boxAcabados="";
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_MostrarFamiliaProductos.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxAcabados+="<option value='0' selected>Elegir Tipo Producto</option>";
            $("#"+ID).html(boxAcabados);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxAcabados+="<option value='0' selected>Elegir Tipo Producto</option>";
                $("#"+ID).html(boxAcabados);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAcabados+="<option value='0' selected disabled>Elegir Tipo Producto</option>";
                    }
                    if(datos[i].ESTCODIGO=="62"){
                      boxAcabados+="<option value='"+datos[i].FAMPROCODIGO+"'>"+datos[i].FAMPRONOMBRE+"</option>";
                    }
                }
                if($("#encabezadoPrincipal").html()=="LISTADO STOCK" || $("#encabezadoPrincipal").html()=="LISTADO INGRESOS"){
                  boxAcabados+="<option value='todos'>TODOS</option>"
                }
                $("#"+ID).html(boxAcabados);
                $("#"+ID+" option[value="+ codigoproducto +"]").attr("selected",true);
            }
        }
    }); 
}

function mostrarFamiliaPapel(ID,codigopapel){
  var boxAcabados="";
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_MostrarFamiliaPapel.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxAcabados+="<option value='0' selected>Elegir Familia Papel</option>";
            $("#"+ID).html(boxAcabados);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxAcabados+="<option value='0' selected>Elegir Familia Papel</option>";
                $("#"+ID).html(boxAcabados);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAcabados+="<option value='0' selected >Elegir Familia Papel</option>";
                    }
                    if(datos[i].ESTCODIGO=="64"){
                      boxAcabados+="<option value='"+datos[i].FAMPANUMERO+"'>"+datos[i].FAMPACODIGO+" - "+datos[i].FAMPANOMBRE+"</option>";
                    }
                }
                $("#"+ID).html(boxAcabados);
              $("#"+ID+" option[value="+ codigopapel +"]").attr("selected",true);
            }
        }
    });  
}

function mostrarProveedor(ID){
    var boxAcabados="";
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Proveedor/Controlador_MostrarTodosProveedores.php',
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL GUARDAR LOS DATOS! Error no identificado");
            }
            boxAcabados+="<option value='0' selected>Elegir Proveedor</option>";
            $("#"+ID).html(boxAcabados);
        },
        success: function(datos){
            if(datos.response=="0"){
                mostrarMensaje("error",'ERROR: '+datos.message);
            }else{
                for(var i=0;i<datos.length;i++){
                  for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAcabados+="<option value='0' selected  disabled>Elegir Proveedor</option>";
                    }
                      boxAcabados+="<option value='"+datos[i].PROVEEDCODIGO+"'>"+datos[i].PROVEEDRAZON_SOCIAL+"</option>";
                    
                }
                  $("#"+ID).html(boxAcabados);
                  $("#"+ID).select2();
                }
            }
        }
    });
    
}

function mostrarEmpresa(ID){
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
            $("#"+ID).html(boxEmpresa);
        },
        success: function(datos){
            
            if(datos.response=="0"){
                boxEmpresa+="<option value='' selected>Elegir Empresa</option>";
                $("#"+ID).html(boxEmpresa);
            }else{
                for(var i=0; i<datos.length;i++){
                  if(i==0){
                    boxEmpresa+="<option value='' selected disabled>Elegir Empresa</option>";
                  }
                  if(datos[i].EMPCODIGO=="CT"|| datos[i].EMPCODIGO=="ER"|| datos[i].EMPCODIGO=="ED"|| datos[i].EMPCODIGO=="GR"){
                    
                    if($("#tituloRegistro").html()=="REGISTRO DE SALIDA DE PRODUCTO"){
                      
                      switch(datos[i].EMPCODIGO){
                          case('CT'):
                              if($("#stockDisponibleCT").html()>1){
                                boxEmpresa+="<option value='"+datos[i].EMPCODIGO+"'>"+datos[i].EMPDESCRIPCION+"</option>";
                              }
                          break;
                          case('ER'):
                              if($("#stockDisponibleER").html()>1){
                                boxEmpresa+="<option value='"+datos[i].EMPCODIGO+"'>"+datos[i].EMPDESCRIPCION+"</option>";
                              }
                          break;
                          case('ED'):
                              if($("#stockDisponibleED").html()>1){
                                boxEmpresa+="<option value='"+datos[i].EMPCODIGO+"'>"+datos[i].EMPDESCRIPCION+"</option>";
                              }
                          break;
                          case('GR'):
                              if($("#stockDisponibleGR").html()>1){
                                boxEmpresa+="<option value='"+datos[i].EMPCODIGO+"'>"+datos[i].EMPDESCRIPCION+"</option>";
                              }
                          break;
                      }
                                   
                    }else{
                      boxEmpresa+="<option value='"+datos[i].EMPCODIGO+"'>"+datos[i].EMPDESCRIPCION+"</option>";
                    }
                  }
                }
                $("#"+ID).html(boxEmpresa);
              
            }
        }
    });  
}

function mostrarMaquinas(ID){
  var boxMaquina="";
    $.ajax({
        url: '../CT-BackEnd/Controlador/ModMaestros/Controlador_Maquinas/Controlador_MostrarTodosMaquinas.php',
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
          $("#"+ID).html(boxMaquina);
        },
        success: function(datos){ 
          if(datos.response=="0"){
              boxMaquina+="<option value='0' selected>Elegir Maquina</option>";
              $("#"+ID).html(boxMaquina);
          }
          else{
              for(var i=0; i<datos.length;i++){
                  if(i==0){
                      boxMaquina+="<option value='0' selected>Elegir Maquina</option>";
                  }
                  boxMaquina+="<option value='"+datos[i].MAQUICODIGO+"'>"+datos[i].MAQUINOMBRE+"</option>";
              }
              boxMaquina+="<option value='ACABADOS'>ACABADOS</option>\
                          <option value='FILMACION'>FILMACION</option>\
                          <option value='XEROX'>XEROX</option>\
                          <option value='UTILES DE OFICINA'>UTILCES DE OFICIONA</option>\
                          <option value='HERCULES ELITE'>HERCULES ELITE</option>";
              $("#"+ID).html(boxMaquina);
          }mostrarOpciones()
        }
    }); 
}

function mostrarAreas(ID){
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
            $("#"+ID).html(boxAreas);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxAreas+="<option value='' selected>Elegir Area</option>";
                $("#"+ID).html(boxAreas);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAreas+="<option value='' selected>Elegir Area</option>";
                    }
                    boxAreas+="<option value='"+datos[i].AREACODIGO+"'>"+datos[i].AREADESCRIPCION+"</option>";
                }
                $("#"+ID).html(boxAreas);
            }mostrarOpciones()
        }
    });
}

function mostrarVenta(ID){
  var boxAreas="";    
    boxAreas+="<option value='0' selected>Elegir Venta</option>";
    boxAreas+="<option value='VENTAS'>VENTAS</option>";
    
    $("#"+ID).html(boxAreas);
    mostrarOpciones()
}

function mostrarDistribucion(ID){
  var boxAreas="";    
    boxAreas+="<option value='0' selected>Elegir Distribución</option>";
    boxAreas+="<option value='MOTOS'>MOTOS</option>";
    boxAreas+="<option value='FORD'>FORD</option>";
    boxAreas+="<option value='ASTRO'>ASTRO</option>";
    boxAreas+="<option value='CADILAC'>CADILAC</option>";
    boxAreas+="<option value='CHEROQUEE'>CHEROQUEE</option>";
    
    $("#"+ID).html(boxAreas);
    mostrarOpciones()
}

function mostrarPersonal(ID){
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
            boxPersonal+="<option value='' selected>Elegir Personal</option>";
            $("#"+ID).html(boxPersonal);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxPersonal+="<option value='' selected>Elegir Personal</option>";
                $("#"+ID).html(boxPersonal);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxPersonal+="<option value='' selected>Elegir Personal</option>";
                    }
                    boxPersonal+="<option value='"+datos[i].PERSCODIGO+"'>"+datos[i].PERSAPELLIDO_PATERNO+" "+datos[i].PERSAPELLIDO_MATERNO+" "+datos[i].PERSNOMBRE+"</option>";
                }
                $("#"+ID).html(boxPersonal);
                $("#"+ID).select2();
            }
        }
    });  
    
}

function verificarExistenciaOT(){
   var $datos = {
    '_dato': $("#ordenDeTrabajo").val()
  }
   $.ajax({
        url: "../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOrdenXCodigo.php",
        type: 'POST',
        data:$datos,
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
                mostrarMensaje("error","" + datos.message);
            }else{
              if(datos[0].ESTDESCRIPCION=="ABIERTA" || datos[0].ESTDESCRIPCION=="PREFACTURADA"){
                mostrarMensaje("exito", "ORDEN DE PRODUCCION HABILITADA");
                document.getElementById('registrandoSalida').style.display=null;
              }else{
                mostrarMensaje("error","NO SE PUEDE ENTREGAR PEDIDOS, ORDEN " + datos[0].ESTDESCRIPCION);
                document.getElementById('registrandoSalida').style.display='none';
              }
               
            }
        }
     });
}

function mostrarOrdenXOT(codigo){
  
  var titulos="";
  titulos+="<th  class='th-sm font-weight-bold text-center'>CLIENTE</th>\
            <th  class='th-sm font-weight-bold text-center'>ORDEN DE TRABAJO</th>\
            <th  class='th-sm font-weight-bold text-center'>DETALLES</th>\
            <th  class='th-sm font-weight-bold text-center'>FECHA DE REGISTRO</th>\
            <th  class='th-sm font-weight-bold text-center'>FECHA DE ENTREGA</th>\
            <th  class='th-sm font-weight-bold text-center'>VENDEDOR</th>\
            <th  class='th-sm font-weight-bold text-center'>ITEMS</th>\
            <th  class='th-sm font-weight-bold text-center'>ESTADO</th>\
          ";
  $("#tituloColumnas").html(titulos);
  
    var $datos = {
    '_dato': codigo
  }
   $.ajax({
        url: "../CT-BackEnd/Controlador/ModOrden/Controlador_MostrarOrdenXCodigo.php",
        type: 'POST',
        data:$datos,
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
                mostrarMensaje("error","" + datos.message);
            }else{
               mostrarMensaje("exito", "DATOS DE ORDEN CARGADOS CORRECTAMENTE");
                var vendedor = "",tablaOrdenes="";
                for(var i=0; i<datos.length;i++){ 
                    switch(datos[i].OPVENDEDOR){
                      case('49'): vendedor="JOSE RAMOS LEDESMA"; break;
                      case('35'): vendedor="FABIOLA MORALES"; break;
                      case('39'): vendedor="YRMA PAUCAR"; break;
                      case('54'): vendedor="MILAGROS SALINAS"; break;
                      case('28'): vendedor="LIZA GUERRERO"; break;
                      case('74'): vendedor="ALAN LAVANDA";break;
                    }
                    tablaOrdenes+="<tr>\
                                    <td><a>"+datos[i].CLIENNOMBRE_CORTO+"</a></td>\
                                    <td><a>"+datos[i].OPCODIGO+"</a></td>\
                                    <td><a>"+datos[i].OPDETALLE+"</a></td>\
                                    <td><a>"+datos[i].PRESUPFECHA_REGISTRO+"</a></td>\
                                    <td><a>"+datos[i].OPFECHAENTREGA+"</a></td>\
                                    <td><a>"+vendedor+"</a></td>\
                                    <td><a>"+datos[i].PRESUPCANT_ITEM+"</a></td>\
                                    <td><a>"+datos[i].ESTDESCRIPCION+"</a></td>\
                                  </tr>";
                  $("#OPCODIGO").val(datos[i].OPCODIGO)
                }
                $("#tablaDatos").html(tablaOrdenes);
                document.getElementById('datosOrden').style.display=null;
            }
        }
    });
}

function mostrarOrdenProduccion(ID){
  var boxOP=""
   $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_MostrarOrdenProduccionConSalidas.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxOP+="<option value='' selected>Elegir Orden</option>";
            $("#"+ID).html(boxOP);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                mostrarMensaje("error","" + datos.message);
                boxOP+="<option value='' selected>Elegir Orden</option>";
                $("#"+ID).html(boxOP);
            }else{
               for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxOP+="<option value='' selected>Elegir Orden</option>";
                    }
                    boxOP+="<option value='"+datos[i].OPCODIGO+"'>"+datos[i].OPCODIGO+"</option>";
                }
                $("#"+ID).html(boxOP); 
            }
        }
    });
}

function mostrarOpciones(){
  if($("#tipoProducto").val()=="todos"){
    mostrarProductos('producto')
  }else{
    mostrarProductoXFamilia('producto',$("#tipoProducto").val());
  }
  
}

function mostrarProductoXFamilia(ID,codigoFamilia){
 var boxProductos="";
    var $datos={
      '_codigo':codigoFamilia
    }
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_MostrarProductoXFamilia.php",
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
            boxProductos+="<option value='0' selected>Elegir Producto</option>";
            $("#"+ID).html(boxProductos);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxProductos+="<option value='0' selected>No tiene Productos</option>";
                $("#"+ID).html(boxProductos);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxProductos+="<option value='0' selected disabled>Elegir Producto</option>";
                    }
                    boxProductos+="<option value='"+datos[i].PRONUMERO+"'>"+datos[i].PRONOMBRE+"</option>";
                }
                $("#"+ID).html(boxProductos);
                $("#"+ID).select2();            
            }
          if($("#tituloRegistro").html()=="REGISTRO DE SALIDA DE PRODUCTO"){
            document.getElementById("agregandoProducto").style.display='none';   
          }
          
        }
    }); 
}

function mostrarAgregarDetalleProducto(){
  if($("#producto").val()=="0" || $("#producto").val()==null){
    document.getElementById("agregandoProducto").style.display='none';
  }else{
    document.getElementById("agregandoProducto").style.display=null;
  }
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

function sumarStockAccion(codigoProducto,accion){
  var $datos={
    '_codigo':codigoProducto,
    '_accion': accion,
  }
  
  $.ajax({
        url:"../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_SumarAccionProducto.php",
        type: 'POST',
        data:$datos,
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
                mostrarMensaje("error","" + datos.message);
            }else{
              actualizarStock(codigoProducto,accion,datos.CANTIDAD);
              var empresas= new Array();
              empresas=['CT','ER','ED','GR']
              for(var i=0;i<4;i++){                
                sumarIngresosEmpresa(empresas[i],codigoProducto);
              }
            }
        }
    });
}

function sumarIngresosEmpresa(empresa,codigoProducto){
  var $datos={
    '_codigo':codigoProducto,
    '_accion': empresa,
  }
  
  $.ajax({
        url:"../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_SumarAccionProducto.php",
        type: 'POST',
        data:$datos,
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
              sumarSalidasEmpresa(0,empresa,codigoProducto);
          }else{
              sumarSalidasEmpresa(datos.INGRESOS,empresa,codigoProducto);
          }
        }
    });
}

function sumarSalidasEmpresa(ingresos,empresa,codigoProducto){
  var $datos={
    '_codigo':codigoProducto,
    '_accion': "S"+empresa,
  }
  
  $.ajax({
        url:"../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_SumarAccionProducto.php",
        type: 'POST',
        data:$datos,
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
          var salidas1=0,salidas2=0;
  
          if(dato.response=="0"){
               salidas1=0;
          }else{
              salidas1=dato.SALIDAS;
          }
          
          var $dato={
              '_codigo':codigoProducto,
              '_accion': "C"+empresa,
            }
                
            
          $.ajax({
            url:"../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_SumarAccionProducto.php",
            type: 'POST',
            data:$dato,
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
                  salidas2=0;
              }else{
                salidas2=parseInt(datos.SALIDAS);
              }


                if(ingresos=="" || ingresos==null || ingresos.length==0){
                  ingresos=0;
                }
                if(dato.SALIDAS=="" || dato.SALIDAS==null || dato.SALIDAS.length==0){
                  salidas1=0;
                }else{
                  salidas1=parseInt(dato.SALIDAS);
                }
                if(datos.SALIDASOT=="" || datos.SALIDASOT==null || datos.SALIDASOT.length==0){
                  salidas2=0;
                }else{
                  salidas2=parseInt(datos.SALIDASOT);
                }
               var stockempresa= ingresos - (salidas1 + salidas2);
                actualizarStock(codigoProducto,empresa,stockempresa); 
              
            }
          });
          
        }
    }); 
}

function actualizarStock(codigoProducto,accion,cantidad){
  var $datos={
    '_codigo':codigoProducto,
    '_accion': accion,
    '_cantidad': cantidad
  }
  
  $.ajax({
        url:"../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_ActualizarStock.php",
        type: 'POST',
        data:$datos,
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
                mostrarMensaje("error","" + datos.message);
            }else{
              if(accion=="INGRESOS" || accion=="SALIDAS" || accion=="SALIDASOT" ){
                generarStock(codigoProducto);
              }
            }
        }
    });
}

function generarStock(codigoProducto){
  var $datos={
    '_codigo':codigoProducto,
  }
  
  $.ajax({
        url:"../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_GenerarStock.php",
        type: 'POST',
        data:$datos,
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
              mostrarMensaje("error","" + datos.message);
            }else{
              
            }
        }
    });
}

function mostrarProductos(ID){
  var boxAcabados="";
    $.ajax({
        url: "../CT-BackEnd/Controlador/ModCostos/ModAlmacen/Controlador_MostrarProductos.php",
        type: 'GET',
        dataType: 'json',
        error: function(error){
            if(error.status == 401){
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Archivos no encontrados");
            }
            else{
                mostrarMensaje("error","ERROR AL CARGAR LOS DATOS! Error no identificado");
            }
            boxAcabados+="<option value='0' selected>Elegir Producto</option>";
            $("#"+ID).html(boxAcabados);
        },
        success: function(datos){
  
            if(datos.response=="0"){
                boxAcabados+="<option value='0' selected>Elegir Producto</option>";
                $("#"+ID).html(boxAcabados);
            }else{
                for(var i=0; i<datos.length;i++){
                    if(i==0){
                        boxAcabados+="<option value='0' selected  disabled>Elegir Producto</option>";
                    }
                      boxAcabados+="<option value='"+datos[i].PRONUMERO+"'>"+datos[i].PROCODIGO+" - "+datos[i].PRONOMBRE+"</option>";
                    
                }
                $("#"+ID).html(boxAcabados);
                $("#"+ID).select2();
            }
        }
    });  
}

$("#boton-descarga").click(function(){
  imprimirDiv('tableExport');
})  

function imprimirDiv(nombreDiv){
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

function wait(){
  mostrarMensaje("advertencia","MODULO EN PROCESO DE TRABAJO")
}

