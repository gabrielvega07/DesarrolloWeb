let cargar = document.querySelector('#cargar');

cargar.addEventListener("click", async function () {
    
const seleccionarArchivo = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'Archivo seleccionado';
};

const verificarArchivo = async (archivo) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return archivo === 'Archivo seleccionado';
};

const verificarTamaño = async (archivo) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return archivo.length > 10;
};

const subirArchivo = async (archivo) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return 'Archivo subido';
};

async function main() {
    const archivo = await seleccionarArchivo();
    const archivoVerificado = await verificarArchivo(archivo);
    const tamañoVerificado = await verificarTamaño(archivoVerificado);

    if (tamañoVerificado) {
        const archivoSubido = await subirArchivo(archivoVerificado);
        console.log(archivoSubido);
    } else {
        console.log('El archivo no es válido');
    }
}

main();
});