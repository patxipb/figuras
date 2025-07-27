var cuadrado = document.getElementById("cuadradoCadera");
var numero = document.getElementById("numeroFlotante");
var mostrandoNumero = false;

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
}

actualizarNumero();
setInterval(actualizarNumero, 2000);