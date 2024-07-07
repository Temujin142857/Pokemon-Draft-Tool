import {Team} from "./Team";
import {Pokemon} from "./Pokemon";

export class Roster{
    constructor(name, species=[], teams=[]){
        this.name = name;
        this.species = species;
        this.teams = teams;
        if(species.length > 0&&teams.length === 0){
            const pokemons =[];
            for (let i = 0; i < 6&&i<species.length; i++) {
                pokemons.push(new Pokemon(species[i]));
            }
            this.teams=[new Team('', pokemons)];
        }
    }


    toJSON() {
        return {
            name: this.name,
            species: this.species,
            teams: this.teams.map(team => team.toJSON())
        };
    }

    static fromJSON(json) {
        const teams = json.teams.map(teamJson => Team.fromJSON(teamJson));
        return new Roster(json.name, json.species, teams);
    }
}

