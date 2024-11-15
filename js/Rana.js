
function Rana(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.animacionRana =[[1, 1], [18, 1], [37, 1], [55, 1], [73, 1], [91, 1], [109, 1], [127, 1]];
    //                       arriba       izquierda          abajo         derecha   
    this.tamañoX = 16;
    this.tamañoY = 16;
}

// --------------------------    GENERAR LAS POSICIONES ------------------------------
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


imagenRana = new Image();
imagenRana.src = "./assets/img/Rana.png";
Rana.prototype.imagenRana = imagenRana;