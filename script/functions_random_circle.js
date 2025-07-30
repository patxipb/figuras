const circulo = document.getElementById('circulo');
let mostrar = true;

function alternarCirculo() {
    if (mostrar) {
    // Mostrar círculo con color aleatorio
    const color = Math.random() < 0.5 ? 'red' : 'green';
    circulo.style.backgroundColor = color;
    circulo.style.display = 'block';
    } else {
    // Ocultar el círculo
    circulo.style.display = 'none';
    }

    // Alternar estado para la siguiente vez
    mostrar = !mostrar;
}

// Ejecutar alternarCirculo cada 2 segundos
setInterval(alternarCirculo, 2000);