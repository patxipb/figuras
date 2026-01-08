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
        

        // Inicializar todas las columnas en blanco
        columnas.forEach(col => {
            col.style.backgroundImage = '';
            col.style.backgroundColor = 'white';
            col.style.display = 'block';
        });

        // Seleccionar columnas para mostrar imagen
        const columna = columnaAleatoria(columnas);
        let columnasUsadas = [columna];
        let esAmenaza = Math.random() < 0.3;
        let fondo = esAmenaza ? obtenerElementoAleatorio(imagenAmenaza) : obtenerElementoAleatorio(persona);
        if (esAmenaza) contadorAmenaza++;
        columna.style.backgroundImage = `url('${fondo}')`;
        columna.style.backgroundColor = 'transparent';
        columna.style.backgroundSize = "cover";

        reproducirSonido();

        // Segunda columna
        let mostrarColumna2 = Math.random() < 0.5;
        if (mostrarColumna2) {
            const columna2 = columnaAleatoriaDiferente(columnas, columna);
            columnasUsadas.push(columna2);
            let esAmenaza2 = Math.random() < 0.5;
            if (esAmenaza2) contadorAmenaza++;
            let fondo2 = esAmenaza2 ? obtenerElementoDistinto(imagenAmenaza, [fondo]) : obtenerElementoDistinto(persona, [fondo]);
            columna2.style.backgroundImage = `url('${fondo2}')`;
            columna2.style.backgroundColor = 'transparent';
            columna2.style.backgroundSize = "cover";

            // Tercera columna
            let mostrarColumna3 = Math.random() < 0.5;
            if (mostrarColumna3) {
                const columna3 = columnaAleatoriaDiferente(columnas, [columna, columna2]);
                columnasUsadas.push(columna3);
                let esAmenaza3 = Math.random() < 0.5;
                if (esAmenaza3) contadorAmenaza++;
                let fondo3 = esAmenaza3 ? obtenerElementoDistinto(imagenAmenaza, [fondo, fondo2]) : obtenerElementoDistinto(persona, [fondo, fondo2]);
                columna3.style.backgroundImage = `url('${fondo3}')`;
                columna3.style.backgroundColor = 'transparent';
                columna3.style.backgroundSize = "cover";
            }
        }

        await generarPausa(tiempoExposicion);
        pausarSonido();
        // Limpiar columnas (volver a blanco)
        columnas.forEach(col => {
            col.style.backgroundImage = '';
            col.style.backgroundColor = 'white';
        });

    }

    await generarPausa(5000);
    columnas.forEach(col => {
            col.style.display='none';
        });
    body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
    return; // finalizar ejercicio

}
