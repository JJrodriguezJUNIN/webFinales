import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from './firebase-config.js';

const auth = getAuth(app);
const db = getFirestore(app);

export async function signInWithDNIAndPassword(dni, password) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("dni", "==", dni));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("auth/user-not-found"); // Error más específico
        }

        let userData;
        querySnapshot.forEach((doc) => {
            userData = doc.data();
        });

        await signInWithEmailAndPassword(auth, userData.email, password);
        localStorage.setItem('userData', JSON.stringify(userData));
        return userData;

    } catch (error) {
        throw error;
    }
}

export function signOut() {
    localStorage.removeItem('userData');
    return auth.signOut();
}
