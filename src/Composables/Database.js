// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { createPokemonFromSnapshot } from "../DataStructures/Pokemon.js"
import { createSpeciesFromSnapshot } from "../DataStructures/Species.js";
import { createMoveFromSnapshot } from "../DataStructures/Move.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAh1Filb5mSLsMugjgvRsm07hfD-7JdKzg",
    authDomain: "test-39a85.firebaseapp.com",
    projectId: "test-39a85",
    storageBucket: "test-39a85.appspot.com",
    messagingSenderId: "1014279615263",
    appId: "1:1014279615263:web:f536bd2597ace7dc15762a",
    measurementId: "G-QNCMLWCKYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


function writeUserData(userId, name, email, imageUrl) {
    set(ref(database, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    }).then(r => {}) ;
}

function readData(path){
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        return data;
    });
}

export function loadAPokemon(pokemonId, user="default"){
    const data=readData(user+"/Pokemon/"+pokemonId);
    return createPokemonFromSnapshot(data);
}

export function loadASpecies(speciesName){
    const data=readData("species/"+speciesName);
    return createSpeciesFromSnapshot(data);
}

export function loadAMove(moveName){
    const data=readData("moves/"+moveName);
    return createMoveFromSnapshot(data);
}