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
  while (arrayMezclado.length <= 15) {
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
  arrayPreguntas: [],
  puntos: 0,
  arrayPuntajes: [],
  resultadoRespuesta: undefined,
  setUp() {
    this.mainElemento.innerHTML = "";
    const setUpFragment = document.createDocumentFragment();
    const pElement = document.createElement("p");
    pElement.textContent = state.arrayPreguntas[this.index].question;
    const puntosElement = document.createElement("p");
    puntosElement.textContent = `Puntaje: ${this.puntos}`;
    const ulElement = document.createElement("ul");
    for (let j = 0; j < this.arrayPreguntas[this.index].answers.length; j++) {
      const liElement = document.createElement("li");
      liElement.textContent = this.arrayPreguntas[this.index].answers[j];
      ulElement.append(liElement);
    }
    setUpFragment.append(pElement);
    setUpFragment.append(ulElement);
    setUpFragment.append(puntosElement);
    if (this.resultadoRespuesta !== undefined) {
      setUpFragment.append(this.resultadoRespuesta);
    }
    this.mainElemento.append(setUpFragment);
    ulElement.addEventListener("click", (e) => {
      if (e.target.matches("li")) {
        corregirRespuesta(e);
      }
    });
  },
  resetear() {
    this.index = 0;
    if (this.arrayPuntajes.length < 5) {
      this.arrayPuntajes.unshift(this.puntos);
    } else {
      this.arrayPuntajes.shift();
      this.arrayPuntajes.push(this.puntos);
    }
    this.puntos = 0;
  },
}

const corregirRespuesta = (evento) => {
  const respuestaUsuario = evento.target.textContent;
  let pResultado = document.createElement("p");
  if (state.index < state.arrayPreguntas.length) {
    if (respuestaUsuario === state.arrayPreguntas[state.index].correct) {
      console.log("Respuesta correcta");
      pResultado.classList.add("correcta");
      pResultado.textContent = `(${respuestaUsuario}) - Respuesta correcta!!!`;
      state.resultadoRespuesta = pResultado;
      state.puntos += 1;
    } else {
      console.log("Respuesta incorrecta");
      pResultado.classList.add("erronea");
      pResultado.textContent = `Respuesta incorrecta!!! La respuesta correcta era (${
        state.arrayPreguntas[state.index].correct
      })`;
      state.resultadoRespuesta = pResultado;
    }
    state.index += 1;
    state.setUp();
    if (state.index === state.arrayPreguntas.length - 1) {
      finDelJuego();
    }
  }
}

const finDelJuego = () => {
  state.mainElemento.innerHTML = "";
  const finFragment = document.createDocumentFragment();
  const buttonElement = document.createElement("button");
  const elementPuntos = document.createElement("p");
  const h3Element = document.createElement("h3");
  const ulPuntajes = document.createElement("ul");
  for (let i = 0; i < state.arrayPuntajes.length; i++) {
    const liPuntaje = document.createElement("li");
    liPuntaje.textContent = `Partida #${i + 1} - Puntaje final: ${
      state.arrayPuntajes[i]
    }`;
    ulPuntajes.append(liPuntaje);
  }
  buttonElement.textContent = "Volver a Jugar";
  elementPuntos.textContent = `Puntaje Final: ${state.puntos}`;
  h3Element.textContent = "Últimos Puntajes";
  finFragment.append(elementPuntos);
  finFragment.append(buttonElement);
  finFragment.append(h3Element);
  finFragment.append(ulPuntajes);
  state.mainElemento.append(finFragment);
  buttonElement.addEventListener("click", retorno);
}

const retorno = () => {
  state.resetear();
  mezclar();
  state.setUp();
}

const start = () => {
  mezclar();
  state.setUp();
}

window.addEventListener("load", getData);
state.btnStartElemento.addEventListener("click", start);
