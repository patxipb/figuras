const colores = ['rojo', 'verde', 'azul', 'amarillo'];
const audio = document.getElementById('audio-disparo');
const contenedor = document.getElementById('contenedor-circulo');
const btnIniciar = document.getElementById('btn-iniciar');
const pantallaInicial = document.getElementById('pantalla-inicial');

function obtenerColorAleatorio() {
  const color = colores[Math.floor(Math.random() * colores.length)];
  return color;
}

function crearCirculo(color) {
  const circulo = document.createElement('div');
  circulo.classList.add('circulo');
  circulo.style.backgroundColor = color;
  contenedor.appendChild(circulo);

  // Reproducir sonido
  audio.currentTime = 0;
  audio.play();

  // Eliminar después de 1.5 segundos
  setTimeout(() => {
    circulo.remove();
  }, 1500);
}

function iniciarSecuencia() {
  // Ocultar imagen y botón
  pantallaInicial.style.opacity = 1;
  pantallaInicial.style.transition = 'opacity 0.3s ease';
  pantallaInicial.style.opacity = 0;

  // Esperar a que desaparezca (300ms) y luego iniciar
  setTimeout(() => {
    pantallaInicial.style.display = 'none';

    // Iniciar aparición de círculos cada 1.5s
    setInterval(() => {
      const color = obtenerColorAleatorio();
      crearCirculo(color);
    }, 1500);

  }, 300); // Esperar a que termine la transición visual
}

btnIniciar.addEventListener('click', iniciarSecuencia);














/* const circulo = document.getElementById('circulo');
const columnas = [
    document.getElementById('columna1'),
    document.getElementById('columna2'),
    document.getElementById('columna3')
];

let mostrarCirculo = true;
let columnaActual = null;

function alternarCirculo() {

     if (mostrarCirculo) {
    // Elegir color aleatorio
    const color = Math.random() < 0.5 ? 'red' : 'green';
    circulo.style.backgroundColor = color;

    // Elegir columna aleatoria
    const indice = Math.floor(Math.random() * 3);
    columnaActual = columnas[indice];

    // Añadir el círculo a esa columna y centrarlo
    columnaActual.appendChild(circulo);
    circulo.style.display = 'block';
    } else {
    // Ocultar círculo
    circulo.style.display = 'none';
    if (columnaActual && columnaActual.contains(circulo)) {
        columnaActual.removeChild(circulo);
    }
    }

    mostrarCirculo = !mostrarCirculo  ;
}

// Alternar cada 1,5 segundos
setInterval(alternarCirculo, 1500); */