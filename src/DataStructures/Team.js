export class Team{
    constructor(name, pokemons=[]){
        this.name = name;
        this.pokemons = pokemons;
    }

    addPokemon = (pokemon) => {
        this.pokemons.push(pokemon);
    }

    removePokemon = (pokemon) => {
        this.pokemons = this.pokemons.filter(pokemon => pokemon.species.name !== pokemon.species.name);
    }
}


export function createTeamsFromSnapshot(snapshot){

}
