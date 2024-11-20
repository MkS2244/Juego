import { ctx }  from "./constantes.js";

export function Tortuga (x_ , y_,velocidad_, acabado_ ){
    this.x = x_;
    this.y = y_;
    this.velocidad = velocidad_;
    this.acabado = acabado_;
    this.tamañoX = 16;
    this.tamañoY = 16;
    this.animacionTortuga = [[1,1],[19,1],[37,1],[55,1],[73,1]];
    this.posicion = 0;
}

let imagenTortuga = new Image();
imagenTortuga.src= "./assets/img/Tortuga1.png";
Tortuga.prototype.imagenTortuga = imagenTortuga;

Tortuga.prototype.pintarTortuga = function(){
    ctx.drawImage(this.imagenTortuga,
        this.animacionTortuga[miTortuga.posicion][0],
        this.animacionTortuga[miTortuga.posicion][1],
        this.tamañoX,
        this.tamañoY,
        this.x,
        this.y,
        this.tamañoX+14,
        this.tamañoY+14
    );

}

Tortuga.prototype.moverTortuga = function() {
    this.x = this.x + this.velocidad;

    this.posicion = (this.posicion +1) %5;

}
Tortuga.prototype.desapareceDelMapa = function(){
    if (this.x < 500){
        return true;
    }
}

