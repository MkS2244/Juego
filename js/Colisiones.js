// -------------------------------------------------
//  COLISIONES DEL JUEGO
// -------------------------------------------------
// Tanto ajusteX como ajusteY son para que la colisión sea más precisa. Ya que ambos objetos no tienen el mismo tamaño.

function colision(rana ,objeto) {
    let i = 0;
    let colisionDetectada = false;

    let rIzq = rana.x;
    let rDer = rana.x + rana.tamañoX;
    let rDown = rana.y;
    let rUp = rana.y + rana.tamañoY;

    do {
        if (i >= objeto.length) {
            break;
        }

        let oIzq = objeto[i].x;
        let oDer =objeto[i].x + objeto[i].tamañoX;
        let oDown = objeto[i].y;
        let oUp = objeto[i].y + objeto[i].tamañoY;

        if (
            rDer > oIzq &&
            rIzq < oDer &&
            rUp > oDown &&
            rDown < oUp
        ) {
            rana.vidas--;
            //pintarVidas();

            colisionDetectada = true;
        } else {
            i++;
        }
    } while (!estamosMuertos && !colisionDetectada);

    return colisionDetectada;
}

function ranaSobreObjeto(rana, arrayObjeto) {
    let colision = false;

    for (const objeto of arrayObjeto) {
        const ranaIzq = rana.x;
        const ranaDer = rana.x + rana.tamañoX;
        const ranaUp = rana.y + rana.tamañoY;
        const ranaDwn = rana.y;

        const objetoIzq = objeto.x;
        const objetoDer = objeto.x + objeto.tamañoX;
        const objetoDwn = objeto.y;
        const objetoUp = objeto.y + objeto.tamañoY;

        // Comprobar superposición horizontal
        const superposicionHorizontal = ranaDer > objetoIzq && ranaIzq < objetoDer;
        // Verificar si la rana está encima del objeto dejando un margen de 5 pixeles
        const ranaEncima = ranaUp >= objetoDwn && ranaUp <= objetoDwn + 5;

        if (superposicionHorizontal && ranaEncima) {
            colision = true;
            // Mover la rana junto al objeto
            rana.x += objeto.velocidad;
            break; // se asume que la rana solo esta en un objeto a la vez
        }
    }

    return colision;
}

function enAgua(rana){
    return (rana.y <160 && rana.y > 35);
}

function manejarColisiones () {

    if (estamosMuertos) return;

    // compruebo si la rana colisiona con algún vehículo.
    const colisionVehiculo = colision(rana ,arrayCoches) || colision(rana, arrayCamiones);

    if (colisionVehiculo) {
        rana.vidas--;
        //pintarVidas();

        if (rana.vidas <= 0) { // si la rana se queda sin vidas se acaba el juego
            estamosMuertos = true;
            reproducirAudio(audioAtropello);
            detenerJuego();
            textoGameOver();
        }
        // Si se ha producido una colisión, no es necesario comprobar lo demás 
        return;
    }

    // compruebo si la rana está sobre algún objeto que la transporte.
    const sobreObjeto = ranaSobreObjeto(rana, arrayTroncos) || ranaSobreObjeto(rana, arrayTortugas);

    // compruebo si la rana está en la zona de agua.
    if (enAgua(rana) && !sobreObjeto) {
        rana.vidas--;
        //pintarVidas();

        if (rana.vidas <= 0) {
            estamosMuertos = true;
            reproducirAudio(audioAtropello);
            detenerJuego();
            textoGameOver();
        } else {
            // Si aún le quedan vidas, se puede reiniciar la posición de la rana.
            rana.reset();
        }
    }
}

    /* if (estamosMuertos) return;

    if (colision(coche) || colision(camion)) {
        detenerJuego();
        reproducirAudio(audioAtropello);
    }

    let ranaFlotando = colision(arrayTroncos) || colision(arrayTortugas);

    if (rana.y < 160 && rana.y > 35 && !ranaFlotando) {
        rana.vidas--;
        pintarVidas();
        // este metodo meterlo en una función que maneje las vidas de la Rana rana.reset();

        if (rana.vidas <= 0 ){
            estamosMuertos = true;
            reproducirAudio(audioAtropello);
            detenerJuego();
            textoGameOver();
        }
    } */
