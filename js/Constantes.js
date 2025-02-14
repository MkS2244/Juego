const TOPEDERECHA = 570;                        //tope del canvas derecha - tamaño del objeto
const TOPEABAJO = 370;                          //tope del canvas abajo - tamaño del objeto
const TOPEIZQUIERDA = 0;                        //tope del canvas izquierdo 
const TOPEARRIBA = 0;                           //tope del canvas arriba

let nombre = prompt("Introduce tu nombre:");
let tiempoFinal, tiempoInicio, tiempoTotal;

let xDerecha, xIzquierda, yArriba, yAbajo;      //variables de movimiento de la rana

let rana;                                       // Objeto rana
let coche;                                     // Objeto coche1
let camion;                                     // Objeto camion

let arrayCoches = [];                           // Array de coches
let arrayCamiones = [];                         // Array de camiones

let botonNuevaPartida;                          // Boton para nueva partida
let botonPausar;                                // Boton para pausar el juego
let botonReanudar;                              // Boton para reanudar el juego
let botonReset;                                 // Boton para resetear el historial de partidas

let puntuacion;                                 // Puntuacion del juego

let ctx, canvas;                                // contexto y canvas
let canvasInfo, ctxInfo;                        // canvas y contexto del canvas secundario

let Fondo = new Image ();
Fondo.src = "./assets/img/mapa-1.png";          // mapa del juego

const imgVidas = new Image();                   // imagen de las vidas
imgVidas.src = "./assets/img/vida.png"; 

let vidas = 3;                                  // vidas de la rana

let velocidadJuego = 1;                         // velocidad del juego

let idAnimacion;                                // id de la animacion
let idRana;                                     // id de la rana
let idCamion;                                   // id del camion
let idCoches;                                   // id de los coches

let idGeneraTortugas;                           // id de la generacion de tortugas
let idGeneraTroncos;                            // id de la generacion de troncos
let idGeneraCamiones;                           // id de la generacion de camiones
let idGeneraCoches;                             // id de la generacion de coches

let contadorTortuga = 0;                        // contador de tortugas
let contadorTroncos = 0;                        // contador de troncos
let contadorCamion = 0;                         // contador de camiones
let contadorCoches = 0;                         // contador de coches

let juegoPausado = false;                       // variable para pausar el juego
let estamosMuertos = false;                     // variable para saber si estamos muertos

const EstadosRana = {
    PARADA: "parada",
    MOVIMIENTO: "movimiento",
    VIVA: "viva", 
    MUERTA: "muerta"
};

const audioSaltoRana = new Audio();
audioSaltoRana.src = "./assets/sonido/sound-frogger-hop.wav";
audioSaltoRana.volume = 0.2;

const audioAtropello = new Audio();
audioAtropello.src = "./assets/sonido/sound-frogger-plunk.wav";
audioAtropello.volume = 0.2;