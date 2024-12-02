document.addEventListener("DOMContentLoaded", () => {
  const requestButton = document.getElementById("request-service-button");

  requestButton.addEventListener("click", async () => {
    try {
      // Obtener datos dinámicamente
      const params = new URLSearchParams(window.location.search);
      const fkServicio = params.get("idServicio"); // Obtén el idServicio de la URL

      const userData = localStorage.getItem("userData"); // Cambia según tu método de autenticación
      const parsedUserData = JSON.parse(userData); // Convierte la cadena JSON en un objeto
      const fkUsuario = parsedUserData.idUsuario; // Accede al campo idUsuario
      if (!fkUsuario) {
        alert("Por favor, inicia sesión para solicitar un servicio.");
        return;
      }

      console.log(fkServicio)
      console.log(fkUsuario)

      const fkTrabajador = await obtenerTrabajador(fkServicio); // Obtener el idTrabajador desde el backend

      console.log(fkTrabajador)
      
      const fechaSolicitud = new Date().toISOString(); // Fecha actual
      const estado = "Pendiente";
      const metodoPago = "Tarjeta de crédito"; // Aquí podrías permitir al usuario seleccionarlo
      const fechaProgramada = "Fecha pendiente"; // Obtenido de un input

      // Construir el objeto del servicio
      const servicio = {
        FK_idUsuario: fkUsuario,
        FK_idTrabajador: fkTrabajador,
        FK_idServicio: fkServicio,
        Fecha_solicitud: fechaSolicitud,
        Estado: estado,
        Metodo_Pago: metodoPago,
        Fecha_programada: fechaProgramada,
      };

      console.log(`https://todofix-be-production.up.railway.app/solicitud-servicio/${fkUsuario}/${fkTrabajador}/${fkServicio}`)
      // Enviar la solicitud al backend
      const response = await fetch(
        `https://todofix-be-production.up.railway.app/solicitud-servicio/${fkUsuario}/${fkTrabajador}/${fkServicio}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(servicio),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el servicio");
      }

      alert("¡Servicio solicitado con éxito!");
    } catch (error) {
      console.error("Hubo un error:", error);
      alert("Error al solicitar el servicio, intenta nuevamente.");
    }
  });

  // Función para obtener el trabajador desde el backend
  async function obtenerTrabajador(fkServicio) {
    try {
      const response = await fetch(
        `https://todofix-be-production.up.railway.app/servicios/${fkServicio}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del servicio");
      }
      const servicio = await response.json();
      return servicio.trabajador.idTrabajador; // Asegúrate de que el backend devuelva este campo
    } catch (error) {
      console.error("Error al obtener el trabajador:", error);
      throw error;
    }
  }
});
