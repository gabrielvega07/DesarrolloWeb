// Variables globales
const baseUrl = 'http://localhost:3000/api/users'; // Cambia la URL según tu configuración
const usuariosList = document.getElementById('usuarios-list');
const usuarioForm = document.getElementById('usuario-form');

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

// Cargar lista de usuarios
async function loadUsuarios() {
    usuariosList.innerHTML = '';
    try {
        const usuarios = await makeRequest(baseUrl, 'GET');
        usuarios.forEach((usuario) => {
            const usuarioDiv = createUsuarioElement(usuario);
            usuariosList.appendChild(usuarioDiv);
        });
    } catch (error) {
        console.error(error);
        usuariosList.textContent = 'Error al cargar la lista de usuarios.';
    }
}


// Función para agregar un nuevo usuario
usuarioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleInput = document.getElementById('role');

    const nuevoUsuario = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        role: roleInput.value,
    };

    try {
        const usuario = await makeRequest(baseUrl, 'POST', nuevoUsuario);
        // Procesa la respuesta y muestra el usuario agregado
        const usuarioDiv = createUsuarioElement(usuario);
        usuariosList.appendChild(usuarioDiv);

        // Limpia el formulario
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        roleInput.value = '';
    } catch (error) {
        console.error(error);
        // Muestra un mensaje de error si es necesario
    }
});


// Función para crear elementos de usuario con botones de editar y eliminar
function createUsuarioElement(usuario) {
    const usuarioDiv = document.createElement('div');
    usuarioDiv.classList.add('usuario-item');
    usuarioDiv.id = `${usuario._id}`;

    const username = document.createElement('h2');
    username.textContent = `Usuario: ${usuario.username}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${usuario.email}`;

    const role = document.createElement('p');
    role.textContent = `Rol: ${usuario.role}`;

    const dateOfBirth = document.createElement('p');
    dateOfBirth.textContent = `Fecha de nacimiento: ${usuario.date_of_birth}`;

    const profilePicture = document.createElement('img');
    profilePicture.src = usuario.profile_picture;
    profilePicture.alt = 'Imagen de perfil';

    const fullName = document.createElement('p');
    fullName.textContent = `Nombre completo: ${usuario.full_name}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => handleEdit(usuario));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => handleDelete(usuario._id));

    usuarioDiv.appendChild(username);
    usuarioDiv.appendChild(email);
    usuarioDiv.appendChild(role);
    usuarioDiv.appendChild(dateOfBirth);
    usuarioDiv.appendChild(profilePicture);
    usuarioDiv.appendChild(fullName);
    usuarioDiv.appendChild(editButton);
    usuarioDiv.appendChild(deleteButton);

    return usuarioDiv;
}


// Función para manejar la eliminación de un usuario
async function handleDelete(usuarioId) {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este usuario?');

    if (confirmDelete) {
        try {
            await makeRequest(`${baseUrl}/${usuarioId}`, 'DELETE');
            // Actualizar la lista de usuarios después de la eliminación
            loadUsuarios();
        } catch (error) {
            console.error(error);
            // Manejar errores si es necesario
        }
    }
}

// Función para manejar la edición de un usuario
function handleEdit(usuario) {
    // Encuentra el usuario en la lista de usuarios (puedes usar su ID)
    const usuarioDiv = usuariosList.querySelector(`[id="${usuario._id}"]`);

    // Verifica si el elemento principal del usuario existe
    if (usuarioDiv) {
        // Crea un formulario de edición
        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <input type="text" value="${usuario.username}" id="edit-username">
            <input type="text" value="${usuario.email}" id="edit-email">
            <input type="text" value="${usuario.role}" id="edit-role">
            <input type="date" value="${usuario.date_of_birth}" id="edit-date-of-birth">
            <input type="text" value="${usuario.profile_picture}" id="edit-profile-picture">
            <button type="submit">Guardar</button>
        `;

        // Agrega el formulario de edición al elemento principal del usuario
        usuarioDiv.appendChild(editForm);

        // Maneja el envío del formulario de edición
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const editUsernameInput = document.getElementById('edit-username');
            const editEmailInput = document.getElementById('edit-email');
            const editRoleInput = document.getElementById('edit-role');
            const editDateOfBirthInput = document.getElementById('edit-date-of-birth');
            const editProfilePictureInput = document.getElementById('edit-profile-picture');
            const editFullNameInput = document.getElementById('edit-username');

            const editedUsername = editUsernameInput.value;
            const editedEmail = editEmailInput.value;
            const editedRole = editRoleInput.value;
            const editedDateOfBirth = editDateOfBirthInput.value;
            const editedProfilePicture = editProfilePictureInput.value;
            const editedFullName = editFullNameInput.value;

            try {
                // Envía una solicitud PUT para actualizar el usuario en el API
                const editedUsuario = await makeRequest(`${baseUrl}/${usuario._id}`, 'PUT', {
                    username: editedUsername,
                    email: editedEmail,
                    role: editedRole,
                    date_of_birth: editedDateOfBirth,
                    profile_picture: editedProfilePicture,
                    full_name: editedFullName,
                });

                // Actualiza la información en la interfaz con los datos actualizados del servidor
                usuario.username = editedUsuario.username;
                usuario.email = editedUsuario.email;
                usuario.role = editedUsuario.role;
                usuario.date_of_birth = editedUsuario.date_of_birth;
                usuario.profile_picture = editedUsuario.profile_picture;
                usuario.full_name = editedUsuario.full_name;

                // Borra el formulario de edición
                editForm.remove();
            } catch (error) {
                console.error(error);
                // Muestra un mensaje de error si es necesario
            }
        });
    }
}


// Cargar lista de usuarios cuando se carga la página
window.addEventListener('load', loadUsuarios);