function Tortuga (x_ , y_ ){
    
    this.x = x_;
    this.y = y_;

}

Tortuga.prototype.imagenTortuga = new Image();
Tortuga.prototype.imagenTortuga.src= "./assets/img/ArcadeFrogger.png";

Tortuga.prototype.pintarTortuga = function(ctx_){
    ctx_.drawImage(this.imagenTortuga, this.x, this.y);
}

//SIN TERMINAR
