document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const baseUrl = "http://localhost:3000/api"; // Agrega la URL base de tu API
  
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.status === 200) {
          // Éxito en el inicio de sesión, redirige al index.html
          window.location.href = "index.html";
        } else {
          // Error en el inicio de sesión
          console.error("Inicio de sesión fallido.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    });
  });
  