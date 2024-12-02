document.getElementById("mis-servicios").addEventListener("click", async () => {
  const userData = localStorage.getItem("userData");

  if (!userData) {
    alert("Inicia sesión para ver los servicios.");
    return;
  }

  const parsedUserData = JSON.parse(userData);
  const idTrabajador = parsedUserData.idTrabajador; // ID del trabajador autenticado

  try {
    // Realizar la solicitud a la API específica
    const response = await fetch(
      `https://todofix-be-production.up.railway.app/servicios/trabajador/${idTrabajador}`
    );

    if (!response.ok) throw new Error("Error al cargar los servicios.");

    const servicios = await response.json();
    console.log("Servicios recibidos:", servicios);

    const serviceContainer = document.getElementById("service-container");

    if (servicios.length === 0) {
      serviceContainer.innerHTML =
        "<p>No hay servicios disponibles para este trabajador.</p>";
      return;
    }

    // Mostrar los servicios
    servicios.forEach((servicio) => {
      const serviceElement = document.createElement("div");
      serviceElement.classList.add("service-item");

      const imagenUrl = servicio.Imagen.startsWith("http")
        ? servicio.Imagen
        : `https://todofix-be-production.up.railway.app/uploads/${servicio.Imagen}`;

      serviceElement.innerHTML = `
        <h3>${servicio.Nombre}</h3>
        <p>${servicio.Descripcion}</p>
        <p>Precio: ${servicio.Precio_base} MXN</p>
        <img src="${imagenUrl}" alt="${servicio.Nombre}" class="service-image" />
      `;
      serviceContainer.appendChild(serviceElement);
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al cargar los servicios.");
  }
});
