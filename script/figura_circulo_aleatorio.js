import { 
    dibujarCirculo, 
    generarPausa, 
    reproducirSonido, 
    pausarSonido,
    colorAleatorio,
    calculaAltura, 
    calculaTamanio,
    centroColumna,
    columnaAleatoria,
    columnaAleatoriaDiferente
} from './utils.js';

const body = document.body;
const explicacion = document.getElementById('explicacion');
const columnas = document.querySelectorAll('.columna');
const circulo = document.getElementById('circulo');
const circulo2 = document.getElementById('circulo2');
const circulo3 = document.getElementById('circulo3');
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global

const form = document.getElementById('config-form');

let colorObjetivo = 'red';
let exposiciones = 8;
let tiempoEspera = 2000;      // valores por defecto
let tiempoExposicion = 2000;

// Cuando el usuario pulse "Iniciar"
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorObjetivo = document.getElementById("color-objetivo").value.trim();
    const valorExposiciones = document.getElementById("exposiciones").value.trim();
    const valorEspera = document.getElementById("tiempo-espera").value.trim();
    const valorExposicion = document.getElementById("tiempo-exposicion").value.trim();

    // Mantener los valores por defecto si el input está vacío
    colorObjetivo = valorObjetivo === "" ? 'red' : valorObjetivo;
    exposiciones = valorExposiciones === "" ? 10 : Number(valorExposiciones);
    tiempoEspera = valorEspera === "" ? 2000 : Number(valorEspera);
    tiempoExposicion = valorExposicion === "" ? 2000 : Number(valorExposicion);

    form.style.display = "none";
    explicacion.style.display = 'none';
    
    figurasAlternas();
});

async function figurasAlternas() {
    
/*     columnas.forEach(col => {
        col.style.backgroundImage = "url('../image/figura_sola.png')";
    });
 */
    let contadorObjetivo = 0;

    while (contadorObjetivo < exposiciones) {
        await generarPausa(tiempoEspera);
        reproducirSonido();
        
        let colorCirculo = colorAleatorio(['red', 'blue', 'green', 'yellow']);
        if (colorCirculo === colorObjetivo) contadorObjetivo++;

        const columna = columnaAleatoria(columnas);
        const columna2 = columnaAleatoriaDiferente(columnas, columna);
        const columna3 = columnaAleatoriaDiferente(columnas, [columna, columna2]);

        columna.style.backgroundImage = "url('../image/figura_sola.png')";
        const { left, top } = centroColumna(columna);

        dibujarCirculo({ circulo: circulo, color: colorCirculo, top: calculaAltura(), left: left, size: calculaTamanio() });

        if (Math.random() < 0.5) {
            columna2.style.backgroundImage = "url('../image/figura_sola.png')";
            const { left: left2, top: top2 } = centroColumna(columna2);
            let colorCirculo2 = colorAleatorio(['red', 'blue', 'green', 'yellow']);
            if (colorCirculo2 === colorObjetivo) contadorObjetivo++;
            dibujarCirculo({ circulo: circulo2, color: colorCirculo2, top: calculaAltura(), left: left2, size: calculaTamanio() });

            if (Math.random() < 0.5) {
                columna3.style.backgroundImage = "url('../image/figura_sola.png')";
                const { left: left3, top: top3 } = centroColumna(columna3);
                let colorCirculo3 = colorAleatorio(['red', 'blue', 'green', 'yellow']);
                if (colorCirculo3 === colorObjetivo) contadorObjetivo++;
                dibujarCirculo({ circulo: circulo3, color: colorCirculo3, top: calculaAltura(), left: left3, size: calculaTamanio() });
            }
        }
        
        await generarPausa(tiempoExposicion);
        pausarSonido();
        columna.style.backgroundImage = "none"; 
        circulo.style.display = 'none';
        columna2.style.backgroundImage = "none";
        circulo2.style.display = 'none';
        columna3.style.backgroundImage = "none";
        circulo3.style.display = 'none';

    }
    
    await generarPausa(5000);
    columnas.forEach(col => {
        col.style.display = 'none';
    });
    body.style.background = "url('../image/Fin ejercicios.png') no-repeat center center fixed";
    return; // finalizar ejercicio
    

}