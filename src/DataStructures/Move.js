export class Move {
    constructor(name, power=0, accuracy=100, secondaryEffects=null, type, category, targets=1, pp=1) {
        this.name = name;
        this.power = power;
        this.accuracy = accuracy;
        this.secondaryEffects = secondaryEffects;
        this.targets = targets;
        this.pp = pp;
    }
}

export function createMoveFromSnapshot(snapshot){

}