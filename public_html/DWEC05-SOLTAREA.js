/* Primera instrucción a ejecutar cuando la web este cargada. Hacemos una llamada
 * a la función inicializar,para asegurarnos que todos los objetos están disponibles
 * y no habrá problemas de asignación*/
window.onload = inicializar;

var intentos;// Variable global para llevar el conteo de los intentos

//Función para inicializar los valores y eventos de la página web
function inicializar() {
    /* Inicializamos la variable intentos con el valor almacenado en la cookie, 
     si no hay valor previo le asgnamos el valor 0*/
    if (getCookie("intentos") === "") {
        intentos = 0;
    } else {
        intentos = getCookie("intentos");
    }
    // Establecemos el texto del contenedor con id intentos
    document.getElementById("intentos").innerHTML = "Ha intentado enviar el formulario en " + intentos + " ocasiones.";
    // Asignamos los eventos a los controles. 
    // Los eventos al usar addEventListener no lleva "on" al comienzo.
    //Al cambiar el foco del campo nombre se llama a la función pasarAMayusculas por burbujeo
    document.getElementById("nombre").addEventListener("blur", pasarAMayusculas, false);
    document.getElementById("apellidos").addEventListener("blur", pasarAMayusculas, false);
    document.getElementById("nif").addEventListener("blur", pasarAMayusculas, false);
    document.getElementById("formulario").addEventListener("submit", validarDatos, false);
    document.getElementById("button").addEventListener("click", limpiarFormulario, false);
}

// Función que pasará a mayúsculas los valores introducidos en los campos de texto
function pasarAMayusculas() {
    this.value = this.value.toUpperCase();
}

//Función para limpiar los datos introducidos en el formulario
function limpiarFormulario() {
    this.form.reset(); //El método "reset" del objeto form limpia los datos del formulario
}


/*Función para validar la edad del usuario. 
 El parámetro de entrada es la edad introducida por el usuario en el formulario.*/
function validarEdad(edad) {
    /*La expresión la dividimos en tres bloques, cada uno de ellos excluyentes entre si y
     * divididos por el simbolo "|":
     * [0-9] --> Nos permite entrar un sólo dígito que irá de 0 a 9.
     * [1-9][0-9] --> Nos permite entrar dos dígitos. El primero entre 1-9 y el segundo entre 0-9.
     * [1][0][0-5] --> Nos permite entrar tres dígitos. El primero será un 1 obligatorio, 
     * el segundo un 0 obligatorio y el tercero puede estar entre 0 y 5.   */
    expresion = /^([0-9]|[1-9][0-9]|[1][0][0-5])$/;
    return expresion.exec(edad); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}

// Función para validar la entrada de una cadena de texto.
function validarCadena(texto) {
    /* La validación consiste en que solo puedan introducirse letras, en mayúscula o minúscula, 
     * con y sin acentos y espacios en blanco */
    expresion = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]+$/;
    return expresion.exec(texto); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}

/*Función para para la validar la entrada de una fecha mediante un expresión regular.
 * El parámetro de entrada es una fecha(Cadena de String). */
function validarFecha(stringFecha) {
    //Modificamos el - introducido por el usuario por "/" de forma que simplicamos la expresión regular
    stringFecha = stringFecha.replace("-", "/");

    /* La expresión regular la dividimos [\/] en tres partes:
     * (0?[1-9])|(1\d)|(2\d)|(3[0-1]) --> Para validar el día. Puede ser un 0(optativo) seguido de un dígito,
     * o un 1 o un 2 seguido de un dígito(\d es lo mismo que [0-9]) o un 3 seguido de 0-1.
     * (0?[1-9])|(1[0-2]) --> Para validar el mes. Puede ser un 0(optativo) seguido de un dígito o un 1 seguido de (0 o 1 o 2)
     * ([1-2]\d{3}) --> Para validar el año. Un 1 o un 2 seguido de tres cifras numéricas.
     */
    expresion = (/^((0?[1-9])|(1\d)|(2\d)|(3[0-1]))[\/]((0?[1-9])|(1[0-2]))[\/]([1-2]\d{3})$/);
    return expresion.exec(stringFecha); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}

