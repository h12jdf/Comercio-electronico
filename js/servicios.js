// Función que carga los servicios desde el backend
async function loadServices() {
  try {
    // Realizamos la petición al backend
    const response = await fetch(
      "https://todofix-be-production.up.railway.app/servicios"
    ); // Asegúrate de que esta URL sea la correcta
    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    // Convertimos la respuesta a JSON
    const servicios = await response.json();

    // Seleccionamos el contenedor donde se mostrarán los servicios
    const container = document.getElementById("services-container");

    // Iteramos sobre los servicios y creamos el HTML dinámicamente
    servicios.forEach((servicio) => {
      // Creamos un contenedor para cada servicio
      const serviceItem = document.createElement("div");
      serviceItem.classList.add("image-item");
      serviceItem.setAttribute(
        "data-category",
        servicio.Categoria.toLowerCase()
      );

      // Creamos la imagen
      const img = document.createElement("img");
      img.src = `https://todofix-be-production.up.railway.app/uploads/${servicio.Imagen}`; // Aquí asumimos que la imagen está en la carpeta Imagenes
      img.alt = servicio.Nombre;
      img.classList.add("square-image");

      // Creamos el texto con el nombre del servicio
      const nameText = document.createElement("p");
      nameText.classList.add("image-text");
      nameText.textContent = servicio.Nombre;

      // Creamos el texto con la descripción del servicio
      const descriptionText = document.createElement("p");
      descriptionText.classList.add("image-description");
      descriptionText.textContent = servicio.Descripcion; // Asegúrate de que "Descripcion" sea la clave correcta en tu objeto JSON

      // Creamos el enlace "Ver más"
      const a = document.createElement("a");
      a.href = `detalles_producto.html?idServicio=${servicio.idServicio}`; // Pasamos el idServicio como parámetro en la URL
      const button = document.createElement("button");
      button.classList.add("see-more");
      button.textContent = "Ver más";
      a.appendChild(button);

      // Agregamos la imagen, el texto del nombre, la descripción y el botón al contenedor del servicio
      serviceItem.appendChild(img);
      serviceItem.appendChild(nameText);
      serviceItem.appendChild(descriptionText);
      serviceItem.appendChild(a);

      // Finalmente, agregamos el contenedor del servicio al contenedor principal
      container.appendChild(serviceItem);
    });
  } catch (error) {
    console.error("Hubo un error:", error);
    alert("Error al cargar los servicios");
  }
}

// Llamamos a la función para cargar los servicios cuando la página esté lista
document.addEventListener("DOMContentLoaded", loadServices);
