const searchButton = document.getElementById("searchButton"); // Botón de búsqueda
const searchInput = document.getElementById("searchInput");
const imageItems = document.querySelectorAll(".image-item"); // Obtener todos los elementos de las imágenes
const categoryButtons = document.querySelectorAll(".nav-button"); // Botones de categorías

let activeCategory = null; // Variable para rastrear la categoría activa

// Mostrar todas las imágenes al cargar la página
function showAllImages() {
  imageItems.forEach((item) => {
    item.style.display = "block";
  });
}

// Ejecutar la función inicial
showAllImages();

// Función para realizar la búsqueda cuando se hace clic en el botón
searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim(); // Obtener texto de búsqueda

  imageItems.forEach((item) => {
    const descriptionElement = item.querySelector(".image-text"); // Buscar el texto dentro de la imagen
    const descriptionText = descriptionElement.textContent.toLowerCase();

    // Lógica para mostrar u ocultar los elementos según la búsqueda
    if (descriptionText.includes(query)) {
      item.style.display = "block"; // Mostrar el elemento si hay coincidencias
      descriptionElement.innerHTML = highlightText(
        descriptionElement.textContent,
        query
      ); // Resaltar el texto
    } else {
      item.style.display = "none"; // Ocultar el elemento si no hay coincidencias
      descriptionElement.innerHTML = descriptionElement.textContent; // Restablecer el texto sin resaltar
    }
  });
});

// Función para resaltar las coincidencias en el texto
function highlightText(text, query) {
  const regex = new RegExp(query, "gi"); // Crear una expresión regular insensible a mayúsculas/minúsculas
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  ); // Resaltar coincidencias
}

// Filtro por categoría
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.getAttribute("data-category");

    // Alternar activación/desactivación del filtro
    if (activeCategory === selectedCategory) {
      activeCategory = null; // Desactivar si ya estaba activo
      button.classList.remove("active");
    } else {
      activeCategory = selectedCategory; // Activar nueva categoría
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    }

    filterImages();
  });
});

// Función para filtrar imágenes
function filterImages() {
  const query = searchInput.value.toLowerCase().trim();

  imageItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    const descriptionElement = item.querySelector(".image-text");
    const descriptionText = descriptionElement.textContent.toLowerCase();

    // Mostrar elementos según la categoría y/o búsqueda
    if (
      (activeCategory === null || itemCategory === activeCategory) &&
      (query === "" || descriptionText.includes(query))
    ) {
      item.style.display = "block";
      if (query) {
        descriptionElement.innerHTML = highlightText(
          descriptionElement.textContent,
          query
        );
      } else {
        descriptionElement.innerHTML = descriptionElement.textContent;
      }
    } else {
      item.style.display = "none";
      descriptionElement.innerHTML = descriptionElement.textContent;
    }
  });
}