//Función que nos permite validar un dni que recibe como parámetro, mediante una expresión regular
function validarNIF(dni) {
    //(\d{8}) --> 8 caractéres numericos.
    //([-]?) --> Guión optativo.
    //([A-Za-z]{1}) --> Una letra mayúsucla o minuscula    
    expresion = /^(\d{8})([-]?)([A-Za-z]{1})$/;
    return expresion.exec(dni); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}

//Función para validar un email, recibe como parámetro un String que debe cumplir unos requisitos
function validarEmail(email) {
    // ^([a-zA-Z0-9_\-\.]+) --> Permite introducir letras, números, "­"," _", y ".": 
    // @ --> Obliga la inclusión de la @
    // [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)| --> Permite especificar direcciones IP como dominio.
    // (([a-zA-Z0-9\-]+\.)+)) --> nombre de dominio seguido de un punto.
    // ([a-zA-Z]{2,4}|[0-9]{1,3}) --> permite especificar un nombre de subdominio de un entre 3 y 7 caracteres.
    expresion = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expresion.exec(email); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}

//Con esta función comprobamos si ha sido seleccionada una provincia.
function validarProvincia() {
    /* Comprobamos si el value de la provincia es 0 (valor por defecto), en cuyo 
     caso no se ha seleccionado ninguna provincia por lo que el resultado será de falso
     en caso contrario devolvemos true*/
    if (document.getElementById("provincia").value === "0") {
        return false;
    } else {
        return true;
    }
}

// Función que nos permite validar un número de teléfono que recibe como parámetro
function validarTelefono(telefono) {
    // ^[9|6|8]{1} --> nos permite definir el primer dígito del número de teléfono, que será (6,8 o 9).
    //(\d{8}) --> Nos permite introducir 8 dígitos que pueden ser los que sean. 
    expresion = /^[9|6|8]{1}(\d{8})$/;
    return expresion.exec(telefono); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}

/* Con esta función validaremos la hora con formato de 12 y 24 horas. 
 * El parámetro de entrada será la cadena a validar */
function validarHora(hora) {
    /* Explicación de la expresión regular:
     ^([0-1][0-9] --> nos permite validar horas que vayan de 00 a 19: 
     |2[0-3]) --> nos permite validar horas que vayan de 20 a 23: 
     : --> Seperador entre las horas y minutos
     [0-5][0-9]$ --> nos permite especificar los minutos de 00 a 59: */
    expresion = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return expresion.exec(hora); // Devuelve la primera cadena que cumple con la expresión regular o "null" sino hay coincidencias
}


/* Función para crear una cookie con los valores especificados.
 * Los parámetros de entrada son: Nombre de la propiedad, valor de la propiedad y 
 * expira que sería el numero de dias de vida de la cookie */
//http://www.w3schools.com/js/js_cookies.asp
function setCookie(nombre, valor, expira) {
    var fecha = new Date();// Creamos un objeto fecha

    /*Fecha tendrá el valor de la fecha actual a la que le sumamos el número 
     de dias expecificado en expira. 
     Con (expira por 1000 milisegundos * 60 segundos * 60 minutos * 24 horas)
     Realizamos la conversión a milisegundos de los días introducidos*/
   fecha.setTime(fecha.getTime() + (expira * 24 * 60 * 60 * 1000));

    // Verificamos si se ha introducido una valor de expiración. No es obligatoria su introducción
    if (expira !== "") {
        var expires = fecha.toUTCString();  // Variable para recoger la cadena en formato UTC
        // Asignamos los valores al objeto cookie y le asignamos la fecha de expiración 
    document.cookie = nombre + "=" + valor + "; " + expires;
    } else {
        // Almacenamos la cookie sin fecha de expiración
        document.cookie = nombre + "=" + valor;
    }
}

