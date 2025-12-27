import { obtenerElementoAleatorio, generarPausa, reproducirSonido, pausarSonido} from './utils.js';

const botonMenu = document.getElementById('menu-boton');
const explicacion = document.getElementById('explicacion');
const body = document.body;
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global

const imagenesFondo = [
    '../image/rojo-verde/rojo-verde 1.png', 
    '../image/rojo-verde/rojo-verde 2.png', 
    '../image/rojo-verde/rojo-verde 3.png', 
    '../image/rojo-verde/rojo-verde 4.png', 
    '../image/rojo-verde/rojo-verde 5.png', 
    '../image/rojo-verde/rojo-verde 6.png', 
    '../image/rojo-verde/rojo-verde 7.png', 
    '../image/rojo-verde/rojo-verde 8.png', 
    '../image/rojo-verde/rojo-verde 9.png', 
    '../image/rojo-verde/rojo-verde 10.png', 
    '../image/rojo-verde/rojo-verde 11.png', 
    '../image/rojo-verde/rojo-verde 12.png'
];

// --- NUEVO: formulario ---
const form = document.getElementById('config-form');

let tiempoEspera = 4950;      // valores por defecto
let tiempoExposicion = 2000;

// Cuando el usuario pulse "Iniciar"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    tiempoEspera = valorEspera === "" ? 4950 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 2000 : Number(valorExposicion);

    form.style.display = "none";
    rojoVerde();
});

async function rojoVerde() {
    botonMenu.style.display = 'none';
    explicacion.style.display = 'none';

    for (let i = 0; i < 13; i++) {
        await generarPausa(tiempoEspera);
        reproducirSonido();
        let fondo = obtenerElementoAleatorio(imagenesFondo);
        body.style.background = `url('${fondo}') no-repeat center center fixed`;
        body.style.backgroundSize = "contain";
        await generarPausa(tiempoExposicion);
        pausarSonido();
        body.style.backgroundImage = 'none';

    }

    await generarPausa(10000);
    imagenExplicacion.src = '../image/Fin ejercicios.png';
    imagenExplicacion.style.display = 'block';
    return;

}
