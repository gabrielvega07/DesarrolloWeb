import { listaDeTareas } from '../../module/aggregator.js';

// Obtén elementos del DOM
const formularioTarea = document.getElementById('formularioTarea');
const nuevaTareaInput = document.getElementById('nuevaTarea');
const listaTareas = document.getElementById('listaTareas');

// Función para agregar una nueva tarea
function agregarTarea(event) {
  event.preventDefault();
  const nuevaTarea = nuevaTareaInput.value;
  if (nuevaTarea.trim() !== '') {
    listaDeTareas.agregarTarea(nuevaTarea);
    nuevaTareaInput.value = '';
    mostrarTareas();
  }
}

// Función para mostrar las tareas en la lista
function mostrarTareas() {
  const tareas = listaDeTareas.obtenerTareas();
  
  // Creamos una lista no ordenada (ul)
  const ul = document.createElement('ul');
  
  tareas.forEach((tarea, index) => {
    const tareaItem = document.createElement('li');
    tareaItem.textContent = tarea.tarea;
    if (tarea.completada) {
      tareaItem.classList.add('completada');
    }
    tareaItem.addEventListener('click', () => marcarComoCompletada(index));
    
    // Agregamos el elemento de la tarea a la lista no ordenada (ul)
    ul.appendChild(tareaItem);
  });
  
  // Reemplazamos la lista de tareas actual con la nueva lista (ul)
  listaTareas.innerHTML = '';
  listaTareas.appendChild(ul);
}

// Función para marcar una tarea como completada
function marcarComoCompletada(index) {
  listaDeTareas.marcarComoCompletada(index);
  mostrarTareas();
}

// Agrega un evento de envío al formulario
formularioTarea.addEventListener('submit', agregarTarea);

// Muestra las tareas iniciales
mostrarTareas();



