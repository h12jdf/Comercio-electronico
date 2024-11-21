// Obtener elementos del DOM
const formPopup = document.getElementById("form-popup");
const nuevoServicioButton = document.getElementById("nuevos-servicios");
const closeButton = document.getElementById("close-form");

// Mostrar el cuadro emergente al hacer clic en "Nuevo Servicio"
nuevoServicioButton.addEventListener("click", function() {
    formPopup.style.display = "block"; // Muestra el cuadro
});

// Cerrar el cuadro cuando se haga clic en el botón de cerrar
closeButton.addEventListener("click", function() {
    formPopup.style.display = "none"; // Oculta el cuadro
});

// Seleccionar el botón "Mis servicios" con id "mis-servicios"
const misServiciosBtn = document.getElementById("mis-servicios");
const myServicesPopup = document.getElementById("my-services-popup");
const closeMyServicesBtn = document.getElementById("close-my-services");

const deleteBtns = document.querySelectorAll(".delete-btn"); // Botones "X" para eliminar servicio
const deleteDialog = document.getElementById("delete-dialog");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

// Abrir "Mis Servicios" al hacer clic en el botón
misServiciosBtn.addEventListener("click", () => {
    myServicesPopup.style.display = "flex";
});

// Cerrar "Mis Servicios"
closeMyServicesBtn.addEventListener("click", () => {
    myServicesPopup.style.display = "none";
});

// Abrir cuadro de diálogo de confirmación al hacer clic en un botón de eliminar
deleteBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        deleteDialog.style.display = "flex";
    });
});

// Abre el cuadro emergente
function openPopup() {
    document.getElementById("editPopup").style.display = "flex";
}

// Cierra el cuadro emergente sin hacer cambios
function closePopup() {
    document.getElementById("editPopup").style.display = "none";
}

// Acepta el nuevo texto y lo aplica en el campo de texto
function acceptEdit() {
    const newText = document.getElementById("newText").value;
    if (newText) {
        document.querySelector(".service-title").innerText = newText;
    }
    closePopup();
}




// Confirmar eliminación
confirmDeleteBtn.addEventListener("click", () => {
    deleteDialog.style.display = "none";
    // Aquí puedes agregar la lógica para eliminar el servicio
    alert("Servicio eliminado.");
});

// Cancelar eliminación
cancelDeleteBtn.addEventListener("click", () => {
    deleteDialog.style.display = "none";
});


let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

// Función para mostrar el carrusel
function showSlide(index) {
    const offset = -index * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;

    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[index].classList.add('active');
}

// Cambiar la imagen del carrusel
function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}

// Cambiar la imagen del carrusel al hacer clic en los indicadores
function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
}

// Mostrar la imagen seleccionada en el modal
function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = image.alt; // Mostrar el título de la imagen
}

// Cerrar el modal cuando se hace clic fuera de la imagen
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Cambiar imagen automáticamente cada 3 segundos
setInterval(nextSlide, 3000);

// Manejo de clic en los indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

// Mostrar el primer slide
showSlide(currentIndex);


