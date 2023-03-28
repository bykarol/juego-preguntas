"use strict"
const url = "https://gist.githubusercontent.com/bertez/2528edb2ab7857dae29c39d1fb669d31/raw/4891dde8eac038aa5719512adee4b4243a8063fd/quiz.json";
async function getData(){
    try{
        const respuesta = await fetch(url);
        const datosRespuesta = await respuesta.json();
        console.log(datosRespuesta);
        data(datosRespuesta);
    }
    catch(error){
        console.error("Error en la llamada a los datos", error.message);
    }
}
window.addEventListener("load", getData)
