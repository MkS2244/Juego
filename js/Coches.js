import {ctx} from "./constantes.js";

export function Coches (x_, y_, velocidad_, acabado_){
    this.x = x_;
    this.y = y_;
    this.velocidad = velocidad_;
    this.acabado = acabado_;

}

let imagenCoche = new Image();
imagenCoche.src = "./assets/img/ArcadeFrogger.png";
Coches.prototype.imagenCoche = imagenCoche;

Coches.prototype.pintarCoches =function () {
    ctx.drawImage(this.imagenCoche, this.x,this.y);

}

Coches.prototype.moverDerechaCoches = function (){
    this.x = this.x + this.velocidad;
    
}

Coches.prototype.moverIzquierdaCoches = function(){
    this.x = this.x - this.velocidad;
    
}

Coches.prototype.desapareceDelMapa = function(){
    
}   