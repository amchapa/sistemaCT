<?php
# definimos la carpeta destino
# $carpetaDestino="CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/";
$carpetaDestino="../../../../CT-FrontEnd/Modulos/ModMaestros/VistaPersonal/img/";

# si hay algun archivo que subir
if(isset($_FILES["archivo"]))
{
    # si es un formato de imagen
    if($_FILES["archivo"]["type"]=="image/jpeg" || $_FILES["archivo"]["type"]=="image/pjpeg" || $_FILES["archivo"]["type"]=="image/gif" || $_FILES["archivo"]["type"]=="image/png")
    {
        # si exsite la carpeta o se ha creado
        if(file_exists($carpetaDestino) || @mkdir($carpetaDestino))
        {
            $origen=$_FILES["archivo"]["tmp_name"];
            $destino=$carpetaDestino.$_FILES["archivo"]["name"];

            # movemos el archivo
            if(@move_uploaded_file($origen, $destino))
            {
                echo "<br>".$_FILES["archivo"]["name"]." movido correctamente";
            }else{
                echo "<br>No se ha podido mover el archivo: ".$_FILES["archivo"]["name"];
            }
        }else{
            echo "<br>No se ha podido crear la carpeta: ".$carpetaDestino;
        }
    }else{
        echo "<br>".$_FILES["archivo"]["name"]." - NO es imagen jpg, png o gif";
    }
}else{
    echo "No se ha subido ninguna imagen";
}
?>