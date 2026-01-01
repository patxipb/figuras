// Oculta todas las figuras de los arrays pasados
export function ocultarTodasFiguras(arraysFiguras) {
    arraysFiguras.flat().forEach(el => {
        el.style.display = 'none';
    });
}

// Dibuja todas las figuras en la columna recibida (elemento DOM)
export function dibujarColumnaFiguras({columna, columnas, FIGURAS, colorAleatorio, contadorRojosRef}) {
    // Obtener el índice de la columna para asociar la figura correcta
    const index = Array.from(columnas).indexOf(columna);
    // Calcular la posición horizontal real de la columna
    const rect = columna.getBoundingClientRect();
    const left = `${rect.left + rect.width / 2}px`;

    FIGURAS.forEach(fig => {
        if (Math.random() < fig.prob) {
            const el = fig.elementos[index];
            const color = colorAleatorio();
            // Contador cuando aparece círculo rojo
            if (fig.dibujar === FIGURAS[0].dibujar && color === 'red') {
                contadorRojosRef.value++;
            }
            fig.dibujar(el, color, left);
            el.style.display = 'block';
        }
    });
}

export function reproducirSonido() {

    //si viene precedido de una pausa mayor de 5s, el navegador puede bloquear la reproducción
    try {
        disparo.currentTime = 0; // Reinicia el sonido al principio
        disparo.play();
    } catch (error) {
        console.error("Error al reproducir el sonido:", error);
    }
}

export function pausarSonido() {
    try {
        disparo.pause();
        disparo.currentTime = 0; // Reinicia el sonido al principio
    } catch (error) {
        console.error("Error al pausar el sonido:", error);
    }
}

export function generarPausa(tiempo) {
    return new Promise(async resolve => {
        if (tiempo <= 4950) {
            // Espera normal
            setTimeout(resolve, tiempo);
            return;
        }

        // Ciclos de 4950 ms
        const ciclo = 4950;
        let restante = tiempo;

        while (restante > ciclo) {
            await new Promise(r => setTimeout(r, ciclo));
            restante -= ciclo;
        }

        // Última pausa con el tiempo restante
        setTimeout(resolve, restante);
    });
}


export function generarPausaAleatoria() {
    const tiempo = Math.random() * 2000 + 2950; // entre 3000 ms (3 s) y 5000 ms (5 s)
    return new Promise(resolve => setTimeout(resolve, tiempo));
}

export function calculaColor() {
    return Math.random() < 0.5 ? 'red' : 'green';
}

export function colorDistinto(color, colores = ['red', 'green']) {
    const opciones = colores.filter(c => c !== color);
    return opciones[Math.floor(Math.random() * opciones.length)];
}

export function colorAleatorio(colores = ['red', 'green', 'blue']) {
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
}


export function calculaAltura() {
    const alturas = ['30%', '50%', '72%'];
    return alturas[Math.floor(Math.random() * alturas.length)];
}

export function calculaAlturaLibre(alturaOcupada) {
    const alturas = ['30%', '50%', '72%'];
    const opciones = alturas.filter(pos => pos !== alturaOcupada);
    return opciones[Math.floor(Math.random() * opciones.length)];
}

export function calculaIzquierda() {
    const izquierdas = ['25.5%', '52%', '80.5%'];
    return izquierdas[Math.floor(Math.random() * izquierdas.length)];
}

export function calculaIzquierdaLibre(izquierdaOcupada) {
    const izquierdas = ['25.5%', '52%', '80.5%'];
    const opciones = izquierdas.filter(pos => pos !== izquierdaOcupada);
    return opciones[Math.floor(Math.random() * opciones.length)];
}

export function calculaTamanio() {
    const tamanios = [10, 8, 6.4, 5.12];
    return tamanios[Math.floor(Math.random() * tamanios.length)];
}

export function dibujarCirculo({circulo = window.circulo, color = 'red', top = '50%', left = '52%', size = 10}) {
    const isVertical = window.innerHeight > window.innerWidth;
    const unidad = isVertical ? 'vw' : 'vh';

    circulo.style.backgroundColor = color;
    circulo.style.left = left;
    circulo.style.top = top;

    circulo.style.width = `${size}${unidad}`;
    circulo.style.height = `${size}${unidad}`;

    circulo.style.display = 'block';
    circulo.style.border = '0.3vh solid black';
    circulo.style.borderRadius = '50%';
    circulo.style.clipPath = 'circle(50%)';
    circulo.style.zIndex = 2;
}

