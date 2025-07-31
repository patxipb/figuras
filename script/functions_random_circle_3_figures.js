const circulo = document.getElementById('circulo');
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
setInterval(alternarCirculo, 1500);