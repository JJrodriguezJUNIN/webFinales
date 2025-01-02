function doGet(e) {
  var destino = e.parameter.destino;
  var urlRedireccion;

  if (destino === "exito") {
    urlRedireccion = "https://jjrodriguezjunin.github.io/webFinales/"; // ¡REEMPLAZAR CON TU URL!
  } else {
     Logger.log("Error en la carga de datos..");
    return ContentService.createTextOutput("Parámetro destino inválido o no proporcionado.").setMimeType(ContentService.MimeType.TEXT); // Mensaje de error
  }

  return ContentService.createTextOutput('<script>window.location.href = "' + urlRedireccion + '";</script>').setMimeType(ContentService.MimeType.HTML);
}

function doPost(e) {
  try {
    Logger.log("Iniciando doPost");
    var ss = SpreadsheetApp.openById("1zVTuUyZ6G1gFZzulgEJFnZ8z4CoDJXTzELTu8hK7S34"); // ¡REEMPLAZAR!
    var sheet = ss.getSheetByName("Usuarios"); // ¡REEMPLAZAR si es necesario!

    var nombre = e.parameter.nombre;
    var email = e.parameter.email;
    var dni = e.parameter.dni;
    var contrasena = e.parameter.contrasena;

    sheet.appendRow([nombre, email, dni, contrasena, new Date()]);
    Logger.log("Datos guardados correctamente");

    var redirectURL = ScriptApp.getService().getUrl() + "?destino=exito";

    return ContentService.createTextOutput('<script>alert("Datos guardados correctamente."); window.location.href = "' + redirectURL + '";</script>').setMimeType(ContentService.MimeType.HTML);

  } catch (error) {
    Logger.log("Error en doPost: " + error);
    return ContentService.createTextOutput('<script>alert("Ocurrió un error al guardar los datos."); window.history.back();</script>').setMimeType(ContentService.MimeType.HTML);
  }
}
