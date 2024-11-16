function Tortuga (x_ , y_,velocidad_, acabado_ ){
    
    this.x = x_;
    this.y = y_;
    this.velocidad = velocidad_;
    this.acabado = acabado_;
}

imagenTortuga = new Image();
imagenTortuga.src= "./assets/img/Tortuga.png";
Tortuga.prototype.imagenTortuga = imagenTortuga;

Tortuga.prototype.pintarTortuga = function(ctx_){
    ctx_.drawImage(this.imagenTortuga, this.x, this.y);
}

Tortuga.prototype.moverTortuga = function() {
    this.x = this.x + this.velocidad;
}
Tortuga.prototype.desapareceDelMapa = function(){
    if (this.x < 500){
        return true;
    }
}

