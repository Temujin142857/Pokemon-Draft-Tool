export class Specie {
    constructor(name, sprite, baseStats, learnSet, types, number, abilities, weight) {
        this.name = name;
        this.number = number;
        this.baseStats = baseStats;
        this.learnSet = learnSet;
        this.types = types;
        this.sprite = sprite;
        this.abilities = abilities;
        this.weight = weight;
    }
}

