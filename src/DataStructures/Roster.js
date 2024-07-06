export class Roster{
    constructor(name, species=[], pokemon=[], teams=[]){
        this.name = name;
        this.species = species;
        this.teams = teams;
    }
    toJSON() {
        return {
            name: this.name,
            species: this.species,
            teams: this.teams.map(team => team.toJSON())
        };
    }

}

