// Importar módulos
import { sum, subtract, multiply, divide } from "./calculos";
import { addTask, markTaskAsCompleted, showTasks } from "./tasks";
import { convertCelsiusToFahrenheit, convertFahrenheitToCelsius } from "./conversions";
import { generatePassword } from "./passwords";

// Crear menú
const menuItems = [
  {
    label: "Módulo de cálculos",
    link: "calculations.html",
  },
  {
    label: "Módulo de lista de tareas",
    link: "tasks.html",
  },
  {
    label: "Módulo de conversión de unidades",
    link: "conversions.html",
  },
  {
    label: "Módulo de generación de contraseñas",
    link: "passwords.html",
  },
  {
    label: "Módulo de galería de imágenes",
    link: "images.html",
  },
];

// Mostrar menú
document.querySelector("ul").innerHTML =
  menuItems.map((item) => `<li><a href="${item.link}">${item.label}</a></li>`).join("");
