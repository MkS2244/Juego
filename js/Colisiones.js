// -------------------------------------------------
//  MANEJO DE COLISIONES
// -------------------------------------------------
// El parámetro "ajuste" es para que se adapte el tamaño de la colision. 
// Ya que ambos objetos no tienen el mismo tamaño.

function colision(rana, objeto,ajuste) {
    let colisionDetectada = false;

    let rIzq = rana.x;
    let rDer = rana.x + rana.tamañoX;
    let rDown = rana.y;
    let rUp = rana.y + rana.tamañoY;

    let oIzq = objeto.x;
    let oDer = objeto.x + objeto.tamañoX-ajuste;
    let oDown = objeto.y;
    let oUp = objeto.y + objeto.tamañoY-ajuste;

    if (
        rDer > oIzq &&
        rIzq < oDer &&
        rUp > oDown &&
        rDown < oUp
    ) {
        colisionDetectada = true;
    }

    return colisionDetectada;
}
