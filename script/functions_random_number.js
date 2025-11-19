import { generarPausa, pausarSonido, reproducirSonido, dibujarCuadrado } from "./utils.js";

const body = document.body;
const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;
window.disparo = disparo; // necesario si utils.js usa disparo como global

const cuadrado = document.getElementById("cuadrado");
cuadrado.style.borderRadius = "8px";
var numero = document.getElementById("numeroFlotante");

window.body = body;
window.cuadrado = cuadrado;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;

//var mostrandoNumero = false;
let contador = 0;
const maxRepeticiones = 12; // Número máximo de veces que se mostrará el número

console.log(botonMenu, imagenExplicacion, body, cuadrado, numero);

botonMenu.addEventListener('click', alternarNumero);

async function alternarNumero() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';
    body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (contador < maxRepeticiones) {
        await generarPausa(2000);
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
        await generarPausa(2000);
        numero.style.display = "none";
        pausarSonido();
        setTimeout(() => reproducirSonido(), 50);
        dibujarCuadrado({color: 'green'});
    }
    await generarPausa(2000);
    if (contador >= maxRepeticiones) {
        cuadrado.style.display = "none";
        numero.style.display = "none";
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        return; // finalizar ejercicio
    }

}

