    // -------------------------------------------------
    //  COLISIONES DEL JUEGO
    // -------------------------------------------------

    function colisionCoche() {
        let i = 0;

        let rIzq = rana.x;
        let rDer = rana.x + rana.tamañoX;
        let rDown = rana.y;
        let rUp = rana.y + rana.tamañoY;

        do {
            if (i >= arrayCoches.length) {
                break;
            }
            let oIzq = Math.round(arrayCoches[i].x);
            let oDer = Math.round(arrayCoches[i].x + arrayCoches[i].tamañoX - 20);
            let oDown = Math.round(arrayCoches[i].y);
            let oUp = Math.round(arrayCoches[i].y + arrayCoches[i].tamañoY - 20);

            if ((rDer > oIzq) &&
                (rIzq < oDer) &&
                (rUp > oDown) &&
                (rDown < oUp)) {
                vidas--;
                pintarVidas();

                if (vidas <= 0) {
                    estamosMuertos = true;
                    reproducirAudio(audioAtropello);
                    detenerJuego();
                }
            } else {
                i++;
            }
        } while (!estamosMuertos);

        return estamosMuertos;
    }

    function colisionCamion() {
        let i = 0;
        let rIzq = rana.x;
        let rDer = rana.x + rana.tamañoX;
        let rDown = rana.y;
        let rUp = rana.y + rana.tamañoY;

        do {
            if (i >= arrayCamiones.length) {
                break;
            }

            let oIzq = Math.round(arrayCamiones[i].x);
            let oDer = Math.round(arrayCamiones[i].x + arrayCamiones[i].tamañoX - 25);
            let oDown = Math.round(arrayCamiones[i].y);
            let oUp = Math.round(arrayCamiones[i].y + arrayCamiones[i].tamañoY - 25);

            if ((rDer > oIzq) &&
                (rIzq < oDer) &&
                (rUp > oDown) &&
                (rDown < oUp)) {
                vidas--;
                pintarVidas();

                if (vidas <= 0) {
                    estamosMuertos = true;
                    reproducirAudio(audioAtropello);
                    detenerJuego();
                }
            } else {
                i++;
            }
        } while (!estamosMuertos);

        return estamosMuertos;
    }