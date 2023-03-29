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
  headerElemento: document.querySelector("#j-header"),
  mainElemento: document.querySelector("#j-main"),
  index: 0,
  totalPreguntas: 15,
  arrayPreguntas: [],
  puntos: 0,

}
const start = () => {
  state.puntos = 0;
  mezclar();
  setUp();
}


 const setUp = ()=>{
  const pElement = document.createElement("p")
  const ulElement = document.createElement("ul")
  const setUpFragment = document.createDocumentFragment();
  
  pElement.textContent = state.arrayPreguntas[state.index].question;
  setUpFragment.append(pElement)
  for (let j = 0; j < state.arrayPreguntas[state.index].answers.length; j++) {
    const liElement = document.createElement("li")
    liElement.textContent = state.arrayPreguntas[state.index].answers[j]
    ulElement.append(liElement)
    setUpFragment.append(ulElement)
    
  }
  state.mainElemento.innerHTML = "";
  state.mainElemento.append(setUpFragment)
}

window.addEventListener("load", getData);
state.btnStartElemento.addEventListener("click", start);


