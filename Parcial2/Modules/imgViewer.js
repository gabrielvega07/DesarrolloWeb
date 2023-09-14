let imagenes = [];

export function cargarImagen(imagen) {
    imagenes.push(imagen);
}

export function mostrarGaleria() {
    return imagenes;
}
