document.getElementById("registerForm").addEventListener("submit", async (e) => {
  const comboBox = document.getElementById("TipoUsuario");
  const valorSeleccionado = comboBox.value.trim();

  e.preventDefault();
  const Nombre = document.getElementById("nombre").value;
  const ApellidoP = document.getElementById("ApellidoP").value;
  const ApellidoM = document.getElementById("ApellidoM").value;
  const Telefono = document.getElementById("Telefono").value;
  const Direccion = document.getElementById("Direccion").value;
  const Correo = document.getElementById("Correo").value;
  const Contrasea = document.getElementById("Contrasea").value;
  const Ciudad = document.getElementById("Ciudad").value;

  console.log(Nombre, ApellidoP, ApellidoM, Telefono, Direccion, Correo, Contrasea, Ciudad);

  const url = valorSeleccionado === "cliente" ? "https://todofix-be-production.up.railway.app/usuarios" : "https://todofix-be-production.up.railway.app/trabajadores";
  const body = {
    Nombre,
    ApellidoP,
    ApellidoM,
    Telefono,
    Direccion,
    Correo,
    Contrasea,
    Ciudad,
  };
  if (valorSeleccionado !== "cliente") {
    body.Estado = "activo";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text(); // Get the raw response text
    console.log("Raw response:", text);

    if (!response.ok) throw new Error("Error en el registro");

    const data = JSON.parse(text); // Parse the JSON response
    alert(`Registro exitoso: ${data.username}`);
    window.location.href = window.location.origin + "/Comercio-electronico/login.html"
  } catch (error) {
    console.error("Hubo un error:", error); // Print the complete error message
  }
});