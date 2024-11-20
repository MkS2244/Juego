

window.onload = function () {

    //defino como constantes los topes del canvas
    const TOPEDERECHA = 600 - 32;
    const TOPEIZQUIERDA = 0;
    const TOPEARRIBA = 0;
    const TOPEABAJO = 400 - 32;
    
    const ANCHOFRAMETORTUGA = 16;   
    const ALTOFRAMETORTUGA = 16;    //tamaño del sprite
    const TOTALFRAMESTORTUGA = 5;   // total de sprites de la tortuga

//Variables de la animación de la tortuga
    let frameActualTortuga = 0;
    let xTortuga = 100; //posicion inicial en x
    let yTortuga = 150; //posicion inicial en y

    let canvas, ctx; // variable para referenciar el canvas y el contexto de trabajo
    let xDerecha, xIzquierda, yArriba, yAbajo, idAnimacion; //variables para la dirección del personaje
    let posicion = 0; //posición del array 
    let x = 0;    //posicion inicial x
    let y = 0;    //posicion inicial y
    let inicio = 0;
    let imagenRana;
    let miRana, miTronco, miTortuga;
    let tortugas = [] , troncos= [];

    // -------------------------------------------------
    //              R A N A
    // -------------------------------------------------

    function Rana(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.animacionRana = [[1, 1], [18, 1], [37, 1], [55, 1], [73, 1], [91, 1], [109, 1], [127, 1]];
        //                       arriba       izquierda          abajo         derecha   
        this.velocidad = 1;
        this.tamañoX = 16;
        this.tamañoY = 16;
    }

    // ---------    GENERAR LAS POSICIONES -----------
    Rana.prototype.generaPosicionDerecha = function () {
        this.x = this.x + this.velocidad;

        if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;
    }

    Rana.prototype.generaPosicionIzquierda = function () {

        this.x = this.x - this.velocidad;

        if (this.x < TOPEIZQUIERDA) {
            this.x = TOPEIZQUIERDA;
        }
    }

    Rana.prototype.generaPosicionArriba = function () {
        this.y = this.y - this.velocidad;

        if (this.y < TOPEARRIBA) {
            this.y = TOPEARRIBA;
        }
    }

    Rana.prototype.generaPosicionAbajo = function () {
        this.y = this.y + this.velocidad;
        if (this.y > TOPEABAJO) {
            this.y = TOPEABAJO;
        }
    }

    // -------------------------------------------------
    //               T O R T U G A 
    // -------------------------------------------------

    function Tortuga(x_, y_, velocidad_, acabado_) {

        this.x = x_;
        this.y = y_;
        this.velocidad = velocidad_;
        this.acabado = acabado_;
        this.tamañoX = 16;
        this.tamañoY = 16;
        this.animacionTortuga = [[1,1],[19,1],[37,1],[55,1],[73,1]];
        this.posicion = 0;
    }

    imagenTortuga = new Image();
    imagenTortuga.src = "assets/img/Tortuga.png";
    Tortuga.prototype.imagenTortuga = imagenTortuga;

    Tortuga.prototype.pintarTortuga = function (ctx_) {
        ctx_.drawImage(this.imagenTronco, this.x, this.y);
    }

    Tortuga.prototype.mover = function () {
        this.x = this.x + this.velocidad;
    }
    Tortuga.prototype.desapareceDelMapa = function () {
        if (this.x < 500) {
            this.acabado = true;
        }
    }

    function generarTortugas() {

        for (let i = 0; i < 2; i++) {
            let xInicioTortuga = -40;
            let yPosicionTortuga = [100, 150];
            let yRandom = yPosicionTortuga[Math.floor(Math.random() * yPosicionTortuga.length)];
            let velocidadTortuga = 0.2;

            miTortuga = new Tortuga(xInicioTortuga, yRandom, velocidadTortuga, false);
            tortugas.push(miTortuga);
        }

    }

    function moverTortugas() {
        /* for (let i = 0; i < tortugas.length; i++) {
            tortugas[i].pintarTortuga(ctx);
            tortugas[i].mover();
            if (tortugas[i].desapareceDelMapa()) {
                tortugas.splice(i, 1);
                i--;
                console.log(tortugas[i].length, "tortugas"); 
            }
        } */
        
    }

    function animarTortuga (){
        //limpiar canvas 
        ctx.clearRect(0,0,600,400);

        //dibujar la tortuga animada
        ctx.drawImage(this.imagenTortuga,
            this.animacionTortuga[miTortuga.posicion][0],
            this.animacionTortuga[miTortuga.posicion][1],
            this.tamañoX,
            this.tamañoY,
            this.x,
            this.y,
            this.tamañoX+14,
            this.tamañoY+14
        );

        
        
    }

    // -------------------------------------------------
    //               T R O N C O S
    // -------------------------------------------------
    function Tronco(x_, y_, velocidad_, acabado_) {
        this.x = x_;
        this.y = y_;
        this.velocidad = velocidad_;
        this.acabado = acabado_;
        this.tamañoX = 44;
        this.tamañoY = 12;
        this.animacionTronco = [[5,3]];
    }

    let imagenTronco = new Image();
    imagenTronco.src = "assets/img/Tronco.png";
    Tronco.prototype.imagenTronco = imagenTronco;

    Tronco.prototype.pintarTronco = function (ctx) {
        ctx.drawImage(this.imagenTronco, this.x, this.y);
    }

    Tronco.prototype.moverTronco = function () {
        this.x = this.x - this.velocidad;
    }

    Tronco.prototype.desapareceDelMapa = function () {
        return this.x < 0;
    }

    function generarTroncos() {
        let xTronco = 650;
        let yPosicionTronco = [90, 125];
        let yRandomTronco = yPosicionTronco[Math.floor(Math.random() * yPosicionTronco.length)];
        let velocidadTronco = 0.2;

        let miTronco = new Tronco(xTronco, yRandomTronco, velocidadTronco, false);
        troncos.push(miTronco);
    }


    function moverTroncos() {
        for (let i = 0; i < troncos.length; i++) {
            troncos[i].pintarTronco(ctx);
            troncos[i].moverTronco();

            if (troncos[i].desapareceDelMapa()) {
                troncos.splice(i, 1);
                i--;
                console.log(troncos.length, "Troncos");
            }
        }
    }

    // ------------ PINTAR EN EL CANVAS -------------

    function pintarRana() {
        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);

        if (xDerecha) miRana.generaPosicionDerecha();
        if (xIzquierda) miRana.generaPosicionIzquierda();
        if (yAbajo) miRana.generaPosicionAbajo();
        if (yArriba) miRana.generaPosicionArriba();


        console.log(posicion)

        //pinto la Rana
        ctx.drawImage(
            miRana.imagenRana, //imagen completa 
            miRana.animacionRana[posicion][0],
            miRana.animacionRana[posicion][1],
            miRana.tamañoX, // tamaño de recorte del eje X
            miRana.tamañoY, //tamaño de recorte del eje y
            miRana.x,   //posicion X
            miRana.y,   //posicion Y
            miRana.tamañoX + 14, // le sumo 16 para hacer la rana mas grande
            miRana.tamañoY + 14
        );


        //--------------------- MOVER LAS TORTUGAS 
        moverTortugas();
        moverTroncos();
        animarTortuga();   
    }

/*     function generaAnimación() {
        ctx.clearRect(0, 0, 600, 400);

        //Muevo los objetos
        moverTortugas();
        moverTroncos();
        movimientoRana();

        //hacer la comprobacion de si nos han matado o no terminamos la partida
        
    } */

    function movimientoRana() {
        if (xDerecha) inicio = 6;
        if (xIzquierda) inicio = 2;
        if (yAbajo) inicio = 4;
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

    //    localizo el canvas y genero contexto de trabajo 
    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    imagenRana = new Image();
    imagenRana.src = "assets/img/Rana.png";
    Rana.prototype.imagenRana = imagenRana;

    //creo un objeto de Rana
    miRana = new Rana(x, y);

    //  Lanzo la animación
    idAnimacion = setInterval(pintarRana, 24 / 1000);

    //  Animación encargada de hacer el movimiento de la Rana
    //let idMovimiento = setInterval(movimientoRana, 1000);


    let idTortugas = setInterval(generarTortugas, 3000);
    let idAnimarTortugas = setInterval(animarTortuga,3000);
    let idTroncos = setInterval(generarTroncos, 3000);
}   
