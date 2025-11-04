
const body = document.body;
const botonInicio = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const imagenes = ['../image/Ejercicio 1.png', '../image/Ejercicio 2.png', 
        '../image/Ejercicio 3.png', '../image/Ejercicio 4.png', 
        '../image/Ejercicio 5.png', '../image/Ejercicio 6.png', 
        '../image/Fin ejercicios.png'];

const circulo = document.getElementById('circulo');
let mostrarCirculo = true;

let ejercicioActual = 1;

let contadorRojos = 0;
const maxRojos = 3;

//const pausar = ms => new Promise(r => setTimeout(r, ms));


const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5; // Ajusta el volumen entre 0.0 y 1.0


function dibujarExplicacion(ejercicioActual) {
    botonInicio.style.display = 'block';
    imagenExplicacion.style.display = 'block';
    switch (ejercicioActual) {
        case 1:
            imagenExplicacion.src = imagenes[0];
            break;
        case 2:
            imagenExplicacion.src = imagenes[1];
            break;
        case 3:
            imagenExplicacion.src = imagenes[2];
            break;
        case 4:
            imagenExplicacion.src = imagenes[3];
            break;
        case 5:
            imagenExplicacion.src = imagenes[4];
            break;
        case 6:
            imagenExplicacion.src = imagenes[5];
            break;
        default:
            imagenExplicacion.src = imagenes[6];
    }
}

function iniciarEjercicios() {
    dibujarFiguras();
    switch (ejercicioActual) {
        case 1:
            setInterval(ejercicio1, 2000);
            break;
        case 2:
            setInterval(ejercicio2, 2000);
            break;
        case 3:
            setInterval(ejercicio3, 2000);
            break;
        case 4:
            setInterval(ejercicio4, 2000);
            break;
        case 5:
            setInterval(ejercicio5, 2000);
            break;
        case 6:
            setInterval(ejercicio6, 2000);
            break;
        default:
            console.log("No hay más ejercicios.");
    }
}


function siguienteExplicacion(ejercicioActual) {
    if (ejercicioActual < 7) {
        return ejercicioActual++;
    }
}


function reproducirSonido() {
    try {
        disparo.currentTime = 0; // Reinicia el sonido al principio
        disparo.play();
    } catch (error) {
        console.error("Error al reproducir el sonido:", error);
    }
}

// Función para pausar el sonido
function pausarSonido() {
    try {
        disparo.pause();
        disparo.currentTime = 0; // Reinicia el sonido al principio
    } catch (error) {
        console.error("Error al pausar el sonido:", error);
    }
}

function toggleCirculo() {
    mostrarCirculo = !mostrarCirculo;
}

function generarPausa(tiempo) {
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

function ejercicio1() {
    if (contadorRojos >= maxRojos) {
        clearInterval(ejercicio1);
        borrarFiguras();
        return;
    } 

    dibujarCirculo({ color: 'red' });
}

function ejercicio2() {
    if (contadorRojos >= maxRojos) {
        clearInterval(ejercicio2);
        borrarFiguras();
        return;
    }

    dibujarCirculo({ color : calculaColor() });
}

function ejercicio3() {
    if (contadorRojos >= maxRojos) {
        clearInterval(ejercicio3);
        borrarFiguras();
        return;
    }
    dibujarCirculo({ color: 'red', top: calculaAltura(), size: calculaTamanio() });
}

function ejercicio4() {
    if (contadorRojos >= maxRojos) {
        clearInterval(ejercicio4);
        borrarFiguras();
        return;
    }
    dibujarCirculo({ color: calculaColor(), top: calculaAltura(), size: calculaTamanio() });

}

function ejercicio5() {
    if (contadorRojos >= 8) {
        clearInterval(ejercicio5);
        borrarFiguras();
        return;
    }
    dibujarCirculo({color: 'red', top: calculaAltura(), left: calculaIzquierda(), size: calculaTamanio() });
}

function ejercicio6() {
    if (contadorRojos >= 8) {
        clearInterval(ejercicio6);
        borrarFiguras();
        return;
    }
    dibujarCirculo({ color: calculaColor(), top: calculaAltura(), left: calculaIzquierda(), size: calculaTamanio() });
}

function dibujarFiguras(ejercicioActual) {
    botonInicio.style.display = 'none';
    imagenExplicacion.style.display = 'none';
    body.style.backgroundSize = "contain";
    if (ejercicioActual <= 4) {
        body.style.background = "url('../image/figura.jpg') no-repeat center center fixed";
    } else {
        body.style.background = "url('../image/3_siluetas_blancas.jpg') no-repeat center center fixed";
    }
    body.style.background.display = 'block';
    body.style.backgroundSize = "contain";
}

function borrarFiguras() {
    
    generarPausa(5000).then(() => { 
        circulo.style.display = 'none';
        body.style.backgroundImage = 'none'; 
        siguienteExplicacion(ejercicioActual);
        botonInicio.removeEventListener('click', iniciarEjercicios);
        });
    
}

function calculaColor() {
    return Math.random() < 0.5 ? 'red' : 'green';
}

function calculaAltura() {
    const alturas = ['30%', '50%', '72%'];
    return alturas[Math.floor(Math.random() * alturas.length)];
}

function calculaIzquierda() {
    const izquierdas = ['25.5%', '52%', '80.5%'];
    return izquierdas[Math.floor(Math.random() * izquierdas.length)];
}

function calculaTamanio() {
    const tamanios = [10, 8, 6.4, 5.12];
    return tamanios[Math.floor(Math.random() * tamanios.length)];
}

function dibujarCirculo({color = 'red', top = '50%', left = '52%', size = 10}) {

    circulo.style.backgroundColor = color;
    circulo.style.left = left;
    circulo.style.top = top;
    circulo.style.width = `${size}vh`;
    circulo.style.height = `${size}vh`;

    if (mostrarCirculo) {
        reproducirSonido();
        circulo.style.display = 'block';
        if (color === 'red') {
            contadorRojos++;
            console.log(`Círculos rojos mostrados: ${contadorRojos}`);
        }
    } else {
        circulo.style.display = 'none';
        pausarSonido();
    }
    mostrarCirculo = !mostrarCirculo;
}


//dibujarExplicacion(ejercicioActual);

//botonInicio.addEventListener('click', iniciarEjercicios);



