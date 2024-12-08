const TOPEDERECHA = 570;                        //tope del canvas derecha - tamaño del objeto
const TOPEABAJO = 370;                          //tope del canvas abajo - tamaño del objeto
const TOPEIZQUIERDA = 0;                        //tope del canvas izquierdo 
const TOPEARRIBA = 0;                           //tope del canvas arriba

let ctx, canvas;                                // contexto y canvas
let canvasInfo, ctxInfo;                        // canvas y contexto del canvas secundario

let Fondo = new Image ();
Fondo.src = "./assets/img/mapa.png";            // mapa del juego

let imagenRana, imagenTortuga, imagenTronco;    // variables de las imagenes de los objetos

let idAnimacion;                                // id de la animacion
let idRana;                                     // id de la rana


let juegoPausado = false;                       // variable para pausar el juego

const EstadosRana = {
    PARADA: "parada",
    MOVIMIENTO: "movimiento"
};

const audioSaltoRana = new Audio();
audioSaltoRana.src = "./assets/sonido/sound-frogger-hop.wav";
audioSaltoRana.volume = 0.2;

const audioAgua = new Audio();
audioAgua.src = "./assets/sonido/sound-frogger-squash.wav";
audioAgua.volume = 0.2;

const audioAtropello = new Audio();
audioAtropello.src = "./assets/sonido/sound-frogger-plunk.wav";
audioAtropello.volume = 0.2;