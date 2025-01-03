import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from './firebase-config.js'; // Importa tu configuración de Firebase

const auth = getAuth(app);
const db = getFirestore(app);

export async function signInWithDNIAndPassword(dni, password) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("dni", "==", dni));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Usuario no encontrado."); // Lanza un error si no se encuentra el usuario
        }

        let userData;
        querySnapshot.forEach((doc) => {
            userData = doc.data();
        });

        await signInWithEmailAndPassword(auth, userData.email, password);
        localStorage.setItem('userData', JSON.stringify(userData)); // Guarda los datos en localStorage
        return userData; // Retorna los datos del usuario si la autenticación es exitosa

    } catch (error) {
        throw error; // Re-lanza el error para que se maneje en el archivo principal
    }
}
