import { 
    generarPausa, 
    pausarSonido, 
    reproducirSonido, 
    dibujarCuadrado, 
    centroColumna
} from "./utils.js";

const body = document.body;
const botonMenu = document.getElementById('menu-boton');
const explicacion = document.getElementById('explicacion');
const columnas = document.querySelectorAll('.columna');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;
window.disparo = disparo; // necesario si utils.js usa disparo como global

const cuadrado = document.getElementById("cuadrado");
cuadrado.style.borderRadius = "8px";
var numero = document.getElementById("numeroFlotante");

window.body = body;
window.cuadrado = cuadrado;
window.botonMenu = botonMenu;

const form = document.getElementById('config-form');

let exposiciones = 10;
let tiempoEspera = 400;      // valores por defecto
let tiempoExposicion = 500;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoEspera = valorEspera === "" ? 400 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 500 : Number(valorExposicion);

    form.style.display = "none";
    explicacion.style.display = 'none';

    alternarNumero();
});


async function alternarNumero() {

    columnas[1].style.backgroundImage = "url('../image/figura_sola.png')";
    
    let contador = 0;
    while (contador < exposiciones) {
        await generarPausa(tiempoEspera);
        cuadrado.style.display = "none";
        reproducirSonido();
        var numeroAleatorio = Math.floor(Math.random() * 9) + 1;
        numero.innerText = numeroAleatorio;
        const { left, top } = centroColumna(columnas[1]);
        numero.style.left = left; // Centrar horizontalmente
        numero.style.top = top; // Centrar verticalmente
        numero.style.display = "block";
        if (numeroAleatorio != 3) {
            contador++;
        }
        await generarPausa(tiempoExposicion);
        numero.style.display = "none";
        pausarSonido();
        //setTimeout(() => reproducirSonido(), 50);
        
        dibujarCuadrado({color: 'green', left: left, top: top});
    }

    // Finalizar ejercicio
    if (contador >= exposiciones) {
        await generarPausa(5000);
        cuadrado.style.display = "none";
        columnas[1].style.display = 'none';
        body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
        body.style.display = 'block';
        return; 
    }

}

