// Modulo de generacion de contraseñas

export function generarContrasena(longitud, caracteres) {
    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
      contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasena;
  }