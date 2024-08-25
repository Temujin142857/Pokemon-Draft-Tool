import { Specie } from '../DataStructures/Specie';
import {getCachedData, cacheData} from './useLocalStorage';
import {loadSpecie, saveSpecie} from "./useDatabase";
import {fetchSpecies} from "./usePokeAPI";

export const createSpecie = (name, url, baseStats, moves, types, id, abilities) => {
    return new Specie(name, url, baseStats, moves, types, id, abilities);
};

export const createSpecieFromJson = (json) => {
    return new Specie(json.name, json.baseStats, json.moves, json.types, json.id, json.abilities);
}

export const loadASpecie = async (specieName) => {
    let specie=getCachedData(specieName);
    if(!specie){
        specie=await createSpecieFromJson(loadSpecie(specieName));
        console.log("loaded species from database");
        cacheData(specieName, specie);
    } else {

    }
    if(!specie){
        specie= await createSpecieFromJson(fetchSpecies(specieName));
        console.log("loaded species from api");
        cacheData(specieName, specie);
        saveSpecie(specieName, specie)
    }
    console.log("loaded specie: ", specie)
    return specie;
}
