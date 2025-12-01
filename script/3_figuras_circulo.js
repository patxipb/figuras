import { dibujarCirculo, generarPausa, reproducirSonido, pausarSonido, calculaColor, colorDistinto, calculaIzquierda, calculaIzquierdaLibre } from "./utils.js";

const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const body = document.body;
const circulo = document.getElementById('circulo');
const circulo2 = document.getElementById('circulo2');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global
window.circulo = circulo; // igual para circulo
window.circulo2 = circulo2;
window.imagenExplicacion = imagenExplicacion;
window.botonMenu = botonMenu;
window.body = body;

var contadorRojos = 0;
const maxRojos = 10;

const form = document.getElementById('config-form');

let exposiciones = 10;
let tiempoEspera = 2000;      // valores por defecto
let tiempoExposicion = 2500;

// Cuando el usuario pulse "Iniciar"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoEspera = valorEspera === "" ? 2000 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 2500 : Number(valorExposicion);

    form.style.display = "none";
    alternarCirculo();
});

async function alternarCirculo() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    // Fondo
    body.style.background = "url('../image/3_siluetas_blancas.jpg') no-repeat center center fixed";
    body.style.backgroundSize = "contain";

    while (contadorRojos < exposiciones) {
        await generarPausa(tiempoEspera);
        reproducirSonido();
        let colorCirculo = calculaColor();
        let izquierda = calculaIzquierda();
        if (colorCirculo === 'red') contadorRojos++;
        dibujarCirculo({ color: colorCirculo, top: '50%', left: izquierda, size: 10 });
        
        // Segundo círculo aleatorio con color distinto
        if (contadorRojos >= 4 && Math.random() < 0.5) {
            let colorCirculo2 = colorDistinto(colorCirculo);
            if (colorCirculo2 === 'red') contadorRojos++;
            dibujarCirculo({ circulo: circulo2, color: colorCirculo2, top: '50%', left: calculaIzquierdaLibre(izquierda), size: 10 });

        }

        await generarPausa(tiempoExposicion);
        pausarSonido();
        circulo.style.display = 'none';
        circulo2.style.display = 'none';
    }

    if (contadorRojos >= maxRojos) {
        await generarPausa(5000);
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        body.style.display = 'block';
        return; // finalizar ejercicio
    }

}
