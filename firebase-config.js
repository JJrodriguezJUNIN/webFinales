const firebaseConfig = {
 apiKey: "AIzaSyAJDW1lZuh4swoKG4FZkPjvCMRUnvvPHL0",
  authDomain: "appfinales.firebaseapp.com",
  projectId: "appfinales",
  storageBucket: "appfinales.firebasestorage.app",
  messagingSenderId: "55034439618",
  appId: "1:55034439618:web:5103e4b70a536583dd585b"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

//exportar db para usar en otros archivos
export { db };
console.log("firebase-config")
