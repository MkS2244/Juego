import { TOPEARRIBA, TOPEABAJO, TOPEIZQUIERDA, TOPEDERECHA } from "./constantes.js";
import { ctx } from "./constantes.js";

export function Rana(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.animacionRana = [[1, 1], [18, 1], [37, 1], [55, 1], [73, 1], [91, 1], [109, 1], [127, 1]];
    //                       arriba             izquierda          abajo         derecha   
    this.tamañoX = 16;
    this.tamañoY = 16;
    this.inicio = 0;
    this.posicion = 0;
}
let posicion = 0;
let inicio = 0;

Rana.prototype.imagenRana = new Image();
Rana.prototype.imagenRana.src = "./assets/img/Rana.png";


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

Rana.prototype.pintarRana = function (ctx_){

    //pinto la Rana
    ctx_.drawImage(
        this.imagenRana, //imagen completa 
        this.animacionRana[posicion][0],
        this.animacionRana[posicion][1],
        this.tamañoX, // tamaño de recorte del eje X
        this.tamañoY, //tamaño de recorte del eje y
        this.x,   //posicion X
        this.y,   //posicion Y
        this.tamañoX + 16,
        this.tamañoY + 16
    );
}

Rana.prototype.movimientoRana = function () {

    this.posicion = this.inicio + (this.posicion + 1) % 2;

}

