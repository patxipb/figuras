export function reproducirSonido() {
    try {
        disparo.currentTime = 0; // Reinicia el sonido al principio
        disparo.play();
    } catch (error) {
        console.error("Error al reproducir el sonido:", error);
    }
}

// Función para pausar el sonido
export function pausarSonido() {
    try {
        disparo.pause();
        disparo.currentTime = 0; // Reinicia el sonido al principio
    } catch (error) {
        console.error("Error al pausar el sonido:", error);
    }
}

export function toggleCirculo() {
    mostrarCirculo = !mostrarCirculo;
}

export function generarPausa(tiempo) {
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

export function generarPausaAleatoria() {
    const tiempo = Math.random() * 2000 + 3000; // entre 3000 ms (3 s) y 5000 ms (5 s)
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

export function dibujarFiguras() {
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

export function borrarFiguras() {
    
    generarPausa(5000).then(() => { 
        circulo.style.display = 'none';
        body.style.backgroundImage = 'none'; 
        siguienteExplicacion(ejercicioActual);
        botonInicio.removeEventListener('click', iniciarEjercicios);
        });
    
}

export function calculaColor() {
    return Math.random() < 0.5 ? 'red' : 'green';
}

export function calculaAltura() {
    const alturas = ['30%', '50%', '72%'];
    return alturas[Math.floor(Math.random() * alturas.length)];
}

export function calculaIzquierda() {
    const izquierdas = ['25.5%', '52%', '80.5%'];
    return izquierdas[Math.floor(Math.random() * izquierdas.length)];
}

export function calculaTamanio() {
    const tamanios = [10, 8, 6.4, 5.12];
    return tamanios[Math.floor(Math.random() * tamanios.length)];
}

export function dibujarCirculo({color = 'red', top = '50%', left = '52%', size = 10}) {

    circulo.style.backgroundColor = color;
    circulo.style.left = left;
    circulo.style.top = top;
    circulo.style.width = `${size}vh`;
    circulo.style.height = `${size}vh`;
    window.circulo.style.display = 'block';

   /*  if (mostrarCirculo) {
        reproducirSonido();
        window.circulo.style.display = 'block';
        if (color === 'red') {
            window.contadorRojos++;
            console.log(`Círculos rojos mostrados: ${window.contadorRojos}`);
        }
    } else {
        window.circulo.style.display = 'none';
        pausarSonido();
    } */
    //mostrarCirculo = !mostrarCirculo;
    //window.circulo.style.display = 'block';
    
}

export async function mostrarCuentaAtras() {
    // Crear el elemento que mostrará los números
    const contador = document.createElement('div');
    contador.style.position = 'fixed';
    contador.style.top = '50%';
    contador.style.left = '50%';
    contador.style.transform = 'translate(-50%, -50%)';
    contador.style.fontSize = '50vh'; // tamaño del 50% de la altura de la pantalla
    contador.style.fontWeight = 'bold';
    contador.style.color = 'white';
    contador.style.textShadow = '0 0 20px black';
    contador.style.zIndex = '9999';
    contador.style.transition = 'opacity 0.5s ease';
    contador.style.textAlign = 'center';
    contador.style.opacity = '1';
    
    document.body.appendChild(contador);

    // Números de la cuenta atrás
    const numeros = [3, 2, 1];

    for (let num of numeros) {
        contador.textContent = num;
        contador.style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo por número
        contador.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 300)); // pequeña transición antes del siguiente
    }

    // Eliminar el contador después de la cuenta atrás
    contador.remove();
}

export  function obtenerElementoAleatorio(array) {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error("Debes pasar un array con al menos un elemento.");
  }
  
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}
