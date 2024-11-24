document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // Muestra los datos del usuario en la página
    document.getElementById("username").innerText = userData.Nombre;
  } else {
    // Si no hay datos, redirige al login
    window.location.href = "/login.html";
  }
});
