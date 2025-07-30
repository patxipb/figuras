const circulo = document.getElementById('circulo');
var mostrarCirculo = true;

function alternarCirculo() {
    if (mostrarCirculo) {
        // Mostrar círculo con color aleatorio
        const color = Math.random() < 0.5 ? 'red' : 'green';
        circulo.style.backgroundColor = color;
        circulo.style.display = 'block';
    } else {
    // Ocultar el círculo
        circulo.style.display = 'none';
    }

    // Alternar estado para la siguiente vez
    mostrarCirculo = !mostrarCirculo;
}

// Ejecutar alternarCirculo cada 1,5 segundos
setInterval(alternarCirculo, 1500);