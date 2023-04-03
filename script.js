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
  while (arrayMezclado.length < state.qtyQuestions) {
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
  playerName: undefined,
  qtyQuestions: 4, //TODO
  index: 0,
  arrayPreguntas: [],
  puntos: 0,
  arrayPuntajes: [],
  resultadoRespuesta: undefined,
  numeroJugador: 0,
  letraRespuesta: ["A", "B", "C", "D"],
  setUp() {
    state.mainElemento.innerHTML = "";
    const sectionElement = document.createElement("section");
    const h2Element = document.createElement("h2"); //numero pregunta
    h2Element.textContent = `Question ${state.index + 1}`
    h2Element.classList.add("numeroPregunta");
    const pElement = document.createElement("p"); //pregunta
    pElement.classList.add("pregunta");
    pElement.textContent = state.arrayPreguntas[state.index].question;
    const puntosElement = document.createElement("p");
    puntosElement.textContent = `Score: ${state.puntos}`;
    const ulElement = document.createElement("ul");
    ulElement.classList.add("respuestaPadre");
    for (let j = 0; j < state.arrayPreguntas[state.index].answers.length; j++) {
      const liElement = document.createElement("li");
      liElement.classList.add("respuesta");
      liElement.textContent = `${state.letraRespuesta[j]}: ${state.arrayPreguntas[state.index].answers[j]}`;
      ulElement.append(liElement);
    }
    sectionElement.append(puntosElement);
    sectionElement.append(h2Element);
    sectionElement.append(pElement);
    sectionElement.append(ulElement);
    if (state.resultadoRespuesta !== undefined) {
      sectionElement.append(this.resultadoRespuesta);
    }
    state.mainElemento.append(sectionElement);
    ulElement.addEventListener("click", (e) => {
      if (e.target.matches("li")) {
        corregirRespuesta(e);
      }
    });
  },
  resetear() {
    this.index = 0;
    this.puntos = 0;
  },
  inputDatos() {
    const playerNameElement = document.querySelector("#j-name");
    this.playerName = playerNameElement.value;
  },
  ordenarRanking() {
    this.arrayPuntajes.sort((a, b) => {
      return b - a;
    });
  },
  // guardarDatos() {

  // },
}
const corregirRespuesta = (evento) => {
  const respuestaUsuario = evento.target.textContent;
  let pResultado = document.createElement("p");
  if (state.index < state.arrayPreguntas.length) {
    if (respuestaUsuario.includes(state.arrayPreguntas[state.index].correct)) {
      pResultado.classList.add("correcta");
      pResultado.textContent = `(${respuestaUsuario}) - Correct answer!!!`;
      state.resultadoRespuesta = pResultado;
      state.puntos += 1;
    } else {
      pResultado.classList.add("erronea");
      pResultado.textContent = `Wrong!!! The answer was (${state.arrayPreguntas[state.index].correct
        })`;
      state.resultadoRespuesta = pResultado;
    }
    state.index += 1;
    state.setUp();
    if (state.index === state.arrayPreguntas.length - 1) {
      if (state.arrayPuntajes.length < 5) {
        state.arrayPuntajes.unshift(state.puntos);
      } else {
        state.arrayPuntajes.shift();
        state.arrayPuntajes.push(state.puntos);
      }
      state.ordenarRanking();
      finDelJuego();
    }
  }
}


const finDelJuego = () => {
  state.mainElemento.innerHTML = "";
  const finSection = document.createElement("section");
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("volver");
  const elementPuntos = document.createElement("p");
  const h3Element = document.createElement("h3");
  const ulPuntajes = document.createElement("ul");
  ulPuntajes.classList.add("rankingList")
  const userName = document.createElement("p");
  userName.textContent = state.playerName;
  for (let i = 0; i < 5; i++) {
    const liPuntaje = document.createElement("li");
    liPuntaje.classList.add("list")
    liPuntaje.textContent = `#${i + 1} - ${state.playerName} - Score: ${state.arrayPuntajes[i]
      }`;
    if (state.arrayPuntajes[i] != undefined) {
      ulPuntajes.append(liPuntaje);
    }
  }
  elementPuntos.textContent = `Your score: ${state.puntos}`;
  buttonElement.textContent = "Play Again";
  h3Element.textContent = "Ranking last scores";
  finSection.append(elementPuntos);
  finSection.append(h3Element);
  finSection.append(ulPuntajes);
  finSection.append(buttonElement);
  state.mainElemento.append(finSection);
  buttonElement.addEventListener("click", retorno);
}

const retorno = () => {
  state.resetear();
  mezclar();
  state.setUp();
}

const start = (e) => {
  e.preventDefault();
  // state.guardarDatos();
  state.inputDatos();
  mezclar();
  state.setUp();
}

window.addEventListener("load", getData);
state.btnStartElemento.addEventListener("click", start);
