import {
    dibujarCirculo, 
    generarPausa, 
    calculaColor, 
    reproducirSonido, 
    pausarSonido, 
    centroColumna
} from './utils.js';

const body = document.body;
const explicacion = document.getElementById('explicacion');
const circulo = document.getElementById('circulo');
const columnas = document.querySelectorAll('.columna');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global

const form = document.getElementById('config-form');

let exposiciones = 10;
let tiempoEspera = 2000;      // valores por defecto
let tiempoExposicion = 2000;

// Cuando el usuario pulse "Iniciar"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoEspera = valorEspera === "" ? 2000 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 2000 : Number(valorExposicion);

    form.style.display = "none";
    explicacion.style.display = 'none';
    
    alternarCirculo();
});

async function alternarCirculo() {
    
    columnas[1].style.backgroundImage = "url('../image/figura_sola.png')";
    
    let contadorRojos = 0;
    while (contadorRojos < exposiciones) {
        await generarPausa(tiempoEspera);
        reproducirSonido();
        let colorCirculo = calculaColor();
        if (colorCirculo === 'red') {
            window.contadorRojos++;
        }
        const { left, top } = centroColumna(columnas[1]);
        dibujarCirculo({color: colorCirculo, left: left, top: top});
        // Ocultar el círculo
        await generarPausa(tiempoExposicion);
        pausarSonido();
        circulo.style.display = 'none';
    }     

    // Finalizar ejercicio
    await generarPausa(5000);
    columnas[1].style.display = 'none';
    body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
    body.style.display = 'block';
    return; 
}

