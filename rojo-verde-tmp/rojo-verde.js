import { obtenerElementoAleatorio, generarPausa, reproducirSonido, pausarSonido} from './utils.js';

const botonMenu = document.getElementById('menu-boton');
const imagenExplicacion = document.getElementById('imagen-explicacion');
const body = document.body;
const disparo = document.getElementById('sonidoDisparo');
disparo.volume = 0.5;

window.disparo = disparo; // necesario si utils.js usa disparo como global

const imagenesFondo = ['../image/rojo-verde 1.png', '../image/rojo-verde 2.png', '../image/rojo-verde 3.png', '../image/rojo-verde 4.png', '../image/rojo-verde 5.png', '../image/rojo-verde 6.png', '../image/rojo-verde 7.png', '../image/rojo-verde 8.png', '../image/rojo-verde 9.png', '../image/rojo-verde 10.png', '../image/rojo-verde 11.png', '../image/rojo-verde 12.png'];

botonMenu.addEventListener('click', rojoVerde);

async function rojoVerde() {
    botonMenu.style.display = 'none';
    imagenExplicacion.style.display = 'none';

    for (let i = 0; i < 13; i++) {
        await generarPausa(4950); // espera 5 segundos
        reproducirSonido();
        let fondo = obtenerElementoAleatorio(imagenesFondo);
        body.style.background = `url('${fondo}') no-repeat center center fixed`;
        body.style.backgroundSize = "contain";
        await generarPausa(3500); // visible 3,5 segundos
        pausarSonido();
        body.style.backgroundImage = 'none';

    }

    await generarPausa(10000);
    imagenExplicacion.src = '../image/Fin ejercicios.png';
    imagenExplicacion.style.display = 'block';
    return;



    

}
