

window.onload = function () {

    //Constantes los topes del canvas
    const TOPEDERECHA = 600 - 32;
    const TOPEIZQUIERDA = 0;
    const TOPEARRIBA = 0;
    const TOPEABAJO = 400 - 32;

    /* const ANCHOFRAMETORTUGA = 16;   
    const ALTOFRAMETORTUGA = 16;    //tamaño del sprite
    const TOTALFRAMESTORTUGA = 5;   // total de sprites de la tortuga */

    //Variables de la animación de la tortuga
    let xTortuga = 10;             //posicion inicial en X de la Tortuga
    let yTortuga = [100, 150];      //posiciones en Y de la Tortuga

    let canvas, ctx; // variable para referenciar el canvas y el contexto de trabajo
    let xDerecha, xIzquierda, yArriba, yAbajo, idAnimacion; //variables para la dirección del personaje
    let posicion = 0, posicionTortuga = 0; //posición del array 
    let x = 1 + (Math.round(Math.random() * 569)); //posicion inicial X de la Rana
    let y = 370;                               //posicion inicial Y de la Rana
    let inicio = 0;
    let imagenRana, imagenTortuga, imagenTronco;
    let miRana, miTronco, miTortuga;
    let tortugas = [], troncos = [];

    // -------------------------------------------------
    //              R A N A
    // -------------------------------------------------

    function Rana(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.animacionRana = [[1, 1], [19, 1], [37, 1], [55, 1], [73, 1], [91, 1], [109, 1], [127, 1]];
        //                       arriba       izquierda          abajo         derecha   
        this.velocidad = 1;
        this.tamañoX = 16;
        this.tamañoY = 16;
    }

    // -------------------------------------------------
    //  GENERO LAS POSICIONES DE LA RANA
    // -------------------------------------------------

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

    Rana.prototype.pintar = function () {
        ctx.drawImage(this.imagenRana,
            this.animacionRana[posicion][0],
            this.animacionRana[posicion][1],
            this.tamañoX,
            this.tamañoY,
            this.x,
            this.y,
            this.tamañoX + 14,
            this.tamañoY + 14
        );
    }

    // -------------------------------------------------
    // 
    // -------------------------------------------------

    // -------------------------------------------------
    //               T O R T U G A 
    // -------------------------------------------------

    function Tortuga(x_, y_, velocidad_) {

        this.x = x_;
        this.y = y_;
        this.velocidad = velocidad_;
        this.acabado = false;
        this.tamañoX = 16;
        this.tamañoY = 16;
        this.animacionTortuga = [[1, 1], [19, 1], [37, 1], [55, 1], [73, 1]];

    }

    imagenTortuga = new Image();
    imagenTortuga.src = "assets/img/Tortuga.png";
    Tortuga.prototype.imagenTortuga = imagenTortuga;

    Tortuga.prototype.pintar = function () {

        ctx.drawImage(this.imagenTortuga,
            this.animacionTortuga[posicionTortuga][0],
            this.animacionTortuga[posicionTortuga][1],
            this.tamañoX,
            this.tamañoY,
            this.x,
            this.y,
            this.tamañoX + 14,
            this.tamañoY + 14
        );

    }

    Tortuga.prototype.mover = function () {git 
        this.x = this.x + this.velocidad;
    }

    Tortuga.prototype.desapareceDelMapa = function () {
        if (this.x < 500) {
            this.acabado = true;
        }
    }

    function generarTortugas() {
        //for (let i = 0; i < 2; i++) {
        let indice = Math.round(Math.random());

        /*             console.log("INDICE ", indice);*/

        let yRandom = yTortuga[indice]; //genero una posicion aleatoria entre 100 y 150 
        let velocidadTortuga = 2;

        miTortuga = new Tortuga(xTortuga, yRandom, velocidadTortuga);
        tortugas.push(miTortuga);

        //}
        //   console.table(tortugas)

    }

    function moverTortugas() {

        for (let i = 0; i < tortugas.length; i++) {


            tortugas[i].pintar();
            tortugas[i].mover();

            if (tortugas[i].desapareceDelMapa()) { //compruebo si la tortuga desaparece del mapa. Si lo hace, la quito del array
                miTortuga.acabado = true;
                tortugas.splice(i, 1);
                i--;
            }
        }
        //console.table(tortugas)

    }

    function posicionSpriteTortuga() {

        //console.log("Tortuga ", posicionTortuga);
        posicionTortuga = (posicionTortuga + 1) % 5;
    }

    // -------------------------------------------------
    //               T R O N C O S
    // -------------------------------------------------

    function Tronco(x_, y_, velocidad_) {
        this.x = x_;
        this.y = y_;
        this.velocidad = velocidad_;
        this.acabado = false;
        this.tamañoX = 44;
        this.tamañoY = 12;
        this.animacionTronco = [[5, 3]];
    }

    imagenTronco = new Image();
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
        let yRandomTronco = yPosicionTronco[Math.round(Math.random() * yPosicionTronco.length)];
        let velocidadTronco = 30;

        let miTronco = new Tronco(xTronco, yRandomTronco, velocidadTronco);
        troncos.push(miTronco);
    }


    function moverTroncos() {
        for (let i = 0; i < troncos.length; i++) {
            troncos[i].pintarTronco(ctx);
            troncos[i].moverTronco();

            if (troncos[i].desapareceDelMapa()) {
                troncos.splice(i, 1);
                i--;
                // console.log(troncos.length, "Troncos");
            }
        }
    }

    function pintarRana() {

        if (xDerecha) miRana.generaPosicionDerecha();
        if (xIzquierda) miRana.generaPosicionIzquierda();
        if (yAbajo) miRana.generaPosicionAbajo();
        if (yArriba) miRana.generaPosicionArriba();

        console.log("Rana", posicion)

        //pinto la Rana
        miRana.pintar();

    }

    function generaAnimación() {
        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);

        //Muevo los objetos
        moverTortugas();
        moverTroncos();

        //hacer la comprobacion de si nos han matado o no terminamos la partida

    }

}

function movimientoRana() {

    //animacion de la Rana

    //animacion de la Rana
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
   