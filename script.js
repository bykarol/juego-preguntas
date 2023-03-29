"use strict";
const url =
  "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json";
async function getData() {
  try {
    const respuesta = await fetch(url);
    const datosRespuesta = await respuesta.json();
    // console.log(datosRespuesta);
    data(datosRespuesta);
    return datosRespuesta;
  } catch (error) {
    console.error("Error en la llamada a los datos", error.message);
  }
}

const data = (arrayData) => {
  for (const pregunta of arrayData) {
    state.arrayPreguntas.push(pregunta);
  }
}

const randomGenerator = (numMax) => {
  return Math.floor(Math.random() * numMax);
}

const mezclar = () => {
  let arrayMezclado = [];
  while (arrayMezclado.length < 15) {
    const rdnNum = randomGenerator(state.arrayPreguntas.length);
    if (!arrayMezclado.includes(state.arrayPreguntas[rdnNum])) {
      arrayMezclado.push(state.arrayPreguntas[rdnNum]);
    }
  }
  state.arrayPreguntas = arrayMezclado;
}

const state = {
  btnStartElemento: document.querySelector("input#btnStart"),
  totalPreguntas: 15,
  arrayPreguntas: [],


}

const start = () => {
  mezclar();
}


window.addEventListener("load", getData);
state.btnStartElemento.addEventListener("click", start);