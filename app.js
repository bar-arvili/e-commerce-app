import {initializeApp} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {getAuth, signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB70GdUCVjxBcE1oTIRI7Xz_WRrxtvI_dg",
    authDomain: "e-commerce-application-5ce4f.firebaseapp.com",
    projectId: "e-commerce-application-5ce4f",
    storageBucket: "e-commerce-application-5ce4f.appspot.com",
    messagingSenderId: "298964101372",
    appId: "1:298964101372:web:ab19790c5ab1f304f60f79",
    measurementId: "G-VPWWQMEGW1"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);  

const signIn = async () => {
    const signInEmail = document.getElementById('login-email').value;
    const signInPassword = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((Approval) => {
        const user = Approval.user;
        console.log(user);
        alert("User successfully logged in");
        window.location.href = 'products.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Error: " + errorMessage);
    });
}

const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', signIn);
}

onAuthStateChanged(auth, user => {
    if (user) {
        window.location.href = './products.html';
    } else {
        window.location.href = './index.html';
    }
});


