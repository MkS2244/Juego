function Tronco (x_ , y_,velocidad_, acabado_ ){
    this.x = x_;
    this.y = y_;
    this.velocidad = velocidad_;
    this.acabado = acabado_;
}

imagenTronco = new Image ();
imagenTronco.src = "./assets/img/Tronco.png";
Tronco.prototype.imagenTronco = imagenTronco;

Tronco.prototype.pintarTronco = function (ctx_){
    ctx_.drawImage(this.imagenTronco, this.x, this.y);
}

Tronco.prototype.moverTronco = function (){
    this.x = this.x - this.velocidad;
}

Tronco.prototype.desapareceDelMapa = function (){
    
}