document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // Muestra los datos del usuario en la página
    document.getElementById("username").innerText = userData.Nombre;
    document.getElementById("location-text").innerText = userData.Ciudad
  } else {
    // Si no hay datos, redirige al login
    window.location.href = window.location.origin + "/Comercio-electronico/login.html";
  }
});

document.getElementById("logout-button").addEventListener("click", () => {
  // Eliminar los datos del usuario de localStorage
  localStorage.removeItem("userData");

  // Redirigir a la página de inicio de sesión
  window.location.href = window.location.origin + "/Comercio-electronico/principal.html";;
});
