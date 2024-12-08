function Coche(y_, tipo_){
    this.x = 600;
    this.y = y_;
    this.acabado = false;
    this.tamañoX = 59;
    this.tamañoY  = 58;
    this.velocidad = 1.15;
    this.spriteCoche1 = [1, 1];
        //              1ºcoche  
    this.spriteCoche2 = [61, 1]; 
        //              2ºcoche
    this.spriteCoche3 =[121, 1]; 
        //              3ºcoche 
/*     this.posicion = 0;
    this.inicio = 0; */
    this.tipoSwitch = tipo_;
    //this.tipoCoche = Math.floor(Math.random() * 3);
}

const imgCoches = new Image();
imgCoches.src = "./assets/img/coches1.png";
Coche.prototype.imgCoches = imgCoches;

Coche.prototype.pintarCoches = function (ctx_){
    
    switch(this.tipoSwitch){
        case "coche1":
            ctx_.drawImage(this.imgCoches,
                this.spriteCoche1[0],
                this.spriteCoche1[1],
                this.tamañoX,
                this.tamañoY,
                this.x,
                this.y,
                this.tamañoX-20,
                this.tamañoY-20 
            );
            break;
        case "coche2":
            ctx_.drawImage(this.imgCoches,
                this.spriteCoche2[0],
                this.spriteCoche2[1],
                this.tamañoX,
                this.tamañoY,
                this.x,
                this.y,
                this.tamañoX-20,
                this.tamañoY-20 
            );
            break;
        case "coche3":
            ctx_.drawImage(this.imgCoches,
                this.spriteCoche3[0],
                this.spriteCoche3[1],
                this.tamañoX,
                this.tamañoY,
                this.x,
                this.y,
                this.tamañoX-20,
                this.tamañoY-20 
            );
            break;
    }
}

Coche.prototype.moverCoches = function (){
    this.x -= this.velocidad;
}

Coche.prototype.desapareceDelMapa = function(){
    if (this.x < 0){
        return true;
    }
}