/*Función para recuperar el valor de una propiedad de una cookie
 El paramétro de entrada es el nombre de la propiedad a leer. Este nombre es el definido en el 
 paramámetro "nombre" de SetCookie. Como salida tenemos bien el valor devuelto o bien una cadena vacia*/
function getCookie(nombre) {
    var cadena = nombre + "="; //La variable cadena nos mostrará el nombre de la propiedad  

    /*La variable datos recupera los datos de la cookie dividiendolos por el ;
     y los va almaenando en un array */
    var datos = document.cookie.split(";");

    // Iteramos por todos los valores del array
  for (var i = 0; i < datos.length; i++) {
        // Pasamos el contenido de cada posición del array a una variable (uno a uno)
        var c = datos[i];
        // Iteramos por el contenido hasta encontrar un caracter
        while (c.charAt(0) === " ") {
            // Quitamos el espacio en blanco al principio de la cadena
            c = trim(c);
           // c = c.substring(1);
        }
        // Si la cadena corresponde con el nombre de la propiedad introducida por parámetro
        if (c.indexOf(cadena) === 0) {
            /*Devolvemos el valor contenido entre el final del nombre con el 
             simbolo = concatenado y el final del contenido de la misma*/
            return c.substring(cadena.length, c.length);
        }
    }
    //Sino hay coincidencias con las propiedades del array devolvemos una cadena vacia
    return "";
}

/*Función que nos permite validar los datos de un formulario antes de enviarlo.
 El parametro de entrada es el evento sobre el que se lanza la función. Es decir se lanzará
 cada vez que pulsemos sobre enviar("submit")*/
