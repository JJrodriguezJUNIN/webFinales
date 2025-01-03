export function displayError(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
    } else {
        console.error("No se encontró el elemento para mostrar el mensaje de error.");
    }
}

export function redirectTo(url) {
    window.location.href = url;
}
