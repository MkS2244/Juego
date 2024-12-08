function Tronco (y_){
    this.x = 600;
    this.y = y_;
    this.velocidad = 1.5;
    this.acabado = false;
    this.tamañoX = 120;
    this.tamañoY = 60;
}

const imgTronco = new Image();
imgTronco.src = "./assets/img/Tronco.png";
Tronco.prototype.imgTronco = imgTronco;

Tronco.prototype.pintarTronco = function(ctx_){
    ctx_.drawImage(this.imgTronco,
        1,              // donde empieza el recorte en X de sprite del tronco
        2,              // donde empieza el recorte en Y de sprite del tronco
        this.tamañoX,
        this.tamañoY,
        this.x,
        this.y,
        this.tamañoX+20,
        this.tamañoY+20 
    );
}

// para sacar los troncos de derecha a izquierda
Tronco.prototype.moverTronco = function (){
    this.x -= this.velocidad;
}

Tronco.prototype.desapareceDelMapa = function(){
    if (this.x < 0){
        return true;
    }
}