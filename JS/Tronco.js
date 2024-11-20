import {ctx} from "./constantes.js";

export function Tronco(x_, y_, velocidad_, acabado_) {
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

Tronco.prototype.pintarTronco = function () {
    ctx.drawImage(this.imagenTronco, this.x, this.y);
}

Tronco.prototype.moverTronco = function () {
    this.x = this.x - this.velocidad;
}

Tronco.prototype.desapareceDelMapa = function () {
    return this.x < 0;
}

