// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { createPokemonFromSnapshot } from "../DataStructures/Pokemon.js"
import {createSpeciesFromSnapshot, Specie} from "../DataStructures/Specie.js";
import { createMoveFromSnapshot } from "../DataStructures/Move.js"
import { createTeamsFromSnapshot } from "../DataStructures/Team.js"

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
const useDatabase = getDatabase(app);


function writeUserData(userId, name, email, imageUrl) {
    set(ref(useDatabase, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    }).then(r => {}) ;
}


function readData(path){
    return new Promise((resolve, reject) => {
        const dataRef = ref(useDatabase, path);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);  // Resolve the Promise with the data
        }, (error) => {
            reject(error);  // Reject the Promise if there's an error
        });
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

export async function loadAllSpecies() {
    try {
        const data = await readData("names");
        console.log("data:" + data);
        const speciesArray = data.split(",").map(s => new Specie(s));
        return speciesArray;  // Return the array of Specie objects
    } catch (error) {
        console.error("Error loading species:", error);
    }
}

export function loadAMove(moveName){
    const data=readData("moves/"+moveName);
    return createMoveFromSnapshot(data);
}

export function loadTeams(){
    const data=readData("teams");
    return createTeamsFromSnapshot(data);
}

export function saveAPokemon(pokemon){

}

export function saveASpecies(speciesName){

}

export function uploadSpeciesList(){


}