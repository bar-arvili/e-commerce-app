import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const signUp = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            addDoc(collection(db, "users"), { FullName: name, Email: email })
                .then(() => {
                    console.log("User information stored.");
                    alert("Registration successful!");
                    window.location.href = 'products.html';  
                })
                .catch(error => {
                    console.error("Error adding user data: ", error);
                    alert("Failed to store user info: " + error.message);
                });
        })
        .catch(error => {
            console.error("Error signing up: ", error);
            alert("Sign-up failed: " + error.message);
        });
};

const signOutFunction = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
        alert("Error signing out: " + error.message);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUpButton');
    if (signUpButton) {
        signUpButton.addEventListener('click', signUp);
    }
    const signOutButton = document.getElementById('signOutButton');
    if (signOutButton) {
        signOutButton.addEventListener('click', signOutFunction);
    }
});
