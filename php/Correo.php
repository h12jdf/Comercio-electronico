<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Documento sin título</title>
</head>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Dirección de correo donde se enviará el mensaje
    $to = "180332@upslp.edu.mx";

    // Asunto del correo
    $subject = "Nuevo mensaje de contacto: " . $subject;

    // Cuerpo del mensaje
    $body = "<h2>Nuevo mensaje de contacto</h2>
             <p><strong>Nombre:</strong> $name</p>
             <p><strong>Correo:</strong> $email</p>
             <p><strong>Asunto:</strong> $subject</p>
             <p><strong>Mensaje:</strong></p>
             <p>$message</p>";

    // Encabezados para enviar un correo en formato HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
 
    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('¡Correo enviado exitosamente!'); window.location.href='../Contacto.html';</script>";
    } else {
        echo "<script>alert('Hubo un error al enviar el correo. Intenta nuevamente.'); window.location.href='../Contacto.html';</script>";
    }
}
?>
<body>
</body>
</html>