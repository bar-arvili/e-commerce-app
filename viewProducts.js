import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

const displayProducts = () => {
    const productsCollection = collection(db, "products");
    getDocs(productsCollection)
        .then(querySnapshot => {
            const productsTable = document.getElementById('productsContainer');
            productsTable.innerHTML = ''; 
            querySnapshot.forEach(doc => {
                const data = doc.data();
                productsTable.innerHTML += `<tr>
                    <td><img src="${data.imageUrl}" alt="Product Image" style="width:100px;"></td>
                    <td>${data.name}</td>
                    <td>${data.description}</td>
                    <td>$${data.price}</td>
                </tr>`;
            });
        })
        .catch(error => {
            console.error("Error fetching products: ", error);
        });
};

document.addEventListener('DOMContentLoaded', displayProducts);

