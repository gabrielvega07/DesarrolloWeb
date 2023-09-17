import { cargarImagen, mostrarGaleria } from '../../module/aggregator.js';


function addEventListenerById(id, event, fn) {
  document.getElementById(id).addEventListener(event, fn);
}

document.addEventListener('DOMContentLoaded', () => {
    const inputImagen = document.getElementById('inputImagen');
    const botonCargar = document.getElementById('botonCargar');
    const contenedorImagenes = document.getElementById('contenedorImagenes');
  
    botonCargar.addEventListener('click', () => {
      const archivo = inputImagen.files[0];
      const url = URL.createObjectURL(archivo);
      cargarImagen(url, contenedorImagenes);
    });
  
    mostrarGaleria(contenedorImagenes);
  });
  
