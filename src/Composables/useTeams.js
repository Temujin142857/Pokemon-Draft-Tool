export const createTeam = (name = '', initialPokemons = []) => {
    let pokemons = [...initialPokemons]; // Create a new array

    const addPokemon = (pokemon) => {
        pokemons = [...pokemons, pokemon]; // Create a new array with added pokemon
    };

    const removePokemon = (pokemonToRemove) => {
        pokemons = pokemons.filter(pokemon => pokemon !== pokemonToRemove); // Filter out the pokemon to remove
    };

    const getTeamState = () => {
        return {
            name,
            pokemons: [...pokemons] // Return a new array to avoid mutations
        };
    };

    return {
        addPokemon,
        removePokemon,
        getTeamState
    };
};

export const createTeamsFromSnapshot = (snapshot) => {
    // Implement logic to create teams from a snapshot
};

