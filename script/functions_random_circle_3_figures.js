import { dibujarCirculo, generarPausa, reproducirSonido, pausarSonido, calculaColor, colorDistinto, calculaIzquierda, calculaIzquierdaLibre } from "./utils.js";

const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const body = document.body;
const circulo = document.getElementById('circulo');
const circulo2 = document.getElementById('circulo2');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global
window.circulo = circulo; // igual para circulo
window.circulo2 = circulo2;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;
window.body = body;

var contadorRojos = 0;
const maxRojos = 10;

botonMenu.addEventListener('click', alternarCirculo);

async function alternarCirculo() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    // Fondo
    body.style.background = "url('../image/3_siluetas_blancas.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (contadorRojos < maxRojos) {
        await generarPausa(2000);
        reproducirSonido();
        let colorCirculo = calculaColor();
        let izquierda = calculaIzquierda();
        if (colorCirculo === 'red') contadorRojos++;
        dibujarCirculo({ color: colorCirculo, top: '50%', left: izquierda, size: 10 });
        
        // Segundo círculo aleatorio con color distinto
        if (contadorRojos >= 4 && Math.random() < 0.5) {
            let colorCirculo2 = colorDistinto(colorCirculo);
            if (colorCirculo2 === 'red') contadorRojos++;
            dibujarCirculo({ circulo: circulo2, color: colorCirculo2, top: '50%', left: calculaIzquierdaLibre(izquierda), size: 10 });

        }

        await generarPausa(1500);
        pausarSonido();
        circulo.style.display = 'none';
        circulo2.style.display = 'none';
    }

    if (contadorRojos >= maxRojos) {
        await generarPausa(5000);
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        body.style.display = 'block';
        return; // finalizar ejercicio
    }

}




/* 
const posicionesLeft = ['25.5%', '51.5%', '80.5%']; // Izquierda, Centro, Derecha
let posicionAleatoria = null;

function alternarCirculo() {
    if (mostrarCirculo) {
        // Elegir color aleatorio
        const color = Math.random() < 0.5 ? 'red' : 'green';
        circulo.style.backgroundColor = color;
        circulo.style.left = '52%';
        circulo.style.top = '50%';
        circulo.style.width = '10vh';
        circulo.style.height = '10vh';

        // Elegir posición aleatoria
        posicionAleatoria = posicionesLeft[Math.floor(Math.random() * posicionesLeft.length)];
        circulo.style.left = posicionAleatoria;

        // Mostrar el círculo y reproducir sonido
        try {
            audio.currentTime = 0;
            audio.play();
        } catch (e) {
        // En algunos navegadores antiguos puede fallar, lo ignoramos
            console.log("Audio error:", e);
        }
        circulo.style.display = 'block';

    } else {
        // Ocultar círculo
        circulo.style.display = 'none';
        audio.pause();
    }

    mostrarCirculo = !mostrarCirculo;
}

botonInicio.addEventListener('click', () => {
    // Lógica para el botón de inicio
    botonInicio.style.display = 'none';
    imagenExplicacion.style.display = 'none';
    body.style.background = "url('../image/3_siluetas_blancas.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";
    setInterval(alternarCirculo, 1200);
});
 */
