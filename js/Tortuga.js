function Tortuga ( y_){
    this.x = -32;
    this.y = y_;
    this.velocidad = 1.5;
    this.acabado = false;
    this.tamañoX = 16;
    this.tamañoY = 16;
}

const imgTortuga = new Image();
imgTortuga.src = "./assets/img/TortugaDef.png";
Tortuga.prototype.imgTortuga = imgTortuga;

Tortuga.prototype.pintarTortuga = function(ctx){
    ctx.drawImage(this.imgTortuga,
        1,              // donde empieza el recorte en X de sprite de la torutuga
        1,              // donde empieza el recorte en Y de sprite de la tortuga
        this.tamañoX,
        this.tamañoY,
        this.x,
        this.y,
        this.tamañoX+14,
        this.tamañoY+14
    );
}

// para sacar las tortugas de izquierda a derecha
Tortuga.prototype.mover = function (){
    this.x += this.velocidad;
}

Tortuga.prototype.desapareceDelMapa = function(){
    if (this.x < 600){
        return true;
    }
}