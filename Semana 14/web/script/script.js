// Variables globales
const baseUrl = 'http://localhost:3000/api/libros'; // Cambia la URL según tu configuración
const librosList = document.getElementById('libros-list');
const libroForm = document.getElementById('libro-form');

// Helper function para hacer peticiones
async function makeRequest(url, method, data = null) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

// Cargar lista de libros
async function loadLibros() {
    librosList.innerHTML = '';
    try {
        const libros = await makeRequest(baseUrl, 'GET');
        libros.forEach((libro) => {
            const libroDiv = createLibroElement(libro);
            librosList.appendChild(libroDiv);
        });
    } catch (error) {
        console.error(error);
        librosList.textContent = 'Error al cargar la lista de libros.';
    }
}

// Función para agregar un nuevo libro
libroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tituloInput = document.getElementById('titulo');
    const autorInput = document.getElementById('autor');
    const añoPublicacionInput = document.getElementById('añoPublicacion');
    const isbnInput = document.getElementById('isbn');
    const generoInput = document.getElementById('genero');

    const nuevoLibro = {
        titulo: tituloInput.value,
        autor: autorInput.value,
        añoPublicacion: añoPublicacionInput.value,
        isbn: isbnInput.value,
        genero: generoInput.value,
    };

    try {
        const libro = await makeRequest(baseUrl, 'POST', nuevoLibro);
        // Procesa la respuesta y muestra el libro agregado
        const libroDiv = createLibroElement(libro);
        librosList.appendChild(libroDiv);

        // Limpia el formulario
        tituloInput.value = '';
        autorInput.value = '';
        añoPublicacionInput.value = '';
        isbnInput.value = '';
        generoInput.value = '';
    } catch (error) {
        console.error(error);
        // Muestra un mensaje de error si es necesario
    }
});

// Función para crear elementos de libro con botones de editar y eliminar
function createLibroElement(libro) {
    const libroDiv = document.createElement('div');
    libroDiv.classList.add('libro-item');
    libroDiv.classList.add('libro-item');
    libroDiv.id = `${libro._id}`;
    libroDiv.style.marginLeft = '25px';

    const titulo = document.createElement('h2');
    titulo.textContent = libro.titulo;

    const autor = document.createElement('p');
    autor.textContent = `Autor: ${libro.autor}`;

    const añoPublicacion = document.createElement('p');
    añoPublicacion.textContent = `Año de Publicación: ${libro.añoPublicacion}`;

    const isbn = document.createElement('p');
    isbn.textContent = `ISBN: ${libro.isbn}`;

    const genero = document.createElement('p');
    genero.textContent = `Género: ${libro.genero}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('btn', 'btn-primary', 'edit-button');
    editButton.style.marginRight = '10px';
    editButton.style.color = 'white';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '5px';
    editButton.addEventListener('click', () => handleEdit(libro));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('btn', 'btn-danger', 'delete-button');
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '5px';
    deleteButton.addEventListener('click', () => handleDelete(libro._id));

    libroDiv.appendChild(titulo);
    libroDiv.appendChild(autor);
    libroDiv.appendChild(añoPublicacion);
    libroDiv.appendChild(isbn);
    libroDiv.appendChild(genero);
    libroDiv.appendChild(editButton);
    libroDiv.appendChild(deleteButton);

    return libroDiv;
}

// Función para manejar la eliminación de un libro
async function handleDelete(libroId) {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este libro?');

    if (confirmDelete) {
        try {
            await makeRequest(`${baseUrl}/${libroId}`, 'DELETE');
            // Actualizar la lista de libros después de la eliminación
            loadLibros();
        } catch (error) {
            console.error(error);
            // Manejar errores si es necesario
        }
    }
}


// Función para manejar la edición de un libro
function handleEdit(libro) {
    // Encuentra el libro en la lista de libros (puedes usar su ID)
    const libroDiv = librosList.querySelector(`[id="${libro._id}"]`);
    console.log(libroDiv);

    // Verifica si el elemento principal del libro existe
    if (libroDiv) {
        // Crea un formulario de edición
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <input type="text" value="${libro.titulo}" id="edit-titulo">
            <input type="text" value="${libro.autor}" id="edit-autor">
            <input type="text" value="${libro.añoPublicacion}" id="edit-añoPublicacion">
            <input type="text" value="${libro.isbn}" id="edit-isbn">
            <input type="text" value="${libro.genero}" id="edit-genero">
            <button type="submit">Guardar</button>
        `;

        // Agrega el formulario de edición al elemento principal del libro
        libroDiv.appendChild(editForm);

        // Maneja el envío del formulario de edición
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const editTituloInput = document.getElementById('edit-titulo');
            const editAutorInput = document.getElementById('edit-autor');
            const editAñoPublicacionInput = document.getElementById('edit-añoPublicacion');
            const editIsbnInput = document.getElementById('edit-isbn');
            const editGeneroInput = document.getElementById('edit-genero');

            const editedLibro = {
                titulo: editTituloInput.value,
                autor: editAutorInput.value,
                añoPublicacion: editAñoPublicacionInput.value,
                isbn: editIsbnInput.value,
                genero: editGeneroInput.value,
            };

            try {
                // Envía una solicitud PUT para actualizar el libro en la API
                await makeRequest(`${baseUrl}/${libro._id}`, 'PUT', editedLibro);
                
                // Actualiza la información en la interfaz
                libro.titulo = editedLibro.titulo;
                libro.autor = editedLibro.autor;
                libro.añoPublicacion = editedLibro.añoPublicacion;
                libro.isbn = editedLibro.isbn;
                libro.genero = editedLibro.genero;

                // Borra el formulario de edición
                editForm.remove();
                //recarga la lista de libros
                loadLibros();

            } catch (error) {
                console.error(error);
                // Muestra un mensaje de error si es necesario
            }
        });
    }
}
// Cargar lista de libros cuando se carga la página
window.addEventListener('load', loadLibros);
