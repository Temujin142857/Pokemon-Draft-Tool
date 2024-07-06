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
    toJSON() {
        return {
            name: this.name,
            pokemons: this.pokemons.map(pokemon => pokemon.toJSON())
        };
    }
}


export function createTeamsFromSnapshot(snapshot){

}
