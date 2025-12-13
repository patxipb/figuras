import { generarPausa, pausarSonido, reproducirSonido, dibujarCuadrado } from "./utils.js";

const body = document.body;
const botonMenu = document.getElementById('menu-boton');
const explicacion = document.getElementById('explicacion');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;
window.disparo = disparo; // necesario si utils.js usa disparo como global

const cuadrado = document.getElementById("cuadrado");
cuadrado.style.borderRadius = "8px";
var numero = document.getElementById("numeroFlotante");

window.body = body;
window.cuadrado = cuadrado;
window.botonMenu = botonMenu;

//var mostrandoNumero = false;
let contador = 0;
const maxRepeticiones = 12; // Número máximo de veces que se mostrará el número

const form = document.getElementById('config-form');

let exposiciones = 10;
let tiempoEspera = 400;      // valores por defecto
let tiempoExposicion = 500;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoEspera = valorEspera === "" ? 400 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 500 : Number(valorExposicion);

    form.style.display = "none";
    alternarNumero();
});


async function alternarNumero() {
    botonMenu.style.display = 'none';
    explicacion.style.display = 'none';
    body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (contador < exposiciones) {
        await generarPausa(tiempoEspera);
        cuadrado.style.display = "none";
        reproducirSonido();
        var numeroAleatorio = Math.floor(Math.random() * 9) + 1;
        numero.innerText = numeroAleatorio;
        numero.style.left = '52%'; // Centrar horizontalmente
        numero.style.top = '50%'; // Centrar verticalmente
        numero.style.display = "block";
        if (numeroAleatorio != 3) {
            contador++;
        }
        await generarPausa(tiempoExposicion);
        numero.style.display = "none";
        pausarSonido();
        //setTimeout(() => reproducirSonido(), 50);
        dibujarCuadrado({color: 'green'});
    }

    await generarPausa(5000);
    if (contador >= maxRepeticiones) {
        cuadrado.style.display = "none";
        numero.style.display = "none";
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        return; // finalizar ejercicio
    }

}

