document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("userData");
      if (!userData) {
          alert("Inicia sesión para ver los servicios.");
          return;
      }

  const parsedUserData = JSON.parse(userData);
  const idTrabajador = parsedUserData.idTrabajador; // ID del trabajador autenticado
  const API_URL = `https://todofix-be-production.up.railway.app/servicios/${idServicio}`; // Reemplaza con tu endpoint
  const pendingRequestsContainer = document.getElementById("pending-requests");

  // Función para cargar las solicitudes
  const cargarSolicitudes = async () => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error al obtener las solicitudes");
      }

      const solicitudes = await response.json();

      if (!solicitudes.length) {
        pendingRequestsContainer.innerHTML = "<p>No hay solicitudes en espera.</p>";
        return;
      }

      solicitudes.forEach((solicitud) => {
        const solicitudElement = document.createElement("div");
        solicitudElement.classList.add("request-item");

        solicitudElement.innerHTML = `
          <div class="request-info">
            <h3>Detalles</h3>
            <p><strong>Trabajo solicitado:</strong> ${solicitud.trabajo}</p>
            <p><strong>Solicitado por:</strong> ${solicitud.solicitadoPor}</p>
            <p><strong>Contacto:</strong> ${solicitud.contacto}</p>
            <p><strong>Nombre del trabajador:</strong> ${solicitud.nombreTrabajador}</p>
          </div>
          <div class="request-actions">
            <button class="accept-button" onclick="verDetalles('${solicitud.id}')">Ver detalles</button>
            <button class="reject-button" onclick="cancelarSolicitud('${solicitud.id}')">Cancelar solicitud</button>
          </div>
        `;

        pendingRequestsContainer.appendChild(solicitudElement);
      });
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      pendingRequestsContainer.innerHTML = "<p>Error al cargar las solicitudes.</p>";
    }
  };

  cargarSolicitudes();
});

// Función para ver los detalles de una solicitud
function verDetalles(id) {
  alert(`Mostrando detalles para la solicitud ID: ${id}`);
}
