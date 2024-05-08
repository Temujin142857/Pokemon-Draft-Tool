export class Species {
    constructor(name, baseStats, learnSet, types, sprite, abilities) {
        this.name = name;
        this.baseStats = baseStats;
        this.learnSet = learnSet;
        this.types = types;
        this.sprite = sprite;
        this.abilities = abilities;
    }
}

export function createSpeciesFromSnapshot(snapshot){
    //check which moves are already loaded into memory
    //Load the ones that need to be loaded
    //load the sprite and ability
    return null;
}