window.onload = function () {

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
        let x = 500, y = 10, tamañoImgVida = 33, separacion = 5;
        ctxInfo.clearRect(0, 0, 600, 100);

        for (let i = 0; i < vidas; i++) {
            // aumenta la X en cada iteracion para que se pinten las vidas
            ctxInfo.drawImage(
                imgVidas, 
                x + (i * (tamañoImgVida -10 + separacion)),
                y, 
                tamañoImgVida - 10,
                tamañoImgVida - 10
            );
        }
    }
    

    function perderVida() {
        if (vidas > 0) {
            vidas--; // Restar 1 al número (no usar pop())
            pintarVidas();
    
            if (vidas === 0) {
                estamosMuertos = true;
                reproducirAudio(audioAtropello);
                textoGameOver();
                detenerJuego();
            }
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

        arrayCoches = [];                                     // inicializo el array de coches
        arrayCamiones = [];                                   // inicializo el array de camiones

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


    function generaCamiones() {
        let yPosiciones = [285, 215, 150, 80];
        // Posiciones en las que salen los camiones en el mapa
        let delay;
        // Ajusto la salida de los camiones en función de la dificultad
        if (contadorCamion < 4) {       
            switch (dificultadJuego) {
                case "facil":
                    delay = 1000;
                    velocidadJuego = 3;
                    break;
                case "medio":
                    delay = 500;
                    velocidadJuego = 8;
                    break;
                case "dificil":
                    delay = 250;
                    velocidadJuego = 11;
                    break;
            }

            for (let i = 0; i < 2; i++) {
                let yPosicion = yPosiciones[contadorCamion + i];

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
        /* let yPosiciones = [39, 70, 130 ,245, 320]; */
        let yPosiciones = [320, 245, 115, 39];
        let delayC1, delayC2, delayC3;

        if (contadorCoches < 4) {
            let yPosicion = yPosiciones[contadorCoches];

            switch (dificultadJuego) {
                case "facil":
                    delayC1 = 2000;
                    delayC2 = 2500;
                    delayC3 = 3000;
                    velocidadJuego = 3;
                    break;
                case "medio":
                    delayC1 = 1000;
                    delayC2 = 1500;
                    delayC3 = 2000;
                    velocidadJuego = 8;
                    break;
                case "dificil":
                    delayC1 = 500;
                    delayC2 = 1000;
                    delayC3 = 1500;
                    velocidadJuego = 11;
                    break;
            }

            // genero el coche 1
            setTimeout(() => {
                coche = new Coche(yPosicion, "coche1");
                arrayCoches.push(coche);
            }, delayC1);

            // genero el coche 2
            setTimeout(() => {
                coche = new Coche(yPosicion, "coche2");
                arrayCoches.push(coche);
            }, delayC2);

            // genero el coche 3
            setTimeout(() => {
                coche = new Coche(yPosicion, "coche3");
                arrayCoches.push(coche);
            }, delayC3);

            contadorCoches++;
        }

        if (contadorCoches === 4) {
            contadorCoches = 0;
        }

    }

    // -------------------------------------------------
    //  FUNCION PARA MOVER LOS OBJETOS DEL JUEGO
    // -------------------------------------------------

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
    //  FUNCION QUE COMPRUEBA SI LA RANA GANA
    // -------------------------------------------------

    function haGanado(rana) {
        if (rana.y <= 0) {
            console.log("HAS GANADO");
            puntuacion = obtenerTiempo();
            guardarPartida(nombre, puntuacion);
            mostrarPartida();
            limpiarIntervalos();

            botonReanudar.disabled = true;
            botonNuevaPartida.disabled = false;
            botonPausar.disabled = true;
            botonReset.disabled = true;

            ctxInfo.fillStyle = "#33cc00";
            ctxInfo.font = "40px Tiny5";
            ctxInfo.fillText("YOU WIN!", 600 / 2 - 100, 100 / 2);
        }
    }

    function generaAnimacionRana() {
        //pinto el mapa del juego y la rana
        pintarFondo(ctx);
        rana.pintar(ctx);

        //compruebo si la rana ha ganado
        haGanado(rana);

        //compruebo si la rana ha colisionado con algún objeto
        arrayCamiones.forEach((camion) => {

            if (colision(rana, camion, 25)) {
                perderVida();
                // si la rana colisiona con algún objeto pierde una vida
                // y se vuelve a poner en la posición inicial
                rana.reset();
                reproducirAudio(audioAtropello);
            }
        });

        arrayCoches.forEach((coche) => {

            if (colision(rana, coche, 20)) {
                perderVida();
                // si la rana colisiona con algún objeto pierde una vida
                // y se vuelve a poner en la posición inicial
                rana.reset();
                reproducirAudio(audioAtropello);
            }
        });

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
        botonReset.disabled = false;

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
        
        pintarVidas();
        // Para la gestion de la puntuación que será por tiempo
        tiempoInicio = Date.now();

        idAnimacion = setInterval(generaAnimacionRana, 1000 / 20);
        idRana = setInterval(animacionRana, 1000 / 20);

        //genero los elementos de la pantalla 

        idGeneraCamiones = setInterval(generaCamiones, 2000);
        idCamion = setInterval(muevoCamiones, 1000 / 20);

        idGeneraCoches = setInterval(generaCoches, 2000);
        idCoches = setInterval(muevoCoches, 1000 / 20);

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