export function dibujarCuadrado({cuadrado = window.cuadrado, color = 'blue', top = '50%', left = '52%', size = 10 }) {
    const isVertical = window.innerHeight > window.innerWidth;
    const unidad = isVertical ? 'vw' : 'vh';

    cuadrado.style.backgroundColor = color;
    cuadrado.style.left = left;
    cuadrado.style.top = top;
    cuadrado.style.width = `${size}${unidad}`;
    cuadrado.style.height = `${size}${unidad}`;
    
    cuadrado.style.transform = 'translate(-50%, -50%)';
    cuadrado.style.display = 'block';
    cuadrado.style.border = '0.3vh solid black'; // Borde uniforme
    cuadrado.style.clipPath = 'inset(0%)'; // Asegura bordes rectos
    cuadrado.style.zIndex = 1; // Cuadrado detrás
}

export function dibujarTriangulo({triangulo = window.triangulo, color = 'green', top = '50%', left = '52%', size = 10 }) {
    const isVertical = window.innerHeight > window.innerWidth;
    const unidad = isVertical ? 'vw' : 'vh';

    triangulo.style.backgroundColor = color;
    triangulo.style.left = left;
    triangulo.style.top = top;
    triangulo.style.width = `${size}${unidad}`;
    triangulo.style.height = `${size}${unidad}`;
    triangulo.style.display = 'block';
    triangulo.style.border = '0.3vh solid black'; // Borde uniforme
    triangulo.style.zIndex = 3; // Triángulo al frente

    const r = size / 2; // radio del círculo
    const orientacionArriba = Math.random() > 0.5;

    // Calcular vértices del triángulo dentro de la caja del círculo
    // Los vértices están normalizados en base al tamaño del círculo (diámetro = size)
    const cx = 50; // centro
    const cy = 50;
    const R = 50; // radio en %

    // Altura (fracción del radio hasta la base)
    const hFrac = 0.8; // entre 0 y 1 → más bajo = base más grande
    const yBase = R * hFrac; // desplazamiento vertical desde el centro a la base

    // Punto superior del círculo
    const puntaY = cy - R;
    // Puntos de la base (en la circunferencia interior)
    const baseY = cy + yBase;
    const baseX = Math.sqrt(R ** 2 - yBase ** 2);

    if (orientacionArriba) {
        // Punta hacia arriba
        triangulo.style.clipPath = `
            polygon(
                ${cx}% ${puntaY}%,
                ${cx - baseX}% ${baseY}%,
                ${cx + baseX}% ${baseY}%
            )
        `;
    } else {
        // Punta hacia abajo
        triangulo.style.clipPath = `
            polygon(
                ${cx - baseX}% ${cy - yBase}%,
                ${cx + baseX}% ${cy - yBase}%,
                ${cx}% ${cy + R}%
            )
        `;
    }

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

export function obtenerElementoAleatorio(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("Debes pasar un array con al menos un elemento.");
    }

    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

export function obtenerElementoDistinto(array, elementosEvitar) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("Debes pasar un array con al menos un elemento.");
    }

    if (!Array.isArray(elementosEvitar)) {
        elementosEvitar = [elementosEvitar];
    }

    const disponibles = array.filter(item => !elementosEvitar.includes(item));
    if (disponibles.length === 0) {
        throw new Error("No hay elementos disponibles que no estén en la lista de elementos a evitar.");
    }

    return obtenerElementoAleatorio(disponibles);
}

// Devuelve una columna aleatoria del NodeList
export function columnaAleatoria(columnas) {
    return columnas[Math.floor(Math.random() * columnas.length)];
}

// Devuelve el centro de una columna como {left, top}
export function centroColumna(col) {
    const rect = col.getBoundingClientRect();
    return {
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.top + rect.height / 2}px`
    };
}

// Devuelve una columna aleatoria distinta de las columnas pasadas en el array a evitar
export function columnaAleatoriaDiferente(columnas, columnasEvitar) {
    // Si no es array, convertirlo en array
    if (!Array.isArray(columnasEvitar)) {
        columnasEvitar = [columnasEvitar];
    }
    const disponibles = Array.from(columnas).filter(col => !columnasEvitar.includes(col));
    if (disponibles.length === 0) return columnas[0];
    return columnaAleatoria(disponibles);
}
