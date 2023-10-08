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
let timerInicial = 30;
let tiempoRegresivo = null;

let darClick = new Audio('./sonidos/click.wav');
let equivocado = new Audio('./sonidos/equivicado.wav');
let jganar = new Audio('./sonidos/ganar.wav');
let jperder = new Audio('./sonidos/perder.wav');

//Seleccion de estadisticas del documento

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// Para uvicar las tarjetas en lugares distintos cada vez
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
// console.log(numeros);

//Funciones
function reanudar() {
  aciertos = 0;
  timer = 30;
  timerInicial = 30;
  movimientos = 0;
  mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
  clearInterval(tiempoRegresivo);
  temporizador = false;
  mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  tarjetasDestapadas = 0;
  numeros = numeros.sort(() => {
    return Math.random() - 0.5;
  });
  for (let i = 0; 1 <= 15; i++) {
    let tarjetaReset = document.getElementById(i);
    tarjetaReset.innerHTML = "";
    tarjetaReset.disabled = false;
  }
}
function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo:${timer}s`;
    if (timer == 0) {
      jperder.play();
      clearInterval(tiempoRegresivo);
      Swal.fire({
        title: "😥Oops...",
        text: "Se ha agotado el tiempo",
        footer: "Vuelve a intentarlo",
      });
      bloquearTarjetas();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; 1 <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./multimedia/${numeros[i]}.png " alt="imagen">`;
    tarjetaBloqueada.disabled = true;
  }
}

//Funcion destapar() que sera la principal del juego

function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  // console.log(tarjetasDestapadas);
  if (tarjetasDestapadas == 1) {
    darClick.play();
    //Mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./multimedia/${primerResultado}.png " alt="imagen">`;

    //Desabilitar el boton ya girado
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./multimedia/${segundoResultado}.png " alt="imagen">`;

    //Desabilitarel segundo boton
    tarjeta2.disabled = true;

    //Aumentar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos:${movimientos}`;
    if (primerResultado == segundoResultado) {
      darClick.play();
      tarjetasDestapadas = 0;

      //Aumentar los Aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos:${aciertos}`;

      if (aciertos == 8) {
        jganar.play();
        clearInterval(tiempoRegresivo);
        mostrarAciertos.innerHTML = `Aciertos:${aciertos}😱`;
        mostrarTiempo.innerHTML = `Lo hiciste en ${timerInicial - timer}s 🥳`;
        mostrarMovimientos.innerHTML = `Movimientos:${movimientos}😎`;
      }
    } else {
      //Mostrar momentaneamente y volver a tapar
      equivocado.play();
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 600);
    }
  }
}
