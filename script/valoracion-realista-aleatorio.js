import { 
    obtenerElementoAleatorio, 
    generarPausa, 
    reproducirSonido, 
    pausarSonido, 
    columnaAleatoria, 
    columnaAleatoriaDiferente,
    obtenerElementoDistinto
} from './utils.js';

const body = document.body;
const explicacion = document.getElementById('explicacion');
const columnas = document.querySelectorAll('.columna');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global

const persona = ['../image/Persona1-realista/persona1.jpeg', '../image/Persona1-realista/persona2.jpeg', '../image/Persona1-realista/persona3.jpeg', '../image/Persona1-realista/persona4.jpeg', '../image/Persona1-realista/persona7.jpeg','../image/Persona2-realista/persona1.jpeg', '../image/Persona2-realista/persona2.jpeg', '../image/Persona2-realista/persona3.jpeg', '../image/Persona2-realista/persona4.jpeg', '../image/Persona2-realista/persona5.jpeg'];

const imagenAmenaza = ['../image/Persona1-realista/persona5.jpeg', '../image/Persona1-realista/persona6.jpeg', '../image/Persona2-realista/persona6.jpeg', '../image/Persona2-realista/persona7.jpeg'];

// --- NUEVO: formulario ---
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

    personaAleatoria();
});

async function personaAleatoria(){

    let contadorAmenaza = 0;

    while (contadorAmenaza < exposiciones) {
        
        await generarPausa(tiempoEspera);
        
        const columna = columnaAleatoria(columnas);
        const columna2 = columnaAleatoriaDiferente(columnas, columna);
        const columna3 = columnaAleatoriaDiferente(columnas, [columna, columna2]);
        
        reproducirSonido();
        
        let esAmenaza = Math.random() < 0.3; // 30% de probabilidad de que sea una amenaza
        let fondo = esAmenaza ? obtenerElementoAleatorio(imagenAmenaza) : obtenerElementoAleatorio(persona);
        
        if (esAmenaza) contadorAmenaza++;
        
        columna.style.backgroundImage  = `url('${fondo}')`;
        columna.style.display = 'block';
        columna.style.backgroundSize = "contain";

        if (Math.random() < 0.5) {
            let esAmenaza2 = Math.random() < 0.5;
            if (esAmenaza2) contadorAmenaza++;
            let fondo2 = esAmenaza2 ? obtenerElementoDistinto(imagenAmenaza, [fondo]) : obtenerElementoDistinto(persona, [fondo]);
            columna2.style.backgroundImage  = `url('${fondo2}')`;
            columna2.style.display = 'block';
            columna2.style.backgroundSize = "contain";

            if (Math.random() < 0.5) {
                let esAmenaza3 = Math.random() < 0.5;
                if (esAmenaza3) contadorAmenaza++;
                let fondo3 = esAmenaza3 ? obtenerElementoAleatorio(imagenAmenaza) : obtenerElementoAleatorio(persona);
                columna3.style.backgroundImage  = `url('${fondo3}')`;
                columna3.style.display = 'block';
                columna3.style.backgroundSize = "contain";
            }


        }

        await generarPausa(tiempoExposicion);
        pausarSonido(); 
        columnas.forEach(col => {
            col.style.display = 'none';
        });

    }

    await generarPausa(5000);
    body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
    return; // finalizar ejercicio

}
