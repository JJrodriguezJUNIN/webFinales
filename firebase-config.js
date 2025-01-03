 const firebaseConfig = {
    apiKey: "AIzaSyAJDW1lZuh4swoKG4FZkPjvCMRUnvvPHL0",
    authDomain: "appfinales.firebaseapp.com",
    projectId: "appfinales",
    storageBucket: "appfinales.firebasestorage.app",
    messagingSenderId: "55034439618",
    appId: "1:55034439618:web:5103e4b70a536583dd585b"
  };

// Usa firebase.initializeApp, firebase.auth y firebase.firestore
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app); // Usa firebase.auth(app)
const db = firebase.firestore(app); // Usa firebase.firestore(app)

export { auth, db };

console.log("firebase-config.js loaded");
