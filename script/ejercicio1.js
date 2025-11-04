import { dibujarCirculo, generarPausa, reproducirSonido, pausarSonido} from './utils.js';

const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const body = document.body;
const circulo = document.getElementById('circulo');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global
window.circulo = circulo; // igual para circulo
window.mostrarCirculo = true;
window.contadorRojos = 0;
window.ejercicioActual = 1;
window.mostrarCirculo = true;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;
window.body = body;


const maxRojos = 10;

botonMenu.addEventListener('click', ejercicio1);

async function ejercicio1() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    // Fondo
    body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (window.contadorRojos < maxRojos) {
        await generarPausa(1500); // espera 1,5 segundo antes del siguiente
        reproducirSonido();
        dibujarCirculo({ color: 'red' });
        window.contadorRojos++;
        await generarPausa(1500); // visible 1,5 segundo
        pausarSonido();
        circulo.style.display = 'none';
    }
    if (window.contadorRojos >= maxRojos) {
    await generarPausa(10000).then(() => {
        window.location.href = 'ejercicio2.html';
    });
    return;
    }

}
