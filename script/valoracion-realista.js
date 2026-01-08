import { 
    obtenerElementoAleatorio, 
    generarPausa, 
    reproducirSonido, 
    pausarSonido
} from './utils.js';

const body = document.body;
const explicacion = document.getElementById('explicacion');
const columnas = document.querySelectorAll('.columna');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global

const persona1 = ['../image/Persona1-realista/persona1.jpeg', '../image/Persona1-realista/persona2.jpeg', '../image/Persona1-realista/persona3.jpeg', '../image/Persona1-realista/persona4.jpeg', '../image/Persona1-realista/persona5.jpeg', '../image/Persona1-realista/persona6.jpeg', '../image/Persona1-realista/persona7.jpeg'];

const persona2 = ['../image/Persona2-realista/persona1.jpeg', '../image/Persona2-realista/persona2.jpeg', '../image/Persona2-realista/persona3.jpeg', '../image/Persona2-realista/persona4.jpeg', '../image/Persona2-realista/persona5.jpeg', '../image/Persona2-realista/persona6.jpeg', '../image/Persona2-realista/persona7.jpeg'];

// --- NUEVO: formulario ---
const form = document.getElementById('config-form');

let exposiciones = 10;
let tiempoEspera = 500;      // valores por defecto
let tiempoExposicion = 2000;

// Cuando el usuario pulse "Iniciar"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoEspera = valorEspera === "" ? 500 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 2000 : Number(valorExposicion);

    form.style.display = "none";
    explicacion.style.display = 'none';

    valorarPersona();
});

async function valorarPersona(){

    let persona = Math.random() < 0.5 ? persona1 : persona2;
    
    for (let i = 0; i < exposiciones; i++) {
    //while (amenaza < exposiciones) 
        await generarPausa(tiempoEspera);
        reproducirSonido();
        let fondo = obtenerElementoAleatorio(persona);
        columnas[1].style.backgroundImage  = `url('${fondo}')`;
        columnas[1].style.backgroundSize = "contain";
        await generarPausa(tiempoExposicion);
        pausarSonido();
        columnas[1].style.backgroundImage = 'none';
        columnas[1].style.backgroundColor = 'transparent';
        columnas[1].style.backgroundSize = "cover";
    }

    // Finalizar ejercicio
    await generarPausa(5000);
    body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
    body.style.display = 'block';
    return;

}