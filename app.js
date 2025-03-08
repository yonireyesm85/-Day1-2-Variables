// Variables globales
let paso = 0;
let datos = {};

// Elementos del DOM
const titulo = document.querySelector("h1");
titulo.innerHTML = "#7DaysOfCode.🦖";
const input = document.getElementById("input-datos");
const texto = document.getElementById("texto-instruccion");
const botonSiguiente = document.getElementById("boton-siguiente");
const botonReiniciar = document.getElementById("boton-reiniciar");

// Inicialización
titulo.innerHTML = "#7DaysOfCode.🦖";
botonSiguiente.addEventListener("click", capturarDato);
botonReiniciar.addEventListener("click", reiniciarProceso);

function capturarDato() {
  const valor = input.value.trim();

  if (valor === "") {
    alert("Por favor, completa este campo. 😡");
    return;
  }

  switch (paso) {
    case 0:
      datos.nombre = valor;
      actualizarInstruccion("¿Cuántos años tienes?", "number");
      break;
    case 1:
      datos.edad = valor;
      actualizarInstruccion(
        "¿Qué lenguaje de programación estás estudiando?",
        "text"
      );
      break;
    case 2:
      datos.lenguaje = valor;
      mostrarMensajeFinal();
      return;
    case 3:
      procesarOpinion(valor);
      return; // Salir para evitar incrementar paso innecesariamente
  }

  paso++;
}

function actualizarInstruccion(mensaje, tipo) {
  texto.innerText = mensaje;
  input.value = "";
  input.type = tipo;
}

function mostrarMensajeFinal() {
  const mensaje = `¡Hola ${datos.nombre}! 🥳 Tienes ${datos.edad} años y estás aprendiendo ${datos.lenguaje}. 🦖`;

  alert(mensaje); // Primero muestra el alert con la info del usuario
  texto.innerHTML = mensaje; // Luego lo muestra en pantalla

  // Ocultamos input para que solo vea el mensaje hasta dar clic en "Siguiente"
  input.style.display = "none";

  // Modificamos el botón para continuar con la siguiente pregunta manualmente
  botonSiguiente.innerText = "Continuar";
  botonSiguiente.onclick = preguntarOpinion;
  paso++; // Avanzamos manualmente al siguiente paso
}

function preguntarOpinion() {
  texto.innerHTML = `¿Te gusta estudiar ${datos.lenguaje}? Responde con:<br>1️⃣ Sí, me encanta.<br>2️⃣ No, no mucho.`;

  input.style.display = "block";
  input.type = "number";
  input.value = "";
  botonSiguiente.innerText = "Responder";
  botonSiguiente.onclick = capturarDato; // Restaurar función original
}

function procesarOpinion(respuesta) {
  if (respuesta === "1") {
    texto.innerHTML = "¡Muy bien!🥳 Sigue estudiando y tendrás mucho éxito. 🚀";
  } else if (respuesta === "2") {
    texto.innerHTML =
      "Oh, qué pena...😢 ¿Ya intentaste aprender otros lenguajes?";
  } else {
    alert("Por favor, responde con 1 o 2.");
    return;
  }

  finalizarProceso();
}

function finalizarProceso() {
  input.style.display = "none";
  botonSiguiente.style.display = "none";
  botonReiniciar.style.display = "block";
}

function reiniciarProceso() {
  paso = 0;
  datos = {};

  input.style.display = "block";
  input.value = "";
  input.type = "text";

  texto.innerText = "¿Cuál es tu nombre?";

  botonSiguiente.style.display = "block";
  botonSiguiente.innerText = "Siguiente"; // Restauramos el botón a su estado original
  botonSiguiente.onclick = capturarDato; // Restaurar función original
  botonReiniciar.style.display = "none";
}

/*
function mostrarPrompt() {
  let nombre = prompt("cual es tu nombre:");
  let edad = prompt("cuantos años tienes:");
  let lenguaje = prompt("que lenguaje de programacion esta estudiando:");
  alert(
    `hola ${nombre}!🥳 tienes ${edad} años y ya estas aprendiendo ${lenguaje}.`
  );
}
  */
