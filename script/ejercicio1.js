import { 
    dibujarCirculo, 
    generarPausa, 
    reproducirSonido, 
    pausarSonido,
    centroColumna
} from './utils.js';

const imagenExplicacion = document.getElementById('imagen-explicacion');
const columnas = document.querySelectorAll('.columna');
const circulo = document.getElementById('circulo');
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

    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    tiempoEspera = valorEspera === "" ? 2000 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 2000 : Number(valorExposicion);

    form.style.display = "none";
    imagenExplicacion.style.display = 'none';
    
    ejercicio1();
});


async function ejercicio1() {
    
    columnas[1].style.backgroundImage = "url('../image/figura_sola.png')";
    let contadorRojos = 0;
    
    while (contadorRojos < exposiciones) {
        await generarPausa(tiempoEspera);
        reproducirSonido();
        const { left, top } = centroColumna(columnas[1]);
        dibujarCirculo({ color: 'red', left: left, top: top });
        contadorRojos++;
        await generarPausa(tiempoExposicion);
        pausarSonido();
        circulo.style.display = 'none';
    }

    await generarPausa(5000);
    columnas[1].style.display = 'none';
    await generarPausa(5000).then(() => {
        window.location.href = 'ejercicio2.html';});
        return;


}
