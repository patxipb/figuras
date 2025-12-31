import { 
    dibujarCirculo, 
    generarPausa, 
    reproducirSonido, 
    pausarSonido, 
    calculaColor, 
    colorDistinto, 
    columnaAleatoria, 
    columnaAleatoriaDiferente, 
    centroColumna
} from "./utils.js";

const explicacion = document.getElementById('explicacion');
const circulo = document.getElementById('circulo');
const circulo2 = document.getElementById('circulo2');
const disparo = document.getElementById('sonidoDisparo');
const columnas = document.querySelectorAll('.columna');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global
window.circulo = circulo; // igual para circulo
window.circulo2 = circulo2;

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
    explicacion.style.display = 'none';
    
    dibujarCirculosAleatorios();
});


async function dibujarCirculosAleatorios() {
    
    columnas.forEach(col => {
        col.style.backgroundImage = "url('../image/figura_sola.png')";
    });

    let contadorRojos = 0;

    while (contadorRojos < exposiciones) {
        await generarPausa(tiempoEspera);
        reproducirSonido();
        let colorCirculo = calculaColor();
        if (colorCirculo === 'red') contadorRojos++;

        // Selecciona una columna aleatoria y obtiene su centro
        const columna = columnaAleatoria(columnas);
        const { left, top } = centroColumna(columna);

        dibujarCirculo({circulo: circulo, color: colorCirculo, top: top, left: left});

        // Segundo círculo aleatorio con color distinto
        if (contadorRojos >= 4 && Math.random() < 0.5) {
            let colorCirculo2 = colorDistinto(colorCirculo);
            if (colorCirculo2 === 'red') contadorRojos++;
            const columna2 = columnaAleatoriaDiferente(columnas, columna);
            const { left: left2, top: top2 } = centroColumna(columna2);
            dibujarCirculo({ circulo: circulo2, color: colorCirculo2, top: top2, left: left2});
        }

        await generarPausa(tiempoExposicion);
        pausarSonido();
        circulo.style.display = 'none';
        circulo2.style.display = 'none';
    }


    // Finalizar ejercicio
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
