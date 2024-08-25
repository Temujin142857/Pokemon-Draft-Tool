// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { createPokemonFromSnapshot } from "../DataStructures/Pokemon.js"
import {Specie} from "../DataStructures/Specie.js";
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

export function loadSpecie(speciesName){
    const data=readData("species/"+speciesName);
    return createSpecieFromJson(data);
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

export function loadMove(moveName){
    const data=readData("moves/"+moveName);
    return createMoveFromSnapshot(data);
}

export function loadTeams(){
    const data=readData("teams");
    return createTeamsFromSnapshot(data);
}

export function saveAPokemon(pokemon){

}

export async function saveSpecie(specie){
    console.log("saving specie: ", specie);
    await set(ref(useDatabase, 'species/' + specie.name), specie);
}

export function uploadSpeciesList(){

}

export async function loadRosterPointer(){
    try {
        const data = await readData("rosterPointer");
        console.log("rosterID: " + data);
        return data;
    } catch (error) {
        console.error("Error loading species:", error);
    }
}

export async function incrementRosterPointer(currentValue){
    await set(ref(useDatabase, 'rosterPointer'), ++currentValue);
}


//add a reference to the roster in the user's profile
export async function saveRoster(roster){
    if(!roster.rosterID){
        await generateRosterID(roster);
    }
    console.log("saving roster: ", roster);
    await set(ref(useDatabase, 'rosters/' + roster.rosterID), roster.toJSON());
}

export async function generateRosterID(roster){
    roster.rosterID= await loadRosterPointer();
    if(!roster.rosterID){roster.rosterID=0;}
    await incrementRosterPointer(roster.rosterID);
}

export async function loadRoster(rosterID){
    try {
        const data = await readData("rosters/"+rosterID);
        console.log("rosterLoaded: " , data);
        return data;
    } catch (error) {
        console.error("Error loading species:", error);
    }
}

export async function loadUserRosters(user){
    try {
        let rosters=[];
        const data = await readData("users/"+user.name);
        console.log("data:", data, user);
        for (const rosterID in data.split(',')) {
            rosters.push(await loadRoster(rosterID));
        }
        return rosters;
    }catch (error) {
        console.error("Error loading userData:", error);
    }

}

const createSpecieFromJson = (json) => {
    return new Specie(json.name, json.baseStats, json.moves, json.types, json.id, json.abilities);
}