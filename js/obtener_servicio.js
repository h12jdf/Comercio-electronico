// Función para obtener los parámetros de la URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Función para cargar los detalles del servicio
async function loadServiceDetails() {
  const idServicio = getQueryParam("idServicio"); // Obtenemos el idServicio de la URL

  if (!idServicio) {
    alert("No se proporcionó un ID de servicio válido.");
    return;
  }

  try {
    // Hacemos la solicitud al backend para obtener los detalles
    const response = await fetch(
      `https://todofix-be-production.up.railway.app/servicios/${idServicio}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del servicio");
    }

    const servicio = await response.json();

    // Actualizamos el contenido de la página con los detalles del servicio
    document.getElementById("nombreTrabajador").textContent = servicio.trabajador.nombre
    document.getElementById("nombreServicio").textContent = servicio.Nombre;
    document.getElementById(
      "service-image"
    ).src = `https://todofix-be-production.up.railway.app/uploads/${servicio.Imagen}`;
    document.getElementById("descripcion_servicio").textContent =
      servicio.Descripcion;
    document.getElementById(
      "detalle_producto"
    ).textContent = `Categoría: ${servicio.Categoria}`;
    document.getElementById(
      "precio_base"
    ).textContent = `Precio base: ${servicio.Precio_base}`;
  } catch (error) {
    console.error("Hubo un error:", error);
    alert("Error al cargar los detalles del servicio.");
  }
}

// Llamamos a la función para cargar los detalles cuando la página esté lista
document.addEventListener("DOMContentLoaded", loadServiceDetails);
