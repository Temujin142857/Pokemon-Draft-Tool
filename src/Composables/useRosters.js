import { createTeam } from './useTeams.js';
import { loadRoster, saveSpecie, saveRoster} from "./useDatabase";
import {Roster} from "../DataStructures/Roster";
import {loadASpecie} from "./useSpecies";

export const createRoster = (name, species=[], team=null) => {
    if (!team && species.length > 6) {
        team = createTeam('', species.splice(0, 6));
    } else {
        team = team || createTeam();
    }

    return {
        name,
        species,
        team
    };
};

export const loadARoster=(rosterID)=>{
    return createRosterFromSnapshot(loadRoster(rosterID));
}

export const createRosterFromSnapshot = async (snapshot) => {
    let name = snapshot.name;
    let speciesList = snapshot.speciesList;

    // Use Promise.all to resolve all Promises in the species array
    let species = await Promise.all(
        speciesList.map(speciesName => loadASpecie(speciesName))
    );

    let teams = snapshot.teams;
    for (let team of teams) {
        for (let pkm of team) {
            pkm.specie = species.find((s) => s.name === pkm.specie);
        }
    }

    return new Roster(name, species, teams);
}

export const saveARoster=(roster)=>{
    console.log("roster:", roster);
    for (let i=0; i<roster.species.length; i++){
        saveSpecie(roster.species[i]);
        roster.species[i] = roster.species[i].name;
    }
    for (let i=0; i<roster.teams.length; i++){
        for (let j = 0; j < roster.teams[i].pokemons.length; j++) {
            if(roster.teams[i].pokemons[j].specie.name){
                roster.teams[i].pokemons[j]=roster.teams[i].pokemons[j].specie.name
            }else {
                roster.teams[i].pokemons[j]=roster.teams[i].pokemons[j].specie
            }

        }
    }
    saveRoster(roster);
}

export const updateRoster=(roster)=>{
    for (let i=0; i<roster.species.length; i++){
        roster.species[i] = roster.species[i].name;
    }
    for (let i=0; i<roster.teams.length; i++){
        for (let j = 0; j < roster.teams[i].pokemons.length; j++) {
            roster.teams[i].pokemons[j]=roster.teams[i].pokemons[i].specie.name
        }
    }
    saveRoster(roster);
}


