document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const Nombre = document.getElementById("nombre").value;
    const ApellidoP = document.getElementById("ApellidoP").value;
    const ApellidoM = document.getElementById("ApellidoM").value;
    const Telefono = document.getElementById("Telefono").value;
    const Direccion = document.getElementById("Direccion").value;
    const Correo = document.getElementById("Correo").value;
    const Contrasea = document.getElementById("Contrasea").value;
    const Ciudad = document.getElementById("Ciudad").value;

    try {
      const response = await fetch("#", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre,
          ApellidoP,
          ApellidoM,
          Telefono,
          Direccion,
          Correo,
          Contrasea,
          Ciudad,
        }),
      });
      if (!response.ok) throw new Error("Error en el registro");
      const data = await response.json();
      alert(`Registro exitoso: ${data.username}`);
    } catch (error) {
      alert("Hubo un error: " + error.message);
    }
  });
