const body = document.body;
const botonInicio = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const audio = document.getElementById('sonidoDisparo');
const circulo = document.getElementById('circulo');
let mostrarCirculo = true;

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

