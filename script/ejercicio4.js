import { dibujarCirculo, generarPausa, reproducirSonido, pausarSonido, calculaColor,calculaAltura, calculaTamanio} from './utils.js';

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
window.ejercicioActual = 4;
window.mostrarCirculo = true;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;
window.body = body;


const maxRojos = 10;

botonMenu.addEventListener('click', ejercicio4);

async function ejercicio4() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    // Fondo
    body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (window.contadorRojos < maxRojos) {
        await generarPausa(4950); // espera 5 segundos antes del siguiente
        reproducirSonido();
        let colorCirculo = calculaColor();
        if (colorCirculo === 'red') window.contadorRojos++;
        dibujarCirculo({ color : colorCirculo, top: calculaAltura(), size: calculaTamanio()});
        await generarPausa(1500); // visible 1,5 segundo
        pausarSonido();
        circulo.style.display = 'none';
    }
    if (window.contadorRojos >= maxRojos) {
    await generarPausa(10000).then(() => {
        window.location.href = 'ejercicio5.html';
    });
    return;
}

}
