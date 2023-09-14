// conversions/index.js

const KELVIN_CONSTANT = 273.15;

export function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

export function convertFahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
