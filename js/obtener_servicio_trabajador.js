document.getElementById("mis-servicios").addEventListener("click", async () => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      alert("Inicia sesión para ver los servicios.");
      return;
    }
  
    const parsedUserData = JSON.parse(userData);
    const idTrabajador = parsedUserData.idTrabajador; // ID del trabajador autenticado
  
    try {
      const response = await fetch("https://todofix-be-production.up.railway.app/servicios");
  
      if (!response.ok) throw new Error("Error al cargar los servicios.");
  
      const servicios = await response.json();
      const serviceContainer = document.getElementById("service-container");
      serviceContainer.innerHTML = ""; // Limpiar contenido previo
  
      // Filtrar los servicios por idTrabajador
      const serviciosFiltrados = servicios.filter(
        (servicio) => servicio.FK_idTrabajador === idTrabajador
      );
  
      if (serviciosFiltrados.length === 0) {
        serviceContainer.innerHTML = "<p>No hay servicios disponibles para este trabajador.</p>";
        return;
      }
  
      // Mostrar los servicios filtrados
      serviciosFiltrados.forEach((servicio) => {
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
  