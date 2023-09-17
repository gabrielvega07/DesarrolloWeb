//Modulo de galeria de imagenes

//cargar una imagen 

export function cargarImagen(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => reject(new Error(`Failed to load image's URL: ${url}`)));
        img.src = url;
    });
}

//ver imagenes  

export function verImagenes() {
    const imagenes = document.querySelectorAll('img[data-src]');
    imagenes.forEach(img => {
        cargarImagen(img.dataset.src)
            .then(() => {
                img.src = img.dataset.src;
            })
            .catch((err) => {
                console.error(err);
            });
    });
}



