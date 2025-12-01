import {dibujarCirculo, generarPausa, generarPausaAleatoria, calculaColor, reproducirSonido, pausarSonido} from './utils.js';



const body = document.body;
const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const disparo = document.getElementById('sonidoDisparo');
const circulo = document.getElementById('circulo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global
window.circulo = circulo; // igual para circulo
window.mostrarCirculo = true;
window.contadorRojos = 0;
window.ejercicioActual = 2;
window.mostrarCirculo = true;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;
window.body = body;

const form = document.getElementById('config-form');

let exposiciones = 10;
let tiempoExposicion = 2000;

// Cuando el usuario pulse "Iniciar"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoExposicion = valorExposicion === "" ? 2000 : Number(valorExposicion);

    form.style.display = "none";
    alternarCirculo();
});

async function alternarCirculo() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';
    body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    let maxRojos = 10;
    let contadorRojos = 0;
    while (contadorRojos < exposiciones) {
        await generarPausaAleatoria();
        reproducirSonido();
        let colorCirculo = calculaColor();
        if (colorCirculo === 'red') {
            window.contadorRojos++;
        }
        dibujarCirculo({color: colorCirculo, left: '51.5%'})
        // Ocultar el círculo
        await generarPausa(tiempoExposicion);
        pausarSonido();
        circulo.style.display = 'none';
    }     
    await generarPausa(10000);
    imagenExplicacion.src = '../image/Fin ejercicios.png';
    imagenExplicacion.style.display = 'block';
    return;   
}

