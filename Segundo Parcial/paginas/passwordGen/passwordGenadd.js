// Modulo de generacion de contraseñas

import { generarContrasena } from '../../module/aggregator.js';

function addEventListenerById(id, event, fn) {
    document.getElementById(id).addEventListener(event, fn);
    }

//addEventListenerById('generar', 'click', () => generarContrasena());

addEventListenerById('generar', 'click', () => {
    const nuevaContrasena = generarContrasena(32, 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*/?#$%&');
    alert('Su nuvea contraseña es: ' + nuevaContrasena);
    document.getElementById('resultado').textContent = nuevaContrasena;
    });
  
  