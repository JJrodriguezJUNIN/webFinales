import { auth,db } from './firebase-config.js';

// Obtener referencias a los elementos del formulario
const dniInput = document.getElementById('dni');
const emailInput = document.getElementById('email');
const nombreInput = document.getElementById('nombre');
const passwordInput = document.getElementById('password');
const registerButton = document.getElementById('registerButton');
const errorMessage = document.getElementById('error-message');

registerButton.addEventListener('click', (event) => {
    event.preventDefault();

    const dni = dniInput.value;
    const email = emailInput.value;
    const nombre = nombreInput.value;
    const password = passwordInput.value;
    console.log("Datos a enviar a Firebase:", { dni, email, nombre, password });
    errorMessage.textContent = '';

    if (!dni || !email || !nombre || !password) {
        errorMessage.textContent = 'Por favor, completa todos los campos.';
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            db.collection('Usuarios').doc(user.uid).set({
                dni: dni,
                email: email,
                nombre: nombre,
                creationDate: firebase.firestore.FieldValue.serverTimestamp()
            })
                .then(() => {
                    alert('Registro completado con éxito.');
                    window.location.href = "index.html"; // Redirigir
                })
                .catch((error) => {
                    console.error('Error al guardar en Firestore:', error);
                    errorMessage.textContent = 'Error al completar el registro (Firestore).';
                    user.delete().catch((error) => {
                        console.error("Error al eliminar usuario de Authentication:", error);
                    });
                });
        })
        .catch((error) => {
            console.error('Error en Firebase Authentication:', error);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage.textContent = 'El correo electrónico ya está en uso.';
                    break;
                case 'auth/weak-password':
                    errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                    break;
                case 'auth/invalid-email':
                    errorMessage.textContent = 'Correo electrónico inválido.';
                    break;
                default:
                    errorMessage.textContent = 'Error en el registro (Authentication).';
            }
        });
});
