function Camion (y_){
    this.x = -70;
    this.y = y_;
    this.velocidadCamion = 1.55;
    this.acabado = false;
    this.tamañoX = 112;
    this.tamañoY = 56;
}


const imgCamion = new Image();
imgCamion.src = "./assets/img/camion.png";
Camion.prototype.imgCamion = imgCamion;

Camion.prototype.pintarCamion = function (ctx_){
    ctx_.drawImage(this.imgCamion,
        1,              // donde empieza el recorte en X de sprite del camion
        2,              // donde empieza el recorte en Y de sprite del camion
        this.tamañoX,
        this.tamañoY,
        this.x,
        this.y,
        this.tamañoX-25,
        this.tamañoY-25 
    );
}

// para sacar los camiones de izquierda a derecha
Camion.prototype.moverCamion = function (){
    this.x += this.velocidadCamion * velocidadJuego;
}

Camion.prototype.desapareceDelMapa = function(){
    if (this.x > 600){
        return true;
    }
}
