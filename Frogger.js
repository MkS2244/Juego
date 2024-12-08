window.onload = function () {
    // -------------------------------------------------
    //  VARIABLES Y CONSTANTES 
    // -------------------------------------------------

    let xDerecha, xIzquierda, yArriba, yAbajo;      //variables de movimiento

    let rana;                                       // Objeto rana
    let tortuga;                                    // Objeto tortuga
    let tronco;                                     // Objeto tronco
    let coche;                                      // Objeto coche

    let arrayTortugas = [];                         // Array de tortugas
    let arrayTroncos = [];                          // Array de troncos
    let arrayCoches = [];                           // Array de coches

    let botonNuevaPartida;                          // Boton para nueva partida
    let botonPausar;                                // Boton para pausar el juego
    let botonReanudar;                              // Boton para reanudar el juego

    //let puntuacion;                                 // Puntuacion del juego

    function reproducirAudio(audio_) {
        audio_.currentTime = 0;
        audio_.play();
    }

    function pintarFondo(ctx_) {
        ctx_.drawImage(Fondo, 0, 0, 600, 400);
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

        rana = new Rana();                                    // creo el Objeto rana
    }

    function generaTortugas() {
        let yPosiciones = [90, 150];
        let delay = 1000;

        if (contadorTortuga < 6) {

            // Calculo la posicion Y para que las tortugas salgan en dos filas
            let yPosicion = (contadorTortuga < 3) ? yPosiciones[0] : yPosiciones[1];
            for (let i = 0; i < 3; i++) {

                setTimeout(() => {
                    tortuga = new Tortuga(yPosicion);
                    arrayTortugas.push(tortuga);
                }, i * delay);

                //el delay aumenta con cada iteración del bucle
            }
            contadorTortuga+=3;
        }

        // Reinicio el contador 
        if (contadorTortuga === 6) {
            contadorTortuga = 0;
        }
        console.table("Tortugas", arrayTortugas)
    }

    function muevoTortugas() {
        for (let i = 0; i < arrayTortugas.length; i++) {
            arrayTortugas[i].pintarTortuga(ctx);
            arrayTortugas[i].mover();

            if (!arrayTortugas[i].desapareceDelMapa()) arrayTortugas[i].acabado = true;

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
    //  FUNCION PARA GENERAR LA ANIMACION DEL JUEGO
    // -------------------------------------------------

    function generaAnimacion() {

        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);

        //pinto el mapa del juego
        pintarFondo(ctx);

        //Muevo los objetos del juego (troncos, tortugas y coches)
        rana.pintar(ctx);

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

        if (!xDerecha && !xIzquierda && !yArriba && !yAbajo) rana.estado = EstadosRana.PARADA; rana.estado = rana.inicio;
        // si la rana no se mueve la pongo en la posicion de inicio

    }

    // -------------------------------------------------
    //  FUNCION PARA PAUSAR EL JUEGO
    // -------------------------------------------------

    function pausarPartida() {
        juegoPausado = !juegoPausado;

        if (juegoPausado) {
            clearInterval(idRana);
            ctxInfo.fillStyle = "white";
            ctxInfo.font = "20px Arial";
            ctxInfo.fillText("Juego Pausado", 150 / 2 - 70, 400 / 2);

        }

    }

    // -------------------------------------------------
    //  FUNCION PARA REANUDAR EL JUEGO
    // -------------------------------------------------

    /*     function reanudarPartida() {
    
            if (juegoPausado) {
                juegoPausado = false;
                idRana = setInterval(animacionRana, 50 / 1000);
                idAnimacion = setInterval(generaAnimacion, 50 / 1000); // Reanuda la animación del juego
                botonPausar.disabled = false;
                botonReanudar.disabled = true;
                botonNuevaPartida.disabled = false;
    
            }
        } */

    // -------------------------------------------------
    //  FUNCION PARA COMENZAR EL JUEGO
    // -------------------------------------------------
    function comenzarJuego() {
        botonNuevaPartida.disabled = true;
        botonPausar.disabled = false;
        /* botonReanudar.disabled = false; */

        inicioDeVariables();

        idAnimacion = setInterval(generaAnimacion, 1000 / 20);
        idRana = setInterval(animacionRana, 1000 / 20);

        //genero los elementos de la pantalla 
        idGeneraTortugas= setInterval (generaTortugas, 2000);
        idTortuga = setInterval(muevoTortugas, 1000 / 20);


        // Evento para saber cuando se presiona una tecla
        document.addEventListener("keydown", activaMovimiento, false);
        document.addEventListener("keyup", desactivaMovimiento, false);
    }

    // ------------------------
    //  BOTONES
    // ------------------------

    botonNuevaPartida = document.getElementById("nuevaPartida");
    botonNuevaPartida.onclick = comenzarJuego;

    botonPausar = document.getElementById("pausaPartida");
    botonPausar.onclick = pausarPartida;

    /*     botonReanudar = document.getElementById("reanudarPartida");
        botonReanudar.onclick = reanudarPartida;
     */

}