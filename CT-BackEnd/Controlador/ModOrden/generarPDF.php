<?php

//
//LLAMADA A LOS ARCHIVOS DE CONEXION A LA BD Y EL MODELO CORRESPONDIENTE AL CONTROLADOR
//
$c= $_GET["c"];

if (is_file('dompdf/autoload.inc.php')){
    
        require_once ('dompdf/autoload.inc.php');
        }
        else {
    
        require_once ('../dompdf/autoload.inc.php');
 
    }

//require_once '../../../dompdf/autoload.inc.php';
use Dompdf\Dompdf;
    
    // instantiate and use the dompdf class
$dompdf = new Dompdf();  

$dompdf->loadHtml($c);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream('_carta.pdf');
    
  

?>