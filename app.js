// Inicializando las variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivo = null;

//Seleccion de estadisticas del documento


let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');



// Para uvicar las tarjetas en lugares distintos cada vez
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
// console.log(numeros);


//Funciones
function reanudar(){
    aciertos = 0;
    timer = 30;
    movimientos = 0;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    clearInterval(tiempoRegresivo);
    temporizador = false;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    tarjetasDestapadas = 0;
    numeros = numeros.sort(() => { return Math.random() - 0.5 });
    for (let i = 0; 1 <= 15; i++) {
        let tarjetaReset = document.getElementById(i);
        tarjetaReset.innerHTML = '';
        tarjetaReset.disabled = false;
    }
}
function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo:${timer}s`
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
        }
    }, 1000)
}

function bloquearTarjetas() {
    for (let i = 0; 1 <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion destapar() que sera la principal del juego

function destapar(id) {
    if (temporizador ==false) {
        contarTiempo();
        temporizador = true;
}


    tarjetasDestapadas++;
    // console.log(tarjetasDestapadas);
    if (tarjetasDestapadas == 1) {
        //Mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        //Desabilitar el boton ya girado
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //Desabilitarel segundo boton
        tarjeta2.disabled = true;

        //Aumentar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML=`Movimientos:${movimientos}`
        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            
            //Aumentar los Aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos:${aciertos}`;
            
            if (aciertos == 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos:${aciertos}😱`
                mostrarTiempo.innerHTML=`🥳 solo te demoraste ${timerInicial-tiempoRegresivo} segundos`
                mostrarMovimientos.innerHTML = `Movimientos:${movimientos}😎`
            }
        } else {
            //Mostrar momentaneamente y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800)
        }
    }

}