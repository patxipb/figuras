var cuadrado = document.getElementById("cuadradoCadera");
var numero = document.getElementById("numeroFlotante");
var mostrandoNumero = false;
let contador = 0;
const maxRepeticiones = 30; // Número máximo de veces que se mostrará el número

function actualizarNumero() {
    mostrandoNumero = !mostrandoNumero;

    if (mostrandoNumero) {
    var n = Math.floor(Math.random() * 9) + 1;
    numero.innerText = n; // compatible con IE
    numero.style.display = "block";
    cuadrado.style.display = "none";
    } else {
    numero.style.display = "none";
    cuadrado.style.display = "block";
    }
    contador++;

    if (contador >= maxRepeticiones) {
    clearInterval(intervalo); // Detiene el setInterval después de 30 repeticiones
    }
}

actualizarNumero();
// Ejecutar cada 2 segundos
const intervalo = setInterval(actualizarNumero, 2000);