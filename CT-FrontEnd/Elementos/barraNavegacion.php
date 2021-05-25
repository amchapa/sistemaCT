    <!--=================================
            BARRA DE NAVEGACION
    ==================================-->
      
    <!--XXXXXXXXXXXXXX BARRA SUPERIOR XXXXXXXXXXXXXXXXXXXXX-->
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark principal fixed-top scrolling-navbar">
    
    <!--BOTON DESPLEGAR-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#barraIzq"
    aria-controls="barraIzq" aria-expanded="true" aria-label="Toggle navigation">

        <span class="navbar-toggler-icon"></span>

    </button>

    <!--TITULO-->
    <a class="navbar-brand text-white font-weight-bold mr-0 d-none d-md-block" onclick="ventanaPrincipal();return false">
        <img src="Inicio/CT-Brand.png" height="30" class="d-inline-block align-top mr-2"
      alt="mdb logo">Grupo CompuTextos S.A.C.
    </a>

    <!--CONTENIDO DEL MENU-->
    <ul class="nav white-text ml-auto">

      <!--ELEMENTO DEL MENU 1 --> 
      <li class="nav-item active">
        <a class="nav-link" onclick="ventanaPrincipal();return false">
          <i class="fas fa-home"></i>Inicio
          <span class="sr-only">(current)</span>
        </a>
      </li>

      <!--ELEMENTO DEL MENU 2 -->
      <li class="nav-item">
        <a class="nav-link" onclick="window.print();return false">
          <i class="fas fa-print"></i>Imprimir</a>
      </li>
      
      <!--ELEMENTO DEL MENU 3 
      <li class="nav-item">
        <a class="nav-link">
          <i class="fas fa-poll"></i>Reporte</a>
      </li>-->

      <!--ELEMENTO DEL MENU 4 -->
      <li class="nav-item">
        <a class="nav-link" onclick="limpiarSesion();return false">
          <i class="fas fa-times-circle"></i>Salir</a>
      </li>

    </ul>

    </nav>
    <!--XXXXXXXXXXXX FIN BARRA SUPERIOR XXXXXXXXXXXXXXXXXXX-->
    
    <!--XXXXXXXXXXXXXX BARRA LATERAL IZQUIERDA XXXXXXXXXXXXXXXXXXXXX-->
    <div id="barraIzq" class="collapse navbar-collapse show col-7 col-sm-4 col-md-3 col-xl-2 principal lighten-1 px-0">
        <div class="list-group" id="list-tab" role="tablist">
         
          <!--===========================
              MODULO MAESTROS
          ============================-->
          <a id="MAESTROS" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-users white-text mr-2"></i>Maestros</a>
            
            <!--======= CLIENTES  =======-->
            <a id="ACCCLIENTE" onclick="ventanaClientes();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Clientes</a>
            
            <!--======= SERVICIOS =======-->
            <a id="ACCSERVICIO" onclick="ventanaServicios();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Servicios</a>
            
            <!--======= EMPRESAS  =======-->
            <a id="ACCEMPRESA" onclick="ventanaEmpresas();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Empresas</a>
            
            <!--======= MAQUINAS  =======-->
            <a id="ACCMAQUINA" onclick="ventanaMaquinas();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Maquinas</a>
            
            <!--======= BANCOS    =======-->
            <a id="ACCBANCO" onclick="ventanaBancos();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Bancos</a>
            
            <!--======= PROVEEDOR  =======-->
            <a id="ACCPROVEEDOR" onclick="ventanaProveedor();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Proveedores</a>
            
            <!--======= PERSONAL  =======-->
            <a id="ACCPERSONAL" onclick="ventanaPersonal();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Personal</a>
            
            <!--======= USUARIO  =======-->
            <a id="ACCUSUARIO" onclick="ventanaUsuario();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Usuario</a>
            
          <!--===========================
              MODULO PRESUPUESTOS
          ============================-->
          <a id="PRESUPUESTO" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-chart-line white-text mr-2"></i>Presupuesto</a>
            
            <!--======= NUEVO PRESUPUESTO  =======-->
            <a id="ACCNUEVO_PRESUPUESTO" onclick="ventanaNuevoPresupuesto();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Nuevo Presupuesto</a>
            
            <!--======= ACTUALIZAR PRESUPUESTO =======-->
            <a id ="ACCACTUALIZAR_PRESUPUESTO" onclick="ventanaActualizarPresupuesto();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Actualizar Presupuesto</a>
            
            <!--======= CAMBIAR ESTADO PRESUPUESTO  =======-->
            <a id="ACCCAMBIAR_ESTADO_PRESUPUESTO" onclick="ventanaCambiarEstadoPresupuesto();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Cambiar estado Presupuesto</a>
            
            <!--======= BUSCAR PRESUPUESTO  =======-->
            <a id="ACCBUSCAR_PRESUPUESTO" onclick="ventanaBuscarPresupuesto();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Buscar Presupuesto</a>
            
            <!--======= BUSCAR PRESUPUESTO  =======-->
            <a id="ACCLISTAR_PRESUPUESTO" onclick="ventanaListarPresupuesto();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Listar Presupuestos</a>
            
            <!--======= FORMULA 1810 MAQUINAS    =======-->
            <a id="ACCF1810" onclick="ventanaF1810();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">F1810</a>
           
          <!--===========================
              MODULO ORDENES
          ============================--> 
          <a id="ORDENES" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-clipboard-list white-text mr-2"></i>Ordenes</a>
            
            <!--======= CREAR ORDEN  =======-->
            <a id="ACCCREAR_ORDEN" onclick="buscarNuevaOrden();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Crear Orden</a>
            
            <!--======= ACTUALIZAR  ORDEN =======-->

            <a id ="ACCACTUALIZAR_ORDEN" onclick="ventanaActualizarOrden();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Actualizar Orden</a>
            
            <!--======= CAMBIAR ESTADO ORDEN  =======-->
            <a id ="ACCCAMBIAR_ESTADO_ORDEN" onclick="ventanaCambiarEstadoOrden();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Cambiar Estado Orden</a>
            
            <!--======= CAMBIAR ESTADO ORDEN  =======-->
            <a id ="ACCBUSCAR_ORDEN" onclick="ventanaBuscarOrden();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Buscar Orden</a>
            
            <!--======= REEEMPLAZAR ORDEN  =======-->
            <a id ="ACCREEMPLAZAR_ORDEN" onclick="ventanaReemplazarOrden();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Reemplazar Orden</a>
            
            <!--======= SEGUIMIENTO ORDEN    =======-->
            <a id ="ACCSEGUIMIENTO_ORDEN" onclick="ventanaSeguimientoOrden();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Seguimiento Orden</a>
            
            <!--======= LISTAR ORDENES  =======-->
            <a id ="ACCLISTAR_ORDENES" onclick="ventanaListarOrdenes();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Listar Ordenes</a>
            
          <!--===========================
              MODULO PRODUCCION
          ============================--> 
          <a id="PRODUCCION" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-hammer white-text mr-2"></i>Producción</a>
            
            <!--======= SEGUIMIENTO PRODUCCION  =======-->
            <a id ="ACCSEGUIMIENTO_PRODUCCION" onclick="ventanaSeguimientoProduccion();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Seguimiento Producción</a>
            
            <!--======= PROGRAMAR MAQUINAS =======-->
            <a id ="ACCPROGRAMAR_MAQUINAS" onclick="ventanaProgramarMaquinas();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Programar Máquinas</a>
            
            <!--======= CONTROL DESPACHOS  =======-->
            <a id ="ACCCONTROL_DESPACHOS" onclick="ventanaControlDespachos();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Control Despachos</a>
           
          <!--===========================
              MODULO COSTOS
          ============================--> 
          <a id="COSTOS" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="far fa-lg fa-money-bill-alt white-text mr-2"></i>Costos</a>
            
            <!--======= CONTROL INSUMOS  =======-->
            <a id ="ACCCONTROL_INSUMOS" onclick="ventanaControlInsumos();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Control Insumos</a>
            
            <!--======= COSTOS MAQUINA =======-->
            <a id ="ACCCOSTOS_MAQUINA" onclick="ventanaCostosMaquina();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Máquina</a>
            
            <!--======= COSTOS ACABADOS  =======-->
            <a id ="ACCCOSTOS_ACABADOS" onclick="ventanaCostosAcabados();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Acabados</a>
            
            <!--======= COSTOS TINTA  =======-->
            <a id ="ACCCOSTOS_TINTA" onclick="ventanaCostosTinta();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Tinta</a>
            
            <!--======= LISTADO COSTOS    =======-->
            <a id ="ACCLISTADO_COSTOS" onclick="ventanaListadoCostos();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Listado Costos</a>
            
            <!--======= LISTADO COSTOS    =======-->
            <a id ="ACCCOSTOS_TRABAJO" onclick="ventanaCostosTrabajo();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Costos Trabajo</a>
            
            <!--======= LISTADO COSTOS    =======-->
            <a id ="ACCALMACEN" onclick="ventanaAlmacen();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Almacén</a>
           
          <!--===========================
              MODULO CONTABILIDAD
          ============================--> 
          <a id="CONTABILIDAD" class="list-group-item list-group-item-action black white-text font-weight-bold" data-toggle="list" role="tab" style="cursor: default;"><i class="fas fa-lg fa-shopping-bag  white-text mr-2"></i>Contabilidad</a>
            
            <!--======= FACTURACION  =======-->
            <a id ="ACCFACTURACION" onclick="ventanaFacturacion();return false"   class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Facturacion</a>
            
            <!--======= ARQUEO DE CAJA  =======-->
            <a id ="ACCARQUEO" onclick="ventanaArqueoDeCaja();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Arqueo de Caja</a>
            
            <!--======= NOTA DE DEBITO/CREDITO =======-->
            <a id ="ACCNOTA" onclick="ventanaNotadeDebito();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Nota de Debito/Credito</a>
            
            <!--======= LETRAS  =======-->
            <a id ="ACCLETRA" onclick="ventanaLetras();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Letras</a>
            
            <!--======= GUIA DE REMISION  =======-->
            <a id ="ACCGUIA" onclick="ventanaGuiaDeRemision();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Guía de Remisión</a>
            
            <!--======= RECIBOS ADICIONALES    =======-->
            <a id ="ACCRECIBO" onclick="ventanaRecibosAdicionales();return false"  class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Recibos adicionales</a>
            
            <!--======= FINANZAS  =======-->
            <a id ="ACCFINANZAS" onclick="ventanaFinanzas();return false" class="py-0 list-group-item list-group-item-action principal white-text font-weight-bold" data-toggle="list" role="tab">Finanzas</a>
            
        </div>
    </div>
    <!--XXXXXXXXXXXX FIN BARRA LATERAL IZQUIERDA XXXXXXXXXXXXXXXXXXX-->