window.onload = function () {
    //defino como constantes los topes del canvas
    const TOPEDERECHA = 575;
    const TOPEIZQUIERDA = 0;
    const TOPEARRIBA = 0;
    const TOPEABAJO = 575;

    let canvas, ctx; // variable para referenciar el canvas y el contexto de trabajo
    let xDerecha, xIzquierda, yArriba, yAbajo, idAnimacion; //variables para la dirección del personaje
    let posicion = 0; //posición del array 

    let inicio = 0;
    let imagenRana;
    let miRana;

    function Rana(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.animacionRana = [[1, 0], [75, 0], [75, 0], [150, 0], [0, 86], [76, 86], [76, 86], [150, 86], [182, 0], [77, 182], [93, 182], [170, 182], [0, 267], [77, 267], [92, 267], [167, 267]];
        //abajo                            arriba                               izquierda                              derecha         
        this.velocidad = 1.2;
        this.tamañoX = 77;
        this.tamañoY = 80;
    }

    Rana.prototype.generaPosicionDerecha = function () {
        this.x = this.x + this.velocidad;

        if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;
    }

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
        if (xDerecha) inicio = 0;

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

    //localizo el canvas y genero contexto de trabajo 
    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    imagenRana = new Image();
    imagenRana.src = "SpriteRanas.png";
    Rana.prototype.imagenRana = imagenRana;

    //creo un objeto de Rana
    miRana = new Rana(x, y);

}