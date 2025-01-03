import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJDW1lZuh4swoKG4FZkPjvCMRUnvvPHL0",
  authDomain: "appfinales.firebaseapp.com",
  projectId: "appfinales",
  storageBucket: "appfinales.firebasestorage.app",
  messagingSenderId: "55034439618",
  appId: "1:55034439618:web:5103e4b70a536583dd585b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene las instancias de autenticación y firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta auth y db para su uso en otros archivos
export { auth, db };

console.log("firebase-config.js cargado"); // Mensaje informativo
