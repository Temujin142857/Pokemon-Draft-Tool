import {Pokemon} from "./Pokemon";

export class Team{
    constructor(name='team1', pokemons=[]){
        this.name = name;
        this.pokemons = pokemons;
    }

    addPokemon = (pokemon) => {
        this.pokemons.push(pokemon);
    }

    removePokemon = (pokemon1) => {
        this.pokemons = this.pokemons.filter(pokemon => pokemon1.species.name !== pokemon.species.name);
    }
    toJSON() {
        return {
            name: this.name,
            pokemons: this.pokemons.map(pokemon => pokemon.toJSON())
        };
    }

    static fromJSON(json) {
        const pokemons = json.pokemons.map(pokemonJson => Pokemon.fromJSON(pokemonJson));
        return new Team(json.name, pokemons);
    }
}


export function createTeamsFromSnapshot(snapshot){

}

