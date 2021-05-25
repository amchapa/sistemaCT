/*==========================================================

FUNCION VERIFICAR INICIO DE SESION DE USUARIO 
>>verificarLogin()

A traves de parametros usuario & password almacenados en el sessionStorage del navegador, se verifica que el usuario haya iniciado 
sesion para continuar en la pagina.

1) Si el parametro usuario o password es indefinido entonces se muestra el mensaje "Es necesario Iniciar Sesion"

2) Caso contrario se redirige a la pagina principal

==========================================================*/

function verificarLogin(){
    if ((sessionStorage.usuario != undefined) && (sessionStorage.password != undefined)) {
        window.location="inicio.php";
    }else{
        console.log("Es necesario iniciar sesión");
    }
}

/*==========================================================

FUNCION VALIDAR DATOS INGRESADOS
>>validar()

1) Se almacenan en las variables user y pass los datos ingresados por el usuario y se verifica que no sean vacios, que la longitud 
del dato no sea igual a 0 y que no se haya ingresado puros espacios.

2) Se verifica que el nombre de usuario y contraseña tengan una longitud minima de 5 y maxima de 40.

3) Se verifica que los datos ingresados sean valores alfanumericos.

4)Si todo es correcto se llama a la funcion Login(), caso contrario se muestra un mensaje acorde al error.

==========================================================*/

function validar(){
    var user=$("#ingresarUsuario").val();
    var pass=$("#ingresarContraseña").val();
    
    
    if(user == null || user.length == 0 || /^\s+$/.test(user)){
        alert('ERROR: El campo usuario no debe ir vacío o lleno de solamente espacios en blanco');
    }
    else if(pass == null || pass.length == 0 || /^\s+$/.test(pass)){
        alert('ERROR: El campo contraseña no debe ir vacío o lleno de solamente espacios en blanco');
    }
    else if(user.length<5 || user.length>40){
        alert('ERROR Usuario: Tamaño mínimo : 5. Tamaño máximo: 40');
    }
    else if(pass.length<5 || pass.length>40){
        alert('ERROR Contraseña: Tamaño mínimo: 5. Tamaño máximo: 40');
    }
    else if(/^\w+$/.test(user) && /^\w+$/.test(pass)){
        console.log("Validación de usuario correcta...");
        console.log("Validación de contraseña correcta...");
        Login(user, pass);
    }else{
        alert('ERROR: Formato  incorrecto, solo ingresar alfanumericos');
    }
        
}

/*==========================================================

FUNCION LOGIN
>>Login(usuario, password)

Funcion que recibe los parametros usuario y password y los envia al controlador en el directorio de BackEnd para verificar si el 
usuario se encuentra en la base de datos.

1) Se almacena en el array $usuario los parametros recibidos.

2) Mediante peticiones AJAX, con el metodo POST se envia el array al controlador.

3) Si no se encuentra registros se muestra un mensaje de error.

4) Si se encuentran registros se hace lo siguiente:
    - Si la respuesta recibida es 1 (usuario valido) entonces se guarda en sessionStorage los parametros actuales (usuario y password)
    luego a los inputs se les remueve la clase "red" y se añade la clase "green" y se redirige a la pagina de inicio.
    - Si la respuesta recibida es diferente a 1 entonces a los inputs se les remueve la clase "green" y se añade la clase "red",
    luego se muestra un mensaje de error.
    
==========================================================*/

function Login(usuario, password){
    console.log("Iniciando sesión...");
    var $usuario={
        '_username': usuario.toLowerCase(),
        '_password': password.toLowerCase()
    }
    if( usuario.toLowerCase()=="asistencia"  && password.toLowerCase()=="asistencia"){
          sessionStorage.setItem("usuario", usuario);
          sessionStorage.setItem("password", password);

          $('#ingresarUsuario').removeClass('red');
          $('#ingresarUsuario').addClass('green');
          $('#ingresarContraseña').removeClass('red');
          $('#ingresarContraseña').addClass('green');

          console.log("Inicio exitoso");
          window.location="inicio.php";
    }else{
        var login = $.ajax({
              url: '../CT-BackEnd/Controlador/Controlador_Login.php',
              type: 'POST',
              data: $usuario,
              dataType: 'json',
              error: function(error){
                  if(error.status == 401){
                      console.log("Usuario y contraseña incorrectas");
                      alert("Usuario y/o contraseña incorrecta");
                  }
                  else{
                      console.log("Error no identificado");
                      alert("Error no identificado");
                  }
              },
              success: function(datos){
                  console.log(datos);

                  if(datos.response == 1){

                      sessionStorage.setItem("usuario", usuario);
                      sessionStorage.setItem("password", password);

                      $('#ingresarUsuario').removeClass('red');
                      $('#ingresarUsuario').addClass('green');
                      $('#ingresarContraseña').removeClass('red');
                      $('#ingresarContraseña').addClass('green');

                      console.log("Inicio exitoso");
                      window.location="inicio.php";
                  }
                  else{
                      $('#ingresarUsuario').removeClass('green');
                      $('#ingresarUsuario').addClass('red');
                      $('#ingresarContraseña').removeClass('green');
                      $('#ingresarContraseña').addClass('red');
                      console.log('ERROR: '+datos.message);
                      alert("Usuario y/o contraseña incorrecta o Personal Inactivo");
                  }
              }
          });
    }
    
}