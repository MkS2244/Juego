function Rana() {
    this.x = 1 + (Math.round(Math.random() * 569));
    this.y = 370;
    this.tamañoX = 16;                                                          //tamaño X del sprite de la rana 
    this.tamañoY = 16;                                                          //tamaño Y del sprite de la rana
    this.animacionRana = [[1, 1], [19, 1], [37, 1], [55, 1], [73, 1], [91, 1], [109, 1], [127, 1]];
    //                           arriba       izquierda          abajo         derecha   
    this.posicion = 0;                                                          //posicion del sprite de la rana
    this.inicio = 0;                                                            //inicio del sprite de la rana
    this.estadoRana = EstadosRana.PARADA                                        //estado de la rana
    this.velocidadRana = 5;
}

// -------------------------------------------------------------
//  CREO LAS FUNCIONES DE LA RANA (MOVIMIENTO, PINTAR Y DIBUJAR)
// -------------------------------------------------------------

const imagenRana = new Image();
imagenRana.src = "assets/img/Rana.png";
Rana.prototype.imagenRana = imagenRana;                     //CARGO EN EL PROTOTYPE LA IMAGEN DE LA RANA

//Función para resetear la posicion de la rana
Rana.prototype.reset = function () {
    this.x = 1 + (Math.round(Math.random() * 569));
    this.y = 370;
}

Rana.prototype.generaPosicionDerecha = function () {
    this.x = this.x + this.velocidadRana;
    if (this.x > TOPEDERECHA) this.x = TOPEDERECHA;
}

Rana.prototype.generaPosicionIzquierda = function () {
    this.x = this.x - this.velocidadRana;
    if (this.x < TOPEIZQUIERDA) this.x = TOPEIZQUIERDA;
}

Rana.prototype.generaPosicionArriba = function () {
    this.y = this.y - this.velocidadRana;
    if (this.y < TOPEARRIBA) this.y = TOPEARRIBA;
}

Rana.prototype.generaPosicionAbajo = function () {
    this.y = this.y + this.velocidadRana;
    if (this.y > TOPEABAJO) this.y = TOPEABAJO;
}

Rana.prototype.pintar = function (ctx) {
    ctx.drawImage(this.imagenRana,
        this.animacionRana[this.posicion][0],
        this.animacionRana[this.posicion][1],
        this.tamañoX,
        this.tamañoY,
        this.x,
        this.y,
        this.tamañoX + 14,
        this.tamañoY + 14
    );
}
