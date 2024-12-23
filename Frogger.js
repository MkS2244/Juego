window.onload = function () {
    // -------------------------------------------------
    //  VARIABLES Y CONSTANTES 
    // -------------------------------------------------
    let nombre = prompt("Introduce tu nombre:");

    let xDerecha, xIzquierda, yArriba, yAbajo;      //variables de movimiento

    let rana;                                       // Objeto rana
    let tortuga;                                    // Objeto tortuga
    let tronco;                                     // Objeto tronco
    let coche1;                                      // Objeto coche1
    let coche2;                                      // Objeto coche2
    let coche3;                                      // Objeto coche3
    let camion;                                     // Objeto camion

    let arrayTortugas = [];                         // Array de tortugas
    let arrayTroncos = [];                          // Array de troncos
    let arrayCoches = [];                           // Array de coches
    let arrayCamiones = [];                         // Array de camiones

    let botonNuevaPartida;                          // Boton para nueva partida
    let botonPausar;                                // Boton para pausar el juego
    let botonReanudar;                              // Boton para reanudar el juego

    let puntuacion;                                 // Puntuacion del juego

    function reproducirAudio(audio_) {
        audio_.currentTime = 0;
        audio_.play();
    }

    function pintarFondo(ctx_) {
        ctx_.drawImage(Fondo, 0, 0, 600, 400);
    }


    function guardarPartida(nombre, puntuacion) {
        puntuacion = obtenerTiempo();
        //obtengo el tiempo de la partida 

        // Para recuperar partidas que ya existen o inicializar un array vacío si no existen
        let partida = JSON.parse(localStorage.getItem("partida")) || [];
        // Agregar la partida nueva con el nombre y la puntuación
        partida.push({ nombre, puntuacion });
        records.sort((a, b) => b.puntuacion - a.puntuacion);
        // Guardar en LocalStorage
        localStorage.setItem("partida", JSON.stringify(partida));
    }

    function mostrarPartida(ctxInfo_) {
        let partida = JSON.parse(localStorage.getItem("partida")) || [];
        //limpio el canvas
        ctxInfo_.clearRect(0, 0, 600, 100);
        ctxInfo_.fillStyle = "white";
        ctxInfo_.font = "20px Tiny5";

        ctxInfo_.fillText("Historial de partidas", 10, 20);

        // 
        partida.slice(0, 5).forEach((partida, index) => {
            ctxInfo_.fillText(`${index + 1}. ${partida.nombre} - ${partida.puntuacion}`, 10, 40 + (index * 20));
        });
    }

    function resetRecord(){
        localStorage.removeItem("partida");
        console.log("Partidas borradas");
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
        let yPosiciones = [95, 150];
        // Posiciones en las que salen las tortugas en el mapa
        let delay = 1000;

        if (contadorTortuga < 6) {

            // Calculo la posicion Y para que las tortugas salgan en las dos filas
            let yPosicion = (contadorTortuga < 3) ? yPosiciones[0] : yPosiciones[1];
            for (let i = 0; i < 3; i++) {

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
        }
    }

    function generaCamiones() {
        let yPosiciones = [215, 285];
        // Posiciones en las que salen los camiones en el mapa
        let delay = 8000;

        if (contadorCamion < 4) {
            let yPosicion = (contadorCamion < 2) ? yPosiciones[0] : yPosiciones[1];

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
        let delayCoche1 = 5500;
        let delayCoche2 = 3500;
        let delayCoche3 = 1500;

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

            /*             
                        for (let i = 0 ; i < 1 ; i++){
                            setTimeout(() => {
                                coche1 = new Coche (yPosicion, "coche1");
                                arrayCoches.push(coche1);
                            }, i * delayCoche1);
                        }
                        // genero el coche 2
                        for (let i = 0 ; i < 1 ; i++){
                            setTimeout(() => {
                                coche2 = new Coche (yPosicion, "coche2");
                                arrayCoches.push(coche2);
                            }, i * delayCoche2);
                        }
                        // genero el coche 3
                        for (let i = 0 ; i < 1 ; i++){
                            setTimeout(() => {
                                coche3 = new Coche (yPosicion, "coche3");
                                arrayCoches.push(coche3);
                            }, i * delayCoche3);
                        } */

            contadorCoches++;
        }

        if (contadorCoches === 3) {
            contadorCoches = 0;
        }
    }

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

    function ranaMuerta() {
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
                estamosMuertos = true;
            } else {
                i++;
            }
        } while (!estamosMuertos);

        return estamosMuertos;
    }

    // -------------------------------------------------
    //  FUNCION PARA GENERAR LA ANIMACION DEL JUEGO
    // -------------------------------------------------

    function generaAnimacionRana() {

        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);
        ctxInfo.clearRect(0, 0, 600, 100);
        //pinto el mapa del juego
        pintarFondo(ctx);

        //Muevo los objetos del juego (troncos, tortugas y coches)
        rana.pintar(ctx);

        if (ranaMuerta()) {
            console.log("Partida terminada");
            detenerJuego();
            textoGameOver();
            
            
            botonNuevaPartida.disabled = false;
            botonPausar.disabled = true;

        }
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
            ctxInfo.font = "20px Tiny5";
            ctxInfo.fillText("Juego Pausado", 600 / 2 - 100, 100 / 2);

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
        }
     */

    // -------------------------------------------------
    //  FUNCION PARA COMENZAR EL JUEGO
    // -------------------------------------------------

    function comenzarJuego() {
        botonNuevaPartida.disabled = true;
        botonPausar.disabled = false;
        /* botonReanudar.disabled = false; */

        inicioDeVariables();
        // Para la gestion de la puntuación que será por tiempo
        let tiempoInicio = Date.now();

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
        //para que se muestre primero el GAME OVER y despues la puntuacion
        setTimeout(() => {
            guardarPartida(nombre, puntuacion);
            mostrarPartida(ctxInfo);

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
        }, 2000);
    }
    // ------------------------
    //  PUNTUACIÓN
    // ------------------------

    function obtenerTiempo(){
        let tiempoFinal = Date.now();
        let tiempoTotal = (tiempoFinal - tiempoInicio) / 1000; // tiempo en segundos

        return tiempoTotal.toFixed(2); //redondeo a dos decimales
    }
    // ------------------------
    //  BOTONES
    // ------------------------

    botonNuevaPartida = document.getElementById("nuevaPartida");
    botonNuevaPartida.onclick = comenzarJuego;

    botonPausar = document.getElementById("pausaPartida");
    botonPausar.onclick = pausarPartida;

    botonReset = document.getElementById("reset").addEventListener("click", function(){
        resetRecord();
    });

    /*     botonReanudar = document.getElementById("reanudarPartida");
        botonReanudar.onclick = reanudarPartida;
     */

}