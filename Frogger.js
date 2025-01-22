window.onload = function () {

    // GESTIONAR LAS VIDAS. HACER QUE SE MUEVA CON LOS TRONCOS Y TORTUGAS   

    let dificultadJuego = document.getElementById('dificultad').addEventListener('change', function () {
        dificultadJuego = this.value //actualizo la dificultad
        console.log(`Dificultad del juego: ${dificultadJuego}`);
    });                            //dificultad del juego

    function reproducirAudio(audio_) {
        audio_.currentTime = 0;
        audio_.play();
    }

    function pintarFondo(ctx_) {
        ctx_.drawImage(Fondo, 0, 0, 600, 400);
    }

    function guardarPartida(nombre, puntuacion) {
        puntuacion = obtenerTiempo();
        //obtengo el tiempo de la partida en segundos
        // Para recuperar partidas que ya existen o inicializar un array vacío si no existen
        let partida = JSON.parse(localStorage.getItem("partida")) || [];

        // Agregar la partida nueva con el nombre y la puntuación
        partida.push({ nombre, puntuacion });
        partida.sort((a, b) => b.puntuacion - a.puntuacion);

        if (partida.length > 3) partida.slice(0, 3);
        //para que salgan solo las 5 mejores

        // Guardar en LocalStorage
        localStorage.setItem("partida", JSON.stringify(partida));
    }

    function mostrarPartida() {
        let partida = JSON.parse(localStorage.getItem("partida"));
        //limpio el canvas
        ctxInfo.clearRect(0, 0, 600, 100);
        ctxInfo.fillStyle = "white";
        ctxInfo.font = "20px Tiny5";
        ctxInfo.fillText("Historial de partidas", 10, 20);
        if (partida.length === 0) {
            ctxInfo.fillText("No hay partidas", 20, 20);
        } else {
            partida.forEach((partida, index) => {
                ctxInfo.fillText(`${index + 1}. ${partida.nombre} - ${partida.puntuacion}`, 10, 40 + (index * 20));
            });
        }
    }

    function resetRecord() {
        localStorage.removeItem("partida");
        console.log("Partidas borradas");
    }

    // -------------------------------------------------
    //  FUNCION PARA PINTAR LAS VIDAS DEL JUEGO
    // -------------------------------------------------

    function pintarVidas() {
        //posicion en la que quiero que se pinten las vidas
        let x, y, tamañoImgVida = 30;
        x = 500;
        y = 10;
        ctx.clearRect(0, 0, 600, 100);
        
        for (let i = 0; i < vidas; i++) {
            // (i *(tamañoImgVida + 5)) es para que las vidas no se pinten una encima de otra
            ctxInfo.drawImage(imgVidas, x, y + (i * (tamañoImgVida + 1)), tamañoImgVida - 10, tamañoImgVida - 10);
        }
    }

    // -------------------------------------------------
    //  FUNCION PARA INICIAR LAS VARIABLES DEL JUEGO
    // -------------------------------------------------

    function inicioDeVariables() {

        //botonNuevaPartida.disabled = true;                    // deshabilito el boton de nueva partida
        //botonPausar.disabled = true;                          // deshabilito el boton de pausar
        canvas = document.getElementById('miCanvas');           // obtengo el canvas
        canvasInfo = document.getElementById('infoCanvas');     // obtengo el canvas secundario

        ctx = canvas.getContext('2d');                          // obtengo el contexto del canvas
        ctxInfo = canvasInfo.getContext('2d');                  // obtengo el contexto del canvas secundario

        arrayTortugas = [];                                   // inicializo el array de tortugas
        arrayTroncos = [];                                    // inicializo el array de troncos
        arrayCoches = [];                                     // inicializo el array de coches

        vidas = 3;
        puntuacion = 0;
        juegoPausado = false;
        estamosMuertos = false;
        rana = new Rana();                                    // creo el Objeto rana
        rana.EstadosRana = "viva";                            // inicializo el estado de la rana

    }

    // -------------------------------------------------
    //  FUNCION PARA GENERAR LOS OBJETOS DEL JUEGO
    // -------------------------------------------------

    function generaTortugas() {
        let yPosiciones = [95, 150];
        // Posiciones en las que salen las tortugas en el mapa
        let delay = 1000;

        if (contadorTortuga < 6) {

            // Calculo la posicion Y para que las tortugas salgan en las dos filas
            let yPosicion = (contadorTortuga < 3) ? yPosiciones[0] : yPosiciones[1];
            for (let i = 0; i < 3; i++) {
                //le añado un delay para que salgan las tortugas de una en una 
                //y las meto en el array de tortugas
                setTimeout(() => {
                    tortuga = new Tortuga(yPosicion);
                    arrayTortugas.push(tortuga);
                }, i * delay);

                //el delay aumenta con cada iteración del bucle
            }
            contadorTortuga += 3;
        }

        // Reinicio el contador 
        if (contadorTortuga === 6) {
            contadorTortuga = 0;
        }
        // console.table("Tortugas", arrayTortugas)
    }

    function generaTroncos() {
        let yPosiciones = [39, 70, 130];
        // Posiciones en las que salen los troncos en el mapa
        let delay = 1000;

        if (contadorTroncos < 6) {

            for (let i = 0; i < 3; i++) {
                let yPosicion = yPosiciones[i];
                setTimeout(() => {
                    tronco = new Tronco(yPosicion);
                    arrayTroncos.push(tronco);
                }, i * delay);
            }
            contadorTroncos += 3;
        }
        // console.table("TRONCOS ", arrayTroncos);
        if (contadorTroncos === 6) {
            contadorTroncos = 0;
            //reseteo el contador de troncos a 0
        }
    }

    function generaCamiones() {
        let yPosiciones = [215, 285];
        // Posiciones en las que salen los camiones en el mapa
        let delay;
        // Ajusto la salida de los camiones en función de la dificultad
        switch (dificultadJuego) {
            case "facil":
                delay = 2000;
                velocidadJuego = 2;
                break;
            case "medio":
                delay = 1000;
                velocidadJuego = 6;
                break;
            case "dificil":
                delay = 500;
                velocidadJuego = 9;
                break;
        }

        if (contadorCamion < 4) {
            let yPosicion = (contadorCamion < 2) ? yPosiciones[0] : yPosiciones[1];
            //genero los camiones de dos en dos y les añado un delay para que salgan de uno en uno
            //en las posiciones que he calculado en la linea 154
            for (let i = 0; i < 2; i++) {

                setTimeout(() => {
                    camion = new Camion(yPosicion);
                    arrayCamiones.push(camion);
                }, i * delay);
            }
            contadorCamion += 2;
        }

        if (contadorCamion === 4) {
            contadorCamion = 0;
        }
    }

    function generaCoches() {
        let yPosiciones = [245, 320];
        // Posiciones en las que salen los coches en el mapa
        let delayCoche1, delayCoche2, delayCoche3;

        switch (dificultadJuego) {
            case "facil":
                delayCoche1 = 5000;
                delayCoche2 = 6000;
                delayCoche3 = 7000;
                velocidadJuego = 2;
                break;
            case "medio":
                delayCoche1 = 2000;
                delayCoche2 = 2500;
                delayCoche3 = 3000;
                velocidadJuego = 6;
                break;
            case "dificil":
                delayCoche1 = 500;
                delayCoche2 = 1000;
                delayCoche3 = 1500;
                velocidadJuego = 9;
                break;
        }

        // Diferentes tiempos de salida para los coches en función de la dificultad
        if (contadorCoches < 3) {
            let yPosicion = (contadorCoches < 1) ? yPosiciones[0] : yPosiciones[1];

            // genero el coche 1
            setTimeout(() => {
                coche1 = new Coche(yPosicion, "coche1");
                arrayCoches.push(coche1);
            }, delayCoche1);

            // genero el coche 2
            setTimeout(() => {
                coche2 = new Coche(yPosicion, "coche2");
                arrayCoches.push(coche2);
            }, delayCoche2);

            // genero el coche 3
            setTimeout(() => {
                coche3 = new Coche(yPosicion, "coche3");
                arrayCoches.push(coche3);
            }, delayCoche3);

            contadorCoches++;
        }

        if (contadorCoches === 3) {
            contadorCoches = 0;
        }
    }

    // -------------------------------------------------
    //  FUNCION PARA MOVER LOS OBJETOS DEL JUEGO
    // -------------------------------------------------

    function muevoTortugas() {
        for (let i = 0; i < arrayTortugas.length; i++) {
            arrayTortugas[i].pintarTortuga(ctx);
            arrayTortugas[i].moverTortuga();

            if (arrayTortugas[i].desapareceDelMapa()) arrayTortugas[i].acabado = true;

        }
    }

    function muevoTroncos() {
        for (let i = 0; i < arrayTroncos.length; i++) {
            arrayTroncos[i].pintarTronco(ctx);
            arrayTroncos[i].moverTronco();

            if (arrayTroncos[i].desapareceDelMapa()) arrayTroncos[i].acabado = true;
        }
    }

    function muevoCamiones() {
        for (let i = 0; i < arrayCamiones.length; i++) {
            arrayCamiones[i].pintarCamion(ctx);
            arrayCamiones[i].moverCamion();

            if (arrayCamiones[i].desapareceDelMapa()) arrayCamiones[i].acabado = true;
        }
    }

    function muevoCoches() {
        for (let i = 0; i < arrayCoches.length; i++) {
            arrayCoches[i].pintarCoches(ctx);
            arrayCoches[i].moverCoches();

            //console.table(arrayCoches[i]);
            if (arrayCoches[i].desapareceDelMapa()) arrayCoches[i].acabado = true;
        }
    }

    function animacionRana() {
        if (rana.estado === EstadosRana.MOVIMIENTO) {
            if (xDerecha) {
                rana.inicio = 6;
                rana.generaPosicionDerecha();
                reproducirAudio(audioSaltoRana);
            }
            if (xIzquierda) {
                rana.inicio = 2;
                rana.generaPosicionIzquierda();
                reproducirAudio(audioSaltoRana);
            }
            if (yAbajo) {
                rana.inicio = 4;
                rana.generaPosicionAbajo();
                reproducirAudio(audioSaltoRana);
            }
            if (yArriba) {
                rana.inicio = 0;
                rana.generaPosicionArriba();
                reproducirAudio(audioSaltoRana);
            }
            rana.posicion = rana.inicio + (rana.posicion + 1) % 2;
        } else if (rana.estado === EstadosRana.PARADA) {
            rana.posicion = rana.inicio;
        }
    }

    // -------------------------------------------------
    //  COLISIONES DEL JUEGO
    // -------------------------------------------------
    // Tanto ajusteX como ajusteY son para que la colisión sea más precisa. Ya que ambos objetos no tienen el mismo tamaño.

    function colision(objetos, ajusteX, ajusteY) {
        let i = 0;
        let colisionDetectada = false;
      
        let rIzq = rana.x;
        let rDer = rana.x + rana.tamañoX;
        let rDown = rana.y;
        let rUp = rana.y + rana.tamañoY;
      
        do {
          if (i >= objetos.length) {
            break;
          }
      
          let oIzq = Math.round(objetos[i].x);
          let oDer = Math.round(objetos[i].x + objetos[i].tamañoX - ajusteX);
          let oDown = Math.round(objetos[i].y);
          let oUp = Math.round(objetos[i].y + objetos[i].tamañoY - ajusteY);
      
          if (
            rDer > oIzq &&
            rIzq < oDer &&
            rUp > oDown &&
            rDown < oUp
          ) {
            rana.vidas--;
            pintarVidas();
      
            /* if (rana.vidas <= 0) {
              estamosMuertos = true;
              reproducirAudio('path/to/audioAtropello.mp3');
              detenerJuego();
            } else {
                rana.reset();
            } */

            colisionDetectada = true;
          } else {
            i++;
          }
        } while (!estamosMuertos && !colisionDetectada);
      
        return colisionDetectada;
    }

    function manejarColisiones () {
        if (estamosMuertos) return;

        if (colision(arrayCoches, 20, 20) || colision(arrayCamiones, 20, 20)) {
            detenerJuego();
            reproducirAudio(audioAtropello);
        }

        let ranaFlotando = colision(arrayTroncos, 20, 20) || colision(arrayTortugas, 20, 20);

        if (rana.y < 160 && rana.y > 35 && !ranaFlotando) {
            rana.vidas--;
            pintarVidas();
            rana.reset();

            if (rana.vidas <= 0 ){
                estamosMuertos = true;
                reproducirAudio(audioAtropello);
                detenerJuego();
                textoGameOver();
            }
        }
    }

 /*    function colision(objetos, ajusteX, ajusteY) {
        let i = 0;
    
        let rIzq = rana.x;
        let rDer = rana.x + rana.tamañoX;
        let rDown = rana.y;
        let rUp = rana.y + rana.tamañoY;
    
        do {
            if (i >= objetos.length) {
                break;
            }
    
            let oIzq = Math.round(objetos[i].x);
            let oDer = Math.round(objetos[i].x + objetos[i].tamañoX - ajusteX);
            let oDown = Math.round(objetos[i].y);
            let oUp = Math.round(objetos[i].y + objetos[i].tamañoY - ajusteY);
    
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
    //esta función de colision a la que le paso un objeto, no la puedo utilizar para los coches y camiones porque no tienen el mismo
    //tamaño que las tortugas y los troncos, entonces la colision no se produce correctamente
    function colision(objeto) {
        let i = 0;
        let rIzq = rana.x;
        let rDer = rana.x + rana.tamañoX;
        let rDown = rana.y;
        let rUp = rana.y + rana.tamañoY;

        do {
            if (i >= objeto.length) {
                break;
            }

            let oIzq = Math.round(objeto.x);
            let oDer = Math.round(objeto.x + objeto.tamañoX - 20);
            let oDown = Math.round(objeto.y);
            let oUp = Math.round(objeto.y + objeto.tamañoY - 20);

            if ((rDer > oIzq) &&
                (rIzq < oDer) &&
                (rUp > oDown) &&
                (rDown < oUp)) {

                rana.y = objeto.y;
                rana.x += (objeto.velocidadTronco || objeto.velocidadTortuga) * velocidadJuego;
                //actualizo la posición de la rana para que se mueva con el tronco/tortuga

                return true;
            } else {
                i++;

            }
        } while (!estamosMuertos);

        return false;
    }

    function colisionAgua() {
        // si la rana se encuentra en estas posiciones que es la zona del agua
        if (rana.y < 160 && rana.y > 35) {
            rana.EstadosRana = "muerta";
            let estaAsalvo = false;
            let i = 0;

            do {
                if (i >= arrayTroncos.length) {
                    break;
                }
                if (colision(arrayTroncos[i])) {
                    estaAsalvo = true;
                    rana.EstadosRana = "viva";
                    break; // Si hay colisión, no seguimos comprobando
                }
                i++;
            } while (!estamosMuertos);

            // Si no se salvó con un tronco, comprobamos las tortugas
            let j = 0;
            if (!estaAsalvo) {
                do {
                    if (j >= arrayTortugas.length) {
                        break;
                    }
                    if (colision(arrayTortugas[j])) {
                        estaAsalvo = true;
                        rana.EstadosRana = "viva";
                        break; // Si hay colisión, no seguimos comprobando
                    }
                    j++;
                } while (!estaAsalvo);
            }
            // Si ha pasado por esa posición y no ha habido ninguna colisión con algun tronco la rana muere
            if (!estaAsalvo) {
                rana.EstadosRana = "muerta";
                estamosMuertos = true;
            } else {
                rana.EstadosRana = "viva";
                estamosMuertos = false;
            }
        }
    } */


    function generaAnimacionRana() {
        //pinto el mapa del juego
        pintarFondo(ctx);

        //Muevo los objetos del juego (troncos, tortugas y coches)
        rana.pintar(ctx);

        manejarColisiones();
    }

    // -------------------------------------------------
    //  MANEJADOR DE EVENTOS PARA EL TECLADO
    // -------------------------------------------------

    function activaMovimiento(evt) {

        switch (evt.keyCode) {
            // Right arrow.
            case 39: xDerecha = true; rana.estado = EstadosRana.MOVIMIENTO; break;
            // Left arrow
            case 37: xIzquierda = true; rana.estado = EstadosRana.MOVIMIENTO; break;
            // Up arrow
            case 38: yArriba = true; rana.estado = EstadosRana.MOVIMIENTO; break;
            // Down arrow
            case 40: yAbajo = true; rana.estado = EstadosRana.MOVIMIENTO; break;
        }
        animacionRana();

    }

    function desactivaMovimiento(evt) {

        switch (evt.keyCode) {

            // Right arrow.
            case 39: xDerecha = false; break;
            // Left arrow
            case 37: xIzquierda = false; break;
            // Up arrow
            case 38: yArriba = false; break;
            // Down arrow
            case 40: yAbajo = false; break;
        }

        if (!xDerecha && !xIzquierda && !yArriba && !yAbajo) {
            rana.estado = EstadosRana.PARADA;
        }
        // si la rana no se mueve la pongo en la posicion de inicial
        // como si estuviera parada

    }

    // -------------------------------------------------
    //  FUNCION PARA PAUSAR EL JUEGO
    // -------------------------------------------------

    function pausarPartida() {
        juegoPausado = true;
        limpiarIntervalos();
        botonNuevaPartida.disabled = false;
        botonPausar.disabled = true;
        botonReanudar.disabled = false;

        ctxInfo.fillStyle = "#33cc00";
        ctxInfo.font = "40px Tiny5";
        ctxInfo.fillText("PAUSA", 600 / 2 - 80, 100 / 2);

    }

    // -------------------------------------------------
    //  FUNCION PARA REINICIAR EL JUEGO
    // -------------------------------------------------

    function reiniciarJuego() {
        console.log("REINICIANDO JUEGO ...");
        juegoPausado = false;
        ctx.clearRect(0, 0, 600, 400);
        ctxInfo.clearRect(0, 0, 600, 100);

        rana = new Rana();
        inicioDeVariables();

        idAnimacion = setInterval(generaAnimacionRana, 1000 / 20);
        idRana = setInterval(animacionRana, 1000 / 20);

        //genero los elementos de la pantalla 
        idGeneraTortugas = setInterval(generaTortugas, 3000);
        idTortuga = setInterval(muevoTortugas, 1000 / 20);

        idGeneraTroncos = setInterval(generaTroncos, 3000);
        idTronco = setInterval(muevoTroncos, 1000 / 20);

        idGeneraCamiones = setInterval(generaCamiones, 7000);
        idCamion = setInterval(muevoCamiones, 1000 / 20);

        idGeneraCoches = setInterval(generaCoches, 5800);
        idCoches = setInterval(muevoCoches, 1000 / 20);
    }

    // -------------------------------------------------
    //  FUNCION PARA COMENZAR EL JUEGO
    // -------------------------------------------------

    function comenzarJuego() {
        console.log("COMENZANDO JUEGO ...");

        botonNuevaPartida.disabled = true;
        botonPausar.disabled = false;
        botonReanudar.disabled = false;

        switch (dificultadJuego) {
            case "facil":
                dificultadJuego = "facil";
                break;
            case "medio":
                dificultadJuego = "medio";
                break;
            case "dificil":
                dificultadJuego = "dificil";
                break;
        }

        limpiarIntervalos();
        inicioDeVariables();

        ctx.clearRect(0, 0, 600, 400);
        ctxInfo.clearRect(0, 0, 600, 100);

        // Para la gestion de la puntuación que será por tiempo
        tiempoInicio = Date.now();

        idAnimacion = setInterval(generaAnimacionRana, 1000 / 20);
        idRana = setInterval(animacionRana, 1000 / 20);

        //genero los elementos de la pantalla 
        idGeneraTortugas = setInterval(generaTortugas, 3000);
        idTortuga = setInterval(muevoTortugas, 1000 / 20);

        idGeneraTroncos = setInterval(generaTroncos, 3000);
        idTronco = setInterval(muevoTroncos, 1000 / 20);

        idGeneraCamiones = setInterval(generaCamiones, 3000);
        idCamion = setInterval(muevoCamiones, 1000 / 20);

        idGeneraCoches = setInterval(generaCoches, 3000);
        idCoches = setInterval(muevoCoches, 1000 / 20);

        pintarVidas();
        // Evento para saber cuando se presiona una tecla
        document.addEventListener("keydown", activaMovimiento, false);
        document.addEventListener("keyup", desactivaMovimiento, false);
    }

    function textoGameOver() {
        ctxInfo.fillStyle = "#33cc00";
        ctxInfo.font = "40px Tiny5";
        ctxInfo.fillText("GAME  OVER", 600 / 2 - 100, 100 / 2);
    }

    function detenerJuego() {
        textoGameOver();
        botonReanudar.disabled = true;
        botonPausar.disabled = true;
        botonNuevaPartida.disabled = false;

        //para que se muestre primero el GAME OVER y
        //despues la puntuacion con cierto retraso
        setTimeout(() => {
            guardarPartida(nombre, puntuacion);
            mostrarPartida();
            limpiarIntervalos();
        }, 250);
    }

    function limpiarIntervalos() {
        clearInterval(idRana);
        clearInterval(idAnimacion);
        clearInterval(idGeneraTortugas);
        clearInterval(idTortuga);
        clearInterval(idGeneraTroncos);
        clearInterval(idTronco);
        clearInterval(idGeneraCamiones);
        clearInterval(idCamion);
        clearInterval(idGeneraCoches);
        clearInterval(idCoches);
    }

    // ------------------------
    //  PUNTUACIÓN
    // ------------------------

    function obtenerTiempo() {
        tiempoFinal = Date.now();
        tiempoTotal = (tiempoFinal - tiempoInicio) / 1000; // tiempo en segundos

        return tiempoTotal.toFixed(2); //redondeo a dos decimales
    }

    // ------------------------
    //  BOTONES
    // ------------------------
    botonNuevaPartida = document.getElementById("nuevaPartida");
    botonNuevaPartida.onclick = comenzarJuego;

    botonPausar = document.getElementById("pausaPartida");
    botonPausar.onclick = pausarPartida;

    botonReset = document.getElementById("reset");
    botonReset.addEventListener("click", resetRecord);

    botonReanudar = document.getElementById("reinicioPartida");
    botonReanudar.onclick = reiniciarJuego;
}