function validarDatos(evt) {
    resulValidacion = true; //Variable para controlar todo el flujo de errores
    mensaje = ""; // Variable para almacenar el mensaje que enviamos al usuario

//Para reducir el código que escribimos podemos usar la siguiente variable.
//La uso sólo en este primer "if", considero que el código queda más claro con la sentencia completa
    var campoHora = document.getElementById("hora");

    /* Validamos la hora introducida por el usuario. Para ellos hacemos una llamada a la función
     validarHora a la que le pasamos como parámetro el valor del formulario, en caso de que no haya un valor
     en el formulario o que la validación mediante las expresiones regulares no sea correcta se producira un error*/
    if (!validarHora(campoHora.value)) {
        /*Si la hora no es válida o recibimos "null" cambiamos la clase del control a "error", 
         * le pasamos el foco, concatenamos un mensaje de error a la cadena de 
         * mensaje y por último cambiamos el valor a la variable de control resulValidacion*/
        campoHora.className = "error";//Al cambiar el nombre de la clase, coge de CSS otro valor y pinta el recuadro en el formulario de rojo
        campoHora.focus();
        mensaje = "Hora: Debe introducir una hora válida" + "<br />";
        resulValidacion = false;
    } else {
        // Si la validación es correcta, quitamos la clase error que hubiese anteriormente
        campoHora.className = "";
    }

    // Validamos el telefono introducido por el usuario
    if (!validarTelefono(document.getElementById("telefono").value)) {
        document.getElementById("telefono").className = "error";
        document.getElementById("telefono").focus();
        mensaje = "Telefono: Debe introducir un teléfono válido" + "<br />" + mensaje;
        resulValidacion = false;
    } else {
        document.getElementById("telefono").className = "";
    }

    // Validamos la fecha introducida por el usuario
    if (!validarFecha(document.getElementById("fecha").value)) {
        document.getElementById("fecha").className = "error";
        document.getElementById("fecha").focus();
        mensaje = "Fecha: Debe introducir una fecha válida" + "<br />" + mensaje;
        resulValidacion = false;
    } else {
        document.getElementById("fecha").className = "";
    }

    // Validamos la provincia introducida por el usuario
    if (!validarProvincia()) {
        document.getElementById("provincia").className = "error";
        document.getElementById("provincia").focus();
        mensaje = "Provincia: Debe seleccionar una provincia" + "<br />" + mensaje;
        resulValidacion = false;
    } else {
        // Si la validaciÃ³n es correcta, quitamos la clase error que hubiese anteriormente
        document.getElementById("provincia").className = "";
    }

    /*Validamos el email introducido por el usuario.
     Si el email no es correcto, cambiamos el valor de la variable de control, 
     cambiamos la clase del control y le pasamos el foco. 
     Para finalizar concatenamos un mensaje de error a la cadena de mensaje*/
    if (!validarEmail(document.getElementById("email").value)) {
        resulValidacion = false;
        document.getElementById("email").className = "error";
        document.getElementById("email").focus();
        mensaje = "Email: Debe introducir un email válido" + "<br />" + mensaje;
    } else {
        document.getElementById("email").className = "";
    }

    // Validamos el NIF introducida por el usuario
    if (!validarNIF(document.getElementById("nif").value)) {
        resulValidacion = false;
        document.getElementById("nif").className = "error";
        document.getElementById("nif").focus();
        mensaje = "NIF: Debe introducir un nif válido" + "<br />" + mensaje;
    } else {
        document.getElementById("nif").className = "";
    }

    // Validamos la edad introducida por el usuario
    if (!validarEdad(document.getElementById("edad").value)) {
        document.getElementById("edad").className = "error";
        document.getElementById("edad").focus();
        mensaje = "Edad: Debe introducir un número entre 0 y 105" + "<br />" + mensaje;
        resulValidacion = false;
    } else {
        document.getElementById("edad").className = "";
    }

    // Validamos el apellido introducida por el usuario
    if (!validarCadena(document.getElementById("apellidos").value)) {
        document.getElementById("apellidos").className = "error";
        document.getElementById("apellidos").focus();
        mensaje = "Apellidos: Debe introducir solamente letras, letras acentuadas y espacios en blanco" + "<br />" + mensaje;
        resulValidacion = false;
    } else {
        document.getElementById("apellidos").className = "";
    }

    // Validamos el nombre introducida por el usuario
    if (!validarCadena(document.getElementById("nombre").value)) {
        resulValidacion = false;
        document.getElementById("nombre").className = "error";
        document.getElementById("nombre").focus();
        mensaje = "Nombre: Debe introducir solamente letras, letras acentuadas y espacios en blanco" + "<br />" + mensaje;
    } else {
        document.getElementById("nombre").className = "";
    }

    intentos++; //Cada vez que se pulsa en enviar, la variable intentos suma 1

    // Modificamos el valor del texto que muestra los intentos. innerHTML nos sirve para escribir dentro del div=intentos
    document.getElementById("intentos").innerHTML = "Es el intento: " + intentos + " para enviar el formulario";

    //Cuando la validación de todos los datos sean correctos y el usuario pulse en la ventana 
    // de confirm "enviar"(es decir valga true):
    if (resulValidacion && confirm("Los datos son correctos ¿Desea enviar el formulario?")) {
        // Almacenamos en la cookie el valor de los intentos antes de enviar el formulario
        setCookie("intentos", intentos, 1);

        // Limpiamos los errores del contenedor con Id errores
        document.getElementById("errores").innerHTML = "";

        // Devolvemos true puesto que la validación ha sido exitosa
        return true;
    } else {
        // Mostramos el mensaje generado en el contenedor con Id errores (pueden ser varios), ya que a lo largo de la 
        //función los vamos contatenando
        document.getElementById("errores").innerHTML = mensaje;

        /*Mediante el método preventDefault cancelamos el evento por defecto que dispara la función,
         * en este caso el evento onsubmit */
        evt.preventDefault();

        // Y devolvemos false porque la validación a fallado
        return false;
    }
}