export const createPokemon = (specie=null, nature='Serious', moves=[], evs=[0,0,0,0,0,0], ivs=[0,0,0,0,0,0], ability=null, item=null, level=100) => {
    const stats = [];
    let natureNums = [1, 1, 1, 1, 1, 1];

    const setIv = (iv, index) => {
        ivs[index] = iv;
        recalculateStat(index);
    };

    const setEv = (ev, index) => {
        evs[index] = ev;
        recalculateStat(index);
    };

    const setNature = (newNature) => {
        nature = newNature;
        updateNatureNums();
    };

    const updateNatureNums = () => {
        switch (this.nature) {
            case 'Hardy':
            case 'Docile':
            case 'Serious':
            case 'Bashful':
            case 'Quirky':
                natureNums = [1, 1, 1, 1, 1, 1];
                break;
            case 'Lonely':
                natureNums = [1, 1.1, 0.9, 1, 1, 1]; // Attack increased, Defense decreased
                break;
            case 'Adamant':
                natureNums = [1, 1.1, 1, 1, 0.9, 1]; // Attack increased, Sp. Attack decreased
                break;
            case 'Naughty':
                natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Sp. Defense decreased
                break;
            case 'Brave':
                natureNums = [1, 1.1, 1, 1, 1, 0.9]; // Attack increased, Speed decreased
                break;
            case 'Bold':
                natureNums = [1, 0.9, 1.1, 1, 1, 1]; // Defense increased, Attack decreased
                break;
            case 'Impish':
                natureNums = [1, 1, 1.1, 1, 0.9, 1]; // Defense increased, Sp. Attack decreased
                break;
            case 'Lax':
                natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Sp. Defense decreased
                break;
            case 'Relaxed':
                natureNums = [1, 1, 1.1, 1, 1, 0.9]; // Defense increased, Speed decreased
                break;
            case 'Modest':
                natureNums = [1, 0.9, 1, 1.1, 1, 1]; // Sp. Attack increased, Attack decreased
                break;
            case 'Mild':
                natureNums = [1, 1, 0.9, 1.1, 1, 1]; // Sp. Attack increased, Defense decreased
                break;
            case 'Rash':
                natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Sp. Defense decreased
                break;
            case 'Quiet':
                natureNums = [1, 1, 1, 1.1, 1, 0.9]; // Sp. Attack increased, Speed decreased
                break;
            case 'Calm':
                natureNums = [1, 0.9, 1, 1, 1.1, 1]; // Sp. Defense increased, Attack decreased
                break;
            case 'Gentle':
                natureNums = [1, 1, 0.9, 1, 1.1, 1]; // Sp. Defense increased, Defense decreased
                break;
            case 'Careful':
                natureNums = [1, 1, 1, 0.9, 1.1, 1]; // Sp. Defense increased, Sp. Attack decreased
                break;
            case 'Sassy':
                natureNums = [1, 1, 1, 1, 1.1, 0.9]; // Sp. Defense increased, Speed decreased
                break;
            case 'Timid':
                natureNums = [1, 0.9, 1, 1, 1, 1.1]; // Speed increased, Attack decreased
                break;
            case 'Hasty':
                natureNums = [1, 1, 0.9, 1, 1, 1.1]; // Speed increased, Defense decreased
                break;
            case 'Jolly':
                natureNums = [1, 1, 1, 0.9, 1, 1.1]; // Speed increased, Sp. Attack decreased
                break;
            case 'Naive':
                natureNums = [1, 1, 1, 1, 0.9, 1.1]; // Speed increased, Sp. Defense decreased
                break;
        }
    };

    const recalculateStat = (index) => {
        switch (index) {
            case 0:
                stats[index] = ((2 * specie.baseStats[index] + ivs[index] + (evs[index] / 4)) * level / 100) + (level / 100) + 10;
                break;
            case 1:
                stats[index] = (((2 * specie.baseStats[index] + ivs[index] + (evs[index] / 4)) * level / 100) + 5) * natureNums[index - 1];
                break;
            // Add other cases here
        }
    };

    return {
        specie,
        nature,
        moves,
        evs,
        ivs,
        ability,
        item,
        stats,
        level,
        setIv,
        setEv,
        setNature
    };
};

export const createPokemonFromSnapshot = (snapshot) => {
    // Implement logic to create a Pokemon from a snapshot
    return null;
};
