document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("mis-servicios").addEventListener("click", async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
          alert("Inicia sesión para ver los servicios.");
          return;
      }

      const parsedUserData = JSON.parse(userData);
      const idTrabajador = parsedUserData.idTrabajador; // ID del trabajador autenticado

      try {
          const url = `https://todofix-be-production.up.railway.app/servicios/trabajador/${idTrabajador}`;
          const response = await fetch(url);

          if (!response.ok) {
              console.error("Error de respuesta:", response.status, response.statusText);
              throw new Error("Error al cargar los servicios.");
          }

          const servicios = await response.json();
          const serviceContainer = document.getElementById("service-list");
          if (!serviceContainer) {
              console.error("No se encontró el contenedor de servicios");
              return;
          }

          serviceContainer.innerHTML = ""; // Limpiar contenido anterior

          if (servicios.length === 0) {
              serviceContainer.innerHTML = "<p>No hay servicios disponibles para este trabajador.</p>";
              return;
          }

          const baseUrl = 'https://todofix-be-production.up.railway.app/uploads/'; // URL base de imágenes

          // Mostrar los servicios
          servicios.forEach((servicio) => {
              const serviceElement = document.createElement("div");
              serviceElement.classList.add("service-item");

              // Asegúrate de que la propiedad 'Imagen' tenga un valor y sea válida
              const imagenUrl = servicio.Imagen
                  ? `${baseUrl}${servicio.Imagen}`
                  : 'default-image.jpg'; // Imagen por defecto si la propiedad 'Imagen' es vacía o nula

              serviceElement.innerHTML = `
                  <h3>${servicio.Nombre}</h3>
                  <p>${servicio.Descripcion}</p>
                  <p>Precio: ${servicio.Precio_base} MXN</p>
                  <img src="${imagenUrl}" alt="${servicio.Nombre}" class="service-image" />
              `;
              serviceContainer.appendChild(serviceElement);
          });
      } catch (error) {
          console.error("Error al cargar los servicios:", error);
          alert("Hubo un error al cargar los servicios.");
      }
  });
});
