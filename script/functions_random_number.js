const body = document.body;
const botonInicio = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const audio = document.getElementById('sonidoDisparo');
var cuadrado = document.getElementById("cuadradoCadera");
var numero = document.getElementById("numeroFlotante");
var mostrandoNumero = false;
let contador = 0;
const maxRepeticiones = 30; // Número máximo de veces que se mostrará el número

function actualizarNumero() {
    mostrandoNumero = !mostrandoNumero;

    if (mostrandoNumero) {
        try {
            audio.currentTime = 0;
            audio.play();
        } catch (e) {
        // En algunos navegadores antiguos puede fallar, lo ignoramos
            console.log("Audio error:", e);
        }
        var n = Math.floor(Math.random() * 9) + 1;
        numero.innerText = n; // compatible con IE
        numero.style.display = "block";
        cuadrado.style.display = "none";
    } else {
        numero.style.display = "none";
        cuadrado.style.display = "block";
        audio.pause();
    }
    contador++;

    if (contador >= maxRepeticiones) {
        clearInterval(intervalo); // Detiene el setInterval después de 30 repeticiones
    }
}


botonInicio.addEventListener('click', () => {
    // Lógica para el botón de inicio
    botonInicio.style.display = 'none';
    imagenExplicacion.style.display = 'none';
    body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";
    setInterval(actualizarNumero, 2000);
});

/* actualizarNumero();
// Ejecutar cada 2 segundos
const intervalo = setInterval(actualizarNumero, 2000); */