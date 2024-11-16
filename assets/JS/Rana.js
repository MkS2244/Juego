
function Rana(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.animacionRana = [[1, 1], [17, 1], [19, 1], [35, 1], [37, 1], [53, 1], [55, 1], [71, 1], [73, 1], [89, 1], [91, 1], [107, 1], [109, 1], [125, 1], [127, 1], [143, 1]];
    //                                  arriba                          izquierda                               abajo                                  derecha   
    this.velocidadRana = 1;
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
imagenRana.src = "assets/img/ArcadeFrogger.png";
Rana.prototype.imagenRana = imagenRana;