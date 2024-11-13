window.onload = function () {
    //defino como constantes los topes del canvas
    const TOPEDERECHA = 575;
    const TOPEIZQUIERDA = 0;
    const TOPEARRIBA = 0;
    const TOPEABAJO = 575;
    
    let canvas, ctx; // variable para referenciar el canvas y el contexto de trabajo
    let xDerecha, xIzquierda, yArriba, yAbajo, idAnimacion; //variables para la dirección del personaje
    let posicion = 0; //posición del array 
    let x=0;    //posicion inicial x
    let y=0;    //posicion inicial y
    let inicio = 0;
    let imagenRana;
    let miRana;

    function Rana(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.animacionRana = [[1,1], [17,1],[19,1],[35, 1], [37, 1],[53, 1],[55, 1],[71, 1], [73,1],[89,1],[91,1],[107,1], [109,1],[125,1],[127,1],[143,1]];
        //                            arriba                          izquierda                      abajo                         derecha   
        this.velocidad = 1;
        this.tamañoX = 16;
        this.tamañoY = 16;
    }


// --------------------------    GENERAR LAS POSICIONES ------------------------------
Rana.prototype.generaPosicionDerecha = function () {
    this.x = this.x + this.velocidad;

    if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;
}

Rana.prototype.generaPosicionIzquierda = function (){

    this.x = this.x - this.velocidad;

    if(this.x < TOPEIZQUIERDA){
        this.x = TOPEIZQUIERDA;
    }
}

Rana.prototype.generaPosicionArriba = function () {
    this.y = this.y - this.velocidad;

    if (this.y < TOPEARRIBA){
        this.y = TOPEARRIBA;
    }
}

Rana.prototype.generaPosicionAbajo = function (){
    this.y = this.y + this.velocidad;
    if (this.y > TOPEABAJO){
        this.y = TOPEABAJO;
    }
}



// ------------ PINTAR EN EL CANVAS -------------

    function pintarRana() {
        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);

        if (xDerecha) miRana.generaPosicionDerecha();

        
        //pinto la Rana
        ctx.drawImage(
            miRana.imagenRana, //imagen completa 
            miRana.animacionRana[posicion][0],
            miRana.animacionRana[posicion][1],
            miRana.tamañoX, // tamaño de recorte del eje X
            miRana.tamañoY, //tamaño de recorte del eje y
            miRana.x,   //posicion X
            miRana.y,   //posicion Y
            miRana.tamañoX,
            miRana.tamañoY
        );

    }

    function movimientoRana() {
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
    document.addEventListener("keydown",activaMovimiento,false);
    document.addEventListener("keyup", desactivaMovimiento, false);

//    localizo el canvas y genero contexto de trabajo 
    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    imagenRana = new Image();
    imagenRana.src = "assets/img/ArcadeFrogger.png";
    Rana.prototype.imagenRana = imagenRana;

    //creo un objeto de Rana
    miRana = new Rana(x, y);

//  Lanzo la animación
    idAnimacion = setInterval(pintarRana, 1000/50);

//  Animación encargada de hacer el movimiento de la Rana
    let idMovimiento = setInterval(movimientoRana, 1000);


}
