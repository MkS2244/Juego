function Coches (x_, y_, velocidad_, acabado_){
    this.x = x_;
    this.y = y_;
    this.velocidad = velocidad_;
    this.acabado = acabado_;

}

imagenCoche = new Image();
imagenCoche.src = "./assets/img/ArcadeFrogger.png";
Coches.prototype.imagenCoche = imagenCoche;

Coches.prototype.pintar =function (ctx_) {
    ctx_.drawImage(this.imagenCoche, this.x,this.y);

}

Coches.prototype.moverDerecha = function (){
    this.x = this.x + this.velocidad;
    //sin terminar
}

Coches.prototype.moverIzquierda = function(){
    this.x = this.x - this.velocidadRana;
    //sin terminar
}