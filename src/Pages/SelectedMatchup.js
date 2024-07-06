import React from "react";
import Card from '../Components/Card';
import {useLocation} from 'react-router-dom';
import "../CSS/SelectedMatchup.css"
import {Team} from "../DataStructures/Team.js";
import {Pokemon} from "../DataStructures/Pokemon";


const SelectedMatchup = () => {
    const location = useLocation();
    const { state } = location;

    const userRoster = state && state.rostersSelected.length > 0 ? state.rostersSelected[0] : [];
    const enemyRoster = state && state.rostersSelected.length > 1 ? state.rostersSelected[1] : [];

    const userTeam=new Team('team1');
    const enemyTeam=new Team('team1');


    console.log(state.rostersSelected);

    const selectMoves = (move, pokemon) => {
        // move to SelectMove, passing the pokemon to modify and move to highlight
    }

    const selectSpecie = (user, specie) => {
        const pokemonToAdd = new Pokemon(specie);
        if (user) {
            const alreadyExists = userTeam.pokemons.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                userTeam.addPokemon(pokemonToAdd);
            } else {
                // Remove the existing Pokemon from the team
                userTeam.removePokemon(pokemonToAdd.name);
            }
        } else {
            const alreadyExists = enemyTeam.pokemon.some(pokemon => pokemon.specie.name === pokemonToAdd.specie.name);
            if (!alreadyExists) {
                enemyTeam.addPokemon(pokemonToAdd);
            } else {
                // Remove the existing Pokemon from the team
                enemyTeam.removePokemon(pokemonToAdd.name);
            }
        }
    }




    return (

        <div style={{backgroundColor: '#302B2B', textAlign: 'center', minHeight: '100vh', paddingTop: '10px', paddingBottom: '20px'}}>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <div>
                    <h2 className={'text'}>{userRoster.name}</h2>
                    <ul>
                        {userRoster && userRoster.species?.map((species, index) =>
                            <li key={index} className={'liii'}>{species.name}</li>
                        )}
                    </ul>
                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                    <Card>

                    </Card>

                    <Card>
                        {/* Content for user's cards */}
                    </Card>
                </div>

                <div className={'container'}>
                    <div className={'vertical-line'}></div>
                </div>

                <div>
                <h2 className={'text'}>{enemyRoster.name}</h2>
                <ul>
                    {enemyRoster && enemyRoster.species?.map((species, index) =>
                        <li key={index} className={'liii'}>{species.name}</li>
                    )}
                </ul>
                </div>
            </div>
        </div>
    );
}

export default SelectedMatchup;