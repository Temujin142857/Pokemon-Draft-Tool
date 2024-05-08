export class Move {
    constructor(power=0, accuracy=100, secondaryEffects=null, type, category, targets=1) {
        this.power = power;
        this.accuracy = accuracy;
        this.secondaryEffects = secondaryEffects;
        this.targets = targets;
    }
}

export function createMoveFromSnapshot(snapshot){

}