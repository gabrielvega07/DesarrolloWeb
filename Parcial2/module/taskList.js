// tareas.js

// Objeto que representa la lista de tareas
const listaDeTareas = {
  tareas: [],

  // Agrega una nueva tarea a la lista
  agregarTarea: function (tarea) {
    this.tareas.push({ tarea, completada: false });
  },

  // Marca una tarea como completada
  marcarComoCompletada: function (indice) {
    if (indice >= 0 && indice < this.tareas.length) {
      this.tareas[indice].completada = true;
    }
  },

  // Obtiene la lista de tareas
  obtenerTareas: function () {
    return this.tareas;
  },
};

// Exporta el objeto listaDeTareas para que esté disponible para su importación
export {listaDeTareas};
