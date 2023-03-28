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
window.addEventListener("load", getData);

// Crear una función llamada data
// Esta función recibe como argumento un array.
// Esta función debe recorrer el array recibido y copiarlo en un nuevo array.
// Esta función no retorna ningún valor

const data = (arrayData) => {
  let newarray = [];

  for (const pregunta of arrayData) {
    newarray.push(pregunta);
  }

  //   console.log(typeof arrayData);
  //   console.log(newarray);
  return newarray;
};

// funcion random

const funcionrandom = funcionrandom;

function randomGeneretor(numeroMax) {
  return Math.floor(Math.random() * (numeroMax + 1));
}

