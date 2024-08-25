import { Specie } from '../DataStructures/Specie';
import {getCachedData, cacheData} from './useLocalStorage';
import {loadSpecie, saveSpecie} from "./useDatabase";
import {fetchGeneric, fetchSpecies} from "./usePokeAPI";
import {Ability} from "../DataStructures/Ability";

export const createSpecie = (name, url, baseStats, moves, types, id, abilities) => {
    return new Specie(name, url, baseStats, moves, types, id, abilities);
};

export const createSpecieFromJson = (json) => {
    return new Specie(json.name, null, json.stats, json.moves, json.types, json.id, json.abilities, json.weight);
}

const createSpecieFromAPI=async (json) => {
    if (!json) return null;
    let stats = [];
    for (const stat of json.stats) {
        console.log("s: ", stat)
        stats.push(stat.base_stat);
    }
    let abilities = [];
    for (const ability of json.abilities) {
        const abilityData = await fetchGeneric(ability.ability.url);
        abilities.push(new Ability(ability.ability.name, abilityData.effect_entries[1].effect));
    }
    let learnSet = [];
    for (const move of json.moves) {
        learnSet.push(move.move.name)
    }
    let types = [];
    for (const type of json.types) {
        types.push(type.type.name);
    }
    return new Specie(json.name, null, stats, learnSet, types, json.id, abilities, json.weight);
}
export const loadASpecie = async (specieName) => {
    let specie=getCachedData(specieName);
    if(!specie?.name){
        specie=await createSpecieFromJson(await loadSpecie(specieName));
        console.log("loaded species from database");
    }
    if(!specie?.name){
        specie= await createSpecieFromAPI(await fetchSpecies(specieName));
        console.log("loaded species from api");
        if(specie?.name){
            cacheData(specieName, specie);
            saveSpecie(specie)
        }

    } else{
        cacheData(specieName, specie);
    }

    console.log("loaded specie: ", specie)
    return specie;
}
