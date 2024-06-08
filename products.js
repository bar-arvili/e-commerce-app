import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {getAuth,} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

const signOutFunction = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('signOutButton');
    if (signOutButton) {
        signOutButton.addEventListener('click', signOutFunction);
    }
});

const addProduct = (name, price, description, imageUrl) => {
    const productsCollection = collection(db, "products");
    addDoc(productsCollection, { name, price, description, imageUrl })
        .then(docRef => {
            console.log("Product added with ID: ", docRef.id);
            alert("Product added successfully!");
            displayProducts(); 
        })
        .catch(error => {
            console.error("Error adding product: ", error);
            alert("Failed to add product: " + error.message);
        });
};

const updateProduct = (productId) => {
    const name = prompt("Enter new name");
    const price = parseFloat(prompt("Enter new price"));
    const description = prompt("Enter new description");
    const imageUrl = prompt("Enter new image URL");

    const productDoc = doc(db, "products", productId);
    updateDoc(productDoc, {
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl
    }).then(() => {
        alert("Product updated successfully!");
        displayProducts(); 
    }).catch(error => {
        console.error("Error updating product: ", error);
        alert("Failed to update product: " + error.message);
    });
};

const deleteProduct = (productId) => {
    const productDoc = doc(db, "products", productId);
    deleteDoc(productDoc).then(() => {
        alert("Product deleted successfully!");
        displayProducts(); 
    }).catch(error => {
        console.error("Error deleting product: ", error);
        alert("Failed to delete product: " + error.message);
    });
};

const displayProducts = () => {
    const productsCollection = collection(db, "products");
    getDocs(productsCollection)
        .then(querySnapshot => {
            const productsTable = document.getElementById('productsContainer');
            productsTable.innerHTML = ''; 
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${data.imageUrl}" alt="Product Image" style="width:100px;"></td>
                    <td>${data.name}</td>
                    <td>${data.description}</td>
                    <td>$${data.price}</td>
                    <td><button id="updateBtn${doc.id}">Update</button></td>
                    <td><button id="deleteBtn${doc.id}">Delete</button></td>
                `;
                productsTable.appendChild(row);

                document.getElementById(`deleteBtn${doc.id}`).addEventListener('click', () => deleteProduct(doc.id));
                document.getElementById(`updateBtn${doc.id}`).addEventListener('click', () => updateProduct(doc.id));
            });
        })
        .catch(error => {
            console.error("Error fetching products: ", error);
        });
};

document.getElementById('addProductBtn').addEventListener('click', () => {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;
    const imageUrl = document.getElementById('productImageUrl').value;
    addProduct(name, price, description, imageUrl);
});

document.addEventListener('DOMContentLoaded', displayProducts);
