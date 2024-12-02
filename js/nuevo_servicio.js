document.getElementById("nuevo_servicio").addEventListener("submit", async (e) => {
    alert("Entro aqui")
    const comboBox = document.getElementById("service-category");
    const valorSeleccionado = comboBox.value.trim();
  
    e.preventDefault();
  
    // Capturamos los valores del formulario
    const userData = localStorage.getItem("userData");
    const parsedUserData = JSON.parse(userData);
    const fktrabajador = parsedUserData.idTrabajador;
  
    const Nombre = document.getElementById("service-name").value;
    const Descripcion = document.getElementById("descripcion").value;
    const Categoria = valorSeleccionado;
    const Precio_base = document.getElementById("precio").value;
    const FK_idTrabajador = fktrabajador;
  
    // Crear un objeto FormData para incluir la imagen y otros datos
    const formData = new FormData();
    formData.append("Nombre", Nombre);
    formData.append("Descripcion", Descripcion);
    formData.append("Categoria", Categoria);
    formData.append("Precio_base", Precio_base);
    formData.append("FK_idTrabajador", FK_idTrabajador);
  
    // Adjuntar el archivo seleccionado
    const fileInput = document.getElementById("service-image");
    const file = fileInput.files[0];
    if (file) {
      formData.append("Imagen", file); // La clave debe coincidir con la esperada por el backend
    } else {
      alert("Por favor, selecciona una imagen.");
      return;
    }
  
    try {
      const response = await fetch(`https://todofix-be-production.up.railway.app/servicios/${FK_idTrabajador}`, {
        method: "POST",
        body: formData, // Aquí enviamos el FormData
      });
  
      if (!response.ok) throw new Error("Error en el registro");
  
      const data = await response.json(); // Analizar la respuesta JSON
      alert(`Registro exitoso: ${data.message}`);
      window.location.href = window.location.origin + "/Comercio-electronico/login.html";
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  });
  