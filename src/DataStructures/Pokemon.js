export class Pokemon{
    constructor(specie=null, nature='Serious', moves=[], evs=[0,0,0,0,0,0], ivs=[0,0,0,0,0,0], ability=null, item=null, level=100){
        this.specie = specie
        this.nature = nature
        this.moves = moves
        this.evs = evs
        this.ivs = ivs
        this.ability = ability
        this.item = item
        this.stats=[]
        this.level=level
        this.natureNums=[1,1,1,1,1,1]
        if(specie){
            for (let i = 0; i < 6; i++) {
                this.recalculateStat(i);
                console.log(this.stats[i])
            }
        }
    }


    setIv= (iv, index)=>{
        this.ivs[index] = iv;
        this.recalculateStat(index);
    }

    setEv = (ev, index) =>{
        this.evs[index] = ev;
        this.recalculateStat(index);
    }

    setNature(nature){
        this.nature = nature;
        this.updateNatureNums();
    }

    updateNatureNums(){
        switch (this.nature) {
            case 'Hardy':
            case 'Docile':
            case 'Serious':
            case 'Bashful':
            case 'Quirky':
                this.natureNums = [1, 1, 1, 1, 1, 1];
                break;
            case 'Lonely':
                this.natureNums = [1, 1.1, 0.9, 1, 1, 1]; // Attack increased, Defense decreased
                break;
            case 'Adamant':
                this.natureNums = [1, 1.1, 1, 1, 0.9, 1]; // Attack increased, Sp. Attack decreased
                break;
            case 'Naughty':
                this.natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Sp. Defense decreased
                break;
            case 'Brave':
                this.natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Speed decreased
                break;
            case 'Bold':
                this.natureNums = [1, 0.9, 1.1, 1, 1, 1]; // Defense increased, Attack decreased
                break;
            case 'Impish':
                this.natureNums = [1, 1, 1.1, 1, 0.9, 1]; // Defense increased, Sp. Attack decreased
                break;
            case 'Lax':
                this.natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Sp. Defense decreased
                break;
            case 'Relaxed':
                this.natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Speed decreased
                break;
            case 'Modest':
                this.natureNums = [1, 0.9, 1, 1.1, 1, 1]; // Sp. Attack increased, Attack decreased
                break;
            case 'Mild':
                this.natureNums = [1, 1, 0.9, 1.1, 1, 1]; // Sp. Attack increased, Defense decreased
                break;
            case 'Rash':
                this.natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Sp. Defense decreased
                break;
            case 'Quiet':
                this.natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Speed decreased
                break;
            case 'Calm':
                this.natureNums = [1, 0.9, 1, 1, 1.1, 1]; // Sp. Defense increased, Attack decreased
                break;
            case 'Gentle':
                this.natureNums = [1, 1, 0.9, 1, 1.1, 1]; // Sp. Defense increased, Defense decreased
                break;
            case 'Careful':
                this.natureNums = [1, 1, 1, 0.9, 1.1, 1]; // Sp. Defense increased, Sp. Attack decreased
                break;
            case 'Sassy':
                this.natureNums = [1, 1, 1, 1, 1.1, 0.9]; // Sp. Defense increased, Speed decreased
                break;
            case 'Timid':
                this.natureNums = [1, 0.9, 1, 1, 1, 1.1]; // Speed increased, Attack decreased
                break;
            case 'Hasty':
                this.natureNums = [1, 1, 0.9, 1, 1, 1.1]; // Speed increased, Defense decreased
                break;
            case 'Jolly':
                this.natureNums = [1, 1, 1, 0.9, 1, 1.1]; // Speed increased, Sp. Attack decreased
                break;
            case 'Naive':
                this.natureNums = [1, 1, 1, 1, 0.9, 1.1]; // Speed increased, Sp. Defense decreased
                break;
        }
    }

    recalculateStat(index){
        console.log(this.specie.baseStats)
        console.log(index)
        switch (index) {
            case 0:
                this.stats[index]=((2*this.specie.baseStats[index]+this.ivs[index]+(this.evs[index]/4))*this.level/100)+(this.level/100)+10;
                break;
            default:
                this.stats[index]=(((2*this.specie.baseStats[index]+this.ivs[index]+(this.evs[index]/4))*this.level/100)+5)*this.natureNums[index-1];
        }
    }

    toJSON() {
        return {
            specie: this.specie,
            nature: this.nature,
            moves: this.moves,
            evs: this.evs,
            ivs: this.ivs,
            ability: this.ability,
            item: this.item,
            level: this.level
        };
    }

    static fromJSON(json) {
        return new Pokemon(json.specie, json.nature, json.moves, json.evs, json.ivs, json.ability, json.item, json.level);
    }
}

export function createPokemonFromSnapshot(snapshot){
    //check if the species is already loaded into memory
    //if not load it into memory
    return null;
}

