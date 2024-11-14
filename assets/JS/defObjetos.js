window.onload = function (){

    function Coches (x_, y_, velocidad_){
        this.x = x_ ;
        this.y = y_;
        this.velocidad = velocidad_;
        this.tamañoX = 60;
        this.tamañoY = 60;

    }

    function Camion (x_, y_, velocidad_){
        this.x = x_ ;
        this.y = y_;
        this.velocidad = velocidad_;
        this.tamañoX = 112;
        this.tamañoY = 45;
    }

    function TroncoGrande (x_, y_, velocidad_){
        this.x = x_ ;
        this.y = y_;
        this.velocidad = velocidad_;
        this.tamañoX = 198;
        this.tamañoY = 44;
    }

    function TroncoPequeño (x_, y_, velocidad_){
        this.x = x_ ;
        this.y = y_;
        this.velocidad = velocidad_;
        this.tamañoX = 147;
        this.tamañoY = 47;
    }

    function Tortuga (x_, y_, velocidad_){
        this.x = x_ ;
        this.y = y_;
        this.velocidad = velocidad_;
        this.tamañoX = 61;
        this.tamañoY = 60;
    }
}