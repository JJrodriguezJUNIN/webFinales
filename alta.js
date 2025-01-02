const firebaseConfig = {
    apiKey: "AIzaSyAJDW1lZuh4swoKG4FZkPjvCMRUnvvPHL0",
    authDomain: "appfinales.firebaseapp.com",
    projectId: "appfinales",
    storageBucket: "appfinales.firebasestorage.app",
    messagingSenderId: "55034439618",
    appId: "1:55034439618:web:5103e4b70a536583dd585b"
  };
/ Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(app);

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

    errorMessage.textContent = ''; // Limpiar mensajes de error anteriores

    // Validación básica en el cliente (¡IMPORTANTE!)
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
