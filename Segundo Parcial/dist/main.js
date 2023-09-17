/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./module/aggregator.js":
/*!******************************!*\
  !*** ./module/aggregator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   celsiusToFahrenheit: () => (/* reexport safe */ _unitConvert_js__WEBPACK_IMPORTED_MODULE_2__.celsiusToFahrenheit),\n/* harmony export */   dividir: () => (/* reexport safe */ _calculos_js__WEBPACK_IMPORTED_MODULE_0__.dividir),\n/* harmony export */   fahrenheitToCelsius: () => (/* reexport safe */ _unitConvert_js__WEBPACK_IMPORTED_MODULE_2__.fahrenheitToCelsius),\n/* harmony export */   generarContrasena: () => (/* reexport safe */ _passwordGen_js__WEBPACK_IMPORTED_MODULE_3__.generarContrasena),\n/* harmony export */   listaDeTareas: () => (/* reexport safe */ _taskList_js__WEBPACK_IMPORTED_MODULE_1__.listaDeTareas),\n/* harmony export */   multiplicar: () => (/* reexport safe */ _calculos_js__WEBPACK_IMPORTED_MODULE_0__.multiplicar),\n/* harmony export */   restar: () => (/* reexport safe */ _calculos_js__WEBPACK_IMPORTED_MODULE_0__.restar),\n/* harmony export */   sumar: () => (/* reexport safe */ _calculos_js__WEBPACK_IMPORTED_MODULE_0__.sumar)\n/* harmony export */ });\n/* harmony import */ var _calculos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculos.js */ \"./module/calculos.js\");\n/* harmony import */ var _taskList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskList.js */ \"./module/taskList.js\");\n/* harmony import */ var _unitConvert_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unitConvert.js */ \"./module/unitConvert.js\");\n/* harmony import */ var _passwordGen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./passwordGen.js */ \"./module/passwordGen.js\");\n\n\n\n\n\n\n//# sourceURL=webpack:///./module/aggregator.js?");

/***/ }),

/***/ "./module/calculos.js":
/*!****************************!*\
  !*** ./module/calculos.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dividir: () => (/* binding */ dividir),\n/* harmony export */   multiplicar: () => (/* binding */ multiplicar),\n/* harmony export */   restar: () => (/* binding */ restar),\n/* harmony export */   sumar: () => (/* binding */ sumar)\n/* harmony export */ });\nfunction sumar(a, b) {\n  return a + b;\n}\nfunction restar(a, b) {\n  return a - b;\n}\nfunction multiplicar(a, b) {\n  return a * b;\n}\nfunction dividir(a, b) {\n  if (b === 0) {\n    return \"No se puede dividir por cero.\";\n  }\n  return a / b;\n}\n\n//# sourceURL=webpack:///./module/calculos.js?");

/***/ }),

/***/ "./module/passwordGen.js":
/*!*******************************!*\
  !*** ./module/passwordGen.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generarContrasena: () => (/* binding */ generarContrasena)\n/* harmony export */ });\n// Modulo de generacion de contraseñas\n\nfunction generarContrasena(longitud, caracteres) {\n  let contrasena = '';\n  for (let i = 0; i < longitud; i++) {\n    contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));\n  }\n  return contrasena;\n}\n\n//# sourceURL=webpack:///./module/passwordGen.js?");

/***/ }),

/***/ "./module/taskList.js":
/*!****************************!*\
  !*** ./module/taskList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   listaDeTareas: () => (/* binding */ listaDeTareas)\n/* harmony export */ });\n// tareas.js\n\n// Objeto que representa la lista de tareas\nconst listaDeTareas = {\n  tareas: [],\n  // Agrega una nueva tarea a la lista\n  agregarTarea: function (tarea) {\n    this.tareas.push({\n      tarea,\n      completada: false\n    });\n  },\n  // Marca una tarea como completada\n  marcarComoCompletada: function (indice) {\n    if (indice >= 0 && indice < this.tareas.length) {\n      this.tareas[indice].completada = true;\n    }\n  },\n  // Obtiene la lista de tareas\n  obtenerTareas: function () {\n    return this.tareas;\n  }\n};\n\n// Exporta el objeto listaDeTareas para que esté disponible para su importación\n\n\n//# sourceURL=webpack:///./module/taskList.js?");

/***/ }),

/***/ "./module/unitConvert.js":
/*!*******************************!*\
  !*** ./module/unitConvert.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   celsiusToFahrenheit: () => (/* binding */ celsiusToFahrenheit),\n/* harmony export */   fahrenheitToCelsius: () => (/* binding */ fahrenheitToCelsius)\n/* harmony export */ });\n// conversion.js\n\n// Función para convertir de Celsius a Fahrenheit\nfunction celsiusToFahrenheit(celsius) {\n  return celsius * 9 / 5 + 32;\n}\n\n// Función para convertir de Fahrenheit a Celsius\nfunction fahrenheitToCelsius(fahrenheit) {\n  return (fahrenheit - 32) * 5 / 9;\n}\n\n\n//# sourceURL=webpack:///./module/unitConvert.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./module/aggregator.js");
/******/ 	
/******/ })()
;