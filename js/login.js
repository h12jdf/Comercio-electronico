document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe tradicionalmente
  const Correo = document.getElementById("username").value;
  const Contrasea = document.getElementById("password").value;

  try {
    const response = await fetch("https://todofix-be-production.up.railway.app/auth-usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Correo, Contrasea }),
    });

    if (!response.ok) throw new Error("Error en el inicio de sesión");
    const data = await response.json();
    alert(`Inicio de sesión exitoso: ${data.user.Nombre}`);
    localStorage.setItem("userData", JSON.stringify(data.user));
    window.location.href = window.location.origin + "/Comercio-electronico/principal.html"; // Cambia la ruta aquí eliminando el "/"

  } catch (error) {
    alert("Hubo un error: " + error.message);
  }
});
