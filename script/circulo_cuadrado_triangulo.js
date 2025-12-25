import {
    dibujarCirculo,
    dibujarCuadrado,
    dibujarTriangulo,
    generarPausa,
    reproducirSonido,
    pausarSonido,
    colorAleatorio,
    ocultarTodasFiguras,
    dibujarColumnaFiguras
} from './utils.js';

const explicacion = document.getElementById('explicacion');
const body = document.body;
const columnas = document.querySelectorAll('.columna');


// Referencias a figuras → agrupadas por tipo
const circulos = [
    document.getElementById('circulo1'),
    document.getElementById('circulo2'),
    document.getElementById('circulo3')
];

const cuadrados = [
    document.getElementById('cuadrado1'),
    document.getElementById('cuadrado2'),
    document.getElementById('cuadrado3')
];

const triangulos = [
    document.getElementById('triangulo1'),
    document.getElementById('triangulo2'),
    document.getElementById('triangulo3')
];

// Para acceso desde utils si fuera necesario
window.circulos = circulos;
window.cuadrados = cuadrados;
window.triangulos = triangulos;

// Sonido
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;
window.disparo = disparo;

// Contador rojos
let contadorRojos = 0;

// ------------------------------------
// M A P A   D E   F I G U R A S
// ------------------------------------
const FIGURAS = [
    {   // Circulo
        prob: 0.75,
        elementos: circulos,
        dibujar: (el, color, left) =>
            dibujarCirculo({ circulo: el, color, left })
    },
    {   // Cuadrado
        prob: 0.50,
        elementos: cuadrados,
        dibujar: (el, color, left) =>
            dibujarCuadrado({ cuadrado: el, color, left })
    },
    {   // Triangulo
        prob: 0.50,
        elementos: triangulos,
        dibujar: (el, color, left) =>
            dibujarTriangulo({ triangulo: el, color, left })
    }
];

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
    circuloCuadradoTriangulo();
});

async function circuloCuadradoTriangulo() {

    explicacion.style.display = 'none';
    columnas.forEach(col => {
        col.style.backgroundImage = "url('../image/figura_sola.png')";
    });

    // Usar un objeto para pasar contadorRojos por referencia
    const contadorRojosRef = { value: contadorRojos };
    while (contadorRojosRef.value < exposiciones) {
        await generarPausa(tiempoEspera);
        reproducirSonido();

        // Dibujar en cada columna del DOM
        columnas.forEach(col => dibujarColumnaFiguras({
            columna: col,
            columnas,
            FIGURAS,
            colorAleatorio,
            contadorRojosRef
        }));

        // Mostrar durante tiempoExposicion
        await generarPausa(tiempoExposicion);

        pausarSonido();
        ocultarTodasFiguras([circulos, cuadrados, triangulos]);
    }
    contadorRojos = contadorRojosRef.value;

    // Fin del ejercicio
    if (contadorRojos >= exposiciones) {
        await generarPausa(5000);
        columnas.forEach(col => {
            col.style.display = 'none';
        });
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        body.style.display = 'block';
        return;
    }
}
