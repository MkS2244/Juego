
window.onload = function () {

    let canvas, ctx; // variable para referenciar el canvas y el contexto de trabajo
    let xDerecha, xIzquierda, yArriba, yAbajo, idAnimacion; //variables para la dirección del personaje
    let posicion = 0; //posición del array 
    let x = 0;    //posicion inicial x
    let y = 0;    //posicion inicial y
    let inicio = 0;
    let miRana;


    // ------------ PINTAR LA RANA EN EL CANVAS -------------

    function pintarRana() {
        //limpio el canvas
        ctx.clearRect(0, 0, 600, 400);

        if (xDerecha) miRana.generaPosicionDerecha();
        if (xIzquierda) miRana.generaPosicionIzquierda();
        if (yAbajo) miRana.generaPosicionAbajo();
        if (yArriba) miRana.generaPosicionArriba();

        //pinto la Rana
        ctx.drawImage(
            miRana.imagenRana, //imagen completa 
            miRana.animacionRana[posicion][0],
            miRana.animacionRana[posicion][1],
            miRana.tamañoX, // tamaño de recorte del eje X
            miRana.tamañoY, //tamaño de recorte del eje y
            miRana.x,   //posicion X
            miRana.y,   //posicion Y
            miRana.tamañoX+16,
            miRana.tamañoY+16
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
    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", desactivaMovimiento, false);

    //    localizo el canvas y genero contexto de trabajo 
    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext("2d");

    //creo un objeto de Rana
    miRana = new Rana(x, y);

    //  Lanzo la animación
    idAnimacion = setInterval(pintarRana, 24/1000);

    //  Animación encargada de hacer el movimiento de la Rana
    let idMovimiento = setInterval(movimientoRana, 1000/8);


}
