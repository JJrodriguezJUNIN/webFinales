function doPost(e) {
    var ss = SpreadsheetApp.openById("1zVTuUyZ6G1gFZzulgEJFnZ8z4CoDJXTzELTu8hK7S34"); // ¡REEMPLAZAR!
    var sheet = ss.getSheetByName("Hoja1"); // ¡REEMPLAZAR si es necesario!

    var nombre = e.parameter.nombre;
    var email = e.parameter.email;
    var usuario = e.parameter.usuario;
    var contrasena = e.parameter.contrasena;

    sheet.appendRow([nombre, email, usuario, contrasena, new Date()]);

    return HtmlService.createHtmlOutput('<!DOCTYPE html><html><head><script>'+
    'function redirect() { window.location.href = "https://jjrodriguezjunin.github.io/webFinales/"; }'+ // ¡REEMPLAZAR!
    'function showModal() {'+
    ' document.getElementById("myModal").style.display = "block";'+
    '}' +
    '</script><style>'+
    '/* Estilos básicos para el modal */'+
    '.modal { display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4); }'+
    '.modal-content { background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 500px; border-radius: 5px;}'+
    '.close { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer;}'+
    '</style></head><body onload="showModal()">'+
    '<div id="myModal" class="modal"><div class="modal-content">'+
    '<span class="close" onclick="redirect()">&times;</span>'+
    '<p>Datos guardados correctamente. Serás redirigido.</p>'+
    '<button onclick="redirect()">Aceptar</button></div></div></body></html>');
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
}
