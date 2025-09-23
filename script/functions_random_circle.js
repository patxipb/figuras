const body = document.body;
const botonInicio = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const audio = document.getElementById('sonidoDisparo');
const circulo = document.getElementById('circulo');
let mostrarCirculo = true;

function alternarCirculo() {
    if (mostrarCirculo) {
        // Reproducir sonido
        try {
            audio.currentTime = 0;
            audio.play();
        } catch (e) {
        // En algunos navegadores antiguos puede fallar, lo ignoramos
            console.log("Audio error:", e);
        }
        // Mostrar círculo con color aleatorio
        const color = Math.random() < 0.5 ? 'red' : 'green';
        circulo.style.backgroundColor = color;
        circulo.style.left = '50%'; // Centro
        circulo.style.display = 'block';


    } else {
    // Ocultar el círculo
        circulo.style.display = 'none';
    }

    // Alternar estado para la siguiente vez
    mostrarCirculo = !mostrarCirculo;
}

botonInicio.addEventListener('click', () => {
    // Lógica para el botón de inicio
    botonInicio.style.display = 'none';
    imagenExplicacion.style.display = 'none';
    body.style.background = "url('../image/silueta.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";
    setInterval(alternarCirculo, 1200);
});