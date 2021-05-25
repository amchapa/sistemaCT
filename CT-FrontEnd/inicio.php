
<!DOCTYPE html>
<html lang="en">
<head>

    <!--TITULO DE LA VISTA -->
    <title>Sistema CT - Grupo Computextos S.A.C.</title>

    <!--***************************************
         INCLUIR CONTENIDO GENERAL DEL HEAD 
     ***************************************-->
     <?php include_once "Elementos/head.php";?>

    <!--MIS ESTILOS-->
    <link rel="stylesheet" href="Inicio/inicio.css">
</head>

<body onload="deshabilitaRetroceso()">

    <!--***************************************
         CONTENIDO GENERAL DE LA PAGINA
    ***************************************-->
    
    <?php include_once "Elementos/barraNavegacion.php";?>
     
    <div id="contenido" class="col-12 col-lg-9 col-xl-10">
    <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active" id="cuerpo" role="tabpanel">
    
    ...

    </div>
    
    <div class="tab-pane fade show active d-none" id="cuerpo2" role="tabpanel">

      <h1 class="text-center font-weight-bold my-4">REGISTRAR ASISTENCIA</h1>
        
      <input type="text" style="margin-left: 40%" id="scanner" min="1" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="8">
      <div id="respuestadelPersonal" class="container font-weight-bold h3-responsive black-text text-center my-5"></div>

      <!-- MENSAJE -->
      <div id="toastasistencia"></div>
    </div>
    
    </div>
    </div>

    <?php include_once "Elementos/scripts.php";?>
    <!--MIS ARCHIVOS JS-->
    <script src="Bootstrap/js/moment.min.js"></script>
    <script async type="text/javascript" src="Inicio/inicio.js"></script>

</body>
</html>