import { Specie } from '../DataStructures/Specie';

export const createSpecie = (name, url, baseStats, moves, types, id, abilities) => {
    return new Specie(name, url, baseStats, moves, types, id, abilities);
};
