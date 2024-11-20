//defino los topes del canvas
export const TOPEDERECHA = 600 -32; 
export const TOPEIZQUIERDA = 0; 
export const TOPEARRIBA = 0;
export const TOPEABAJO = 400 -32;

export const NUMEROTRONCOS = 3;
export const NUMEROTORTUGAS = 2;
export const NUMEROCOCHES = 2;
export const NUMEROCAMION = 1;

export const VELOCIDADTRONCO = 0.2;
export const VELOCIDADTORTUGAS = 0.2;
export const VELOCIDADCOCHES = 0.3;
export const VELOCIDADCAMION = 0.3;

export const canvas = document.getElementById("miCanvas"); //localizo el canvas
export const ctx = canvas.getContext("2d"); //contexto de trabajo
