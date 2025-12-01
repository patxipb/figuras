import {
    dibujarCirculo,
    dibujarCuadrado,
    dibujarTriangulo,
    generarPausa,
    generarPausaAleatoria,
    reproducirSonido,
    pausarSonido,
    colorAleatorio
} from './utils.js';

const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const body = document.body;

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
const maxRojos = 10;

// Posiciones horizontales
const posiciones = ['25%', '52%', '80%'];

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

// ------------------------------------
// F U N C I O N E S   D E   A Y U D A
// ------------------------------------

// Oculta las 9 figuras (3 por tipo)
function ocultarTodas() {
    [...circulos, ...cuadrados, ...triangulos].forEach(el => {
        el.style.display = 'none';
    });
}

// Dibuja todas las figuras de una columna (índice 0,1,2)
function dibujarColumna(index) {
    const left = posiciones[index];

    FIGURAS.forEach(fig => {

        if (Math.random() < fig.prob) {

            const el = fig.elementos[index];
            const color = colorAleatorio();

            // Contador cuando aparece círculo rojo
            if (fig.dibujar === FIGURAS[0].dibujar && color === 'red') {
                contadorRojos++;
            }

            fig.dibujar(el, color, left);
            el.style.display = 'block';
        }
    });
}

// ------------------------------------
//  M A I N
// ------------------------------------
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

    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    body.style.background = "url('../image/3_siluetas_blancas.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (contadorRojos < exposiciones) {

        await generarPausa(tiempoEspera);
        reproducirSonido();

        // Dibujar 3 columnas
        dibujarColumna(0);
        dibujarColumna(1);
        dibujarColumna(2);

        // Mostrar durante 1.5s
        await generarPausa(1500);

        pausarSonido();
        ocultarTodas();
    }

    // Fin del ejercicio
    await generarPausa(tiempoExposicion);

    if (contadorRojos >= maxRojos) {
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
    }
}


























/* import { dibujarCirculo, dibujarCuadrado, dibujarTriangulo, generarPausa, generarPausaAleatoria, reproducirSonido, pausarSonido, calculaColor, calculaAltura, calculaIzquierda, colorAleatorio} from './utils.js';

const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const body = document.body;

//Figuras geométricas
window.circulo1 = document.getElementById('circulo1');
window.circulo2 = document.getElementById('circulo2');
window.circulo3 = document.getElementById('circulo3');

window.cuadradro1 = document.getElementById('cuadrado1');
window.cuadradro2 = document.getElementById('cuadrado2');
window.cuadradro3 = document.getElementById('cuadrado3');

window.triangulo1 = document.getElementById('triangulo1');
window.triangulo2 = document.getElementById('triangulo2');
window.triangulo3 = document.getElementById('triangulo3');

const circulos = [
    window.circulo1, window.circulo2, window.circulo3
];

const cuadrados = [
    window.cuadradro1, window.cuadradro2, window.cuadradro3];

const triangulos = [
    window.triangulo1, window.triangulo2, window.triangulo3];

const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global



let contadorRojos = 0;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;
window.body = body;


const maxRojos = 10;

botonMenu.addEventListener('click', circuloCuadradoTriangulo);

async function circuloCuadradoTriangulo() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    // Fondo
    body.style.background = "url('../image/3_siluetas_blancas.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (contadorRojos < maxRojos) {
        await generarPausaAleatoria(); // espera entre 3 y 5 segundos antes del siguiente
        reproducirSonido();

        //Figura izquierda
        if (Math.random() < 0.75) {
            let colorCirculo = colorAleatorio();
            if (colorCirculo === 'red') contadorRojos++;
            dibujarCirculo({ circulo: window.circulo1, color: colorCirculo, left: '25%'});
            window.circulo1.style.display = 'block';
        }

        if (Math.random() < 0.5) {
            dibujarCuadrado({ cuadrado: window.cuadradro1, color: colorAleatorio(), left: '25%'});
            window.cuadradro1.style.display = 'block';
        }

        if (Math.random() < 0.5) {
            dibujarTriangulo({ triangulo: window.triangulo1, color: colorAleatorio(), left: '25%'});
            window.triangulo1.style.display = 'block';
        }

        //Figura centro
        if (Math.random() < 0.75) {
            let colorCirculo2 = colorAleatorio();
            if (colorCirculo2 === 'red') contadorRojos++;
            dibujarCirculo({ circulo: window.circulo2, color: colorCirculo2, left: '52%'});
            window.circulo2.style.display = 'block';
        }
        if (Math.random() < 0.5) {
            dibujarCuadrado({ cuadrado: window.cuadradro2, color: colorAleatorio(), left: '52%'});
            window.cuadradro2.style.display = 'block';
        }
        if (Math.random() < 0.5) {
            dibujarTriangulo({ triangulo: window.triangulo2, color: colorAleatorio(), left: '52%'});
            window.triangulo2.style.display = 'block';
        }

        //Figura derecha
        if (Math.random() < 0.75) {
            let colorCirculo3 = colorAleatorio();
            if (colorCirculo3 === 'red') contadorRojos++;
            dibujarCirculo({ circulo: window.circulo3, color: colorCirculo3, left: '80%'});
            window.circulo3.style.display = 'block';
        }
        if (Math.random() < 0.5) {
            dibujarCuadrado({ cuadrado: window.cuadradro3, color: colorAleatorio(), left: '80%'});
            window.cuadradro3.style.display = 'block';
        }
        if (Math.random() < 0.5) {
            dibujarTriangulo({ triangulo: window.triangulo3, color: colorAleatorio(), left: '80%'});
            window.triangulo3.style.display = 'block';
        }

        await generarPausa(1500); // visible 1,5 segundo
        pausarSonido();
        window.circulo1.style.display = 'none';
        window.cuadradro1.style.display = 'none';
        window.triangulo1.style.display = 'none';
        window.circulo2.style.display = 'none';
        window.cuadradro2.style.display = 'none';
        window.triangulo2.style.display = 'none';
        window.circulo3.style.display = 'none';
        window.cuadradro3.style.display = 'none';
        window.triangulo3.style.display = 'none';










        
    }
    await generarPausa(2000);
    if (contadorRojos >= maxRojos) {
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        return; // finalizar ejercicio
    }
    


}
 */