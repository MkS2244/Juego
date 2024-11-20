import { Rana } from './js/Rana.js';
import { Coches } from './js/Coches.js';
import { Tronco } from './js/Tronco.js';
import { Tortuga } from './js/Tortuga.js';
import { ctx, canvas, TOPEABAJO, TOPEARRIBA, TOPEDERECHA, TOPEIZQUIERDA,NUMEROTRONCOS,NUMEROTORTUGAS, NUMEROCOCHES, NUMEROCAMION, VELOCIDADTRONCO,VELOCIDADTORTUGAS, VELOCIDADCOCHES, VELOCIDADCAMION  } from './js/constantes.js';


window.onload = function () {
    //------------------------------------------------
    //                 V A R I A B L E S    
    //------------------------------------------------
    
    let miRana;
    let xDerecha, xIzquierda, yArriba, yAbajo; //variables para la dirección del personaje
    let idMovimiento, idAnimacion; //variables de ID para lanzar las animaciones
    let posicion = 0; //posición del array
    let inicio = 0;

    //creo un objeto de Rana
    miRana = new Rana();

/*     function pintarRana() {
        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);



        ctx.drawImage(miRana.imagenRana,
            miRana.animacionRana[posicion][0],
            miRana.animacionRana[posicion][1],
            miRana.tamañoX,
            miRana.tamañoY,
            miRana.x,
            miRana.y,
            miRana.tamañoX + 16,
            miRana.tamañoY + 16
        );
        
    } */

    function movimientoRana() {

        ctx.clearRect(0, 0, 600, 400);
        if (xDerecha) miRana.generaPosicionDerecha();
        if (xIzquierda) miRana.generaPosicionIzquierda();
        if (yAbajo) miRana.generaPosicionAbajo();
        if (yArriba) miRana.generaPosicionArriba();

        miRana.pintarRana(ctx);

        if (xDerecha) inicio = 12;
        if (xIzquierda) inicio = 4;
        if (yAbajo) inicio = 8;
        if (yArriba) inicio = 0;

        posicion = inicio + (posicion + 1) % 2;
    }


    function activaMovimiento(evt) {

        switch (evt.keyCode) {
            // Right arrow.
            case 39:
                xDerecha = true;
                break;
            // Left arrow
            case 37:
                xIzquierda = true;
                break;
            // Up arrow
            case 38:
                yArriba = true;
                break;
            // Down arrow
            case 40:
                yAbajo = true;
                break;
        }

    }

    function desactivaMovimiento(evt) {

        switch (evt.keyCode) {
            // Right arrow.
            case 39:
                xDerecha = false;
                break;
            // Left arrow
            case 37:
                xIzquierda = false;

                break;
            // Up arrow
            case 38:
                yArriba = false;
                break;
            // Down arrow
            case 40:
                yAbajo = false;
                break;
        }

    }

    //  Evento para saber cuando se presiona una tecla
    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);


    //  Lanzo la animación
    //idAnimacion = setInterval(pintarRana, 24 / 1000);

    //  Animación encargada de hacer el movimiento de la Rana
    idMovimiento = setInterval(movimientoRana, 1000 / 8);


}
