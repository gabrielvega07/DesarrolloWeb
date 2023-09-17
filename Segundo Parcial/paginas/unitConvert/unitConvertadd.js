
import { celsiusToFahrenheit, fahrenheitToCelsius } from '../../module/aggregator.js';

document.addEventListener('DOMContentLoaded', function () {
    const conversionForm = document.getElementById('conversionForm');
    const temperaturaInput = document.getElementById('temperatura');
    const unidadEntradaSelect = document.getElementById('unidadEntrada');
    const unidadSalidaSelect = document.getElementById('unidadSalida');
    const resultadoSpan = document.getElementById('resultado');
  
    conversionForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const temperatura = parseFloat(temperaturaInput.value);
      const unidadEntrada = unidadEntradaSelect.value;
      const unidadSalida = unidadSalidaSelect.value;
  
      if (isNaN(temperatura)) {
        alert('Por favor, ingresa una temperatura válida.');
        return;
      }
  
      let resultado = '';
  
      if (unidadEntrada === 'celsius' && unidadSalida === 'fahrenheit') {
        resultado = celsiusToFahrenheit(temperatura);
      } else if (unidadEntrada === 'fahrenheit' && unidadSalida === 'celsius') {
        resultado = fahrenheitToCelsius(temperatura);
      } else {
        alert('Las unidades de entrada y salida deben ser diferentes.');
        return;
      }
  
      resultadoSpan.textContent = `Resultado: ${resultado.toFixed(2)} ${unidadSalida}`;
    });
  });